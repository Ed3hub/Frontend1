"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { Video, UserPlus, UploadCloud, Rocket, Users } from "lucide-react"; // Assumes lucide-react for clean icons

interface StepItem {
  id: number;
  label: string;
  graphicTitle: string;
  graphicDesc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

export default function EducatorSection() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: StepItem[] = [
    {
      id: 1,
      label: "Create profile",
      graphicTitle: "Your course, your audience",
      graphicDesc:
        "Build a structured curriculum that learners can follow at their own pace.",
      icon: UserPlus,
    },
    {
      id: 2,
      label: "Upload course",
      graphicTitle: "Your course, your audience",
      graphicDesc:
        "Build a structured curriculum that learners can follow at their own pace.",
      icon: Video, // Matches the video camera icon shown in your screenshot
    },
    {
      id: 3,
      label: "Publish course",
      graphicTitle: "Launch to the marketplace",
      graphicDesc:
        "Set your pricing or offer free content. Seamlessly push your lessons live to thousands of curious minds.",
      icon: Rocket,
    },
    {
      id: 4,
      label: "Reach learners",
      graphicTitle: "Scale your global impact",
      graphicDesc:
        "Interact with students through discussions, review progress tracks, and grow a sustainable teaching community.",
      icon: Users,
    },
  ];

  // Get current active step data for the card presentation
  const activeData = steps.find((s) => s.id === activeStep) || steps[1];
  const ActiveIcon = activeData.icon;

  return (
    <section className="w-full bg-[#FAFCFF] py-20 px-6 md:px-12 lg:px-24 font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1552b1] mb-4">
            For Educators
          </span>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900 leading-[1.15] mb-6">
            Share what you know.
            <br />
            Build an audience.
            <br />
            Earn from your expertise.
          </h2>

          <p className="text-base md:text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
            Publish courses, reach learners, and grow your teaching impact.
          </p>

          {/* Interactive Steps List */}
          <div className="flex flex-col gap-4 w-full max-w-md mb-10">
            {steps.map((step) => {
              const isCurrent = step.id === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  onMouseEnter={() => setActiveStep(step.id)}
                  className={`flex items-center gap-4 text-left p-2 -ml-2 rounded-xl transition-all duration-200 outline-none group ${
                    isCurrent ? "bg-slate-100/60" : "hover:bg-slate-50"
                  }`}
                >
                  {/* Number Circle Badge */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 ${
                      isCurrent
                        ? "bg-[#1552b1] text-white"
                        : "bg-[#2563EB]/10 text-[#1552b1] group-hover:bg-[#1552b1]/20"
                    }`}
                  >
                    {step.id}
                  </div>

                  {/* Label Text */}
                  <span
                    className={`text-base font-semibold transition-colors ${
                      isCurrent ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action CTA Button */}
          <Link href="/sign-up" className="inline-block px-6 py-4 rounded-xl font-bold text-sm bg-[#1552b1] text-white hover:bg-[#114292] active:scale-[0.98] transition-all shadow-md shadow-blue-600/10">
            Become an Educator
          </Link>
        </div>

        {/* Right Graphic Preview Container */}
        <div className="lg:col-span-6 w-full h-full min-h-[420px] bg-[#EEF4FC] border border-blue-100/50 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle Radar/Concentric Rings Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div className="w-[280px] h-[280px] rounded-full border border-blue-300/20 flex items-center justify-center animate-[pulse_6s_infinite]">
              <div className="w-[200px] h-[200px] rounded-full border border-blue-300/30" />
            </div>
          </div>

          {/* Dynamic Card Content Container */}
          <div className="relative z-10 text-center max-w-sm flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
            {/* Soft-Shadow Floating Icon Block */}
            <div className="w-16 h-16 bg-[#1552b1] rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-700/20 transition-transform duration-300 transform hover:scale-105">
              <ActiveIcon size={26} strokeWidth={2} />
            </div>

            {/* Graphic Title */}
            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight transition-all">
              {activeData.graphicTitle}
            </h3>

            {/* Graphic Description Paragraph */}
            <p className="text-sm text-slate-500 leading-relaxed min-h-[48px]">
              {activeData.graphicDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
