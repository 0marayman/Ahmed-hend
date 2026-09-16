import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpening(true);
    window.dispatchEvent(new CustomEvent('start_wedding_music'));
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  // Generate gentle floating hearts
  const floatingHearts = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    left: `${(i * 17) % 95}%`,
    bottom: `${(i * 11) % 40}%`,
    size: 10 + ((i * 7) % 18),
    duration: 3 + ((i * 3) % 4),
    delay: (i * 0.4) % 3,
    color: i % 3 === 0 ? '#d4af37' : i % 2 === 0 ? '#f43f5e' : '#fda4af',
    opacity: 0.25 + ((i % 5) * 0.12)
  }));

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#520b1b] transition-all duration-700 ease-in-out ${
        isOpening ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-float-heart"
            style={{
              left: heart.left,
              bottom: heart.bottom,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
              opacity: heart.opacity,
              transform: `scale(${heart.size / 14})`
            }}
          >
            <Heart className="w-5 h-5 fill-current" style={{ color: heart.color }} />
          </div>
        ))}
      </div>

      {/* Center Parchment Card with Peonies Corner Accents */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[380px] bg-[#FAF7F2] rounded-[32px] p-7 sm:p-9 shadow-2xl shadow-black/40 text-center overflow-hidden border border-[#e8ded3]">
        {/* Top-Left Maroon Peony Corner Bouquet */}
        <div className="absolute -top-4 -left-4 w-32 h-32 sm:w-36 sm:h-36 pointer-events-none select-none z-0">
          <img
            src="/frame_nobg.png"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/src/assets/images/flower_nobg.png';
            }}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain -scale-x-100 opacity-95 drop-shadow-xs"
          />
        </div>

        {/* Bottom-Right Maroon Peony Corner Bouquet */}
        <div className="absolute -bottom-4 -right-4 w-32 h-32 sm:w-36 sm:h-36 pointer-events-none select-none z-0">
          <img
            src="/frame_nobg.png"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/src/assets/images/flower_nobg.png';
            }}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain rotate-180 opacity-95 drop-shadow-xs"
          />
        </div>

        {/* Card Content */}
        <div className="relative z-10">
          {/* Center Burgundy Heart Circle */}
          <div className="flex justify-center mt-1 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#520b1b] flex items-center justify-center shadow-lg shadow-[#520b1b]/30 ring-4 ring-white/60">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>

          {/* English Names */}
          <div className="space-y-1 my-2">
            <h1 className="font-serif-wedding text-4xl sm:text-5xl font-semibold text-[#1f1915] tracking-wide">
              Ahmed
            </h1>
            <p className="font-serif-wedding text-2xl text-[#b88e4f] italic my-0.5">
              &
            </p>
            <h2 className="font-serif-wedding text-4xl sm:text-5xl font-semibold text-[#1f1915] tracking-wide">
              Hend
            </h2>
          </div>

          {/* Small Floral Ornament Separator */}
          <div className="flex items-center justify-center my-3 opacity-75">
            <svg className="w-8 h-4 text-[#8C2D38]" viewBox="0 0 40 20" fill="currentColor">
              <path d="M20 10C15 2 7 8 2 10C7 12 15 18 20 10Z" opacity="0.6"/>
              <path d="M20 10C25 2 33 8 38 10C33 12 25 18 20 10Z" opacity="0.6"/>
              <circle cx="20" cy="10" r="2"/>
            </svg>
          </div>

          {/* Arabic Date & Text */}
          <p className="font-cairo text-lg text-[#1f1915] font-bold mb-1 tracking-wide">
            26 سبتمبر 2026
          </p>
          <p className="font-cairo text-sm text-[#6b554b] font-medium mb-6">
            نتشرف بدعوتكم
          </p>

          {/* Button "فتح" (Open) */}
          <div className="flex justify-center pb-1">
            <button
              id="btn-open-invitation"
              onClick={handleOpen}
              className="w-36 py-3 px-6 bg-[#520b1b] hover:bg-[#681023] active:scale-95 text-white font-cairo font-bold text-lg rounded-full shadow-lg shadow-[#520b1b]/35 transition-all duration-300 cursor-pointer flex items-center justify-center"
            >
              فتح
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
