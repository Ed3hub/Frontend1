import React, { useState } from 'react';
import { ChevronLeft, Copy, CheckCircle2, Loader2, Shield } from 'lucide-react';
import api from '@/lib/api';

type PaymentMethod = 'card' | 'bank' | 'crypto';
type Token = 'USDC' | 'USDT';

interface PaymentDetailsStepProps {
  method: PaymentMethod;
  onPaymentSuccess: () => void;
  onBack: () => void;
  course: { title: string; instructor: string; img: string } | null;
  price?: string;
  courseId?: number;
}

// ── Card Payment (Paystack) ───────────────────────────────────────────────────
function CardPayment({ onBack, onSuccess, course, price, courseId }: {
  onBack: () => void;
  onSuccess: () => void;
  course: PaymentDetailsStepProps['course'];
  price?: string;
  courseId?: number;
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  const handlePay = async () => {
    if (!email) { setError('Email is required for payment.'); return; }
    setError('');

    // Wait up to 5s for Paystack script to be ready
    let attempts = 0;
    while (!(window as unknown as Record<string, unknown>).PaystackPop && attempts < 50) {
      await new Promise((r) => setTimeout(r, 100));
      attempts++;
    }

    const PaystackPop = (window as unknown as {
      PaystackPop?: {
        setup: (opts: object) => { openIframe: () => void };
      };
    }).PaystackPop;

    if (!PaystackPop) {
      setError('Paystack failed to load. Please check your connection and refresh.');
      return;
    }

    const popup = PaystackPop.setup({
      key: 'pk_test_7c134f4a5a2adad045f5390fcf2a3e2e7cf1fcf8',
      email,
      amount: Math.round(parseFloat(price ?? '0') * 100),
      currency: 'NGN',
      ref: `ed3hub_${Date.now()}`,
      metadata: { course_title: course?.title },
      callback: (response: { reference: string }) => {
        // Payment confirmed by Paystack — now enroll
        setLoading(true);
        const enroll = async () => {
          try {
            if (courseId) {
              await api.post(`/courses/${courseId}/enroll/`, { reference: response.reference });
            }
            setLoading(false);
            setEnrolled(true);
          } catch (enrollErr: any) {
            setLoading(false);
            setError(enrollErr?.response?.data?.detail ?? 'Payment succeeded but enrollment failed. Please contact support.');
          }
        };
        enroll();
      },
      onClose: () => {
        // Only reset loading if not already enrolling
        setLoading(false);
      },
    });
    popup.openIframe();
  };

  if (enrolled) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-400 text-sm mb-2">You are now enrolled in</p>
          <p className="font-bold text-gray-800 mb-8">{course?.title}</p>
          <button
            onClick={onSuccess}
            className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold hover:bg-cyan-600 transition-colors"
          >
            Go to My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="w-10 h-10 bg-cyan-100 rounded-full flex mx-auto items-center justify-center mb-6 shadow-[0_0_15px_rgba(165,243,252,0.8)]">
          <span className="text-lg">💳</span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-1">Card Payment</h2>
        <p className="text-gray-400 text-sm text-center mb-6">Powered by Paystack — secure & encrypted</p>

        {/* Course summary */}
        {course && (
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl mb-6">
            <img src={course.img} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p className="font-bold text-sm line-clamp-1">{course.title}</p>
              <p className="text-xs text-gray-400">by {course.instructor}</p>
            </div>
            {price && <p className="ml-auto font-bold text-blue-600">₦{price}</p>}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">Receipt will be sent to this email</p>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-2 mb-6 text-sm px-1">
          <div className="flex justify-between text-gray-400">
            <span>Course Price</span><span>₦{price ?? '0.00'}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-dashed">
            <span>Total</span><span>₦{price ?? '0.00'}</span>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold hover:bg-cyan-600 transition-colors mb-4 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : `Pay ₦${price ?? '0.00'}`}
        </button>

        <div className="bg-blue-50 p-3 rounded-xl text-xs text-gray-500 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" /> Payments are secured by Paystack
        </div>
      </div>
    </div>
  );
}

// ── Bank Transfer ─────────────────────────────────────────────────────────────
function BankTransfer({ onBack, course, price }: {
  onBack: () => void;
  course: PaymentDetailsStepProps['course'];
  price?: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const bankDetails = [
    { label: 'Bank Name', value: 'Coming Soon' },
    { label: 'Account Name', value: 'Ed3Hub Ltd' },
    { label: 'Account Number', value: 'Coming Soon' },
    { label: 'Sort Code / Routing', value: 'Coming Soon' },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="w-10 h-10 bg-blue-100 rounded-full flex mx-auto items-center justify-center mb-6">
          <span className="text-lg">🏦</span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-1">Bank Transfer</h2>
        <p className="text-gray-400 text-sm text-center mb-6">Transfer the exact amount to the account below</p>

        {/* Course summary */}
        {course && (
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl mb-6">
            <img src={course.img} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p className="font-bold text-sm line-clamp-1">{course.title}</p>
              <p className="text-xs text-gray-400">by {course.instructor}</p>
            </div>
            {price && <p className="ml-auto font-bold text-blue-600">₦{price}</p>}
          </div>
        )}

        {/* Coming soon notice */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-center">
          <p className="text-orange-600 font-semibold text-sm">Bank account details coming soon</p>
          <p className="text-orange-400 text-xs mt-1">We're setting up a dedicated account. Check back shortly.</p>
        </div>

        {/* Bank details */}
        <div className="space-y-3 mb-6">
          {bankDetails.map((d) => (
            <div key={d.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <div>
                <p className="text-xs text-gray-400">{d.label}</p>
                <p className="font-semibold text-sm text-gray-700">{d.value}</p>
              </div>
              {d.value !== 'Coming Soon' && (
                <button onClick={() => copy(d.value, d.label)} className="text-gray-400 hover:text-blue-500 transition-colors">
                  {copied === d.label ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-xl text-xs text-gray-500 space-y-1">
          <p>• Use your <strong>email address</strong> as the payment reference</p>
          <p>• Transfer the <strong>exact amount</strong> shown above</p>
          <p>• Access is granted within <strong>24 hours</strong> of confirmation</p>
        </div>
      </div>
    </div>
  );
}

// ── Crypto Payment ────────────────────────────────────────────────────────────
function CryptoPayment({ onBack, onSuccess, course, price, wallet }: {
  onBack: () => void;
  onSuccess: () => void;
  course: PaymentDetailsStepProps['course'];
  price?: string;
  wallet: string;
}) {
  const [token, setToken] = useState<Token>('USDC');
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    // Placeholder — real Web3 payment integration goes here
    setTimeout(() => { setLoading(false); onSuccess(); }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="w-10 h-10 bg-cyan-100 rounded-full flex mx-auto items-center justify-center mb-6 shadow-[0_0_15px_rgba(165,243,252,0.8)]">
          <span className="text-lg">🔗</span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-1">Crypto Payment</h2>
        <p className="text-gray-400 text-sm text-center mb-2">Pay with stablecoins via your connected wallet</p>
        <p className="text-xs text-center text-blue-500 font-medium mb-6 capitalize">Connected: {wallet}</p>

        {/* Course summary */}
        {course && (
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl mb-6">
            <img src={course.img} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p className="font-bold text-sm line-clamp-1">{course.title}</p>
              <p className="text-xs text-gray-400">by {course.instructor}</p>
            </div>
            {price && <p className="ml-auto font-bold text-blue-600">₦{price}</p>}
          </div>
        )}

        {/* Token selector */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Select token</p>
          <div className="grid grid-cols-2 gap-3">
            {(['USDC', 'USDT'] as Token[]).map((t) => (
              <button
                key={t}
                onClick={() => setToken(t)}
                className={`p-4 border-2 rounded-2xl text-center transition-all ${
                  token === t ? 'border-cyan-400 bg-cyan-50' : 'border-gray-100 bg-gray-50 text-gray-400'
                }`}
              >
                <p className="font-bold">{t}</p>
                <p className="text-[10px] mt-0.5">{t === 'USDC' ? 'USD Coin' : 'Tether'}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-2 mb-6 text-sm px-1">
          <div className="flex justify-between text-gray-400">
            <span>Course Price</span><span>₦{price ?? '0.00'}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Network Fee (est.)</span><span>~₦2,000</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-dashed">
            <span>Total</span>
            <span>{(parseFloat(price ?? '0') + 2000).toLocaleString()} {token}</span>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold hover:bg-cyan-600 transition-colors mb-4 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
            : `Pay ₦${(parseFloat(price ?? '0') + 2000).toLocaleString()} ${token}`}
        </button>

        <div className="bg-blue-50 p-3 rounded-xl text-xs text-gray-500 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" /> Payment processed through a secure smart contract
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function PaymentDetailsStep({ method, onPaymentSuccess, onBack, course, price, courseId, wallet }: PaymentDetailsStepProps & { wallet?: string }) {
  if (method === 'card') {
    return <CardPayment onBack={onBack} onSuccess={onPaymentSuccess} course={course} price={price} courseId={courseId} />;
  }
  if (method === 'bank') {
    return <BankTransfer onBack={onBack} course={course} price={price} />;
  }
  return <CryptoPayment onBack={onBack} onSuccess={onPaymentSuccess} course={course} price={price} wallet={wallet ?? 'walletconnect'} />;
}
