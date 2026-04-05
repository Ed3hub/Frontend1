"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

type Step = "email" | "otp" | "password";

export default function ResetPassword() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password/", { email });
      setStep("otp");
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/verify-reset-otp/", { email, code: otp });
      setResetToken(data.reset_token);
      setStep("password");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setError(e.response?.data?.detail ?? "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password/", { reset_token: resetToken, new_password: newPassword });
      router.push("/sign-in?reset=1");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setError(e.response?.data?.detail ?? "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4 items-center justify-center font-open-sans">
      <div className="flex flex-col items-center justify-center w-full h-full font-open-sans text-sm">

        {step === "email" && (
          <>
            <h1 className="text-2xl font-semibold font-poppins text-center mt-2">Forgot Password</h1>
            <p className="text-center mt-2 mb-4">Enter your email to receive a reset OTP.</p>
            <form className="w-2/3 space-y-4 py-5" onSubmit={handleSendOTP}>
              <Input
                type="email"
                placeholder="Email address"
                label="Email"
                labelClassName="text-sm"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button className="w-full rounded-full py-5" variant="default" size="sm" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <h1 className="text-2xl font-semibold font-poppins text-center mt-2">Enter OTP</h1>
            <p className="text-center mt-2 mb-4">We sent a 6-digit code to <strong>{email}</strong>.</p>
            <form className="w-2/3 space-y-4 py-5" onSubmit={handleVerifyOTP}>
              <Input
                type="text"
                placeholder="6-digit OTP"
                label="OTP Code"
                labelClassName="text-sm"
                maxLength={6}
                value={otp}
                onChange={(e) => { setOtp(e.target.value); setError(""); }}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button className="w-full rounded-full py-5" variant="default" size="sm" type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button
                className="w-full rounded-full hover:bg-transparent bg-transparent text-primary p-0"
                size="sm" type="button"
                onClick={() => { setStep("email"); setError(""); }}
              >
                Back
              </Button>
            </form>
          </>
        )}

        {step === "password" && (
          <>
            <h1 className="text-2xl font-semibold font-poppins text-center mt-2">Reset Password</h1>
            <p className="text-center mt-2 mb-4">Enter your new password.</p>
            <form className="w-2/3 space-y-4 py-5" onSubmit={handleResetPassword}>
              <Input
                type="password"
                placeholder="New Password"
                label="New Password"
                labelClassName="text-sm"
                togglePassword
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                required
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                label="Confirm Password"
                labelClassName="text-sm"
                togglePassword
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button className="w-full rounded-full py-5" variant="default" size="sm" type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
