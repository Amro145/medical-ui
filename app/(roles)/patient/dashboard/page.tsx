import data from '@/public/data/data.json';
import { 
  Calendar, 
  MapPin, 
  Pill, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TestTube2, 
  Activity, 
  User,
  History
} from 'lucide-react';

export default function PatientDashboard() {
  // Filter for Ahmed Mahmoud
  const patient = data.patients.find((p: any) => p.id === 'patient_1');

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-64 text-xl text-slate-500">
        لم يتم العثور على بيانات المريض.
      </div>
    );
  }

  const { profile, upcomingAppointment, medications, labTests } = patient;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            مرحباً، {profile.name} 👋
          </h1>
          <p className="text-slate-500 flex items-center gap-2">
            <Activity className="w-4 h-4" /> فصيلة الدم: <span className="font-semibold text-slate-700">{profile.bloodType}</span>
          </p>
        </div>
        <div className="hidden md:flex bg-blue-50 p-4 rounded-full text-blue-600">
          <User className="w-8 h-8" />
        </div>
      </div>

      {/* Grid Layout (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Calendar className="text-blue-600 w-6 h-6" />
            الموعد القادم
          </h2>
          
          {upcomingAppointment ? (
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-blue-900">{upcomingAppointment.doctorName}</h3>
                  <p className="text-sm text-blue-700 mt-1">الموعد الطبي</p>
                </div>
                {upcomingAppointment.status === 'مؤكد' && (
                  <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> مؤكد
                  </span>
                )}
              </div>
              <div className="space-y-3 mt-4 text-blue-800">
                <div className="flex items-center gap-2 bg-white/60 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">{upcomingAppointment.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">{upcomingAppointment.time}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center flex-grow">
              <Calendar className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-slate-500 font-medium">لا توجد مواعيد قادمة</p>
            </div>
          )}
        </div>

        {/* Column 2: Medications */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Pill className="text-purple-600 w-6 h-6" />
            الأدوية والوصفات
          </h2>
          
          <div className="space-y-6 flex-grow">
            {/* Pending Medications */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 mb-3 flex items-center gap-1">
                <Clock className="w-4 h-4" /> قيد الانتظار (لصرفها)
              </h3>
              {medications.toBeDispensed && medications.toBeDispensed.length > 0 ? (
                <div className="space-y-3">
                  {medications.toBeDispensed.map((med: any) => (
                    <div key={med.id} className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-purple-900">{med.name}</h4>
                        <p className="text-xs text-purple-700 mt-1">{med.dosage} - {med.duration}</p>
                      </div>
                      <div className="bg-white p-2 rounded-lg shrink-0">
                         <Pill className="text-purple-600 w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-4 text-center text-slate-500 text-sm border border-slate-100">
                  لا توجد أدوية قيد الانتظار
                </div>
              )}
            </div>

            {/* Dispensed Medications */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 mb-3 flex items-center gap-1">
                <History className="w-4 h-4" /> تم صرفها مسبقاً
              </h3>
              {medications.alreadyDispensed && medications.alreadyDispensed.length > 0 ? (
                <div className="space-y-3">
                  {medications.alreadyDispensed.map((med: any) => (
                    <div key={med.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-start">
                      <div>
                         <h4 className="font-bold text-slate-700">{med.name}</h4>
                         <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                           <MapPin className="w-3 h-3" /> {med.pharmacyName}
                         </p>
                      </div>
                      <span className="text-xs text-slate-400">{med.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                 <div className="text-xs text-slate-400">لا يوجد سجل تاريخي للأدوية الموصوفة.</div>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Lab Tests */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TestTube2 className="text-amber-500 w-6 h-6" />
            التحاليل والفحوصات
          </h2>
          
          <div className="space-y-6 flex-grow">
            {/* Required Tests */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 mb-3 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> مطلوب إجراؤها
              </h3>
              {labTests.required && labTests.required.length > 0 ? (
                <div className="space-y-3">
                  {labTests.required.map((test: any) => (
                    <div key={test.id} className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                         <h4 className="font-bold text-amber-900">{test.testName}</h4>
                         <span className={`text-xs px-2 py-1 rounded-md font-bold ${
                           test.priority === 'عالي' ? 'bg-red-100 text-red-700' : 'bg-amber-200 text-amber-800'
                         }`}>
                           أولوية: {test.priority}
                         </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-4 text-center text-slate-500 text-sm border border-slate-100">
                  لا توجد تحاليل مطلوبة حالياً
                </div>
              )}
            </div>

            {/* Completed Tests */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 mb-3 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> النتائج السابقة
              </h3>
              {labTests.completed && labTests.completed.length > 0 ? (
                <div className="space-y-3">
                  {labTests.completed.map((test: any) => (
                    <div key={test.id} className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-emerald-900 text-sm">{test.testName}</h4>
                         <span className="text-xs text-emerald-600">{test.date}</span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-700 mb-2">النتايج: {test.resultSummary}</p>
                      <p className="text-xs text-emerald-600/70 flex items-center gap-1">
                         <MapPin className="w-3 h-3" /> {test.labCenterName}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400">لا يوجد سجل تاريخي للتحاليل المخبرية.</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
