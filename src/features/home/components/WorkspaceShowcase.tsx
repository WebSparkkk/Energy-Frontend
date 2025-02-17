import React from 'react';
import { Briefcase, Users, Coffee, Video } from 'lucide-react';

const workspaces = [
  {
    title: 'المكاتب الخاصة',
    description: 'مساحات خاصة مجهزة بالكامل لفرق العمل',
    image: "../../../../public/images/images/1.jpg",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: 'مساحات العمل المشتركة',
    description: 'بيئة عمل حيوية للمستقلين ورواد الأعمال',
    image: "../../../../public/images/images/2.jpg",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'قاعات الاجتماعات',
    description: 'قاعات مجهزة للاجتماعات والعروض التقديمية',
    image: "../../../../public/images/images/27.jpg",
    icon: <Video className="h-6 w-6" />,
  },
  {
    title: 'مناطق الاستراحة',
    description: 'أماكن مريحة للاسترخاء وتناول القهوة',
    image: "../../../../public/images/images/55.jpg",
    icon: <Coffee className="h-6 w-6" />,
  },

  {
    title: 'المكاتب الخاصة',
    description: 'مساحات خاصة مجهزة بالكامل لفرق العمل',
    image: "../../../../public/images/images/11.jpg",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: 'مساحات العمل المشتركة',
    description: 'بيئة عمل حيوية للمستقلين ورواد الأعمال',
    image: "../../../../public/images/images/12.jpg",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'قاعات الاجتماعات',
    description: 'قاعات مجهزة للاجتماعات والعروض التقديمية',
    image: "../../../../public/images/images/25.jpg",
    icon: <Video className="h-6 w-6" />,
  },
  {
    title: 'مناطق الاستراحة',
    description: 'أماكن مريحة للاسترخاء وتناول القهوة',
    image: "../../../../public/images/images/50.jpg",
    icon: <Coffee className="h-6 w-6" />,
  },


  {
    title: 'المكاتب الخاصة',
    description: 'مساحات خاصة مجهزة بالكامل لفرق العمل',
    image: "../../../../public/images/images/7.jpg",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: 'مساحات العمل المشتركة',
    description: 'بيئة عمل حيوية للمستقلين ورواد الأعمال',
    image: "../../../../public/images/images/8.jpg",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'قاعات الاجتماعات',
    description: 'قاعات مجهزة للاجتماعات والعروض التقديمية',
    image: "../../../../public/images/images/9.jpg",
    icon: <Video className="h-6 w-6" />,
  },
  {
    title: 'مناطق الاستراحة',
    description: 'أماكن مريحة للاسترخاء وتناول القهوة',
    image: "../../../../public/images/images/10.jpg",
    icon: <Coffee className="h-6 w-6" />,
  },
];

export default function WorkspaceShowcase() {
  return (
    <section id="spaces" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">مساحات العمل</h2>
        <p className="text-xl text-gray-600 text-center mb-12">اكتشف مجموعة متنوعة من المساحات المصممة لتلبية احتياجاتك</p>
        
        <div className="grid grid-cols-4 gap-8">
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
                    <h3 className="text-xl font-sans text-white">{workspace.title}</h3>
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