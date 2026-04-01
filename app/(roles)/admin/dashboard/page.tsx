"use client";

import data from "@/public/data/data.json";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Bed, 
  Wallet,
  ActivitySquare,
  ShieldAlert,
  Clock,
  CheckCircle2,
  PieChart
} from "lucide-react";

export default function AdminDashboard() {
  const { admin, deptManager } = data;
  const { analytics } = admin;
  const { bookingOverview } = deptManager;

  const completionRateValue = parseInt(bookingOverview.completionRate.replace('%', ''));

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9fc] text-slate-900 font-sans">
      {/* Top Banner indicating Management Only */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center py-2 text-sm font-bold flex items-center justify-center gap-2">
        <ShieldAlert className="h-4 w-4 text-rose-500" />
        هذه الصفحة مخصصة للإدارة العليا فقط
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-md">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{admin.profile.name}</h1>
            <p className="text-slate-500 text-sm flex items-center gap-1 font-medium">
              <ActivitySquare className="h-4 w-4" />
              مدير المستشفى
            </p>
          </div>
        </div>
        <div>
          <button className="hidden sm:flex text-sm font-bold text-slate-800 border-2 border-slate-200 px-4 py-2 bg-white rounded-lg items-center gap-2 hover:bg-slate-50 transition-colors">
            <PieChart className="h-4 w-4" />
            تحميل تقرير اليوم
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Level 1: Key Statistics Cards */}
        <section>
           <h2 className="text-lg font-bold text-slate-800 mb-4">نظرة عامة على الأداء</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
             {/* Daily Revenue */}
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">الإيرادات اليومية</p>
                   <p className="text-2xl font-bold text-slate-900">{analytics.dailyRevenue.toLocaleString('ar-SA')} <span className="text-sm font-medium text-slate-500">ر.س</span></p>
                </div>
                <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                   <Wallet className="h-6 w-6" />
                </div>
             </div>

             {/* Total Visits */}
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">إجمالي الزيارات</p>
                   <p className="text-2xl font-bold text-slate-900">{analytics.totalVisits}</p>
                </div>
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                   <Users className="h-6 w-6" />
                </div>
             </div>

             {/* Active Patients */}
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">المرضى النشطين</p>
                   <p className="text-2xl font-bold text-slate-900">{analytics.activePatients}</p>
                </div>
                <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                   <ActivitySquare className="h-6 w-6" />
                </div>
             </div>

             {/* Bed Occupancy */}
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">إشغال الأسرة</p>
                   <p className="text-2xl font-bold text-slate-900">{analytics.bedOccupancy}</p>
                </div>
                <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
                   <Bed className="h-6 w-6" />
                </div>
             </div>
           </div>
        </section>

        {/* Level 2: Department Overview & Visual Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
           {/* Section: Department Overview */}
           <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between">
               <div>
                  <h2 className="text-lg font-bold text-slate-800">إدارة الأقسام: {deptManager.department}</h2>
                  <p className="text-sm text-slate-500 mt-1">المدير المسؤول: {deptManager.profile.name}</p>
               </div>
             </div>
             
             <div className="p-0">
               <div className="bg-slate-50 border-b border-slate-100 px-6 py-3">
                 <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    جدول مناوبات الأطباء
                 </h3>
               </div>
               <div className="p-4 flex flex-col gap-3">
                 {deptManager.doctorShiftTable.map((shiftInfo, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
                       <div>
                          <p className="font-bold text-slate-800 text-sm mb-1">{shiftInfo.doctorName}</p>
                          <p className="text-xs font-medium text-slate-500">{shiftInfo.doctorId}</p>
                       </div>
                       <div className="bg-white border rounded-lg px-3 py-1.5 shadow-sm">
                         <p className="text-sm font-bold text-slate-700">{shiftInfo.shift}</p>
                       </div>
                    </div>
                 ))}
               </div>
             </div>
           </section>

           {/* Section: Booking Operations Chart (Visual Mockup) */}
           <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                 <h2 className="text-lg font-bold text-slate-800 mb-2">أداء الحجوزات والمواعيد</h2>
                 <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">معدل الإنجاز واستغلال المساحات المتاحة في الأقسام.</p>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                 <div className="relative pt-1 w-full max-w-sm mx-auto mb-8">
                   <div className="flex mb-2 items-center justify-between">
                     <div>
                       <span className="text-xs font-bold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-100">
                         معدل الاستكمال
                       </span>
                     </div>
                     <div className="text-right">
                       <span className="text-3xl font-bold inline-block text-slate-800">
                         {bookingOverview.completionRate}
                       </span>
                     </div>
                   </div>
                   <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-slate-100 shadow-inner">
                     <div 
                        style={{ width: `${completionRateValue}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 rounded-full transition-all duration-1000 ease-in-out"
                     ></div>
                   </div>
                   <div className="flex justify-between text-xs font-bold text-slate-500 mt-2 px-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                    <div className="text-center">
                       <div className="text-2xl font-bold text-slate-800 w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                          {bookingOverview.totalSlots}
                       </div>
                       <p className="text-xs font-bold text-slate-500">الكلية</p>
                    </div>
                    <div className="text-center relative">
                       <div className="text-2xl font-bold text-indigo-600 w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                          {bookingOverview.bookedSlots}
                       </div>
                       <p className="text-xs font-bold text-indigo-600">المحجوزة</p>
                       <CheckCircle2 className="absolute top-0 right-1/4 translate-x-2 text-indigo-500 h-4 w-4" />
                    </div>
                    <div className="text-center">
                       <div className="text-2xl font-bold text-emerald-600 w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                          {bookingOverview.availableSlots}
                       </div>
                       <p className="text-xs font-bold text-emerald-600">المتاحة</p>
                    </div>
                 </div>
              </div>
           </section>

        </div>
      </main>
    </div>
  );
}
