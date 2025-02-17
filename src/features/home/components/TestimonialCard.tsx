import { Quote } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export default function TestimonialCard({ name, role, company, content, image }: TestimonialProps) {
  return (
    <div className="glass-card p-6 rounded-xl relative">
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-gray-700 mb-4 mt-2 leading-relaxed">{content}</p>
          <div>
            <h4 className="font-bold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{role} - {company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}