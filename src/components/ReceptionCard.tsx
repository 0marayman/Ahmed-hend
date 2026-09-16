import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { flowerFrame } from '../assets';

interface ReceptionCardProps {
  targetDate?: string;
}

export const ReceptionCard: React.FC<ReceptionCardProps> = ({
  targetDate = '2026-09-26T19:00:00'
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [addedToCalendar, setAddedToCalendar] = useState<boolean>(false);

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Calendar for September 2026
  // Days of week: إث (Mon), ثل (Tue), أر (Wed), خم (Thu), جم (Fri), سب (Sat), أح (Sun)
  const daysHeader = ['إث', 'ثل', 'أر', 'خم', 'جم', 'سب', 'أح'];
  
  // Grid layout for September 2026 (September 1 is Tuesday, so 1 empty slot on Monday)
  const calendarCells = [
    { day: null },
    { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 },
    { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
    { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26, isWeddingDay: true }, { day: 27 },
    { day: 28 }, { day: 29 }, { day: 30 }
  ];

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('حفل زفاف احمد محى الدين & هند أيمن');
    const details = encodeURIComponent('حفل زفاف احمد محى الدين وهند أيمن - حضوركم يسعدنا ويشرفنا');
    const location = encodeURIComponent('مسجد المشير طنطاوي قاعة الساحة، القاهرة، مصر');
    
    // Dates in UTC format (2026-09-26 19:00:00 Cairo time is 16:00:00 UTC)
    const startDate = '20260926T160000Z';
    const endDate = '20260926T210000Z';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
    setAddedToCalendar(true);
    setTimeout(() => setAddedToCalendar(false), 3000);
  };

  return (
    <div className="relative w-full rounded-[28px] bg-[#520b1b] text-white p-6 sm:p-8 shadow-xl overflow-hidden text-center my-6">
      {/* Peony Flower without background on bottom-left corner */}
      <div className="absolute -bottom-4 -left-4 w-28 h-28 pointer-events-none select-none opacity-90">
        <img
          src={flowerFrame}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain -scale-x-100 drop-shadow-md"
        />
      </div>

      {/* Header */}
      <h3 className="font-cairo text-2xl font-bold mb-3 tracking-wide">
        معلومات حفل الزفاف
      </h3>

      <p className="font-cairo text-sm text-rose-100/90 mb-5">
        سيقام حفل الزفاف في:
      </p>

      {/* Date & Time Header Grid */}
      <div className="flex items-center justify-between px-6 max-w-xs mx-auto mb-2 text-rose-100 font-cairo">
        <span className="text-sm font-semibold">PM 7:00</span>
        <span className="text-sm font-semibold">السبت</span>
      </div>

      {/* Big 26 */}
      <div className="my-1">
        <span className="font-serif-wedding text-6xl sm:text-7xl font-bold tracking-tight text-white block">
          26
        </span>
        <span className="text-xs text-rose-200 block font-cairo font-light tracking-wide -mt-1">
          سبتمبر
        </span>
        <span className="font-cairo text-base font-semibold text-rose-100 block mt-1 tracking-wider">
          2026
        </span>
      </div>

      {/* Countdown section */}
      <div className="my-5 pt-3 border-t border-rose-900/60">
        <p className="font-cairo text-xs text-rose-200/90 font-medium mb-1">
          العد التنازلي
        </p>
        <p className="font-cairo text-sm sm:text-base font-bold text-white tracking-wide">
          {timeLeft.days} يوم {timeLeft.hours} ساعة {timeLeft.minutes} دقيقة {timeLeft.seconds} ثانية
        </p>
      </div>

      {/* Mini Calendar Card for September 2026 */}
      <div className="bg-[#FAF7F2] text-[#2c241e] rounded-2xl p-4 sm:p-5 my-4 max-w-xs mx-auto shadow-md">
        <p className="font-cairo text-sm font-bold text-[#520b1b] mb-3">
          سبتمبر 2026
        </p>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold text-[#8a7266] mb-2 font-cairo">
          {daysHeader.map((d) => (
            <div key={d} className="text-center">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-xs font-medium font-cairo">
          {calendarCells.map((cell, idx) => (
            <div
              key={idx}
              className={`h-7 flex items-center justify-center rounded-full transition-all ${
                !cell.day
                  ? 'invisible'
                  : cell.isWeddingDay
                  ? 'bg-[#520b1b] text-white font-bold ring-2 ring-[#520b1b]/30 shadow-sm scale-110'
                  : 'text-[#4a3b32] hover:bg-stone-200/60'
              }`}
            >
              {cell.day}
            </div>
          ))}
        </div>
      </div>

      {/* Add to Calendar Button */}
      <div className="mt-5 relative z-10">
        <button
          onClick={handleAddToCalendar}
          id="btn-add-to-calendar"
          className="w-full max-w-xs mx-auto py-3 px-6 bg-white hover:bg-rose-50 active:scale-95 text-[#520b1b] font-cairo font-bold text-sm rounded-full shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          {addedToCalendar ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>تمت الإضافة بنجاح!</span>
            </>
          ) : (
            <>
              <CalendarIcon className="w-4 h-4 text-[#520b1b]" />
              <span>أضف إلى التقويم</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
