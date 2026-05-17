import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Eraser, Download, ArrowLeft, RotateCcw, Paintbrush, Sparkles, Highlighter, Pencil, Palette } from 'lucide-react';

type BrushStyle = 'regular' | 'spray' | 'calligraphy';

interface Props {
  onBack: () => void;
}

export default function DrawingModule({ onBack }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#EC4899');
  const [brushSize, setBrushSize] = useState(10);
  const [brushStyle, setBrushStyle] = useState<BrushStyle>('regular');
  const [canvasBg, setCanvasBg] = useState('#FFFFFF');
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

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
          ctx.fillStyle = canvasBg;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, []);

  // Update background without clearing drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = canvasBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
    }
  }, [canvasBg]);

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    setLastPos({ x, y });
    
    if (brushStyle === 'regular' || brushStyle === 'calligraphy') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.fillStyle = brushColor;

    if (brushStyle === 'regular') {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (brushStyle === 'spray') {
      const density = 20;
      for (let i = 0; i < density; i++) {
        const r = Math.random() * (brushSize * 1.5);
        const theta = Math.random() * 2 * Math.PI;
        const ox = r * Math.cos(theta);
        const oy = r * Math.sin(theta);
        ctx.fillRect(x + ox, y + oy, 1, 1);
      }
    } else if (brushStyle === 'calligraphy') {
      ctx.lineCap = 'butt';
      // Draw multiple lines with a slight offset to simulate a flat nib
      for (let i = 0; i < brushSize; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(lastPos.x - i, lastPos.y - i);
        ctx.lineTo(x - i, y - i);
        ctx.stroke();
      }
    }

    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = canvasBg;
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

  const BG_COLORS = [
    '#FFFFFF', '#F0F9FF', '#FEFCE8', '#F0FDF4', '#FFF1F2', '#F5F3FF'
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-gray-100">
      {/* Tool Bar */}
      <div className="bg-white p-4 flex flex-col md:flex-row items-center justify-between shadow-md z-10 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button onClick={onBack} className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl hover:bg-indigo-200 transition-all">
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setBrushStyle('regular')} 
              className={`p-2 rounded-xl transition-all ${brushStyle === 'regular' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}
              title="Pencil"
            >
              <Pencil size={20} />
            </button>
            <button 
              onClick={() => setBrushStyle('spray')} 
              className={`p-2 rounded-xl transition-all ${brushStyle === 'spray' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}
              title="Spray Paint"
            >
              <Sparkles size={20} />
            </button>
            <button 
              onClick={() => setBrushStyle('calligraphy')} 
              className={`p-2 rounded-xl transition-all ${brushStyle === 'calligraphy' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}
              title="Calligraphy"
            >
              <Highlighter size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto px-2 max-w-full no-scrollbar">
          <div className="flex gap-1">
            {COLORS.map(color => (
              <button
                key={color}
                onClick={() => {
                  setBrushColor(color);
                  if (brushColor === color) setBrushStyle('regular'); // toggle back if same? no
                }}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 transition-all ${brushColor === color ? 'border-indigo-600 scale-110' : 'border-transparent shadow-sm'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          <div className="h-8 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            <Palette size={18} className="text-gray-400" />
            <div className="flex gap-1">
              {BG_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setCanvasBg(color)}
                  className={`w-6 h-6 rounded-md border transition-all ${canvasBg === color ? 'border-indigo-600 scale-110' : 'border-gray-200'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div className="h-8 w-px bg-gray-200" />
          
          <div className="flex items-center gap-3">
             <Paintbrush size={18} className="text-gray-400" />
             <input 
               type="range" 
               min="2" max="50" 
               value={brushSize} 
               onChange={(e) => setBrushSize(parseInt(e.target.value))}
               className="w-16 md:w-24 accent-indigo-600"
             />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
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
