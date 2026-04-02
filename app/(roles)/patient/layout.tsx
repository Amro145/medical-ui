import React from "react";
import { Activity, Home, Calendar, Clock, Settings, FileText } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/patient/dashboard", label: "لوحة المتابعة", icon: Home },
    { href: "/patient/appointments", label: "حجز المواعيد", icon: Calendar },
    { href: "/patient/history", label: "المواعيد السابقة", icon: Clock },
    { href: "/patient/reports", label: "التقارير الطبية", icon: FileText },
    { href: "/patient/settings", label: "إعدادات الحساب", icon: Settings },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f7fb] flex font-sans">
      <Sidebar title="بوابة<br/>المراجعين" themeColor="emerald" icon={Activity} links={links} />
      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)]">
        <Topbar title="بوابة<br/>المراجعين" themeColor="emerald" icon={Activity} userName="أحمد محمود" />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}
