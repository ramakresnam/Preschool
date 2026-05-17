import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Volume2, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { speak, playSound, SOUNDS, triggerConfetti } from '../lib/utils';
import ModuleHeader from '../components/ModuleHeader';

interface Props {
  language: Language;
  onBack: () => void;
  onComplete: (id?: string) => void;
}

export default function NumbersModule({ language, onBack, onComplete }: Props) {
  const [currentNumber, setCurrentNumber] = useState(1);
  const items = Array.from({ length: currentNumber }, (_, i) => i);

  useEffect(() => {
    speak(`${currentNumber}`, language);
  }, [currentNumber, language]);

  const emojis = ['🍓', '🎒', '🎨', '🧸', '🚗', '🚀', '🌈', '🍦', '🍩', '🎈'];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ModuleHeader 
        title={language === 'en' ? 'Numbers' : language === 'te' ? 'అంకెలు' : 'संख्याएं'} 
        onBack={onBack} 
        color="bg-blue-400"
        language={language}
      />

      <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 pt-4 md:pt-8">
          {/* Number Card */}
          <div className="flex flex-col gap-4 md:gap-6">
            <motion.div 
              key={currentNumber}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl flex flex-col items-center justify-center text-center gap-4 md:gap-6 border-b-8 border-blue-100 min-h-[250px] md:min-h-none"
            >
              <span className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-black text-blue-500 leading-none">
                {currentNumber}
              </span>
              <button 
                onClick={() => speak(`${currentNumber}`, language)}
                className="p-3 md:p-4 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              >
                <Volume2 className="size-6 md:size-8" />
              </button>
            </motion.div>

            <div className="flex gap-3 md:gap-4">
              <button 
                onClick={() => {
                  playSound(SOUNDS.POP);
                  setCurrentNumber(prev => Math.max(1, prev - 1));
                }}
                disabled={currentNumber === 1}
                className="flex-1 py-3 md:py-4 bg-white rounded-2xl shadow-md font-bold text-blue-400 disabled:opacity-30 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <button 
                onClick={() => {
                  playSound(SOUNDS.POP);
                  if (currentNumber < 100) setCurrentNumber(prev => prev + 1);
                }}
                disabled={currentNumber === 100}
                className="flex-1 py-3 md:py-4 bg-white rounded-2xl shadow-md font-bold text-blue-400 disabled:opacity-30 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Next <ArrowLeft size={16} className="rotate-180" />
              </button>
            </div>
          </div>

          {/* Counting Area */}
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 shadow-xl flex flex-col gap-6 md:gap-8">
            <h3 className="text-xl md:text-2xl font-black text-gray-700">Let's Count!</h3>
            <div className="flex-1 bg-blue-50 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 content-start min-h-[160px] md:min-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <motion.div
                  key={item}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  className="bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center aspect-square text-xl md:text-3xl"
                >
                  {emojis[item % 10]}
                </motion.div>
              ))}
            </div>
            <p className="text-center text-blue-900/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">Tap next to learn the next number!</p>

            <button 
              onClick={() => {
                playSound(SOUNDS.TADA);
                triggerConfetti();
                onComplete(`number-${currentNumber}`);
                if (currentNumber < 100) {
                  setCurrentNumber(currentNumber + 1);
                } else {
                  onBack();
                }
              }}
              className="w-full py-4 md:py-5 bg-blue-500 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl shadow-lg border-b-8 border-blue-700 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle size={20} md:size={24} />
              Done
            </button>
          </div>
        </div>

        {/* Number Pad */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 md:mt-12 bg-white p-4 md:p-6 rounded-[2.5rem] md:rounded-[3rem] shadow-lg"
        >
           <h4 className="text-lg md:text-xl font-bold text-gray-400 mb-4 md:mb-6 ml-4 text-center italic text-sm">Quick Jump</h4>
           <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 md:gap-3">
              {[1, 2, 3, 4, 5, 10, 20, 50, 80, 100].map(num => (
                <button
                   key={num}
                   onClick={() => setCurrentNumber(num)}
                   className={`py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base transition-all ${currentNumber === num ? 'bg-blue-500 text-white shadow-md' : 'bg-blue-50 text-blue-300 hover:bg-blue-100'}`}
                >
                  {num}
                </button>
              ))}
           </div>
        </motion.div>
      </div>
    </div>
  );
}
