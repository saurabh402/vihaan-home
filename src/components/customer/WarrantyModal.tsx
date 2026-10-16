import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';

interface WarrantyModalProps {
  booking: Booking;
  onClose: () => void;
}

export const WarrantyModal: React.FC<WarrantyModalProps> = ({ booking, onClose }) => {
  const { raiseWarrantyClaim, showToast } = useApp();
  const [claimReason, setClaimReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const warranty = booking.warrantyDetails || {
    warrantyId: 'WAR-' + booking.bookingCode,
    bookingId: booking.id,
    serviceName: booking.service.name,
    durationDays: 7,
    startDate: booking.scheduledDate,
    endDate: '7 Days from service',
    coveredIssues: ['Workmanship defect', 'Unsatisfactory result touch-up', 'Product safety review'],
    claimStatus: 'NONE'
  };

  const handleRaiseClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimReason.trim()) return;
    setIsSubmitting(true);
    raiseWarrantyClaim(booking.id, claimReason.trim());
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Header */}
        <div className="bg-[#061A33] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-md">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-4 h-4 text-[#F5D36A]" />
              <span>7-Day Service Warranty</span>
            </h2>
            <p className="text-[10px] text-slate-300">Vihaan Hassle-Free Coverage</p>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4 text-xs">
          {/* Warranty Certificate Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 p-4 rounded-3xl border-2 border-[#D9A928]/60 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-[#D9A928]" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Certificate</span>
                  <h3 className="text-xs font-extrabold text-[#061A33]">{warranty.serviceName}</h3>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                Active Coverage
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-amber-200/60">
              <div>
                <span className="text-slate-400 block text-[10px]">Coverage Period</span>
                <span className="font-bold text-[#061A33]">{warranty.durationDays} Days</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Warranty ID</span>
                <span className="font-mono font-bold text-[#061A33]">{warranty.warrantyId}</span>
              </div>
            </div>
          </div>

          {/* Covered Issues List */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-[#061A33] text-xs">Covered Under Warranty:</h4>
            <div className="space-y-1.5 text-slate-700">
              {warranty.coveredIssues?.map((issue, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Claim Form or Active Status */}
          {warranty.claimStatus === 'CLAIM_RAISED' ? (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-900 text-xs">Warranty Claim Registered</h4>
              <p className="text-[11px] text-emerald-700">
                A senior inspection specialist has been assigned to visit your home free of charge within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRaiseClaim} className="space-y-3">
              <label className="block font-bold text-[#061A33] text-xs">
                Need to raise a warranty inspection claim?
              </label>
              <textarea
                value={claimReason}
                onChange={(e) => setClaimReason(e.target.value)}
                placeholder="Describe any issue you noticed after service (e.g. hair trim unevenness, missed spot)..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-xs focus:outline-none focus:border-[#0B3A78]"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting || !claimReason.trim()}
                className="w-full py-3 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-2xl font-bold text-xs shadow transition disabled:opacity-50"
              >
                Raise Warranty Claim (Free Inspection)
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            No questions asked 100% free rework guarantee by Vihaan
          </p>
        </div>
      </div>
    </div>
  );
};
