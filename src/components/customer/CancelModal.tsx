import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  ArrowLeft,
  XCircle,
  AlertTriangle,
  Wallet,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface CancelModalProps {
  booking: Booking;
  onClose: () => void;
}

export const CancelModal: React.FC<CancelModalProps> = ({ booking, onClose }) => {
  const { cancelBooking } = useApp();

  const reasons = [
    'Changed plans / Not available at home',
    'Booked by mistake',
    'Professional is running late',
    'Found another alternate service',
    'Price issue or coupon was not applied',
    'Other reason'
  ];

  const [selectedReason, setSelectedReason] = useState(reasons[0]);
  const [customReason, setCustomReason] = useState('');

  const handleConfirmCancel = () => {
    const finalReason = selectedReason === 'Other reason' && customReason ? customReason : selectedReason;
    cancelBooking(booking.id, finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 to-[#061A33] text-white px-4 py-3.5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
              <XCircle className="w-4 h-4 text-amber-300" />
              <span>Cancel Booking</span>
            </h2>
            <p className="text-[10px] text-red-100">Booking #{booking.bookingCode}</p>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Refund Notice Banner */}
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-start gap-2.5">
            <Wallet className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 text-xs">100% Instant Wallet Refund</h4>
              <p className="text-[10px] text-emerald-700 mt-0.5">
                ₹{booking.priceBreakdown.totalAmount} will be immediately returned to your Vihaan Wallet.
              </p>
            </div>
          </div>

          {/* Cancellation Reasons */}
          <div>
            <label className="block font-bold text-[#061A33] mb-2 uppercase tracking-wider text-[11px]">
              Please tell us the reason:
            </label>
            <div className="space-y-1.5">
              {reasons.map((r, idx) => {
                const isSelected = selectedReason === r;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedReason(r)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{r}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedReason === 'Other reason' && (
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Please provide details..."
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs focus:outline-none"
            />
          )}

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfirmCancel}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow transition"
            >
              Confirm Cancellation & Refund
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs"
            >
              Keep My Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
