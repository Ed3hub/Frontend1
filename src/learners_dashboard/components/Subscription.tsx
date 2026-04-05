import React, { useState } from 'react';
import { CheckCircle2, XCircle, ShieldCheck, RefreshCcw, Headset, ArrowRight } from 'lucide-react';

type Plan = 'monthly' | 'annual';

interface SubscriptionPageProps {
  setActivePage: (page: string) => void;
}

const SubscriptionPage = ({ setActivePage }: SubscriptionPageProps) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('annual');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header Navigation */}
      <nav className="p-6">
        <button
          onClick={() => setActivePage('courseDetails')}
          className="flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <span className="mr-2">←</span> Back to course details
        </button>
      </nav>

      {/* Main Hero Section */}
      <header className="text-center max-w-3xl mx-auto px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Choose Your Path to Web3 Mastery
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Join thousands of students learning the future of the internet. Get unlimited 
          access to all courses, community events, and certification.
        </p>
      </header>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

        {/* Monthly Plan */}
        <div
          onClick={() => setSelectedPlan('monthly')}
          className={`relative bg-white rounded-3xl p-8 flex flex-col cursor-pointer transition-all duration-200 ${
            selectedPlan === 'monthly'
              ? 'border-2 border-blue-500 shadow-xl ring-2 ring-blue-100'
              : 'border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300'
          }`}
        >
          {selectedPlan === 'monthly' && (
            <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={14} className="text-white" />
            </div>
          )}

          <h3 className="font-bold text-xl mb-1">Monthly</h3>
          <p className="text-slate-400 text-sm mb-6">Perfect for short-term learning goals.</p>

          <div className="flex items-baseline mb-8">
            <span className="text-4xl font-bold">$29</span>
            <span className="text-slate-400 ml-1">/per month</span>
          </div>

          <ul className="space-y-4 mb-10 flex-grow">
            <FeatureItem text="Unlimited access to all courses" active />
            <FeatureItem text="Exclusive Discord community" active />
            <FeatureItem text="Shareable course certificates" active />
            <FeatureItem text="1-on-1 Mentorship sessions" active={false} />
          </ul>

          <button
            onClick={(e) => { e.stopPropagation(); setActivePage('payment'); }}
            className={`w-full py-4 font-bold rounded-xl transition-colors ${
              selectedPlan === 'monthly'
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Select Monthly Plan
          </button>
        </div>

        {/* Annual Plan (Featured) */}
        <div
          onClick={() => setSelectedPlan('annual')}
          className={`relative bg-white rounded-3xl p-8 flex flex-col cursor-pointer transition-all duration-200 ${
            selectedPlan === 'annual'
              ? 'border-2 border-blue-500 shadow-xl ring-2 ring-blue-100'
              : 'border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-300'
          }`}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
            Best Value
          </div>

          {selectedPlan === 'annual' && (
            <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={14} className="text-white" />
            </div>
          )}

          <h3 className="font-bold text-xl mb-1">Annual</h3>
          <p className="text-slate-400 text-sm mb-6">The ultimate commitment to your Web3 career.</p>

          <div className="flex flex-col mb-8">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">$249</span>
              <span className="text-slate-400 ml-1">/per year</span>
            </div>
            <p className="text-blue-500 text-xs font-semibold mt-1">Save $99 compared to monthly</p>
          </div>

          <ul className="space-y-4 mb-10 flex-grow">
            <FeatureItem text="Everything in Monthly" active />
            <FeatureItem text="Monthly 1-on-1 Mentorship" active />
            <FeatureItem text="Early access to new modules" active />
            <FeatureItem text="Job board & recruiter network" active />
          </ul>

          <button
            onClick={(e) => { e.stopPropagation(); setActivePage('payment'); }}
            className={`w-full py-4 font-bold rounded-xl transition-colors ${
              selectedPlan === 'annual'
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Select Annual Plan
          </button>
        </div>
      </div>

      {/* Individual Course Option */}
      <div className="max-w-2xl mx-auto px-6 mb-24">
        <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-sm">
          <h4 className="font-bold text-lg mb-2">Just want this course?</h4>
          <p className="text-slate-500 text-sm mb-4">
            You can also purchase individual courses for lifetime access without a subscription.
          </p>
          <button
            onClick={() => setActivePage('recommendedCourses')}
            className="text-blue-500 font-bold text-sm flex items-center justify-center mx-auto hover:underline gap-1"
          >
            Browse individual course prices <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-16">
        <TrustBadge 
          icon={<ShieldCheck className="text-blue-500" />} 
          title="Secure Payments" 
          desc="Industry standard encryption for all transactions." 
        />
        <TrustBadge 
          icon={<RefreshCcw className="text-blue-500" />} 
          title="Cancel Anytime" 
          desc="No long-term contracts. Pause or cancel with one click." 
        />
        <TrustBadge 
          icon={<Headset className="text-blue-500" />} 
          title="24/7 Support" 
          desc="Our team is here to help you with your learning journey." 
        />
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center text-slate-400 text-xs">
        © 2024 Ed3Hub. Building the future of Web3 education.
      </footer>
    </div>
  );
};

// --- Sub-components ---

const FeatureItem = ({ text, active }: { text: string; active: boolean }) => (
  <li className={`flex items-center gap-3 text-sm ${active ? 'text-slate-700' : 'text-slate-300'}`}>
    {active ? (
      <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
    ) : (
      <XCircle size={18} className="text-slate-200 shrink-0" />
    )}
    {text}
  </li>
);

const TrustBadge = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="text-left">
      <h5 className="font-bold text-sm mb-1">{title}</h5>
      <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default SubscriptionPage;