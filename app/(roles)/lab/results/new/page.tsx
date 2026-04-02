"use client";

import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LabNewResultPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">تسجيل نتيجة مختبرية جديدة</h2>
          <p className="text-slate-500">قم برفع النتائج ليتاح للطبيب مراجعتها فوراً</p>
        </div>
      </div>

      <Card>
         <form className="space-y-6 max-w-2xl px-2 py-4">
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">رقم الطلب المخبري</label>
               <input type="text" placeholder="مثال: test_req_1" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">ملخص النتيجة النصي</label>
               <textarea rows={4} placeholder="اكتب ملخص النتيجة (مثال: الهيموجلوبين كذا.. الخ)" className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500 resize-none"></textarea>
            </div>
            
            <div>
               <label className="block text-sm font-semibold text-slate-700 mb-2">إرفاق تقرير الأجهزة (PDF)</label>
               <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                  <p className="text-slate-500 font-medium">اسحب وأفلت الملف هنا، أو اضغط للاختيار</p>
               </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex gap-4">
               <Button type="button" className="bg-amber-600 hover:bg-amber-700 px-8">نشر وتحويل النتيجة للعيادة</Button>
            </div>
         </form>
      </Card>
    </div>
  );
}
