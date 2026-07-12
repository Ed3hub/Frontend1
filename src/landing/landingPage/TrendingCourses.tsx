import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const TrendingCourses: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Curated Learning Paths
            </h2>
            <p className="text-slate-500 max-w-xl leading-relaxed">
              Explore structured tracks across technology, business, and
              creative disciplines.{" "}
            </p>
          </div>
          <button className="flex items-center gap-2 text-[#0077b6] font-bold text-sm hover:underline transition-all">
            View all paths <ArrowRight size={18} />
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Technology - Large Card (Spans 2 columns) */}
          <div className="relative group bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col justify-between p-8">
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
                From Python basics to advanced neural networks. Build models,
                not just theory.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-slate-200 relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 12}`}
                      alt="Student"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-[#F1F5F9] flex items-center justify-center text-[10px] font-bold text-slate-500">
                  +5
                </div>
              </div>
              <div className="text-slate-700 bg-slate-100 p-3 rounded-full transition-colors group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center">
                <ArrowRight size={18} />
              </div>
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
                Build campaigns that convert. SEO, content strategy, and
                performance marketing.
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-slate-200 relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 12}`}
                      alt="Student"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-[#F1F5F9] flex items-center justify-center text-[10px] font-bold text-slate-500">
                  +3
                </div>
              </div>
              <div className="text-slate-700 bg-slate-100 p-3 rounded-full transition-colors group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>

          {/* 3. Creative - Standard Card */}
          <div className="group bg-white rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] text-[#3B82F6] text-[10px] font-bold uppercase tracking-wider mb-6">
                Creative
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#0077b6] transition-colors">
                UI/UX Design Fundamentals
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                From wireframes to polished interfaces. Design systems, Figma,
                and user research.
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-slate-200 relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 12}`}
                      alt="Student"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-[#F1F5F9] flex items-center justify-center text-[10px] font-bold text-slate-500">
                  +4
                </div>
              </div>
              <div className="text-slate-700 bg-slate-100 p-3 rounded-full transition-colors group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>

          {/* 4. Leadership - Large Card (Spans 2 columns) */}
          <div className="group bg-white rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:shadow-md transition-shadow min-h-[220px]">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold uppercase tracking-wider mb-6">
                Leadership
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#0077b6] transition-colors">
                Strategic Management
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                Decision-making, team management, and communication for
                real-world leadership.
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-slate-200 relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i + 12}`}
                      alt="Student"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-[#F1F5F9] flex items-center justify-center text-[10px] font-bold text-slate-500">
                  +2
                </div>
              </div>
              <div className="text-slate-700 bg-slate-100 p-3 rounded-full transition-colors group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;
