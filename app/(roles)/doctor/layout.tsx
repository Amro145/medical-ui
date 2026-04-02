import React from "react";
import { Stethoscope, LayoutDashboard, Calendar, Users, FileSignature } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/doctor/dashboard", label: "لوحة الطبيب", icon: LayoutDashboard },
    { href: "/doctor/appointments", label: "مواعيدي", icon: Calendar },
    { href: "/doctor/patients", label: "مرضاي", icon: Users },
    { href: "/doctor/prescriptions", label: "كتابة وصفة", icon: FileSignature }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f7fb] flex font-sans">
      <Sidebar title="بوابة<br/>الطبيب" themeColor="green" icon={Stethoscope} links={links} />
      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)]">
        <Topbar title="بوابة<br/>الطبيب" themeColor="green" icon={Stethoscope} userName="د. خالد عبد الرحمن" />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}
