'use client';

import React from 'react';
import { SendHorizontal, Plus } from 'lucide-react';

interface InputCardProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function InputCard({
  value,
  onChange,
  onSubmit,
  isSubmitting = false,
}: InputCardProps) {
  // ป้องกันการกด Enter แล้วขึ้นบรรทัดใหม่ แต่ให้ Submit แทน (Optional)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-[32px] shadow-2xl shadow-orange-200/20 border border-white p-4 transition-all focus-within:shadow-orange-200/40 focus-within:bg-white/90">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell us how you feel today..."
          disabled={isSubmitting}
          className="w-full bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none
           text-slate-700 text-lg placeholder:text-slate-400 resize-none p-4 disabled:opacity-50"
        />

        {/* Bottom Actions inside Input */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 px-2">
          <button
            type="button"
            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
          >
            <Plus size={18} />
            <span>Styling Instructions</span>
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!value.trim() || isSubmitting}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              value.trim() && !isSubmitting
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 hover:scale-105 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <SendHorizontal
              size={24}
              className={isSubmitting ? 'animate-pulse' : ''}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
