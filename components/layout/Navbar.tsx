'use client';

import Link from 'next/link';
import { Home, History, Settings, Wind, UserPlus, LogIn , LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  const navItems = session
    ? [
        { name: 'Home', href: '/', icon: <Home size={18} /> },
        { name: 'History', href: '/history', icon: <History size={18} /> },
        {
          name: 'Sign Out',
          onClick: ()=> signOut({ callbackUrl: '/api/auth/signin' }),
          icon: <LogOut size={18} />,
        },
      ]
    : [
        {
          name: 'Sign up',
          href: '/auth/register',
          icon: <UserPlus size={18} />,
        },
        { name: 'Login', href: '/auth/signin', icon: <LogIn size={18} /> },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* --- Logo (Align Left) --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200 transition-transform group-hover:scale-110">
            <Wind size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            MindFlow
          </span>
        </Link>

        {/* --- Nav Links (Align Right) --- */}
        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/50 shadow-sm">
          {navItems.map((item) => {
            const commonClass =
              'flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 font-medium text-sm transition-all hover:bg-white hover:text-orange-600 hover:shadow-sm active:scale-95';

            const content = (
              <>
                {item.icon}
                <span className="hidden md:block">{item.name}</span>
              </>
            );

            return item.href ? (
              <Link key={item.name} href={item.href} className={commonClass}>
                {content}
              </Link>
            ) : (
              <button
                key={item.name}
                onClick={item.onClick}
                className={commonClass}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
