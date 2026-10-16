import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Calendar,
  MapPin,
  Wallet,
  Sparkles,
  Tag,
  Star,
  Headphones,
  Shield,
  Globe,
  LogOut,
  ChevronRight,
  Edit2,
  CheckCircle2
} from 'lucide-react';

export const ProfileScreen: React.FC<{
  onOpenTab: (tab: string) => void;
}> = ({ onOpenTab }) => {
  const {
    customerData,
    walletBalance,
    rewardPoints,
    membership,
    language,
    setLanguage,
    openModal,
    logout,
    showToast
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(customerData.name);
  const [email, setEmail] = useState(customerData.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    customerData.name = name;
    customerData.email = email;
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="pb-24 pt-2 px-3 sm:px-4 space-y-4 select-none animate-fade-in text-xs">
      {/* Top Profile Card */}
      <div className="bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] text-white p-5 rounded-3xl shadow-lg border border-[#D9A928]/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9A928]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-3.5 relative z-10">
          <img
            src={customerData.avatar}
            alt={customerData.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-[#D9A928] shadow-md"
          />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-white">{customerData.name}</h2>
              {membership.isActive && (
                <span className="bg-[#D9A928] text-[#061A33] font-black text-[9px] px-1.5 py-0.2 rounded-full">
                  GOLD
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">{customerData.phone}</p>
            <p className="text-[11px] text-slate-300">{customerData.email}</p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            title="Edit Profile"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Wallet Stats in Profile */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-700/80 text-center">
          <div
            onClick={() => openModal('wallet')}
            className="bg-white/10 rounded-2xl p-2 cursor-pointer hover:bg-white/20 transition"
          >
            <span className="text-[10px] text-slate-300 font-medium">Wallet Balance</span>
            <span className="text-sm font-extrabold text-[#F5D36A] block">
              ₹{walletBalance}
            </span>
          </div>

          <div
            onClick={() => openModal('wallet')}
            className="bg-white/10 rounded-2xl p-2 cursor-pointer hover:bg-white/20 transition"
          >
            <span className="text-[10px] text-slate-300 font-medium">Reward Points</span>
            <span className="text-sm font-extrabold text-[#F5D36A] block">
              {rewardPoints} pts
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3 animate-fade-in">
          <h3 className="font-bold text-[#061A33] text-xs">Edit Profile Information</h3>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs font-semibold focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs font-semibold focus:outline-none"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-[#061A33] text-white rounded-xl font-bold"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Menu Options Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
        <button
          onClick={() => onOpenTab('bookings')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-[#F7F8FA] transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0B3A78] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#061A33]">My Bookings</h4>
              <p className="text-[10px] text-slate-400">Track, rebook & view invoices</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => openModal('vihaanCare')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-[#F7F8FA] transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#D9A928] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#061A33]">Vihaan Care+ Membership</h4>
              <p className="text-[10px] text-slate-400">VIP discounts & zero convenience fee</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => openModal('wallet')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-[#F7F8FA] transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#061A33]">Wallet & Cashbacks</h4>
              <p className="text-[10px] text-slate-400">Balance: ₹{walletBalance} • {rewardPoints} pts</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => openModal('referral')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-[#F7F8FA] transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#061A33]">Refer & Earn ₹200</h4>
              <p className="text-[10px] text-slate-400">Share your invite code with friends</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => openModal('support')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-[#F7F8FA] transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#061A33]">24x7 Customer Support</h4>
              <p className="text-[10px] text-slate-400">Helpline, FAQs & support tickets</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Language Selector in Profile */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 space-y-2">
        <h4 className="font-bold text-[#061A33] flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-[#0B3A78]" />
          <span>App Language / भाषा</span>
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'en', label: 'English' },
            { id: 'hi', label: 'हिन्दी (Hindi)' },
            { id: 'hinglish', label: 'Hinglish' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setLanguage(l.id as any);
                showToast(`Language set to ${l.label}`, 'info');
              }}
              className={`py-2 rounded-xl text-center font-bold border transition ${
                language === l.id
                  ? 'bg-[#061A33] text-white border-[#061A33]'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sign Out CTA */}
      <button
        onClick={logout}
        className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold text-xs border border-red-200 transition flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out from Vihaan</span>
      </button>
    </div>
  );
};
