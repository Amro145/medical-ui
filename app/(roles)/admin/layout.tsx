import React from "react";
import { Building, LayoutDashboard, Users, UserCog, Settings } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/admin/dashboard", label: "لوحة القيادة", icon: LayoutDashboard },
    { href: "/admin/users", label: "إدارة المستخدمين", icon: Users },
    { href: "/admin/departments", label: "الأقسام", icon: UserCog },
    { href: "/admin/settings", label: "الإعدادات", icon: Settings }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f7fb] flex font-sans">
      <Sidebar title="إدارة<br/>المستشفى" themeColor="slate" icon={Building} links={links} />
      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)]">
        <Topbar title="إدارة<br/>المستشفى" themeColor="slate" icon={Building} userName="م. طارق سليمان" />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
