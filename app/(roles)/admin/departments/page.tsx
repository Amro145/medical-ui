import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminDepartmentsPage() {
  const departments = [
    { name: "الطوارئ", head: "د. فهد الدوسري", beds: "45 / 50 سرير إشغال" },
    { name: "الباطنية", head: "د. نادية إبراهيم", beds: "110 / 120 سرير إشغال" },
    { name: "الأطفال", head: "د. هند اليوسف", beds: "35 / 40 سرير إشغال" },
    { name: "العناية المركزة", head: "د. ياسر المنصور", beds: "19 / 20 سرير إشغال (حرج!)" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">إدارة الأقسام</h2>
          <p className="text-slate-500">استعرض وهيكل أقسام المستشفى الرئيسية</p>
        </div>
        <Button className="bg-slate-800 hover:bg-slate-900 gap-2">
           إضافة قسم جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
         {departments.map((dept, idx) => (
           <Card key={idx}>
              <CardTitle className="mb-2 text-xl">{dept.name}</CardTitle>
              <div className="space-y-2 mt-4 text-sm text-slate-600">
                 <p><span className="font-semibold text-slate-800">رئيس القسم:</span> {dept.head}</p>
                 <p><span className="font-semibold text-slate-800">حالة الأسرة المقدرة:</span> <span className={dept.beds.includes('حرج') ? 'text-rose-600 font-bold' : ''}>{dept.beds}</span></p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                 <Button variant="outline" size="sm">تعديل السعة</Button>
                 <Button variant="outline" size="sm">استعراض الموظفين</Button>
              </div>
           </Card>
         ))}
      </div>
    </div>
  );
}
