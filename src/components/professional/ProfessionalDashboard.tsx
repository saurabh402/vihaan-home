import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  Briefcase,
  DollarSign,
  CheckCircle2,
  Clock,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  ShieldCheck,
  Power,
  Camera,
  FileText,
  CreditCard,
  Calendar,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProfessionalDashboard: React.FC = () => {
  const {
    professionalData,
    toggleProAvailability,
    bookings,
    activeBooking,
    proAcceptJob,
    proRejectJob,
    proArrived,
    proStartService,
    proCompleteService,
    openModal,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'jobs' | 'earnings' | 'kyc' | 'schedule'>('jobs');
  const [startOtpInput, setStartOtpInput] = useState('');
  const [serviceNotes, setServiceNotes] = useState('');
  const [proofUploaded, setProofUploaded] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState(false);

  // Incoming job simulation
  const ongoingJob = bookings.find(
    (b) =>
      b.status === 'CONFIRMED' ||
      b.status === 'PROFESSIONAL_ASSIGNED' ||
      b.status === 'ON_THE_WAY' ||
      b.status === 'SERVICE_STARTED'
  );

  const handleStartWithOtp = (bookingId: string) => {
    if (!startOtpInput.trim()) {
      showToast('Please ask customer for their 4-digit start OTP', 'error');
      return;
    }
    const success = proStartService(bookingId, startOtpInput.trim());
    if (success) {
      setStartOtpInput('');
    }
  };

  const handleCompleteJob = (bookingId: string) => {
    proCompleteService(
      bookingId,
      serviceNotes || 'Haircut completed with sterile tools and client satisfaction.',
      proofUploaded ? 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80' : undefined
    );
    setServiceNotes('');
    setProofUploaded(false);
  };

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    showToast(`Payout request for ₹${professionalData.todayEarnings} sent to HDFC Bank (****1902)`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-5 select-none animate-fade-in text-xs">
      {/* Top Professional Greeting & Duty Toggle */}
      <div className="bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] text-white p-5 rounded-3xl shadow-lg border border-[#D9A928]/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src={professionalData.avatar}
              alt={professionalData.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#D9A928] shadow"
            />
            <span
              className={`w-3.5 h-3.5 rounded-full absolute bottom-0 right-0 border-2 border-[#061A33] ${
                professionalData.isAvailable ? 'bg-emerald-400' : 'bg-slate-400'
              }`}
            ></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold text-white">
                Good Morning, {professionalData.name}
              </h2>
              <span className="bg-[#D9A928] text-[#061A33] text-[9px] font-black px-1.5 py-0.2 rounded-full">
                PARTNER PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {professionalData.category} • {professionalData.city}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-[#F5D36A] mt-0.5">
              <Star className="w-3 h-3 fill-[#F5D36A]" />
              <span className="font-bold">{professionalData.rating}</span>
              <span className="text-slate-300 font-normal">({professionalData.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Duty Switch */}
        <button
          onClick={() => toggleProAvailability(!professionalData.isAvailable)}
          className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition ${
            professionalData.isAvailable
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{professionalData.isAvailable ? 'ON DUTY (Receiving Jobs)' : 'OFF DUTY'}</span>
        </button>
      </div>

      {/* 4 Stats Cards (Matching Section 30 of PDF) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">Today's Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-xl font-extrabold text-[#061A33]">
            ₹{professionalData.todayEarnings.toLocaleString('en-IN')}
          </span>
          <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">+₹450 from last job</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">Today's Jobs</span>
            <Briefcase className="w-4 h-4 text-[#0B3A78]" />
          </div>
          <span className="text-xl font-extrabold text-[#061A33]">
            {professionalData.todayJobsCount} Total
          </span>
          <span className="block text-[10px] text-slate-500 mt-0.5">
            {professionalData.completedTodayCount} done • {professionalData.pendingTodayCount} pending
          </span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">Partner Rating</span>
            <Star className="w-4 h-4 text-[#D9A928] fill-[#D9A928]" />
          </div>
          <span className="text-xl font-extrabold text-[#061A33]">
            {professionalData.rating} ⭐
          </span>
          <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">Top 5% Partner</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">KYC Status</span>
            <ShieldCheck className="w-4 h-4 text-[#0B3A78]" />
          </div>
          <span className="text-base font-extrabold text-emerald-700 uppercase">
            ✓ Verified
          </span>
          <span className="block text-[10px] text-slate-500 mt-0.5">Aadhaar & Trade Certified</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-2xl">
        {[
          { id: 'jobs', label: 'Active Jobs & Dispatch' },
          { id: 'earnings', label: 'Earnings & Payouts' },
          { id: 'kyc', label: 'KYC & Trade Verification' },
          { id: 'schedule', label: 'Working Hours & Leave' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 py-2 rounded-xl font-bold transition text-[11px] ${
              activeTab === t.id
                ? 'bg-white text-[#061A33] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ACTIVE DISPATCH & JOB CONTROLS (Sections 30 & 63) */}
      {activeTab === 'jobs' && (
        <div className="space-y-4 animate-fade-in">
          {ongoingJob ? (
            <div className="bg-white rounded-3xl p-5 border-2 border-blue-200 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-extrabold text-sm text-[#061A33]">
                    Active Job Assignment #{ongoingJob.bookingCode}
                  </span>
                </div>
                <span className="bg-blue-100 text-[#0B3A78] font-bold px-2.5 py-0.5 rounded-full text-xs">
                  {ongoingJob.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Customer & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F7F8FA] p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer</span>
                  <h4 className="font-extrabold text-[#061A33] text-sm mt-0.5">{ongoingJob.customerName}</h4>
                  <p className="text-slate-500 mt-0.5">{ongoingJob.customerPhone}</p>
                  <p className="text-slate-600 mt-1 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{ongoingJob.customerAddress.flat}, {ongoingJob.customerAddress.street}, {ongoingJob.customerAddress.city}</span>
                  </p>
                </div>

                <div className="border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-3 pt-2 sm:pt-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Service Booked</span>
                    <h4 className="font-extrabold text-[#061A33] mt-0.5">{ongoingJob.service.name}</h4>
                    <p className="text-slate-500">{ongoingJob.scheduledDate} • {ongoingJob.scheduledTimeSlot}</p>
                    <p className="font-extrabold text-[#061A33] text-sm mt-1">Collect: ₹{ongoingJob.priceBreakdown.totalAmount}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => showToast(`Calling customer ${ongoingJob.customerPhone}...`, 'info')}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0B3A78] rounded-xl font-bold flex items-center gap-1 border border-blue-200"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Customer
                    </button>
                    <button
                      onClick={() => openModal('chat', ongoingJob)}
                      className="px-3 py-1.5 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-xl font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Chat
                    </button>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Professional Execution Controls */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-[#061A33] uppercase tracking-wider text-[11px]">
                  Job Progression Actions
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Action 1: On The Way / Arrived */}
                  <button
                    onClick={() => proArrived(ongoingJob.id)}
                    className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl font-bold flex items-center justify-center gap-1.5"
                  >
                    <Navigation className="w-4 h-4 text-amber-600" />
                    <span>I Have Arrived</span>
                  </button>

                  {/* Action 2: Photo Proof */}
                  <button
                    onClick={() => {
                      setProofUploaded(true);
                      showToast('Before/After service photos attached!', 'success');
                    }}
                    className={`py-2.5 px-3 border rounded-xl font-bold flex items-center justify-center gap-1.5 ${
                      proofUploaded
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Camera className="w-4 h-4 text-slate-500" />
                    <span>{proofUploaded ? '✓ 2 Photos Attached' : '+ Work Photos'}</span>
                  </button>

                  {/* Action 3: Live Map */}
                  <button
                    onClick={() => showToast('Turn-by-turn navigation launched to Shakti Nagar 📍', 'info')}
                    className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-[#0B3A78] border border-blue-200 rounded-xl font-bold flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>GPS Navigation</span>
                  </button>
                </div>

                {/* OTP Start Box */}
                {ongoingJob.status !== 'SERVICE_STARTED' && ongoingJob.status !== 'COMPLETED' && (
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={startOtpInput}
                      onChange={(e) => setStartOtpInput(e.target.value)}
                      placeholder="Enter 4-digit Customer OTP (Demo: 4821 or 1234)"
                      className="flex-1 bg-white border border-slate-200 p-2.5 rounded-xl font-mono text-xs font-bold text-center tracking-widest focus:outline-none focus:border-[#0B3A78]"
                    />
                    <button
                      onClick={() => handleStartWithOtp(ongoingJob.id)}
                      className="px-4 py-2.5 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-xl font-bold shadow"
                    >
                      Start Service
                    </button>
                  </div>
                )}

                {/* Service Notes & Complete Button */}
                {ongoingJob.status === 'SERVICE_STARTED' && (
                  <div className="space-y-2 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200">
                    <label className="font-bold text-emerald-900 block">Service Completion Notes</label>
                    <textarea
                      value={serviceNotes}
                      onChange={(e) => setServiceNotes(e.target.value)}
                      placeholder="Details of service provided (e.g. Haircut completed, sanitized cape used)..."
                      rows={2}
                      className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                    <button
                      onClick={() => handleCompleteJob(ongoingJob.id)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Service & Settle Payment</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-slate-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-[#061A33] text-sm">All Current Jobs Fulfilled!</h3>
              <p className="text-slate-500 text-xs">
                You are currently <strong>ONLINE</strong> and queued for incoming nearby job dispatches.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EARNINGS & PAYOUTS (Section 32) */}
      {activeTab === 'earnings' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-slate-400 uppercase font-bold text-[10px]">Withdrawable Balance</span>
                <h3 className="text-2xl font-extrabold text-[#061A33] mt-0.5">
                  ₹{professionalData.todayEarnings}
                </h3>
              </div>

              <button
                onClick={handleRequestPayout}
                className="px-4 py-2.5 bg-gradient-to-r from-[#D9A928] to-[#B88A1A] text-[#061A33] font-bold rounded-xl shadow hover:scale-105 transition"
              >
                Request Bank Payout →
              </button>
            </div>

            {/* Bank details card */}
            <div className="bg-[#F7F8FA] p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-[#0B3A78]" />
                <div>
                  <p className="font-bold text-[#061A33]">{professionalData.kycDocuments?.bankAccount?.bankName}</p>
                  <p className="text-slate-400 text-[10px]">
                    A/C: **** {professionalData.kycDocuments?.bankAccount?.accountNumber.slice(-4)} • IFSC: {professionalData.kycDocuments?.bankAccount?.ifsc}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Primary Account
              </span>
            </div>

            {/* Recent Payout Settlements */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-[#061A33] text-xs">Recent Settlements & Commission</h4>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <span>Job #VH24561 (Haircut) - 85% Share</span>
                  <span className="font-bold text-emerald-600">+₹254</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <span>Job #VH18920 (Deep Clean) - 85% Share</span>
                  <span className="font-bold text-emerald-600">+₹675</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-slate-700">
                  <span>Vihaan Platform Commission (15%)</span>
                  <span className="font-bold text-slate-400">-₹163</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KYC & VERIFICATION (Section 31) */}
      {activeTab === 'kyc' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-[#061A33] text-sm">Trade KYC & Background Status</h3>
              <p className="text-slate-400 text-[10px]">Required for verified gold partner badge</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-xs">
              ✓ 100% VERIFIED
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#061A33]">Government Identity (Aadhaar/PAN)</p>
                <p className="text-slate-400 text-[10px]">{professionalData.kycDocuments?.govtId}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#061A33]">Professional Certificate & Academy Diploma</p>
                <p className="text-slate-400 text-[10px]">{professionalData.kycDocuments?.certificate}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#061A33]">Police Verification & Address Proof</p>
                <p className="text-slate-400 text-[10px]">{professionalData.kycDocuments?.addressProof}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCHEDULE & WORKING HOURS (Section 33) */}
      {activeTab === 'schedule' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-fade-in">
          <h3 className="font-extrabold text-[#061A33] text-sm">Working Hours & Operating Zones</h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Operating Hours</span>
              <span className="font-bold text-[#061A33]">
                {professionalData.workingHours.start} - {professionalData.workingHours.end}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Service Radius</span>
              <span className="font-bold text-[#061A33]">12 km around Bhopal Center</span>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-2 text-xs">Active Working Days</label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span
                  key={day}
                  className="px-3 py-1.5 bg-[#061A33] text-white font-bold rounded-xl text-xs"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
