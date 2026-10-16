import React from 'react';
import { VihaanLogo } from '../common/VihaanLogo';
import { Sparkles, ShieldCheck, Clock, Award } from 'lucide-react';

export const OnboardingScreen: React.FC<{
  onGetStarted: () => void;
  onLogin: () => void;
}> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-[700px] h-full w-full bg-white flex flex-col justify-between p-6 select-none animate-fade-in">
      {/* Top Brand Logo */}
      <div className="flex flex-col items-center pt-4">
        <VihaanLogo size="lg" theme="dark" />
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-[#061A33] tracking-tight">
            Welcome to Vihaan
          </h2>
          <p className="text-xs text-[#D9A928] font-bold uppercase tracking-wider mt-0.5">
            Home Services
          </p>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Premium Services for Your Beautiful Home
          </p>
        </div>
      </div>

      {/* Hero Image Showcase (Matching Reference Mockup Living Room) */}
      <div className="relative my-4 rounded-3xl overflow-hidden shadow-card border border-slate-100 group">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&auto=format&fit=crop&q=80"
          alt="Modern Beautiful Living Room"
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A33]/80 via-transparent to-transparent flex items-end p-4">
          <div className="grid grid-cols-3 gap-2 w-full text-center">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0B3A78] mx-auto mb-0.5" />
              <p className="text-[10px] font-bold text-[#061A33]">100% Verified</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-sm">
              <Clock className="w-4 h-4 text-[#D9A928] mx-auto mb-0.5" />
              <p className="text-[10px] font-bold text-[#061A33]">90 Min SOS</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-sm">
              <Award className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
              <p className="text-[10px] font-bold text-[#061A33]">7-Day Cover</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Actions */}
      <div className="space-y-3 pb-4">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] hover:from-[#0B3A78] hover:to-[#061A33] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Get Started</span>
          <Sparkles className="w-4 h-4 text-[#F5D36A]" />
        </button>

        <div className="text-center">
          <span className="text-xs text-slate-500 font-medium">Already have an account? </span>
          <button
            onClick={onLogin}
            className="text-xs text-[#0B3A78] font-bold hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
