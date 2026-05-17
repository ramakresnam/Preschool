import { useState } from 'react';
import { motion } from 'motion/react';
import { Music, Play } from 'lucide-react';
import { Language } from '../types';
import { speak } from '../lib/utils';
import ModuleHeader from '../components/ModuleHeader';

const RHYMES = [
  {
    id: 'twinkle',
    title: { en: 'Twinkle Twinkle', te: 'ట్వింకిల్ ట్వింకిల్', hi: 'ट्विंकल ट्विंकल' },
    content: {
      en: 'Twinkle, twinkle, little star, How I wonder what you are! Up above the world so high, Like a diamond in the sky.',
      te: 'ట్వింకిల్, ట్వింకిల్, కిలకిల తార, నువ్వు ఎక్కడ ఉన్నావో వింతగా ఉంది! ప్రపంచానికి పైన చాలా ఎత్తులో, ఆకాశంలో వజ్రంలా ఉన్నావు.',
      hi: 'ट्विंकल, ट्विंकल, लिटिल स्टार, मुझे आश्चर्य है कि तुम क्या हो! दुनिया से बहुत ऊपर, आसमान में एक हीरे की तरह।'
    },
    icon: '✨'
  },
  {
    id: 'johny',
    title: { en: 'Johny Johny', te: 'జానీ జానీ', hi: 'जॉनी जॉनी' },
    content: {
      en: 'Johny, Johny, Yes papa? Eating sugar? No papa! Telling lies? No papa! Open your mouth, Ha! Ha! Ha!',
      te: 'జానీ, జానీ, అవును నాన్న? పంచదార తింటున్నావా? లేదు నాన్న! అబద్ధాలు చెప్తున్నావా? లేదు నాన్న! నీ నోరు తెరువు, హా! హా! హా!',
      hi: 'जॉनी, जॉनी, हाँ पापा? चीनी खा रहे हो? नहीं पापा! झूठ बोल रहे हो? नहीं पापा! अपना मुँह खोलो, हा! हा! हा!'
    },
    icon: '🍬'
  }
];

interface Props {
  language: Language;
  onBack: () => void;
}

export default function RhymesModule({ language, onBack }: Props) {
  const [selectedRhyme, setSelectedRhyme] = useState(RHYMES[0]);

  return (
    <div className="flex flex-col h-screen bg-[#FDF2F8]">
      <ModuleHeader 
        title={language === 'en' ? 'Rhymes' : language === 'te' ? 'పాటలు' : 'कविताएँ'} 
        onBack={onBack} 
        color="bg-purple-500"
        language={language}
      />

      <div className="flex-1 overflow-y-auto px-6 pb-10 flex flex-col items-center">
        <motion.div 
          key={selectedRhyme.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-2xl bg-white rounded-[3rem] p-10 shadow-xl mb-10 flex flex-col items-center text-center gap-8"
        >
          <div className="text-8xl">{selectedRhyme.icon}</div>
          <h3 className="text-4xl font-black text-purple-600">
            {selectedRhyme.title[language] || selectedRhyme.title.en}
          </h3>
          
          <div className="bg-purple-50 p-8 rounded-[2rem] text-xl font-medium leading-relaxed text-gray-700 italic">
             {selectedRhyme.content[language] || selectedRhyme.content.en}
          </div>

          <button 
            onClick={() => speak(selectedRhyme.content[language] || selectedRhyme.content.en, language)}
            className="flex items-center gap-3 px-10 py-5 bg-purple-500 text-white rounded-full font-black text-2xl shadow-lg border-b-8 border-purple-700 active:border-b-0 active:translate-y-2 transition-all"
          >
            <Play fill="white" />
             Read Aloud
          </button>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto w-full pb-4">
          {RHYMES.map(rhyme => (
            <button
              key={rhyme.id}
              onClick={() => setSelectedRhyme(rhyme)}
              className={`flex-shrink-0 px-8 py-6 rounded-[2rem] font-bold text-lg shadow-sm border-2 transition-all ${selectedRhyme.id === rhyme.id ? 'bg-purple-100 border-purple-500 text-purple-600 scale-105' : 'bg-white border-transparent text-gray-400'}`}
            >
              <span className="mr-2">{rhyme.icon}</span>
              {rhyme.title[language] || rhyme.title.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
