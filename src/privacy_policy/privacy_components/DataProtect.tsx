import React from 'react';
import { ShieldCheck, Cookie, CheckCircle2, ArrowRight } from 'lucide-react';

const DataProtect: React.FC = () => {
  return (
    <section className="pb-20 px-6 md:px-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. How We Protect Data - Large Card */}
        <div className="lg:col-span-2 bg-white p-10 shadow-sm border border-slate-50 flex flex-col md:flex-row gap-8 
                        rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-[80px]">
          
          {/* Icon Column */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-[#f1f5f9] rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-[#075985]" size={24} />
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">How We Protect Data</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our security architecture employs enterprise-grade encryption for data both in 
              transit and at rest. We utilize distributed ledgers for credential verification, 
              ensuring immutable and tamper-proof academic records. Regular independent 
              audits validate our defenses against emerging threats.
            </p>
            
            {/* Feature List */}
            <ul className="space-y-3">
              {['End-to-End Encryption', 'Zero-Knowledge Proofs for Identity', 'Continuous Security Monitoring'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <CheckCircle2 className="text-[#0077b6]" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Cookie Policy - Smaller Card */}
        <div className="bg-white p-10 shadow-sm border border-slate-50 flex flex-col justify-between
                        rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-[80px]">
          <div>
            <div className="w-14 h-14 bg-[#f1f5f9] rounded-xl flex items-center justify-center mb-8">
              <Cookie className="text-[#075985]" size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-6">Cookie Policy</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              We use minimal, functional cookies to maintain session states and user 
              preferences. You retain full granular control over non-essential analytical 
              trackers via your account dashboard.
            </p>
          </div>

          <button className="flex items-center gap-2 text-[#0077b6] text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all">
            Manage Preferences <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default DataProtect;