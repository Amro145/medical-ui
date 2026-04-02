"use client";

import { useState, useEffect } from "react";
import data from "@/public/data/data.json";
import { UserCircle, CalendarDays, Phone, MapPin, Droplet, Clock, CalendarPlus, Loader2, Edit3, X, Activity, Pill, Microscope, Search, Navigation } from "lucide-react";
import Link from "next/link";

// Mock locator data since it's not fully in data.json
const locatorMocks = {
  pharmacies: [
    { name: "صيدلية الدواء - الفرع الرئيسي", distance: "0.5 كم", status: "متاح فوراً" },
    { name: "صيدلية النهدي - فرع اليرموك", distance: "1.2 كم", status: "متاح فوراً" },
    { name: "صيدلية المستشفى الداخلي", distance: "داخل المبنى", status: "متاح" }
  ],
  labs: [
    { name: "مختبر البرج الطبي", distance: "2 كم", status: "يستقبل التحاليل" },
    { name: "مختبرات ألفا", distance: "3.5 كم", status: "يستقبل التحاليل" },
    { name: "مختبر المستشفى (الدور الثاني)", distance: "داخل المبنى", status: "مغلق حالياً، يفتح 8 ص" }
  ]
};

// Mock pending items
const pendingMeds = [
  { id: "RX-101", name: "أموكسيسيلين 500 ملغ", dosage: "حبة كل 8 ساعات" },
  { id: "RX-102", name: "بانادول إكسترا", dosage: "عند الحاجة" }
];

const pendingLabs = [
  { id: "LAB-233", name: "تحليل سكر تراكمي (HbA1c)" },
  { id: "LAB-234", name: "تحليل وظائف كلى" }
];

