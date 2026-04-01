"use client";

import { useState, useEffect } from "react";
import data from "@/public/data/data.json";
import { User, LogOut, Loader2, Building, Edit, RefreshCw, X, CheckSquare } from "lucide-react";
import Link from "next/link";

export default function DeptManagerDashboard() {
  const { deptManager, doctor } = data; // Bringing in doctor to reassign their slots

  const [loading, setLoading] = useState(true);
  
  // Local state for shift table
  const [localShifts, setLocalShifts] = useState(deptManager.doctorShiftTable);
  
  // Local state for appointments to reassign
  const [localAppointments, setLocalAppointments] = useState(doctor.schedule.bookedSlots);

  // Modal states
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [newShiftValue, setNewShiftValue] = useState("");

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

  const handleOpenShiftModal = (docId: string, currentShift: string) => {
    setEditingDoctorId(docId);
    setNewShiftValue(currentShift);
    setIsShiftModalOpen(true);
  };

  const handleSaveShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctorId || !newShiftValue.trim()) return;

    setLocalShifts(prev => prev.map(d => {
      if (d.doctorId === editingDoctorId) {
        return { ...d, shift: newShiftValue };
      }
      return d;
    }));

    setIsShiftModalOpen(false);
    setEditingDoctorId(null);
  };

  const handleReassign = (appointmentId: string) => {
    const mockDoctorName = "د. ياسر المنصور (طبيب بديل)";
    
    // Visually moving it by updating doctor name
    setLocalAppointments(prev => prev.map(app => {
      if (app.id === appointmentId) {
        return { ...app, reassignedTo: mockDoctorName };
      }
      return app;
    }));
    
    alert(`تمت إحالة الموعد بنجاح إلى ${mockDoctorName}`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-indigo-100 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center text-xl font-bold">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{deptManager.department}</h1>
            <p className="text-slate-500 text-sm font-bold mt-1">المدير: {deptManager.profile.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm font-semibold text-indigo-700 border border-indigo-200 px-4 py-1.5 bg-indigo-50 rounded-full">
            لوحة تحكم إدارة الأقسام
          </p>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-100">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Shift Management */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-indigo-50/50">
             <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                <Edit className="h-5 w-5 text-indigo-600" />
                إدارة مناوبات الأطباء
             </h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
             {localShifts.map((shiftInfo, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                   <div className="mb-3 sm:mb-0">
                      <p className="font-bold text-slate-800 text-md mb-1">{shiftInfo.doctorName}</p>
                      <p className="text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-1 rounded-md border border-indigo-100">
                        الوردية: {shiftInfo.shift}
                      </p>
                   </div>
                   <button 
                     onClick={() => handleOpenShiftModal(shiftInfo.doctorId, shiftInfo.shift)}
                     className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-colors flex items-center justify-center gap-2"
                   >
                      تعديل الوردية
                      <Edit className="h-4 w-4" />
                   </button>
                </div>
             ))}
          </div>
        </section>

        {/* Right Column: Appointment Reassignments */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-amber-50/50">
             <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-amber-600" />
                إحالة المواعيد (تغيير الطبيب)
             </h2>
          </div>
          <div className="p-4 flex flex-col gap-3 max-h-[500px] overflow-y-auto">
             {localAppointments.map(app => {
                const isReassigned = 'reassignedTo' in app;
                return (
                   <div key={app.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl shadow-sm transition-all ${isReassigned ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-white'}`}>
                      <div className="mb-3 sm:mb-0 text-sm">
                         <p className="font-bold text-slate-800 flex items-center gap-2">
                           <User className="h-4 w-4" />
                           {app.patientName}
                         </p>
                         <p className="text-slate-500 mt-1">تاريخ: {app.date} | الوقت: {app.time}</p>
                         {isReassigned && (
                            <p className="text-emerald-700 font-bold mt-2 text-xs flex items-center gap-1">
                               <CheckSquare className="h-3 w-3" />
                               تمت الإحالة إلى: {(app as any).reassignedTo}
                            </p>
                         )}
                      </div>
                      {!isReassigned ? (
                         <button 
                           onClick={() => handleReassign(app.id)}
                           className="px-4 py-2 bg-amber-100 text-amber-700 font-bold text-sm rounded-lg hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
                         >
                            إحالة الموعد
                            <RefreshCw className="h-4 w-4" />
                         </button>
                      ) : (
                         <span className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold text-sm rounded-lg flex items-center justify-center">
                            مُحال
                         </span>
                      )}
                   </div>
                );
             })}
          </div>
        </section>

      </main>

      {/* Edit Shift Modal */}
      {isShiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
           <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200">
              <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
                 <h2 className="text-xl font-bold flex items-center gap-2">تعديل الوردية</h2>
                 <button onClick={() => setIsShiftModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="h-5 w-5 text-slate-500" />
                 </button>
              </div>
              <div className="p-6">
                 <form onSubmit={handleSaveShift} className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-slate-700">اختر الوردية الجديدة:</label>
                    <select 
                      value={newShiftValue}
                      onChange={(e) => setNewShiftValue(e.target.value)}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full bg-white"
                      required
                    >
                       <option value="صباحي (08:00 - 16:00)">صباحي (08:00 - 16:00)</option>
                       <option value="مسائي (16:00 - 00:00)">مسائي (16:00 - 00:00)</option>
                       <option value="ليلي (00:00 - 08:00)">ليلي (00:00 - 08:00)</option>
                    </select>
                    <div className="flex gap-2 mt-2">
                       <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">حفظ التعديل</button>
                       <button type="button" onClick={() => setIsShiftModalOpen(false)} className="px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">إلغاء</button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
