import React from 'react';
import { Globe, Leaf, Lightbulb, Users } from 'lucide-react';

const CoreCommitments: React.FC = () => {
  const commitments = [
    {
      icon: <Globe className="text-[#075985]" size={22} />,
      title: "Accessibility",
      description: "Breaking down structural barriers to entry. We engineer pathways that allow talent from any origin to access high-caliber knowledge networks."
    },
    {
      icon: <Leaf className="text-[#075985]" size={22} />,
      title: "Sustenance",
      description: "Building long-term intellectual capital. We prioritize deep, enduring understanding over transient trends, ensuring skills remain robust over time."
    },
    {
      icon: <Lightbulb className="text-[#075985]" size={22} />,
      title: "Innovation",
      description: "Continuously refining the pedagogical framework. We implement cutting-edge methodologies to optimize the efficiency and impact of the learning process."
    },
    {
      icon: <Users className="text-[#075985]" size={22} />,
      title: "Community",
      description: "Fostering a dynamic ecosystem of peers and mentors. True mastery is achieved through collaborative construction and shared intellectual pursuit."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-20">
          Our Core Commitments
        </h2>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {commitments.map((item, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* Icon Container */}
              <div className="flex-shrink-0 w-14 h-14 bg-[#F1F5F9] rounded-xl flex items-center justify-center">
                {item.icon}
              </div>
              
              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreCommitments;