import React from 'react';

export const PartyInfoCard: React.FC = () => {
  return (
    <div className="relative w-full rounded-[28px] bg-[#520b1b] text-white p-7 sm:p-9 shadow-xl overflow-hidden text-center my-6">
      {/* Delicate Peony Flower without background on top right corner */}
      <div className="absolute -top-3 -right-3 w-28 h-28 pointer-events-none select-none opacity-90">
        <img
          src="/frame_nobg.png"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/src/assets/images/flower_nobg.png';
          }}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain drop-shadow-md"
        />
      </div>

      {/* Title */}
      <h3 className="font-cairo text-2xl font-bold mb-3 tracking-wide">
        معلومات الحفل
      </h3>

      <div className="space-y-1 text-rose-100 font-cairo text-sm mb-6 leading-relaxed">
        <p>بكل الحب والسرور نعلن</p>
        <p>عن دعواتكم لحفل زفاف</p>
      </div>

      {/* Groom & Bride Calligraphy Names */}
      <div className="space-y-4 my-4">
        {/* Groom */}
        <div>
          <h2 className="font-amiri text-4xl sm:text-5xl font-bold text-white tracking-wide">
            احمد محى الدين
          </h2>
          <span className="font-cairo text-xs text-rose-200 block mt-1">
            العريس
          </span>
        </div>

        {/* Ampersand */}
        <div className="flex items-center justify-center my-1">
          <span className="font-serif-wedding text-3xl text-rose-300 italic select-none">
            &
          </span>
        </div>

        {/* Bride */}
        <div>
          <h2 className="font-amiri text-4xl sm:text-5xl font-bold text-white tracking-wide">
            هند أيمن
          </h2>
          <span className="font-cairo text-xs text-rose-200 block mt-1">
            العروسة
          </span>
        </div>
      </div>
    </div>
  );
};
