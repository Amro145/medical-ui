"use client";

import { useState } from "react";
import data from "@/public/data/data.json";
import { User, Clock, Calendar, CheckCircle2, ChevronLeft, Activity, Pill, LogOut } from "lucide-react";
import Link from "next/link";

export default function DoctorDashboard() {
  const { doctor, patients } = data;
  const today = "2026-04-10";

  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

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
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      isToday 
                        ? 'border-blue-200 bg-blue-50/50 shadow-sm' 
                        : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
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
                    <button 
                      onClick={() => setSelectedPatientId(slot.patientId)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
                    >
                      عرض الملف
                      <ChevronLeft className="h-4 w-4" />
                    </button>
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

        {/* Right Column - Patient Quick Access Modal / Sidebar */}
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
                        {selectedPatient.medicalHistory.map((hist) => (
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
                      {[...selectedPatient.medications.toBeDispensed, ...selectedPatient.medications.alreadyDispensed].length > 0 ? (
                        [...selectedPatient.medications.toBeDispensed, ...selectedPatient.medications.alreadyDispensed].map((med, i) => (
                           <div key={i} className="text-sm p-3 bg-white border border-slate-200 rounded-lg flex justify-between items-center">
                              <div>
                                <p className="font-bold text-slate-800">{med.name}</p>
                                {('dosage' in med) && <p className="text-slate-500 text-xs mt-1">{med.dosage}</p>}
                                {('date' in med) && <p className="text-slate-500 text-xs mt-1">صُرف في {med.date}</p>}
                              </div>
                           </div>
                        ))
                      ) : (
                         <p className="text-sm text-slate-500">لا يوجد أدوية حالية</p>
                      )}
                    </div>
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
    </div>
  );
}
