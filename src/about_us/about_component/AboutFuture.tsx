import React from 'react';
import { Network, Layers, Infinity } from 'lucide-react';

const AboutFuture: React.FC = () => {
  const pillars = [
    {
      icon: <Network className="text-[#3b82f6]" size={20} />,
      title: "Neural Architecture",
      description: "Our curriculum is designed like a neural network, emphasizing connections between disparate fields to foster true innovation and deep understanding."
    },
    {
      icon: <Layers className="text-[#3b82f6]" size={20} />,
      title: "Layered Synthesis",
      description: "Knowledge is built in transparent layers. We focus on foundational principles that support complex skill application in real-world scenarios."
    },
    {
      icon: <Infinity className="text-[#3b82f6]" size={20} />,
      title: "Dynamic Feedback",
      description: "A continuous loop of assessment and recalibration ensures that learning pathways evolve alongside the learner's growing capabilities."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            The Future of Learning
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Education requires a new structural integrity. We are moving away from passive 
            consumption towards active synthesis, creating environments where skills are not just 
            acquired, but architected into complex capabilities.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-[32px] border border-slate-50 shadow-sm flex flex-col items-start transition-all hover:shadow-md"
            >
              {/* Icon Bubble */}
              <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-8">
                {pillar.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {pillar.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFuture;