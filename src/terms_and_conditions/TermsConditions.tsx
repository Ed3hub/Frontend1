import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import TermsHero from './terms_components/Terms_Hero';
import TermsContent from './terms_components/TermsContent';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <TermsHero />
        <TermsContent />
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
