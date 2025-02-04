import React from 'react';
import { Building2 } from 'lucide-react';

export default function Navbar() {
  const whatsappLink = "https://wa.me/201069427088";

  return (
    <nav className="fixed w-full z-50 glass-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Building2 className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-700">Energy</span>
          </div>
          <div className="hidden md:flex space-x-8 space-x-reverse">
            <a href="#features" className="text-gray-700 hover:text-primary-600">المميزات</a>
            <a href="#spaces" className="text-gray-700 hover:text-primary-600">المساحات</a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600">الأسعار</a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600">اتصل بنا</a>
          </div>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            احجز الآن
          </a>
        </div>
      </div>
    </nav>
  );
}