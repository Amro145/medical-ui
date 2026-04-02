"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';

export default function DoctorAppointmentsPage() {
  const { data, loading, error } = useMedicalData();

  if (loading) return <div className="p-12 text-center text-green-600 font-bold">جاري تحميل المواعيد...</div>;
  if (error || !data) return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;

  const { schedule } = data.doctor;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">جدول المواعيد الشامل</h2>
          <p className="text-slate-500">استعرض كافة الشواغر والمواعيد المحجوزة</p>
        </div>
      </div>

      <Card noPadding>
         <CardHeader>
            <CardTitle>كافة المواعيد المحجوزة</CardTitle>
         </CardHeader>
         <Table>
            <Thead>
               <Tr>
                 <Th>التاريخ</Th>
                 <Th>الوقت</Th>
                 <Th>اسم المريض</Th>
                 <Th>رقم الملف</Th>
               </Tr>
            </Thead>
            <Tbody>
               {schedule.bookedSlots.map((app: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500">{app.date}</Td>
                   <Td className="font-bold text-slate-700">{app.time}</Td>
                   <Td className="font-bold text-slate-800">{app.patientName}</Td>
                   <Td className="font-mono text-slate-400 text-xs">{app.patientId}</Td>
                 </Tr>
               ))}
               {schedule.bookedSlots.length === 0 && (
                 <Tr>
                   <Td colSpan={4} className="text-center py-8 text-slate-500">لا توجد مواعيد محجوزة</Td>
                 </Tr>
               )}
            </Tbody>
         </Table>
      </Card>
    </div>
  );
}
