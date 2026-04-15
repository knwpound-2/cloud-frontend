'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Plus, Minus } from 'lucide-react';

interface PlayerProps {
  title?: string;
  subtitle?: string;
  audioUrl?: string; // เพิ่มตัวนี้เพื่อรับ URL จาก AWS/Cloudfront
}

export default function MeditationPlayer({
  title = 'Deep Calm Meditation',
  subtitle = 'MindFlow AI Generation',
  audioUrl='https://d28270wy98r4uh.cloudfront.net/meditations/6cd38b099fe648559615b115e4984c82.mp3',
}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // 1. สร้าง Audio Ref เพื่อควบคุมการเล่นเสียง
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // สร้าง Audio instance เมื่อ component mount หรือ audioUrl เปลี่ยน
    audioRef.current = new Audio(audioUrl);

    const audio = audioRef.current;

    // อัปเดตเวลาปัจจุบันและระยะเวลาทั้งหมด
    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audioUrl]);

  // 2. ฟังก์ชันควบคุม Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Logic สำหรับ Circular Progress
  const radius = 145;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center pb-9">
      {/* --- Vinyl & Progress Section --- */}
      <div className="relative flex items-center justify-center w-[350px] h-[350px]">
        <svg className="absolute w-full h-full -rotate-90 pointer-events-none z-10">
          <circle cx="175" cy="175" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
          <motion.circle
            cx="175" cy="175" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="text-orange-400"
            strokeLinecap="round"
          />
        </svg>

        {/* Vinyl Record */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 10, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
          className="relative w-[280px] h-[280px] rounded-full shadow-2xl flex items-center justify-center"
          style={{ background: 'radial-gradient(circle, #222 30%, #111 100%)' }}
        >
          <div className="w-24 h-24 rounded-full bg-amber-400 flex items-center justify-center shadow-inner border-[6px] border-[#1a1a1a]">
            <div className="w-2 h-2 rounded-full bg-[#111]" />
          </div>
        </motion.div>
      </div>

      {/* --- Song Info Section --- */}
      <div className="text-center space-y-2 mt-4">
        <p className="text-slate-400 font-mono text-sm tracking-widest">
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>
        <h2 className="text-2xl font-bold italic text-slate-800">{title}</h2>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      {/* --- Controls Section --- */}
      <div className="flex items-center gap-6 mt-4">
        <button onClick={togglePlay} className="p-4 rounded-full bg-white shadow-xl text-slate-600 hover:scale-105 transition-all">
          {isPlaying ? <Pause fill="currentColor" size={28} /> : <Play fill="currentColor" size={28} className="ml-1" />}
        </button>
      </div>
    </div>
  );
}