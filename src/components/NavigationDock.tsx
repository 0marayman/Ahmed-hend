import React from 'react';
import { Heart, Calendar, Image, MapPin } from 'lucide-react';

export const NavigationDock: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-4" dir="rtl">
      <nav
        aria-label="Wedding Quick Navigation"
        className="pointer-events-auto bg-[#2c241e]/90 hover:bg-[#2c241e]/98 backdrop-blur-md text-white px-3 sm:px-5 py-2 rounded-full shadow-2xl border border-white/15 flex items-center gap-1 sm:gap-2 transition-all font-cairo"
      >
        <button
          onClick={() => scrollTo('card-groom')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2.5 py-1 text-xs font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="العروسين"
        >
          <Heart className="w-4 h-4 text-[#d4af37]" />
          <span>العروسين</span>
        </button>

        <button
          onClick={() => scrollTo('events-section')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2.5 py-1 text-xs font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="الموعد والبرنامج"
        >
          <Calendar className="w-4 h-4 text-[#d4af37]" />
          <span>الموعد</span>
        </button>

        <button
          onClick={() => scrollTo('gallery-section')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2.5 py-1 text-xs font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="معرض الصور"
        >
          <Image className="w-4 h-4 text-[#d4af37]" />
          <span>الصور</span>
        </button>

        <button
          onClick={() => scrollTo('map-section')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2.5 py-1 text-xs font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="مكان الحفل والخريطة"
        >
          <MapPin className="w-4 h-4 text-[#d4af37]" />
          <span>المكان</span>
        </button>
      </nav>
    </div>
  );
};
