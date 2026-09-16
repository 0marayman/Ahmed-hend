import React, { useState, useEffect } from 'react';
import { CoupleMember, StoryMilestone } from '../types';
import { Heart, Sparkles, Instagram, Calendar, MapPin } from 'lucide-react';
import { getPhoto } from '../utils/photoStorage';

interface CoupleStoryProps {
  groom: CoupleMember;
  bride: CoupleMember;
  milestones: StoryMilestone[];
}

export const CoupleStory: React.FC<CoupleStoryProps> = ({
  groom,
  bride,
  milestones
}) => {
  const [sofaImg, setSofaImg] = useState<string>(groom.avatar);

  useEffect(() => {
    getPhoto('photo_sofa', groom.avatar).then(setSofaImg);
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; dataUrl: string }>;
      if (customEvent.detail?.key === 'photo_sofa') {
        setSofaImg(customEvent.detail.dataUrl);
      }
    };
    window.addEventListener('wedding_photos_updated', handleSync);
    return () => window.removeEventListener('wedding_photos_updated', handleSync);
  }, [groom.avatar]);
  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* The Couple Profiles */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <p className="font-script text-2xl sm:text-3xl text-[#b88e4f]">
            The Happy Couple
          </p>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#2c241e] tracking-tight">
            Groom & Bride
          </h3>
          <p className="text-xs sm:text-sm text-[#786a5e] mt-2">
            Two souls united by destiny, blessed with love, embarking on a lifelong journey together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
          {/* Groom Card */}
          <div
            id="card-groom"
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ded3] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#93714b] to-[#b88e4f]" />

            {/* Avatar */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#f5ede3] shadow-sm mb-5">
              <img
                src={sofaImg}
                alt={groom.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#93714b] mb-1">
              The Groom
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#2c241e]">
              {groom.name}
            </h4>
            <p className="text-xs font-medium text-[#8c7b6d] mt-0.5">
              {groom.parents}
            </p>

            <blockquote className="mt-4 px-4 py-3 bg-[#faf6f0] rounded-2xl border border-[#efe5d8] text-xs sm:text-sm italic text-[#594a3e] font-serif-wedding leading-relaxed">
              {groom.quote}
            </blockquote>

            <p className="text-xs sm:text-sm text-[#6e6054] mt-4 leading-relaxed font-sans">
              {groom.bio}
            </p>

            {groom.instagram && (
              <div className="mt-auto pt-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#93714b] font-medium hover:underline">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{groom.instagram}</span>
                </span>
              </div>
            )}
          </div>

          {/* Bride Card */}
          <div
            id="card-bride"
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ded3] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#b88e4f] to-[#e4b97a]" />

            {/* Avatar */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#f5ede3] shadow-sm mb-5">
              <img
                src={sofaImg}
                alt={bride.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#93714b] mb-1">
              The Bride
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#2c241e]">
              {bride.name}
            </h4>
            <p className="text-xs font-medium text-[#8c7b6d] mt-0.5">
              {bride.parents}
            </p>

            <blockquote className="mt-4 px-4 py-3 bg-[#faf6f0] rounded-2xl border border-[#efe5d8] text-xs sm:text-sm italic text-[#594a3e] font-serif-wedding leading-relaxed">
              {bride.quote}
            </blockquote>

            <p className="text-xs sm:text-sm text-[#6e6054] mt-4 leading-relaxed font-sans">
              {bride.bio}
            </p>

            {bride.instagram && (
              <div className="mt-auto pt-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#93714b] font-medium hover:underline">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{bride.instagram}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Love Story Timeline */}
      <div id="our-story-section">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <p className="font-script text-2xl sm:text-3xl text-[#b88e4f]">
            Our Journey
          </p>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#2c241e] tracking-tight">
            How Love Unfolded
          </h3>
          <p className="text-xs sm:text-sm text-[#786a5e] mt-2">
            Every chapter of our story brought us closer to this sacred day.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline center line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#e4d8cb] -translate-x-1/2" />

          <div className="space-y-10 sm:space-y-14">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge in Center */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#b88e4f] items-center justify-center text-[#93714b] shadow-xs z-10">
                    <Heart className="w-4 h-4 fill-current text-[#b88e4f]" />
                  </div>

                  {/* Photo Side */}
                  <div className="w-full md:w-1/2">
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-[#e8ded3] aspect-16/10 bg-[#efe6dc] group">
                      <img
                        src={milestone.image}
                        alt={milestone.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#faf3ea] text-[#93714b] border border-[#ebd8c5] mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{milestone.date}</span>
                    </div>

                    <h4 className="font-display text-xl sm:text-2xl font-bold text-[#2c241e] mt-1">
                      {milestone.title}
                    </h4>

                    {milestone.location && (
                      <p className={`text-xs text-[#8c7b6d] flex items-center gap-1 mt-1 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                        <MapPin className="w-3 h-3 text-[#b88e4f]" />
                        <span>{milestone.location}</span>
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-[#66574a] leading-relaxed mt-2 font-sans">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
