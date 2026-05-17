import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { speak, playSound, SOUNDS, triggerConfetti } from '../lib/utils';

interface LogoProps {
  text?: string;
  className?: string;
}

export default function Logo({ text = "KIDS WORLD", className = "" }: LogoProps) {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      {/* Main Icon Section */}
      <div 
        className="relative group cursor-pointer"
        onClick={() => {
          playSound(SOUNDS.POP);
          triggerConfetti();
        }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="relative z-10"
        >
          {/* Main Logo Icon: Playful Square with Rounded Corners */}
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-500 rounded-[2.5rem] shadow-[0_15px_35px_rgba(139,92,246,0.2)] flex items-center justify-center relative overflow-hidden border-4 md:border-8 border-white">
            <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
            
            {/* Mascot Smiley */}
            <motion.div
              animate={{ 
                y: [0, -3, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-2 md:gap-4 mb-1 md:mb-2">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
                <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
              </div>
              <div className="w-8 h-4 md:w-12 md:h-6 border-b-4 md:border-b-8 border-white rounded-full" />
            </motion.div>
            
            {/* Gloss effect */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/30 rounded-full blur-2xl" />
          </div>
        </motion.div>

        {/* Decorative Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-6 -right-6 text-yellow-400"
        >
          <Star size={32} className="fill-current drop-shadow-md" />
        </motion.div>
        
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-2 -left-4 text-cyan-400"
        >
          <Sparkles size={28} />
        </motion.div>
      </div>

      {/* Editable Text Section */}
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative text-center"
        >
          <span className="text-[10px] md:text-xs font-black text-indigo-400 tracking-[0.3em] uppercase mb-0.5 block">Kids Learning</span>
          <h1 className="text-3xl md:text-5xl font-[900] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-sm uppercase">
            World
          </h1>
          <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-transparent rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
