"use client";

import React from 'react';
import Link from 'next/link';
import { Search, ChevronDown, CheckCircle, GraduationCap, Award, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-[#f8fafc] py-20 px-6 md:px-16 overflow-hidden pt-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0077b6] text-xs font-semibold">
            <CheckCircle size={14} />
            Platform Evolution 2.0
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            Master any skill. <br />
            Design your <span className="text-[#0077b6]">future.</span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 text-lg max-w-lg leading-relaxed">
            From cutting-edge Data Science and Coding to Creative Arts and Leadership. 
            Access expert-led courses designed for deep comprehension and real-world 
            application. Learn, apply, and earn credentials that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/courses">
              <button className="px-8 py-3 bg-[#0077b6] text-white font-semibold rounded-md hover:bg-[#005f91] transition-all shadow-md active:scale-95">
                Explore Courses →
              </button>
            </Link>
            <Link href="/tutors">
              <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-md hover:bg-slate-50 transition-all">
                Meet our Tutors
              </button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 pt-8 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-[#0077b6]" /> Expert Tutors
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-[#0077b6]" /> 500+ Courses
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} className="text-[#0077b6]" /> Learn-to-Earn
            </div>
          </div>
        </div>

        {/* Right Content - The "Find your path" Form */}
        <div className="relative animate-in fade-in slide-in-from-right duration-700">
          <div className="bg-white p-10 rounded-2xl shadow-2xl shadow-blue-900/10 border border-slate-100 max-w-md ml-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Find your path</h3>
            
            <div className="space-y-6">
              {/* Input 1 */}
              <div>
                <label className="block text-sm text-slate-500 mb-2 font-medium">I want to learn...</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="e.g. Data Science, Digital Marketing"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]/20 transition-all"
                  />
                </div>
              </div>

              {/* Input 2 */}
              <div>
                <label className="block text-sm text-slate-500 mb-2 font-medium">My current level is...</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0077b6]/20 transition-all">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>

              <button className="w-full bg-[#0077b6] text-white font-bold py-3 text-center rounded-lg hover:bg-[#005f91] transition-all shadow-lg shadow-blue-100">
                Show Recommendations
              </button>
            </div>
          </div>

          {/* Floating Success Card */}
          <div className="absolute -bottom-6 -left-8 bg-white p-4 rounded-xl shadow-xl border border-slate-50 flex items-center gap-4 animate-bounce-slow hidden md:flex">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">92% Success Rate</p>
              <p className="text-xs text-slate-500">Career advancement</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
