import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { speak } from '../lib/utils';
import ModuleHeader from '../components/ModuleHeader';

interface Props {
  items: any[];
  titleKey: string;
  language: Language;
  onBack: () => void;
  onComplete: () => void;
  color: string;
}

export default function GeneralModule({ items, titleKey, language, onBack, onComplete, color }: Props) {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const currentIndex = items.findIndex(item => item.id === selectedItem.id);

  const nextItem = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    setSelectedItem(items[nextIdx]);
  };

  const prevItem = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    setSelectedItem(items[prevIdx]);
  };

  useEffect(() => {
    const name = selectedItem.name[language] || selectedItem.name.en;
    const desc = selectedItem.description ? (selectedItem.description[language] || selectedItem.description.en) : '';
    speak(name + (desc ? '. ' + desc : ''), language);
  }, [selectedItem, language]);

  const borderColor = color.includes('red') ? '#EF4444' : color.includes('purple') ? '#A855F7' : color.includes('blue') ? '#3B82F6' : color.includes('green') ? '#10B981' : color.includes('orange') ? '#F59E0B' : '#EC4899';

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ModuleHeader 
        title={titleKey} 
        onBack={onBack} 
        color={color}
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

            <div 
              className={`flex-1 bg-white rounded-[4rem] p-8 shadow-2xl flex flex-col items-center gap-6 border-b-8 relative overflow-hidden`}
              style={{ borderBottomColor: borderColor }}
            >
              <div className="relative w-full aspect-square">
                <motion.img 
                  src={selectedItem.img} 
                  alt={selectedItem.name.en}
                  className="w-full h-full object-cover rounded-[3rem] shadow-inner"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-3xl shadow-xl border-2 border-gray-50 text-7xl select-none">
                  {selectedItem.icon}
                </div>
              </div>
              
              <div className="text-center z-10 w-full">
                <h3 className="text-5xl font-black text-gray-800 mb-2 truncate capitalize">
                  {selectedItem.name[language] || selectedItem.name.en}
                </h3>
                {selectedItem.description && (
                  <p className="text-xl text-gray-500 font-bold mb-6 max-w-lg mx-auto leading-relaxed">
                    {selectedItem.description[language] || selectedItem.description.en}
                  </p>
                )}
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      const name = selectedItem.name[language] || selectedItem.name.en;
                      const desc = selectedItem.description ? (selectedItem.description[language] || selectedItem.description.en) : '';
                      speak(name + (desc ? '. ' + desc : ''), language);
                    }}
                    className={`p-6 bg-white border-4 rounded-[2.5rem] shadow-lg transition-all flex items-center justify-center gap-4 mx-auto w-full active:scale-95`}
                    style={{ color: borderColor, borderColor: borderColor }}
                  >
                    <Volume2 size={32} />
                    <span className="font-black text-2xl uppercase tracking-tighter">Listen</span>
                  </button>

                  <button 
                    onClick={() => {
                      onComplete();
                      if (currentIndex < items.length - 1) {
                        nextItem();
                      } else {
                        onBack();
                      }
                    }}
                    className="p-6 bg-green-500 text-white rounded-[2.5rem] shadow-lg border-b-8 border-green-700 transition-all flex items-center justify-center gap-4 mx-auto w-full hover:scale-105 active:scale-95 active:border-b-0 active:translate-y-2"
                  >
                    <CheckCircle size={32} className="fill-white" />
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
            Tap the arrows to see more!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
