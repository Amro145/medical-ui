"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function PharmacistInventoryPage() {
  const { data, loading, error } = useMedicalData();

  if (loading) return <div className="p-12 text-center text-purple-600 font-bold">جاري الوصول للمخزن...</div>;
  if (error || !data) return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;

  const { inventory } = data.pharmacist;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">إدارة المخزون والتوريد</h2>
          <p className="text-slate-500">جرد ومتابعة كميات الصيدلية الداخلية للمستشفى</p>
        </div>
      </div>

      <Card noPadding>
         <Table>
            <Thead>
               <Tr>
                 <Th>الباركود/الرقم التعريفي</Th>
                 <Th>الاسم التجاري</Th>
                 <Th>السعر الافتراضي</Th>
                 <Th>الكمية الحالية</Th>
               </Tr>
            </Thead>
            <Tbody>
               {inventory.map((item: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500 text-xs">{item.medicineId}</Td>
                   <Td className="font-bold text-slate-800">{item.name}</Td>
                   <Td className="text-slate-600 font-medium">{item.price} ر.س</Td>
                   <Td>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.stockLevel < 20 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {item.stockLevel} علبة
                      </span>
                   </Td>
                 </Tr>
               ))}
            </Tbody>
         </Table>
      </Card>
    </div>
  );
}
