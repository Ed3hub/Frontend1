import React from 'react';

type WalletType = 'metamask' | 'walletconnect' | 'coinbase';

interface ConnectWalletStepProps {
  selected: WalletType;
  setSelected: (w: WalletType) => void;
  onNext: () => void;
  onBack: () => void;
}

// --- SVG wallet icons ---
const MetaMaskIcon = () => (
  <svg viewBox="0 0 35 33" width="32" height="30" xmlns="http://www.w3.org/2000/svg">
    <polygon points="32.9,1 19.4,10.7 21.8,4.7" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="2.1,1 15.5,10.8 13.2,4.7" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="28,23.5 24.3,29 32.2,31.2 34.5,23.6" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="0.5,23.6 2.8,31.2 10.7,29 7,23.5" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="10.3,14.4 8,17.9 15.8,18.3 15.5,9.9" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="24.7,14.4 19.4,9.8 19.2,18.3 27,17.9" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="10.7,29 15.3,26.7 11.3,23.7" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="19.7,26.7 24.3,29 23.7,23.7" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WalletConnectIcon = () => <span className="text-2xl">📱</span>;

const CoinbaseIcon = () => (
  <svg viewBox="0 0 32 32" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#1652F0"/>
    <rect x="10" y="10" width="12" height="12" rx="3" fill="white"/>
    <rect x="13" y="13" width="6" height="6" rx="1" fill="#1652F0"/>
  </svg>
);

export default function ConnectWalletStep({ selected, setSelected, onNext, onBack }: ConnectWalletStepProps) {
  const walletOptions: { id: WalletType; title: string; sub: string; icon: React.ReactNode }[] = [
    { id: 'metamask',      title: 'MetaMask',        sub: 'Connect using browser extension',      icon: <MetaMaskIcon /> },
    { id: 'walletconnect', title: 'WalletConnect',   sub: 'Scan QR code with mobile wallet',      icon: <WalletConnectIcon /> },
    { id: 'coinbase',      title: 'Coinbase Wallet', sub: 'Connect with Coinbase Wallet',          icon: <CoinbaseIcon /> },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-[40px] w-full max-w-md p-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        <div className="w-10 h-10 bg-cyan-100 rounded-full flex mx-auto items-center justify-center mb-6 shadow-[0_0_15px_rgba(165,243,252,0.8)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-1">Connect Your Wallet</h2>
        <p className="text-gray-400 text-sm text-center mb-8">Choose a wallet to proceed with payment</p>

        <div className="space-y-4 mb-8">
          {walletOptions.map((item) => (
            <label
              key={item.id}
              className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${
                selected === item.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mr-4">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
              <input
                type="radio"
                name="wallet"
                className="w-4 h-4 accent-blue-500"
                checked={selected === item.id}
                onChange={() => setSelected(item.id)}
              />
            </label>
          ))}
        </div>

        <button
          onClick={onNext}
          className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold hover:bg-cyan-600 transition-colors mb-4"
        >
          Next
        </button>

        <div className="bg-blue-50 p-4 rounded-xl text-xs text-gray-500 flex items-center justify-center gap-2">
          🔒 Your wallet connection is secure and encrypted.
        </div>
      </div>
    </div>
  );
}
