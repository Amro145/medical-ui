"use client";

import React from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function LabRequestsPage() {
  const { data, loading, error } = useMedicalData();

  if (loading) return <div className="p-12 text-center text-amber-600 font-bold">جاري تحميل الطلبات...</div>;
  if (error || !data) return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;

  const { patientRecordAccess } = data.labTech;
  // Flaten pending requests explicitly from the mock
  const pendingRequests = Object.values(patientRecordAccess).flatMap((patient: any) => 
    patient.pending.map((req: any) => ({ ...req, patientName: patient.patientName }))
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">طلبات المختبر قيد الانتظار</h2>
          <p className="text-slate-500">استعرض العينات الواصلة والأولوية</p>
        </div>
      </div>

      <Card noPadding>
         <Table>
            <Thead>
               <Tr>
                 <Th>رقم الطلب</Th>
                 <Th>المريض</Th>
                 <Th>نوع التحليل</Th>
                 <Th>مستوى الطوارئ</Th>
                 <Th>الإجراء</Th>
               </Tr>
            </Thead>
            <Tbody>
               {pendingRequests.map((req: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500 text-xs">{req.id}</Td>
                   <Td className="font-bold text-slate-800">{req.patientName}</Td>
                   <Td className="text-amber-800 font-medium">{req.testName} <span className="text-xs text-slate-400">({req.testId})</span></Td>
                   <Td>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.priority === 'عالي' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                        {req.priority}
                      </span>
                   </Td>
                   <Td>
                     <Button variant="outline" size="sm" className="h-8 text-xs px-2 py-0 border-amber-200 text-amber-700 hover:bg-amber-50">
                        استلام العينة
                     </Button>
                   </Td>
                 </Tr>
               ))}
               {pendingRequests.length === 0 && (
                   <Tr>
                       <Td colSpan={5} className="text-center p-8 text-slate-400">لايوجد أي طلبات معلقة</Td>
                   </Tr>
               )}
            </Tbody>
         </Table>
      </Card>
    </div>
  );
}
