import React from 'react';

interface VectorArtProps {
  className?: string;
}

export const GeometricBlob: React.FC<VectorArtProps> = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.8 }} />
        <stop offset="50%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 0.4 }} />
      </linearGradient>
    </defs>
    <path
      d="M47.5,-65.4C60.8,-55.7,70.4,-40.2,75.8,-23.1C81.2,-6,82.4,12.7,78.1,29.8C73.8,46.9,64,62.4,50.1,71.2C36.2,80,18.1,82.1,0.8,81.1C-16.5,80.1,-33,76,-45.8,67.2C-58.6,58.4,-67.7,44.8,-72.3,29.5C-76.9,14.2,-76.9,-2.8,-72.4,-18.3C-67.9,-33.8,-58.9,-47.8,-46.2,-57.7C-33.5,-67.6,-16.7,-73.4,0.8,-74.5C18.3,-75.6,36.6,-72,47.5,-65.4Z"
      fill="url(#blobGradient)"
      transform="translate(100,100)"
    />
  </svg>
);

export const Web3Network: React.FC<VectorArtProps> = ({ className = "" }) => (
  <svg
    viewBox="0 0 300 300"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.8 }} />
      </linearGradient>
    </defs>
    {/* Network nodes */}
    <circle cx="60" cy="60" r="8" fill="url(#networkGradient)" />
    <circle cx="150" cy="50" r="12" fill="url(#networkGradient)" />
    <circle cx="240" cy="80" r="6" fill="url(#networkGradient)" />
    <circle cx="80" cy="150" r="10" fill="url(#networkGradient)" />
    <circle cx="180" cy="140" r="8" fill="url(#networkGradient)" />
    <circle cx="220" cy="200" r="12" fill="url(#networkGradient)" />
    <circle cx="50" cy="220" r="6" fill="url(#networkGradient)" />
    <circle cx="150" cy="250" r="10" fill="url(#networkGradient)" />
    
    {/* Network connections */}
    <line x1="60" y1="60" x2="150" y2="50" stroke="url(#networkGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="150" y1="50" x2="240" y2="80" stroke="url(#networkGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="60" y1="60" x2="80" y2="150" stroke="url(#networkGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="150" y1="50" x2="180" y2="140" stroke="url(#networkGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="180" y1="140" x2="220" y2="200" stroke="url(#networkGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="80" y1="150" x2="50" y2="220" stroke="url(#networkGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="80" y1="150" x2="150" y2="250" stroke="url(#networkGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="220" y1="200" x2="150" y2="250" stroke="url(#networkGradient)" strokeWidth="2" opacity="0.6" />
  </svg>
);

export const BlockchainIllustration: React.FC<VectorArtProps> = ({ className = "" }) => (
  <svg
    viewBox="0 0 400 200"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="blockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#06B6D4', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.9 }} />
      </linearGradient>
    </defs>
    
    {/* Blockchain blocks */}
    <rect x="20" y="60" width="60" height="80" rx="8" fill="url(#blockGradient)" />
    <rect x="100" y="60" width="60" height="80" rx="8" fill="url(#blockGradient)" />
    <rect x="180" y="60" width="60" height="80" rx="8" fill="url(#blockGradient)" />
    <rect x="260" y="60" width="60" height="80" rx="8" fill="url(#blockGradient)" />
    
    {/* Block connections */}
    <line x1="80" y1="100" x2="100" y2="100" stroke="#3B82F6" strokeWidth="3" />
    <line x1="160" y1="100" x2="180" y2="100" stroke="#3B82F6" strokeWidth="3" />
    <line x1="240" y1="100" x2="260" y2="100" stroke="#3B82F6" strokeWidth="3" />
    
    {/* Hash symbols in blocks */}
    <text x="50" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">#</text>
    <text x="130" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">#</text>
    <text x="210" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">#</text>
    <text x="290" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">#</text>
    
    {/* Data lines in blocks */}
    <line x1="30" y1="80" x2="70" y2="80" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="30" y1="90" x2="60" y2="90" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="30" y1="120" x2="65" y2="120" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    
    <line x1="110" y1="80" x2="150" y2="80" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="110" y1="90" x2="140" y2="90" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="110" y1="120" x2="145" y2="120" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    
    <line x1="190" y1="80" x2="230" y2="80" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="190" y1="90" x2="220" y2="90" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="190" y1="120" x2="225" y2="120" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    
    <line x1="270" y1="80" x2="310" y2="80" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="270" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
    <line x1="270" y1="120" x2="305" y2="120" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
  </svg>
);

export const CryptoCoin: React.FC<VectorArtProps> = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#D97706', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    {/* Coin body */}
    <circle cx="60" cy="60" r="50" fill="url(#coinGradient)" />
    <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
    
    {/* XP symbol */}
    <text x="60" y="70" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">XP</text>
    
    {/* Coin shine effect */}
    <ellipse cx="45" cy="35" rx="15" ry="8" fill="rgba(255,255,255,0.4)" transform="rotate(-30 45 35)" />
  </svg>
);

export const AbstractPattern: React.FC<VectorArtProps> = ({ className = "" }) => (
  <svg
    viewBox="0 0 400 400"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="patternGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.1 }} />
        <stop offset="50%" style={{ stopColor: '#06B6D4', stopOpacity: 0.2 }} />
        <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.1 }} />
      </linearGradient>
    </defs>
    
    {/* Abstract flowing shapes */}
    <path
      d="M50,200 Q100,100 200,150 T350,200 Q300,300 200,250 T50,200"
      fill="url(#patternGradient)"
    />
    <path
      d="M100,150 Q200,50 300,100 T400,150 Q350,250 250,200 T100,150"
      fill="url(#patternGradient)"
    />
    <path
      d="M0,250 Q100,200 200,250 T400,250 Q300,350 200,300 T0,250"
      fill="url(#patternGradient)"
    />
  </svg>
);