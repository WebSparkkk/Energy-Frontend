import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      className="w-full py-6 text-right flex items-center justify-between focus:outline-none"
      onClick={onClick}
    >
      <span className="text-lg font-semibold text-gray-800">{question}</span>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-primary-600" />
      ) : (
        <ChevronDown className="h-5 w-5 text-primary-600" />
      )}
    </button>
    {isOpen && (
      <div className="pb-6">
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

const faqs = [
  {
    question: "ما هي ساعات العمل في المساحات المشتركة؟",
    answer: "مساحات العمل متاحة على مدار 24 ساعة طوال أيام الأسبوع لأعضائنا. يمكنك الوصول إلى المكتب في أي وقت باستخدام بطاقة العضوية الخاصة بك."
  },
  {
    question: "هل يمكنني إلغاء عضويتي في أي وقت؟",
    answer: "نعم، يمكنك إلغاء عضويتك في أي وقت مع إشعار مسبق بـ 30 يوماً. نحن نقدم سياسة مرنة تناسب احتياجات عملائنا."
  },
  {
    question: "هل تتوفر خدمة استقبال الضيوف؟",
    answer: "نعم، نوفر خدمة استقبال احترافية خلال ساعات العمل الرسمية من 8 صباحاً حتى 8 مساءً، من الأحد إلى الخميس."
  },
  {
    question: "هل يمكنني استخدام عنوان المكتب كعنوان تجاري؟",
    answer: "نعم، يمكن للأعضاء في الباقات المهنية وباقات الشركات استخدام عنوان المكتب كعنوان تجاري رسمي لشركاتهم."
  },
  {
    question: "كيف يمكنني حجز قاعة اجتماعات؟",
    answer: "يمكنك حجز قاعات الاجتماعات بسهولة من خلال تطبيقنا أو موقعنا الإلكتروني. تتوفر القاعات بالساعة أو باليوم حسب احتياجك."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">الأسئلة الشائعة</h2>
        <p className="text-xl text-gray-600 text-center mb-12">كل ما تحتاج معرفته عن مساحات العمل المشتركة</p>
        
        <div className="max-w-3xl mx-auto glass-card rounded-xl p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}