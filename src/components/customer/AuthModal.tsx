import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  Sparkles,
  CheckCircle2,
  Lock,
  Mail,
  KeyRound
} from 'lucide-react';

interface AuthModalProps {
  onClose?: () => void;
  initialMode?: 'login' | 'signup' | 'otp';
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, initialMode = 'login' }) => {
  const { loginAsDemo, showToast } = useApp();

  const [step, setStep] = useState<'phone' | 'otp' | 'emailPassword'>(
    initialMode === 'otp' ? 'otp' : 'phone'
  );
  const [phoneNumber, setPhoneNumber] = useState('98765 43210');
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(28);
  const [canResend, setCanResend] = useState(false);

  // Email login state
  const [email, setEmail] = useState('customer@vihaan.demo');
  const [password, setPassword] = useState('Demo@123');

  // Resend Timer Effect
  useEffect(() => {
    if (step === 'otp' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [step, timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.replace(/\s+/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setStep('otp');
    setTimer(28);
    setCanResend(false);
    showToast('6-digit OTP sent! (Demo OTP: 123456)', 'info');
  };

  const handleVerifyOtp = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      showToast('Please enter complete 6-digit OTP', 'error');
      return;
    }
    // Verified
    showToast('OTP verified successfully! Welcome back, Rahul.', 'success');
    loginAsDemo('CUSTOMER');
    if (onClose) onClose();
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val[val.length - 1];
    }
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      loginAsDemo('ADMIN');
    } else if (email.includes('pro')) {
      loginAsDemo('PROFESSIONAL');
    } else {
      loginAsDemo('CUSTOMER');
    }
    showToast(`Logged in as ${email}`, 'success');
    if (onClose) onClose();
  };

  return (
    <div className="min-h-[640px] h-full w-full bg-white flex flex-col justify-between p-6 select-none animate-fade-in">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          {step !== 'phone' ? (
            <button
              onClick={() => setStep('phone')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-8"></div>
          )}

          <div className="flex items-center gap-1 text-[11px] font-bold text-[#D9A928] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D9A928]" />
            <span>Vihaan Secure Auth</span>
          </div>

          <div className="w-8"></div>
        </div>

        {/* STEP 1: Phone Login */}
        {step === 'phone' && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#061A33] tracking-tight">
                Welcome Back 👋
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Let's get you logged in to Vihaan Home Services
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex items-center rounded-2xl border-2 border-slate-200 focus-within:border-[#0B3A78] bg-slate-50/50 p-1 transition-all">
                  <div className="flex items-center gap-1 px-3 py-2 border-r border-slate-200 text-slate-700 font-bold text-sm">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full bg-transparent px-3 py-2 text-sm font-semibold text-[#061A33] focus:outline-none tracking-wider"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Send OTP</span>
                <Sparkles className="w-4 h-4 text-[#F5D36A]" />
              </button>
            </form>

            {/* Social Logins */}
            <div className="mt-6">
              <div className="relative flex items-center justify-center mb-4">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-3 text-[11px] text-slate-400 font-medium absolute">
                  or Continue with
                </span>
              </div>

              <div className="flex items-center justify-center gap-4">
                {/* Google */}
                <button
                  onClick={() => {
                    loginAsDemo('CUSTOMER');
                    if (onClose) onClose();
                  }}
                  className="w-12 h-12 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm transition active:scale-95"
                  title="Google Sign-In"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12c0 2.06.46 3.84 1.26 5.42l4.02-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </button>

                {/* Apple */}
                <button
                  onClick={() => {
                    loginAsDemo('CUSTOMER');
                    if (onClose) onClose();
                  }}
                  className="w-12 h-12 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm transition active:scale-95"
                  title="Apple Sign-In"
                >
                  <svg className="w-5 h-5 fill-[#152238]" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.86-10.42-12.24-22.39-16.14-35.9-3.9-13.51-5.85-26.15-5.85-37.92 0-14.88 3.86-27.13 11.58-36.75 7.72-9.62 17.51-14.54 29.37-14.77 4.8 0 10.05 1.25 15.75 3.75 5.7 2.5 9.74 3.75 12.13 3.75 2.05 0 6.22-1.25 12.52-3.75 6.3-2.5 11.55-3.65 15.75-3.46 11.85.59 21.46 4.96 28.84 13.11-10.37 6.29-15.42 15.02-15.15 26.19.27 8.65 3.63 16.03 10.08 22.14 6.45 6.11 14.16 9.68 23.13 10.7-2.34 6.98-5.33 14.16-8.98 21.54zM119.22 31.84c0-7.39 2.76-14.28 8.28-20.67 5.52-6.39 12.18-10.45 19.98-12.17.65 2.18.98 4.35.98 6.52 0 7.39-2.82 14.4-8.46 21.03-5.64 6.63-12.56 10.65-20.78 12.06z" />
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => {
                    loginAsDemo('CUSTOMER');
                    if (onClose) onClose();
                  }}
                  className="w-12 h-12 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm transition active:scale-95 text-[#1877F2]"
                  title="Facebook Sign-In"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>

              {/* Password Login switch */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setStep('emailPassword')}
                  className="text-xs text-[#0B3A78] font-semibold hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Login with Email & Password instead</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: OTP Verification Screen (Matching Reference Mockup Screen 4) */}
        {step === 'otp' && (
          <div className="animate-fade-in">
            {/* Center Lock Badge */}
            <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-[#0B3A78] shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#0B3A78]" />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#061A33] tracking-tight">
                Enter OTP
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                We have sent 6 digit code to
              </p>
              <p className="text-xs font-bold text-[#061A33] mt-0.5">
                +91 {phoneNumber}
              </p>
            </div>

            {/* 6 Digit Input Boxes */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold text-[#061A33] bg-slate-50 border-2 border-slate-200 focus:border-[#0B3A78] focus:bg-white rounded-xl focus:outline-none transition-all shadow-sm"
                />
              ))}
            </div>

            {/* Resend Timer */}
            <div className="text-center mb-6">
              <p className="text-xs text-slate-400 font-medium">
                Resend OTP in{' '}
                <span className="text-[#0B3A78] font-bold">
                  00:{timer < 10 ? `0${timer}` : timer}
                </span>
              </p>
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3.5 bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#061A33] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Verify OTP</span>
              <CheckCircle2 className="w-4 h-4 text-[#F5D36A]" />
            </button>

            <div className="mt-4 text-center">
              <span className="text-xs text-slate-400">Didn't get the code? </span>
              <button
                disabled={!canResend}
                onClick={() => {
                  setTimer(28);
                  setCanResend(false);
                  showToast('New OTP sent! (Demo: 123456)', 'info');
                }}
                className={`text-xs font-bold ${
                  canResend ? 'text-[#0B3A78] hover:underline cursor-pointer' : 'text-slate-300 cursor-not-allowed'
                }`}
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Email / Password Login */}
        {step === 'emailPassword' && (
          <form onSubmit={handleEmailLogin} className="space-y-4 animate-fade-in">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-[#061A33]">Staff & Partner Login</h2>
              <p className="text-xs text-slate-500">Sign in with credentials</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <Mail className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <Lock className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#061A33] hover:bg-[#0B3A78] text-white rounded-xl font-bold text-xs shadow transition"
            >
              Sign In
            </button>
          </form>
        )}
      </div>

      {/* Footer Trust Guarantee */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] text-slate-400 font-medium">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A928]" /> Fast
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Trusted
        </span>
      </div>
    </div>
  );
};
