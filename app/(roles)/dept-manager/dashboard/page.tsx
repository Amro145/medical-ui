"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Users, CalendarCheck, Clock, UserCog } from 'lucide-react';

export default function DeptManagerDashboard() {
  const { data, loading, error } = useMedicalData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;
  }

  const { department, bookingOverview, doctorShiftTable } = data.deptManager;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">نظرة عامة على القسم</h2>
          <p className="text-indigo-600 font-semibold">{department} | اشراف: {data.deptManager.profile.name}</p>
        </div>
        <Button variant="primary" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
           <UserCog className="w-4 h-4" />
           إدارة المناوبات
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-slate-100 text-slate-600 rounded-xl">
               <CalendarCheck className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">إجمالي المواعيد</p>
               <h4 className="text-2xl font-bold text-slate-800">{bookingOverview.totalSlots}</h4>
             </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl">
               <Users className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">المواعيد المحجوزة</p>
               <h4 className="text-2xl font-bold text-slate-800">{bookingOverview.bookedSlots}</h4>
             </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
               <UserCog className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">مواعيد متاحة</p>
               <h4 className="text-2xl font-bold text-slate-800">{bookingOverview.availableSlots}</h4>
             </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
               <Clock className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">نسبة الإنجاز</p>
               <h4 className="text-2xl font-bold text-slate-800">{bookingOverview.completionRate}</h4>
             </div>
          </div>
        </Card>
      </div>

      <Card noPadding>
         <CardHeader>
            <CardTitle>جدول مناوبات الأطباء (اليوم)</CardTitle>
         </CardHeader>
         <Table>
            <Thead>
               <Tr>
                 <Th>رقم الطبيب</Th>
                 <Th>اسم الطبيب</Th>
                 <Th>فترة المناوبة</Th>
                 <Th>حالة الحضور</Th>
               </Tr>
            </Thead>
            <Tbody>
               {doctorShiftTable.map((doc: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500">{doc.doctorId}</Td>
                   <Td className="font-bold text-slate-800">{doc.doctorName}</Td>
                   <Td>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${doc.shift.includes('صباحي') ? 'bg-amber-100 text-amber-700' : doc.shift.includes('مسائي') ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-800 text-white'}`}>
                        {doc.shift}
                      </span>
                   </Td>
                   <Td>
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">حاضر</span>
                   </Td>
                 </Tr>
               ))}
            </Tbody>
         </Table>
      </Card>
    </div>
  );
}
