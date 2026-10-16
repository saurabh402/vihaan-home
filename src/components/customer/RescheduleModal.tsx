import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  ArrowLeft,
  RotateCcw,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface RescheduleModalProps {
  booking: Booking;
  onClose: () => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({ booking, onClose }) => {
  const { rescheduleBooking, showToast } = useApp();

  const [selectedDate, setSelectedDate] = useState('Wed 26');
  const [selectedTime, setSelectedTime] = useState('04:00 PM');

  const dateOptions = [
    { day: 'Wed', date: '26' },
    { day: 'Thu', date: '27' },
    { day: 'Fri', date: '28' },
    { day: 'Sat', date: '29' },
    { day: 'Sun', date: '30' }
  ];

  const timeOptions = [
    '09:00 AM',
    '11:00 AM',
    '01:00 PM',
    '04:00 PM',
    '07:00 PM'
  ];

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    rescheduleBooking(booking.id, selectedDate, selectedTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up border border-slate-200">
        {/* Header */}
        <div className="bg-[#061A33] text-white px-4 py-3.5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
              <RotateCcw className="w-4 h-4 text-[#F5D36A]" />
              <span>Reschedule Service</span>
            </h2>
            <p className="text-[10px] text-slate-300">Booking #{booking.bookingCode}</p>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Content Body */}
        <form onSubmit={handleReschedule} className="p-5 space-y-4 text-xs">
          {/* Service info */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
            <img
              src={booking.service.image}
              alt={booking.service.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h4 className="font-bold text-[#061A33]">{booking.service.name}</h4>
              <p className="text-[10px] text-slate-400">Current: {booking.scheduledDate} • {booking.scheduledTimeSlot}</p>
            </div>
          </div>

          {/* Select New Date */}
          <div>
            <label className="block font-bold text-[#061A33] mb-2 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-[#0B3A78]" />
              <span>Select New Date</span>
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {dateOptions.map((item) => {
                const isSelected = selectedDate === `${item.day} ${item.date}`;
                return (
                  <button
                    key={item.date}
                    type="button"
                    onClick={() => setSelectedDate(`${item.day} ${item.date}`)}
                    className={`flex-1 min-w-[50px] py-2 px-1 rounded-xl text-center border transition ${
                      isSelected
                        ? 'bg-[#061A33] border-[#061A33] text-white font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-[9px] opacity-80">{item.day}</span>
                    <span className="block text-xs font-extrabold mt-0.5">{item.date}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select New Time Slot */}
          <div>
            <label className="block font-bold text-[#061A33] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0B3A78]" />
              <span>Select New Time Slot</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {timeOptions.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 rounded-xl text-center border text-[11px] font-bold transition ${
                      isSelected
                        ? 'bg-[#0B3A78] border-[#0B3A78] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 p-2.5 rounded-xl text-[10px] text-[#0B3A78] font-medium border border-blue-100">
            ✓ Free rescheduling without penalty up to 2 hours before the visit
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-xl font-bold text-xs shadow transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#F5D36A]" />
            <span>Confirm New Slot</span>
          </button>
        </form>
      </div>
    </div>
  );
};
