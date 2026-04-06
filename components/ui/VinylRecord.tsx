interface VinylRecordProps {
  trackNumber?: string;
  trackTitle?: string;
  currentTime?: string;
  totalTime?: string;
  isRotating?: boolean; // เพิ่มลูกเล่นสั่งหมุนได้
}

export default function VinylRecord({
  trackNumber = "01",
  trackTitle = "SONG TITLE",
  currentTime = "0:00",
  totalTime = "0:00",
  isRotating = false
}: VinylRecordProps) {
  return (
    /* ใช้ aspect-square เพื่อให้คงรูปทรงจัตุรัสเสมอไม่ว่า Container จะกว้างแค่ไหน */
    <div className="relative w-full aspect-square flex items-center justify-start overflow-hidden bg-transparent">
      
      {/* Vinyl Disc: ใช้ Group เพื่อทำ Animation หมุนทั้งแผ่นได้ง่าย */}
      <div className={`
        absolute -left-1/2 w-[140%] aspect-square rounded-full 
        bg-[#111] flex items-center justify-center 
        border-[1vw] border-[#222] shadow-2xl
        ${isRotating ? 'animate-spin-slow' : ''}
      `}>
        {/* Grooves (ร่องแผ่นเสียง - เพิ่ม Detail ให้ดูสมจริงขึ้น) */}
        <div className="absolute inset-4 rounded-full border border-white/5" />
        <div className="absolute inset-12 rounded-full border border-white/5" />
        
        {/* Inner Label (วงกลมกลางแผ่น) */}
        <div className="w-1/3 h-1/3 rounded-full bg-[#eee] flex items-center justify-center shadow-inner">
          <div className="w-[15%] h-[15%] bg-[#111] rounded-full" />
        </div>
      </div>

      {/* Track Info: วาง Position แบบ Relative กับ Container หลัก */}
      <div className="absolute left-[55%] top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <div className="text-[min(1.5vw,12px)] tracking-[0.2em] font-bold flex items-center gap-2 whitespace-nowrap">
          <span className="text-red-600">{trackNumber}.</span> 
          <span className="uppercase">{trackTitle}</span>
        </div>
        
        {/* Progress Time */}
        <div className="text-[min(1.2vw,10px)] font-mono opacity-50 tracking-tighter">
          {currentTime} / {totalTime}
        </div>
      </div>
    </div>
  );
}