import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PatientReportsPage() {
  const reports = [
    { title: "صورة دم كاملة (CBC)", date: "2025-05-20", source: "مختبر البرج", status: "طبيعي - 5.4%" },
    { title: "تحليل وظائف الكلى", date: "2023-01-19", source: "مختبر ألفا", status: "ضمن المعدلات الطبيعية" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">التقارير المخبرية والأشعة</h2>
          <p className="text-slate-500">استعرض نتائج التحاليل فور صدورها من المختبر</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {reports.map((report, idx) => (
           <Card key={idx} className="border-emerald-100/50">
              <CardTitle className="mb-2">{report.title}</CardTitle>
              <div className="space-y-1 mb-4 text-sm text-slate-600">
                 <p>تاريخ الفحص: <strong className="font-mono">{report.date}</strong></p>
                 <p>المصدر: <strong>{report.source}</strong></p>
                 <p>الملخص: <span className="text-emerald-600 font-bold">{report.status}</span></p>
              </div>
              <Button variant="outline" className="w-full justify-center border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                تحميل التقرير الكامل (PDF)
              </Button>
           </Card>
         ))}
      </div>
    </div>
  );
}
