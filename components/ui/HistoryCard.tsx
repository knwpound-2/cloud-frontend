import Link from 'next/link'; 

interface HistoryCardProps {
  item: {
    id: string;
    title: string;
    album: string;
    duration: string;
    image: string;
  };
  index: number;
}

export default function HistoryCard({ item, index }: HistoryCardProps) {
  return (
    <Link
      href={`/player/${item.id}`}
      className="group flex items-center justify-between p-2 hover:bg-gray-50 transition-colors rounded-lg border border-transparent hover:border-gray-200"
    >
      <div className="flex items-center gap-4">
        {/* ลำดับเพลง (เติม 0 ข้างหน้าถ้า < 10) */}
        <span className="text-[10px] font-bold opacity-40">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        
        <img
          src={item.image}
          alt={item.title}
          className="w-10 h-10 object-cover rounded-sm shadow-sm"
        />
        
        <div>
          <h3 className="text-[11px] font-bold tracking-tight leading-tight group-hover:text-black">
            {item.title}
          </h3>
          <p className="text-[9px] font-medium opacity-50 tracking-wider uppercase">
            {item.album}
          </p>
        </div>
      </div>

      <span className="text-[10px] font-mono opacity-60">
        {item.duration}
      </span>
    </Link>
  );
}