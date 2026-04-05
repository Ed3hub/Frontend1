import React from 'react';

type PaymentMethod = 'card' | 'bank' | 'crypto';

interface PaymentMethodStepProps {
  selected: PaymentMethod;
  setSelected: (m: PaymentMethod) => void;
  onNext: () => void;
  course: { title: string; instructor: string; img: string } | null;
  price?: string;
}

const MastercardIcon = () => (
  <svg viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="12" r="11" fill="#EB001B" />
    <circle cx="23" cy="12" r="11" fill="#F79E1B" />
    <path d="M19 5.9A11 11 0 0 1 23 12a11 11 0 0 1-4 6.1A11 11 0 0 1 15 12a11 11 0 0 1 4-6.1z" fill="#FF5F00" />
  </svg>
);

const BankIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
  </svg>
);

const EthereumIcon = () => (
  <svg viewBox="0 0 24 38" width="20" height="32" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,0 0,19 12,25 24,19" fill="#627EEA" opacity="0.9" />
    <polygon points="12,0 24,19 12,25" fill="#3C5DC7" opacity="0.7" />
    <polygon points="12,27 0,21 12,38 24,21" fill="#627EEA" opacity="0.9" />
    <polygon points="12,27 24,21 12,38" fill="#3C5DC7" opacity="0.7" />
  </svg>
);

const paymentOptions: {
  id: PaymentMethod;
  title: string;
  sub: string;
  icon: React.ReactNode;
  available: boolean;
  badge?: string;
}[] = [
  {
    id: 'card',
    title: 'Card Payment',
    sub: 'Pay securely with debit or credit card via Paystack',
    icon: <MastercardIcon />,
    available: true,
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    sub: 'Transfer directly to our dedicated bank account',
    icon: <BankIcon />,
    available: false,
    badge: 'Coming Soon',
  },
  {
    id: 'crypto',
    title: 'Crypto Payment',
    sub: 'Pay with USDT or USDC via your Web3 wallet',
    icon: <EthereumIcon />,
    available: false,
    badge: 'Coming Soon',
  },
];

export default function PaymentMethodStep({ selected, setSelected, onNext, course, price }: PaymentMethodStepProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="bg-white overflow-hidden w-full max-w-4xl flex flex-col md:flex-row min-h-[560px]">

        {/* Left panel */}
        <div className="hidden md:flex md:w-1/2 bg-white flex-col justify-start items-center relative overflow-hidden">
          <img src="/payment_bg.svg" alt="payment background" className="w-full h-1/2 object-contain" />
          <div className="relative z-10 text-center px-8">
            <h3 className="text-2xl font-extrabold text-gray-900">Pay with ease</h3>
            <p className="text-sm mt-2 text-gray-500">Fast, secure, and flexible payment options</p>
            {course && (
              <div className="mt-6 bg-gray-50 rounded-2xl p-4 text-left">
                <p className="text-xs text-gray-400 mb-1">You're paying for</p>
                <p className="font-bold text-gray-800 text-sm line-clamp-2">{course.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">by {course.instructor}</p>
                {price && <p className="text-lg font-bold text-blue-600 mt-2">₦{price}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center mx-auto justify-center mb-6 shadow-[0_0_15px_rgba(165,243,252,0.8)]">
            <span className="text-cyan-500 text-lg">💳</span>
          </div>
          <h2 className="text-2xl font-bold mb-1 text-center">Choose payment method</h2>
          <p className="text-gray-400 text-sm mb-8 text-center">Select how you'd like to complete your purchase</p>

          <div className="space-y-4 mb-8">
            {paymentOptions.map((item) => (
              <label
                key={item.id}
                className={`flex items-center p-4 border rounded-2xl transition-all ${
                  !item.available
                    ? 'opacity-50 cursor-not-allowed border-gray-100 bg-gray-50'
                    : selected === item.id
                    ? 'border-blue-500 ring-1 ring-blue-500 cursor-pointer'
                    : 'border-gray-100 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mr-4 shadow-sm shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-800">{item.title}</p>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 bg-orange-50 text-orange-500 border border-orange-100 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                </div>
                <input
                  type="radio"
                  name="pay"
                  className="w-4 h-4 accent-blue-500"
                  checked={selected === item.id}
                  onChange={() => item.available && setSelected(item.id)}
                  disabled={!item.available}
                />
              </label>
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={!paymentOptions.find((o) => o.id === selected)?.available}
            className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
