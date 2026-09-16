import React from 'react';
import { Heart, Calendar, Image, MapPin, MailCheck, MessageSquareHeart, Gift } from 'lucide-react';

interface NavigationDockProps {
  onOpenGiftModal: () => void;
  rsvpsCount: number;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  onOpenGiftModal,
  rsvpsCount
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <nav
        aria-label="Wedding Quick Navigation"
        className="pointer-events-auto bg-[#2c241e]/90 hover:bg-[#2c241e]/98 backdrop-blur-md text-white px-3 sm:px-5 py-2 rounded-full shadow-2xl border border-white/15 flex items-center gap-1 sm:gap-2 transition-all"
      >
        <button
          onClick={() => scrollTo('couple-section')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="The Couple"
        >
          <Heart className="w-4 h-4 text-[#d4af37]" />
          <span className="hidden md:inline">Couple</span>
        </button>

        <button
          onClick={() => scrollTo('events-section')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Events Schedule"
        >
          <Calendar className="w-4 h-4 text-[#d4af37]" />
          <span className="hidden md:inline">Events</span>
        </button>

        <button
          onClick={() => scrollTo('map-section')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Venue Map"
        >
          <MapPin className="w-4 h-4 text-[#d4af37]" />
          <span className="hidden md:inline">Map</span>
        </button>

        <button
          onClick={() => scrollTo('gallery-section')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Photo Gallery"
        >
          <Image className="w-4 h-4 text-[#d4af37]" />
          <span className="hidden md:inline">Gallery</span>
        </button>

        {/* Primary RSVP Highlight Button */}
        <button
          id="dock-btn-rsvp"
          onClick={() => scrollTo('rsvp-section')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#b88e4f] to-[#93714b] text-white text-xs font-bold shadow-md cursor-pointer hover:brightness-110 active:scale-95 transition-all"
        >
          <MailCheck className="w-3.5 h-3.5" />
          <span>RSVP</span>
        </button>

        <button
          onClick={() => scrollTo('wishes-section')}
          className="flex flex-col sm:flex-row items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Wishes Wall"
        >
          <MessageSquareHeart className="w-4 h-4 text-[#d4af37]" />
          <span className="hidden md:inline">Wishes</span>
        </button>

        <button
          onClick={onOpenGiftModal}
          className="flex flex-col sm:flex-row items-center gap-1 px-2 py-1 text-[11px] font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Gift Registry"
        >
          <Gift className="w-4 h-4 text-amber-300" />
          <span className="hidden md:inline">Gift</span>
        </button>
      </nav>
    </div>
  );
};
