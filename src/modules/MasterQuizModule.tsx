import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Star, XCircle, Trophy, RefreshCw, Sparkles, GraduationCap } from 'lucide-react';
import { ALPHABETS, ANIMALS, FRUITS, VEHICLES, SHAPES, BODY_PARTS, UI_TRANSLATIONS } from '../data/learningContent';
import { Language } from '../types';
import { speak } from '../lib/utils';
import ModuleHeader from '../components/ModuleHeader';

interface Props {
  language: Language;
  onBack: () => void;
  onComplete: () => void;
}

type Question = {
  type: 'letter' | 'object' | 'shape' | 'number';
  prompt: string;
  correctAnswer: any;
  options: any[];
  category: string;
};

const ASSETS = {
  kids: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800",
  pineapple: "https://images.unsplash.com/photo-1550258114-b8a8997c2923?auto=format&fit=crop&q=80&w=800",
  confetti: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800"
};

export default function MasterQuizModule({ language, onBack, onComplete }: Props) {
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const categories = ['alphabet', 'animals', 'fruits', 'vehicles', 'shapes', 'body_parts', 'numbers'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    let items: any[] = [];
    let type: Question['type'] = 'object';
    let prompt = '';
    let correctAnswer: any;
    let options: any[] = [];

    const t = (key: string) => {
      const trans = UI_TRANSLATIONS[key] as any;
      if (!trans) return key;
      return trans[language] || trans.en || key;
    };

    switch (randomCategory) {
      case 'alphabet':
        items = ALPHABETS;
        correctAnswer = items[Math.floor(Math.random() * items.length)];
        type = Math.random() > 0.5 ? 'letter' : 'object';
        const objName = correctAnswer.example[language] || correctAnswer.example.en;
        prompt = type === 'letter' ? `${t('findLetter')} "${correctAnswer.id}"` : `${t('findObject')} "${objName}"`;
        break;
      case 'shapes':
        items = SHAPES;
        correctAnswer = items[Math.floor(Math.random() * items.length)];
        type = 'shape';
        const shapeName = correctAnswer.name[language] || correctAnswer.name.en;
        prompt = `${t('findShape')} "${shapeName}"`;
        break;
      case 'numbers':
        const num = Math.floor(Math.random() * 20) + 1;
        correctAnswer = { id: num, name: { en: num.toString(), te: num.toString(), hi: num.toString() } };
        type = 'number';
        prompt = `${t('findNumber')} "${num}"`;
        // Generate number options
        options = [num];
        while (options.length < 4) {
          const rand = Math.floor(Math.random() * 25) + 1;
          if (!options.includes(rand)) options.push(rand);
        }
        options = options.map(n => ({ id: n, name: { en: n.toString(), te: n.toString(), hi: n.toString() } })).sort(() => 0.5 - Math.random());
        break;
      default:
        if (randomCategory === 'animals') items = ANIMALS;
        else if (randomCategory === 'fruits') items = FRUITS;
        else if (randomCategory === 'vehicles') items = VEHICLES;
        else items = BODY_PARTS;
        
        correctAnswer = items[Math.floor(Math.random() * items.length)];
        type = 'object';
        const itemName = correctAnswer.name[language] || correctAnswer.name.en;
        prompt = `${t('findObject')} "${itemName}"`;
    }

    if (type !== 'number') {
      const distractors = items
        .filter(i => i.id !== correctAnswer.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
    }

    setCurrentQuestion({
      type,
      prompt,
      correctAnswer,
      options,
      category: randomCategory
    });
    setFeedback(null);
    speak(prompt, language);
  };

  const handleAnswer = (selected: any) => {
    if (feedback) return;

    setTotalAttempted(prev => prev + 1);
    if (selected.id === currentQuestion?.correctAnswer.id) {
      setScore(prev => prev + 1);
      setFeedback('correct');
      const wellDoneText = (UI_TRANSLATIONS.wellDone as any)[language] || UI_TRANSLATIONS.wellDone.en;
      speak(wellDoneText, language);
      
      if (totalAttempted + 1 >= 10) {
        setTimeout(() => setIsFinished(true), 1500);
      } else {
        setTimeout(generateQuestion, 1500);
      }
    } else {
      setFeedback('wrong');
      const tryAgainText = (UI_TRANSLATIONS.tryAgain as any)[language] || UI_TRANSLATIONS.tryAgain.en;
      speak(tryAgainText, language);
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const t = (key: string) => {
    const trans = UI_TRANSLATIONS[key] as any;
    if (!trans) return key;
    return trans[language] || trans.en || key;
  };

  if (isFinished) {
    return (
      <div className="flex flex-col h-screen bg-pink-50">
        <ModuleHeader title="Quiz Results" onBack={onBack} language={language} color="bg-pink-400" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-8">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }}
            className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl border-8 border-pink-200"
          >
            <Trophy size={120} className="text-yellow-500" />
          </motion.div>
          
          <div className="flex flex-col gap-2">
            <h2 className="text-6xl font-black text-pink-600">Amazing Job!</h2>
            <p className="text-3xl font-bold text-gray-500">You got {score} out of 10 correct!</p>
          </div>

          <div className="flex gap-4 w-full max-w-md">
            <button 
              onClick={() => {
                setScore(0);
                setTotalAttempted(0);
                setIsFinished(false);
                generateQuestion();
              }}
              className="flex-1 p-6 bg-pink-500 text-white rounded-[2rem] font-black text-2xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <RefreshCw /> Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-indigo-50 overflow-hidden">
      <ModuleHeader 
        title={t('quizTitle')} 
        onBack={onBack} 
        language={language}
        color="bg-indigo-600"
      />

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          
          {/* Cinematic Header Section */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative h-64 md:h-80 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col items-center justify-center text-white border-b-8 border-indigo-900/20"
          >
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            <motion.img 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              src={ASSETS.kids}
              alt="Kids"
              className="absolute -left-10 md:left-0 top-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 object-cover rounded-full border-4 border-white/50 blur-[1px] md:blur-0"
              referrerPolicy="no-referrer"
            />
            <motion.img 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              src={ASSETS.pineapple}
              alt="Pineapple"
              className="absolute -right-10 md:right-4 bottom-4 w-40 md:w-56 h-40 md:h-56 object-cover rounded-[2rem] border-4 border-yellow-400 rotate-12 shadow-lg"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white p-4 rounded-full shadow-xl mb-2"
              >
                <Star size={48} className="text-yellow-500 fill-yellow-500" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-lg text-center leading-none">
                {t('quizTitle')}
              </h1>
              <div className="flex gap-2 bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                <Sparkles size={20} className="text-yellow-300" />
                <span className="font-bold text-lg uppercase tracking-widest">Question {totalAttempted + 1}/10</span>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-4 left-1/4 w-12 h-12 bg-white/20 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-pink-400/30 rounded-full blur-2xl" />
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full bg-indigo-100 h-6 rounded-full overflow-hidden border-4 border-white shadow-inner p-1">
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${(totalAttempted / 10) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div 
                key={currentQuestion.prompt}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-xl border-b-8 border-indigo-100 flex flex-col items-center gap-6 text-center group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <button 
                    onClick={() => speak(currentQuestion.prompt, language)}
                    className="p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative overflow-hidden"
                  >
                    <Volume2 size={48} className="relative z-10" />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0, 0.2, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-white"
                    />
                  </button>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight leading-tight px-4">
                    {currentQuestion.prompt}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-6 pb-20">
                  {currentQuestion.options.map((option, idx) => (
                    <motion.button
                      key={`${option.id}-${idx}`}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(option)}
                      className={`
                        relative bg-white rounded-[3rem] p-6 shadow-xl border-4 transition-all min-h-[140px] md:min-h-[220px] flex items-center justify-center overflow-hidden
                        ${feedback === 'correct' && option.id === currentQuestion.correctAnswer.id ? 'border-green-500 bg-green-50' : 
                          feedback === 'wrong' && option.id !== currentQuestion.correctAnswer.id ? 'border-red-100 bg-red-50' : 'border-white hover:border-indigo-200'}
                      `}
                    >
                      {currentQuestion.type === 'letter' ? (
                        <span className="text-[8rem] md:text-[10rem] font-black text-indigo-500 drop-shadow-sm">{option.id}</span>
                      ) : currentQuestion.type === 'number' ? (
                        <span className="text-[8rem] md:text-[10rem] font-black text-blue-500 drop-shadow-sm">{option.id}</span>
                      ) : currentQuestion.type === 'shape' ? (
                        <div className="text-[10rem] md:text-[12rem] drop-shadow-lg filter" style={{ color: option.color }}>{option.symbol}</div>
                      ) : (
                        <img 
                          src={option.img} 
                          alt={option.name.en} 
                          className="w-full h-full object-cover rounded-[2rem] shadow-inner"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      {/* Overlays for feedback */}
                      <AnimatePresence>
                        {feedback === 'correct' && option.id === currentQuestion.correctAnswer.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="absolute inset-0 bg-green-500/30 backdrop-blur-[2px] rounded-[3rem] flex items-center justify-center z-20"
                          >
                            <motion.div
                              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.5 }}
                            >
                              <Star className="text-white fill-white shadow-2xl" size={120} />
                            </motion.div>
                          </motion.div>
                        )}
                        {feedback === 'wrong' && option.id !== currentQuestion.correctAnswer.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            className="absolute inset-0 bg-red-500/20 backdrop-blur-[2px] rounded-[3rem] flex items-center justify-center z-20"
                          >
                            <XCircle className="text-white drop-shadow-lg" size={100} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
