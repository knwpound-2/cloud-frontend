export default function Footer() {
  return (
    <footer className="w-full max-w-4xl px-6 overflow-hidden hidden md:block">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />
      <p className="text-slate-400 text-sm font-medium mb-4 ml-4">
        Your Recent Meditations
      </p>
      <div className="flex gap-4 opacity-50 grayscale">
        <div className="h-20 w-64 bg-white/40 rounded-2xl border border-white" />
        <div className="h-20 w-64 bg-white/40 rounded-2xl border border-white" />
      </div>
    </footer>
  );
}
