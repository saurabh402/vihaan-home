import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SupportTicket } from '../../types';
import {
  ArrowLeft,
  Headphones,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send
} from 'lucide-react';

export const SupportCenterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { tickets, createSupportTicket, replyToTicket, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'faqs' | 'tickets' | 'newTicket'>('faqs');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // New ticket state
  const [category, setCategory] = useState<SupportTicket['category']>('Booking Issues');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  // Selected ticket thread view
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');

  const faqs = [
    {
      q: 'How do I reschedule or cancel my booking?',
      a: 'You can reschedule or cancel directly from your Booking History screen up to 2 hours before the appointment without any charges.'
    },
    {
      q: 'What is the 7-day service warranty policy?',
      a: 'All eligible repair, cleaning, and salon services come with an unconditional 7-day rework guarantee. If anything is amiss, raise a claim for a free inspection.'
    },
    {
      q: 'How does Vihaan Wallet & Cashback work?',
      a: 'Cashback from referral codes, booking rewards, and promotions are stored in your Vihaan Wallet. You can use 100% of your wallet balance on your next order.'
    },
    {
      q: 'Are all service professionals verified?',
      a: 'Yes! 100% of Vihaan partners undergo background checks, Aadhaar/Govt ID verification, and hands-on skill trade testing.'
    }
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    const tkt = createSupportTicket(category, subject.trim(), description.trim());
    setSelectedTicket(tkt);
    setActiveTab('tickets');
    setSubject('');
    setDescription('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyText.trim()) return;
    replyToTicket(selectedTicket.id, replyText.trim(), 'CUSTOMER');
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-[#F7F8FA] w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Top Header */}
        <div className="bg-[#061A33] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
              <Headphones className="w-4 h-4 text-[#F5D36A]" />
              <span>Customer Support 24x7</span>
            </h2>
            <p className="text-[10px] text-slate-300">We are here to assist you</p>
          </div>
          <div className="w-7"></div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 px-4 flex items-center gap-4 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('faqs');
              setSelectedTicket(null);
            }}
            className={`py-3 border-b-2 transition ${
              activeTab === 'faqs'
                ? 'border-[#0B3A78] text-[#0B3A78]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            FAQs & Help
          </button>
          <button
            onClick={() => {
              setActiveTab('tickets');
              setSelectedTicket(null);
            }}
            className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'tickets'
                ? 'border-[#0B3A78] text-[#0B3A78]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>My Tickets</span>
            <span className="w-4 h-4 bg-blue-100 text-[#0B3A78] rounded-full text-[10px] flex items-center justify-center">
              {tickets.length}
            </span>
          </button>
          <button
            onClick={() => {
              setActiveTab('newTicket');
              setSelectedTicket(null);
            }}
            className={`py-3 border-b-2 transition ${
              activeTab === 'newTicket'
                ? 'border-[#0B3A78] text-[#0B3A78]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            + Raise Ticket
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4 text-xs">
          {/* TAB 1: FAQs & Instant Channels */}
          {activeTab === 'faqs' && (
            <div className="space-y-4 animate-fade-in">
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => showToast('Connecting to 1800-VIHAAN Toll-Free VIP Desk...', 'info')}
                  className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-2.5 hover:border-blue-300 transition text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0B3A78] flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#061A33]">Call Helpline</h4>
                    <p className="text-[10px] text-slate-400">1800-844-226</p>
                  </div>
                </button>

                <button
                  onClick={() => showToast('support@vihaanhomes.in opened in mail client', 'info')}
                  className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-2.5 hover:border-blue-300 transition text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#D9A928] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#061A33]">Email Desk</h4>
                    <p className="text-[10px] text-slate-400">support@vihaan.in</p>
                  </div>
                </button>
              </div>

              {/* FAQs Accordion */}
              <div className="space-y-2">
                <h3 className="font-bold text-[#061A33] text-xs uppercase tracking-wider">
                  Frequently Asked Questions
                </h3>
                {faqs.map((f, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-3.5 flex items-center justify-between font-bold text-[#061A33] hover:bg-slate-50"
                      >
                        <span>{f.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-slate-600 text-[11px] leading-relaxed border-t border-slate-100 pt-2 bg-slate-50/50">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Support Tickets List or Detail */}
          {activeTab === 'tickets' && (
            <div className="space-y-3 animate-fade-in">
              {!selectedTicket ? (
                tickets.map((tkt) => (
                  <div
                    key={tkt.id}
                    onClick={() => setSelectedTicket(tkt)}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-2xs cursor-pointer transition space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0B3A78] text-xs">
                        {tkt.ticketNumber}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                          tkt.status === 'RESOLVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tkt.status === 'IN_PROGRESS'
                            ? 'bg-blue-100 text-[#0B3A78]'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tkt.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-[#061A33]">{tkt.subject}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{tkt.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                      <span>Category: {tkt.category}</span>
                      <span>{tkt.messages.length} messages</span>
                    </div>
                  </div>
                ))
              ) : (
                /* Ticket Thread Chat */
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-xs text-[#0B3A78] font-bold flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to All Tickets
                  </button>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0B3A78]">
                        {selectedTicket.ticketNumber}
                      </span>
                      <span className="text-[9px] font-bold bg-blue-50 text-[#0B3A78] px-2 py-0.5 rounded-full">
                        {selectedTicket.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#061A33]">{selectedTicket.subject}</h3>
                    <p className="text-[10px] text-slate-400">Category: {selectedTicket.category}</p>
                  </div>

                  {/* Messages */}
                  <div className="space-y-2.5">
                    {selectedTicket.messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl text-xs ${
                          m.senderRole === 'CUSTOMER'
                            ? 'bg-blue-50 text-slate-800 ml-6 border border-blue-100'
                            : 'bg-white text-[#061A33] mr-6 border border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span className="font-bold text-[#0B3A78]">{m.senderName}</span>
                          <span>{m.timestamp}</span>
                        </div>
                        <p>{m.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <form onSubmit={handleSendReply} className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response to support..."
                      className="flex-1 bg-white border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="p-2.5 bg-[#061A33] text-white rounded-xl shadow"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: New Support Ticket Form */}
          {activeTab === 'newTicket' && (
            <form onSubmit={handleCreateTicket} className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3 animate-fade-in">
              <h3 className="font-bold text-[#061A33] text-xs">Raise a Support Ticket</h3>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-semibold focus:outline-none"
                >
                  <option value="Booking Issues">Booking Issues</option>
                  <option value="Payment Issues">Payment Issues</option>
                  <option value="Refund Issues">Refund Issues</option>
                  <option value="Professional Issues">Professional Issues</option>
                  <option value="Warranty">Warranty & Guarantees</option>
                  <option value="Membership">Care+ Membership</option>
                  <option value="Account Issues">Account & Wallet</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question regarding technician arrival time"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide all relevant details..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-xl font-bold text-xs shadow transition"
              >
                Submit Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
