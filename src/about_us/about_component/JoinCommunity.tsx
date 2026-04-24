import React from 'react';

const JoinCommunity: React.FC = () => {
  return (
    <section className="w-full bg-[#f1f5f9] py-20 px-6 md:px-16 text-center border-t border-slate-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        
        {/* Call to Action Text */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
          Ready to level up your learning?
        </h2>

        {/* Action Button */}
        <button className="bg-[#0077b6] hover:bg-[#005f91] text-white px-8 py-3 rounded-md text-sm font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:ring-offset-2 focus:ring-offset-[#f1f5f9]">
          Join the Community
        </button>
        
      </div>
    </section>
  );
};

export default JoinCommunity;