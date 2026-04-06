"use client";

import React from "react";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
}

export default function AuroraBackground({ children }: AuroraBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">
      {/* --- Animated Aurora Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-orange-200/50 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-100/40 blur-[100px]"
        />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-orange-100/30 blur-[110px]" />
      </div>

      {/* --- Content Overlay --- */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}