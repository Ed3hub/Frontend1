'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react'; // Assumes lucide-react, change to your icon library if needed

type PathOption = 'Learn a skill' | 'Build a portfolio' | 'Advance my career' | 'Teach others';

export default function OnboardingPath() {
  const [selectedPath, setSelectedPath] = useState<PathOption>('Teach others');

  const options: PathOption[] = [
    'Learn a skill',
    'Build a portfolio',
    'Advance my career',
    'Teach others'
  ];

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-white px-4 py-16 font-sans">
      {/* Header Section */}
      <div className="text-center max-w-xl mb-10">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
          What brings you here?
        </h2>
        <p className="text-base text-slate-500">
          Pick your focus and we'll help you find the right path.
        </p>
      </div>

      {/* Button Grid / Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-4xl">
        {options.map((option) => {
          const isSelected = selectedPath === option;
          return (
            <button
              key={option}
              onClick={() => setSelectedPath(option)}
              className={`
                px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 border
                ${isSelected 
                  ? 'bg-[#1552b1] text-white border-transparent shadow-sm' 
                  : 'bg-[#F4F6FA] text-slate-600 border-transparent hover:bg-slate-200/70'
                }
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Dynamic Status / Action Box */}
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4F6FA] border border-slate-100 rounded-2xl text-sm text-slate-600">
        <span>Selected path:</span>
        <span className="font-bold text-slate-900">{selectedPath}</span>
        {/* Safe wrapper structure for the arrow so colors render reliably */}
        <span className="text-[#1552b1] ml-1 flex items-center justify-center">
          <ArrowRight size={16} strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
