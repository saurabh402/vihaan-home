import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, BookingStatus } from '../../types';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  ShieldCheck,
  FileText,
  RotateCcw,
  XCircle,
  Repeat,
  Sparkles,
  Navigation
} from 'lucide-react';

export const BookingHistoryScreen: React.FC<{
  onSelectServiceForRebook: (service: any) => void;
}> = ({ onSelectServiceForRebook }) => {
  const { bookings, openModal, cancelBooking } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'completed' | 'cancelled'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'ongoing') {
      return (
        b.status === 'CONFIRMED' ||
        b.status === 'PROFESSIONAL_ASSIGNED' ||
        b.status === 'ON_THE_WAY' ||
        b.status === 'SERVICE_STARTED'
      );
    }
    if (activeTab === 'completed') return b.status === 'COMPLETED';
    if (activeTab === 'cancelled') return b.status === 'CANCELLED';
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'ON_THE_WAY':
        return (
          <span className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
            ON THE WAY
          </span>
        );
      case 'CONFIRMED':
      case 'PROFESSIONAL_ASSIGNED':
        return (
          <span className="bg-blue-100 text-[#0B3A78] border border-blue-300 font-bold text-[10px] px-2 py-0.5 rounded-full">
            CONFIRMED
          </span>
        );
      case 'SERVICE_STARTED':
        return (
          <span className="bg-purple-100 text-purple-800 border border-purple-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
            IN PROGRESS
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded-full">
            ✓ COMPLETED
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="bg-rose-100 text-rose-800 border border-rose-300 font-bold text-[10px] px-2 py-0.5 rounded-full">
            CANCELLED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-24 pt-2 px-3 sm:px-4 space-y-4 select-none animate-fade-in text-xs">
      {/* Top Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#061A33] tracking-tight">
            Booking History
          </h2>
          <p className="text-[10px] text-slate-400">Manage, track & reorder doorstep visits</p>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 bg-slate-200/60 p-1 rounded-2xl">
        {[
          { id: 'all', label: 'All' },
          { id: 'ongoing', label: 'Active & Ongoing' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-1.5 rounded-xl font-bold transition text-[11px] ${
              activeTab === tab.id
                ? 'bg-white text-[#061A33] shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings Card List */}
      <div className="space-y-3.5">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((bk) => {
            const isOngoing =
              bk.status === 'CONFIRMED' ||
              bk.status === 'PROFESSIONAL_ASSIGNED' ||
              bk.status === 'ON_THE_WAY' ||
              bk.status === 'SERVICE_STARTED';
            const isCompleted = bk.status === 'COMPLETED';

            return (
              <div
                key={bk.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm hover:shadow-card transition space-y-3"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#061A33] text-xs">
                      #{bk.bookingCode}
                    </span>
                    <span className="text-[10px] text-slate-400">• {bk.scheduledDate}</span>
                  </div>
                  {getStatusBadge(bk.status)}
                </div>

                {/* Service Details Snippet */}
                <div className="flex items-center gap-3">
                  <img
                    src={bk.service.image}
                    alt={bk.service.name}
                    className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#061A33] text-xs">{bk.service.name}</h3>
                    <p className="text-[10px] text-slate-500">
                      Partner: {bk.assignedProfessional?.name || 'Assigned Specialist'}
                    </p>
                    <p className="text-xs font-extrabold text-[#061A33] mt-0.5">
                      ₹{bk.priceBreakdown.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Address & Slot */}
                <div className="bg-[#F7F8FA] p-2.5 rounded-xl text-[11px] text-slate-600 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#0B3A78] flex-shrink-0" />
                    <span className="truncate">{bk.customerAddress.flat}, {bk.customerAddress.city}</span>
                  </div>
                  <span className="font-bold text-[#061A33] flex-shrink-0 ml-2">
                    {bk.scheduledTimeSlot}
                  </span>
                </div>

                {/* Action Buttons Matrix */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {isOngoing && (
                    <button
                      onClick={() => openModal('tracking', bk)}
                      className="flex-1 py-2 bg-[#061A33] hover:bg-[#0B3A78] text-white rounded-xl font-bold text-[11px] shadow transition flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#F5D36A]" />
                      <span>Live Track</span>
                    </button>
                  )}

                  {isCompleted && (
                    <>
                      <button
                        onClick={() => openModal('review', bk)}
                        className="flex-1 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#061A33] rounded-xl font-bold text-[11px] transition flex items-center justify-center gap-1"
                      >
                        <Star className="w-3.5 h-3.5 text-[#D9A928] fill-[#D9A928]" />
                        <span>{bk.customerReview ? 'Rated 5⭐' : 'Rate & Review'}</span>
                      </button>

                      <button
                        onClick={() => openModal('invoice', bk)}
                        className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-[11px] transition flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>

                      <button
                        onClick={() => openModal('warranty', bk)}
                        className="py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#0B3A78] rounded-xl font-bold text-[11px] transition flex items-center gap-1 border border-blue-200"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Warranty</span>
                      </button>
                    </>
                  )}

                  {/* Rebook CTA */}
                  <button
                    onClick={() => onSelectServiceForRebook(bk.service)}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-[11px] transition flex items-center gap-1"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    <span>Book Again</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center space-y-2">
            <p className="font-bold text-[#061A33]">No bookings found</p>
            <p className="text-slate-400 text-[11px]">Explore our top home services catalog</p>
          </div>
        )}
      </div>
    </div>
  );
};
