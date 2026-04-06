'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Plus, Minus } from 'lucide-react';

interface PlayerProps {
  title?: string;
  subtitle?: string;
  duration?: number;
}

export default function MeditationPlayer({
  title = 'Deep Calm Meditation',
  subtitle = 'MindFlow AI Generation',
  duration = 300,
}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Logic สำหรับนับเวลาถอยหลัง (จำลองการเล่นเพลง)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  // คำนวณเปอร์เซ็นต์สำหรับเส้นรอบวง (Circular Progress)
  const progressPercentage = (currentTime / duration) * 100;
  const radius = 145; // รัศมีของเส้นเวลา
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center pb-9">
      {/* --- Vinyl & Progress Section --- */}
      <div className="relative flex items-center justify-center w-[350px] h-[350px]">
        {/* Progress Ring (ขีดแสดงเวลา) */}
        <svg className="absolute w-full h-full -rotate-90 pointer-events-none z-10">
          <circle
            cx="175"
            cy="175"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-slate-100"
          />
          <motion.circle
            cx="175"
            cy="175"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'linear' }}
            className="text-orange-400"
            strokeLinecap="round"
          />
        </svg>

        {/* Vinyl Record */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { duration: 10, repeat: Infinity, ease: 'linear' }
              : { duration: 0 }
          }
          className="relative w-[280px] h-[280px] rounded-full shadow-2xl flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, #222 30%, #111 100%)',
            boxShadow:
              '0 20px 50px rgba(0,0,0,0.15), inset 0 0 10px rgba(255,255,255,0.05)',
          }}
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-2 rounded-full border border-white/5 opacity-30" />
          <div className="absolute inset-8 rounded-full border border-white/5 opacity-20" />
          <div className="absolute inset-14 rounded-full border border-white/5 opacity-10" />

          {/* Center Label */}
          <div className="w-24 h-24 rounded-full bg-amber-400 flex items-center justify-center shadow-inner border-[6px] border-[#1a1a1a]">
            <div className="w-2 h-2 rounded-full bg-[#111]" />
          </div>
        </motion.div>

        {/* Needle Arm */}
        <div className="absolute top-0 -left-4 w-24 h-40 pointer-events-none opacity-40">
          <svg
            viewBox="0 0 100 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M20,20 Q40,20 40,80 L40,150 M35,150 L45,150"
              stroke="#888"
            />
            <circle cx="20" cy="20" r="10" stroke="#888" />
          </svg>
        </div>

        {/* Volume Slider Mock (ด้านขวา) */}
        <div className="absolute -right-16 h-48 flex flex-col items-center justify-between py-4 text-slate-300">
          <Plus size={20} className="cursor-pointer hover:text-slate-500" />
          <div className="w-[2px] h-32 bg-slate-100 relative rounded-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 bg-white shadow-md border border-slate-100 rounded-md" />
          </div>
          <Minus size={20} className="cursor-pointer hover:text-slate-500" />
        </div>
      </div>

      {/* --- Song Info Section --- */}
      <div className="text-center space-y-2">
        <p className="text-slate-400 font-mono text-sm tracking-widest">
          {formatTime(currentTime)}
        </p>
        <h2 className="text-2xl font-bold italic text-slate-800">{title}</h2>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      {/* --- Controls Section --- */}
      <div className="flex items-center gap-6 mt-4">
        <button className="p-4 rounded-full text-slate-400 hover:bg-white hover:shadow-lg transition-all active:scale-90">
          <SkipBack fill="currentColor" size={24} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full bg-white shadow-xl shadow-slate-200 text-slate-600 hover:scale-105 transition-all active:scale-95"
        >
          {isPlaying ? (
            <Pause fill="currentColor" size={28} />
          ) : (
            <Play fill="currentColor" size={28} className="ml-1" />
          )}
        </button>

        <button className="p-4 rounded-full text-slate-400 hover:bg-white hover:shadow-lg transition-all active:scale-90">
          <SkipForward fill="currentColor" size={24} />
        </button>
      </div>
    </div>
  );
}
