"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Activity, CheckCircle } from 'lucide-react';

export default function DoctorDashboard() {
  const { data, loading, error } = useMedicalData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;
  }

  const { schedule } = data.doctor;
  const todayAppointments = schedule.bookedSlots.filter((app: any) => app.date === "2026-04-10");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">لوحة القيادة</h2>
          <p className="text-green-600 font-semibold">مرحباً، {data.doctor.profile.name} ({data.doctor.profile.specialty})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-green-100 text-green-600 rounded-xl">
               <Calendar className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">مواعيد اليوم</p>
               <h4 className="text-2xl font-bold text-slate-800">{todayAppointments.length}</h4>
             </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
               <CheckCircle className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">تم معاينتهم</p>
               <h4 className="text-2xl font-bold text-slate-800">0</h4>
             </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
               <Users className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">إجمالي المرضى المجدولين</p>
               <h4 className="text-2xl font-bold text-slate-800">{schedule.bookedSlots.length}</h4>
             </div>
          </div>
        </Card>
      </div>

      <Card noPadding className="border-green-100/50">
         <CardHeader>
            <div className="flex justify-between items-center w-full">
              <CardTitle>مواعيد اليوم (10 أبريل 2026)</CardTitle>
              <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                كل المواعيد
              </Button>
            </div>
         </CardHeader>
         <Table>
            <Thead>
               <Tr>
                 <Th>الوقت</Th>
                 <Th>اسم المريض</Th>
                 <Th>رقم الملف</Th>
                 <Th>الإجراء</Th>
               </Tr>
            </Thead>
            <Tbody>
               {todayAppointments.map((app: any, idx: number) => (
                 <Tr key={idx}>
                   <Td>
                      <div className="flex items-center gap-2 font-bold text-slate-700">
                         {app.time}
                      </div>
                   </Td>
                   <Td className="font-bold text-slate-800">{app.patientName}</Td>
                   <Td className="font-mono text-slate-500 text-xs">{app.patientId}</Td>
                   <Td>
                      <Button variant="secondary" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 shadow-none border border-green-200">
                        فتح الملف والتسجيل
                      </Button>
                   </Td>
                 </Tr>
               ))}
               {todayAppointments.length === 0 && (
                 <Tr>
                   <Td colSpan={4} className="text-center py-8 text-slate-500">لا يوجد مواعيد لليوم</Td>
                 </Tr>
               )}
            </Tbody>
         </Table>
      </Card>
    </div>
  );
}
