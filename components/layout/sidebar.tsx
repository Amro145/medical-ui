"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarProps {
  title: string;
  themeColor: 'emerald' | 'amber' | 'indigo' | 'green' | 'purple' | 'slate';
  icon: React.ElementType;
  links: NavLink[];
}

export function Sidebar({ title, themeColor, icon: Icon, links }: SidebarProps) {
  const pathname = usePathname();

  const themes = {
    emerald: {
      bg: 'bg-emerald-50/50',
      iconBg: 'bg-emerald-100',
      iconText: 'text-emerald-600',
      text: 'text-emerald-900',
      activeBg: 'bg-emerald-600',
      activeText: 'text-white',
      hoverBg: 'hover:bg-emerald-50 hover:text-emerald-700',
      logOutBg: 'bg-white',
      logOutHover: 'hover:bg-rose-50'
    },
    amber: {
      bg: 'bg-amber-50/50',
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-600',
      text: 'text-amber-900',
      activeBg: 'bg-amber-500',
      activeText: 'text-white',
      hoverBg: 'hover:bg-amber-50 hover:text-amber-700',
      logOutBg: 'bg-white',
      logOutHover: 'hover:bg-rose-50'
    },
    indigo: {
      bg: 'bg-indigo-50/50',
      iconBg: 'bg-indigo-100',
      iconText: 'text-indigo-600',
      text: 'text-indigo-900',
      activeBg: 'bg-indigo-600',
      activeText: 'text-white',
      hoverBg: 'hover:bg-indigo-50 hover:text-indigo-700',
      logOutBg: 'bg-white',
      logOutHover: 'hover:bg-rose-50'
    },
    green: {
      bg: 'bg-green-50/50',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      text: 'text-green-900',
      activeBg: 'bg-green-600',
      activeText: 'text-white',
      hoverBg: 'hover:bg-green-50 hover:text-green-700',
      logOutBg: 'bg-white',
      logOutHover: 'hover:bg-rose-50'
    },
    purple: {
      bg: 'bg-purple-50/50',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      text: 'text-purple-900',
      activeBg: 'bg-purple-600',
      activeText: 'text-white',
      hoverBg: 'hover:bg-purple-50 hover:text-purple-700',
      logOutBg: 'bg-white',
      logOutHover: 'hover:bg-rose-50'
    },
    slate: {
      bg: 'bg-slate-100',
      iconBg: 'bg-slate-200',
      iconText: 'text-slate-800',
      text: 'text-slate-900',
      activeBg: 'bg-slate-800',
      activeText: 'text-white',
      hoverBg: 'hover:bg-slate-100 hover:text-slate-900',
      logOutBg: 'bg-white',
      logOutHover: 'hover:bg-rose-50'
    }
  };

  const theme = themes[themeColor];

  return (
    <aside className="w-72 bg-white border-l border-slate-200 hidden md:flex flex-col shadow-lg z-20 sticky top-0 h-screen">
      <div className={`p-6 border-b border-slate-100 flex items-center gap-3 ${theme.bg}`}>
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-sm ${theme.iconBg} ${theme.iconText}`}>
          <Icon className="h-7 w-7" />
        </div>
        <span className={`text-xl font-bold leading-tight ${theme.text}`} dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      
      <nav className="flex-1 p-5 flex flex-col gap-2 overflow-y-auto">
        {links.map((link, idx) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          const LinkIcon = link.icon;
          return (
            <Link 
              key={idx} 
              href={link.href} 
              className={`flex items-center gap-3 px-4 py-3 font-bold rounded-xl transition-all w-full text-right ${
                isActive 
                  ? `${theme.activeBg} ${theme.activeText} shadow-md` 
                  : `text-slate-600 ${theme.hoverBg}`
              }`}
            >
              <LinkIcon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-slate-100 bg-slate-50">
        <Link href="/" className={`flex items-center justify-center gap-2 px-4 py-3 text-rose-600 border border-rose-100 shadow-sm font-bold rounded-xl transition-colors w-full text-center ${theme.logOutBg} ${theme.logOutHover}`}>
          <LogOut className="h-5 w-5" />
          خروج من النظام
        </Link>
      </div>
    </aside>
  );
}
