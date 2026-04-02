import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

interface TopbarProps {
  title: string;
  icon: React.ElementType;
  themeColor: 'emerald' | 'amber' | 'indigo' | 'green' | 'purple' | 'slate';
  userName?: string;
}

export function Topbar({ title, icon: Icon, themeColor, userName }: TopbarProps) {
  const themes = {
    emerald: 'text-emerald-600 bg-emerald-100',
    amber: 'text-amber-600 bg-amber-100',
    indigo: 'text-indigo-600 bg-indigo-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    slate: 'text-slate-800 bg-slate-200'
  };

  const currentTheme = themes[themeColor];

  return (
    <header className="bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-3 md:hidden">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center shadow-sm ${currentTheme}`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-800" dangerouslySetInnerHTML={{ __html: title.replace('<br/>', ' ') }} />
        </div>
        {userName && (
          <div className="hidden md:flex items-center gap-3">
             <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                {userName.charAt(0)}
             </div>
             <div>
                <p className="text-sm font-bold text-slate-800">{userName}</p>
                <p className="text-xs text-slate-500">متصل الآن</p>
             </div>
          </div>
        )}
      </div>

      <Link href="/" className="md:hidden p-2.5 text-rose-500 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors">
        <LogOut className="h-5 w-5" />
      </Link>
    </header>
  );
}
