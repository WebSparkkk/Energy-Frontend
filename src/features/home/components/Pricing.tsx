import PricingCard from './PricingCard';

const pricingPlans = [
  {
    name: 'الباقة المرنة',
    price: '299 جنيه',
    period: 'يوم',
    description: 'مثالية للزيارات المؤقتة والاجتماعات',
    features: [
      { text: 'مكتب مشترك', included: true },
      { text: 'إنترنت فائق السرعة', included: true },
      { text: 'قهوة وشاي مجاني', included: true },
      { text: 'استخدام قاعات الاجتماعات', included: false },
      { text: 'خزانة شخصية', included: false },
      { text: 'عنوان تجاري', included: false },
    ],
  },
  {
    name: 'الباقة المهنية',
    price: '1,999 جنيه',
    period: 'شهر',
    description: 'الأفضل للشركات الناشئة والمستقلين',
    features: [
      { text: 'مكتب مخصص', included: true },
      { text: 'إنترنت فائق السرعة', included: true },
      { text: 'قهوة وشاي مجاني', included: true },
      { text: 'استخدام قاعات الاجتماعات', included: true },
      { text: 'خزانة شخصية', included: true },
      { text: 'عنوان تجاري', included: false },
    ],
    isPopular: true,
  },
  {
    name: 'باقة الشركات',
    price: '4,999 جنيه',
    period: 'شهر',
    description: 'مثالية للفرق والشركات المتنامية',
    features: [
      { text: 'مكتب خاص', included: true },
      { text: 'إنترنت فائق السرعة', included: true },
      { text: 'قهوة وشاي مجاني', included: true },
      { text: 'استخدام قاعات الاجتماعات', included: true },
      { text: 'خزانة شخصية', included: true },
      { text: 'عنوان تجاري', included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">باقات الأسعار</h2>
        <p className="text-xl text-gray-600 text-center mb-12">اختر الباقة المناسبة لاحتياجاتك</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
} 