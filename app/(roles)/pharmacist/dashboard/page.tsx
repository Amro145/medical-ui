"use client";

import { useState, useEffect } from "react";
import data from "@/public/data/data.json";
import { Search, Package, Pill, ArchiveRestore, ClipboardList, CheckCircle, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";

type PendingPrescription = {
  id: string;
  medicineId: string;
  name: string;
  dosage?: string;
  duration?: string;
};

type HistoryPrescription = {
  id: string;
  medicineId: string;
  name: string;
  date: string;
};

export default function PharmacistDashboard() {
  const { pharmacist, patients } = data;
  const initPatientMock = pharmacist.patientSearchMock as any;

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPatientId, setSearchedPatientId] = useState<string | null>(null);
  
  // Local States for reactivity
  const [localSearchMock, setLocalSearchMock] = useState(initPatientMock);
  const [localInventory, setLocalInventory] = useState(pharmacist.inventory);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center text-indigo-600">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p className="font-bold">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchedPatientId(null);
      return;
    }

    const term = searchTerm.trim().toLowerCase();

    if (localSearchMock[term]) {
      setSearchedPatientId(term);
      return;
    }

    const matchedPatient = patients?.find((p: any) => 
      p.id.toLowerCase() === term || 
      p.profile.name.toLowerCase().includes(term) || 
      p.profile.phone.includes(term)
    );

    if (matchedPatient && localSearchMock[matchedPatient.id]) {
      setSearchedPatientId(matchedPatient.id);
    } else {
      setSearchedPatientId(null);
    }
  };

  const handleDispense = (patientId: string, prescription: PendingPrescription) => {
    // 1. Update Patient Record (move pending to history)
    setLocalSearchMock((prev: any) => {
      const patientData = prev[patientId];
      if (!patientData) return prev;

      const newPending = patientData.pending.filter((p: any) => p.id !== prescription.id);
      const newHistoryItem: HistoryPrescription = {
        id: prescription.id,
        medicineId: prescription.medicineId,
        name: prescription.name,
        date: new Date().toISOString().split('T')[0], // today's date
      };

      return {
        ...prev,
        [patientId]: {
          ...patientData,
          pending: newPending,
          history: [...patientData.history, newHistoryItem]
        }
      };
    });

    // 2. Decrement Inventory visually
    setLocalInventory(prev => prev.map(item => {
      if (item.medicineId === prescription.medicineId) {
        return { ...item, stockLevel: item.stockLevel > 0 ? item.stockLevel - 1 : 0 };
      }
      return item;
    }));

    // 3. Show Success message
    setSuccessMessage(`تم صرف الدواء: ${prescription.name} بنجاح!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const currentPatientData = searchedPatientId ? localSearchMock[searchedPatientId] : null;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle className="h-5 w-5" />
          {successMessage}
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-10 text-white">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center text-xl font-bold">
            {pharmacist.profile.name.charAt(5)} {/* skip "ص. " */}
          </div>
          <div>
            <h1 className="text-xl font-bold">{pharmacist.profile.name}</h1>
            <p className="text-slate-300 text-sm flex items-center gap-1">
              <Pill className="h-4 w-4" />
              مدير الصيدلية
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm font-bold text-indigo-200 border border-indigo-500/50 px-3 py-1 bg-indigo-900/30 rounded-full tracking-wider">
            نظام الصيدلية
          </p>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 hover:border-slate-600">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:block">تسجيل الخروج</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Right Section / Main View - Patient Search & Dispensing */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-indigo-600" />
              البحث عن مريض
            </h2>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input 
                type="text" 
                placeholder="أدخل رقم الهوية، الاسم، أو الجوال..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
              >
                بحث
              </button>
            </form>
          </section>

          {searchedPatientId && currentPatientData ? (
            <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-300">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4">
                  ملف المريض: <span className="text-indigo-600">{currentPatientData.patientName}</span>
                </h3>

                <div className="space-y-6">
                  {/* Pending Medications */}
                  <div>
                    <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                      <ClipboardList className="h-5 w-5 text-amber-500" />
                      الأدوية المطلوبة (غير مصروفة)
                    </h4>
                    {currentPatientData.pending.length > 0 ? (
                      <div className="space-y-3">
                        {currentPatientData.pending.map((med: any) => (
                          <div key={med.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100 shadow-sm gap-4">
                            <div>
                               <h5 className="font-bold text-amber-900 text-lg">{med.name}</h5>
                               <p className="text-amber-700 text-sm mt-1">{med.dosage} - المدة: {med.duration}</p>
                            </div>
                            <button 
                              onClick={() => handleDispense(searchedPatientId, med)}
                              className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
                            >
                              صرف الدواء
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 p-4 border border-dashed rounded-xl bg-slate-50 text-center">لا توجد أدوية مطلوبة حالياً.</p>
                    )}
                  </div>

                  {/* Prescription History */}
                  <div>
                    <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                      <ArchiveRestore className="h-5 w-5 text-slate-400" />
                      سجل الأدوية المصروفة
                    </h4>
                    {currentPatientData.history.length > 0 ? (
                      <div className="space-y-2 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                        {currentPatientData.history.map((med: any) => (
                           <div key={med.id} className="relative flex items-center p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                              <div className="w-full">
                                <h5 className="font-bold text-slate-800">{med.name}</h5>
                                <p className="text-slate-500 text-xs mt-1">تاريخ الصرف: {med.date}</p>
                              </div>
                           </div>
                        ))}
                      </div>
                    ) : (
                       <p className="text-sm text-slate-500 p-4 border border-dashed rounded-xl bg-slate-50 text-center">لا يوجد سجل سابق لهذ المريض.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : searchedPatientId === null && searchTerm !== "" ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl shadow-sm border border-red-100 flex items-center gap-3">
               <Package className="h-5 w-5" />
               <p className="font-bold">لم يتم العثور على مريض بهذا الرقم أو الاسم.</p>
            </div>
          ) : null}
        </div>

        {/* Left Section / Sidebar - Inventory */}
        <div className="lg:col-span-5">
           <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
             <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <Package className="h-5 w-5 text-slate-500" />
                 مخزون الأدوية
               </h2>
             </div>
             <div className="p-0">
               <table className="w-full text-right">
                 <thead>
                   <tr className="border-b border-slate-100 text-slate-500 text-sm">
                     <th className="px-5 py-3 font-medium">اسم الدواء</th>
                     <th className="px-5 py-3 font-medium">الرمز</th>
                     <th className="px-5 py-3 font-medium text-center">الكمية المتوفرة</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {localInventory.map((item) => (
                     <tr key={item.medicineId} className="hover:bg-slate-50 transition-colors">
                       <td className="px-5 py-4 font-bold text-slate-800">{item.name}</td>
                       <td className="px-5 py-4 text-xs text-slate-500 font-mono">{item.medicineId}</td>
                       <td className="px-5 py-4 text-center">
                         <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold transition-colors ${
                           item.stockLevel < 50 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                         }`}>
                           {item.stockLevel}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </section>
        </div>

      </main>
    </div>
  );
}
