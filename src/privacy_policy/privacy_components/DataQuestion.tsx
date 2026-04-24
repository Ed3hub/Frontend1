import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const DataQuestion: React.FC = () => {
  return (
    <section className="w-full bg-[#f8fafc] pb-20 px-6 md:px-16 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-10">
        
        {/* Large icon with specific blue background */}
        <div className="w-20 h-20 bg-white shadow-xl shadow-sky-900/5 rounded-[32px] flex items-center justify-center p-5">
            <MessageCircle className="text-[#0ea5e9] w-full h-full" strokeWidth={1.5} />
        </div>

        {/* Call to Action Text */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          Questions about your data?
        </h2>

        {/* Subtitle */}
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-xl">
            Our Data Privacy Officer is ready to assist. Contact us regarding your 
            information rights or any policy clarifications.
        </p>

        {/* Action Button - Icon on left */}
        <button className="flex items-center gap-3 bg-[#0077b6] hover:bg-[#005f91] text-white px-8 py-3 rounded-md text-sm font-semibold transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:ring-offset-2 focus:ring-offset-[#f8fafc]">
          <Mail size={18} />
          Contact privacy team
        </button>
        
      </div>
    </section>
  );
};

export default DataQuestion;