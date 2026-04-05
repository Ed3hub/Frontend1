"use client";

import React from "react";
import Counter from "./Counter";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

/** * SECTION 3: METRICS SECTION
 */
const Metrics: React.FC = () => {
  const stats: StatItem[] = [
    {
      label: "Active Students",
      value: 50,
      suffix: "K+",
    },
    {
      label: "Expert Instructors",
      value: 500,
      suffix: "+",
    },
    {
      label: "Online Courses",
      value: 1200,
      suffix: "+",
    },
    {
      label: "Success Rate",
      value: 95,
      suffix: "%",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <h1 className="!text-5xl font-bold text-[#468DF8] mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </h1>
              <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
