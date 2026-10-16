import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Clock,
  Home,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronDown,
  Calendar,
  Award,
  AlertCircle
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem;
  onClose: () => void;
  onBookNow: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookNow
}) => {
  const { favorites, toggleFavoriteService, showToast } = useApp();
  const isFav = favorites.serviceIds.includes(service.id);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const images = service.galleryImages?.length ? service.galleryImages : [service.image];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Service link copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[92vh] select-none">
        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Top Hero Image Gallery (Matching Reference Mockup Screen 6) */}
          <div className="relative h-64 sm:h-72 w-full bg-slate-900">
            <img
              src={images[activeImageIdx]}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Top Navigation Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleFavoriteService(service.id)}
                  className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition ${
                    isFav ? 'bg-red-50 text-red-500' : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Popular Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#D9A928] text-[#061A33] text-[11px] font-extrabold rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-[#061A33]" />
                Popular
              </span>
              <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold rounded-full">
                7-Day Warranty
              </span>
            </div>
          </div>

          {/* Service Info Content Body */}
          <div className="p-4 sm:p-6 space-y-5">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-extrabold text-[#061A33] tracking-tight">
                  {service.name}
                </h1>
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Star className="w-4 h-4 text-[#D9A928] fill-[#D9A928]" />
                  <span className="text-xs font-extrabold text-[#061A33]">{service.rating}</span>
                  <span className="text-[10px] text-slate-500">({service.reviewCount} Reviews)</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-2.5 mt-2">
                <span className="text-2xl font-extrabold text-[#061A33]">
                  ₹{service.price}
                </span>
                {service.originalPrice && (
                  <span className="text-sm line-through text-slate-400 font-medium">
                    ₹{service.originalPrice}
                  </span>
                )}
                {service.discountPercentage && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    {service.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Badges / Specs (60 mins, Expert Barber, At Home) */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
                <div className="bg-[#F7F8FA] rounded-xl p-2 flex flex-col items-center">
                  <Clock className="w-4 h-4 text-[#0B3A78] mb-0.5" />
                  <span className="text-[11px] font-bold text-slate-700">{service.durationMinutes} Mins</span>
                  <span className="text-[9px] text-slate-400">Duration</span>
                </div>
                <div className="bg-[#F7F8FA] rounded-xl p-2 flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#D9A928] mb-0.5" />
                  <span className="text-[11px] font-bold text-slate-700">Verified Pro</span>
                  <span className="text-[9px] text-slate-400">Background Checked</span>
                </div>
                <div className="bg-[#F7F8FA] rounded-xl p-2 flex flex-col items-center">
                  <Home className="w-4 h-4 text-emerald-600 mb-0.5" />
                  <span className="text-[11px] font-bold text-slate-700">Doorstep</span>
                  <span className="text-[9px] text-slate-400">At Home</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-[#061A33] uppercase tracking-wider mb-1">
                Description
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* What's Included (Matching Reference Mockup Screen 6) */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <h3 className="text-xs font-bold text-[#061A33] uppercase tracking-wider mb-2.5">
                Service Includes
              </h3>
              <div className="space-y-2">
                {service.includedItems?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {service.excludedItems && service.excludedItems.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    What's Not Included
                  </h4>
                  <div className="space-y-1.5">
                    {service.excludedItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                        <XCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* In-Home Safety & Quality Assurance */}
            <div className="bg-[#061A33] text-white rounded-2xl p-4 border border-[#D9A928]/40">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-[#F5D36A]" />
                <h4 className="text-xs font-bold text-[#F5D36A]">The Vihaan Promise</h4>
              </div>
              <ul className="text-xs text-slate-200 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A928]"></span>
                  <span>100% Sealed & Sanitized Single-Use Kits</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A928]"></span>
                  <span>7-Day Hassle-free Workmanship Cover</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A928]"></span>
                  <span>Post-Service Area Cleanliness Guarantee</span>
                </li>
              </ul>
            </div>

            {/* FAQs Accordion */}
            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-[#061A33] uppercase tracking-wider mb-2">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-2">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-slate-200 rounded-xl overflow-hidden transition"
                      >
                        <button
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full text-left p-3 flex items-center justify-between text-xs font-bold text-[#061A33] hover:bg-slate-50"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-3 pb-3 text-xs text-slate-600 bg-slate-50/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Booking Bar (Matching Reference Mockup Screen 6) */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex items-center justify-between gap-4 shadow-lg">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">Total Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#061A33]">₹{service.price}</span>
              <span className="text-[11px] text-slate-400 line-through">₹{service.originalPrice}</span>
            </div>
          </div>

          <button
            onClick={() => onBookNow(service)}
            className="flex-1 py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] hover:from-[#0B3A78] hover:to-[#061A33] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Book Now</span>
            <Sparkles className="w-4 h-4 text-[#F5D36A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
