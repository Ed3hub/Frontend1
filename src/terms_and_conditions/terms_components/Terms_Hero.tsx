import React from 'react';

const TermsHero: React.FC = () => {
  return (
    <section className="w-full bg-[#f8fafc] pb-20 pt-30 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#075985]">
            Legal Documentation
          </span>
          
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 leading-[0.9] tracking-tight">
            Terms & <br />
            <span className="text-[#2c7da0]">Conditions</span>
          </h1>

          <p className="text-slate-500 text-lg max-w-md leading-relaxed pt-4">
            Please read these terms and conditions carefully before using the 
            Ed3Hub platform. They govern your relationship with us and outline 
            the rules for using our services.
          </p>
        </div>

        {/* Right Side: Date Cards */}
        <div className="flex flex-col gap-4 lg:items-end">
          <div className="w-full max-w-sm bg-[#f1f5f9] p-8 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Effective Date
            </span>
            <p className="text-xl font-bold text-slate-800">
              October 26, 2023
            </p>
          </div>

          <div className="w-full max-w-sm bg-[#f1f5f9] p-8 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Last Updated
            </span>
            <p className="text-xl font-bold text-slate-800">
              October 26, 2023
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TermsHero;