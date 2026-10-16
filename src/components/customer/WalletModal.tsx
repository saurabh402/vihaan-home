import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Wallet,
  Gift,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Tag,
  History,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const WalletModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    walletBalance,
    rewardPoints,
    walletTransactions,
    addMoneyToWallet,
    openModal,
    showToast
  } = useApp();

  const [showAddMoney, setShowAddMoney] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(500);

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (topUpAmount <= 0) return;
    addMoneyToWallet(topUpAmount);
    setShowAddMoney(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-[#F7F8FA] w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Top Header */}
        <div className="bg-white px-4 py-3.5 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-[#061A33]">Wallet & Rewards</h2>
          <div className="w-7"></div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4 text-xs">
          {/* 1. Luxury Gold Dual Balance Card (Matching Reference Mockup Screen 11) */}
          <div className="rounded-3xl bg-gradient-to-r from-[#D9A928] via-[#E5B842] to-[#B88A1A] p-5 text-[#061A33] shadow-lg border border-amber-200/60 relative overflow-hidden">
            {/* Shimmer Overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              {/* Total Balance */}
              <div className="border-r border-[#061A33]/15 pr-3">
                <span className="text-[11px] font-bold text-[#061A33]/70 uppercase tracking-wider block">
                  Total Balance
                </span>
                <span className="text-2xl font-extrabold tracking-tight block mt-0.5">
                  ₹{walletBalance.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Reward Points */}
              <div className="pl-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#061A33]/70 uppercase tracking-wider">
                    Reward Points
                  </span>
                  <Sparkles className="w-3.5 h-3.5 fill-[#061A33]" />
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-extrabold">{rewardPoints}</span>
                  <span className="text-xs font-bold text-[#061A33]/80">pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Four Action Buttons (Matching Reference Mockup Screen 11) */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <button
              onClick={() => setShowAddMoney(true)}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-blue-300 transition flex flex-col items-center group active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B3A78] flex items-center justify-center mb-1.5 group-hover:bg-[#0B3A78] group-hover:text-white transition">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-700">Add Money</span>
            </button>

            <button
              onClick={() => showToast('Displaying all settled wallet ledgers', 'info')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-blue-300 transition flex flex-col items-center group active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D9A928] flex items-center justify-center mb-1.5 group-hover:bg-[#D9A928] group-hover:text-[#061A33] transition">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-700">Transactions</span>
            </button>

            <button
              onClick={() => openModal('referral')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-blue-300 transition flex flex-col items-center group active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:bg-emerald-600 group-hover:text-white transition">
                <Tag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-700">Coupons</span>
            </button>

            <button
              onClick={() => openModal('referral')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-blue-300 transition flex flex-col items-center group active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5 group-hover:bg-purple-600 group-hover:text-white transition">
                <History className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-700">History</span>
            </button>
          </div>

          {/* Add Money Modal Sheet */}
          {showAddMoney && (
            <div className="bg-white rounded-3xl p-4 border border-blue-200 shadow-md space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#061A33]">Instant Wallet Top-Up</h4>
                <button
                  onClick={() => setShowAddMoney(false)}
                  className="text-xs text-slate-400 font-bold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleTopUp} className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-extrabold text-slate-400">₹</span>
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-[#061A33] focus:outline-none"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {[200, 500, 1000, 2000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`flex-1 py-1 rounded-lg border text-[11px] font-bold transition ${
                        topUpAmount === amt
                          ? 'bg-[#061A33] text-white border-[#061A33]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      +₹{amt}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-xl font-bold text-xs shadow transition"
                >
                  Add ₹{topUpAmount} via UPI / NetBanking
                </button>
              </form>
            </div>
          )}

          {/* 3. Recent Transactions List (Matching Reference Mockup Screen 11) */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#061A33]">Recent Transactions</h3>
              <span className="text-[10px] text-[#0B3A78] font-bold">View All</span>
            </div>

            <div className="space-y-2.5">
              {walletTransactions.map((tx) => {
                const isCredit = tx.type === 'CREDIT';
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F7F8FA] transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isCredit
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}
                      >
                        {isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#061A33]">{tx.title}</h4>
                        <p className="text-[10px] text-slate-400">{tx.timestamp}</p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-extrabold ${
                        isCredit ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isCredit ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Security Notice */}
        <div className="p-3 bg-white border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            100% RBI regulated escrow & instant refund guarantee
          </p>
        </div>
      </div>
    </div>
  );
};
