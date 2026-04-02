import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function PatientHistoryPage() {
  const historyList = [
    { name: "التهاب الشعب الهوائية", date: "2025-11-15", doctor: "د. خالد عبد الرحمن" },
    { name: "مراجعة دورية للربو", date: "2024-05-10", doctor: "د. هدى صالح" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">المواعيد والتاريخ الطبي</h2>
          <p className="text-slate-500">سجلك الطبي الشامل لجميع زياراتك السابقة</p>
        </div>
      </div>

      <div className="space-y-4">
         {historyList.map((item, idx) => (
           <Card key={idx} className="border-emerald-100/50 hover:border-emerald-200">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                    <p className="text-slate-500 mt-1">المعالج: {item.doctor}</p>
                 </div>
                 <div className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl text-sm font-bold font-mono">
                    {item.date}
                 </div>
              </div>
           </Card>
         ))}
      </div>
    </div>
  );
}
