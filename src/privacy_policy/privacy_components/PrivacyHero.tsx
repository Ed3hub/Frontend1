import React from 'react';
import { Clock } from 'lucide-react';

const PrivacyHero: React.FC = () => {
  return (
    <section className="w-full bg-[#f8fafc] py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Main Heading with Split Color */}
        <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
          <span className="text-[#0077b6]">Privacy</span> <span className="text-slate-900">Policy</span>
        </h1>

        {/* Subtitle Text */}
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
          At Ed3Hub, transparency is our foundation. We believe your data should be 
          handled with the same precision and care as the educational content we deliver.
        </p>

        {/* Badge Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Last Updated Badge */}
          <div className="bg-[#e2e8f0] text-slate-600 px-5 py-2 rounded-full text-sm font-medium">
            Last Updated: October 2026
          </div>

          {/* Reading Time Badge */}
          <div className="bg-[#e2e8f0] text-slate-600 px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Clock size={14} />
            5 min read
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrivacyHero;