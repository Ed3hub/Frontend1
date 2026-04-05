import React, { useEffect, useState } from 'react';
import { Gift, Trophy, Hexagon, Coins, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface Transaction {
  id: number;
  amount: number;
  reason: string;
  description: string;
  created_at: string;
  is_claimed: boolean;
}

interface Wallet {
  balance: number;
  transactions: Transaction[];
}

const REASON_ICON: Record<string, React.ReactNode> = {
  course_complete: <div className="bg-yellow-400 rounded-full p-2 text-white"><Coins size={22} /></div>,
  module_complete: <div className="bg-blue-400 rounded-full p-2 text-white"><Coins size={22} /></div>,
  quiz_pass:       <div className="bg-purple-400 rounded-full p-2 text-white"><Coins size={22} /></div>,
  assessment_pass: <div className="bg-green-400 rounded-full p-2 text-white"><Coins size={22} /></div>,
  community:       <Trophy className="text-yellow-500" size={32} />,
  streak:          <Gift className="text-red-500" size={32} />,
};

const REASON_TYPE: Record<string, string> = {
  course_complete: 'Token',
  module_complete: 'Token',
  quiz_pass:       'Token',
  assessment_pass: 'Token',
  community:       'Reward',
  streak:          'Reward',
};

export default function TokensPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/courses/wallet/me/')
      .then((res) => setWallet(res.data))
      .catch(() => setError('Failed to load wallet.'))
      .finally(() => setLoading(false));
  }, []);

  const handleClaim = async (txId: number) => {
    setClaiming(txId);
    try {
      await api.post(`/courses/wallet/claim/${txId}/`);
      setWallet((prev) => {
        if (!prev) return prev;
        const tx = prev.transactions.find((t) => t.id === txId);
        return {
          ...prev,
          balance: prev.balance + (tx?.amount ?? 0),
          transactions: prev.transactions.map((t) =>
            t.id === txId ? { ...t, is_claimed: true } : t
          ),
        };
      });
    } catch {
      setError('Failed to claim. Please try again.');
    } finally {
      setClaiming(null);
    }
  };

  const unclaimed = wallet?.transactions.filter((tx) => !tx.is_claimed) ?? [];
  const claimed   = wallet?.transactions.filter((tx) => tx.is_claimed) ?? [];

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen p-8 font-sans">
      {/* Header */}
      <header className="flex items-center justify-center mb-10 relative">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tokens and Rewards</h1>
      </header>

      {/* Balance card */}
      {wallet && (
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-6 mb-10 flex items-center justify-between text-white shadow-lg shadow-blue-100">
          <div>
            <p className="text-sm font-medium opacity-80">Total Token Balance</p>
            <p className="text-4xl font-extrabold mt-1">{wallet.balance.toLocaleString()}</p>
            <p className="text-xs opacity-70 mt-1">tokens earned</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Coins size={32} className="text-white" />
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center justify-between py-6 border-b border-gray-100">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-48" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              </div>
              <div className="h-10 w-28 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm text-center">{error}</p>
      ) : wallet?.transactions.length === 0 ? (
        <div className="text-center py-20">
          <Coins size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">No tokens yet</p>
          <p className="text-gray-300 text-sm mt-1">Complete courses and modules to earn tokens</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Unclaimed first */}
          {unclaimed.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-6 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  {REASON_ICON[tx.reason] ?? <Coins size={28} className="text-yellow-400" />}
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-base">{tx.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    +{tx.amount} tokens · {new Date(tx.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleClaim(tx.id)}
                disabled={claiming === tx.id}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors disabled:opacity-60 flex items-center gap-2 shrink-0"
              >
                {claiming === tx.id
                  ? <><Loader2 size={14} className="animate-spin" /> Claiming...</>
                  : `Claim ${REASON_TYPE[tx.reason] ?? 'Token'}`}
              </button>
            </div>
          ))}

          {/* Claimed */}
          {claimed.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-6 border-b border-gray-100 last:border-0 opacity-60">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  {REASON_ICON[tx.reason] ?? <Coins size={28} className="text-yellow-400" />}
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-base">{tx.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    +{tx.amount} tokens · {new Date(tx.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-500 text-white shrink-0">
                Claimed
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
