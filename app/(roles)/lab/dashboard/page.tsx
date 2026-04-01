"use client";

import { useMemo, useState, useEffect } from "react";
import data from "@/public/data/data.json";
import { Microscope, FlaskConical, FileText, Upload, CheckCircle2, AlertTriangle, FileSpreadsheet, LogOut, Search, Loader2, X } from "lucide-react";
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
  const { labTech, patients } = data;

  const [loading, setLoading] = useState(true);
  const [localRecords, setLocalRecords] = useState(labTech.patientRecordAccess);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [activeTest, setActiveTest] = useState<PendingTest | null>(null);
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const matchedPatientIds = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const term = searchTerm.trim().toLowerCase();
    return patients
      .filter((p: any) => 
        p.id.toLowerCase() === term || 
        p.profile.name.toLowerCase().includes(term) || 
        p.profile.phone.includes(term)
      )
      .map((p: any) => p.id);
  }, [searchTerm, patients]);

  // Flatten pending and history requests from all patients
  const { allPending, allHistory } = useMemo(() => {
    let pending: PendingTest[] = [];
    let history: HistoryTest[] = [];

    Object.entries(localRecords).forEach(([patientId, record]: [string, any]) => {
      if (matchedPatientIds && !matchedPatientIds.includes(patientId)) {
        return;
      }

      record.pending.forEach((test: any) => {
        pending.push({ ...test, patientName: record.patientName, patientId });
      });
      record.history.forEach((test: any) => {
        history.push({ ...test, patientName: record.patientName, patientId });
      });
    });

    return { allPending: pending, allHistory: history };
  }, [localRecords, matchedPatientIds]);

  const handleOpenModal = (test: PendingTest) => {
    setActiveTest(test);
    setResultText("");
    setIsResultModalOpen(true);
  };

  const handleSubmitResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTest || !resultText.trim()) return;

    setLocalRecords((prev: any) => {
       const patientData = prev[activeTest.patientId];
       const newPending = patientData.pending.filter((p: any) => p.id !== activeTest.id);
       const newHistoryItem = {
          id: activeTest.id,
          testId: activeTest.testId,
          testName: activeTest.testName,
          date: new Date().toISOString().split('T')[0],
          labCenterName: "مختبر المستشفى الرئيسي",
          resultSummary: resultText
       };
       
       return {
          ...prev,
          [activeTest.patientId]: {
             ...patientData,
             pending: newPending,
             history: [...patientData.history, newHistoryItem]
          }
       };
    });

    setIsResultModalOpen(false);
    setActiveTest(null);
  };

  if (loading) {
     return (
       <div className="h-screen w-full flex items-center justify-center bg-slate-50">
         <div className="flex flex-col items-center text-amber-600">
           <Loader2 className="h-10 w-10 animate-spin mb-4" />
           <p className="font-bold">جاري تحميل البيانات...</p>
         </div>
       </div>
     );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
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
          
          {/* Search Bar */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Search className="h-5 w-5 text-amber-600" />
               بحث متقدم للطلبات
            </h2>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="ابحث برقم الهوية، اسم المريض، أو الجوال..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-700 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </section>

          {/* Pending Requests */}
          <section className="bg-white rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-blue-100 overflow-hidden">
            <div className="p-5 border-b border-blue-50 bg-linear-to-l from-blue-50 to-white flex items-center justify-between">
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
                      onClick={() => handleOpenModal(test)}
                      className="mt-4 md:mt-0 px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      إدخال النتائج
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
            <div className="p-0 overflow-x-auto">
               <table className="w-full text-right text-sm min-w-[600px]">
                  <thead className="bg-slate-50 text-slate-500">
                     <tr>
                        <th className="px-5 py-3 font-medium">اسم المريض</th>
                        <th className="px-5 py-3 font-medium">التحليل</th>
                        <th className="px-5 py-3 font-medium">تاريخ ومكان العينة</th>
                        <th className="px-5 py-3 font-medium w-1/3">النتيجة</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {allHistory.map((hist) => (
                        <tr key={hist.id} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-5 py-4 font-bold text-slate-800">{hist.patientName}</td>
                           <td className="px-5 py-4 text-amber-700 font-medium">{hist.testName}</td>
                           <td className="px-5 py-4 text-slate-500">
                             {hist.date} <br/>
                             <span className="text-xs text-slate-400 font-bold">{(hist as any).labCenterName || "مختبر المستشفى الرئيسي"}</span>
                           </td>
                           <td className="px-5 py-4 text-emerald-700 font-bold bg-emerald-50/30 rounded-l-lg">
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

      {/* Result Entry Modal */}
      {isResultModalOpen && activeTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <div className="bg-white rounded-2xl w-full max-w-md shadow-xl animate-in zoom-in-95 duration-200">
              <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10 bg-slate-50 rounded-t-2xl">
                 <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <FlaskConical className="h-5 w-5 text-blue-600" />
                    إدخال نتيجة مختبرية
                 </h2>
                 <button onClick={() => setIsResultModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                    <X className="h-5 w-5 text-slate-500" />
                 </button>
              </div>
              <div className="p-6">
                 <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <p className="text-xs text-blue-500 uppercase font-bold mb-1">بيانات العينة</p>
                    <p className="font-bold text-slate-800">{activeTest.testName}</p>
                    <p className="text-sm text-slate-600 mt-1">المريض: {activeTest.patientName}</p>
                 </div>
                 
                 <form onSubmit={handleSubmitResult} className="flex flex-col gap-4">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">النتيجة النهائية والتشخيص المخبري:</label>
                       <textarea 
                         value={resultText}
                         onChange={(e) => setResultText(e.target.value)}
                         className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] resize-none"
                         placeholder="اكتب التقرير هنا... (مثال: طبيعي، أو القيمة 5.4%)"
                         required
                       />
                    </div>
                    <div className="flex gap-2 mt-4 text-sm">
                       <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">حفظ النتيجة</button>
                       <button type="button" onClick={() => setIsResultModalOpen(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors">إلغاء</button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
