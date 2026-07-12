import React from 'react';
import { MessageSquare, Users, Globe, Layers } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-start gap-4 p-5 rounded-2xl cursor-pointer bg-white border border-slate-200 hover:shadom-md transition-colors">
      <div className="p-3 bg-[#E8EEFF] rounded-full flex-shrink-0 text-[#1552b1]">
        <Icon size={18} />
      </div>
      <div>
        <h3 className="text-[15px] font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function CommunitySection() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Discussion spaces',
      description: 'Topic-based forums to ask, answer, and connect with peers.',
    },
    {
      icon: Users,
      title: 'Study circles',
      description: 'Small accountability groups for focused learning together.',
    },
    {
      icon: Globe,
      title: 'Peer learning sessions',
      description: 'Live collaborative sessions with learners at your level.',
    },
    {
      icon: Layers,
      title: 'Project sharing',
      description: 'Share your builds, get feedback, and inspire others.',
    },
  ];

  // Specific custom color palette from the reference grid in image_ea4986.png
  const colors = {
    slateBlue: '#7fa0d4',
    lightGray: '#e5e9f0',
    midBlue: '#4b7bc7',
    deepBlue: '#1e5eb8',
    green: '#2ea376',
    gold: '#e29f52',
    purple: '#8e52e2',
    pink: '#e25297',
    orange: '#dd8012',
  };

  // 5x5 grid sequence matching the pattern in the reference image
  const gridAvatarColors = [
    [colors.slateBlue, colors.lightGray, colors.midBlue, colors.green, colors.lightGray],
    [colors.slateBlue, colors.gold, colors.lightGray, colors.purple, colors.deepBlue],
    [colors.lightGray, colors.midBlue, colors.pink, colors.lightGray, colors.orange],
    [colors.slateBlue, colors.lightGray, colors.midBlue, colors.green, colors.lightGray],
    [colors.lightGray, colors.midBlue, colors.lightGray, colors.midBlue, colors.purple],
  ];

  return (
    <section className="w-full bg-[#F5F7FB] py-24 px-6 md:px-12 lg:px-24 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Context & Feature Grid */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1d4ed8] block mb-3">
            Community
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
            Learn with people moving<br />in the same direction
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-xl mb-10">
            Accountability, collaboration, and shared momentum — with learners who are working toward the same outcomes as you.
          </p>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Visual Graphic Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-[420px] bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden flex flex-col">
            
            {/* Top Light-Blue Grid Canvas */}
            <div className="bg-[#f0f4f9] p-8 flex items-center justify-center">
              <div className="grid grid-cols-5 gap-3">
                {gridAvatarColors.map((row, rIdx) => 
                  row.map((bgColor, cIdx) => (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      style={{ backgroundColor: bgColor }}
                      className="w-12 h-12 rounded-full shadow-inner transition-transform hover:scale-110 duration-200"
                    />
                  ))
                )}
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="p-6 bg-white border-t border-slate-100">
              <p className="text-[13px] font-bold text-slate-900 mb-3">
                Learners across all paths
              </p>
              
              <div className="flex items-center gap-3">
                {/* Overlapping Circles */}
                <div className="flex -space-x-2">
                  <div style={{ backgroundColor: colors.deepBlue }} className="w-6 h-6 rounded-full border-2 border-white" />
                  <div style={{ backgroundColor: colors.purple }} className="w-6 h-6 rounded-full border-2 border-white" />
                  <div style={{ backgroundColor: colors.green }} className="w-6 h-6 rounded-full border-2 border-white" />
                  <div style={{ backgroundColor: colors.pink }} className="w-6 h-6 rounded-full border-2 border-white" />
                </div>
                <span className="text-[11px] font-medium text-slate-500">
                  Collaborating together
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
