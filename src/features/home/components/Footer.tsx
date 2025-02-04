import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="block text-gray-600 hover:text-primary-600 mb-2">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* الشعار والوصف */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-primary-700">Energy</span>
            </div>
            <p className="text-gray-600 mb-4">
              مساحات عمل عصرية تجمع بين الراحة والإنتاجية لتحقيق أقصى إمكاناتك
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <FooterSection title="روابط سريعة">
            <FooterLink href="#features">المميزات</FooterLink>
            <FooterLink href="#spaces">المساحات</FooterLink>
            <FooterLink href="#pricing">الأسعار</FooterLink>
            <FooterLink href="#faq">الأسئلة الشائعة</FooterLink>
            <Link to="/employer/signin" className="block text-gray-600 hover:text-primary-600 mb-2">
              بوابة أصحاب العمل
            </Link>
          </FooterSection>

          {/* الخدمات */}
          <FooterSection title="خدماتنا">
            <FooterLink href="#">المكاتب الخاصة</FooterLink>
            <FooterLink href="#">المساحات المشتركة</FooterLink>
            <FooterLink href="#">قاعات الاجتماعات</FooterLink>
            <FooterLink href="#">الفعاليات</FooterLink>
          </FooterSection>

          {/* معلومات الاتصال */}
          <FooterSection title="تواصل معنا">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5 text-primary-600" />
<span>
  دمياط الجديده المنطقه المركزيه 
</span>              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5 text-primary-600" />
                <span>+20 1069427088</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5 text-primary-600" />
                <span>MohamedHeggy@gmail.com</span>
              </div>
            </div>
          </FooterSection>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Energy. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}