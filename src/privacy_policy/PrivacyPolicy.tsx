import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import PrivacyHero from './privacy_components/PrivacyHero';
import PrivacyAccess from './privacy_components/PrivacyAccess';
import DataProtect from './privacy_components/DataProtect';
import DataQuestion from './privacy_components/DataQuestion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <PrivacyHero />
        <PrivacyAccess />
        <DataProtect />
        <DataQuestion />
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
