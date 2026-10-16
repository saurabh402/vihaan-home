import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCategory, ServiceItem } from '../../types';
import {
  ArrowLeft,
  Search,
  Star,
  Clock,
  ShieldCheck,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

interface CategoryViewProps {
  category: ServiceCategory;
  onBack: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  onBack,
  onSelectService
}) => {
  const { services, openModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState<'recommended' | 'rating' | 'priceAsc' | 'priceDesc'>('recommended');
  const [filterInstantOnly, setFilterInstantOnly] = useState(false);
  const [filterUnder500, setFilterUnder500] = useState(false);

  // Filter services by category slug/id
  const categoryServices = services.filter((s) => {
    const matchesCat =
      s.categoryId === category.id ||
      category.slug === 'all' ||
      (category.slug === 'emergency' && s.isEmergency);

    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesInstant = filterInstantOnly ? s.isEmergency : true;
    const matchesPrice = filterUnder500 ? s.price <= 500 : true;

    return matchesCat && matchesSearch && matchesInstant && matchesPrice;
  });

  // Sort
  const sortedServices = [...categoryServices].sort((a, b) => {
    if (selectedSort === 'rating') return b.rating - a.rating;
    if (selectedSort === 'priceAsc') return a.price - b.price;
    if (selectedSort === 'priceDesc') return b.price - a.price;
    return 0; // recommended
  });

  return (
    <div className="pb-24 pt-2 px-3 sm:px-4 space-y-4 select-none animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center flex-1">
          <h2 className="text-base font-bold text-[#061A33]">{category.name} Services</h2>
          <p className="text-[10px] text-slate-400">{sortedServices.length} options available</p>
        </div>
        <div className="w-9"></div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200">
        <Search className="w-4 h-4 text-slate-400 ml-2.5 flex-shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search in ${category.name}...`}
          className="w-full bg-transparent py-1.5 text-xs font-semibold text-[#061A33] placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button
          onClick={() => setFilterInstantOnly(!filterInstantOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition ${
            filterInstantOnly
              ? 'bg-[#061A33] text-white border-[#061A33]'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>90-Min Fast Track</span>
        </button>

        <button
          onClick={() => setFilterUnder500(!filterUnder500)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition ${
            filterUnder500
              ? 'bg-[#061A33] text-white border-[#061A33]'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span>Under ₹500</span>
        </button>

        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value as any)}
          className="bg-white border border-slate-200 text-slate-700 text-xs rounded-full px-3 py-1.5 font-semibold focus:outline-none cursor-pointer"
        >
          <option value="recommended">⭐ Recommended</option>
          <option value="rating">Top Rated (4.8+)</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {sortedServices.length > 0 ? (
          sortedServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectService(srv)}
              className="bg-white rounded-3xl p-3.5 border border-slate-100 shadow-sm hover:shadow-card cursor-pointer transition-all hover:border-blue-200 flex gap-3.5 group"
            >
              {/* Thumbnail */}
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {srv.isPopular && (
                  <span className="absolute top-1.5 left-1.5 bg-[#D9A928] text-[#061A33] text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
                    POPULAR
                  </span>
                )}
              </div>

              {/* Service Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-[#061A33] group-hover:text-[#0B3A78] line-clamp-1">
                      {srv.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#061A33]">
                      <Star className="w-3 h-3 text-[#D9A928] fill-[#D9A928]" />
                      <span>{srv.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">({srv.reviewCount})</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] text-slate-500">{srv.durationMinutes} mins</span>
                  </div>

                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-extrabold text-[#061A33]">₹{srv.price}</span>
                    {srv.originalPrice && (
                      <span className="text-[10px] line-through text-slate-400">₹{srv.originalPrice}</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal('booking', { service: srv });
                    }}
                    className="px-3 py-1 bg-[#061A33] group-hover:bg-[#0B3A78] text-white rounded-xl text-xs font-bold shadow transition active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center space-y-2">
            <p className="text-sm font-bold text-[#061A33]">No services matched your filters</p>
            <p className="text-xs text-slate-400">Try adjusting your search or filter tags</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterInstantOnly(false);
                setFilterUnder500(false);
              }}
              className="text-xs text-[#0B3A78] font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
