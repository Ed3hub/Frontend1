import React from 'react';
import { RefreshCcw, Users, Compass } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <RefreshCcw className="text-[#0077b6]" size={20} />,
      title: "Learn-to-Earn Model",
      description: "Gain verifiable micro-credentials and earn platform rewards as you complete modules and real-world projects, regardless of your discipline."
    },
    {
      icon: <Users className="text-[#0077b6]" size={20} />,
      title: "Expert Tutelage",
      description: "Learn directly from industry professionals—senior developers, marketing directors, and design leads—who bring real-world context to every lesson."
    },
    {
      icon: <Compass className="text-[#0077b6]" size={20} />,
      title: "Structured Progression",
      description: "Our curriculum structure ensures you build foundational knowledge before tackling advanced concepts, preventing skill gaps."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image */}
        <div className="relative">
          <div className="rounded-3xl">
            <img 
              src="/Students_collaborating.png" 
              alt="Students collaborating" 
              className="w-full h-full rounded-3xl object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">
              The Ed3Hub Advantage
            </h2>
            <p className="text-slate-500 leading-relaxed text-lg">
              We bridge the gap between theory and practice across all disciplines. 
              Our platform isn't just about watching videos; it's about building tangible skills.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-5">
                {/* Icon Container */}
                <div className="flex-shrink-0 w-12 h-12 bg-[#E0F2FE] rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                
                {/* Text Content */}
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;