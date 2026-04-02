import React from 'react';

export function Table({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-right border-collapse">
        {children}
      </table>
    </div>
  );
}

export function Thead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-slate-50/80 border-b border-slate-200">{children}</thead>;
}

export function Tbody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-slate-100">{children}</tbody>;
}

export function Tr({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <tr className={`hover:bg-slate-50/50 transition-colors ${className}`}>{children}</tr>;
}

export function Th({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <th className={`px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap ${className}`}>{children}</th>;
}

export function Td({ children, className = '', colSpan }: { children: React.ReactNode, className?: string, colSpan?: number }) {
  return <td colSpan={colSpan} className={`px-6 py-4 text-sm text-slate-700 whitespace-nowrap ${className}`}>{children}</td>;
}
