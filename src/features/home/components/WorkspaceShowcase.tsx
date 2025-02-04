import React from 'react';
import { Briefcase, Users, Coffee, Video } from 'lucide-react';

const workspaces = [
  {
    title: 'المكاتب الخاصة',
    description: 'مساحات خاصة مجهزة بالكامل لفرق العمل',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: 'مساحات العمل المشتركة',
    description: 'بيئة عمل حيوية للمستقلين ورواد الأعمال',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200',
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'قاعات الاجتماعات',
    description: 'قاعات مجهزة للاجتماعات والعروض التقديمية',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1200',
    icon: <Video className="h-6 w-6" />,
  },
  {
    title: 'مناطق الاستراحة',
    description: 'أماكن مريحة للاسترخاء وتناول القهوة',
    image: 'https://images.unsplash.com/photo-1517502166878-35c93a0072f0?auto=format&fit=crop&q=80&w=1200',
    icon: <Coffee className="h-6 w-6" />,
  },
];

export default function WorkspaceShowcase() {
  return (
    <section id="spaces" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">مساحات العمل</h2>
        <p className="text-xl text-gray-600 text-center mb-12">اكتشف مجموعة متنوعة من المساحات المصممة لتلبية احتياجاتك</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workspaces.map((workspace, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={workspace.image} 
                  alt={workspace.title}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    {workspace.icon}
                    <h3 className="text-2xl font-bold">{workspace.title}</h3>
                  </div>
                  <p className="text-gray-200">{workspace.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}