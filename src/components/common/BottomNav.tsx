import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Compass,
  CalendarCheck,
  Wallet,
  User,
  Sparkles,
  Bot
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const { isConciergeOpen, setIsConciergeOpen, bookings, t } = useApp();

  const activeBookingsCount = bookings.filter(
    (b) => b.status === 'CONFIRMED' || b.status === 'PROFESSIONAL_ASSIGNED' || b.status === 'ON_THE_WAY' || b.status === 'SERVICE_STARTED'
  ).length;

  const tabs = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'explore', label: t.navExplore, icon: Compass },
    { id: 'bookings', label: t.navBookings, icon: CalendarCheck, badge: activeBookingsCount },
    { id: 'wallet', label: t.navWallet, icon: Wallet },
    { id: 'profile', label: t.navProfile, icon: User }
  ];

  return (
    <div className="relative">
      {/* Floating Vihaan Concierge AI Pill Button */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <button
          onClick={() => setIsConciergeOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#061A33] hover:bg-[#0B3A78] text-white rounded-full shadow-card border border-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-200 group"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-[#F5D36A]" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-bold text-white tracking-wide">
            {t.vihaanConcierge}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#F5D36A]" />
        </button>
      </div>

      {/* Bottom Bar */}
      <nav className="bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-2 py-2 flex items-center justify-around shadow-card">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-[#061A33] font-bold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#0B3A78]' : 'text-slate-400'
                  }`}
                />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 bg-[#D9A928] text-[#061A33] text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[10px] mt-1 transition-colors ${
                  isActive ? 'text-[#0B3A78] font-bold' : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-[#D9A928] rounded-full absolute -bottom-0.5"></span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
