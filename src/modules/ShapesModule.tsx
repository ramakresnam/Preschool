import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, ArrowLeft, CheckCircle } from 'lucide-react';
import { SHAPES } from '../data/learningContent';
import { Language } from '../types';
import { speak } from '../lib/utils';
import ModuleHeader from '../components/ModuleHeader';

interface Props {
  language: Language;
  onBack: () => void;
  onComplete: () => void;
}

export default function ShapesModule({ language, onBack, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedShape = SHAPES[currentIndex];

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % SHAPES.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + SHAPES.length) % SHAPES.length);
  };

  useEffect(() => {
    const shapeText = selectedShape.name[language] || selectedShape.name.en;
    speak(`${shapeText} shape`, language);
  }, [selectedShape, language]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ModuleHeader 
        title={language === 'en' ? 'Shapes' : language === 'te' ? 'ఆకారాలు' : 'आकार'} 
        onBack={onBack} 
        color="bg-green-400"
        language={language}
      />

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <motion.div 
          key="learning"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[60vh] max-w-4xl mx-auto w-full pt-8"
        >
          <div className="flex items-center gap-8 w-full">
            <button 
              onClick={prevItem}
              className="p-4 bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={32} />
            </button>

            <div className="flex-1 bg-white rounded-[4rem] p-12 shadow-2xl flex flex-col items-center gap-8 border-b-8 border-green-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50" />
              
              <div className="relative w-full aspect-square max-w-sm">
                <motion.img 
                  key={selectedShape.img}
                  src={selectedShape.img} 
                  alt={selectedShape.name.en}
                  className="w-full h-full object-cover rounded-[3rem] shadow-inner"
                  referrerPolicy="no-referrer"
                  initial={{ scale: 0.9, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                />
                <div 
                  className="absolute -bottom-4 -right-4 bg-white p-6 rounded-[2.5rem] shadow-xl border-4 text-[6rem] leading-none drop-shadow-lg z-10"
                  style={{ color: selectedShape.color, borderColor: selectedShape.color }}
                >
                  {selectedShape.symbol}
                </div>
              </div>
              
              <div className="text-center z-10 w-full">
                <h3 className="text-6xl font-black text-gray-800 mb-6 capitalize">
                  {selectedShape.name[language] || selectedShape.name.en}
                </h3>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => speak(`${selectedShape.name[language] || selectedShape.name.en} shape`, language)}
                    className="p-6 bg-white border-4 rounded-[2.5rem] shadow-lg transition-all flex items-center justify-center gap-4 mx-auto w-full hover:scale-105 active:scale-95"
                    style={{ color: selectedShape.color, borderColor: selectedShape.color }}
                  >
                    <Volume2 size={32} />
                    <span className="font-black text-2xl uppercase tracking-tighter">Listen</span>
                  </button>

                  <button 
                    onClick={() => {
                      onComplete();
                      if (currentIndex < SHAPES.length - 1) {
                        nextItem();
                      } else {
                        onBack();
                      }
                    }}
                    className="p-6 bg-green-500 text-white rounded-[2.5rem] shadow-lg border-b-8 border-green-700 transition-all flex items-center justify-center gap-4 mx-auto w-full hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-2"
                  >
                    <CheckCircle size={32} />
                    <span className="font-black text-2xl uppercase tracking-tighter">Done</span>
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={nextItem}
              className="p-4 bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={32} className="rotate-180" />
            </button>
          </div>

          <p className="mt-8 text-gray-400 font-bold uppercase tracking-widest text-sm">
            Tap the arrows to see more shapes!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
