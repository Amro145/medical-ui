"use client";

import { useState } from "react";
import data from "@/public/data/data.json";
import { Search, Package, Pill, ArchiveRestore, ClipboardList, CheckCircle } from "lucide-react";

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
  const { pharmacist } = data;
  const initPatientMock = pharmacist.patientSearchMock as any;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPatientId, setSearchedPatientId] = useState<string | null>(null);
  const [localSearchMock, setLocalSearchMock] = useState(initPatientMock);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchMock[searchTerm]) {
      setSearchedPatientId(searchTerm);
    } else {
      setSearchedPatientId(null);
    }
  };

  const handleDispense = (patientId: string, prescription: PendingPrescription) => {
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
  };

  const currentPatientData = searchedPatientId ? localSearchMock[searchedPatientId] : null;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
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
        <div className="text-left">
          <p className="text-sm font-bold text-indigo-200 border border-indigo-500/50 px-3 py-1 bg-indigo-900/30 rounded-full tracking-wider">
            نظام الصيدلية
          </p>
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
                placeholder="أدخل رقم هوية المريض (مثل: patient_1)"
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
                          <div key={med.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100 shadow-sm">
                            <div>
                               <h5 className="font-bold text-amber-900 text-lg">{med.name}</h5>
                               <p className="text-amber-700 text-sm mt-1">{med.dosage} - المدة: {med.duration}</p>
                            </div>
                            <button 
                              onClick={() => handleDispense(searchedPatientId, med)}
                              className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-2"
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
                      <div className="space-y-2 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
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
               <p className="font-bold">لم يتم العثور على مريض بهذا الرقم.</p>
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
                   {pharmacist.inventory.map((item) => (
                     <tr key={item.medicineId} className="hover:bg-slate-50 transition-colors">
                       <td className="px-5 py-4 font-bold text-slate-800">{item.name}</td>
                       <td className="px-5 py-4 text-xs text-slate-500 font-mono">{item.medicineId}</td>
                       <td className="px-5 py-4 text-center">
                         <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold ${
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
