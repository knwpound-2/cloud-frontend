'use client';

import React, { useState } from 'react';
import AuroraBackground from '@/components/layout/AuroraBackground';
import HeaderSection from '@/components/ui/section/HeaderSection';
import InputCard from '@/components/ui/home/InputCard';
import SuggestionSection from '@/components/ui/section/SuggestionSection';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';
import LoadingUi from '@/components/ui/section/LoadingUi';
import generateMeditation from '@/lib/api/generateMeditation';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const [mood, setMood] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleGenerateMeditation = async () => {
    if (!session?.accessToken || !mood.trim()) return;

    setIsSubmitting(true);
    try {
      const data = await generateMeditation({
        userInput: mood,
        token: session.accessToken,
      });

      // สมมติ data.url คือ "https://.../meditations/slug-name.mp3"
      if (data?.url) {
        // 1. แยก String ด้วย "/" แล้วเอาตัวสุดท้าย (.pop)
        // 2. ลบนามสกุลไฟล์ ".mp3" ออกด้วย .replace
        const filename = data.url.split('/').pop();
        const slug = filename.replace('.mp3', '');

        // ย้ายการ push มาไว้ใน try เพื่อให้แน่ใจว่าได้ slug มาจริงๆ ก่อนเปลี่ยนหน้า
        router.push(`/player/${slug}?mood=${data.mood}`);
      }
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการสร้างบทนำสมาธิ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuroraBackground>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <main className="w-full max-w-3xl px-6 flex flex-col items-center">
          {/* Conditional Rendering: ถ้ากำลังโหลดให้แสดง Spinner อย่างเดียว */}
          {isSubmitting ? (
            <LoadingUi
              title="Please wait a minute"
              description="Generating your Personal Meditation Guided"
            />
          ) : (
            <>
              {/* 1. Header */}
              <HeaderSection
                title={
                  <>
                    How is your mind{' '}
                    <span className="text-orange-500">now?</span>
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
