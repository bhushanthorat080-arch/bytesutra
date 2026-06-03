import React from 'react';
import logoImg from '@/assets/logo.webp';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  iconSize?: number;
}

export const ByteSutraLogo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  textSize = 'md',
  iconSize = 64,
}) => {
  // Translate sizes to scale variables
  const fontClass = {
    sm: 'text-lg font-bold tracking-tight',
    md: 'text-2xl font-extrabold tracking-tight',
    lg: 'text-3xl font-extrabold tracking-tight',
    xl: 'text-4xl font-extrabold tracking-tight',
  }[textSize];

  // If the icon is large, we display the full logo image (graphic + text).
  const isLarge = iconSize > 120;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {isLarge ? (
        <div 
          className="relative overflow-hidden flex items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          <img
            src={logoImg}
            alt="Byte Sutra Logo"
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
      ) : (
        <div 
          className="relative overflow-hidden flex items-center justify-center shrink-0"
          style={{ width: iconSize, height: iconSize }}
        >
          <img
            src={logoImg}
            alt="Byte Sutra"
            className="absolute max-w-none transition-transform duration-500 hover:scale-110"
            style={{
              width: iconSize * 1.38,
              height: iconSize * 1.38,
              top: -iconSize * 0.08,
            }}
          />
        </div>
      )}

      {showText && !isLarge && (
        <div className="flex flex-col select-none text-left">
          <span className={`${fontClass} leading-none tracking-tight text-slate-900 font-sans`}>
            Byte <span className="text-[#1479ea]">Sutra</span>
          </span>
          <span className="text-[10px] font-mono tracking-[4px] uppercase font-bold text-slate-500 mt-1 leading-none">
            GROWTH PARTNER
          </span>
        </div>
      )}
    </div>
  );
};

