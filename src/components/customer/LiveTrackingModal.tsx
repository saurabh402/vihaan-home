import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Navigation,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Share2,
  RotateCcw,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface LiveTrackingModalProps {
  booking: Booking;
  onClose: () => void;
  onOpenChat: () => void;
  onOpenReschedule: () => void;
  onOpenCancel: () => void;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  booking,
  onClose,
  onOpenChat,
  onOpenReschedule,
  onOpenCancel
}) => {
  const { showToast } = useApp();
  const [etaMins, setEtaMins] = useState(18);
  const [showCallModal, setShowCallModal] = useState(false);

  // Simulate ETA decreasing
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMins((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleShareLocation = () => {
    showToast('Live GPS location pin broadcasted to Rohit Kumar 📍', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 overflow-y-auto select-none">
      <div className="bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Top Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-[#061A33]">Live Tracking</h2>
            <p className="text-[10px] text-slate-400">Booking #{booking.bookingCode}</p>
          </div>
          <button
            onClick={handleShareLocation}
            title="Share Location"
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Content Container */}
        <div className="overflow-y-auto flex-1 space-y-4 p-4 text-xs">
          {/* Status Header Banner (Matching Reference Mockup Screen 9) */}
          <div className="bg-[#F7F8FA] rounded-2xl p-3.5 border border-slate-200/80 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Your Service is
              </span>
              <h3 className="text-base font-extrabold text-[#061A33] tracking-tight">
                {booking.status === 'COMPLETED'
                  ? 'Service Completed 🎉'
                  : booking.status === 'SERVICE_STARTED'
                  ? 'In Progress ✂️'
                  : 'On The Way 🛵'}
              </h3>
              <p className="text-xs font-bold text-[#0B3A78] mt-0.5">
                Arriving in {etaMins} mins
              </p>
            </div>

            {/* Scooter / Bike Visual (Matching Reference Mockup) */}
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center relative shadow-sm">
              <span className="text-3xl animate-bounce">🛵</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -top-1 -right-1 animate-ping"></span>
            </div>
          </div>

          {/* Interactive Simulated Route Map */}
          <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            {/* SVG Simulated City Streets & Route Map */}
            <svg className="w-full h-full object-cover" viewBox="0 0 400 200" fill="none">
              <rect width="400" height="200" fill="#EAEFF5" />
              {/* Roads */}
              <path d="M0 60 Q 150 40, 250 100 T 400 120" stroke="#CBD5E1" strokeWidth="18" fill="none" />
              <path d="M120 0 L 140 200" stroke="#CBD5E1" strokeWidth="12" fill="none" />
              <path d="M280 0 L 260 200" stroke="#CBD5E1" strokeWidth="14" fill="none" />
              <path d="M0 160 L 400 150" stroke="#CBD5E1" strokeWidth="10" fill="none" />

              {/* Active Route Path in Blue */}
              <path
                d="M 60 70 Q 150 50, 260 110 L 330 130"
                stroke="#0B3A78"
                strokeWidth="5"
                strokeDasharray="6 4"
                className="animate-pulse"
                fill="none"
              />

              {/* Professional Pin moving */}
              <g transform="translate(180, 75)">
                <circle cx="0" cy="0" r="16" fill="#061A33" className="shadow-lg" />
                <circle cx="0" cy="0" r="8" fill="#D9A928" />
                <text x="0" y="24" textAnchor="middle" fill="#061A33" fontSize="10" fontWeight="bold">
                  Rohit 🛵
                </text>
              </g>

              {/* Customer Home Destination Pin */}
              <g transform="translate(330, 130)">
                <circle cx="0" cy="0" r="14" fill="#10B981" />
                <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                  📍
                </text>
                <text x="0" y="24" textAnchor="middle" fill="#061A33" fontSize="10" fontWeight="bold">
                  Your Home
                </text>
              </g>
            </svg>

            {/* Map Overlay Badge */}
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-700 shadow-sm flex items-center gap-1">
              <Navigation className="w-3 h-3 text-[#0B3A78] animate-spin" />
              <span>Live GPS: Bhopal Hub → Shakti Nagar</span>
            </div>

            {/* Start OTP Pill for customer to share */}
            {booking.startOtp && (
              <div className="absolute bottom-2 right-2 bg-[#061A33] text-white px-2.5 py-1 rounded-xl shadow border border-[#D9A928]/40 text-[10px] font-bold flex items-center gap-1.5">
                <span className="text-[#F5D36A]">Start OTP:</span>
                <span className="tracking-widest font-mono text-xs">{booking.startOtp}</span>
              </div>
            )}
          </div>

          {/* Status Stepper (Matching Reference Mockup Screen 9) */}
          <div className="bg-[#F7F8FA] rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold text-[#061A33] uppercase tracking-wider mb-1">
              Service Timeline
            </h4>

            <div className="space-y-3 relative">
              {/* Stepper Vertical Connector Line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200 z-0"></div>

              {booking.statusTimeline.map((step, idx) => {
                return (
                  <div key={idx} className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          step.completed
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        )}
                      </div>
                      <span
                        className={`text-xs ${
                          step.completed ? 'font-bold text-[#061A33]' : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {step.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Professional Profile Card (Matching Reference Mockup Screen 9) */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={booking.assignedProfessional?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'}
                alt="Partner"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#D9A928]/40"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-[#061A33]">
                    {booking.assignedProfessional?.name || 'Rohit Kumar'}
                  </h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B3A78]" />
                </div>
                <p className="text-[10px] text-slate-400">
                  {booking.assignedProfessional?.category || 'Expert Barber'}
                </p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#D9A928] mt-0.5">
                  <Star className="w-3 h-3 fill-[#D9A928]" />
                  <span>{booking.assignedProfessional?.rating || 4.9}</span>
                  <span className="text-slate-400 font-normal">• 1,240 Jobs</span>
                </div>
              </div>
            </div>

            {/* Quick Actions: Call & Chat (Matching Reference Mockup Screen 9) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCallModal(true)}
                className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0B3A78] flex items-center justify-center border border-blue-200 transition active:scale-95"
                title="Call Partner"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenChat}
                className="w-9 h-9 rounded-xl bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] flex items-center justify-center shadow transition active:scale-95"
                title="Chat with Partner"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions: Reschedule & Cancel */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
          <button
            onClick={onOpenReschedule}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reschedule</span>
          </button>
          <button
            onClick={onOpenCancel}
            className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 border border-red-200"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        </div>

        {/* Simulated In-App Call Modal */}
        {showCallModal && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-[#061A33] border border-[#D9A928]/40 rounded-3xl p-6 text-center text-white max-w-xs w-full space-y-4 shadow-2xl">
              <img
                src={booking.assignedProfessional?.avatar}
                alt="Partner"
                className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-[#D9A928] animate-pulse"
              />
              <div>
                <p className="text-xs text-[#F5D36A] font-semibold">Calling Partner (Masked Line)...</p>
                <h3 className="text-lg font-bold">{booking.assignedProfessional?.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Vihaan Encrypted Call Gateway</p>
              </div>
              <button
                onClick={() => setShowCallModal(false)}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-xs shadow transition"
              >
                End Call
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
