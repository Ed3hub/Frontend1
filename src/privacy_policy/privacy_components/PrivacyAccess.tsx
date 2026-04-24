import React from 'react';
import { Database, BarChart3, Share2 } from 'lucide-react';

const PrivacyAccess: React.FC = () => {
  const cards = [
    {
      icon: <Database className="text-[#075985]" size={20} />,
      title: "What We Collect",
      description: "We gather essential information to tailor your learning journey. This includes account details, learning progress, interaction metadata, and technical specifications of your access device."
    },
    {
      icon: <BarChart3 className="text-[#075985]" size={20} />,
      title: "How We Use It",
      description: "Your data acts as the architectural blueprint for your personalized curriculum. We use it to refine course recommendations, track certification progress, and ensure platform stability."
    },
    {
      icon: <Share2 className="text-[#075985]" size={20} />,
      title: "Who We Share With",
      description: "We operate on a strict need-to-know basis. Data is shared exclusively with verified educational partners, credentialing bodies, and essential infrastructure providers under strict confidentiality agreements."
    }
  ];

  return (
    <section className="pb-20 px-6 md:px-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white p-10 shadow-sm border border-slate-50 flex flex-col items-start transition-all hover:shadow-md
                       rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-[64px]"
          >
            {/* Icon Container */}
            <div className="w-12 h-12 bg-[#f1f5f9] rounded-xl flex items-center justify-center mb-8">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-slate-500 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrivacyAccess;