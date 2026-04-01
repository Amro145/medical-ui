import Link from 'next/link';
import { Home, Calendar, FileText } from 'lucide-react';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = [
    { title: 'الرئيسية', href: '/patient/dashboard', icon: Home },
    { title: 'مواعيدي', href: '/patient/appointments', icon: Calendar },
    { title: 'ملفي الطبي', href: '/patient/records', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-l border-slate-200 shadow-sm min-h-screen fixed right-0 top-0">
        <div className="p-6 border-b border-slate-100 flex-shrink-0">
          <h2 className="text-2xl font-bold text-blue-600 text-center">الأمل الطبي</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all duration-200"
              >
                <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                <span className="font-medium">{link.title}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
             <Link 
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
             >
                <span className="font-medium">تسجيل الخروج</span>
             </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:mr-64 w-full p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
