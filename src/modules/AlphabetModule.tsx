import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Eraser, CheckCircle, Volume2, ArrowLeft } from 'lucide-react';
import { ALPHABETS } from '../data/learningContent';
import { Language } from '../types';
import { speak, playSound, SOUNDS, triggerConfetti } from '../lib/utils';
import ModuleHeader from '../components/ModuleHeader';

interface Props {
  language: Language;
  onBack: () => void;
  onComplete: (id?: string) => void;
}

export default function AlphabetModule({ language, onBack, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLetter = ALPHABETS[currentIndex];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const exampleText = currentLetter.example[language] || currentLetter.example.en;
    speak(`${currentLetter.id} for ${exampleText}`, language);
    clearCanvas();
  }, [currentIndex, language]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw background trace letter
        ctx.font = 'bold 200px sans-serif';
        ctx.fillStyle = '#F3F4F6';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentLetter.id, canvas.width / 2, canvas.height / 2);
      }
    }
  };

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0].clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0].clientY) - rect.top;

    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#EC4899'; 

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d')?.beginPath();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ModuleHeader 
        title={language === 'te' ? 'ABC నేర్చుకోవడం' : language === 'hi' ? 'ABC सीखना' : 'ABC Learning'} 
        onBack={onBack} 
        color="bg-pink-400"
        language={language}
      />

      <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-10">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.5fr_1fr] max-w-6xl mx-auto gap-4 md:gap-8 items-stretch h-full mt-4 md:mt-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex-1 bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 shadow-xl flex flex-col items-center justify-center text-center gap-4 md:gap-6 relative min-h-[300px] md:min-h-[400px]">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <span className="text-[8rem] sm:text-[10rem] md:text-[15rem] font-black text-pink-500 leading-none">
                  {currentLetter.id}
                </span>
                <div className="relative">
                   <motion.img 
                    key={currentLetter.example.img}
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    src={currentLetter.example.img} 
                    alt={currentLetter.example.en}
                    className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-lg border-4 border-white"
                    referrerPolicy="no-referrer"
                   />
                   <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-pink-500 text-white w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-3xl shadow-lg border-2 border-white">
                      {currentLetter.id.toLowerCase()}
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 md:gap-2">
                <h3 className="text-3xl md:text-5xl font-bold text-gray-700 capitalize">
                  {currentLetter.example[language] || currentLetter.example.en}
                </h3>
                <p className="text-sm md:text-xl text-gray-400 font-medium">
                  {currentLetter.id} is for {currentLetter.example.en}
                </p>
              </div>
              
              <button 
                onClick={() => speak(`${currentLetter.id} for ${currentLetter.example[language] || currentLetter.example.en}`, language)}
                className="mt-2 md:mt-4 p-4 md:p-5 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
              >
                <Volume2 className="size-6 md:size-8" />
              </button>
            </div>

            <div className="flex gap-3 md:gap-4">
              <button 
                onClick={() => {
                  playSound(SOUNDS.POP);
                  setCurrentIndex(prev => Math.max(0, prev - 1));
                }}
                disabled={currentIndex === 0}
                className="flex-1 py-3 md:py-5 bg-white rounded-2xl md:rounded-3xl shadow-md font-bold text-pink-400 disabled:opacity-30 flex items-center justify-center gap-2 text-sm md:text-lg"
              >
                <ArrowLeft size={16} md:size={20} /> Previous
              </button>
              <button 
                onClick={() => {
                  playSound(SOUNDS.POP);
                  setCurrentIndex(prev => Math.min(ALPHABETS.length - 1, prev + 1));
                }}
                disabled={currentIndex === ALPHABETS.length - 1}
                className="flex-1 py-3 md:py-5 bg-white rounded-2xl md:rounded-3xl shadow-md font-bold text-pink-400 disabled:opacity-30 flex items-center justify-center gap-2 text-sm md:text-lg"
              >
                Next <ArrowLeft size={16} md:size={20} className="rotate-180" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-6 shadow-xl flex flex-col gap-3 md:gap-4 max-w-[400px] w-full mx-auto md:mx-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-black text-gray-700">Practice Board</h3>
              <button onClick={clearCanvas} className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:text-pink-500 transition-colors">
                <Eraser size={16} md:size={18} />
              </button>
            </div>
            
            <div className="relative aspect-[3/4] md:aspect-[3/4] bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] border-4 border-dashed border-gray-200 overflow-hidden cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={300}
                height={400}
                className="w-full h-full touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>

            <button 
              onClick={() => {
                playSound(SOUNDS.TADA);
                triggerConfetti();
                onComplete(`alphabet-${currentLetter.id}`);
                if (currentIndex < ALPHABETS.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                } else {
                  onBack();
                }
              }}
              className="w-full py-4 md:py-5 bg-green-500 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl shadow-lg border-b-8 border-green-700 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle size={20} md:size={24} />
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
