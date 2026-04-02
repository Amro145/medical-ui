import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DeptManagerStaffPage() {
  const staff = [
    { name: "د. خالد عبد الرحمن", type: "استشاري", specialization: "الطب العام" },
    { name: "د. فهد الدوسري", type: "أخصائي", specialization: "الطوارئ" },
    { name: "د. ريم الفارس", type: "أخصائي", specialization: "الباطنية" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">دليل الطاقم</h2>
          <p className="text-slate-500">الفريق التابع للقسم والمؤشرات الخاصة بهم</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {staff.map((member, idx) => (
           <Card key={idx} className="flex flex-col items-center text-center p-6 gap-3">
              <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl mb-2">
                 {member.name.charAt(3)}
              </div>
              <CardTitle>{member.name}</CardTitle>
              <p className="text-slate-500 text-sm">{member.type} - {member.specialization}</p>
              <Button variant="outline" className="w-full mt-2 font-semibold">تفاصيل الأداء</Button>
           </Card>
         ))}
      </div>
    </div>
  );
}
