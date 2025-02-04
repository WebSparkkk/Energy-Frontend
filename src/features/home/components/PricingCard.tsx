import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
}

export default function PricingCard({ name, price, period, description, features, isPopular }: PricingProps) {
  return (
    <div className={`glass-card p-8 rounded-xl relative ${isPopular ? 'border-primary-500 border-2' : ''}`}>
      {isPopular && (
        <span className="absolute -top-4 right-1/2 transform translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm">
          الأكثر شعبية
        </span>
      )}
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-primary-600">{price}</span>
        <span className="text-gray-500">/{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className={`h-5 w-5 ${feature.included ? 'text-primary-500' : 'text-gray-300'}`} />
            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>{feature.text}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-bold transition-colors ${
        isPopular 
          ? 'bg-primary-600 text-white hover:bg-primary-700' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}>
        اختر الباقة
      </button>
    </div>
  );
}