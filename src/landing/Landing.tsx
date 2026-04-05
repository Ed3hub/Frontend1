import React from 'react';
import Navbar from './landingPage/Navbar';
import Hero from './landingPage/Hero';
import Metrics from './landingPage/Metrics';
import WhyChooseUs from './landingPage/WhyChooseUs';
import TrendingCourses from './landingPage/TrendingCourses';
import Instructors from './landingPage/Instructors';
import Testimonials from './landingPage/Testimonials';
import PricingPlan from './landingPage/PricingPlan';
import ReadyToLearn from './landingPage/ReadyToLearn';
import Footer from './landingPage/Footer';

/** * MAIN LANDING PAGE CONTAINER 
 */
const Landing: React.FC = () => {
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
};

export default Landing;