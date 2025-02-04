import { Wifi, Coffee, Monitor, Users, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: <Wifi className="h-8 w-8" />,
    title: 'إنترنت فائق السرعة',
    description: 'اتصال إنترنت عالي السرعة وموثوق به على مدار الساعة'
  },
  {
    icon: <Coffee className="h-8 w-8" />,
    title: 'مرافق متكاملة',
    description: 'مطبخ مجهز بالكامل مع قهوة وشاي مجاني'
  },
  {
    icon: <Monitor className="h-8 w-8" />,
    title: 'تقنيات حديثة',
    description: 'شاشات عرض وأجهزة عرض متطورة في جميع قاعات الاجتماعات'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'مجتمع نشط',
    description: 'بيئة عمل محفزة مع مجتمع من المهنيين المبدعين'
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'مفتوح 24/7',
    description: 'وصول على مدار الساعة طوال أيام الأسبوع مع نظام أمان متطور'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'أمان وخصوصية',
    description: 'أنظمة أمان متقدمة وخصوصية تامة لجميع الأعضاء'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">مميزات مساحات العمل</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-6 rounded-xl hover:transform hover:scale-105 transition-transform">
              <div className="text-primary-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}