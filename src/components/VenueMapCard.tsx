import React from 'react';
import { Navigation, MapPin } from 'lucide-react';

interface VenueMapCardProps {
  venueName?: string;
  subVenue?: string;
  lat?: number;
  lng?: number;
}

export const VenueMapCard: React.FC<VenueMapCardProps> = ({
  venueName = 'مكان حفل الزفاف',
  subVenue = 'مسجد المشير طنطاوي قاعة الساحة',
  lat = 30.017118,
  lng = 31.382790
}) => {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const viewMapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  return (
    <div className="w-full my-6 text-center">
      {/* Title */}
      <h3 className="font-cairo text-2xl font-bold text-[#3a2720] mb-1 tracking-wide">
        {venueName}
      </h3>
      <p className="font-cairo text-sm text-[#735c52] font-semibold mb-5">
        {subVenue}
      </p>

      {/* Map Container */}
      <div className="relative w-full max-w-sm mx-auto rounded-[24px] overflow-hidden shadow-lg border border-[#e8dfd5] bg-[#f8f5f0] aspect-[4/3]">
        <iframe
          title="مسجد المشير طنطاوي قاعة الساحة"
          src={viewMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Overlay subtle label badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-[#e5d8cc] text-[11px] font-cairo font-bold text-[#520b1b]">
          <MapPin className="w-3.5 h-3.5 text-[#520b1b]" />
          <span>قاعة الساحة</span>
        </div>
      </div>

      {/* Directions Button */}
      <div className="mt-4 flex justify-center">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="btn-map-directions"
          className="w-full max-w-xs py-3 px-6 bg-white hover:bg-stone-50 active:scale-95 text-[#520b1b] border border-[#d8c5b8] font-cairo font-bold text-sm rounded-full shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Navigation className="w-4 h-4 text-[#520b1b] -rotate-45" />
          <span>الاتجاهات</span>
        </a>
      </div>
    </div>
  );
};
