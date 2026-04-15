'use client';

import { useSession } from "next-auth/react";

interface SuggestionSectionProps {
  onSelectSuggestion: (mood: string) => void;
}

export default function SuggestionSection({
  onSelectSuggestion,
}: SuggestionSectionProps) {
  const { data: session } = useSession();

  const suggestions = [
    'Focus',
    'Sleep',
    'Stress-relief',
    'Morning',
    'Deep Calm',
  ];

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {/* Label  */}
      <span className="w-full text-slate-400 text-sm mb-1 text-center font-medium">
        Quick starts:
      </span>

      {/* Suggestion */}
      {suggestions.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelectSuggestion(item)}
          className="px-5 py-2 rounded-full bg-white/50 border border-white text-slate-600 text-sm font-medium 
                     hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 
                     transition-all duration-200 shadow-sm hover:shadow-md active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled = {session? false: true}
        >
          {item}
        </button>
      ))}

      {/* ปุ่มดูเพิ่มเติม */}
      <button
        type="button"
        className="px-5 py-2 rounded-full text-orange-500 text-sm font-semibold hover:underline transition-colors"
      >
        + More ideas
      </button>
    </div>
  );
}
