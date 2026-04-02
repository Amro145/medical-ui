"use client";

import React, { useState, useEffect } from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Microscope, Activity, Clock, Plus, Edit3, X, Save } from 'lucide-react';

export default function LabDashboard() {
  const { data, loading, error } = useMedicalData();
  const [catalog, setCatalog] = useState<any[]>([]);
  const [editingTest, setEditingTest] = useState<any>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  useEffect(() => {
    if (data?.labTech?.testCatalog) {
      setCatalog(data.labTech.testCatalog);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;
  }

  const handleEditClick = (test: any) => {
    setEditingTest(test);
    setEditPrice(test.price);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTest) return;

    setCatalog(prev => prev.map(t => 
       t.testId === editingTest.testId ? { ...t, price: editPrice } : t
    ));
    setEditingTest(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">لوحة المختبر</h2>
          <p className="text-amber-600 font-semibold">{data.labTech.profile.name} - إدارة وتطوير الخدمات المخبرية</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 gap-2">
           <Plus className="w-4 h-4" />
           تسجيل نتيجة حديثة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-amber-100 text-amber-600 rounded-xl">
               <Clock className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">عينات قيد الانتظار</p>
               <h4 className="text-2xl font-bold text-slate-800">4 عينات</h4>
             </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
               <Activity className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">تم إنجازه اليوم</p>
               <h4 className="text-2xl font-bold text-slate-800">8 تحاليل</h4>
             </div>
          </div>
        </Card>

        <Card>
          <div className="flex gap-4 items-center">
             <div className="p-4 bg-slate-100 text-slate-600 rounded-xl">
               <Microscope className="w-8 h-8" />
             </div>
             <div>
               <p className="text-slate-500 font-medium text-sm">إجمالي الخدمات المتوفرة</p>
               <h4 className="text-2xl font-bold text-slate-800">{catalog.length} خدمة</h4>
             </div>
          </div>
        </Card>
      </div>

      <Card noPadding className="border-amber-100/50">
         <CardHeader>
            <div className="flex justify-between items-center w-full">
              <CardTitle>دليل التحاليل المخبرية والأمصلة</CardTitle>
            </div>
         </CardHeader>
         <Table>
            <Thead>
               <Tr>
                 <Th>كود التحليل للمختبر</Th>
                 <Th>اسم الخدمة / التحليل</Th>
                 <Th>التكلفة المعتمدة للجمهور</Th>
                 <Th>الإجراء</Th>
               </Tr>
            </Thead>
            <Tbody>
               {catalog.map((test: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500 text-xs">{test.testId}</Td>
                   <Td className="font-bold text-slate-800">{test.name}</Td>
                   <Td className="text-amber-600 font-bold bg-amber-50 px-2 rounded-lg inline-block my-2">{test.price} ر.س</Td>
                   <Td>
                      <Button onClick={() => handleEditClick(test)} variant="outline" size="sm" className="h-8 text-xs text-amber-700 border-amber-200 hover:bg-amber-50 gap-1 flex items-center">
                        <Edit3 className="w-3 h-3"/>
                        تحديث السعر
                      </Button>
                   </Td>
                 </Tr>
               ))}
            </Tbody>
         </Table>
      </Card>

      {/* Edit Form Modal */}
      {editingTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
              <div className="bg-amber-50 px-6 py-4 flex items-center justify-between border-b border-amber-100">
                 <h2 className="text-lg font-bold flex items-center gap-2 text-amber-900">
                    <Edit3 className="h-5 w-5 text-amber-600" />
                    تحديث تسعيرة الخدمة
                 </h2>
                 <button onClick={() => setEditingTest(null)} className="p-1.5 hover:bg-amber-100 rounded-full transition-colors text-amber-700">
                    <X className="h-5 w-5" />
                 </button>
              </div>
              <div className="p-6">
                 <p className="text-slate-500 text-sm mb-1">{editingTest.testId}</p>
                 <p className="font-bold text-slate-800 text-lg mb-4">{editingTest.name}</p>
                 <form onSubmit={handleSavePrice} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">السعر الحالي الجديد (ر.س):</label>
                      <input 
                        type="number" 
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-colors font-bold text-slate-800"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="flex gap-3 mt-2 pt-4 border-t border-slate-100">
                       <button type="submit" className="flex-1 py-2.5 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-sm flex items-center justify-center gap-2">
                         <Save className="w-4 h-4"/>
                         اعتماد ونشر
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
