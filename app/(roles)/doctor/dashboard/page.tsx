"use client";

import { useState, useEffect } from "react";
import data from "@/public/data/data.json";
import { User, Clock, Calendar, CheckCircle2, ChevronLeft, Activity, Pill, LogOut, FilePlus, Microscope, Loader2, X } from "lucide-react";
import Link from "next/link";

export default function DoctorDashboard() {
  const { doctor, patients, labTech } = data;
  const today = "2026-04-10";

  const [loading, setLoading] = useState(true);
  const [localPatients, setLocalPatients] = useState<any[]>(patients);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  // Modal State
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [managingPatientId, setManagingPatientId] = useState<string | null>(null);
  
  // Form States
  const [newDiagnosis, setNewDiagnosis] = useState("");
  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState("");
  const [newMedDuration, setNewMedDuration] = useState("");
  const [selectedTestId, setSelectedTestId] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center text-blue-600">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p className="font-bold">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  const selectedPatient = localPatients.find((p) => p.id === selectedPatientId);
  const managingPatient = localPatients.find((p) => p.id === managingPatientId);

  const handleOpenManageModal = (patientId: string) => {
    setManagingPatientId(patientId);
    setIsManageModalOpen(true);
  };

  const closeManageModal = () => {
    setIsManageModalOpen(false);
    setManagingPatientId(null);
    setNewDiagnosis("");
    setNewMedName("");
    setNewMedDosage("");
    setNewMedDuration("");
    setSelectedTestId("");
  };

  const handleAddDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiagnosis.trim() || !managingPatientId) return;

    setLocalPatients(prev => prev.map(p => {
      if (p.id === managingPatientId) {
        return {
          ...p,
          medicalHistory: [
            ...p.medicalHistory,
            {
              id: `hist_${Date.now()}`,
              diagnosis: newDiagnosis,
              date: new Date().toISOString().split('T')[0],
              doctorId: doctor.id,
              doctorName: doctor.profile.name
            }
          ]
        };
      }
      return p;
    }));
    setNewDiagnosis("");
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !managingPatientId) return;

    setLocalPatients(prev => prev.map(p => {
      if (p.id === managingPatientId) {
        return {
          ...p,
          medications: {
            ...p.medications,
            toBeDispensed: [
              ...p.medications.toBeDispensed,
              {
                id: `pres_${Date.now()}`,
                medicineId: `m_${Date.now()}`, // mock id
                name: newMedName,
                dosage: newMedDosage,
                duration: newMedDuration
              }
            ]
          }
        };
      }
      return p;
    }));
    setNewMedName("");
    setNewMedDosage("");
    setNewMedDuration("");
  };

  const handleRequestTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTestId || !managingPatientId) return;

    const testInfo = labTech.testCatalog.find(t => t.testId === selectedTestId);
    if (!testInfo) return;

    setLocalPatients(prev => prev.map(p => {
      if (p.id === managingPatientId) {
        return {
          ...p,
          labTests: {
            ...p.labTests,
            required: [
              ...p.labTests.required,
              {
                id: `test_req_${Date.now()}`,
                testId: testInfo.testId,
                testName: testInfo.name,
                priority: "عادي"
              }
            ]
          }
        };
      }
      return p;
    }));
    setSelectedTestId("");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl font-bold">
            {doctor.profile.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{doctor.profile.name}</h1>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <Activity className="h-4 w-4" />
              {doctor.profile.specialty}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm font-semibold text-slate-600 border px-3 py-1 bg-slate-50 rounded-full">
            لوحة تحكم الطبيب
          </p>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left/Main Column - Appointments */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Booked Appointments */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-hidden">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              المواعيد المحجوزة
            </h2>
            <div className="flex flex-col gap-3">
              {doctor.schedule.bookedSlots.map((slot) => {
                const isToday = slot.date === today;
                return (
                  <div 
                    key={slot.id} 
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all ${
                      isToday 
                        ? 'border-blue-200 bg-blue-50/50 shadow-sm' 
                        : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${isToday ? 'bg-blue-600 text-white' : 'bg-white border text-slate-700'}`}>
                        <Clock className="h-5 w-5 mb-1" />
                        <span className="font-bold text-sm">{slot.time}</span>
                      </div>
                      <div>
                        {isToday && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full mb-1">
                            ميعاد اليوم
                          </span>
                        )}
                        <h3 className="font-bold text-slate-800 text-md flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          {slot.patientName}
                        </h3>
                        <p className="text-slate-500 text-sm text-right mt-1">{slot.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleOpenManageModal(slot.patientId)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <FilePlus className="h-4 w-4" />
                        إدارة المريض
                      </button>
                      <button 
                        onClick={() => setSelectedPatientId(slot.patientId)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        عرض الملف
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {doctor.schedule.bookedSlots.length === 0 && (
                <p className="text-slate-500 text-center py-6">لا توجد مواعيد محجوزة</p>
              )}
            </div>
          </section>

          {/* Free Slots */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              المواعيد المتاحة
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {doctor.schedule.freeSlots.map((slot, idx) => (
                <div key={idx} className="flex flex-col items-center p-3 rounded-xl border border-emerald-100 bg-emerald-50/30 text-emerald-800">
                  <span className="font-bold">{slot.time}</span>
                  <span className="text-xs text-emerald-600">{slot.date === today ? 'اليوم' : slot.date}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column - Patient Quick Access Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24 min-h-[400px]">
            {selectedPatient ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    الملف الطبي
                  </h3>
                  <button 
                    onClick={() => setSelectedPatientId(null)}
                    className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-1 rounded-md"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">اسم المريض</p>
                  <p className="text-xl font-bold text-slate-800">{selectedPatient.profile.name}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md font-bold">
                      فصيلة الدم: {selectedPatient.profile.bloodType}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Medical History */}
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-2 text-slate-700 mb-3">
                      <Activity className="h-4 w-4" />
                      التاريخ الطبي
                    </h4>
                    {selectedPatient.medicalHistory.length > 0 ? (
                      <ul className="space-y-3">
                        {selectedPatient.medicalHistory.map((hist: any) => (
                          <li key={hist.id} className="text-sm p-3 bg-slate-50 rounded-lg border border-slate-100 relative pl-4 border-r-2 border-r-blue-400">
                            <p className="font-bold text-slate-800">{hist.diagnosis}</p>
                            <p className="text-slate-500 text-xs mt-1">{hist.date}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-500">لا يوجد تاريخ طبي مسجل</p>
                    )}
                  </div>

                  {/* Medications */}
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-2 text-slate-700 mb-3">
                      <Pill className="h-4 w-4" />
                      الأدوية الحالية
                    </h4>
                    <div className="space-y-2">
                      {(() => {
                        const allMeds = [...selectedPatient.medications.toBeDispensed, ...(selectedPatient.medications.alreadyDispensed || [])];
                        if (allMeds.length === 0) {
                          return <p className="text-sm text-slate-500">لا يوجد أدوية حالية</p>;
                        }
                        return allMeds.map((med: any, i: number) => (
                           <div key={i} className="text-sm p-3 bg-white border border-slate-200 rounded-lg flex justify-between items-center">
                              <div>
                                <p className="font-bold text-slate-800">{med.name}</p>
                                {('dosage' in med) && <p className="text-slate-500 text-xs mt-1">{med.dosage}</p>}
                                {('date' in med) && <p className="text-slate-500 text-xs mt-1">صُرف في {med.date}</p>}
                              </div>
                           </div>
                        ));
                      })()}
                    </div>
                  </div>
                  
                  {/* Lab Tests Required */}
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-2 text-slate-700 mb-3">
                      <Microscope className="h-4 w-4" />
                      التحاليل المطلوبة (معلقة)
                    </h4>
                    {selectedPatient.labTests.required.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedPatient.labTests.required.map((test: any) => (
                           <li key={test.id} className="text-sm p-3 bg-white border border-slate-200 rounded-lg flex justify-between items-center">
                              <span className="font-bold text-slate-800">{test.testName}</span>
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{test.priority}</span>
                           </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-slate-500">لا توجد تحاليل معلقة</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                <User className="h-16 w-16 mb-4 text-slate-200" />
                <p className="text-center font-medium">اختر "عرض الملف" من المواعيد المحجوزة لعرض تفاصيل المريض</p>
              </div>
            )}
          </div>
        </div>

      </main>

      {/* MANAGE PATIENT MODAL */}
      {isManageModalOpen && managingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
                 <h2 className="text-xl font-bold flex items-center gap-2">
                   إدارة بيانات المريض: <span className="text-blue-600">{managingPatient.profile.name}</span>
                 </h2>
                 <button onClick={closeManageModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="h-5 w-5 text-slate-500" />
                 </button>
              </div>
              
              <div className="p-6 space-y-8">
                 
                 {/* Add Diagnosis */}
                 <section className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                       <Activity className="h-4 w-4 text-blue-500" />
                       إضافة تشخيص جديد
                    </h3>
                    <form onSubmit={handleAddDiagnosis} className="flex gap-2">
                       <input 
                         type="text" 
                         value={newDiagnosis}
                         onChange={(e) => setNewDiagnosis(e.target.value)}
                         placeholder="أدخل التشخيص..." 
                         className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                         required
                       />
                       <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">إضافة</button>
                    </form>
                 </section>

                 {/* Add Medication */}
                 <section className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                       <Pill className="h-4 w-4 text-amber-500" />
                       وصف دواء جديد (للصرف)
                    </h3>
                    <form onSubmit={handleAddMedication} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       <input 
                         type="text" 
                         value={newMedName}
                         onChange={(e) => setNewMedName(e.target.value)}
                         placeholder="اسم الدواء..." 
                         className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none sm:col-span-2"
                         required
                       />
                       <input 
                         type="text" 
                         value={newMedDosage}
                         onChange={(e) => setNewMedDosage(e.target.value)}
                         placeholder="الجرعة (مثال: مرتين يومياً)" 
                         className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                         required
                       />
                       <input 
                         type="text" 
                         value={newMedDuration}
                         onChange={(e) => setNewMedDuration(e.target.value)}
                         placeholder="المدة (مثال: 5 أيام)" 
                         className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                         required
                       />
                       <div className="sm:col-span-2 flex justify-end">
                         <button type="submit" className="px-6 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600">وصف دواء</button>
                       </div>
                    </form>
                 </section>

                 {/* Request Lab Test */}
                 <section className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                       <Microscope className="h-4 w-4 text-rose-500" />
                       طلب تحليل مختبري
                    </h3>
                    <form onSubmit={handleRequestTest} className="flex gap-2">
                       <select 
                         value={selectedTestId}
                         onChange={(e) => setSelectedTestId(e.target.value)}
                         className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                         required
                       >
                         <option value="" disabled>اختر التحليل...</option>
                         {labTech.testCatalog.map(test => (
                            <option key={test.testId} value={test.testId}>{test.name}</option>
                         ))}
                       </select>
                       <button type="submit" className="px-4 py-2 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700">طلب</button>
                    </form>
                 </section>

              </div>
           </div>
        </div>
      )}

    </div>
  );
}
