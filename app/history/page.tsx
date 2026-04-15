import HistoryCard, { MeditationInfo } from '@/components/ui/HistoryCard';
import VinylRecord from '@/components/ui/VinylRecord';
import getMyMeditations from '@/lib/api/getMyMeditation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function MusicHistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="p-12">Please log in to view history.</div>;
  }

  let meditations: MeditationInfo[] = [];
  if (session?.accessToken) {
    try {
      const response = await getMyMeditations({ token: session.accessToken });
      meditations = response.medias;
    } catch (error) {
      console.error('Failed to fetch meditations:', error);
    }
  }

  return (
    <div className="w-full h-screen relative flex justify-between">
      {/* Left Side */}
      <div className="w-full h-full">
        <VinylRecord
          trackNumber="Cloud Studio"
          trackTitle={'No Track'}
          currentTime="0:00"
          totalTime="0:00"
          isRotating={true}
        />
      </div>

      {/* Right Side */}
      <div className="w-1/2 p-12 flex flex-col justify-between">
        <div className="mt-12">
          <h1 className="text-8xl font-black tracking-tighter leading-[0.8] uppercase mb-4">
            History
          </h1>
          <p className="opacity-60">Meditation Guided Track History</p>
        </div>

        <div className="mt-8 flex-grow">
          <h2 className="text-[10px] font-bold text-red-600 tracking-widest uppercase mb-4">
            Recent Meditations
          </h2>
          <div className="space-y-2">
            {/* 4. ใช้ข้อมูลจริงจาก API มา Loop แทน Mock */}
            {meditations.length > 0 ? (
              meditations.map((item, index) => (
                <HistoryCard
                  key={item.createdAt || index}
                  item={item}
                  index={index}
                />
              ))
            ) : (
              <p className="text-sm opacity-40">No history found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
