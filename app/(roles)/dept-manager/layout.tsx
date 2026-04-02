"use client";

import React from "react";
import { Users, LayoutDashboard, CalendarClock, UserCheck } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DeptManagerLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/dept-manager/dashboard", label: "لوحة المدير", icon: LayoutDashboard },
    { href: "/dept-manager/shifts", label: "المناوبات", icon: CalendarClock },
    { href: "/dept-manager/staff", label: "طاقم العمل", icon: UserCheck }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f7fb] flex font-sans">
      <Sidebar title="إدارة<br/>القسم" themeColor="indigo" icon={Users} links={links} />
      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)]">
        <Topbar title="إدارة<br/>القسم" themeColor="indigo" icon={Users} userName="د. نادية إبراهيم" />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}
