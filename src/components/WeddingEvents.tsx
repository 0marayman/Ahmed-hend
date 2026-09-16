import React from 'react';
import { WeddingEvent } from '../types';
import { Calendar, Clock, MapPin, Sparkles, Shirt, ExternalLink, Download } from 'lucide-react';

interface WeddingEventsProps {
  events: WeddingEvent[];
  onSelectEventForMap?: (eventId: string) => void;
}

export const WeddingEvents: React.FC<WeddingEventsProps> = ({
  events,
  onSelectEventForMap
}) => {
  // Helper to generate Google Calendar link
  const createGoogleCalendarLink = (event: WeddingEvent) => {
    // 2026-10-24T16:30:00 -> format YYYYMMDDTHHMMSSZ
    const startTime = event.id === 'ceremony' ? '20261024T143000Z' : '20261024T170000Z';
    const endTime = event.id === 'ceremony' ? '20261024T160000Z' : '20261024T220000Z';
    const title = encodeURIComponent(`Mohyeldin & Hend - ${event.title}`);
    const details = encodeURIComponent(
      `Join us in celebrating the wedding of Mohyeldin & Hend!\nEvent: ${event.title}\nVenue: ${event.venueName}\nAddress: ${event.address}\nDress Code: ${event.dressCode}`
    );
    const location = encodeURIComponent(`${event.venueName}, ${event.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  // Helper to generate and download iCalendar (.ics) file
  const downloadIcsFile = (event: WeddingEvent) => {
    const startTime = event.id === 'ceremony' ? '20261024T143000Z' : '20261024T170000Z';
    const endTime = event.id === 'ceremony' ? '20261024T160000Z' : '20261024T220000Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mohyeldin and Hend Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-${event.id}@ahmed-hend-wedding.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:Mohyeldin & Hend - ${event.title}`,
      `DESCRIPTION:${event.subTitle}\\nDress Code: ${event.dressCode}`,
      `LOCATION:${event.venueName}, ${event.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `mohyeldin-hend-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <p className="font-script text-2xl sm:text-3xl text-[#b88e4f]">
          Celebration Timeline
        </p>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#2c241e] tracking-tight">
          Wedding Events
        </h3>
        <p className="text-xs sm:text-sm text-[#786a5e] mt-2">
          We have planned an unforgettable day filled with heartfelt traditions, fine dining, and joyous celebration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
        {events.map((event) => {
          const isCeremony = event.id === 'ceremony';
          return (
            <div
              key={event.id}
              id={`event-card-${event.id}`}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ded3] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Ribbon */}
              <div
                className={`absolute top-0 inset-x-0 h-1.5 ${
                  isCeremony ? 'bg-[#b88e4f]' : 'bg-[#93714b]'
                }`}
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#faf3ea] text-[#93714b] border border-[#ebd8c5]">
                    {isCeremony ? 'Part I' : 'Part II'}
                  </span>
                  <span className="text-xs font-medium text-[#8c7b6d] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#b88e4f]" />
                    <span>{event.time}</span>
                  </span>
                </div>

                <h4 className="font-display text-2xl font-bold text-[#2c241e]">
                  {event.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#8c7b6d] font-medium mt-0.5">
                  {event.subTitle}
                </p>

                {/* Date & Location Breakdown */}
                <div className="mt-5 space-y-3 bg-[#fdfaf6] p-4 rounded-2xl border border-[#efe6db]">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4a3e35]">
                    <Calendar className="w-4 h-4 text-[#b88e4f] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">{event.date}</span>
                      <span className="text-[#807062] text-xs">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4a3e35]">
                    <MapPin className="w-4 h-4 text-[#b88e4f] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">{event.venueName}</span>
                      <span className="text-[#807062] text-xs leading-relaxed">{event.address}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {event.notes && (
                  <p className="text-xs text-[#6e5f52] leading-relaxed mt-4 italic bg-[#faf5ee]/60 p-3 rounded-xl border border-[#f0e7dc]">
                    "{event.notes}"
                  </p>
                )}

                {/* Dress Code */}
                <div className="mt-5 pt-4 border-t border-[#efe6db] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#605144]">
                    <Shirt className="w-4 h-4 text-[#b88e4f]" />
                    <span className="font-medium">Dress Code: <strong>{event.dressCode}</strong></span>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex items-center gap-1.5" title="Recommended attire palette">
                    {event.dressColors.map((col, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-white shadow-xs inline-block"
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#efe6db] flex flex-col sm:flex-row gap-2">
                <a
                  href={createGoogleCalendarLink(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-[#faf3ea] hover:bg-[#f3e7d8] text-[#7d5f3d] font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Google Calendar</span>
                </a>

                <button
                  onClick={() => downloadIcsFile(event)}
                  className="py-2.5 px-3 bg-white hover:bg-[#faf6f0] text-[#705e4f] border border-[#e4d8cb] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Download iCal for Apple or Outlook Calendar"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Apple / iCal</span>
                </button>

                {onSelectEventForMap && (
                  <button
                    onClick={() => {
                      onSelectEventForMap(event.id);
                      const mapElem = document.getElementById('map-section');
                      if (mapElem) {
                        mapElem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="py-2.5 px-3 bg-white hover:bg-[#faf6f0] text-[#93714b] border border-[#e4d8cb] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>View on Map</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
