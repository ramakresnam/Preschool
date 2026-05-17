import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import { Language } from '../types';
import { speak, playSound, SOUNDS, triggerConfetti } from '../lib/utils';
import ModuleHeader from '../components/ModuleHeader';

const COLORS = [
  { id: 'red', name: { en: 'Red', te: 'ఎరుపు', hi: 'लाल' }, hex: '#EF4444', example: '🍎' },
  { id: 'blue', name: { en: 'Blue', te: 'నీలము', hi: 'नीला' }, hex: '#3B82F6', example: '🦋' },
  { id: 'green', name: { en: 'Green', te: 'ఆకుపచ్చ', hi: 'हरा' }, hex: '#22C55E', example: '🌳' },
  { id: 'yellow', name: { en: 'Yellow', te: 'పసుపు', hi: 'पीला' }, hex: '#EAB308', example: '☀️' },
  { id: 'orange', name: { en: 'Orange', te: 'నారింజ', hi: 'नारंगी' }, hex: '#F97316', example: '🍊' },
  { id: 'purple', name: { en: 'Purple', te: 'ఊదా', hi: 'बैंगनी' }, hex: '#A855F7', example: '🍇' },
  { id: 'pink', name: { en: 'Pink', te: 'గులాబీ', hi: 'గులాబీ' }, hex: '#EC4899', example: '🌸' },
  { id: 'black', name: { en: 'Black', te: 'నలుపు', hi: 'काला' }, hex: '#000000', example: '🕶️' }
];

interface Props {
  language: Language;
  onBack: () => void;
  onComplete: (id?: string) => void;
}

export default function ColorsModule({ language, onBack, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedColor = COLORS[currentIndex];

  const nextItem = () => {
    playSound(SOUNDS.POP);
    setCurrentIndex((prev) => (prev + 1) % COLORS.length);
  };

  const prevItem = () => {
    playSound(SOUNDS.POP);
    setCurrentIndex((prev) => (prev - 1 + COLORS.length) % COLORS.length);
  };

  useEffect(() => {
    speak(`${selectedColor.name[language]} color`, language);
  }, [selectedColor, language]);

  return (
    <div className="flex flex-col h-screen">
      <ModuleHeader 
        title={language === 'en' ? 'Colors' : language === 'te' ? 'రంగులు' : 'रंग'} 
        onBack={onBack} 
        color="bg-yellow-400"
        language={language}
      />

      <div className="flex-1 overflow-y-auto px-6 pb-10 flex flex-col items-center justify-center">
        
        <div className="flex items-center gap-4 w-full max-w-2xl">
          <button 
            onClick={prevItem}
            className="p-4 bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-800 transition-colors"
          >
            <svg className="w-8 h-8 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <motion.div 
            key={selectedColor.id}
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            className="flex-1 bg-white rounded-[4rem] p-12 shadow-2xl flex flex-col items-center gap-8 border-b-8"
            style={{ borderBottomColor: selectedColor.hex }}
          >
            <div 
              className="w-64 h-64 rounded-[3rem] shadow-xl border-8 border-white flex items-center justify-center transform transition-transform hover:scale-110 relative"
              style={{ backgroundColor: selectedColor.hex }}
            >
               <div className="text-[8rem] drop-shadow-lg">{selectedColor.example}</div>
               <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-[3rem] border-4 border-white"
               />
            </div>
            
            <div className="text-center">
              <h3 className="text-6xl font-black text-gray-800 mb-2">
                {selectedColor.name[language]}
              </h3>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    speak(selectedColor.name[language], language);
                    playSound(SOUNDS.TADA);
                    triggerConfetti();
                    onComplete(`color-${selectedColor.id}`);
                  }}
                  className="p-5 bg-gray-50 text-gray-700 rounded-3xl hover:bg-gray-100 transition-all flex items-center justify-center gap-4 mx-auto w-full border-2 border-gray-100 shadow-sm"
                >
                  <div className="bg-white p-2 rounded-xl shadow-inner">
                    <Volume2 size={32} style={{ color: selectedColor.hex }} />
                  </div>
                  <span className="font-black text-2xl uppercase tracking-tighter">Listen</span>
                </button>
                
                <p className="text-gray-400 font-bold italic text-xl">
                   Like a {selectedColor.id === 'black' ? 'Sunglasses' : selectedColor.name.en}!
                </p>
              </div>
            </div>
          </motion.div>

          <button 
            onClick={nextItem}
            className="p-4 bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-800 transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <p className="mt-8 text-gray-400 font-bold uppercase tracking-widest text-sm">
          Tap the arrows to explore more colors!
        </p>
      </div>
    </div>
  );
}
