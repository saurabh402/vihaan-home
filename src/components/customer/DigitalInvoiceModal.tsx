import React from 'react';
import { Booking } from '../../types';
import { VihaanLogo } from '../common/VihaanLogo';
import {
  ArrowLeft,
  Download,
  Share2,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard
} from 'lucide-react';

interface DigitalInvoiceModalProps {
  booking: Booking;
  onClose: () => void;
}

export const DigitalInvoiceModal: React.FC<DigitalInvoiceModalProps> = ({ booking, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const invoiceNo = `INV-${booking.bookingCode}-${new Date().getFullYear()}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 overflow-y-auto select-none">
      <div className="bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Top Action Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 print:hidden">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xs font-bold text-[#061A33]">Tax Invoice</h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs font-sans">
          {/* Brand & Invoice Heading */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-4">
            <VihaanLogo size="sm" theme="dark" />
            <div className="text-right">
              <span className="text-[10px] font-bold text-[#0B3A78] uppercase tracking-wider block">
                TAX INVOICE
              </span>
              <p className="font-mono font-bold text-[#061A33] text-xs mt-0.5">{invoiceNo}</p>
              <p className="text-[10px] text-slate-400">Date: {booking.scheduledDate}</p>
              <p className="text-[9px] text-slate-400 font-mono">GSTIN: 23AABCV8910Q1Z2</p>
            </div>
          </div>

          {/* Billed To & Service Professional */}
          <div className="grid grid-cols-2 gap-3 bg-[#F7F8FA] p-3 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Customer Details
              </span>
              <p className="font-bold text-[#061A33]">{booking.customerName}</p>
              <p className="text-[10px] text-slate-500">{booking.customerPhone}</p>
              <p className="text-[10px] text-slate-500 truncate">
                {booking.customerAddress.flat}, {booking.customerAddress.city}
              </p>
            </div>

            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Fulfilled By
              </span>
              <p className="font-bold text-[#061A33]">
                {booking.assignedProfessional?.name || 'Verified Partner'}
              </p>
              <p className="text-[10px] text-slate-500">
                {booking.assignedProfessional?.category || 'Service Partner'}
              </p>
              <p className="text-[10px] text-emerald-600 font-bold">✓ KYC Verified</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 grid grid-cols-12 text-[10px] font-bold text-slate-600 uppercase">
              <span className="col-span-7">Service Description</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-3 text-right">Amount</span>
            </div>

            <div className="p-3 grid grid-cols-12 text-xs items-center border-t border-slate-100">
              <div className="col-span-7">
                <p className="font-bold text-[#061A33]">{booking.service.name}</p>
                <p className="text-[10px] text-slate-400">Duration: {booking.service.durationMinutes} mins</p>
              </div>
              <span className="col-span-2 text-center text-slate-600 font-medium">
                {booking.quantity || 1}
              </span>
              <span className="col-span-3 text-right font-extrabold text-[#061A33]">
                ₹{booking.priceBreakdown.servicePrice}
              </span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-[#F7F8FA] p-3.5 rounded-2xl border border-slate-200 space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-semibold text-[#061A33]">₹{booking.priceBreakdown.servicePrice}</span>
            </div>
            {booking.priceBreakdown.couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Coupon Discount ({booking.couponApplied?.code || 'PROMO'})</span>
                <span>-₹{booking.priceBreakdown.couponDiscount}</span>
              </div>
            )}
            {booking.priceBreakdown.rewardPointsDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Reward Points Redeemed</span>
                <span>-₹{booking.priceBreakdown.rewardPointsDiscount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>CGST + SGST (5%)</span>
              <span>₹{booking.priceBreakdown.taxes}</span>
            </div>
            <div className="flex justify-between">
              <span>Convenience Fee</span>
              <span>{booking.priceBreakdown.convenienceFee === 0 ? 'FREE (Care+)' : `₹${booking.priceBreakdown.convenienceFee}`}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-[#061A33]">
              <span>Total Paid</span>
              <span>₹{booking.priceBreakdown.totalAmount}</span>
            </div>
          </div>

          {/* Payment & Warranty Stamp */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#0B3A78]" />
              <div>
                <p className="text-[10px] font-bold text-[#061A33]">
                  Paid via {booking.paymentMethod}
                </p>
                <span className="text-[9px] text-emerald-600 font-bold">STATUS: SUCCESS (TXN-{booking.bookingCode})</span>
              </div>
            </div>

            {/* Luxury Digital Stamp */}
            <div className="border-2 border-[#D9A928] rounded-xl px-2 py-1 text-center bg-amber-50/50 rotate-[-2deg]">
              <span className="text-[9px] font-extrabold text-[#061A33] block">
                7-DAY WARRANTY
              </span>
              <span className="text-[8px] text-[#D9A928] font-bold block">COVERED</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-white border-t border-slate-200 print:hidden space-y-2">
          <button
            onClick={handlePrint}
            className="w-full py-3 bg-[#061A33] hover:bg-[#0B3A78] text-white rounded-2xl font-bold text-xs shadow transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#F5D36A]" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};
