import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Smartphone,
  Monitor,
  ShieldCheck,
  UserCheck,
  Briefcase,
  Globe,
  Sparkles,
  KeyRound,
  LogOut
} from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const {
    currentRole,
    switchRole,
    viewMode,
    setViewMode,
    language,
    setLanguage,
    isAuthenticated,
    loginAsDemo,
    logout,
    openModal
  } = useApp();

  const roles: { role: UserRole; label: string; icon: any; badge: string }[] = [
    { role: 'CUSTOMER', label: 'Customer (Rahul)', icon: UserCheck, badge: 'Care+ Gold' },
    { role: 'PROFESSIONAL', label: 'Partner (Rohit)', icon: Briefcase, badge: '4.9 ⭐ Pro' },
    { role: 'ADMIN', label: 'Super Admin', icon: ShieldCheck, badge: 'Control Hub' }
  ];

  return (
    <aside aria-label="Dev Toolbar" className="bg-[#061A33] border-b border-slate-700/80 text-white px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md z-50">
      {/* Brand & Demo Notice */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-[#0B3A78] text-[#F5D36A] px-2 py-0.5 rounded font-semibold border border-[#D9A928]/40">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>VIHAAN v1.0</span>
        </div>
        <span className="hidden sm:inline text-slate-300 font-medium">
          Multi-Role Interactive Marketplace
        </span>
      </div>

      {/* Role Switcher Chips */}
      <div className="flex items-center gap-1.5 bg-[#040F20] p-1 rounded-lg border border-slate-700">
        <span className="text-[11px] text-slate-400 px-1.5 font-medium hidden md:inline">Role:</span>
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = currentRole === r.role && isAuthenticated;
          return (
            <button
              key={r.role}
              onClick={() => loginAsDemo(r.role)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-[#D9A928] to-[#B88A1A] text-[#061A33] shadow-sm font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
              <span
                className={`text-[9px] px-1 py-0.2 rounded ${
                  isActive ? 'bg-[#061A33]/20 text-[#061A33]' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {r.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Controls: View Mode, Language, Demo Credentials */}
      <div className="flex items-center gap-2">
        {/* Device View Mode Toggle */}
        <div className="flex items-center bg-[#040F20] rounded-lg p-0.5 border border-slate-700">
          <button
            onClick={() => setViewMode('mobile-frame')}
            title="Switch to Mobile App Preview (iOS frame)"
            className={`p-1.5 rounded transition ${
              viewMode === 'mobile-frame'
                ? 'bg-[#0B3A78] text-[#F5D36A]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('responsive-desktop')}
            title="Switch to Full Responsive Desktop View"
            className={`p-1.5 rounded transition ${
              viewMode === 'responsive-desktop'
                ? 'bg-[#0B3A78] text-[#F5D36A]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-[#040F20] px-2 py-1 rounded-lg border border-slate-700">
          <Globe className="w-3.5 h-3.5 text-[#D9A928]" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
          >
            <option value="en" className="bg-[#061A33]">EN (English)</option>
            <option value="hi" className="bg-[#061A33]">HI (हिन्दी)</option>
            <option value="hinglish" className="bg-[#061A33]">Hinglish</option>
          </select>
        </div>

        {/* Demo OTP / Creds Modal Trigger */}
        <button
          onClick={() => openModal('demoCredentials')}
          className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-[#F5D36A] hover:bg-amber-500/20 border border-[#D9A928]/40 rounded-lg transition font-medium"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Demo OTP: 123456</span>
        </button>

        {isAuthenticated && (
          <button
            onClick={logout}
            title="Logout"
            className="p-1 text-slate-400 hover:text-red-400 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
};
