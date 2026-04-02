import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PatientSettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">إعدادات الحساب</h2>
          <p className="text-slate-500">إدارة معلوماتك الشخصية والتواصل</p>
        </div>
      </div>

      <Card>
         <CardTitle className="mb-4">تحديث الملف الشخصي</CardTitle>
         <form className="space-y-4 max-w-xl">
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">رقم الجوال المسجل</label>
               <input type="text" defaultValue="0501234567" disabled className="w-full border border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed rounded-xl p-3 outline-none" />
               <p className="text-xs text-slate-400 mt-1">تغيير رقم الجوال يتطلب مراجعة الاستقبال</p>
            </div>
            
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">العنوان السكني</label>
               <input type="text" defaultValue="الرياض، حي الملقا" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">البريد الإلكتروني للإشعارات</label>
               <input type="email" placeholder="example@gmail.com" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
               <Button type="button" className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto px-8">حفظ الإعدادات</Button>
            </div>
         </form>
      </Card>
    </div>
  );
}
