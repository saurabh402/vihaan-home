import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  ArrowLeft,
  Star,
  Camera,
  CheckCircle2,
  Gift,
  Sparkles
} from 'lucide-react';

interface ReviewModalProps {
  booking: Booking;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ booking, onClose }) => {
  const { addServiceReview, customerData, showToast } = useApp();
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('Outstanding service! Arrived exactly on time with full sterile kits.');
  const [qualityRating, setQualityRating] = useState(5);
  const [behaviorRating, setBehaviorRating] = useState(5);
  const [timelinessRating, setTimelinessRating] = useState(5);
  const [valueRating, setValueRating] = useState(5);
  const [hasPhoto, setHasPhoto] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceReview({
      bookingId: booking.id,
      serviceId: booking.service.id,
      customerId: customerData.id,
      customerName: customerData.name,
      customerAvatar: customerData.avatar,
      professionalId: booking.assignedProfessional?.id || 'pro_01',
      rating,
      reviewText,
      aspects: {
        serviceQuality: qualityRating,
        behavior: behaviorRating,
        timeliness: timelinessRating,
        valueForMoney: valueRating
      },
      photos: hasPhoto
        ? ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80']
        : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-[#061A33]">Rate Your Experience</h2>
            <p className="text-[10px] text-slate-400">Earn +50 Reward Points</p>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 space-y-5 text-xs">
          {/* Professional Header */}
          <div className="text-center space-y-2">
            <img
              src={booking.assignedProfessional?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'}
              alt="Pro"
              className="w-16 h-16 rounded-full mx-auto object-cover ring-4 ring-amber-100"
            />
            <div>
              <h3 className="text-sm font-extrabold text-[#061A33]">
                {booking.assignedProfessional?.name || 'Rohit Kumar'}
              </h3>
              <p className="text-[11px] text-slate-500">{booking.service.name}</p>
            </div>

            {/* 5-Star Primary Selector */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= rating
                        ? 'text-[#D9A928] fill-[#D9A928]'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratings Breakdown */}
          <div className="bg-[#F7F8FA] p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
            <h4 className="text-[11px] font-bold text-[#061A33] uppercase tracking-wider">
              Rate Service Aspects
            </h4>

            {[
              { label: 'Service Quality', state: qualityRating, set: setQualityRating },
              { label: 'Professional Behavior', state: behaviorRating, set: setBehaviorRating },
              { label: 'Punctuality & Timeliness', state: timelinessRating, set: setTimelinessRating },
              { label: 'Value For Money', state: valueRating, set: setValueRating }
            ].map((aspect, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">{aspect.label}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => aspect.set(s)}
                      className="p-0.5 focus:outline-none"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          s <= aspect.state ? 'text-[#D9A928] fill-[#D9A928]' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Review Text */}
          <div>
            <label className="block font-bold text-[#061A33] mb-1.5">
              Share your feedback
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-xs text-[#061A33] focus:outline-none focus:border-[#0B3A78]"
              placeholder="What went great? Any specific compliment for the partner?"
              required
            />
          </div>

          {/* Photo Upload Simulation */}
          <div className="flex items-center justify-between p-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-slate-500" />
              <span className="text-slate-600 font-medium">Add photos of completed work</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setHasPhoto(!hasPhoto);
                showToast(hasPhoto ? 'Photo removed' : 'Before/after photo attached! 📸', 'info');
              }}
              className={`px-3 py-1 rounded-xl font-bold transition text-xs ${
                hasPhoto ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-[#061A33]'
              }`}
            >
              {hasPhoto ? '✓ 1 Photo Added' : '+ Upload'}
            </button>
          </div>

          {/* Reward Bonus Pill */}
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center gap-2 text-amber-800">
            <Gift className="w-4 h-4 text-[#D9A928] flex-shrink-0" />
            <span>You will receive <strong>50 Vihaan Reward Points</strong> upon submitting!</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] text-white rounded-2xl font-bold text-xs shadow-md transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Submit Review</span>
            <Sparkles className="w-4 h-4 text-[#F5D36A]" />
          </button>
        </form>
      </div>
    </div>
  );
};
