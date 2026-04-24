import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const TrendingCourses: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Curated Learning Paths</h2>
            <p className="text-slate-500 max-w-xl leading-relaxed">
              Explore our meticulously designed tracks across technology, business, and creative disciplines.
            </p>
          </div>
          <button className="flex items-center gap-2 text-[#0077b6] font-bold text-sm hover:underline transition-all">
            View all paths <ArrowRight size={18} />
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Technology - Large Card (Spans 2 columns) */}
          <div className="md:col-span-2 relative group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-between p-8 min-h-[340px]">
            {/* Subtle background graphic overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-right-bottom bg-no-repeat" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[10px] font-bold uppercase tracking-wider mb-6">
                Technology
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#0077b6] transition-colors">
                Data Science & Machine Learning
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Master the algorithms that drive tomorrow's insights. From Python basics to advanced neural networks.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-8">
              <div className="flex -space-x-3">
                {[1, 2].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-slate-200 relative">
                    <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" fill className="object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-[#F1F5F9] flex items-center justify-center text-[10px] font-bold text-slate-500">
                  +5
                </div>
              </div>
              <ArrowRight className="text-[#0077b6] group-hover:translate-x-1 transition-transform" size={24} />
            </div>
          </div>

          {/* 2. Business - Standard Card */}
          <div className="group bg-white rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#F5F3FF] text-[#8B5CF6] text-[10px] font-bold uppercase tracking-wider mb-6">
                Business
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#0077b6] transition-colors">
                Digital Marketing Strategy
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Build campaigns that convert. SEO, content strategy, and performance marketing.
              </p>
            </div>
            <div className="flex justify-end mt-8">
              <ArrowRight className="text-[#0077b6] group-hover:translate-x-1 transition-transform" size={24} />
            </div>
          </div>

          {/* 3. Creative - Standard Card */}
          <div className="group bg-white rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] text-[#3B82F6] text-[10px] font-bold uppercase tracking-wider mb-6">
                Creative
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#0077b6] transition-colors">
                UX/UI & Graphic Design
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Design experiences that resonate. Typography, layout, and user research fundamentals.
              </p>
            </div>
            <div className="flex justify-end mt-8">
              <ArrowRight className="text-[#0077b6] group-hover:translate-x-1 transition-transform" size={24} />
            </div>
          </div>

          {/* 4. Leadership - Large Card (Spans 2 columns) */}
          <div className="md:col-span-2 group bg-white rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-md transition-shadow min-h-[220px]">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold uppercase tracking-wider mb-6">
                Leadership
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#0077b6] transition-colors">
                Executive Leadership & Management
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                Develop soft skills and strategic thinking required to lead teams effectively in modern organizations.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <ArrowRight className="text-[#0077b6] group-hover:translate-x-1 transition-transform" size={24} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;