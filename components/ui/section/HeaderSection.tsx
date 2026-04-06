"use client";

import React from "react";

interface HeaderSectionProps {
  title?: React.ReactNode;      // รับเป็น Node เพื่อให้ใส่ <span> สีส้มได้
  description?: string;
  exampleText?: string;
  className?: string;           // เผื่อปรับแต่ง margin/padding เพิ่มเติม
}

export default function HeaderSection({
  title = "How is your mind now?", 
  description = "Describe your current mood or what you need meditation for.",
  exampleText,
  className = "mb-10",
}: HeaderSectionProps) {
  return (
    <header className={`${className} text-center`}>
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-4 tracking-tight">
        {title}
      </h1>

      {/* Description */}
      <div className="text-slate-500 text-lg max-w-2xl mx-auto">
        <p>{description}</p>
        
        {/* Example Text  */}
        {exampleText && (
          <p className="mt-2 text-sm opacity-70 italic text-slate-400">
            Example: "{exampleText}"
          </p>
        )}
      </div>
    </header>
  );
}