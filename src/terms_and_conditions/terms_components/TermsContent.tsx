'use client';
import React from 'react';
import { FileText, UserCircle, Shield, AlertTriangle, RotateCcw, CreditCard } from 'lucide-react';

const TermsContent: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState<string>('introduction');

  const sections = [
    { id: 'introduction', title: '1. Introduction', icon: <FileText size={18} /> },
    { id: 'user-accounts', title: '2. User Accounts', icon: <UserCircle size={18} /> },
    { id: 'intellectual-property', title: '3. Intellectual Property', icon: <Shield size={18} /> },
    { id: 'limitation-of-liability', title: '4. Limitation of Liability', icon: <AlertTriangle size={18} /> },
    { id: 'changes-to-terms', title: '5. Changes to Terms', icon: <RotateCcw size={18} /> },
    { id: 'refund-policy', title: '6. Refund Policy', icon: <CreditCard size={18} /> },
  ];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -80% 0px', // Detect when section is near the top
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#f8fafc] py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Navigation */}
        <aside className="lg:w-1/4">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Contents</h3>
            <nav className="flex flex-col space-y-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`text-sm transition-all duration-200 font-medium flex items-center gap-3 ${
                    activeSection === section.id 
                      ? "text-[#0077b6] translate-x-1" 
                      : "text-slate-500 hover:text-[#0077b6]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeSection === section.id ? "bg-[#0077b6] scale-125" : "bg-transparent"
                  }`} />
                  {section.title.split('. ')[1]}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:w-3/4 space-y-8">
          
          {/* 1. Introduction */}
          <div id="introduction" className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="bg-blue-50 p-2 rounded-lg text-[#0077b6]">{sections[0].icon}</div>
               <h2 className="text-xl font-bold text-slate-900">1. Introduction</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Welcome to Ed3Hub. By accessing and using our platform, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Ed3Hub's relationship with you in relation to this website.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              The term 'Ed3Hub' or 'us' or 'we' refers to the owner of the website. The term 'you' refers to the user or viewer of our website. If you disagree with any part of these terms and conditions, please do not use our website.
            </p>
          </div>

          {/* 2. User Accounts */}
          <div id="user-accounts" className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="bg-blue-50 p-2 rounded-lg text-[#0077b6]">{sections[1].icon}</div>
               <h2 className="text-xl font-bold text-slate-900">2. User Accounts</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </div>

          {/* 3. Intellectual Property */}
          <div id="intellectual-property" className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="bg-blue-50 p-2 rounded-lg text-[#0077b6]">{sections[2].icon}</div>
               <h2 className="text-xl font-bold text-slate-900">3. Intellectual Property</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Ed3Hub and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Ed3Hub. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website.
            </p>
          </div>

          {/* 4. Limitation of Liability */}
          <div id="limitation-of-liability" className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="bg-blue-50 p-2 rounded-lg text-[#0077b6]">{sections[3].icon}</div>
               <h2 className="text-xl font-bold text-slate-900">4. Limitation of Liability</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              In no event shall Ed3Hub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-5 text-slate-500 text-sm space-y-2 mb-4">
              <li>Your access to or use of or inability to access or use the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; and</li>
              <li>Unauthorized access, use or alteration of your transmissions or content.</li>
            </ul>
          </div>

          {/* 5. Changes to Terms */}
          <div id="changes-to-terms" className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
               <div className="bg-blue-50 p-2 rounded-lg text-[#0077b6]">{sections[4].icon}</div>
               <h2 className="text-xl font-bold text-slate-900">5. Changes to Terms</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>
          </div>

          {/* 6. Refund Policy */}
          <div id="refund-policy" className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
               <div className="bg-blue-50 p-2 rounded-lg text-[#0077b6]">
                 <CreditCard size={18} />
               </div>
               <h2 className="text-xl font-bold text-slate-900">6. Refund Policy</h2>
            </div>

            <div className="space-y-8">
              {/* 6.1 */}
              <div>
                <h3 className="text-md font-bold text-slate-800 mb-2">6.1 General Policy</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Ed3hub strives to ensure user satisfaction with all purchases made on the platform. However, due to the nature of digital content, all refund requests are subject to the conditions outlined below.
                </p>
              </div>

              {/* 6.2 */}
              <div>
                <h3 className="text-md font-bold text-slate-800 mb-3">6.2 Eligibility for Refunds</h3>
                <p className="text-slate-500 text-sm mb-3">Refunds may be granted under the following conditions:</p>
                <ul className="list-disc pl-5 text-slate-500 text-sm space-y-2">
                  <li>The request is made within 7 days of purchase</li>
                  <li>The course has not been substantially consumed (e.g., not more than 20–30% completed)</li>
                  <li>There is a technical issue preventing access that cannot be resolved within a reasonable time</li>
                  <li>The content is materially different from its description</li>
                </ul>
              </div>

              {/* 6.3 */}
              <div>
                <h3 className="text-md font-bold text-slate-800 mb-3">6.3 Non-Refundable Cases</h3>
                <p className="text-slate-500 text-sm mb-3">Refunds will not be provided where:</p>
                <ul className="list-disc pl-5 text-slate-500 text-sm space-y-2">
                  <li>A significant portion of the course has already been completed</li>
                  <li>The user has earned rewards or benefits tied to course completion</li>
                  <li>The purchase was made during a non-refundable promotional offer (clearly stated at purchase)</li>
                  <li>The request is based on personal preference (e.g., “I no longer like the course”)</li>
                </ul>
              </div>

              {/* 6.4 */}
              <div>
                <h3 className="text-md font-bold text-slate-800 mb-2">6.4 Creator Earnings Adjustment</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">In the event of a refund:</p>
                <ul className="list-disc pl-5 text-slate-500 text-sm space-y-2">
                  <li>Any revenue previously allocated to the course creator may be reversed or adjusted</li>
                  <li>Ed3hub reserves the right to deduct refunded amounts from future creator payouts</li>
                </ul>
              </div>

              {/* 6.5 */}
              <div>
                <h3 className="text-md font-bold text-slate-800 mb-2">6.5 Processing of Refunds</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Approved refunds will be processed within 5–10 business days. Refunds will be issued via the original payment method, unless otherwise agreed.
                </p>
              </div>

              {/* 6.6 */}
              <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
                <h3 className="text-md font-bold text-red-800 mb-2">6.6 Abuse of Refund Policy</h3>
                <p className="text-red-700/80 text-sm mb-3 font-medium">Ed3hub reserves the right to:</p>
                <ul className="list-disc pl-5 text-red-700/70 text-sm space-y-2">
                  <li>Deny refund requests in cases of suspected abuse</li>
                  <li>Suspend or terminate accounts that repeatedly request refunds without valid reason</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsContent;