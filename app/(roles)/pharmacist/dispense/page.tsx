"use client";

import React, { useState } from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function PharmacistDispensePage() {
  const { data, loading, error } = useMedicalData();
  const [search, setSearch] = useState('');

  if (loading) return <div className="p-12 text-center text-purple-600 font-bold">جاري تحميل سجلات الصيدلية...</div>;
  if (error || !data) return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;

  const { patientSearchMock } = data.pharmacist;
  const mockPatient = search.length > 3 ? patientSearchMock["patient_1"] : null; // Simulating search hitting patient 1 for demo

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">صرف الأدوية والوصفات</h2>
          <p className="text-slate-500">ابحث عن المريض لسحب الوصفات التي لم تصرف بعد</p>
        </div>
        <div className="relative w-full md:w-96 flex gap-2">
           <div className="relative flex-1">
             <input type="text" placeholder="رقم الملف، الجوال..." className="w-full border border-slate-200 rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-purple-600" value={search} onChange={e => setSearch(e.target.value)} />
           </div>
           <Button className="bg-purple-600 hover:bg-purple-700 px-4">
              <Search className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {mockPatient ? (
      <Card noPadding>
         <CardHeader>
            <CardTitle>وصفات بانتظار الصرف للمريض ({mockPatient.patientName})</CardTitle>
         </CardHeader>
         <Table>
            <Thead>
               <Tr>
                 <Th>رقم الوصفة</Th>
                 <Th>اسم الدواء</Th>
                 <Th>الجرعة والديمومة</Th>
                 <Th>تأكيد وتفعيل الصرف</Th>
               </Tr>
            </Thead>
            <Tbody>
               {mockPatient.pending.map((presc: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500 text-xs">{presc.id}</Td>
                   <Td className="font-bold text-slate-800">{presc.name}</Td>
                   <Td className="text-slate-600 font-semibold">{presc.dosage} - لكامل {presc.duration}</Td>
                   <Td>
                      <Button variant="secondary" size="sm" className="h-8 text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 border">
                        صرف واعتماد
                      </Button>
                   </Td>
                 </Tr>
               ))}
            </Tbody>
         </Table>
      </Card>
      ) : (
        <Card className="text-center py-16 text-slate-400">
           تفضل بإدخال رقم هوية المريض أو جواله للبحث عن الوصفات
        </Card>
      )}
    </div>
  );
}
