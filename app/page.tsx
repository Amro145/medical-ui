import Link from 'next/link';
import { User, Stethoscope, Pill, Microscope } from 'lucide-react';

export default function Home() {
  const roles = [
    {
      title: 'مريض',
      description: 'بوابة الخدمات الطبية للمرضى',
      icon: User,
      href: '/patient/dashboard',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      lightColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'طبيب',
      description: 'بوابة إدارة المواعيد والمرضى',
      icon: Stethoscope,
      href: '/doctor/dashboard',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      lightColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'صيدلي',
      description: 'بوابة إدارة الأدوية والوصفات',
      icon: Pill,
      href: '/pharmacist/dashboard',
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      lightColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'فحص طبي',
      description: 'بوابة إدارة التحاليل والمختبر',
      icon: Microscope,
      href: '/lab/dashboard',
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600',
      lightColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            مرحباً بك في نظام الأمل الطبي
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            يرجى اختيار دورك لتسجيل الدخول إلى لوحة التحكم الخاصة بك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <Link key={idx} href={role.href} className="block group no-underline">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full h-full flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full ${role.lightColor} group-hover:scale-110 transition-transform duration-300 mb-6`}>
                    <Icon className={`w-12 h-12 ${role.iconColor}`} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {role.title}
                  </h3>
                  
                  <p className="text-slate-500 mb-6 flex-grow">
                    {role.description}
                  </p>

                  <div className={`mt-auto w-full py-3 rounded-xl text-white font-medium ${role.color} ${role.hoverColor} transition-colors duration-300`}>
                    تسجيل الدخول كـ {role.title}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
