"use client";

import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { dashboardPathForRole, useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Copy, Link as LinkIcon, LogOut, Users, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ReferralRow {
  id: number;
  username: string;
  email: string;
  joined_at: string;
  signup_bonus_paid: boolean;
  has_paid: boolean;
  first_purchase_course: string | null;
  first_purchase_amount: string;
  first_purchase_commission: string;
}

interface TransactionRow {
  id: number;
  amount: string;
  type: string;
  description: string;
  referred_user: string | null;
  course: string | null;
  created_at: string;
}

interface MarketerDashboardData {
  referral_code: string;
  affiliate_link: string;
  balance: string;
  total_earned: string;
  total_withdrawn: string;
  signup_reward: string;
  first_purchase_commission_rate: string;
  total_referred_users: number;
  paid_referred_users: number;
  pending_referred_users: number;
  referrals: ReferralRow[];
  transactions: TransactionRow[];
}

const AFFILIATE_SITE_URL = "https://ed3hub.com";

function formatMoney(value: string) {
  return `₦${Number(value || "0").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function MarketerDashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = React.useState<MarketerDashboardData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const affiliateLink = data
    ? `${AFFILIATE_SITE_URL}/sign-up?ref=${encodeURIComponent(data.referral_code)}`
    : "";

  React.useEffect(() => {
    if (user && user.role !== "marketer") {
      router.replace(dashboardPathForRole(user.role));
      return;
    }

    api.get("/auth/marketer/dashboard/")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load marketer dashboard."))
      .finally(() => setLoading(false));
  }, [router, user]);

  const copyLink = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };

  if (loading) return <div className="min-h-screen bg-slate-50 p-8 text-slate-700">Loading...</div>;

  if (error || !data) {
    return <div className="min-h-screen bg-slate-50 p-8 text-red-600">{error || "Dashboard unavailable."}</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm text-slate-500">Marketer Dashboard</p>
            <h1 className="text-2xl font-semibold">Affiliate performance overview</h1>
          </div>
          <Button variant="outline" className="gap-2 rounded-md" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-600">
            <LinkIcon className="h-4 w-4" />
            Affiliate link
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              readOnly
              value={affiliateLink}
              className="min-w-0 flex-1 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
            />
            <Button className="gap-2 rounded-md" onClick={copyLink}>
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Code: <span className="font-medium text-slate-800">{data.referral_code}</span>
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric icon={<Wallet className="h-5 w-5" />} label="Balance" value={formatMoney(data.balance)} />
          <Metric icon={<Wallet className="h-5 w-5" />} label="Total earned" value={formatMoney(data.total_earned)} />
          <Metric icon={<Users className="h-5 w-5" />} label="Users brought in" value={String(data.total_referred_users)} />
          <Metric icon={<Users className="h-5 w-5" />} label="Paying users" value={String(data.paid_referred_users)} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 py-3">
              <h2 className="text-lg font-semibold">Referrals</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Signup bonus</th>
                    <th className="px-4 py-3">Paid</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {data.referrals.map((referral) => (
                    <tr key={referral.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        <div className="font-medium">{referral.username}</div>
                        <div className="text-xs text-slate-500">{referral.email}</div>
                      </td>
                      <td className="px-4 py-3">{referral.signup_bonus_paid ? formatMoney(data.signup_reward) : "Pending"}</td>
                      <td className="px-4 py-3">{referral.has_paid ? "Yes" : "No"}</td>
                      <td className="px-4 py-3">{referral.first_purchase_course || "-"}</td>
                      <td className="px-4 py-3">{formatMoney(referral.first_purchase_commission)}</td>
                    </tr>
                  ))}
                  {data.referrals.length === 0 && (
                    <tr>
                      <td className="px-4 py-8 text-center text-slate-500" colSpan={5}>No referrals yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 py-3">
              <h2 className="text-lg font-semibold">Recent earnings</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {data.transactions.map((tx) => (
                <div key={tx.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium">{tx.description}</p>
                    <span className="whitespace-nowrap font-semibold">{formatMoney(tx.amount)}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{tx.type.replace("_", " ")}</p>
                </div>
              ))}
              {data.transactions.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-slate-500">No earnings yet.</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 text-slate-500">{icon}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default function MarketerDashboardPage() {
  return (
    <AuthGuard>
      <MarketerDashboardContent />
    </AuthGuard>
  );
}
