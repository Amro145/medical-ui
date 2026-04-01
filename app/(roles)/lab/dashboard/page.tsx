"use client";

import { useMemo, useState } from "react";
import data from "@/public/data/data.json";
import { Microscope, FlaskConical, FileText, Upload, CheckCircle2, AlertTriangle, FileSpreadsheet, LogOut } from "lucide-react";
import Link from "next/link";

type PendingTest = {
  id: string;
  testId: string;
  testName: string;
  priority: string;
  patientName: string;
  patientId: string;
};

type HistoryTest = {
  id: string;
  testId: string;
  testName: string;
  date: string;
  resultSummary: string;
  patientName: string;
  patientId: string;
};

export default function LabDashboard() {
  const { labTech } = data;

  const [localRecords, setLocalRecords] = useState(labTech.patientRecordAccess);

  // Flatten pending and history requests from all patients
  const { allPending, allHistory } = useMemo(() => {
    let pending: PendingTest[] = [];
    let history: HistoryTest[] = [];

    Object.entries(localRecords).forEach(([patientId, record]: [string, any]) => {
      record.pending.forEach((test: any) => {
        pending.push({ ...test, patientName: record.patientName, patientId });
      });
      record.history.forEach((test: any) => {
        history.push({ ...test, patientName: record.patientName, patientId });
      });
    });

    return { allPending: pending, allHistory: history };
  }, [localRecords]);

  // Simulate uploading results
  const handleUploadResults = (test: PendingTest) => {
    const mockResult = prompt(`أدخل النتيجة المختبرية لاختبار ${test.testName} الخاص بـ ${test.patientName}:`, "طبيعي");
    if (mockResult) {
       setLocalRecords((prev: any) => {
          const patientData = prev[test.patientId];
          const newPending = patientData.pending.filter((p: any) => p.id !== test.id);
          const newHistoryItem = {
             id: test.id,
             testId: test.testId,
             testName: test.testName,
             date: new Date().toISOString().split('T')[0],
             resultSummary: mockResult
          };
          
          return {
             ...prev,
             [test.patientId]: {
                ...patientData,
                pending: newPending,
                history: [...patientData.history, newHistoryItem]
             }
          };
       });
    }
  };


  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-amber-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xl font-bold border border-amber-200">
            {labTech.profile.name.charAt(5)} {/* skip "فني. " */}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{labTech.profile.name}</h1>
            <p className="text-amber-600 text-sm flex items-center gap-1 font-medium">
              <Microscope className="h-4 w-4" />
              فني مختبر
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm font-bold text-amber-700 border border-amber-200 px-4 py-1.5 bg-amber-50 rounded-full tracking-wider shadow-sm">
            نظام المختبر
          </p>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-100">
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Right Section / Main Area */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Pending Requests */}
          <section className="bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-blue-100 overflow-hidden">
            <div className="p-5 border-b border-blue-50 bg-gradient-to-l from-blue-50 to-white flex items-center justify-between">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-blue-600" />
                الطلبات المخبرية المعلقة
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-2">
                  {allPending.length}
                </span>
              </h2>
            </div>
            
            <div className="p-5 flex flex-col gap-4">
              {allPending.length > 0 ? (
                allPending.map((test) => (
                  <div key={test.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                       <div className={`p-2 rounded-lg mt-1 ${test.priority === 'عالي' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                          <AlertTriangle className="h-5 w-5" />
                       </div>
                       <div>
                         <h3 className="font-bold text-slate-800 text-md">{test.testName}</h3>
                         <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500">
                           <span className="flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                             <FileText className="h-3 w-3" />
                             {test.patientName}
                           </span>
                           <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${test.priority === 'عالي' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                              أولوية: {test.priority}
                           </span>
                         </div>
                       </div>
                    </div>
                    
                    <button 
                      onClick={() => handleUploadResults(test)}
                      className="mt-4 md:mt-0 px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      رفع النتائج
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500">
                   <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-emerald-400" />
                   <p className="font-medium text-lg">لا توجد طلبات معلقة</p>
                </div>
              )}
            </div>
          </section>

          {/* History */}
          <section className="bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-slate-400" />
                سجل النتائج السابقة
              </h2>
            </div>
            <div className="p-0">
               <table className="w-full text-right text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                     <tr>
                        <th className="px-5 py-3 font-medium">اسم المريض</th>
                        <th className="px-5 py-3 font-medium">التحليل</th>
                        <th className="px-5 py-3 font-medium">التاريخ</th>
                        <th className="px-5 py-3 font-medium w-1/3">النتيجة</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {allHistory.map((hist) => (
                        <tr key={hist.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-5 py-4 font-bold text-slate-800">{hist.patientName}</td>
                           <td className="px-5 py-4 text-amber-700 font-medium">{hist.testName}</td>
                           <td className="px-5 py-4 text-slate-500">{hist.date}</td>
                           <td className="px-5 py-4 text-emerald-700 font-bold bg-emerald-50/30">
                              {hist.resultSummary}
                           </td>
                        </tr>
                     ))}
                     {allHistory.length === 0 && (
                        <tr>
                           <td colSpan={4} className="px-5 py-8 text-center text-slate-500">لا يوجد سجل نتائج</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
          </section>

        </div>

        {/* Left Section / Sidebar */}
        <div className="lg:col-span-4">
           {/* Test Catalog */}
           <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
              <div className="p-5 border-b border-slate-100 bg-amber-50/50">
                <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                  <Microscope className="h-5 w-5 text-amber-600" />
                  دليل التحاليل
                </h2>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {labTech.testCatalog.map((catalogItem) => (
                    <div key={catalogItem.testId} className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col justify-between hover:bg-amber-50 transition-colors">
                       <h3 className="font-bold text-slate-800 text-sm mb-2">{catalogItem.name}</h3>
                       <div className="flex justify-between items-end mt-auto">
                          <span className="text-xs text-slate-400 font-mono">{catalogItem.testId}</span>
                          <span className="text-amber-600 font-bold text-sm">{catalogItem.price} ر.س</span>
                       </div>
                    </div>
                 ))}
              </div>
           </section>
        </div>

      </main>
    </div>
  );
}
