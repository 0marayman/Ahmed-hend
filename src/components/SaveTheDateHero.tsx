import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { getPhoto, savePhoto } from '../utils/photoStorage';

export const SaveTheDateHero: React.FC = () => {
  const [customPhoto, setCustomPhoto] = useState<string>('/IMG-20260916-WA0002.jpg');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getPhoto('photo_childhood', '/IMG-20260916-WA0002.jpg').then(setCustomPhoto);

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; dataUrl: string }>;
      if (customEvent.detail?.key === 'photo_childhood') {
        setCustomPhoto(customEvent.detail.dataUrl);
      }
    };
    window.addEventListener('wedding_photos_updated', handleSync);
    return () => window.removeEventListener('wedding_photos_updated', handleSync);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setCustomPhoto(resultStr);
          await savePhoto('photo_childhood', resultStr, 'IMG-20260916-WA0002.jpg');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full text-center pt-8 pb-4">
      {/* Top Spaced Title */}
      <h2 className="font-serif-wedding text-base sm:text-lg tracking-[0.35em] text-[#3a2720] uppercase font-semibold mb-6">
        SAVE THE DATE
      </h2>

      {/* Elegant Framed Childhood Photo (Mailing Envelope Removed) */}
      <div className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto">
        {/* Subtle Architectural Sketch Watermark behind */}
        <div className="absolute inset-0 -top-8 -bottom-8 pointer-events-none opacity-15 overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full text-[#8C2D38]" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="0.8">
            <path d="M50 350 L350 350 M70 350 L70 200 L120 150 L170 200 L170 350 M230 350 L230 200 L280 150 L330 200 L330 350 M120 150 L120 100 L200 50 L280 100 L280 150 M170 200 L230 200 M200 50 L200 350" />
            <circle cx="200" cy="120" r="30" />
            <path d="M140 280 A20 30 0 0 1 160 280 M240 280 A20 30 0 0 1 260 280" />
          </svg>
        </div>

        {/* Clean Luxury Polaroid / Archival Photo Mount */}
        <div className="relative z-10 w-full bg-white p-3.5 pb-8 rounded-2xl shadow-2xl shadow-stone-900/15 border border-[#e8ded3] transition-all hover:shadow-stone-900/25">
          <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden rounded-xl bg-stone-100 shadow-inner group">
            <img
              src={customPhoto}
              onError={() => {
                if (customPhoto !== '/src/assets/images/IMG-20260916-WA0002.jpg') {
                  setCustomPhoto('/src/assets/images/IMG-20260916-WA0002.jpg');
                }
              }}
              alt="Ahmed & Hend Childhood Photo"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />

            {/* Quick Upload / Replace Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="تغيير الصورة أو رفع الصورة الأصلية"
              className="absolute bottom-2.5 right-2.5 z-20 bg-white/90 hover:bg-white text-[#520b1b] p-2 rounded-full shadow-md backdrop-blur-xs transition-all opacity-80 hover:opacity-100 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <p className="font-serif-wedding text-xs sm:text-sm text-[#735c52] tracking-widest uppercase mt-3 italic">
            Ahmed &amp; Hend • Since Childhood
          </p>
        </div>
      </div>

      {/* English Names */}
      <div className="mt-8 space-y-1">
        <h1 className="font-serif-wedding text-4xl sm:text-5xl font-normal text-[#2c241e] tracking-wide">
          Ahmed
        </h1>
        <p className="font-serif-wedding text-2xl text-[#b88e4f] italic">
          &
        </p>
        <h2 className="font-serif-wedding text-4xl sm:text-5xl font-normal text-[#2c241e] tracking-wide">
          Hend
        </h2>
      </div>
    </div>
  );
};
