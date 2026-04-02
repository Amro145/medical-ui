"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function DoctorPatientsPage() {
  const { data, loading, error } = useMedicalData();

  if (loading) return <div className="p-12 text-center text-green-600 font-bold">جاري تحميل سجلات المرضى...</div>;
  if (error || !data) return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;

  const { patients } = data;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">دليل المرضى</h2>
          <p className="text-slate-500">ابحث واستعرض السجلات الطبية التابعة لك</p>
        </div>
        <div className="relative w-full md:w-96">
           <input type="text" placeholder="البحث باسم المريض أو رقم الجوال..." className="w-full border border-slate-200 rounded-xl py-2.5 px-10 outline-none focus:ring-2 focus:ring-green-600" />
           <Search className="w-5 h-5 text-slate-400 absolute top-3 right-3" />
        </div>
      </div>

      <Card noPadding>
         <Table>
            <Thead>
               <Tr>
                 <Th>رقم الملف</Th>
                 <Th>اسم المريض</Th>
                 <Th>رقم الجوال</Th>
                 <Th>فصيلة الدم</Th>
                 <Th>الإجراء</Th>
               </Tr>
            </Thead>
            <Tbody>
               {patients.map((patient: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500 text-xs">{patient.id}</Td>
                   <Td className="font-bold text-slate-800">{patient.profile.name}</Td>
                   <Td className="font-mono text-slate-600">{patient.profile.phone}</Td>
                   <Td>
                      <span className="font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg text-xs">{patient.profile.bloodType}</span>
                   </Td>
                   <Td>
                      <Button variant="outline" size="sm" className="h-8 text-xs text-green-700 border-green-200 hover:bg-green-50">
                        فتح السجل
                      </Button>
                   </Td>
                 </Tr>
               ))}
            </Tbody>
         </Table>
      </Card>
    </div>
  );
}
