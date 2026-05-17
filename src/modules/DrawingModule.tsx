import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Eraser, Download, ArrowLeft, RotateCcw, Paintbrush } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function DrawingModule({ onBack }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#EC4899');
  const [brushSize, setBrushSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, []);

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'my-drawing.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const COLORS = [
    '#EC4899', '#EF4444', '#F97316', '#EAB308', 
    '#22C55E', '#3B82F6', '#A855F7', '#000000'
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-gray-100">
      {/* Tool Bar */}
      <div className="bg-white p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl hover:bg-indigo-200 transition-all">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black text-indigo-600 hidden sm:block">Drawing Pad</h2>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto px-2">
          <div className="flex gap-2">
            {COLORS.map(color => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                className={`w-10 h-10 rounded-full border-4 transition-all ${brushColor === color ? 'border-indigo-600 scale-125' : 'border-transparent shadow-sm'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          <div className="h-8 w-px bg-gray-200 hidden sm:block" />
          
          <div className="flex items-center gap-3">
             <Paintbrush size={20} className="text-gray-400" />
             <input 
               type="range" 
               min="2" max="50" 
               value={brushSize} 
               onChange={(e) => setBrushSize(parseInt(e.target.value))}
               className="w-24 accent-indigo-600"
             />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={clearCanvas}
            className="p-3 bg-gray-100 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
            title="Clear All"
          >
            <RotateCcw size={24} />
          </button>
          <button 
            onClick={downloadImage}
            className="p-3 bg-green-100 text-green-600 rounded-2xl hover:bg-green-200 transition-all"
            title="Save Drawing"
          >
            <Download size={24} />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-6 relative">
        <div className="w-full h-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-indigo-200">
          <canvas
            ref={canvasRef}
            className="w-full h-full touch-none cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        
        {/* Floating Instructions for Kids */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-50 text-indigo-300 font-bold uppercase tracking-widest text-sm">
          Draw something beautiful!
        </div>
      </div>
    </div>
  );
}
