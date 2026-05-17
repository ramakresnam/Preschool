import confetti from 'canvas-confetti';
import { Language } from '../types';

export const triggerConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};

export const SOUNDS = {
  SUCCESS: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
  POP: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  TADA: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  ERROR: 'https://assets.mixkit.co/active_storage/sfx/21/21-preview.mp3',
  WHOOSH: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
};

export const playSound = (url: string, volume: number = 0.5) => {
  try {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(e => console.warn("Audio play failed:", e));
  } catch (err) {
    console.error("Sound playback error:", err);
  }
};

export const speak = (text: string, lang: Language, rate: number = 0.9, pitch: number = 1.2) => {
  if ('speechSynthesis' in window) {
    // Cancel any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map our lang codes to BCP 47
    const langMap: Record<Language, string> = {
      en: 'en-US',
      te: 'te-IN',
      hi: 'hi-IN',
      es: 'es-ES',
      fr: 'fr-FR',
      zh: 'zh-CN',
      ja: 'ja-JP',
      bn: 'bn-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      gu: 'gu-IN',
      mr: 'mr-IN'
    };
    
    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = rate; 
    utterance.pitch = pitch;
    
    window.speechSynthesis.speak(utterance);
  }
};
