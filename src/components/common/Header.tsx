import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VihaanLogo } from './VihaanLogo';
import { CITIES_LIST } from '../../data/mockData';
import {
  MapPin,
  ChevronDown,
  Bell,
  Wallet,
  Sparkles,
  Search,
  Mic,
  ShieldCheck,
  User,
  LogOut,
  Calendar
} from 'lucide-react';

export const Header: React.FC<{
  onOpenSearch?: () => void;
  onOpenVoiceAI?: () => void;
}> = ({ onOpenSearch, onOpenVoiceAI }) => {
  const {
    customerData,
    currentRole,
    selectedCity,
    setSelectedCity,
    walletBalance,
    notifications,
    openModal,
    logout,
    setIsConciergeOpen,
    viewMode
  } = useApp();

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* Top Bar for Desktop or Mobile */}
      <div className="px-4 py-3 flex items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Left: Brand or Greeting */}
        <div className="flex items-center gap-3">
          {viewMode === 'responsive-desktop' ? (
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => openModal('home')}>
              <VihaanLogo size="sm" />
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                Good Morning 👋
              </span>
              <span className="text-base font-bold text-[#061A33] tracking-tight">
                {currentRole === 'CUSTOMER' ? customerData.name : currentRole === 'PROFESSIONAL' ? 'Rohit Kumar (Pro)' : 'Admin Portal'}
              </span>
            </div>
          )}

          {/* Location Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-1 text-xs font-semibold text-[#0B3A78] bg-[#F0F5FF] hover:bg-[#E8F0FE] px-2.5 py-1.5 rounded-full border border-blue-100 transition"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D9A928] flex-shrink-0" />
              <span className="truncate max-w-[110px]">{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fade-in">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Operating City
                </div>
                {CITIES_LIST.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F7F8FA] transition ${
                      selectedCity === city ? 'font-bold text-[#0B3A78] bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#D9A928]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2">
          {/* Care+ Gold Badge */}
          {customerData.membership.isActive && currentRole === 'CUSTOMER' && (
            <button
              onClick={() => openModal('vihaanCare')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-[#D9A928]/15 to-[#F5D36A]/20 border border-[#D9A928]/50 text-[#8F6C10] rounded-full text-xs font-bold hover:scale-105 transition shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D9A928] fill-[#D9A928]" />
              <span>Care+ Gold</span>
            </button>
          )}

          {/* Wallet Pill */}
          <button
            onClick={() => openModal('wallet')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F7F8FA] hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-[#061A33] transition"
          >
            <Wallet className="w-3.5 h-3.5 text-[#D9A928]" />
            <span>₹{walletBalance}</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => openModal('notifications')}
            className="relative p-2 bg-[#F7F8FA] hover:bg-slate-100 border border-slate-200 rounded-full text-slate-700 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="relative flex items-center focus:outline-none"
            >
              <img
                src={currentRole === 'CUSTOMER' ? customerData.avatar : currentRole === 'PROFESSIONAL' ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#D9A928]/40 shadow-sm"
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-bold text-[#061A33] text-sm truncate">{customerData.name}</p>
                  <p className="text-slate-400 text-[11px] truncate">{customerData.phone}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      openModal('profile');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F8FA] flex items-center gap-2.5 text-slate-700 font-medium"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      openModal('bookings');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F8FA] flex items-center gap-2.5 text-slate-700 font-medium"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Booking History</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      openModal('vihaanCare');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F8FA] flex items-center gap-2.5 text-slate-700 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D9A928]" />
                    <span>Care+ Gold Pass</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      openModal('support');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F8FA] flex items-center gap-2.5 text-slate-700 font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Help & Support</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
