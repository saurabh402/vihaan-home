import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  KeyRound,
  X,
  UserCheck,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const DemoCredentialsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { loginAsDemo, showToast } = useApp();

  const handleQuickLogin = (role: 'CUSTOMER' | 'PROFESSIONAL' | 'ADMIN') => {
    loginAsDemo(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fade-in">
      <div className="bg-[#061A33] border border-[#D9A928]/50 text-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 animate-scale-up relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#F5D36A]" />
            <h3 className="font-extrabold text-sm text-white">Development Demo Credentials</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Section 59 of Build Specification — One-click instantaneous sandbox role access:
        </p>

        {/* 3 Role Cards */}
        <div className="space-y-2.5 text-xs">
          {/* Customer */}
          <div className="bg-[#0B254A]/80 border border-blue-400/30 p-3 rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <UserCheck className="w-4 h-4 text-[#F5D36A]" />
                <span>Customer: Rahul Sharma</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">customer@vihaan.demo • OTP: 123456</p>
            </div>
            <button
              onClick={() => handleQuickLogin('CUSTOMER')}
              className="px-3 py-1.5 bg-[#D9A928] text-[#061A33] font-bold rounded-xl text-[11px] shadow hover:scale-105 transition"
            >
              Sign In →
            </button>
          </div>

          {/* Professional */}
          <div className="bg-[#0B254A]/80 border border-blue-400/30 p-3 rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Briefcase className="w-4 h-4 text-[#F5D36A]" />
                <span>Partner Pro: Rohit Kumar</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">professional@vihaan.demo • Demo@123</p>
            </div>
            <button
              onClick={() => handleQuickLogin('PROFESSIONAL')}
              className="px-3 py-1.5 bg-[#D9A928] text-[#061A33] font-bold rounded-xl text-[11px] shadow hover:scale-105 transition"
            >
              Sign In →
            </button>
          </div>

          {/* Super Admin */}
          <div className="bg-[#0B254A]/80 border border-blue-400/30 p-3 rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-[#F5D36A]" />
                <span>Super Admin: Sanjay Verma</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">admin@vihaan.demo • Demo@123</p>
            </div>
            <button
              onClick={() => handleQuickLogin('ADMIN')}
              className="px-3 py-1.5 bg-[#D9A928] text-[#061A33] font-bold rounded-xl text-[11px] shadow hover:scale-105 transition"
            >
              Sign In →
            </button>
          </div>
        </div>

        <div className="pt-2 text-center">
          <span className="text-[10px] text-slate-400">Universal test OTP password: <strong>123456</strong></span>
        </div>
      </div>
    </div>
  );
};
