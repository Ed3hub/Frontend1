"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, BookOpen, Award, Coins } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

interface Stats {
  courses_enrolled: number;
  certificates_earned: number;
  total_tokens: number;
}

const Hero: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (user) {
      api.get("/courses/my/stats/")
        .then((res) => setStats(res.data))
        .catch(() => {});
    } else {
      setStats(null);
    }
  }, [user]);

  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 bg-[#E2EEFF] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 rounded-l-[100px] -z-10 hidden lg:block" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1de065] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1de065]"></span>
              </span>
              Join 50,000+ Active Learners
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-8">
              Learn Skills for the{" "}
              <span className="text-[#4E94F8]">Digital Future</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Master in-demand skills with expert-led courses. From coding to
              design, business to marketing - your journey to success starts here.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
              <Link href="/courses">
                <button className="px-10 py-5 bg-gradient-to-r from-[#3C83F6] from-20% to-[#5EA3FA] to-80% text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-lg shadow-blue-300 flex items-center justify-center gap-2 group">
                  Explore Courses{" "}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold text-lg hover:bg-slate-50 transition-all hover:shadow-lg shadow-gray-300 flex items-center justify-center gap-2">
                Watch Demo
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" fillRule="evenodd" d="m9.524 4.938l10.092 6.21a1 1 0 0 1 0 1.704l-10.092 6.21A1 1 0 0 1 8 18.21V5.79a1 1 0 0 1 1.524-.852" />
                </svg>
              </button>
            </div>

            {user && stats ? (
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <BookOpen size={20} className="text-[#4E94F8]" />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-slate-900 leading-none">{stats.courses_enrolled}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Courses Enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm">
                  <div className="p-2 bg-green-50 rounded-xl">
                    <Award size={20} className="text-green-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-slate-900 leading-none">{stats.certificates_earned}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Certificates Earned</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm">
                  <div className="p-2 bg-yellow-50 rounded-xl">
                    <Coins size={20} className="text-yellow-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-slate-900 leading-none">{stats.total_tokens}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Tokens Earned</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="user" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-[#FACC15] mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-900 leading-none">
                    4.8/5.0{" "}
                    <span className="text-slate-500 font-medium ml-1">from 12k+ reviews</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 bg-[#DBEBFE] shadow-lg px-8 !h-full">
            <div className="relative">
              <Image
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7c39301b23-77d83098ceaceff09151.png"
                alt="Students learning"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-md lg:rounded-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
