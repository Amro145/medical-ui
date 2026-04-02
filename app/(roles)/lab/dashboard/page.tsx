"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Microscope, Activity, Clock, Plus } from 'lucide-react';

export default function LabDashboard() {
  const { data, loading, error } = useMedicalData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;
  }

  const { testCatalog } = data.labTech;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">لوحة المختبر</h2>
          <p className="text-amber-600 font-semibold">{data.labTech.profile.name} - تحليل وتدوين النتائج</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 gap-2">
           <Plus className="w-4 h-4" />
           تسجيل نتيجة حديثة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-amber-100 text-amber-600 rounded-xl">
               <Clock className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">عينات قيد الانتظار</p>
               <h4 className="text-2xl font-bold text-slate-800">4 عينات</h4>
             </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
               <Activity className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">تم إنجازه اليوم</p>
               <h4 className="text-2xl font-bold text-slate-800">8 تحاليل</h4>
             </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-slate-100 text-slate-600 rounded-xl">
               <Microscope className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">دليل التحاليل المتاحة</p>
               <h4 className="text-2xl font-bold text-slate-800">{testCatalog.length} تحليل</h4>
             </div>
          </div>
        </Card>
      </div>

      <Card noPadding className="border-amber-100/50">
         <CardHeader>
            <div className="flex justify-between items-center w-full">
              <CardTitle>دليل التحاليل المخبرية والأسعار</CardTitle>
            </div>
         </CardHeader>
         <Table>
            <Thead>
               <Tr>
                 <Th>كود التحليل</Th>
                 <Th>اسم التحليل</Th>
                 <Th>التكلفة التقريبية</Th>
                 <Th>تعديل السعر</Th>
               </Tr>
            </Thead>
            <Tbody>
               {testCatalog.map((test: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500 text-xs">{test.testId}</Td>
                   <Td className="font-bold text-slate-800">{test.name}</Td>
                   <Td className="text-amber-600 font-bold">{test.price} ر.س</Td>
                   <Td>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-amber-600 h-8 text-xs">
                        تعديل
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
