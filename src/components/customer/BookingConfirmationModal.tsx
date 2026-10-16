import React from 'react';
import { Booking } from '../../types';
import { Check, ArrowRight, Home, Calendar, Clock, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface BookingConfirmationModalProps {
  booking: Booking;
  onTrackBooking: (booking: Booking) => void;
  onBackToHome: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onTrackBooking,
  onBackToHome
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl text-center space-y-5 animate-scale-up border border-slate-100 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D9A928]/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Animated Checkmark Circle (Matching Reference Mockup Screen 8) */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-[#061A33] flex items-center justify-center text-white shadow-xl ring-8 ring-blue-50/80">
          <Check className="w-10 h-10 text-[#F5D36A] stroke-[3]" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#D9A928] rounded-full flex items-center justify-center shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#061A33]" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-xl font-extrabold text-[#061A33] tracking-tight">
            Booking Confirmed!
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Your booking has been placed successfully
          </p>
        </div>

        {/* Booking Details Card (Matching Reference Mockup Screen 8) */}
        <div className="bg-[#F7F8FA] rounded-2xl p-4 border border-slate-200/80 space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Booking ID
            </span>
            <span className="text-sm font-extrabold text-[#061A33] tracking-wide">
              {booking.bookingCode}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#0B3A78]" />
              <span className="font-semibold text-[#061A33]">{booking.scheduledDate}</span>
              <span className="text-slate-300">•</span>
              <Clock className="w-3.5 h-3.5 text-[#0B3A78]" />
              <span className="font-semibold text-[#061A33]">{booking.scheduledTimeSlot}</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D9A928]" />
              <span className="truncate">{booking.service.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate text-[11px] text-slate-500">
                {booking.customerAddress.flat}, {booking.customerAddress.street}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-center">
            <p className="text-[10px] text-slate-400 italic">
              We will notify you before we arrive
            </p>
          </div>
        </div>

        {/* Action CTAs (Matching Reference Mockup Screen 8) */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => onTrackBooking(booking)}
            className="w-full py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] hover:from-[#0B3A78] hover:to-[#061A33] text-white rounded-2xl font-bold text-xs shadow-md hover:shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Track Booking</span>
            <ArrowRight className="w-4 h-4 text-[#F5D36A]" />
          </button>

          <button
            onClick={onBackToHome}
            className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-[#061A33] transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
