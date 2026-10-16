import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import {
  Bot,
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  RotateCcw,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const ConciergeAIFloating: React.FC = () => {
  const {
    isConciergeOpen,
    setIsConciergeOpen,
    conciergeMessages,
    sendConciergeMessage,
    clearConciergeChat,
    openModal,
    services
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'Book a haircut today ✂️',
    'My AC is not cooling ❄️',
    'Where is my technician? 🛵',
    'Best cleaning packages 🧽',
    'Show my wallet & coupons 🏷️'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conciergeMessages, isThinking]);

  // Voice Speech Recognition via Web Speech API
  const handleToggleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (!isListening) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const speechText = event.results[0][0].transcript;
          setInputVal(speechText);
          setIsListening(false);
          // auto send
          handleSendMessage(speechText);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
      }
    } else {
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    setInputVal('');
    setIsThinking(true);

    await sendConciergeMessage(textToSend);
    setIsThinking(false);

    if (voiceEnabled) {
      setTimeout(() => {
        // Read out last message
        const lastMsg = conciergeMessages[conciergeMessages.length - 1];
        if (lastMsg && lastMsg.sender === 'concierge') {
          speakText(lastMsg.text);
        }
      }, 700);
    }
  };

  if (!isConciergeOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none animate-fade-in">
      <div className="bg-[#061A33] border border-[#D9A928]/50 text-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between max-h-[90vh] h-[640px] animate-slide-up">
        {/* Header (Matching Reference Mockup Vihaan Concierge Banner) */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-[#040F20] via-[#061A33] to-[#0B3A78] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D9A928] to-[#F5D36A] flex items-center justify-center text-[#061A33] shadow-md">
                <Bot className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full absolute -top-0.5 -right-0.5 animate-ping"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold text-[#F5D36A] tracking-wide">
                  Vihaan Concierge
                </h3>
                <span className="text-[9px] bg-amber-500/20 text-[#F5D36A] px-1.5 py-0.5 rounded font-bold border border-amber-500/30">
                  AI ASSISTANT
                </span>
              </div>
              <p className="text-[10px] text-slate-300">
                Need any service today? Just type or speak...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice output'}
              className={`p-1.5 rounded-xl transition ${
                voiceEnabled ? 'bg-[#D9A928] text-[#061A33]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={clearConciergeChat}
              title="Reset Chat"
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsConciergeOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#040F20]">
          {conciergeMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed text-xs shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-[#0B3A78] to-[#144E9E] text-white rounded-br-none border border-blue-400/20'
                      : 'bg-[#0A1A2E] text-slate-100 rounded-bl-none border border-slate-700/80'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Interactive Service Suggestion Cards */}
                  {msg.serviceSuggestions && msg.serviceSuggestions.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-700/80">
                      <p className="text-[10px] font-bold text-[#F5D36A] uppercase tracking-wider">
                        Suggested For You:
                      </p>
                      {msg.serviceSuggestions.map((srv) => (
                        <div
                          key={srv.id}
                          className="bg-[#061424] rounded-xl p-2.5 border border-[#D9A928]/30 flex items-center justify-between gap-2.5 hover:border-[#D9A928] transition"
                        >
                          <img
                            src={srv.image}
                            alt={srv.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-bold text-white text-xs">{srv.name}</p>
                            <p className="text-[10px] text-[#F5D36A]">
                              ₹{srv.price} • {srv.durationMinutes} mins
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setIsConciergeOpen(false);
                              openModal('booking', { service: srv });
                            }}
                            className="px-2.5 py-1 bg-[#D9A928] text-[#061A33] rounded-lg font-bold text-[11px] shadow hover:scale-105 transition"
                          >
                            Book →
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9px] text-slate-400 text-right mt-1.5">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-[#F5D36A] bg-[#0A1A2E] p-3 rounded-2xl w-max border border-slate-700">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Vihaan AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Sample Prompts */}
        <div className="px-3 py-1.5 bg-[#061424] border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-2.5 py-1 bg-[#0A1A2E] hover:bg-[#0B3A78] text-slate-300 hover:text-white rounded-full text-[11px] font-medium whitespace-nowrap border border-slate-700/80 transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar with Speech Mic */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#040F20] border-t border-slate-800 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-2.5 rounded-xl border transition flex-shrink-0 ${
              isListening
                ? 'bg-red-600 text-white border-red-500 animate-pulse'
                : 'bg-[#0A1A2E] text-[#F5D36A] border-[#D9A928]/40 hover:bg-[#0B3A78]'
            }`}
            title={isListening ? 'Listening... Speak now' : 'Click to Speak'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={isListening ? 'Listening to your voice...' : 'Ask Vihaan Concierge...'}
            className="flex-1 bg-[#0A1A2E] px-3 py-2.5 rounded-xl text-xs text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-[#D9A928]"
          />

          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="p-2.5 bg-gradient-to-r from-[#D9A928] to-[#B88A1A] hover:brightness-110 text-[#061A33] rounded-xl font-bold shadow transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
