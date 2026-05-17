import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Volume2, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { speak } from '../lib/utils';
import ModuleHeader from '../components/ModuleHeader';

interface Props {
  language: Language;
  onBack: () => void;
  onComplete: () => void;
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

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          {/* Number Card */}
          <div className="flex flex-col gap-6">
            <motion.div 
              key={currentNumber}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[3rem] p-12 shadow-xl flex flex-col items-center justify-center text-center gap-6 border-b-8 border-blue-100"
            >
              <span className="text-[12rem] font-black text-blue-500 leading-none">
                {currentNumber}
              </span>
              <button 
                onClick={() => speak(`${currentNumber}`, language)}
                className="p-4 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
              >
                <Volume2 size={32} />
              </button>
            </motion.div>

            <div className="flex gap-4">
              <button 
                onClick={() => setCurrentNumber(prev => Math.max(1, prev - 1))}
                disabled={currentNumber === 1}
                className="flex-1 py-4 bg-white rounded-2xl shadow-md font-bold text-blue-400 disabled:opacity-30 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Previous
              </button>
              <button 
                onClick={() => {
                  if (currentNumber < 100) setCurrentNumber(prev => prev + 1);
                }}
                disabled={currentNumber === 100}
                className="flex-1 py-4 bg-white rounded-2xl shadow-md font-bold text-blue-400 disabled:opacity-30 flex items-center justify-center gap-2"
              >
                Next <ArrowLeft size={18} className="rotate-180" />
              </button>
            </div>
          </div>

          {/* Counting Area */}
          <div className="bg-white rounded-[3rem] p-8 shadow-xl flex flex-col gap-8">
            <h3 className="text-2xl font-black text-gray-700">Let's Count!</h3>
            <div className="flex-1 bg-blue-50 rounded-[2rem] p-6 grid grid-cols-5 md:grid-cols-10 gap-3 content-start min-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <motion.div
                  key={item}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  className="bg-white rounded-2xl shadow-sm flex items-center justify-center aspect-square text-3xl"
                >
                  {emojis[item % 10]}
                </motion.div>
              ))}
            </div>
            <p className="text-center text-blue-900/40 font-bold uppercase tracking-widest text-xs">Tap next to learn the next number!</p>

            <button 
              onClick={() => {
                onComplete();
                if (currentNumber < 100) {
                  setCurrentNumber(currentNumber + 1);
                } else {
                  onBack();
                }
              }}
              className="w-full py-5 bg-blue-500 text-white rounded-[2rem] font-black text-xl shadow-lg border-b-8 border-blue-700 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle size={24} />
              Done
            </button>
          </div>
        </div>

        {/* Number Pad */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 bg-white p-6 rounded-[3rem] shadow-lg"
        >
           <h4 className="text-xl font-bold text-gray-400 mb-6 ml-4 text-center italic">Quick Jump</h4>
           <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
             {[1, 2, 3, 4, 5, 10, 20, 50, 80, 100].map(num => (
               <button
                  key={num}
                  onClick={() => setCurrentNumber(num)}
                  className={`py-4 rounded-2xl font-black transition-all ${currentNumber === num ? 'bg-blue-500 text-white shadow-md' : 'bg-blue-50 text-blue-300 hover:bg-blue-100'}`}
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
