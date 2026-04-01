"use client";

import { useState, useEffect } from "react";
import data from "@/public/data/data.json";
import { Search, Calendar, Clock, Loader2, ChevronRight, CheckCircle2, UserCircle, MapPin, X } from "lucide-react";
import Link from "next/link";

export default function AppointmentsPage() {
  const { doctor } = data;
  
  // Wrap the single doctor in an array to simulate a list of hospital doctors
  const initialDoctors = [doctor];
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState(initialDoctors);
  
  // Selection and Booking state
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [localFreeSlots, setLocalFreeSlots] = useState<any[]>(doctor.schedule.freeSlots);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{message: string} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.profile.name.includes(searchQuery) || 
    doc.profile.specialty.includes(searchQuery)
  );

  const selectedDoctor = doctors.find(d => d.id === selectedDocId);

  const handleSlotClick = (slot: any) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot || !selectedDoctor) return;
    
    // Visually remove the slot from the free slots array
    setLocalFreeSlots(prev => prev.filter(s => s.date !== selectedSlot.date || s.time !== selectedSlot.time));
    
    setIsModalOpen(false);
    setSelectedSlot(null);
    
    setToast({ message: "تم تأكيد الحجز بنجاح!" });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center p-6" dir="rtl">
        <div className="flex flex-col items-center text-blue-600">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p className="font-bold">جاري تحميل قائمة الأطباء والمواعيد...</p>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-6 md:p-10 space-y-8 animate-in fade-in duration-500 font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-10">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header and Back Link */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Calendar className="h-8 w-8 text-blue-600" />
          حجز موعد جديد
        </h1>
        <Link href="/patient/dashboard" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
          <ChevronRight className="h-4 w-4" />
          العودة للوحة التحكم
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center relative">
        <Search className="h-5 w-5 text-slate-400 absolute right-6 pointer-events-none" />
        <input 
          type="text"
          placeholder="ابحث عن طبيب بالاسم، أو التخصص (مثال: الطب العام)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent pl-4 pr-14 py-3 outline-none text-slate-700 font-medium"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Doctors List */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-700 mb-2">الأطباء المتاحين ({filteredDoctors.length})</h2>
          
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doc => (
              <button 
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`w-full text-right p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  selectedDocId === doc.id 
                    ? 'border-blue-500 bg-blue-50/50 shadow-md' 
                    : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-sm'
                }`}
              >
                <div className={`h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold ${
                  selectedDocId === doc.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {doc.profile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{doc.profile.name}</h3>
                  <p className={`text-sm font-semibold mt-1 ${selectedDocId === doc.id ? 'text-blue-600' : 'text-slate-500'}`}>
                    {doc.profile.specialty}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 text-center">
              <Search className="h-8 w-8 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">لا يوجد أطباء متطابقين مع بحثك.</p>
            </div>
          )}
        </div>

        {/* Doctor Schedule View */}
        <div className="lg:col-span-7">
          {selectedDoctor ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="bg-slate-50 border-b border-slate-100 p-6 flex items-center gap-4">
                 <div className="h-16 w-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm">
                   <UserCircle className="h-8 w-8" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-slate-800">{selectedDoctor.profile.name}</h2>
                   <p className="text-slate-500 font-medium text-sm mt-1 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> عيادة {selectedDoctor.profile.specialty}</p>
                 </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  المواعيد المتاحة
                </h3>
                
                {localFreeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {localFreeSlots.map((slot, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSlotClick(slot)}
                        className="p-4 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center group"
                      >
                        <span className="text-lg font-black text-slate-800 group-hover:text-blue-700">{slot.time}</span>
                        <span className="text-xs font-bold text-slate-400 mt-1">{slot.date}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                     <Calendar className="h-12 w-12 text-slate-300 mb-3" />
                     <p className="text-slate-500 font-medium">عذراً، لا توجد مواعيد متاحة لهذا الطبيب حالياً.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-200 h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
               <UserCircle className="h-16 w-16 text-slate-300 mb-4" />
               <h3 className="text-xl font-bold text-slate-400 mb-2">طبيب غير محدد</h3>
               <p className="text-slate-400 font-medium max-w-sm">يرجى تحديد طبيب من القائمة لاستعراض أوقات العمل وحجز الموعد الخاص بك.</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {isModalOpen && selectedSlot && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
              <div className="bg-blue-50 px-6 py-5 flex items-center justify-between border-b border-blue-100">
                 <h2 className="text-xl font-bold flex items-center gap-2 text-blue-900">
                    تأكيد حجز الموعد
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-blue-100 rounded-full transition-colors text-blue-700">
                    <X className="h-5 w-5" />
                 </button>
              </div>
              <div className="p-6 space-y-6">
                 
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="flex items-center justify-between py-2 border-b border-slate-200">
                     <span className="text-slate-500 font-bold text-sm">الطبيب</span>
                     <span className="text-slate-800 font-bold">{selectedDoctor.profile.name}</span>
                   </div>
                   <div className="flex items-center justify-between py-2 border-b border-slate-200">
                     <span className="text-slate-500 font-bold text-sm">التاريخ</span>
                     <span className="text-slate-800 font-bold flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {selectedSlot.date}</span>
                   </div>
                   <div className="flex items-center justify-between py-2">
                     <span className="text-slate-500 font-bold text-sm">الوقت</span>
                     <span className="text-slate-800 font-bold flex items-center gap-1.5"><Clock className="h-4 w-4" /> {selectedSlot.time}</span>
                   </div>
                 </div>

                 <p className="text-center text-sm font-medium text-slate-500">
                   يرجى التأكد من الموعد قبل الاعتماد، علماً أنه يجب الحضور قبل الموعد بـ 15 دقيقة.
                 </p>
                 
                 <div className="flex gap-3 pt-2">
                    <button 
                      onClick={handleConfirmBooking}
                      className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      تأكيد الحجز
                    </button>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      إلغاء
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
