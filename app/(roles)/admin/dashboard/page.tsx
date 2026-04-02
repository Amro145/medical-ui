"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Users, Bed, CreditCard } from 'lucide-react';

export default function AdminDashboard() {
  const { data, loading, error } = useMedicalData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;
  }

  const { analytics } = data.admin;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">نظرة عامة على المستشفى</h2>
          <p className="text-slate-500">مرحباً بك مجدداً، {data.admin.profile.name}</p>
        </div>
        <Button variant="outline" className="gap-2">
           <Activity className="w-4 h-4" />
           تصدير التقرير
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
               <CreditCard className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">الإيرادات اليومية</p>
               <h4 className="text-2xl font-bold text-slate-800">{analytics.dailyRevenue.toLocaleString()} ر.س</h4>
             </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
               <Bed className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">إشغال الأسرة</p>
               <h4 className="text-2xl font-bold text-slate-800">{analytics.bedOccupancy}</h4>
             </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-amber-100 text-amber-600 rounded-xl">
               <Users className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">الزيارات اليوم</p>
               <h4 className="text-2xl font-bold text-slate-800">{analytics.totalVisits}</h4>
             </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
               <Activity className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">الحالات النشطة</p>
               <h4 className="text-2xl font-bold text-slate-800">{analytics.activePatients}</h4>
             </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card noPadding>
            <CardHeader>
               <CardTitle>أداء الأقسام اليوم</CardTitle>
            </CardHeader>
            <div className="p-6">
                <div className="space-y-4">
                   {['الطوارئ (85 مريض)', 'الباطنية (120 مريض)', 'الأطفال (65 مريض)'].map((dept, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                         <span className="font-bold text-slate-700">{dept}</span>
                         <span className="text-emerald-600 text-sm font-bold bg-emerald-100 px-2 py-1 rounded-lg">مستقر</span>
                      </div>
                   ))}
                </div>
            </div>
         </Card>
      </div>
    </div>
  );
}
