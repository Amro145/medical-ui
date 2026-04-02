import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">إدارة المستخدمين</h2>
          <p className="text-slate-500">عرض وتعديل صلاحيات النظام والموظفين</p>
        </div>
        <Button className="bg-slate-800 hover:bg-slate-900 gap-2">
           <UserPlus className="w-4 h-4" />
           إضافة مستخدم جديد
        </Button>
      </div>

      <Card noPadding>
         <CardHeader>
            <CardTitle>قائمة موظفي المستشفى النشطين</CardTitle>
         </CardHeader>
         <Table>
            <Thead>
               <Tr>
                 <Th>رقم الموظف</Th>
                 <Th>الاسم الكامل</Th>
                 <Th>المنصب/الدور</Th>
                 <Th>الحالة</Th>
                 <Th>الإجراء</Th>
               </Tr>
            </Thead>
            <Tbody>
               <Tr>
                 <Td className="font-mono text-slate-500">EMP-001</Td>
                 <Td className="font-bold text-slate-800">د. خالد عبد الرحمن</Td>
                 <Td className="text-slate-600">طبيب عام</Td>
                 <Td><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">نشط</span></Td>
                 <Td><Button variant="outline" size="sm" className="h-8 text-xs">تعديل</Button></Td>
               </Tr>
               <Tr>
                 <Td className="font-mono text-slate-500">EMP-045</Td>
                 <Td className="font-bold text-slate-800">ص. سارة سعيد</Td>
                 <Td className="text-slate-600">صيدلاني متقدم</Td>
                 <Td><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">نشط</span></Td>
                 <Td><Button variant="outline" size="sm" className="h-8 text-xs">تعديل</Button></Td>
               </Tr>
               <Tr>
                 <Td className="font-mono text-slate-500">EMP-112</Td>
                 <Td className="font-bold text-slate-800">فني. سمير يوسف</Td>
                 <Td className="text-slate-600">فني مختبر</Td>
                 <Td><span className="text-rose-600 bg-rose-50 px-2 py-1 rounded-lg text-xs font-bold">موقوف</span></Td>
                 <Td><Button variant="outline" size="sm" className="h-8 text-xs">تعديل</Button></Td>
               </Tr>
            </Tbody>
         </Table>
      </Card>
    </div>
  );
}
