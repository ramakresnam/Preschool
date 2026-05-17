/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Type, Hash, Palette, Shapes as ShapesIcon, PawPrint, Apple, User, Pencil, Bus, Music,
  Settings, Star, ArrowLeft, Volume2, VolumeX, Languages, X, Clock, PieChart, Shield, Lock,
  Sparkles,
  BarChart3, Target, Coins, TrendingUp, Handshake, Info
} from 'lucide-react';
import { Language, UserProgress, Module, TranslationMap } from './types';
import { MODULES, UI_TRANSLATIONS, FRUITS, VEHICLES, BODY_PARTS, ANIMALS, MASCOT, LANGUAGES_INFO, GOOD_HABITS, VEGETABLES, SOLAR_SYSTEM, DINOSAURS, NUMBERS_GENERAL, SHAPES } from './data/learningContent';
import { speak, triggerConfetti } from './lib/utils';

// Sub-modules
import AlphabetModule from './modules/AlphabetModule';
import NumbersModule from './modules/NumbersModule';
import ColorsModule from './modules/ColorsModule';
import DrawingModule from './modules/DrawingModule';
import ShapesModule from './modules/ShapesModule';
import GeneralModule from './modules/GeneralModule';
import RhymesModule from './modules/RhymesModule';
import MasterQuizModule from './modules/MasterQuizModule';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | string>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [progress, setProgress] = useState<UserProgress>({
    stars: 0,
    unlockedModules: MODULES.map(m => m.id),
    completedItems: [],
    settings: {
      speechSpeed: 0.9,
      adsEnabled: true,
      interstitialFrequency: 0.5
    },
    analytics: {}
  });

  const [isMusicOn, setIsMusicOn] = useState(true);
  const [showParentSection, setShowParentSection] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [screenTimeLimit, setScreenTimeLimit] = useState(30);
  const [startTime] = useState(Date.now());
  const [isLocked, setIsLocked] = useState(false);
  const [mascotExpression, setMascotExpression] = useState(MASCOT.happy);

  const [showAd, setShowAd] = useState(false);
  const [lastAdTime, setLastAdTime] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('kids-learning-world-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure settings and analytics exist
      if (!parsed.settings) parsed.settings = { speechSpeed: 0.9, adsEnabled: true, interstitialFrequency: 0.5 };
      if (!parsed.analytics) parsed.analytics = {};
      setProgress(parsed);
    }

    const savedLimit = localStorage.getItem('kids-learning-world-limit');
    if (savedLimit) setScreenTimeLimit(parseInt(savedLimit));

    // Simple greeting
    setTimeout(() => {
      speak(UI_TRANSLATIONS.appName[language as string] || UI_TRANSLATIONS.appName.en, language);
    }, 1000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedMinutes = (Date.now() - startTime) / (1000 * 60);
      if (elapsedMinutes >= screenTimeLimit) {
        setIsLocked(true);
      }
    }, 30000); // Check every 30 seconds
    return () => clearInterval(timer);
  }, [screenTimeLimit, startTime]);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('kids-learning-world-progress', JSON.stringify(newProgress));
  };

  const resetProgress = () => {
    if (confirm("Are you sure you want to reset all learning progress?")) {
      const initialProgress = {
        stars: 0,
        unlockedModules: MODULES.map(m => m.id),
        completedItems: []
      };
      saveProgress(initialProgress);
      alert("Progress has been reset.");
      window.location.reload();
    }
  };

  const addStar = () => {
    const newProgress = { ...progress, stars: progress.stars + 1 };
    saveProgress(newProgress);
    triggerConfetti();
    setMascotExpression(MASCOT.cheering);
    speak("Awesome! You got a star!", language);
    setTimeout(() => setMascotExpression(MASCOT.happy), 3000);
  };

  const t = (key: string) => {
    const translations = UI_TRANSLATIONS[key] as TranslationMap;
    if (!translations) return key;
    return translations[language] || translations.en || key;
  };

  const speakWithSettings = (text: string, lang: Language) => {
    speak(text, lang, progress.settings?.speechSpeed || 0.9);
  };

  const handleModuleSelect = (moduleId: string) => {
    // Analytics tracking
    const now = Date.now();
    const newProgress = { ...progress };
    if (!newProgress.analytics) newProgress.analytics = {};
    if (!newProgress.analytics[moduleId]) newProgress.analytics[moduleId] = { visits: 0, timeSpent: 0 };
    newProgress.analytics[moduleId].visits += 1;
    saveProgress(newProgress);

    // Ad Logic
    if (progress.settings?.adsEnabled && Math.random() < (progress.settings?.interstitialFrequency || 0.5)) {
      setShowAd(true);
      setTimeout(() => {
        setCurrentScreen(moduleId);
      }, 500); // Small delay for effect
    } else {
      setCurrentScreen(moduleId);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            language={language} 
            onOpenLanguagePicker={() => setShowLanguagePicker(true)}
            onSelectModule={handleModuleSelect}
            onShowParentSection={() => setShowParentSection(true)}
            progress={progress}
            isMusicOn={isMusicOn}
            setIsMusicOn={setIsMusicOn}
            t={t}
          />
        );
      case 'abc':
        return <AlphabetModule language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'numbers':
        return <NumbersModule language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'colors':
        return <ColorsModule language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'shapes':
        return <ShapesModule language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'animals':
        return <GeneralModule items={ANIMALS} titleKey={t('animals')} color="bg-orange-400" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'fruits':
        return <GeneralModule items={FRUITS} titleKey={t('fruits')} color="bg-red-400" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'vehicles':
        return <GeneralModule items={VEHICLES} titleKey={t('vehicles')} color="bg-blue-600" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'body-parts':
        return <GeneralModule items={BODY_PARTS} titleKey={t('body-parts')} color="bg-purple-400" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'rhymes':
        return <RhymesModule language={language} onBack={() => setCurrentScreen('home')} />;
      case 'quiz':
        return <MasterQuizModule language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'drawing':
        return <DrawingModule onBack={() => setCurrentScreen('home')} />;
      case 'habits':
        return <GeneralModule items={GOOD_HABITS} titleKey={t('goodHabits')} color="bg-green-400" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'vegetables':
        return <GeneralModule items={VEGETABLES} titleKey={t('vegetables')} color="bg-green-500" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'solar-system':
        return <GeneralModule items={SOLAR_SYSTEM} titleKey={t('solarSystem')} color="bg-indigo-600" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'dinosaurs':
        return <GeneralModule items={DINOSAURS} titleKey={t('dinosaurs')} color="bg-emerald-600" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'numbers-general':
        return <GeneralModule items={NUMBERS_GENERAL} titleKey={t('numbers')} color="bg-yellow-400" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      case 'shapes-general':
        return <GeneralModule items={SHAPES} titleKey={t('shapes')} color="bg-red-400" language={language} onBack={() => setCurrentScreen('home')} onComplete={addStar} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-8">
            <h2 className="text-4xl font-bold text-pink-600 mb-4">Coming Soon!</h2>
            <button 
              onClick={() => setCurrentScreen('home')}
              className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Go Back
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] font-sans overflow-x-hidden select-none">
      <AnimatePresence mode="wait">
        {isLocked ? (
          <LockScreen t={t} key="lock" />
        ) : showAd ? (
          <InterstitialAd 
            onClose={() => setShowAd(false)} 
            t={t}
            language={language}
          />
        ) : (
          <motion.div
            key={currentScreen + language}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-4xl mx-auto min-h-screen"
          >
            {renderScreen()}
            {currentScreen === 'home' && progress.settings?.adsEnabled && (
              <AdBanner language={language} t={t} />
            )}
            {currentScreen === 'home' && (
              <div className="fixed bottom-10 right-10 flex flex-col items-center gap-4 pointer-events-none">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white px-6 py-3 rounded-[2rem] shadow-xl border-2 border-blue-100 text-blue-600 font-bold text-lg relative"
                >
                   {mascotExpression === MASCOT.cheering ? t('amazing') : t('letsLearn')}
                   <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r-2 border-b-2 border-blue-100 rotate-45" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-8xl filter drop-shadow-lg"
                >
                  {mascotExpression}
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showParentSection && (
          <ParentModal 
            t={t} 
            progress={progress}
            screenTimeLimit={screenTimeLimit}
            setScreenTimeLimit={(val: number) => {
              setScreenTimeLimit(val);
              localStorage.setItem('kids-learning-world-limit', val.toString());
            }}
            onResetProgress={resetProgress}
            onClose={() => setShowParentSection(false)}
            saveProgress={saveProgress}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLanguagePicker && (
          <LanguagePicker 
            currentLanguage={language}
            onSelect={(lang) => {
              setLanguage(lang);
              setShowLanguagePicker(false);
            }}
            onClose={() => setShowLanguagePicker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function InterstitialAd({ onClose, t, language }: { onClose: () => void, t: (k: string) => string, language: Language }) {
  const [seconds, setSeconds] = useState(5);
  
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const ads = [
    { title: "Cool Toy Cars", desc: "Fast and shiny! Get yours now.", img: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&q=80" },
    { title: "Super Paints", desc: "Rainbow colors for your art!", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80" },
    { title: "Smart Tablet", desc: "Learn anything, anywhere.", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80" }
  ];
  
  const [ad] = useState(ads[Math.floor(Math.random() * ads.length)]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 z-[300] flex flex-col items-center justify-center p-6 text-white"
    >
      <div className="absolute top-10 right-10 flex items-center gap-4">
        {seconds > 0 ? (
          <div className="bg-white/20 px-4 py-2 rounded-full font-bold">
            Close in {seconds}s
          </div>
        ) : (
          <button 
            onClick={onClose}
            className="p-4 bg-white text-black rounded-full font-bold shadow-xl hover:scale-110 transition-transform flex items-center gap-2"
          >
            Skip Ad <X size={20} />
          </button>
        )}
      </div>
      
      <div className="max-w-md w-full bg-white text-gray-800 rounded-[3rem] overflow-hidden shadow-2xl">
        <img src={ad.img} className="w-full h-64 object-cover" alt="Ad" referrerPolicy="no-referrer" />
        <div className="p-8 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2 block">Advertisement</span>
          <h2 className="text-3xl font-black mb-2">{ad.title}</h2>
          <p className="text-gray-500 font-bold mb-6">{ad.desc}</p>
          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
            INSTALL NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AdBanner({ language, t }: { language: Language, t: (k: string) => string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-100 border-t flex items-center justify-between px-6 z-[50]">
      <div className="flex items-center gap-3">
        <div className="bg-gray-300 w-10 h-10 rounded-lg flex items-center justify-center text-xs text-gray-500 font-bold">
          Ad
        </div>
        <div>
          <h5 className="text-sm font-bold text-gray-700">Healthy Snacks Pack</h5>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sponsored Content</p>
        </div>
      </div>
      <button className="px-6 py-2 bg-indigo-500 text-white rounded-full font-bold text-xs uppercase shadow-md">
        Try Now
      </button>
    </div>
  );
}

function LockScreen({ t }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-blue-600 z-[100] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="text-9xl mb-8">😴</div>
      <h2 className="text-5xl font-black text-white mb-4">Time to Rest!</h2>
      <p className="text-blue-100 text-xl font-bold max-w-md">
        Great job learning today! Let's take a break and play again later.
      </p>
    </motion.div>
  );
}

function LanguagePicker({ currentLanguage, onSelect, onClose }: { currentLanguage: Language, onSelect: (l: Language) => void, onClose: () => void }) {
  const worldLangs = LANGUAGES_INFO.filter(l => l.group === 'World');
  const indiaLangs = LANGUAGES_INFO.filter(l => l.group === 'India');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[250] flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[3rem] p-8 w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <Languages className="text-blue-500" size={32} />
            Choose Language
          </h3>
          <button onClick={onClose} className="p-3 bg-gray-100 rounded-2xl text-gray-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">World Languages</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {worldLangs.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => onSelect(lang.id as Language)}
                  className={`p-4 rounded-2xl font-bold flex flex-col items-center gap-1 transition-all ${currentLanguage === lang.id ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  <span className="text-lg">{lang.label}</span>
                  <span className="text-[10px] opacity-60 uppercase tracking-wider">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Indian Languages</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {indiaLangs.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => onSelect(lang.id as Language)}
                  className={`p-4 rounded-2xl font-bold flex flex-col items-center gap-1 transition-all ${currentLanguage === lang.id ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  <span className="text-lg">{lang.label}</span>
                  <span className="text-[10px] opacity-60 uppercase tracking-wider">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex items-center gap-3 text-blue-600 font-bold text-sm">
           <Volume2 size={20} />
           Speech and instructions will play in your selected language!
        </div>
      </motion.div>
    </motion.div>
  );
}

function ParentModal({ t, progress, screenTimeLimit, setScreenTimeLimit, onClose, onResetProgress, saveProgress }: any) {
  const [pin, setPin] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'monetization' | 'analytics'>('dashboard');

  const handlePin = (val: string) => {
    if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin === "1234") {
        setIsAuthorized(true);
      } else if (newPin.length === 4) {
        setPin("");
        alert("Wrong PIN!");
      }
    }
  };

  const updateSettings = (key: string, val: any) => {
    const newProgress = { ...progress };
    if (!newProgress.settings) newProgress.settings = { speechSpeed: 0.9, adsEnabled: true, interstitialFrequency: 0.5 };
    newProgress.settings = { ...newProgress.settings, [key]: val };
    saveProgress(newProgress);
  };

  if (!isAuthorized) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl flex flex-col items-center gap-6"
        >
          <div className="bg-red-100 p-4 rounded-full text-red-500">
            <Shield size={48} />
          </div>
          <h3 className="text-2xl font-black text-gray-800">Admin Lock</h3>
          <p className="text-gray-400 font-bold text-center">Enter PIN to access<br/>Admin Section</p>
          
          <div className="flex gap-4 mb-4">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`w-4 h-4 rounded-full ${pin.length > i ? 'bg-indigo-600' : 'bg-gray-200'}`} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button 
                key={num} 
                onClick={() => handlePin(num.toString())}
                className="w-16 h-16 bg-gray-100 rounded-2xl text-2xl font-bold active:bg-indigo-600 active:text-white transition-colors"
              >
                {num}
              </button>
            ))}
          </div>

          <button onClick={onClose} className="mt-4 text-gray-400 font-bold hover:text-gray-600">Cancel</button>
        </motion.div>
      </motion.div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: t('progress'), icon: BarChart3 },
    { id: 'settings', label: t('parentSettings'), icon: Settings },
    { id: 'monetization', label: t('monetization'), icon: Coins },
    { id: 'analytics', label: t('analytics'), icon: TrendingUp }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800">{t('adminSection')}</h3>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Parental Controls & Ads Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white rounded-2xl text-gray-400 hover:text-red-500 shadow-sm border transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-64 bg-gray-50 border-r p-6 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:shadow-sm'}`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
            
            <div className="pt-10">
               <button 
                  onClick={onResetProgress}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all"
                >
                  <X size={20} />
                  {t('resetProgress')}
                </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
                      <div className="flex items-center gap-3 text-blue-600 mb-2">
                         <Star size={20} />
                         <span className="font-bold text-xs uppercase tracking-widest">Total Stars</span>
                      </div>
                      <div className="text-4xl font-black text-blue-900">{progress.stars}</div>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100">
                      <div className="flex items-center gap-3 text-purple-600 mb-2">
                         <Target size={20} />
                         <span className="font-bold text-xs uppercase tracking-widest">Items Learnt</span>
                      </div>
                      <div className="text-4xl font-black text-purple-900">{progress.completedItems.length}</div>
                    </div>
                  </div>

                  <div className="bg-white border rounded-[2.5rem] p-8">
                     <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <TrendingUp className="text-green-500" /> Progress Milestone
                     </h4>
                     <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-4 shadow-inner border p-0.5">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (progress.stars / 100) * 100)}%` }}
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" 
                       />
                     </div>
                     <p className="text-sm font-medium text-gray-500 text-center">
                        {progress.stars < 100 ? `Only ${100 - progress.stars} more stars to become a Mega Star!` : "Your child is a Mega Star! 🎉"}
                     </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div 
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Screen Time */}
                  <div className="bg-orange-50 border border-orange-100 p-8 rounded-[2.5rem]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 text-orange-600">
                         <Clock size={24} />
                         <span className="text-xl font-bold">{t('screenTime')}</span>
                      </div>
                      <div className="text-3xl font-black text-orange-600">{screenTimeLimit}m</div>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="120" 
                      step="5"
                      value={screenTimeLimit}
                      onChange={(e) => setScreenTimeLimit(parseInt(e.target.value))}
                      className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-4"
                    />
                    <div className="flex justify-between text-xs font-bold text-orange-400 uppercase tracking-widest">
                       <span>5 Mins</span>
                       <span>2 Hours</span>
                    </div>
                  </div>

                  {/* Voice Speed */}
                  <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 text-blue-600">
                         <Volume2 size={24} />
                         <span className="text-xl font-bold">{t('voiceSpeed')}</span>
                      </div>
                      <div className="text-3xl font-black text-blue-600">{(progress.settings?.speechSpeed || 0.9).toFixed(1)}x</div>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="1.5" 
                      step="0.1"
                      value={progress.settings?.speechSpeed || 0.9}
                      onChange={(e) => updateSettings('speechSpeed', parseFloat(e.target.value))}
                      className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-4"
                    />
                    <div className="flex justify-between text-xs font-bold text-blue-400 uppercase tracking-widest">
                       <span>Slow</span>
                       <span>Normal</span>
                       <span>Fast</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'monetization' && (
                <motion.div 
                  key="monetization"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                   <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-[2.5rem] flex items-center gap-6">
                      <div className="bg-yellow-100 p-4 rounded-3xl text-yellow-600 shadow-inner">
                         <Coins size={40} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-gray-800">Ads Management</h4>
                        <p className="text-gray-500 font-bold">Configure how ads are served in the application.</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="flex items-center justify-between p-6 bg-white border-2 rounded-3xl cursor-pointer hover:border-indigo-600 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                            <Shield size={24} />
                          </div>
                          <div>
                            <span className="block font-black text-gray-800">{t('enableAds')}</span>
                            <span className="text-xs text-gray-400 font-bold uppercase">Toggle Global Visibility</span>
                          </div>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={progress.settings?.adsEnabled}
                          onChange={(e) => updateSettings('adsEnabled', e.target.checked)}
                          className="w-6 h-6 rounded accent-indigo-600"
                        />
                      </label>

                      <div className={`p-8 bg-white border-2 rounded-[2.5rem] space-y-6 transition-all ${progress.settings?.adsEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                        <div className="flex items-center justify-between">
                           <span className="font-black text-gray-800">{t('adFrequency')}</span>
                           <span className="font-black text-indigo-600">{Math.round((progress.settings?.interstitialFrequency || 0.5) * 100)}% chance</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.1"
                          value={progress.settings?.interstitialFrequency || 0.5}
                          onChange={(e) => updateSettings('interstitialFrequency', parseFloat(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl text-indigo-600 text-xs font-bold leading-relaxed">
                           <Info size={20} />
                           Higher frequency shows ads more often between screen transitions.
                        </div>
                      </div>
                   </div>

                   <div className="p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-300 flex items-center justify-center gap-4 text-gray-400 italic font-medium text-sm">
                      <Handshake size={20} />
                      Your data is 100% private. Ads are served from safe networks.
                   </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div 
                  key="analytics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                      <span className="text-emerald-900/60 uppercase tracking-widest text-[10px] font-black block mb-1">Most Played</span>
                      <div className="text-lg font-black text-emerald-900 truncate">
                        {Object.keys(progress.analytics || {}).sort((a,b) => (progress.analytics?.[b].visits || 0) - (progress.analytics?.[a].visits || 0))[0] || "None yet"}
                      </div>
                    </div>
                    <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100">
                      <span className="text-rose-900/60 uppercase tracking-widest text-[10px] font-black block mb-1">Least Played</span>
                      <div className="text-lg font-black text-rose-900 truncate">
                        {Object.keys(progress.analytics || {}).sort((a,b) => (progress.analytics?.[a].visits || 0) - (progress.analytics?.[b].visits || 0))[0] || "None yet"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-2 rounded-[2.5rem] overflow-hidden">
                    <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
                       <h4 className="font-black text-gray-800">Module Participation</h4>
                       <span className="text-xs font-black text-gray-400">VISITS</span>
                    </div>
                    <div className="divide-y max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                       {MODULES.map(mod => {
                         const isPinned = progress.unlockedModules.includes(mod.id);
                         return (
                           <div key={mod.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-lg ${mod.color} flex items-center justify-center text-white text-xs`}>
                                    {mod.icon.charAt(0)}
                                 </div>
                                 <div>
                                   <span className="font-bold text-sm text-gray-700 block">{mod.title.en}</span>
                                   <span className="text-[10px] text-gray-400 font-bold uppercase">{progress.analytics?.[mod.id]?.visits || 0} visits</span>
                                 </div>
                              </div>
                              
                              <button 
                                onClick={() => {
                                  const newUnlocked = isPinned 
                                    ? progress.unlockedModules.filter((id: string) => id !== mod.id)
                                    : [...progress.unlockedModules, mod.id];
                                  
                                  const newProgress = { ...progress, unlockedModules: newUnlocked };
                                  saveProgress(newProgress);
                                }}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${isPinned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                              >
                                {isPinned ? 'Enabled' : 'Disabled'}
                              </button>
                           </div>
                         );
                       })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Logo({ t }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-2xl shadow-lg rotate-6 flex items-center justify-center border-4 border-white">
          <Star className="text-white fill-white" size={28} />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-lg border-2 border-white">
          <Pencil size={12} />
        </div>
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-blue-600 tracking-tighter leading-none">
          PRESCHOOL <span className="text-pink-500 uppercase">Learning</span>
        </h1>
        <p className="text-[10px] md:text-xs font-black text-orange-400 tracking-[0.2em] uppercase">Adventure</p>
      </div>
    </div>
  );
}

function HomeScreen({ language, onOpenLanguagePicker, onSelectModule, onShowParentSection, progress, isMusicOn, setIsMusicOn, t }: any) {
  const iconMap: any = { 
    Type, Hash, Palette, 
    Shapes: ShapesIcon, 
    PawPrint, Apple, User, Pencil, Bus, Music, Star, Sparkles
  };

  const mainModules = MODULES.filter(m => m.id !== 'quiz' && progress.unlockedModules.includes(m.id));
  const quizModule = MODULES.find(m => m.id === 'quiz');

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <Logo t={t} />

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-2xl border-2 border-yellow-200">
             <Star className="text-yellow-500 fill-yellow-500" size={16} />
             <span className="font-black text-yellow-700">{progress.stars}</span>
          </div>
          <button 
            onClick={() => setIsMusicOn(!isMusicOn)}
            className="p-3 bg-white rounded-2xl shadow-sm text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
          >
            {isMusicOn ? <Volume2 /> : <VolumeX />}
          </button>
          
          <button 
            onClick={onOpenLanguagePicker}
            className="flex items-center gap-2 p-3 bg-white rounded-2xl shadow-sm text-indigo-600 hover:bg-indigo-50 transition-all border-2 border-transparent hover:border-indigo-100"
          >
            <Languages size={20} />
            <span className="uppercase font-black text-sm">{language}</span>
          </button>
        </div>
      </header>

      {/* Ad Reward Section */}
      {progress.settings?.adsEnabled && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl border border-yellow-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
             <div className="bg-white p-2 rounded-xl shadow-sm">
                <Music className="text-yellow-500" size={24} />
             </div>
             <div>
                <h4 className="font-bold text-gray-800 text-sm">Need a hand?</h4>
                <p className="text-xs text-gray-500 font-medium">Watch a quick video and earn 5 free stars!</p>
             </div>
          </div>
          <button 
            onClick={() => {/* Mock reward ad flow */}}
            className="px-6 py-2 bg-yellow-400 text-yellow-900 rounded-xl font-black text-xs uppercase shadow-md hover:bg-yellow-500 transition-all flex items-center gap-2"
          >
            <Sparkles size={16} /> Earn Stars
          </button>
        </motion.div>
      )}

      {/* Featured Grand Quiz Banner */}
      {quizModule && (
        <motion.button
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectModule('quiz')}
          className="w-full mb-10 relative min-h-[220px] md:min-h-[280px] bg-indigo-900 rounded-[3rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] overflow-hidden group border-b-[8px] border-indigo-950 flex flex-col items-center justify-center text-white"
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200" 
              alt="Background" 
              className="w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-indigo-900" />
          </div>

          {/* Floating Toys/Elements */}
          <motion.img 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            src="https://images.unsplash.com/photo-1550258114-b8a8997c2923?auto=format&fit=crop&q=80&w=400"
            className="absolute top-4 -right-6 w-32 h-32 object-cover rounded-full border-4 border-yellow-400 rotate-12 shadow-2xl z-20 group-hover:scale-110 transition-transform hidden md:block"
            referrerPolicy="no-referrer"
          />

          {/* Large Center Icon Section */}
          <div className="relative z-10 flex flex-col items-center gap-4 p-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-40 animate-pulse" />
              <div className="bg-white p-3 rounded-[1.5rem] shadow-xl relative z-10">
                <Star className="text-yellow-500 fill-yellow-500" size={32} />
              </div>
            </motion.div>

            <div className="text-center flex flex-col items-center gap-1">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg mb-1"
              >
                Ultimate Challenge
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-tight">
                {quizModule.title[language] || quizModule.title.en}
              </h2>
              <p className="text-indigo-200 font-bold text-sm md:text-base mt-1 max-w-xs drop-shadow-md">
                Earn stars and become a <span className="text-yellow-400">Preschool Champ!</span>
              </p>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full font-black text-lg shadow-lg flex items-center gap-3 border-b-4 border-orange-700"
            >
              START QUIZ <Sparkles size={20} />
            </motion.div>
          </div>

          {/* Kids Cartoon Representation */}
          <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-center pointer-events-none px-4 overflow-hidden">
             <div className="flex gap-3 translate-y-6 group-hover:translate-y-2 transition-transform duration-500">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-t-2xl overflow-hidden border-x-4 border-t-4 border-white shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Kid" referrerPolicy="no-referrer" />
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-t-2xl overflow-hidden border-x-4 border-t-4 border-white shadow-2xl translate-y-2">
                   <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Kid" referrerPolicy="no-referrer" />
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-t-2xl overflow-hidden border-x-4 border-t-4 border-white shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Kid" referrerPolicy="no-referrer" />
                </div>
             </div>
          </div>
        </motion.button>
      )}


      {/* Welcome Message */}
      <div className="mb-10 section-title">
         <h2 className="text-2xl md:text-3xl font-black text-gray-700 mb-2">
           {t('welcomePreschool')}
         </h2>
         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Pick a fun activity!</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {mainModules.map((mod, idx) => {
          const Icon = iconMap[mod.icon] || Type;
          const title = mod.title[language] || mod.title.en;
          return (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17,
                delay: idx * 0.05 
              }}
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`relative overflow-hidden group p-6 rounded-[2.5rem] shadow-lg border-b-8 border-black/10 transition-all ${mod.color}`}
            >
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
                <Icon size={120} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-white text-center gap-4">
                <motion.div 
                  className="bg-white/20 p-4 rounded-3xl backdrop-blur-sm"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={48} />
                </motion.div>
                <h3 className="text-2xl font-black">{title}</h3>
              </div>
            </motion.button>
          );
        })}
      </div>


      {/* Footer / Parent Lock */}
      <footer className="mt-12 flex justify-center">
        <button 
          onClick={() => onShowParentSection()}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-300 transition-colors"
        >
          <Settings size={18} />
          <span>{t('parentSettings')}</span>
        </button>
      </footer>
    </div>
  );
}
