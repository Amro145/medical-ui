import React from "react";
import { Microscope, LayoutDashboard, FlaskConical, FileCheck } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/lab/dashboard", label: "لوحة المختبر", icon: LayoutDashboard },
    { href: "/lab/requests", label: "طلبات التحاليل", icon: FlaskConical },
    { href: "/lab/results/new", label: "إدخال نتيجة", icon: FileCheck }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f7fb] flex font-sans">
      <Sidebar title="بوابة<br/>المختبر" themeColor="amber" icon={Microscope} links={links} />
      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)]">
        <Topbar title="بوابة<br/>المختبر" themeColor="amber" icon={Microscope} userName="فني. سمير يوسف" />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}
