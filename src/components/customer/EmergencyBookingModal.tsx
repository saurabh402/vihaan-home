import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Zap,
  Phone,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const EmergencyBookingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { services, openModal, showToast } = useApp();
  const [selectedEmergencyType, setSelectedEmergencyType] = useState('plumber');
  const [isDispatched, setIsDispatched] = useState(false);

  const emergencyServices = services.filter((s) => s.isEmergency || s.categoryId === 'cat_emergency');

  const emergencyTypes = [
    { id: 'plumber', title: 'Emergency Plumber', desc: 'Pipe burst, heavy overflow, motor failure', icon: '🚰', fee: 349 },
    { id: 'electrician', title: 'Emergency Electrician', desc: 'Power tripping, short circuit, burning wire', icon: '⚡', fee: 349 },
    { id: 'locksmith', title: 'Door Lock SOS', desc: 'Locked out, broken key in lock cylinder', icon: '🔑', fee: 399 },
    { id: 'leakage', title: 'AC Gas & Water Leak', desc: 'Indoor AC heavy dripping, compressor fault', icon: '❄️', fee: 499 }
  ];

  const handleInstantDispatch = () => {
    setIsDispatched(true);
    showToast('🚨 SOS Emergency dispatched! Nearest partner arriving in 90 mins.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-[#061A33] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-md">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-1.5 justify-center">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
              <span>90-Min Emergency SOS</span>
            </h2>
            <p className="text-[10px] text-red-100">Guaranteed Fast Doorstep Response</p>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4 text-xs">
          {!isDispatched ? (
            <>
              {/* Emergency Banner Alert */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-3.5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-800 text-xs">Priority Rapid Dispatch Active</h3>
                  <p className="text-[11px] text-red-700 mt-0.5 leading-relaxed">
                    Our master emergency technicians are pre-stationed across major city zones for immediate 90-min doorstep arrival.
                  </p>
                </div>
              </div>

              {/* Service Type Selection */}
              <div>
                <label className="block font-bold text-[#061A33] mb-2 uppercase tracking-wider text-[11px]">
                  Select Urgent Issue
                </label>

                <div className="space-y-2">
                  {emergencyTypes.map((et) => {
                    const isSelected = selectedEmergencyType === et.id;
                    return (
                      <div
                        key={et.id}
                        onClick={() => setSelectedEmergencyType(et.id)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-red-50/70 border-red-500 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{et.icon}</span>
                          <div>
                            <h4 className="font-bold text-[#061A33] text-xs">{et.title}</h4>
                            <p className="text-[10px] text-slate-500">{et.desc}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-[#061A33] text-xs">₹{et.fee}</span>
                          <span className="block text-[9px] text-red-600 font-bold">90 Mins</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Emergency Standards */}
              <div className="bg-[#F7F8FA] rounded-2xl p-3.5 border border-slate-200 space-y-2">
                <h4 className="font-bold text-[#061A33] text-xs">Emergency Booking Guarantees:</h4>
                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-red-600" />
                    <span>Doorstep arrival SLA under 90 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0B3A78]" />
                    <span>Police verified & certified master technician</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fixed transparent rate card with digital invoice</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* SOS Dispatched Live View */
            <div className="text-center py-6 space-y-4 animate-scale-up">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-red-50">
                <Zap className="w-10 h-10 text-red-600 fill-red-600 animate-bounce" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#061A33]">
                  Emergency SOS Dispatched!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Master Partner Vikram Rathore is en route to Shakti Nagar.
                </p>
                <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-full text-xs font-bold mt-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>ETA: 22 Minutes</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-[#061A33]">Emergency Plumber (Burst Fix)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Assigned Pro:</span>
                  <span className="font-bold text-[#061A33]">Vikram Rathore (4.98 ⭐)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tracking Code:</span>
                  <span className="font-mono font-bold text-[#0B3A78]">SOS-9912</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="p-4 bg-white border-t border-slate-200">
          {!isDispatched ? (
            <button
              onClick={handleInstantDispatch}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white rounded-2xl font-bold text-xs shadow-lg shadow-red-500/30 transition active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Confirm 90-Min SOS Booking</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#061A33] text-white rounded-2xl font-bold text-xs shadow transition"
            >
              Return to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
