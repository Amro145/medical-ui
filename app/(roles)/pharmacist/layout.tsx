import React from "react";
import { Pill, LayoutDashboard, PackageSearch, Activity } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function PharmacistLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/pharmacist/dashboard", label: "لوحة الصيدلي", icon: LayoutDashboard },
    { href: "/pharmacist/dispense", label: "صرف الأدوية", icon: Activity },
    { href: "/pharmacist/inventory", label: "إدارة المخزون", icon: PackageSearch }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f7fb] flex font-sans">
      <Sidebar title="بوابة<br/>الصيدلية" themeColor="purple" icon={Pill} links={links} />
      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)]">
        <Topbar title="بوابة<br/>الصيدلية" themeColor="purple" icon={Pill} userName="ص. سارة سعيد" />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}
