import React from 'react';
import { useApp } from '../../context/AppContext';
import { Professional } from '../../types';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  Heart
} from 'lucide-react';

interface ProfessionalProfileModalProps {
  professional: Professional;
  onClose: () => void;
  onBook: (pro: Professional) => void;
  onChat: (pro: Professional) => void;
}

export const ProfessionalProfileModal: React.FC<ProfessionalProfileModalProps> = ({
  professional,
  onClose,
  onBook,
  onChat
}) => {
  const { favorites, toggleFavoritePro, showToast } = useApp();
  const isFav = favorites.professionalIds.includes(professional.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Top Bar */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-[#061A33]">Professional Profile</h2>
          <button
            onClick={() => toggleFavoritePro(professional.id)}
            className={`p-1.5 rounded-full transition ${
              isFav ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500' : ''}`} />
          </button>
        </div>

        {/* Content Body (Matching PDF Section 8) */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4 text-xs">
          {/* Profile Card */}
          <div className="text-center space-y-2">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={professional.avatar}
                alt={professional.name}
                className="w-full h-full rounded-full object-cover ring-4 ring-[#D9A928] shadow-lg"
              />
              <span className="w-5 h-5 bg-emerald-500 rounded-full absolute bottom-1 right-1 border-2 border-white flex items-center justify-center text-white text-[10px] font-black">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-base font-extrabold text-[#061A33]">{professional.name}</h3>
                <ShieldCheck className="w-4 h-4 text-[#0B3A78]" />
              </div>
              <p className="text-slate-500 text-xs">{professional.category}</p>
              <p className="text-[11px] text-emerald-700 font-bold mt-0.5">✓ Vihaan Verified Master Partner</p>
            </div>

            {/* Rating Pill */}
            <div className="inline-flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Star className="w-4 h-4 text-[#D9A928] fill-[#D9A928]" />
              <span className="font-extrabold text-xs text-[#061A33]">{professional.rating}</span>
              <span className="text-slate-400 text-[10px]">({professional.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Stats Bar (5+ Years Exp, 1240 Completed Jobs) */}
          <div className="grid grid-cols-3 gap-2 bg-[#F7F8FA] p-3 rounded-2xl border border-slate-200 text-center">
            <div>
              <span className="text-base font-extrabold text-[#061A33] block">
                {professional.experienceYears}+ Yrs
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Experience</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-base font-extrabold text-[#061A33] block">
                {professional.completedJobsCount}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Jobs Done</span>
            </div>
            <div>
              <span className="text-base font-extrabold text-[#061A33] block">
                {professional.languages?.join(', ')}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Languages</span>
            </div>
          </div>

          {/* Specializations Chips */}
          <div>
            <h4 className="font-bold text-[#061A33] uppercase tracking-wider text-[11px] mb-2">
              Specialized Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {professional.specializations?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-blue-50 text-[#0B3A78] font-bold rounded-xl text-[11px] border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio Gallery */}
          {professional.portfolioImages && professional.portfolioImages.length > 0 && (
            <div>
              <h4 className="font-bold text-[#061A33] uppercase tracking-wider text-[11px] mb-2">
                Work Portfolio & Setups
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {professional.portfolioImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Portfolio"
                    className="w-full h-20 rounded-xl object-cover border border-slate-200"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: BOOK, CHAT, CALL (Section 8 of PDF) */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={() => showToast(`Dialing partner ${professional.name}...`, 'info')}
            className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-[#0B3A78] border border-blue-200 transition"
            title="Call"
          >
            <Phone className="w-5 h-5" />
          </button>

          <button
            onClick={() => onChat(professional)}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-[#8F6C10] border border-amber-200 transition"
            title="Chat"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          <button
            onClick={() => onBook(professional)}
            className="flex-1 py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] text-white rounded-2xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Book Rohit</span>
            <Sparkles className="w-4 h-4 text-[#F5D36A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
