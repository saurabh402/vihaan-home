import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Gift,
  Copy,
  Share2,
  Users,
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ReferralModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { customerData, showToast } = useApp();

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(customerData.referralCode);
    showToast(`Referral code ${customerData.referralCode} copied!`, 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Vihaan Home Services',
        text: `Use my invite code ${customerData.referralCode} to get ₹200 OFF on your first booking!`,
        url: window.location.href
      });
    } else {
      handleCopyCode();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-md">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
              <Gift className="w-4 h-4 text-[#F5D36A]" />
              <span>Refer & Earn ₹200</span>
            </h2>
            <p className="text-[10px] text-slate-300">Invite Friends & Family</p>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5 text-xs text-center">
          {/* Visual Gift Illustration */}
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto border-2 border-[#D9A928]/40 shadow-sm ring-8 ring-amber-50/50">
            <Gift className="w-10 h-10 text-[#D9A928]" />
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-[#061A33]">
              Earn ₹200 For Every Friend
            </h3>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Give your friends 20% off on their first booking, and you will receive ₹200 in your Vihaan Wallet once they complete their service.
            </p>
          </div>

          {/* Referral Code Box */}
          <div className="bg-[#F7F8FA] p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400">Your Referral Code</span>
              <p className="font-mono font-extrabold text-[#061A33] text-base tracking-widest mt-0.5">
                {customerData.referralCode}
              </p>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-3.5 py-1.5 bg-[#061A33] text-[#F5D36A] rounded-xl font-bold flex items-center gap-1 shadow hover:bg-[#0B3A78] transition"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100">
              <span className="text-xl font-extrabold text-[#0B3A78]">3</span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">Friends Invited</span>
            </div>
            <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-100">
              <span className="text-xl font-extrabold text-[#8F6C10]">₹{customerData.referralEarnings}</span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">Rewards Earned</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 bg-white border-t border-slate-200">
          <button
            onClick={handleShare}
            className="w-full py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] text-white rounded-2xl font-bold text-xs shadow-md transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-[#F5D36A]" />
            <span>Share Invite Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
