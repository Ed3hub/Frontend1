import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="w-full bg-[#1552b1] text-white py-24 px-6 md:px-12 lg:px-24 font-sans flex flex-col items-center justify-center text-center selection:bg-blue-800 selection:text-blue-100">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          Ready to start building?
        </h2>
        
        {/* Subtitle Description */}
        <p className="text-base md:text-lg text-blue-100/80 mb-10 max-w-md font-medium">
          Choose your path and begin today.
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          
          {/* Primary CTA Button: Start Learning */}
          <Link href="/sign-up" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#1552b1] hover:bg-blue-50 active:scale-[0.98] transition-all px-8 py-4 rounded-2xl font-bold text-base shadow-lg shadow-blue-950/20">
            <span>Start Learning</span>
            <ArrowRight 
              size={18} 
              strokeWidth={2.5} 
              className="transition-transform duration-200 group-hover:translate-x-1" 
            />
          </Link>

          {/* Secondary CTA Button: Become an Educator */}
          <Link href="/sign-up" className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-white/30 hover:border-white/60 hover:bg-white/5 active:scale-[0.98] transition-all text-white px-8 py-3.5 rounded-2xl font-bold text-base">
            Become an Educator
          </Link>

        </div>

      </div>
    </section>
  );
}
