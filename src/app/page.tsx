import React from 'react';
import {
  Navbar,
  Hero,
  Metrics,
  WhyChooseUs,
  TrendingCourses,
  Instructors,
  Testimonials,
  PricingPlan,
  ReadyToLearn,
  Footer,
} from '@/components/landing';

/** * MAIN LANDING PAGE CONTAINER 
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-700">
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <WhyChooseUs />
        <TrendingCourses />
        <Instructors />
        <Testimonials />
        <PricingPlan />
        <ReadyToLearn />
      </main>
      <Footer />
    </div>
  );
}
