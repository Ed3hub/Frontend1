import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

interface EmailVerificationProps {
  onVerify: (otp: string) => void;
  onResend?: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onVerify, onResend }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(otp.join(""));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-open-sans text-sm">

      {/* <Image
        src="/login/logo.svg"
        alt="logo"
        width={50}
        height={50}
        className="object-cover border"
      /> */}

      <h1 className="text-2xl font-semibold font-poppins text-center mt-2">Email Verification Code</h1>
      <p className="text-center mt-2 mb-4">Enter the OTP we just sent to your email.</p>
      <form onSubmit={handleVerify} className="flex flex-col items-center w-full">
        <div className="flex space-x-2 mb-2 mt-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              // @ts-expect-error ref is not typed
              ref={el => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e.target.value, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              className={`w-12 h-12 rounded-lg border-2 text-center text-2xl font-semibold outline-none transition-all ${digit ? "border-primary" : "border-gray-400"}`}
              style={{ background: "#fff" }}
            />
          ))}
        </div>
        <div className="mb-4">
          <span>Didn&apos;t receive code? </span>
          <button
            type="button"
            className="text-primary hover:underline focus:outline-none"
            onClick={onResend}
          >
            Resend code
          </button>
        </div>
        <Button
          type="submit"
          className="w-3/5 mt-10 rounded-full bg-primary text-white text-lg py-2 hover:bg-primary/90"
        >
          Verify
        </Button>
      </form>
    </div>
  );
};

export default EmailVerification; 