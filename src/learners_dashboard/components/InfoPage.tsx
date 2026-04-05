import React from 'react';
import { ExternalLink } from 'lucide-react';

const InfoSection = ({ title, children }: { title?: string, children: React.ReactNode }) => (
  <div className="py-6 border-b border-gray-100 last:border-0">
    {title && <h3 className="text-gray-900 font-bold mb-3">{title}</h3>}
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const InfoPage: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Course Overview */}
      <section className="mb-2 text-gray-600 text-sm leading-relaxed">
        <p>
          This course introduces UI/UX designers to the world of Tokenomics and Decentralized Finance (DeFi). 
          You'll learn how DeFi protocols work, the economic models behind them, and how to design usable, 
          trustworthy, and engaging interfaces for Web3 users.
        </p>
        <p className="mt-2">
          The course blends conceptual understanding with practical design applications, helping yo... 
          <span className="text-blue-500 cursor-pointer font-medium ml-1 underline">see more...</span>
        </p>
      </section>

      {/* Detailed Info Sections */}
      <div className="flex flex-col">
        {/* Format & Tools */}
        <InfoSection>
          <p className="text-gray-700"><span className="font-bold">Format:</span> Video lessons, interactive demos, and real-world projects</p>
          <p className="text-gray-700"><span className="font-bold">Tools Used:</span> MetaMask, ENS, Lens Protocol, Gitcoin Passport</p>
        </InfoSection>

        {/* Ideal For */}
        <InfoSection title="Ideal for:">
          <p className="text-gray-700">UI/UX designers exploring Web3</p>
          <p className="text-gray-700">Developers building identity-enabled apps</p>
          <p className="text-gray-700">Creators looking to understand decentralized user profiles</p>
        </InfoSection>

        {/* What's Included */}
        <InfoSection title="What's included:">
          <p className="text-gray-700">6 modules with videos, visuals and case studies</p>
          <p className="text-gray-700">3 hands-on assignments</p>
          <p className="text-gray-700">Final project to showcase your skills</p>
          <p className="text-gray-700">Certificate of completion</p>
          <a href="#" className="text-blue-400 text-xs break-all flex items-center gap-1 mt-1">
            https://learnweb3.xyz/certificates/downloads?course=web3-identity&user=yourname
            <ExternalLink size={12} />
          </a>
        </InfoSection>

        {/* You'll Learn */}
        <InfoSection title="You'll learn:">
          <p className="text-gray-700">Wallet-based authentication and social identity design</p>
          <p className="text-gray-700">How Web3 identity works (DIDs, ENS, ZK Proofs)</p>
          <p className="text-gray-700">How to build user trust and clarity into decentralized flows</p>
        </InfoSection>
      </div>
    </div>
  );
};

export default InfoPage;