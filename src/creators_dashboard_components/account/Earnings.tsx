import React, { useState, useEffect, useMemo } from "react";
import { Star, BookOpen, Banknote, Eye, EyeOff, CheckCircle2, Loader2, X, RefreshCw, Clock } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import api from "@/lib/api";

interface Transaction {
  id: number;
  amount: string;
  type: "credit" | "debit";
  description: string;
  course: string | null;
  created_at: string;
}

interface WalletData {
  balance: string;
  total_earned: string;
  total_withdrawn: string;
  total_courses: number;
  total_students: number;
  transactions: Transaction[];
}

interface Withdrawal {
  id: number;
  amount: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  status: "pending" | "processing" | "completed" | "rejected";
  created_at: string;
}

interface MetricCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  bgColor: string;
}

const MetricCard = ({ icon: Icon, value, label, bgColor }: MetricCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-start w-full">
    <div className="flex items-center space-x-4 mb-4">
      <span className={`p-3 rounded-2xl ${bgColor}`}>
        <Icon className="text-blue-500" size={24} />
      </span>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
    <span className="text-gray-400 text-sm font-medium">{label}</span>
  </div>
);

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const FIELD = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const Earnings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [walletLoading, setWalletLoading] = useState(true);

  const fetchWallet = async () => {
    setWalletLoading(true);
    try {
      const [walletRes, withdrawalRes] = await Promise.all([
        api.get("/courses/educator/wallet/"),
        api.get("/courses/educator/withdraw/"),
      ]);
      setWallet(walletRes.data);
      setWithdrawals(withdrawalRes.data);
    } catch {
      setWallet(null);
    } finally {
      setWalletLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
    // Auto-refresh every 30 seconds to pick up new sales
    const interval = setInterval(fetchWallet, 30000);
    return () => clearInterval(interval);
  }, []);

  const balance = parseFloat(wallet?.balance ?? "0");

  // Build chart from real credit transactions grouped by month
  const chartData = useMemo(() => {
    const fallback = ["JAN","FEB","MAR","APR","MAY","JUN","JUL"].map(n => ({ name: n, value: 0 }));
    if (!wallet?.transactions.length) return fallback;
    const months: Record<string, number> = {};
    wallet.transactions
      .filter(t => t.type === "credit")
      .forEach(t => {
        const month = new Date(t.created_at).toLocaleString("default", { month: "short" }).toUpperCase();
        months[month] = (months[month] || 0) + parseFloat(t.amount);
      });
    const entries = Object.entries(months).slice(-7).map(([name, value]) => ({ name, value }));
    return entries.length ? entries : fallback;
  }, [wallet]);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !bankName || !accountNumber || !accountName) {
      setWithdrawError("Please fill in all fields.");
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setWithdrawError("Please enter a valid amount.");
      return;
    }
    if (amt > balance) {
      setWithdrawError(`Insufficient balance. Available: ₦${balance.toLocaleString()}`);
      return;
    }
    setWithdrawError("");
    setWithdrawing(true);
    try {
      await api.post("/courses/educator/withdraw/", {
        amount: amt,
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName,
      });
      await fetchWallet();
      setWithdrawSuccess(true);
    } catch (err: any) {
      setWithdrawError(err?.response?.data?.detail ?? "Withdrawal failed. Please try again.");
    } finally {
      setWithdrawing(false);
    }
  };

  const resetWithdraw = () => {
    setShowWithdraw(false);
    setWithdrawSuccess(false);
    setAmount("");
    setBankName("");
    setAccountNumber("");
    setAccountName("");
    setWithdrawError("");
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-base font-bold text-gray-800">Earnings & Engagement</h1>
        <button onClick={fetchWallet} className="text-gray-400 hover:text-blue-500 transition-colors" title="Refresh">
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <MetricCard icon={Star} value={walletLoading ? "..." : `${wallet?.total_students ?? 0}`} label="Total Students" bgColor="bg-blue-50" />
        <MetricCard icon={BookOpen} value={walletLoading ? "..." : `${wallet?.total_courses ?? 0}`} label="Total Courses" bgColor="bg-blue-50" />
        <MetricCard
          icon={Banknote}
          value={walletLoading ? "..." : `₦${parseFloat(wallet?.total_earned ?? "0").toLocaleString()}`}
          label="Total Earned (60% share)"
          bgColor="bg-green-50"
        />
      </div>

      {/* Revenue split */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-blue-600">60%</p>
          <p className="text-sm text-gray-500 mt-1">Your share per sale</p>
        </div>
        <div className="w-px bg-blue-200 hidden sm:block" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-gray-400">40%</p>
          <p className="text-sm text-gray-500 mt-1">Ed3Hub platform fee</p>
        </div>
        <div className="w-px bg-blue-200 hidden sm:block" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-gray-700">
            ₦{walletLoading ? "..." : parseFloat(wallet?.total_withdrawn ?? "0").toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total withdrawn</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-50">
        {/* Balance + withdraw button */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-500 font-medium text-sm">Available Balance</span>
            <button onClick={() => setIsVisible(!isVisible)} className="text-gray-400 hover:text-blue-500 transition-colors">
              {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {walletLoading ? "..." : isVisible ? `₦${balance.toLocaleString()}` : "••••••"}
            </h2>
            <button
              onClick={() => setShowWithdraw(true)}
              disabled={balance <= 0 || walletLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Banknote size={16} /> Withdraw
            </button>
          </div>
        </div>

        {/* Recent transactions */}
        {wallet && wallet.transactions.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-600 mb-3">Recent Transactions</p>
            <div className="space-y-2">
              {wallet.transactions.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div>
                    <p className="text-sm text-gray-700">{t.description}</p>
                    <p className="text-xs text-gray-400">{new Date(t.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-500"}`}>
                    {t.type === "credit" ? "+" : "-"}₦{parseFloat(t.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings chart */}
        <div className="h-[300px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="3 3" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} dy={15} />
              <YAxis hide domain={["dataMin - 500", "dataMax + 500"]} />
              <Tooltip cursor={false} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                formatter={(v: number) => [`₦${v.toLocaleString()}`, "Earnings"]} />
              <Area type="monotone" dataKey="value" stroke="#00A3FF" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)"
                activeDot={{ r: 8, fill: "#00A3FF", stroke: "#fff", strokeWidth: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Withdrawal history */}
      {withdrawals.length > 0 && (
        <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
          <p className="text-sm font-semibold text-gray-700 mb-4">Withdrawal History</p>
          <div className="space-y-3">
            {withdrawals.map((w) => (
              <div key={w.id} className="flex items-center justify-between py-3 border-b border-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-800">₦{parseFloat(w.amount).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{w.bank_name} — {w.account_number}</p>
                  <p className="text-xs text-gray-400">{new Date(w.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_COLORS[w.status]}`}>
                  {w.status === "pending" && <Clock size={10} className="inline mr-1" />}
                  {w.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            {withdrawSuccess ? (
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Withdrawal Successful!</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Your withdrawal request of{" "}
                  <span className="font-semibold text-gray-800">&#8358;{parseFloat(amount).toLocaleString()}</span>{" "}
                  has been received. You will receive your money in{" "}
                  <span className="font-semibold text-blue-600">1–2 business working days</span>.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 w-full text-left text-sm text-gray-600 space-y-1">
                  <p><span className="text-gray-400">Bank:</span> {bankName}</p>
                  <p><span className="text-gray-400">Account:</span> {accountNumber}</p>
                  <p><span className="text-gray-400">Name:</span> {accountName}</p>
                </div>
                <button onClick={resetWithdraw} className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Withdraw Earnings</h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                      Available: <span className="font-semibold text-green-600">&#8358;{balance.toLocaleString()}</span>
                    </p>
                  </div>
                  <button onClick={resetWithdraw} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                <form onSubmit={handleWithdraw} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Amount (&#8358;)</label>
                    <input type="number" min="1" max={balance} placeholder={`Max ₦${balance.toLocaleString()}`}
                      value={amount} onChange={(e) => { setAmount(e.target.value); setWithdrawError(""); }} className={FIELD} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Bank Name</label>
                    <input type="text" placeholder="e.g. First Bank"
                      value={bankName} onChange={(e) => { setBankName(e.target.value); setWithdrawError(""); }} className={FIELD} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Account Number</label>
                    <input type="text" placeholder="10-digit account number" maxLength={10}
                      value={accountNumber} onChange={(e) => { setAccountNumber(e.target.value); setWithdrawError(""); }} className={FIELD} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Account Name</label>
                    <input type="text" placeholder="Name on the account"
                      value={accountName} onChange={(e) => { setAccountName(e.target.value); setWithdrawError(""); }} className={FIELD} />
                  </div>

                  {withdrawError && <p className="text-red-500 text-sm">{withdrawError}</p>}

                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                    Withdrawals are processed manually. You will receive your funds within <strong>1–2 business working days</strong>.
                  </div>

                  <button type="submit" disabled={withdrawing || balance <= 0}
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {withdrawing ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Submit Withdrawal"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Earnings;
