"use client";

import React, { useState, useEffect } from 'react';
import { useMedicalData } from '@/hooks/useMedicalData';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit3, X, Save } from 'lucide-react';

export default function PharmacistInventoryPage() {
  const { data, loading, error } = useMedicalData();
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Local state form for modal
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  useEffect(() => {
    if (data?.pharmacist?.inventory) {
      setItems(data.pharmacist.inventory);
    }
  }, [data]);

  if (loading) return <div className="p-12 text-center text-purple-600 font-bold">جاري الوصول للمخزن...</div>;
  if (error || !data) return <div className="text-rose-500 font-bold text-center p-8">عذراً، حدث خطأ: {error}</div>;

  const handleEditClick = (item: any) => {
    setEditingItem(item);
    setEditPrice(item.price);
    setEditStock(item.stockLevel);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setItems(prevItems => prevItems.map(item => 
      item.medicineId === editingItem.medicineId 
        ? { ...item, price: editPrice, stockLevel: editStock } 
        : item
    ));
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">إدارة المخزون والتوريد</h2>
          <p className="text-slate-500">جرد ومتابعة وتعديل كميات الصيدلية الداخلية للمستشفى</p>
        </div>
      </div>

      <Card noPadding>
         <Table>
            <Thead>
               <Tr>
                 <Th>الباركود</Th>
                 <Th>الاسم التجاري</Th>
                 <Th>السعر الافتراضي</Th>
                 <Th>الكمية الحالية</Th>
                 <Th>تعديل السعر والمخزون</Th>
               </Tr>
            </Thead>
            <Tbody>
               {items.map((item: any, idx: number) => (
                 <Tr key={idx}>
                   <Td className="font-mono text-slate-500 text-xs">{item.medicineId}</Td>
                   <Td className="font-bold text-slate-800">{item.name}</Td>
                   <Td className="text-slate-600 font-medium">{item.price} ر.س</Td>
                   <Td>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.stockLevel < 20 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {item.stockLevel} علبة
                      </span>
                   </Td>
                   <Td>
                      <Button onClick={() => handleEditClick(item)} variant="outline" size="sm" className="h-8 text-xs text-purple-700 border-purple-200 hover:bg-purple-50 gap-1 flex items-center">
                        <Edit3 className="w-3 h-3"/>
                        تعديل
                      </Button>
                   </Td>
                 </Tr>
               ))}
            </Tbody>
         </Table>
      </Card>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
              <div className="bg-purple-50 px-6 py-4 flex items-center justify-between border-b border-purple-100">
                 <h2 className="text-lg font-bold flex items-center gap-2 text-purple-900">
                    <Edit3 className="h-5 w-5 text-purple-600" />
                    تحديث بيانات الصنف
                 </h2>
                 <button onClick={() => setEditingItem(null)} className="p-1.5 hover:bg-purple-100 rounded-full transition-colors text-purple-700">
                    <X className="h-5 w-5" />
                 </button>
              </div>
              <div className="p-6">
                 <p className="font-bold text-slate-800 text-lg mb-4">{editingItem.name}</p>
                 <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">الكمية المتوفرة (بالعلبة):</label>
                      <input 
                        type="number" 
                        value={editStock}
                        onChange={(e) => setEditStock(Number(e.target.value))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-colors"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">سعر الوحدة (ر.س):</label>
                      <input 
                        type="number" 
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-colors"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="flex gap-3 mt-2 pt-4 border-t border-slate-100">
                       <button type="submit" className="flex-1 py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-sm flex items-center justify-center gap-2">
                         <Save className="w-4 h-4"/>
                         حفظ التغييرات
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
