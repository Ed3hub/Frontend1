"use client";

import RoleRadio from "@/components/RoleRadio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUp() {
  const router = useRouter();
  const { register, googleAuth, user, loading: authLoading } = useAuth();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [role, setRole] = React.useState("learner");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [showRolePicker, setShowRolePicker] = React.useState(false);
  const [googleToken, setGoogleToken] = React.useState("");
  const [googleRole, setGoogleRole] = React.useState("learner");
  const [googleLoading, setGoogleLoading] = React.useState(false);

  React.useEffect(() => {
    if (!authLoading && user) {
      router.replace(user.role === 'educator' ? '/dashboard' : '/learner-dashboard');
    }
  }, [user, authLoading, router]);

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('');
      // First check if this Google account already exists
      // by attempting auth without a role — backend will return isNewUser
      setGoogleLoading(true);
      try {
        const { role: finalRole, isNewUser } = await googleAuth(tokenResponse.access_token);
        if (isNewUser) {
          // New user — show role picker so they can choose
          setGoogleToken(tokenResponse.access_token);
          setShowRolePicker(true);
        } else {
          // Existing user — go straight to their dashboard, role cannot change
          router.push(finalRole === 'educator' ? '/dashboard' : '/learner-dashboard');
        }
      } catch {
        setError('Google sign-up failed. Please try again.');
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => setError('Google sign-up failed. Please try again.'),
  });

  if (authLoading || user) return null;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      await register(username, email, password, role);
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: Record<string, string[]> } };
      const data = axiosErr.response?.data;
      if (data) {
        const first = Object.values(data)[0];
        setError(Array.isArray(first) ? first[0] : "Registration failed.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmGoogleRole = async () => {
    setGoogleLoading(true);
    try {
      const { role: finalRole, isNewUser } = await googleAuth(googleToken, googleRole);
      // Role picker only matters for new users — existing users keep their original role
      router.push(finalRole === 'educator' ? '/dashboard' : '/learner-dashboard');
    } catch {
      setError('Failed to complete sign-up. Please try again.');
      setShowRolePicker(false);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4 items-center justify-center font-open-sans">
      <div className="flex flex-col space-y-2 justify-center items-center">
        <Image src="/login/logo.svg" alt="logo" width={50} height={50} className="object-cover border" />
        <div className="space-y-1 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold font-poppins">Get Started Now</h1>
          <p className="text-sm font-open-sans">Create an account to explore our app</p>
        </div>
      </div>

      <form className="w-2/3 space-y-4 py-5" onSubmit={handleSignUp}>
        <Input type="text" placeholder="Username" label="Username" labelClassName="text-sm"
          value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} />
        <Input type="email" placeholder="Email" label="Email" labelClassName="text-sm"
          value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} />
        <Input type="password" placeholder="Password" label="Password" labelClassName="text-sm" togglePassword
          value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} />
        <Input type="password" placeholder="Confirm Password" label="Confirm Password" labelClassName="text-sm" togglePassword
          value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }} />

        <RoleRadio value={role} onChange={setRole} />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center space-x-2 py-2">
          <input type="checkbox" name="remember" id="remember" className="size-4" required />
          <label htmlFor="remember" className="text-sm">
            I agree to&nbsp;
            <Link href="/terms-and-condition" className="text-primary">Terms and Conditions</Link>
          </label>
        </div>

        <Button className="w-full rounded-full mt-1 py-5" variant="default" size="sm" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-sm bg-transparent px-2">or continue with</h1>
      </div>

      <div className="flex space-x-3">
        <button type="button" title="Sign up with Google" onClick={() => handleGoogleSignUp()}>
          <Image src="/logo/google.svg" alt="google" width={50} height={50} />
        </button>
      </div>

      <div className="flex flex-col space-y-2 justify-center items-center">
        <p className="text-sm font-open-sans">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary">Sign In</Link>
        </p>
      </div>

      {/* ── Role picker overlay for new Google users ── */}
      {showRolePicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center gap-6">
            <Image src="/login/logo.svg" alt="logo" width={44} height={44} className="object-cover border rounded-lg" />
            <div className="text-center">
              <h2 className="text-xl font-bold font-poppins">One last step!</h2>
              <p className="text-sm text-gray-500 mt-1">How will you be using Ed3Hub?</p>
            </div>

            <div className="w-full grid grid-cols-2 gap-3">
              {(["learner", "educator"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setGoogleRole(r)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    googleRole === r
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{r === "learner" ? "🎓" : "📚"}</span>
                  <span className="text-sm font-semibold capitalize">{r}</span>
                  <span className="text-[11px] text-gray-400 text-center leading-tight">
                    {r === "learner" ? "I want to learn new skills" : "I want to teach & create courses"}
                  </span>
                </button>
              ))}
            </div>

            <Button
              className="w-full rounded-full py-5"
              onClick={handleConfirmGoogleRole}
              disabled={googleLoading}
            >
              {googleLoading ? "Setting up your account..." : "Continue"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
