import React from 'react';
import { BookOpen, Layers, TrendingUp, ArrowRight } from 'lucide-react'; // Assumes lucide-react for icons

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

export default function HowItWorks() {
  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Learn',
      description: 'Structured practical learning',
      icon: BookOpen,
    },
    {
      number: '02',
      title: 'Build',
      description: 'Create projects and demonstrate skills',
      icon: Layers,
    },
    {
      number: '03',
      title: 'Grow',
      description: 'Build proof and unlock opportunities',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="w-full bg-[#1552b1] text-white py-20 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-200/80 block mb-3">
            The Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div key={step.number} className="relative flex flex-col items-start group">
                
                {/* Left vertical divider for steps 2 and 3 on desktop */}
                {index > 0 && (
                  <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />
                )}

                {/* Content Container (Padded slightly to clear the divider) */}
                <div className="md:pl-8 w-full relative">
                  
                  {/* Huge translucent background number */}
                  <div className="text-6xl md:text-7xl font-black text-white/10 select-none mb-4 leading-none font-mono">
                    {step.number}
                  </div>

                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-2xl border border-white/20 bg-white/5 flex items-center justify-center mb-6 backdrop-blur-sm transition-all group-hover:bg-white/10 group-hover:border-white/40">
                    <IconComponent className="text-white/90" size={22} />
                  </div>

                  {/* Text Details */}
                  <h3 className="text-xl font-bold mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-blue-100/70 text-sm max-w-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connected Step Arrow Indicator for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-24 z-10 w-6 h-6 rounded-full border border-white/20 bg-[#1552b1] items-center justify-center text-white/40">
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
