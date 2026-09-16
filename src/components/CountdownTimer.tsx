import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // ISO string e.g. 2026-10-24T16:30:00
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
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

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm border border-[#e8ded3] rounded-2xl p-3 sm:p-5 min-w-[68px] sm:min-w-[92px] shadow-xs">
              <span className="font-display text-2xl sm:text-4xl font-bold text-[#2c241e] tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#93714b] mt-1">
                {unit.label}
              </span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-[#b88e4f] text-lg sm:text-2xl font-serif select-none">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 text-xs sm:text-sm text-[#7d6f62]">
        <Heart className="w-3.5 h-3.5 text-[#b88e4f] fill-current" />
        <span>Counting down every second until we say "I do"</span>
      </div>
    </div>
  );
};
