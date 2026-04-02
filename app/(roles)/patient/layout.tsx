import { Activity, Home, Calendar, Clock, LogOut, Settings, UserCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f7fb] flex font-sans">
      {/* Sidebar for Patient */}
      <aside className="w-72 bg-white border-l border-slate-200 hidden md:flex flex-col shadow-lg z-20 sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-emerald-50/50">
          <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
            <Activity className="h-7 w-7" />
          </div>
          <span className="text-xl font-bold text-emerald-900 leading-tight">بوابة<br/>المراجعين</span>
        </div>
        
        <nav className="flex-1 p-5 flex flex-col gap-2">
          <Link href="/patient/dashboard" className="flex items-center gap-3 px-4 py-3 bg-emerald-600 shadow-md text-white font-bold rounded-xl transition-all hover:bg-emerald-700">
            <Home className="h-5 w-5" />
            لوحة المتابعة
          </Link>
          <Link href="/patient/appointments" className="flex items-center gap-3 px-4 py-3 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:text-emerald-700 transition-colors w-full text-right mt-2">
            <Calendar className="h-5 w-5" />
            حجز المواعيد
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors w-full text-right cursor-not-allowed opacity-50 mt-2">
            <Clock className="h-5 w-5" />
            المواعيد السابقة
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors w-full text-right cursor-not-allowed opacity-50">
            <FileText className="h-5 w-5" />
            التقارير الطبية
          </button>
          <button className="flex items-center gap-3 px-4 py-3 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors w-full text-right cursor-not-allowed opacity-50">
            <Settings className="h-5 w-5" />
            إعدادات الحساب
          </button>
        </nav>

        <div className="p-5 border-t border-slate-100 bg-slate-50">
          <Link href="/" className="flex items-center justify-center gap-2 px-4 py-3 text-rose-600 bg-white border border-rose-100 shadow-sm font-bold rounded-xl hover:bg-rose-50 transition-colors w-full text-center">
            <LogOut className="h-5 w-5" />
            خروج من النظام
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header (visible only on small screens) */}
        <header className="md:hidden bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <Activity className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-800">بوابة المراجعين</span>
          </div>
          <Link href="/" className="p-2.5 text-rose-500 bg-rose-50 rounded-xl">
             <LogOut className="h-5 w-5" />
          </Link>
        </header>
        
        <div className="flex-1 w-full relative">
           {children}
        </div>
      </main>
    </div>
  );
}
