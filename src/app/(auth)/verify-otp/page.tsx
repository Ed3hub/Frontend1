"use client";

import EmailVerification from "@/components/EmailVerification";
import api from "@/lib/api";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [error, setError] = React.useState("");

  const handleVerify = async (otp: string) => {
    setError("");
    try {
      await api.post("/auth/verify-otp/", { email, code: otp });
      router.push("/sign-in?verified=1");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setError(e.response?.data?.detail ?? "Invalid or expired OTP.");
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await api.post("/auth/resend-otp/", { email });
      alert("A new OTP has been sent to your email.");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setError(e.response?.data?.detail ?? "Failed to resend OTP.");
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4 items-center justify-center font-open-sans">
      <Image src="/login/logo.svg" alt="logo" width={50} height={50} className="object-cover border" />
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {email && (
        <p className="text-sm text-gray-500 text-center">
          We sent a code to <span className="font-semibold">{email}</span>
        </p>
      )}
      <EmailVerification onVerify={handleVerify} onResend={handleResend} />
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense>
      <VerifyOTPContent />
    </Suspense>
  );
}
