import { Building2, ArrowLeft, Users, Coffee, Briefcase } from 'lucide-react';

const stats = [
  {
    icon: <Users className="h-6 w-6 text-secondary-600" />,
    value: "+1000",
    label: "عضو نشط"
  },
  {
    icon: <Briefcase className="h-6 w-6 text-secondary-600" />,
    value: "15",
    label: "موقع"
  },
  {
    icon: <Coffee className="h-6 w-6 text-secondary-600" />,
    value: "24/7",
    label: "دعم متواصل"
  }
];

export default function Hero() {
  const whatsappLink = "https://wa.me/201069427088";

  return (
    <section className="pt-32 pb-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content Side */}
          <div className="flex-1 text-right">
            <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-semibold">مساحات عمل مبتكرة</span>
              <Building2 className="h-5 w-5" />
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              مساحات عمل 
              <span className="text-secondary-500"> عصرية </span>
              لإلهام إبداعك
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              اكتشف مساحات عمل مجهزة بالكامل تجمع بين الراحة والإنتاجية. انضم إلى مجتمع من المبدعين والمهنيين في أرقى المواقع.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-secondary-600 transition-colors flex items-center justify-center gap-2"
              >
                احجز جولة مجانية
                <ArrowLeft className="h-5 w-5" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-secondary-500 text-secondary-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-secondary-50 transition-colors"
              >
                تواصل معنا
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-start">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-secondary-50 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="flex-1 relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="مساحة عمل حديثة"
                className="rounded-2xl shadow-2xl"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary-50 p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">مكاتب خاصة</div>
                    <div className="text-sm text-gray-600">متوفرة الآن</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -z-10 top-8 right-8 w-full h-full bg-secondary-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}