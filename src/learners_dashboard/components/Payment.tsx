import React, { useState } from 'react';
import PaymentMethodStep from './PaymentMethodStep';
import ConnectWalletStep from './ConnectWalletStep';
import PaymentDetailsStep from './PaymentDetailsStep';

type PaymentMethod = 'card' | 'bank' | 'crypto';
type WalletType = 'metamask' | 'walletconnect' | 'coinbase';
type Step = 'CHOOSE_METHOD' | 'CONNECT_WALLET' | 'PAYMENT_DETAILS';

interface CheckoutFlowProps {
  setActivePage: (page: string) => void;
  setSelectedCourse: (course: { title: string; instructor: string; img: string; slug?: string }) => void;
  course: { title: string; instructor: string; img: string; slug?: string; price?: string; courseId?: number } | null;
}

export default function CheckoutFlow({ setActivePage, setSelectedCourse, course }: CheckoutFlowProps) {
  const [step, setStep] = useState<Step>('CHOOSE_METHOD');
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [wallet, setWallet] = useState<WalletType>('walletconnect');

  const handleNextFromMethodStep = () => {
    if (method === 'crypto') {
      setStep('CONNECT_WALLET');
    } else {
      setStep('PAYMENT_DETAILS');
    }
  };

  const handlePaymentSuccess = () => {
    setActivePage('ongoingCourses');
  };

  if (step === 'CHOOSE_METHOD') {
    return (
      <PaymentMethodStep
        selected={method}
        setSelected={setMethod}
        onNext={handleNextFromMethodStep}
        course={course}
        price={course?.price}
      />
    );
  }

  if (step === 'CONNECT_WALLET') {
    return (
      <ConnectWalletStep
        selected={wallet}
        setSelected={setWallet}
        onNext={() => setStep('PAYMENT_DETAILS')}
        onBack={() => setStep('CHOOSE_METHOD')}
      />
    );
  }

  return (
    <PaymentDetailsStep
      method={method}
      onPaymentSuccess={handlePaymentSuccess}
      onBack={() => method === 'crypto' ? setStep('CONNECT_WALLET') : setStep('CHOOSE_METHOD')}
      course={course}
      price={course?.price}
      courseId={course?.courseId}
      wallet={wallet}
    />
  );
}
