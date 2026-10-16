import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VihaanLogo } from '../common/VihaanLogo';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Crown,
  ShieldCheck,
  Gift,
  Zap,
  Headphones,
  Award
} from 'lucide-react';

export const VihaanCareModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { membership, upgradeMembership, cancelMembership, showToast } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedTier, setSelectedTier] = useState<'GOLD' | 'PLATINUM'>('GOLD');

  const benefitsList = [
    { title: 'Priority Booking', desc: 'Guaranteed express slots within 45-60 mins' },
    { title: 'Exclusive VIP Offers', desc: 'Up to 30% additional discount on all categories' },
    { title: 'Free Inspection Visit', desc: 'Complimentary quarterly diagnostic checkup' },
    { title: 'Zero Convenience Fee', desc: 'No platform or rush charges on any order' },
    { title: 'Birthday Special Gift', desc: '₹500 free doorstep salon / spa gift voucher' },
    { title: 'VIP Support Desk', desc: 'Direct direct-line phone connection under 10 seconds' }
  ];

  const handleJoin = () => {
    upgradeMembership(selectedTier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 overflow-y-auto select-none">
      <div className="bg-[#061A33] text-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up border border-[#D9A928]/40 max-h-[94vh]">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#061A33]/90 backdrop-blur-md z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
              <span>Vihaan Care</span>
              <Sparkles className="w-4 h-4 text-[#F5D36A]" />
            </h2>
            <p className="text-[10px] text-slate-400">Our Premium Membership</p>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4 text-xs">
          {/* Luxury Gold Member Pass Card (Matching Reference Mockup Screen 10) */}
          <div className="rounded-3xl bg-gradient-to-br from-[#121E2E] via-[#1B2B3F] to-[#0A1422] p-5 border-2 border-[#D9A928] shadow-gold-glow relative overflow-hidden">
            {/* Monogram / Watermark in Background */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-15 pointer-events-none">
              <Crown className="w-full h-full text-[#F5D36A]" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D9A928] to-[#F5D36A] flex items-center justify-center text-[#061A33] shadow-md">
                  <Crown className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#F5D36A] tracking-wider font-serif">
                    Care+
                  </h3>
                  <span className="text-[10px] tracking-widest uppercase font-extrabold text-white/80">
                    GOLD MEMBER
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-[#D9A928]/20 border border-[#D9A928] text-[#F5D36A] rounded-full text-[10px] font-extrabold uppercase">
                {membership.isActive ? 'ACTIVE PLAN' : 'VIP PASS'}
              </span>
            </div>

            {/* Checklist of Perks (Matching Reference Mockup Screen 10) */}
            <div className="space-y-2 border-t border-slate-700/60 pt-3 text-slate-200">
              {benefitsList.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#F5D36A] flex-shrink-0" />
                  <span className="font-semibold text-white">{b.title}</span>
                </div>
              ))}
            </div>

            {/* Price Box */}
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-[#F5D36A]">
                    {billingCycle === 'annual' ? '₹499' : '₹599'}
                  </span>
                  <span className="text-slate-400 text-xs">/ Month</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {billingCycle === 'annual' ? 'Billed Annually (Save ₹1,200)' : 'Billed Monthly'}
                </span>
              </div>

              {/* Billing toggle */}
              <div className="flex items-center bg-[#061A33] p-0.5 rounded-xl border border-slate-700 text-[10px]">
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    billingCycle === 'annual' ? 'bg-[#D9A928] text-[#061A33]' : 'text-slate-400'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-2 py-1 rounded-lg font-bold transition ${
                    billingCycle === 'monthly' ? 'bg-[#D9A928] text-[#061A33]' : 'text-slate-400'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>

          {/* Tier Selection */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedTier('GOLD')}
              className={`p-3 rounded-2xl border text-left transition ${
                selectedTier === 'GOLD'
                  ? 'bg-gradient-to-b from-[#182B44] to-[#0E1A2B] border-[#D9A928] text-white shadow-md'
                  : 'bg-[#0E1A2B]/60 border-slate-800 text-slate-400'
              }`}
            >
              <span className="block text-xs font-bold text-[#F5D36A]">Care+ Gold</span>
              <span className="text-[11px] font-semibold text-slate-300">₹499 / mo</span>
            </button>

            <button
              onClick={() => setSelectedTier('PLATINUM')}
              className={`p-3 rounded-2xl border text-left transition ${
                selectedTier === 'PLATINUM'
                  ? 'bg-gradient-to-b from-[#182B44] to-[#0E1A2B] border-[#D9A928] text-white shadow-md'
                  : 'bg-[#0E1A2B]/60 border-slate-800 text-slate-400'
              }`}
            >
              <span className="block text-xs font-bold text-[#F5D36A]">Care+ Platinum</span>
              <span className="text-[11px] font-semibold text-slate-300">₹899 / mo</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA (Matching Reference Mockup Screen 10) */}
        <div className="p-4 bg-[#040F20] border-t border-slate-800 space-y-2">
          <button
            onClick={handleJoin}
            className="w-full py-3.5 bg-gradient-to-r from-[#D9A928] via-[#E5B842] to-[#B88A1A] hover:brightness-110 text-[#061A33] rounded-2xl font-extrabold text-sm shadow-gold-glow transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>{membership.isActive ? 'Upgrade Membership' : 'Join Now'}</span>
            <Sparkles className="w-4 h-4 fill-[#061A33]" />
          </button>

          {membership.isActive && (
            <button
              onClick={cancelMembership}
              className="w-full text-center text-xs text-slate-500 hover:text-red-400 pt-1 transition"
            >
              Cancel Membership
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
