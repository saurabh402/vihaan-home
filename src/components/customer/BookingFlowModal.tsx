import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem, Address, Professional, Coupon, PaymentMethod } from '../../types';
import { PROS_LIST } from '../../data/mockData';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  ShieldCheck,
  Tag,
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Star,
  Gift
} from 'lucide-react';

interface BookingFlowModalProps {
  initialService: ServiceItem;
  initialCoupon?: string;
  onClose: () => void;
  onBookingSuccess: (booking: any) => void;
}

export const BookingFlowModal: React.FC<BookingFlowModalProps> = ({
  initialService,
  initialCoupon,
  onClose,
  onBookingSuccess
}) => {
  const {
    customerData,
    walletBalance,
    rewardPoints,
    redeemPointsForDiscount,
    applyCouponCode,
    createBooking,
    showToast
  } = useApp();

  // Wizard state
  const [selectedDate, setSelectedDate] = useState('Tue 25');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');
  const [selectedAddress, setSelectedAddress] = useState<Address>(customerData.addresses[0]);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState({
    flat: '',
    street: '',
    area: '',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pin: '462024'
  });

  // Professional Choice
  const [proMode, setProMode] = useState<'auto' | 'manual'>('auto');
  const [selectedPro, setSelectedPro] = useState<Professional>(PROS_LIST[0]);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');

  // Coupons & Rewards
  const [couponCodeInput, setCouponCodeInput] = useState(initialCoupon || 'FIRST20');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [useRewardPoints, setUseRewardPoints] = useState(false);
  const [rewardDiscount, setRewardDiscount] = useState(0);

  // Auto-apply initial coupon if provided
  React.useEffect(() => {
    if (initialCoupon) {
      const res = applyCouponCode(initialCoupon, initialService.price);
      if (res.success && res.coupon) {
        setAppliedCoupon(res.coupon);
        setCouponDiscount(res.discount);
      }
    }
  }, [initialCoupon, initialService.price]);

  // Pricing calculations
  const basePrice = initialService.price;
  const taxes = Math.round(basePrice * 0.05); // 5% GST
  const convenienceFee = customerData.membership.isActive ? 0 : 29;
  const totalDiscount = couponDiscount + rewardDiscount;
  const finalPayable = Math.max(0, basePrice + taxes + convenienceFee - totalDiscount);

  // Date picker chips (Matching reference mockup Screen 7)
  const dateOptions = [
    { day: 'Mon', date: '24' },
    { day: 'Tue', date: '25' },
    { day: 'Wed', date: '26' },
    { day: 'Thu', date: '27' },
    { day: 'Sat', date: '29' }
  ];

  const timeOptions = [
    '09:00 AM',
    '11:00 AM',
    '01:00 PM',
    '04:00 PM',
    '07:00 PM'
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCouponCode(couponCodeInput.trim(), basePrice);
    if (res.success && res.coupon) {
      setAppliedCoupon(res.coupon);
      setCouponDiscount(res.discount);
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleToggleRewards = () => {
    if (!useRewardPoints) {
      if (rewardPoints < 100) {
        showToast('Minimum 100 reward points needed to redeem', 'warning');
        return;
      }
      const disc = Math.min(Math.floor(rewardPoints / 2), 150);
      setRewardDiscount(disc);
      setUseRewardPoints(true);
      showToast(`Applied ₹${disc} discount from ${rewardPoints} reward points!`, 'success');
    } else {
      setRewardDiscount(0);
      setUseRewardPoints(false);
    }
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: 'addr_' + Date.now(),
      label: 'Home',
      name: customerData.name,
      phone: customerData.phone,
      flat: newAddressInput.flat,
      street: newAddressInput.street,
      area: newAddressInput.area,
      city: newAddressInput.city,
      state: newAddressInput.state,
      pin: newAddressInput.pin,
      isDefault: false
    };
    customerData.addresses.push(newAddr);
    setSelectedAddress(newAddr);
    setIsAddingNewAddress(false);
    showToast('Address added successfully!', 'success');
  };

  const handleConfirmBooking = () => {
    if (paymentMethod === 'WALLET' && walletBalance < finalPayable) {
      showToast('Insufficient wallet balance. Please add money or choose UPI/Card', 'error');
      return;
    }

    const newBooking = createBooking({
      service: initialService,
      customerAddress: selectedAddress,
      scheduledDate: selectedDate,
      scheduledTimeSlot: selectedTimeSlot,
      assignedProfessional: proMode === 'manual' ? {
        id: selectedPro.id,
        name: selectedPro.name,
        phone: selectedPro.phone,
        avatar: selectedPro.avatar,
        rating: selectedPro.rating,
        category: selectedPro.category,
        vehicleNumber: 'MP 04 AB 8842',
        currentEtaMins: 18,
        currentLocation: { lat: 23.255, lng: 77.418 }
      } : undefined,
      paymentMethod,
      priceBreakdown: {
        servicePrice: basePrice,
        discount: initialService.originalPrice - initialService.price,
        couponDiscount,
        rewardPointsDiscount: rewardDiscount,
        taxes,
        convenienceFee,
        totalAmount: finalPayable
      }
    });

    onBookingSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 overflow-y-auto select-none">
      <div className="bg-white w-full max-w-lg min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Top Header (Matching Reference Mockup Screen 7) */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-[#061A33]">Book Your Service</h2>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <span className="w-4 h-1 rounded-full bg-[#0B3A78]"></span>
              <span className="w-4 h-1 rounded-full bg-[#0B3A78]"></span>
              <span className="w-4 h-1 rounded-full bg-[#D9A928]"></span>
              <span className="w-4 h-1 rounded-full bg-slate-200"></span>
            </div>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Scrollable Content Form */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Service Summary Snippet */}
          <div className="bg-[#F7F8FA] rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
            <img
              src={initialService.image}
              alt={initialService.name}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xs font-extrabold text-[#061A33]">{initialService.name}</h3>
              <p className="text-[11px] text-slate-500">{initialService.durationMinutes} mins • Doorstep</p>
              <p className="text-xs font-extrabold text-[#061A33] mt-0.5">₹{initialService.price}</p>
            </div>
          </div>

          {/* 1. Select Date (Matching Mockup Screen 7 Chips) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-[#061A33] flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#0B3A78]" />
                <span>Select Date</span>
              </label>
              <span className="text-[10px] text-slate-400">May 2024</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {dateOptions.map((item) => {
                const isSelected = selectedDate === `${item.day} ${item.date}`;
                return (
                  <button
                    key={item.date}
                    onClick={() => setSelectedDate(`${item.day} ${item.date}`)}
                    className={`flex-1 min-w-[56px] py-2 px-2 rounded-2xl text-center border transition-all ${
                      isSelected
                        ? 'bg-[#061A33] border-[#061A33] text-white shadow-md font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <span className="block text-[10px] opacity-80">{item.day}</span>
                    <span className="block text-sm font-extrabold mt-0.5">{item.date}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Select Time (Matching Mockup Screen 7 Time slots) */}
          <div>
            <label className="block font-bold text-[#061A33] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0B3A78]" />
              <span>Select Time Slot</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {timeOptions.map((time) => {
                const isSelected = selectedTimeSlot === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTimeSlot(time)}
                    className={`py-2 px-2 rounded-xl text-center border text-xs transition-all ${
                      isSelected
                        ? 'bg-[#0B3A78] border-[#0B3A78] text-white shadow-sm font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 font-medium'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Address Selection (Matching Mockup Screen 7) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-[#061A33] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0B3A78]" />
                <span>Service Address</span>
              </label>
              <button
                onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                className="text-[11px] font-bold text-[#0B3A78] hover:underline"
              >
                {isAddingNewAddress ? 'Cancel' : 'Change / Add'}
              </button>
            </div>

            {!isAddingNewAddress ? (
              <div className="bg-[#F7F8FA] rounded-2xl p-3 border border-slate-200/80 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0B3A78] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    📍
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#061A33]">{selectedAddress.label}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{selectedAddress.phone}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      {selectedAddress.flat}, {selectedAddress.street}, {selectedAddress.city}
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              </div>
            ) : (
              <form onSubmit={handleSaveNewAddress} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
                <p className="font-bold text-[#061A33] text-xs">Add New Address</p>
                <input
                  type="text"
                  placeholder="House / Flat / Floor No."
                  value={newAddressInput.flat}
                  onChange={(e) => setNewAddressInput({ ...newAddressInput, flat: e.target.value })}
                  className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Street / Society Name"
                  value={newAddressInput.street}
                  onChange={(e) => setNewAddressInput({ ...newAddressInput, street: e.target.value })}
                  className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Area / Locality"
                  value={newAddressInput.area}
                  onChange={(e) => setNewAddressInput({ ...newAddressInput, area: e.target.value })}
                  className="w-full bg-white p-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#061A33] text-white rounded-xl font-bold text-xs shadow"
                >
                  Save & Use Address
                </button>
              </form>
            )}
          </div>

          {/* 4. Select Professional (Vihaan Auto Best Match vs Pick Manually) */}
          <div>
            <label className="block font-bold text-[#061A33] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B3A78]" />
              <span>Service Professional</span>
            </label>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                type="button"
                onClick={() => setProMode('auto')}
                className={`p-2.5 rounded-2xl border text-left transition-all ${
                  proMode === 'auto'
                    ? 'bg-blue-50/70 border-[#0B3A78] text-[#061A33] font-bold'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1 text-[11px] text-[#D9A928] font-bold mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vihaan Smart Match</span>
                </div>
                <p className="text-[10px] text-slate-500">Auto-assign top rated nearby pro (Recommended)</p>
              </button>

              <button
                type="button"
                onClick={() => setProMode('manual')}
                className={`p-2.5 rounded-2xl border text-left transition-all ${
                  proMode === 'manual'
                    ? 'bg-blue-50/70 border-[#0B3A78] text-[#061A33] font-bold'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <span className="block text-[11px] font-bold text-[#061A33] mb-0.5">
                  Select Manually
                </span>
                <p className="text-[10px] text-slate-500">Pick preferred partner from catalog</p>
              </button>
            </div>

            {proMode === 'manual' && (
              <div className="space-y-1.5 mt-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                {PROS_LIST.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPro(p)}
                    className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition ${
                      selectedPro.id === p.id ? 'bg-white shadow-sm border border-blue-200 font-bold' : 'hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs text-[#061A33]">{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.rating} ⭐ ({p.completedJobsCount} jobs)</p>
                      </div>
                    </div>
                    {selectedPro.id === p.id && <CheckCircle2 className="w-4 h-4 text-[#0B3A78]" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Payment Method (Cash, UPI, Card, Wallet) (Matching Mockup Screen 7) */}
          <div>
            <label className="block font-bold text-[#061A33] mb-2 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#0B3A78]" />
              <span>Payment Method</span>
            </label>

            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { id: 'UPI', label: 'UPI' },
                { id: 'CARD', label: 'Card' },
                { id: 'WALLET', label: 'Wallet' },
                { id: 'CASH', label: 'Cash' }
              ].map((pm) => {
                const isSelected = paymentMethod === pm.id;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-2 rounded-xl border text-xs font-bold transition ${
                      isSelected
                        ? 'bg-[#061A33] border-[#061A33] text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {pm.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Coupons & Rewards */}
          <div className="bg-amber-50/60 rounded-2xl p-3 border border-amber-200/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#061A33] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#D9A928]" />
                <span>Offers & Coupons</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Use FIRST20</span>
            </div>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                placeholder="Enter Coupon Code"
                className="flex-1 bg-white px-3 py-1.5 rounded-xl border border-amber-200 uppercase font-bold text-xs text-[#061A33] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#D9A928] text-[#061A33] rounded-xl font-bold text-xs hover:bg-[#B88A1A] transition"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                <span>Code <strong>{appliedCoupon.code}</strong> applied!</span>
                <span className="font-extrabold">-₹{couponDiscount}</span>
              </div>
            )}

            {/* Reward Points redemption toggle */}
            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#D9A928]" />
                <span className="text-[11px] font-medium text-slate-700">
                  Redeem Reward Points ({rewardPoints} pts available)
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleRewards}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition ${
                  useRewardPoints
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-[#0B3A78] border-blue-200'
                }`}
              >
                {useRewardPoints ? 'Applied' : 'Redeem'}
              </button>
            </div>
          </div>

          {/* 7. Price Breakdown Summary */}
          <div className="bg-[#F7F8FA] rounded-2xl p-3.5 border border-slate-200/80 space-y-1.5 text-slate-600">
            <div className="flex items-center justify-between">
              <span>Item Total</span>
              <span className="font-semibold text-[#061A33]">₹{basePrice}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 font-medium">
                <span>Coupon Discount</span>
                <span>-₹{couponDiscount}</span>
              </div>
            )}
            {rewardDiscount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 font-medium">
                <span>Reward Points Discount</span>
                <span>-₹{rewardDiscount}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span>Taxes & GST (5%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span>Convenience Fee</span>
                {customerData.membership.isActive && (
                  <span className="text-[9px] bg-amber-100 text-[#8F6C10] font-bold px-1 rounded">Care+ Waived</span>
                )}
              </span>
              <span>{convenienceFee === 0 ? 'FREE' : `₹${convenienceFee}`}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-extrabold text-[#061A33]">
              <span>To Pay</span>
              <span>₹{finalPayable}</span>
            </div>
          </div>
        </div>

        {/* Sticky Continue / Confirm Booking Button (Matching Reference Screen 7) */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 shadow-lg flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">Payable Total</span>
            <span className="text-xl font-extrabold text-[#061A33]">₹{finalPayable}</span>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="flex-1 py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] hover:from-[#0B3A78] hover:to-[#061A33] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <Sparkles className="w-4 h-4 text-[#F5D36A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
