'use client';

import React, { useState } from 'react';
import AuroraBackground from '@/components/layout/AuroraBackground';
import HeaderSection from '@/components/ui/section/HeaderSection';
import InputCard from '@/components/ui/home/InputCard';
import SuggestionSection from '@/components/ui/section/SuggestionSection';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';
import LoadingUi from '@/components/ui/section/LoadingUi';

export default function HomePage() {
  const [mood, setMood] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); 

  const handleGenerateMeditation = async () => {
    if (!mood.trim()) return;

    setIsSubmitting(true);
    try {
      // --- API Fetch Logic ---
      // ตัวอย่างการเรียก API (สมมติว่า API คืนค่า { id: "123" })
      // const response = await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ mood }) });
      // const data = await response.json();
      
      // จำลองการโหลด 3 วินาที
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const mockId = "meditation-" + Date.now(); // จำลอง ID ที่ได้จาก Server

      // เมื่อสำเร็จ: Redirect ไปยังหน้า Player ทันที
      router.push(`/player/${mockId}`);
      
    } catch (error) {
      console.error('Error generating meditation:', error);
      setIsSubmitting(false); // คืนค่าเพื่อให้ User ลองใหม่ได้ถ้า Error
    }
  };

  return (
    <AuroraBackground>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="w-full max-w-3xl px-6 flex flex-col items-center">
          
          {/* Conditional Rendering: ถ้ากำลังโหลดให้แสดง Spinner อย่างเดียว */}
          {isSubmitting ? (
            <LoadingUi title='Please wait a minute' description='Generating your Personal Meditation Guided'/>
          ) : (
            <>
              {/* 1. Header */}
              <HeaderSection
                title={
                  <>
                    How is your mind <span className="text-orange-500">now?</span>
                  </>
                }
                exampleText="I feel anxious about my meeting"
              />

              {/* 2. Input Card */}
              <InputCard
                value={mood}
                onChange={setMood}
                onSubmit={handleGenerateMeditation}
                isSubmitting={isSubmitting}
              />

              {/* 3. Suggestions */}
              <SuggestionSection
                onSelectSuggestion={(selectedMood) => setMood(selectedMood)}
              />
            </>
          )}

        </main>
      </div>
    </AuroraBackground>
  );
}
