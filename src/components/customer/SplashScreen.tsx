import React, { useEffect } from 'react';
import { VihaanLogo } from '../common/VihaanLogo';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative min-h-[700px] h-full w-full bg-[#061A33] flex flex-col items-center justify-between p-8 text-white overflow-hidden select-none">
      {/* Background Gold Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#D9A928]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 right-0 w-64 h-64 bg-[#0B3A78]/30 rounded-full blur-2xl pointer-events-none"></div>

      {/* Decorative Gold Arc waves */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none">
          <path
            d="M-50 400 C 100 350, 300 450, 450 380"
            stroke="url(#splashWave)"
            strokeWidth="2"
          />
          <path
            d="M-50 450 C 150 400, 250 500, 450 430"
            stroke="url(#splashWave)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="splashWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D36A" />
              <stop offset="100%" stopColor="#B88A1A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top spacer */}
      <div className="pt-8"></div>

      {/* Center Logo */}
      <div className="flex flex-col items-center z-10 animate-fade-in text-center">
        <VihaanLogo size="xl" theme="light" />
        <div className="mt-6 space-y-1">
          <p className="text-sm font-medium text-[#F5D36A] tracking-wider uppercase">
            Your Home, Our Care.
          </p>
          <p className="text-xs text-slate-300 font-normal">
            Professional Services at Your Doorstep.
          </p>
        </div>
      </div>

      {/* Bottom Loading Dots */}
      <div className="flex flex-col items-center gap-3 pb-8 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D9A928] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5D36A] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#D9A928] animate-bounce"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-slate-500 animate-pulse"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700 animate-pulse"></span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium tracking-widest uppercase">
          Loading Experience...
        </span>
      </div>
    </div>
  );
};
