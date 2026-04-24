import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import AboutHero from './about_component/AboutHero';
import AboutFuture from './about_component/AboutFuture';
import CoreCommitments from './about_component/CoreCommitment';
import JoinCommunity from './about_component/JoinCommunity';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <AboutHero />
        <AboutFuture />
        <CoreCommitments />
        <JoinCommunity />
      </main>
      <Footer />
    </div>
  );
};

export default About;
