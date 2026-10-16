import React from 'react';

interface VihaanLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  theme?: 'dark' | 'light' | 'gold';
  className?: string;
}

export const VihaanLogo: React.FC<VihaanLogoProps> = ({
  size = 'md',
  showTagline = false,
  theme = 'dark',
  className = ''
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', title: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', title: 'text-xl', sub: 'text-[11px]' },
    lg: { icon: 'w-16 h-16', title: 'text-3xl', sub: 'text-xs' },
    xl: { icon: 'w-24 h-24', title: 'text-4xl', sub: 'text-sm' }
  };

  const textColors = {
    dark: {
      title: 'text-[#061A33]',
      sub: 'text-[#D9A928]',
      tagline: 'text-slate-500'
    },
    light: {
      title: 'text-white',
      sub: 'text-[#F5D36A]',
      tagline: 'text-slate-300'
    },
    gold: {
      title: 'text-[#F5D36A]',
      sub: 'text-[#D9A928]',
      tagline: 'text-amber-200'
    }
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Monogram / Crown Icon */}
        <div className={`relative ${sizeClasses[size].icon} flex items-center justify-center`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none">
            {/* Outer Luxury Shield / Ring */}
            <circle cx="50" cy="50" r="46" stroke="url(#goldGradient)" strokeWidth="3.5" fill="none" opacity="0.9" />
            <circle cx="50" cy="50" r="41" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            
            {/* Crown on top */}
            <path
              d="M32 30 L40 37 L50 25 L60 37 L68 30 L66 43 L34 43 Z"
              fill="url(#goldGradient)"
            />
            <circle cx="32" cy="28" r="2.5" fill="#FFF7D6" />
            <circle cx="50" cy="23" r="3" fill="#FFF7D6" />
            <circle cx="68" cy="28" r="2.5" fill="#FFF7D6" />

            {/* Stylized 'V' Monogram with Home roof */}
            <path
              d="M30 45 L50 78 L70 45 L61 45 L50 64 L39 45 Z"
              fill="url(#goldGradient)"
            />
            {/* Miniature Home silhouette in center */}
            <path
              d="M50 49 L43 55 L45 55 L45 61 L55 61 L55 55 L57 55 Z"
              fill="#FFFFFF"
            />
            {/* Window */}
            <rect x="48.5" y="56" width="3" height="3" rx="0.5" fill="url(#goldGradient)" />

            {/* Gradients */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D36A" />
                <stop offset="50%" stopColor="#D9A928" />
                <stop offset="100%" stopColor="#B88A1A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col leading-tight">
          <span
            className={`font-serif tracking-tight font-extrabold ${sizeClasses[size].title} ${textColors[theme].title}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Vihaan
          </span>
          <span
            className={`uppercase tracking-[0.22em] font-bold ${sizeClasses[size].sub} ${textColors[theme].sub}`}
          >
            Home Services
          </span>
        </div>
      </div>

      {showTagline && (
        <div className="mt-2 text-center">
          <p className={`text-xs italic font-medium ${textColors[theme].tagline}`}>
            "Your Home, Our Care."
          </p>
          <p className="text-[11px] text-slate-400 font-normal">
            Professional Services at Your Doorstep.
          </p>
        </div>
      )}
    </div>
  );
};
