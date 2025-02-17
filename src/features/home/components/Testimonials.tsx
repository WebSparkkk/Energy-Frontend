import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: 'ابراهيم شعيب  ',
    role: ' مبرمج ويب',
    company: 'شركه كودكس ',
    content: 'مساحات العمل هذه غيرت طريقة عملنا بشكل كامل. البيئة المهنية والمرافق الحديثة ساعدت شركتنا على النمو بشكل أسرع.',
    image: "../../../../public/images/images/ibrahim.png",
  }
  ,
  {
    name: 'رشاد عاطف',
    role: 'مبرمج تطبيقات',
    company: 'شركه كودكس',
    content: 'العمل هنا يلهمني كل يوم. المجتمع النشط والمساحات الإبداعية تجعل من السهل التركيز والإنتاج.',
    image: "../../../../public/images/images/rashad.jpg",
  }
  ,
  {
    name: '.زياد تامر',
    role: 'مبرمج ويب',
    company: 'شركه كودكس',
    content: "بيئة العمل هنا تحفزني يوميًا على الإبداع والإنجاز. بفضل المجتمع الحيوي والمساحات المصممة بعناية، أصبح التركيز أسهل والإنتاجية أعلى، مما يجعل كل يوم تجربة مميزة!",
    image: "../../../../public/images/images/icon.jpg",
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">ماذا يقول عملاؤنا</h2>
        <p className="text-xl text-gray-600 text-center mb-12">تجارب حقيقية من أعضاء مجتمعنا</p>
        
        <div className="grid grid-cols-2  gap-8 ">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}