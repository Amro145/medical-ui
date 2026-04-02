import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">إعدادات النظام</h2>
          <p className="text-slate-500">التحكم المركزي في صلاحيات البصمة الإلكترونية والدخول</p>
        </div>
      </div>

      <Card>
         <CardTitle className="mb-4">إعدادات قاعدة البيانات</CardTitle>
         <form className="space-y-4 max-w-xl">
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-1">نسخ احتياطي أوتوماتيكي</label>
               <select className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-slate-800">
                 <option>يومياً في منتصف الليل</option>
                 <option>أسبوعياً</option>
                 <option>مغلق</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-1">مدة الاحتفاظ بسجلات الدخول (Logs)</label>
               <input type="number" defaultValue="90" className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-slate-800" />
               <p className="text-xs text-slate-500 mt-1">بالأيام المعتمدة دوريا</p>
            </div>
            <Button type="button" className="bg-slate-800 hover:bg-slate-900 mt-4">حفظ التغييرات</Button>
         </form>
      </Card>
    </div>
  );
}
