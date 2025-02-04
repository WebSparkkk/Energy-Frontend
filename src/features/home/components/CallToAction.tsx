import { Building2, ArrowLeft } from 'lucide-react';

export default function CallToAction() {
  const whatsappLink = "https://wa.me/201069427088";

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary-700 opacity-95"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2070')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'overlay'
      }}></div>
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Building2 className="h-16 w-16 text-white mx-auto mb-8 opacity-75" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ابدأ رحلة نجاحك اليوم
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            انضم إلى مجتمع من رواد الأعمال والمبدعين. احجز جولتك المجانية الآن واكتشف مساحة العمل المثالية لك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
            >
              احجز جولة مجانية
              <ArrowLeft className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-primary-700 transition-colors"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}