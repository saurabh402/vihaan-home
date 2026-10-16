import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  MapPin,
  Mic,
  Phone,
  CheckCheck,
  Sparkles,
  Paperclip
} from 'lucide-react';

interface ChatModalProps {
  booking: Booking;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ booking, onClose }) => {
  const { chatMessages, sendChatMessage, currentRole, showToast } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMessages = chatMessages[booking.id] || [];

  const quickReplies = [
    'Where are you?',
    'I am waiting.',
    'How long will you take?',
    'I have shared my location.'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(booking.id, inputText.trim());
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    sendChatMessage(booking.id, text, { isQuickReply: true });
  };

  const handleShareLocation = () => {
    sendChatMessage(booking.id, '📍 Shared exact doorstep location pin: Flat 402, Royal Residency', {
      location: { lat: 23.2599, lng: 77.4126, label: 'Shakti Nagar, Bhopal' }
    });
    showToast('Doorstep location shared in chat!', 'info');
  };

  const handleAttachImage = () => {
    sendChatMessage(booking.id, '📸 Attached photo of apartment entrance gate', {
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=80'
    });
    showToast('Photo uploaded to chat!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-[#F7F8FA] w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Chat Header */}
        <div className="bg-[#061A33] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="relative">
              <img
                src={booking.assignedProfessional?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'}
                alt="Pro"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#D9A928]"
              />
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full absolute bottom-0 right-0 border-2 border-[#061A33]"></span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1">
                <span>{booking.assignedProfessional?.name || 'Rohit Kumar'}</span>
                <span className="text-[10px] text-[#F5D36A]">⭐ 4.9</span>
              </h3>
              <p className="text-[10px] text-emerald-400 font-medium">Online • Barber Partner</p>
            </div>
          </div>

          <button
            onClick={() => showToast('Calling Rohit Kumar via masked number...', 'info')}
            className="p-2 rounded-full bg-[#0B3A78] hover:bg-blue-600 text-white transition"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* Encrypted Notice */}
          <div className="text-center my-2">
            <span className="bg-slate-200/80 text-slate-600 px-3 py-1 rounded-full text-[10px] font-medium inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D9A928]" />
              End-to-end encrypted chat for Booking #{booking.bookingCode}
            </span>
          </div>

          {activeMessages.map((msg) => {
            const isMe = msg.senderRole === currentRole;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-[#061A33] text-white rounded-br-none'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Attachment"
                      className="mt-2 rounded-xl max-h-40 w-full object-cover border border-slate-300/40"
                    />
                  )}

                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                      isMe ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-blue-400" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Chips (Matching PDF Spec Section 12) */}
        <div className="px-3 py-1.5 bg-slate-100/90 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickReplies.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickReply(qr)}
              className="bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition shadow-2xs hover:border-blue-300"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="bg-white p-3 border-t border-slate-200 flex items-center gap-2 shadow-lg"
        >
          <button
            type="button"
            onClick={handleAttachImage}
            title="Attach Image"
            className="p-2 text-slate-500 hover:text-[#0B3A78] hover:bg-slate-100 rounded-xl transition"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleShareLocation}
            title="Share Location"
            className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-xl transition"
          >
            <MapPin className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 px-3 py-2 rounded-xl text-xs font-medium text-[#061A33] border border-slate-200 focus:outline-none focus:border-[#0B3A78]"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-xl shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
