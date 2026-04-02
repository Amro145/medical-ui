import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileSignature } from 'lucide-react';

export default function DoctorPrescriptionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">كتابة وصفة طبية / طلب تحليل</h2>
          <p className="text-slate-500">إصدار التوصيات الطبية إلكترونياً</p>
        </div>
      </div>

      <Card>
         <CardTitle className="mb-6 flex items-center gap-2"><FileSignature className="w-5 h-5 text-green-600"/> مسودة وصفة طبية جديدة</CardTitle>
         <form className="space-y-6 max-w-2xl">
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-1">المريض المستهدف</label>
               <input type="text" placeholder="رقم الملف المستهدف..." className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">الدواء المطلوب</label>
                 <input type="text" placeholder="اسم الدواء (إنجليزي أو عربي)" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-1">الجرعة المحددة</label>
                 <input type="text" placeholder="مثال: حبة واحدة مرتين يوميا" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
            </div>

            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-1">ملاحظات والتوجيهات</label>
               <textarea rows={4} placeholder="توجيهات مخصصة للصيدلي والمريض..." className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-600 resize-none"></textarea>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-slate-100">
               <Button type="button" className="bg-green-600 hover:bg-green-700">اعتماد وإرسال للصيدلية</Button>
               <Button type="button" variant="outline">طلب تحليل مختبري</Button>
            </div>
         </form>
      </Card>
    </div>
  );
}