export default function PatientDashboard() {
  const { patients, doctor } = data;
  const initialPatient = patients.find(p => p.id === "patient_1") || patients[0];
  
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(initialPatient);
  
  const [localFreeSlots, setLocalFreeSlots] = useState(doctor.schedule.freeSlots);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editPhone, setEditPhone] = useState(patientData.profile.phone);
  const [editAddress, setEditAddress] = useState(patientData.profile.address);

  // Locator Modal State
  const [isLocatorOpen, setIsLocatorOpen] = useState(false);
  const [locatorMode, setLocatorMode] = useState<"pharmacy" | "lab" | null>(null);
  const [locatorTarget, setLocatorTarget] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="flex flex-col items-center text-emerald-600">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p className="font-bold">جاري تحميل بيانات الملف الشخصي...</p>
        </div>
      </div>
    );
  }

  const handleBookSlot = (slot: any) => {
    setLocalFreeSlots(prev => prev.filter(s => s.date !== slot.date || s.time !== slot.time));
    setPatientData(prev => ({
      ...prev,
      upcomingAppointment: {
        id: `app_${Date.now()}`,
        date: slot.date,
        time: slot.time,
        doctorId: doctor.id,
        doctorName: doctor.profile.name,
        status: "مؤكد"
      }
    }));
    setIsBookingOpen(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setPatientData(prev => ({
      ...prev, profile: { ...prev.profile, phone: editPhone, address: editAddress }
    }));
    setIsEditProfileOpen(false);
  };

  const openLocator = (mode: "pharmacy" | "lab", itemName: string) => {
    setLocatorMode(mode);
    setLocatorTarget(itemName);
    setIsLocatorOpen(true);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Welcome & Profile Summary */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="flex items-center gap-5 z-10">
          <div className="h-20 w-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center border-4 border-white shadow-md">
            <UserCircle className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">مرحباً بك، <span className="text-emerald-600">{patientData.profile.name}</span></h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-slate-400" /> {patientData.profile.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> {patientData.profile.address}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsEditProfileOpen(true)}
          className="z-10 px-5 py-2.5 bg-white border-2 border-emerald-100 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <Edit3 className="h-4 w-4" />
          تحديث البيانات
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Next Appointment */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
           <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <CalendarDays className="h-5 w-5 text-blue-500" />
              الموعد القادم
           </h2>
           
           {patientData.upcomingAppointment ? (
             <div className="bg-linear-to-l from-blue-50 to-white border border-blue-100 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500 rounded-l-2xl"></div>
                <h3 className="font-bold text-lg text-slate-800 mb-1">{patientData.upcomingAppointment.doctorName}</h3>
                <p className="text-sm font-bold text-blue-600 bg-blue-100/50 inline-block px-3 py-1 rounded-md mb-4 border border-blue-200">
                  حالة الموعد: {patientData.upcomingAppointment.status}
                </p>
                <div className="flex items-center gap-6 mt-2">
                   <div className="flex items-center gap-2 text-slate-600 font-bold">
                     <CalendarDays className="h-5 w-5 text-slate-400" />
                     <span>{patientData.upcomingAppointment.date}</span>
                   </div>
                   <div className="flex items-center gap-2 text-slate-600 font-bold">
                     <Clock className="h-5 w-5 text-slate-400" />
                     <span>{patientData.upcomingAppointment.time}</span>
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
                <CalendarDays className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium mb-4">لا توجد مواعيد قادمة مجدولة حالياً</p>
                <Link 
                  href="/patient/appointments"
                  className="w-fit px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <CalendarPlus className="h-4 w-4" />
                  حجز موعد جديد بالقائمة المتقدمة
                </Link>
             </div>
           )}
        </section>

        {/* Quick Health Vitals / Info */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
           <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-rose-500" />
              سجل الملف الطبي السريع
           </h2>
           <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-rose-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-rose-100">
                 <Droplet className="h-8 w-8 text-rose-500 mb-2" />
                 <span className="text-xs font-bold text-rose-600 uppercase">فصيلة الدم</span>
                 <span className="text-2xl font-black text-rose-700 mt-1">{patientData.profile.bloodType}</span>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-4 flex flex-col justify-center border border-indigo-100 text-center">
                 <span className="text-3xl font-black text-indigo-700 block mb-1">{patientData.medicalHistory.length}</span>
                 <span className="text-sm font-bold text-indigo-900">تشخيصات طبية متوفرة بالملف</span>
              </div>
           </div>
        </section>

      </div>

      {/* Pending Items (Medications and Labs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Target: Medications */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <Pill className="h-5 w-5 text-purple-600" />
                 وصفات أدوية بانتظار الصرف
              </h2>
           </div>
           
           <div className="space-y-3">
             {pendingMeds.length > 0 ? pendingMeds.map((med, i) => (
                <div key={i} onClick={() => openLocator('pharmacy', med.name)} className="flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl border border-purple-100 cursor-pointer transition-colors group">
                   <div>
                      <h4 className="font-bold text-purple-900">{med.name}</h4>
                      <p className="text-purple-600 text-sm mt-1">{med.dosage}</p>
                   </div>
                   <Search className="w-5 h-5 text-purple-400 group-hover:text-purple-700" />
                </div>
             )) : (
                <div className="p-4 text-center text-slate-400 font-medium bg-slate-50 rounded-2xl">لا توجد وصفات قيد الانتظار</div>
             )}
           </div>
        </section>

        {/* Target: Labs */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                 <Microscope className="h-5 w-5 text-amber-600" />
                 تحاليل بانتظار العينات
              </h2>
           </div>
           
           <div className="space-y-3">
             {pendingLabs.length > 0 ? pendingLabs.map((lab, i) => (
                <div key={i} onClick={() => openLocator('lab', lab.name)} className="flex items-center justify-between p-4 bg-amber-50 hover:bg-amber-100 rounded-2xl border border-amber-100 cursor-pointer transition-colors group">
                   <div>
                      <h4 className="font-bold text-amber-900">{lab.name}</h4>
                      <p className="text-amber-600 text-sm mt-1">يتطلب زيارة المختبر</p>
                   </div>
                   <Search className="w-5 h-5 text-amber-400 group-hover:text-amber-700" />
                </div>
             )) : (
                <div className="p-4 text-center text-slate-400 font-medium bg-slate-50 rounded-2xl">لا توجد تحاليل مطلوبة</div>
             )}
           </div>
        </section>

      </div>

      {/* Locator Modal */}
      {isLocatorOpen && locatorMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
              <div className={`px-6 py-5 flex items-center justify-between border-b ${locatorMode === 'pharmacy' ? 'bg-purple-50 border-purple-100' : 'bg-amber-50 border-amber-100'}`}>
                 <h2 className={`text-xl font-bold flex items-center gap-2 ${locatorMode === 'pharmacy' ? 'text-purple-900' : 'text-amber-900'}`}>
                    {locatorMode === 'pharmacy' ? <Pill className="h-6 w-6 text-purple-600" /> : <Microscope className="h-6 w-6 text-amber-600" />}
                    أماكن التوفر القريبة
                 </h2>
                 <button onClick={() => setIsLocatorOpen(false)} className={`p-2 rounded-full transition-colors ${locatorMode === 'pharmacy' ? 'hover:bg-purple-100 text-purple-700' : 'hover:bg-amber-100 text-amber-700'}`}>
                    <X className="h-5 w-5" />
                 </button>
              </div>
              <div className="p-6">
                 <div className="mb-6">
                   <p className="text-slate-500 font-medium text-sm">تبحث توافر:</p>
                   <p className="text-lg font-bold text-slate-800">{locatorTarget}</p>
                 </div>
                 
                 <div className="space-y-3">
                   {locatorMocks[locatorMode === 'pharmacy' ? 'pharmacies' : 'labs'].map((loc, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl hover:border-emerald-500 transition-colors bg-slate-50 hover:bg-emerald-50/30">
                         <div>
                            <h4 className="font-bold text-slate-800 mb-1">{loc.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">الحالة: <span className="text-emerald-600">{loc.status}</span></p>
                         </div>
                         <div className="flex flex-col items-end gap-2">
                           <span className="text-emerald-700 font-bold text-sm bg-emerald-100 px-2 py-0.5 rounded-lg">{loc.distance}</span>
                           <button className="text-xs font-bold text-slate-400 hover:text-emerald-700 flex items-center gap-1">
                             <Navigation className="w-3 h-3"/> الاتجاهات
                           </button>
                         </div>
                      </div>
                   ))}
                 </div>
                 
                 <div className="flex justify-end pt-6 mt-4 border-t border-slate-100">
                    <button type="button" onClick={() => setIsLocatorOpen(false)} className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">إغلاق وتراجع</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
              <div className="bg-emerald-50 px-6 py-5 flex items-center justify-between border-b border-emerald-100">
                 <h2 className="text-lg font-bold flex items-center gap-2 text-emerald-900">
                    <Edit3 className="h-5 w-5 text-emerald-600" />
                    تحديث بيانات التواصل
                 </h2>
                 <button onClick={() => setIsEditProfileOpen(false)} className="p-2 hover:bg-emerald-100 rounded-full transition-colors">
                    <X className="h-5 w-5 text-emerald-700" />
                 </button>
              </div>
              <div className="p-6">
                 <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">رقم الجوال:</label>
                      <input 
                        type="text" 
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-left bg-slate-50 focus:bg-white transition-colors text-slate-900 font-bold"
                        required
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">العنوان السكني:</label>
                      <input 
                        type="text" 
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50 focus:bg-white transition-colors text-slate-900 font-bold"
                        required
                      />
                    </div>
                    <div className="flex gap-3 mt-4">
                       <button type="submit" className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-md">حفظ البيانات</button>
                       <button type="button" onClick={() => setIsEditProfileOpen(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">إلغاء</button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
