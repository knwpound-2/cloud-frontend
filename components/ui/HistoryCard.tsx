import { formatTimestamp } from '@/lib/util/formatTimestamp';
import Link from 'next/link';

export interface MeditationInfo {
  userId: string;
  createdAt: string;
  mood: string;
  audioUrl: string;
  userInput: string;
}
interface HistoryCardProps {
  item: MeditationInfo;
  index: number;
}

export default function HistoryCard({ item, index }: HistoryCardProps) {
  const filename = item.audioUrl.split('/').pop() || '';
  const slug = filename.replace('.mp3', '');
  const createdAt = formatTimestamp(item.createdAt);
  return (
    <Link
      href={`/player/${slug}?mood=${item.mood}`}
      className="group flex items-center justify-between p-2 hover:bg-gray-50 transition-colors rounded-lg border border-transparent hover:border-gray-200"
    >
      <div className="flex items-center gap-4">
        {/* ลำดับเพลง (เติม 0 ข้างหน้าถ้า < 10) */}
        <span className="text-[10px] font-bold opacity-40">
          {(index + 1).toString().padStart(2, '0')}
        </span>

        <img
          src={'cover.png'}
          alt={item.mood}
          className="w-10 h-10 object-cover rounded-sm"
        />

        <div>
          <h3 className="text-[11px] font-bold tracking-tight leading-tight group-hover:text-black">
            {item.mood}
          </h3>
          <p className="text-[9px] font-medium opacity-50 tracking-wider uppercase">
            {createdAt}
          </p>
        </div>
      </div>

      <span className="text-[10px] font-mono opacity-60">{item.userId}</span>
    </Link>
  );
}
