import { ArrowLeft, Volume2 } from 'lucide-react';
import { speak } from '../lib/utils';
import { Language } from '../types';
import { MASCOT } from '../data/learningContent';
import { motion } from 'motion/react';

interface Props {
  title: string;
  onBack: () => void;
  color: string;
  language: Language;
}

export default function ModuleHeader({ title, onBack, color, language }: Props) {
  return (
    <header className="flex items-center gap-4 p-6 sticky top-0 bg-[#F0F9FF]/80 backdrop-blur-md z-30">
      <button 
        onClick={onBack}
        className={`p-4 rounded-3xl text-white shadow-lg active:scale-95 transition-all ${color}`}
      >
        <ArrowLeft size={24} />
      </button>
      <div className="flex-1 flex items-center gap-3">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl"
        >
          {MASCOT.happy}
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">{title}</h2>
      </div>
      <button 
        onClick={() => speak(title, language)}
        className="p-4 bg-white rounded-3xl text-gray-400 hover:text-gray-600 shadow-sm"
      >
        <Volume2 />
      </button>
    </header>
  );
}
