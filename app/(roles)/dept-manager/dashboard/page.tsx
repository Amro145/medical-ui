"use client";

import data from "@/public/data/data.json";
import { 
  Building, 
  Users, 
  Clock, 
  Activity, 
  PieChart, 
  LogOut,
  CalendarCheck,
  Settings
} from "lucide-react";
import Link from "next/link";

export default function DeptManagerDashboard() {
  const { deptManager } = data;
  const { profile, department, doctorShiftTable, bookingOverview } = deptManager;

  const completionRateValue = parseInt(bookingOverview.completionRate.replace('%', ''));

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-sky-500 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-md">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{profile.name}</h1>
            <p className="text-slate-500 text-sm flex items-center gap-1 font-medium mt-0.5">
              <Activity className="h-4 w-4 text-sky-500" />
              مدير قسم: <span className="font-bold text-slate-700">{department}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden sm:block text-sm font-bold text-sky-700 border border-sky-200 px-4 py-1.5 bg-sky-50 rounded-full tracking-wider shadow-sm">
            نظام إدارة الأقسام
          </p>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-lg transition-colors">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Analytics */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Total Appointments Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-5">
            <div className="h-16 w-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <CalendarCheck className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">إجمالي المواعيد اليوم</p>
              <h2 className="text-3xl font-extrabold text-slate-800">{bookingOverview.totalSlots}</h2>
            </div>
          </section>

          {/* Completion Rate Analytics */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-sky-500" />
                معدل إنجاز المواعيد
              </h3>
            </div>
            
            <div className="flex justify-center items-center relative mb-4">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={440} // 2 * pi * r (r=70) doesn't exactly equal 440, close enough
                  strokeDashoffset={440 - (440 * completionRateValue) / 100}
                  className="text-sky-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-800">{bookingOverview.completionRate}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">مكتمل</span>
              </div>
            </div>

            <div className="flex justify-around mt-6 pt-6 border-t border-slate-100 text-center">
              <div>
                <p className="text-xl font-bold text-emerald-600">{bookingOverview.bookedSlots}</p>
                <p className="text-xs text-slate-500 font-bold">محجوزة</p>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div>
                <p className="text-xl font-bold text-slate-400">{bookingOverview.availableSlots}</p>
                <p className="text-xs text-slate-500 font-bold">متاحة</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Shift Management */}
        <div className="lg:col-span-8">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-500" />
                  جدول مناوبات الأطباء
                </h2>
                <p className="text-sm text-slate-500 mt-1">إدارة مواعيد وحضور أطباء القسم</p>
              </div>
              <Activity className="h-8 w-8 text-slate-200" />
            </div>

            <div className="p-0">
              <table className="w-full text-right">
                <thead className="bg-white border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الطبيب</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الوردية</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">الحالة</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {doctorShiftTable.map((shift, idx) => {
                    const isOnDuty = shift.shift.includes("صباحي") || shift.shift.includes("مسائي");
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
                              {shift.doctorName.replace('د. ', '').charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{shift.doctorName}</p>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">{shift.doctorId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-flex">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-bold">{shift.shift}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${
                            isOnDuty 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                              : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}>
                            {isOnDuty ? "على رأس العمل" : "خارج المناوبة"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 transition-all shadow-sm">
                            <Settings className="h-4 w-4" />
                            إدارة الجدول
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {doctorShiftTable.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-medium">
                        لا يوجد أطباء مجدولين في هذا القسم.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
