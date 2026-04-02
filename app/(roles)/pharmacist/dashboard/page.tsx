"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Package, Activity, AlertTriangle, FileCheck } from 'lucide-react';

export default function PharmacistDashboard() {
  const { data, loading, error } = useMedicalData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;
  }

  const { inventory } = data.pharmacist;
  const lowStock = inventory.filter((med: any) => med.stockLevel < 50);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">لوحة الصيدلية</h2>
          <p className="text-purple-600 font-semibold">{data.pharmacist.profile.name} - إدارة الأدوية والوصفات</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
           <Activity className="w-4 h-4" />
           صرف وصفة جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-purple-100 text-purple-600 rounded-xl">
               <Package className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">إجمالي الأصناف</p>
               <h4 className="text-2xl font-bold text-slate-800">{inventory.length} صنف</h4>
             </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-rose-100 text-rose-600 rounded-xl">
               <AlertTriangle className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">أدوية منخفضة المخزون</p>
               <h4 className="text-2xl font-bold text-slate-800">{lowStock.length} أدوية</h4>
             </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
               <FileCheck className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">تم صرفه اليوم</p>
               <h4 className="text-2xl font-bold text-slate-800">12 وصفة</h4>
             </div>
          </div>
        </Card>
      </div>

      <Card noPadding className="border-purple-100/50">
         <CardHeader>
            <div className="flex justify-between items-center w-full">
              <CardTitle>أدوية منخفضة المخزون تتطلب طلبية</CardTitle>
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                رؤية كامل المخزون
              </Button>
            </div>
         </CardHeader>
         <Table>
            <Thead>
               <Tr>
                 <Th>رقم الصنف</Th>
                 <Th>اسم الدواء</Th>
                 <Th>السعر</Th>
                 <Th>الكمية المتبقية</Th>
                 <Th>الإجراء</Th>
               </Tr>
            </Thead>
            <Tbody>
               {lowStock.map((med: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500 text-xs">{med.medicineId}</Td>
                   <Td className="font-bold text-slate-800">{med.name}</Td>
                   <Td className="text-slate-600">{med.price} ر.س</Td>
                   <Td>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${med.stockLevel < 20 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                        {med.stockLevel} علبة
                      </span>
                   </Td>
                   <Td>
                      <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 h-8 text-xs">
                        طلب إمداد
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
