import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from './landingPage/Hero';
import TrendingCourses from './landingPage/TrendingCourses';
import Footer from '@/components/landing/Footer';
import WhyChooseUs from './landingPage/WhyChooseUs';

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
        <TrendingCourses />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;