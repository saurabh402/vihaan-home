import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory, ServiceItem, OfferBanner } from '../../types';
import { OFFER_BANNERS, PACKAGE_COMBOS } from '../../data/mockData';
import {
  Search,
  Mic,
  Sparkles,
  Star,
  Clock,
  ShieldCheck,
  ChevronRight,
  Zap,
  Repeat,
  Gift,
  Award,
  ArrowRight,
  CheckCircle2,
  Headphones,
  FileText,
  BadgePercent,
  SlidersHorizontal,
  Scissors,
  Flower2,
  SprayCan,
  Wrench,
  ShieldAlert,
  Paintbrush,
  Truck,
  Laptop
} from 'lucide-react';

export const HomeScreen: React.FC<{
  onSelectCategory: (category: ServiceCategory) => void;
  onSelectService: (service: ServiceItem) => void;
  onViewAllCategories: () => void;
}> = ({ onSelectCategory, onSelectService, onViewAllCategories }) => {
  const {
    services,
    categories,
    openModal,
    customerData,
    setIsConciergeOpen,
    favorites,
    toggleFavoriteService,
    activeBooking
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  // Icon mapping for categories
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'salon':
        return <Scissors className="w-5 h-5 text-[#0B3A78]" />;
      case 'beauty':
        return <Sparkles className="w-5 h-5 text-pink-600" />;
      case 'spa':
        return <Flower2 className="w-5 h-5 text-emerald-600" />;
      case 'cleaning':
        return <SprayCan className="w-5 h-5 text-blue-600" />;
      case 'repair':
        return <Wrench className="w-5 h-5 text-amber-600" />;
      case 'pest-control':
        return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'home-improvement':
        return <Paintbrush className="w-5 h-5 text-purple-600" />;
      case 'moving':
        return <Truck className="w-5 h-5 text-indigo-600" />;
      case 'tech-services':
        return <Laptop className="w-5 h-5 text-cyan-600" />;
      case 'emergency':
        return <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#D9A928]" />;
    }
  };

  // Filter services by search if user is typing
  const filteredServices = searchQuery.trim()
    ? services.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const currentBanner = OFFER_BANNERS[activeBannerIdx] || OFFER_BANNERS[0];

  return (
    <div className="pb-24 pt-2 px-3 sm:px-4 space-y-5 select-none animate-fade-in">
      {/* 1. Search Bar with Voice AI Mic (Matching Screenshot) */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200/80 focus-within:border-[#0B3A78] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <Search className="w-4 h-4 text-slate-400 ml-2.5 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for services..."
            className="w-full bg-transparent py-1.5 text-xs font-semibold text-[#061A33] placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsConciergeOpen(true)}
            title="Search with Vihaan AI Voice"
            className="p-2 bg-slate-50 hover:bg-amber-50 rounded-xl text-[#D9A928] border border-amber-200/60 hover:scale-105 active:scale-95 transition"
          >
            <Mic className="w-4 h-4 text-[#D9A928]" />
          </button>
        </div>

        {/* Live Search Autocomplete Dropdown */}
        {searchQuery.trim() && (
          <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 max-h-72 overflow-y-auto animate-fade-in">
            {filteredServices.length > 0 ? (
              <div className="space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Services ({filteredServices.length})
                </div>
                {filteredServices.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      onSelectService(srv);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F7F8FA] cursor-pointer transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={srv.image}
                        alt={srv.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#061A33]">{srv.name}</p>
                        <p className="text-[10px] text-slate-500">₹{srv.price} • {srv.durationMinutes} mins</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                No matching service found for "{searchQuery}". Ask Vihaan Concierge AI!
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Active Tracking Snippet (If customer has live order on the way) */}
      {activeBooking && activeBooking.status === 'ON_THE_WAY' && (
        <div
          onClick={() => openModal('tracking', activeBooking)}
          className="bg-gradient-to-r from-[#061A33] to-[#0B3A78] text-white p-3.5 rounded-2xl shadow-md border border-[#D9A928]/40 flex items-center justify-between cursor-pointer hover:shadow-lg transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-[#D9A928]/50 flex items-center justify-center relative flex-shrink-0">
              <span className="text-xl">🛵</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 animate-ping"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#F5D36A] uppercase tracking-wider bg-amber-400/20 px-1.5 py-0.5 rounded">
                  LIVE STATUS
                </span>
                <span className="text-[11px] text-slate-300">Arriving in 18 mins</span>
              </div>
              <p className="text-xs font-bold text-white mt-0.5">
                {activeBooking.assignedProfessional?.name || 'Rohit Kumar'} is On The Way
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#F5D36A] group-hover:translate-x-1 transition-transform">
            <span>Track</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* 3. Hero Offer Banner (Matching Reference Mockup 20% OFF Gold Gift Box) */}
      <div className="relative rounded-3xl overflow-hidden shadow-card border border-amber-200/40 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#144E9E] p-4 text-white">
        {/* Ambient Gold Glows */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#D9A928]/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-[62%]">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-[#D9A928]/50 text-[#F5D36A] text-[10px] font-extrabold uppercase tracking-wider">
              <span>🔥</span>
              <span>{currentBanner.badge}</span>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
              {currentBanner.title}
            </h3>

            <p className="text-[11px] text-slate-200 line-clamp-1">
              {currentBanner.subtitle}
            </p>

            <button
              onClick={() => {
                if (currentBanner.couponCode) {
                  openModal('booking', { service: services[0], coupon: currentBanner.couponCode });
                } else {
                  openModal('vihaanCare');
                }
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#D9A928] to-[#B88A1A] text-[#061A33] rounded-xl text-xs font-extrabold shadow-md hover:scale-105 active:scale-95 transition"
            >
              <span>{currentBanner.ctaText}</span>
            </button>
          </div>

          {/* 3D Realistic Gold Gift Box / Luxury Visual */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center relative">
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80"
              alt="Special Gift Box"
              className="w-full h-full object-cover rounded-2xl border border-amber-300/40 shadow-lg"
            />
            <div className="absolute -top-1 -right-1 bg-[#D9A928] text-[#061A33] text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
              20% OFF
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {OFFER_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBannerIdx(idx)}
              className={`h-1.5 rounded-full transition-all ${
                activeBannerIdx === idx ? 'w-5 bg-[#D9A928]' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 4. Categories Grid (Matching Reference Mockup Icons) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#061A33] tracking-tight">Categories</h3>
          <button
            onClick={onViewAllCategories}
            className="text-xs font-semibold text-[#0B3A78] hover:text-[#061A33] flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="flex flex-col items-center p-2 rounded-2xl bg-white hover:bg-blue-50/50 border border-slate-100 hover:border-blue-100 shadow-sm transition-all group active:scale-95 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F7F8FA] group-hover:bg-white group-hover:shadow-md flex items-center justify-center transition-all mb-1.5 border border-slate-100">
                {getCategoryIcon(cat.slug)}
              </div>
              <span className="text-[11px] font-bold text-slate-800 line-clamp-1 group-hover:text-[#0B3A78]">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Quick Book Cards (Matching Reference Mockup Haircut, Deep Cleaning, Full Body Spa) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-[#061A33] tracking-tight">Quick Book</h3>
            <span className="px-1.5 py-0.5 bg-blue-100 text-[#0B3A78] text-[9px] font-bold rounded">
              TOP RATED
            </span>
          </div>
          <button
            onClick={onViewAllCategories}
            className="text-xs font-semibold text-[#0B3A78] hover:text-[#061A33] flex items-center gap-0.5"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {services.slice(0, 3).map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectService(srv)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card border border-slate-100 p-2 cursor-pointer transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
            >
              <div className="relative rounded-xl overflow-hidden mb-2 aspect-square">
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-full flex items-center gap-0.5 text-[9px] font-bold text-white">
                  <Star className="w-2.5 h-2.5 text-[#D9A928] fill-[#D9A928]" />
                  <span>{srv.rating}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#061A33] line-clamp-1 group-hover:text-[#0B3A78]">
                  {srv.name}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  from <span className="font-bold text-[#061A33]">₹{srv.price}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Vihaan Care+ Membership Pass Card (Matching Reference Screen 10) */}
      <div
        onClick={() => openModal('vihaanCare')}
        className="rounded-3xl bg-gradient-to-br from-[#061A33] via-[#0B254A] to-[#1A1A1A] p-4 text-white shadow-lg border border-[#D9A928]/40 relative overflow-hidden cursor-pointer hover:border-[#D9A928] transition group"
      >
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#D9A928]/15 rounded-full blur-2xl"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D9A928]/20 border border-[#D9A928]/60 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#F5D36A]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-[#F5D36A] uppercase">
                Care+ Premium
              </span>
              <h4 className="text-sm font-extrabold text-white">Vihaan Care+ Membership</h4>
            </div>
          </div>
          <span className="text-xs font-extrabold text-[#D9A928] bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
            ₹499 / mo
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-200 mb-3">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#F5D36A]" />
            <span>Priority Booking</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#F5D36A]" />
            <span>Up to 30% Extra Off</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#F5D36A]" />
            <span>Free Inspection Visit</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#F5D36A]" />
            <span>Zero Convenience Fee</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
          <span className="text-[10px] text-slate-400">Save up to ₹4,000/year</span>
          <button className="px-3 py-1 bg-gradient-to-r from-[#D9A928] to-[#B88A1A] text-[#061A33] rounded-xl text-xs font-bold shadow group-hover:scale-105 transition">
            Join Now →
          </button>
        </div>
      </div>

      {/* 7. Emergency 90-Min Fast Booking Banner */}
      <div
        onClick={() => openModal('emergencyBooking')}
        className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent border border-red-200 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-red-50 transition"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md flex-shrink-0 animate-pulse">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold text-red-700">90-MIN EMERGENCY SOS</span>
              <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 rounded-full">FAST SLA</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Urgent Plumber, Electrician & Locksmith dispatched in 90 minutes.
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-red-600" />
      </div>

      {/* 8. Repeat Booking ("Book Again") (Section 18 of PDF) */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#061A33]">
            <Repeat className="w-4 h-4 text-[#0B3A78]" />
            <span>Book Again</span>
          </div>
          <span className="text-[10px] text-slate-400">Last booked: 24 May</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={services[0].image}
              alt="Haircut"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h4 className="text-xs font-bold text-[#061A33]">{services[0].name}</h4>
              <p className="text-[11px] text-slate-500">₹{services[0].price} • Rohit Kumar (Barber)</p>
            </div>
          </div>
          <button
            onClick={() => openModal('booking', { service: services[0] })}
            className="px-3.5 py-1.5 bg-[#061A33] hover:bg-[#0B3A78] text-white rounded-xl text-xs font-bold shadow transition active:scale-95"
          >
            BOOK AGAIN
          </button>
        </div>
      </div>

      {/* 9. Packages & Combos (Section 20 of PDF) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#061A33] tracking-tight">Packages & Combos</h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            SAVE UP TO ₹700
          </span>
        </div>

        <div className="space-y-2.5">
          {PACKAGE_COMBOS.map((combo) => (
            <div
              key={combo.id}
              onClick={() => openModal('booking', { service: services[1] })}
              className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex items-center justify-between gap-3 hover:border-blue-200 cursor-pointer transition group"
            >
              <img
                src={combo.image}
                alt={combo.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-[#061A33] group-hover:text-[#0B3A78]">
                    {combo.title}
                  </h4>
                  {combo.popularBadge && (
                    <span className="text-[8px] font-extrabold bg-[#D9A928] text-[#061A33] px-1 rounded">
                      {combo.popularBadge}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{combo.subtitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-extrabold text-[#061A33]">₹{combo.comboPrice}</span>
                  <span className="text-[10px] line-through text-slate-400">₹{combo.originalPrice}</span>
                  <span className="text-[10px] font-bold text-emerald-600">Save ₹{combo.savings}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          ))}
        </div>
      </div>

      {/* 10. Bottom Verified Highlights Bar (Matching Reference Mockup Bottom Strip) */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
        <div className="text-center mb-3">
          <p className="text-xs font-bold text-[#061A33]">The Vihaan Quality Standard</p>
          <p className="text-[10px] text-slate-400">One App • Many Services • Endless Comfort</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 text-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0B3A78] mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-700">Verified Pros</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-[#D9A928] mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-700">Easy Booking</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-700">7-Day Warranty</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-1">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-700">Real-Time Track</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-[#D9A928] mb-1">
              <Gift className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-700">Loyalty Cash</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-1">
              <Headphones className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-700">24x7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};
