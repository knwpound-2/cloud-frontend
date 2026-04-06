import HistoryCard from '@/components/ui/HistoryCard';
import VinylRecord from '@/components/ui/VinylRecord';

const MOCK_HISTORY = [
  {
    id: '1',
    title: 'THE LESS I KNOW THE BETTER',
    album: 'CURRENTS',
    duration: '3:36',
    image: 'https://placehold.co/40x40',
  },
  {
    id: '2',
    title: 'BORDERLINE',
    album: 'THE SLOW RUSH',
    duration: '4:08',
    image: 'https://placehold.co/40x40',
  },
  {
    id: '3',
    title: 'FEELS LIKE WE ONLY GO BACKWARDS',
    album: 'LONERISM',
    duration: '3:12',
    image: 'https://placehold.co/40x40',
  },
  {
    id: '4',
    title: 'NO CHOICE',
    album: 'THE SLOW RUSH',
    duration: '3:41',
    image: 'https://placehold.co/40x40',
  },
];

const MusicHistoryPage = () => {
  return (
    <div className="w-full h-screen relative flex justify-between">
      {/* Left Side: Vinyl Record Visual */}
      <div className="w-full h-full">
        {' '}
        {/* กำหนดขนาดที่นี่ที่เดียว */}
        <VinylRecord
          trackNumber="Cloud Studio"
          trackTitle="Borderline"
          currentTime="2:43"
          totalTime="4:08"
          isRotating={true}
        />
      </div>

      {/* Right Side: Content */}
      <div className="w-1/2 p-12 flex flex-col justify-between">
        {/* Main Title & Subtitle */}
        <div className="mt-12">
          <h1 className="text-8xl font-black tracking-tighter leading-[0.8] uppercase mb-4">
            History
          </h1>
          <p className="opacity-60">Meditation Guided Track History</p>
        </div>

        {/* Cards List */}
        <div className="mt-8 flex-grow">
          <h2 className="text-[10px] font-bold text-red-600 tracking-widest uppercase mb-4">
            Popular
          </h2>
          <div className="space-y-2">
            {MOCK_HISTORY.map((item, index) => (
              <HistoryCard item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicHistoryPage;
