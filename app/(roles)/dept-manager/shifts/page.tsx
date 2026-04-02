"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function DeptManagerShiftsPage() {
  const { data, loading, error } = useMedicalData();

  if (loading) return <div className="p-12 text-center text-indigo-600 font-bold">جاري تحميل جدول المناوبات...</div>;
  if (error || !data) return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;

  const { doctorShiftTable } = data.deptManager;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">جدولة المناوبات</h2>
          <p className="text-slate-500">توزيع الكادر الطبي لضمان تغطية القسم على مدار الساعة</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">دورة مناوبات جديدة</Button>
      </div>

      <Card noPadding>
         <Table>
            <Thead>
               <Tr>
                 <Th>اسم الطبيب</Th>
                 <Th>الفترة</Th>
                 <Th>القسم</Th>
                 <Th>إجراءات إدارية</Th>
               </Tr>
            </Thead>
            <Tbody>
               {doctorShiftTable.map((shift: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-bold text-slate-800">{shift.doctorName}</Td>
                   <Td>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${shift.shift.includes('صباحي') ? 'bg-amber-100 text-amber-700' : shift.shift.includes('مسائي') ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-800 text-white'}`}>
                        {shift.shift}
                     </span>
                   </Td>
                   <Td className="text-slate-600 text-sm">الباطنة والطوارئ</Td>
                   <Td>
                     <Button variant="outline" size="sm" className="h-8 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50">تغيير المناوبة</Button>
                   </Td>
                 </Tr>
               ))}
            </Tbody>
         </Table>
      </Card>
    </div>
  );
}
