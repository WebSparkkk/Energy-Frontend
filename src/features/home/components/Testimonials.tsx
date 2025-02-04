import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: 'سارة أحمد',
    role: 'المؤسس التنفيذي',
    company: 'تك ستارت',
    content: 'مساحات العمل هذه غيرت طريقة عملنا بشكل كامل. البيئة المهنية والمرافق الحديثة ساعدت شركتنا على النمو بشكل أسرع.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'محمد خالد',
    role: 'مصمم مستقل',
    company: 'استوديو إبداع',
    content: 'العمل هنا يلهمني كل يوم. المجتمع النشط والمساحات الإبداعية تجعل من السهل التركيز والإنتاج.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'نورا سالم',
    role: 'مدير المشاريع',
    company: 'شركة المستقبل',
    content: 'المرافق المتكاملة وفريق الدعم المحترف يجعلان من هذا المكان الخيار الأمثل لفريقنا المتنامي.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">ماذا يقول عملاؤنا</h2>
        <p className="text-xl text-gray-600 text-center mb-12">تجارب حقيقية من أعضاء مجتمعنا</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}