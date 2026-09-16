import React, { useState } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { SaveTheDateHero } from './components/SaveTheDateHero';
import { PartyInfoCard } from './components/PartyInfoCard';
import { PhotoCarousel } from './components/PhotoCarousel';
import { ReceptionCard } from './components/ReceptionCard';
import { VenueMapCard } from './components/VenueMapCard';
import { AudioPlayer } from './components/AudioPlayer';
import { WhatsAppShareCard } from './components/WhatsAppShareCard';
import { NavigationDock } from './components/NavigationDock';
import { GALLERY_PHOTOS } from './data/weddingData';
import { Share2, Check, RotateCcw, MessageCircle } from 'lucide-react';

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const url = window.location.href;
    const message = `✨ نتشرف بدعوتكم لحضور حفل زفاف ✨\n🤵 أحمد محى الدين & 👰 هند أيمن\n\n🗓 الموعد: السبت 26 سبتمبر 2026 - الساعة 7:00 مساءً\n📍 المكان: مسجد المشير طنطاوي - قاعة الساحة، القاهرة\n\nيسعدنا ويشرفنا حضوركم ومشاركتنا أجمل اللحظات! 🤍\nللاطلاع على بطاقة الدعوة الإلكترونية والخريطة:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  // Background floating hearts
  const backgroundHearts = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 19) % 94}%`,
    bottom: `${(i * 13) % 45}%`,
    size: 10 + ((i * 5) % 14),
    duration: 5 + ((i * 2) % 4),
    delay: (i * 0.5) % 4,
    color: i % 2 === 0 ? '#f43f5e' : '#d4af37',
    opacity: 0.15 + ((i % 4) * 0.08)
  }));

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2c241e] font-sans relative overflow-x-hidden selection:bg-[#520b1b]/20 selection:text-[#520b1b]" dir="rtl">
      {/* 1. Envelope Intro Cover Gate */}
      {!hasOpenedEnvelope && (
        <EnvelopeIntro onOpen={() => setHasOpenedEnvelope(true)} />
      )}

      {/* Floating Audio Player for background wedding melody */}
      <AudioPlayer />

      {/* Floating hearts background animation */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {backgroundHearts.map((heart) => (
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
            <svg className="w-4 h-4 fill-current" style={{ color: heart.color }} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        ))}
      </div>

      {/* Main Container - Mobile Centered View matching the video layout */}
      <main className="relative z-10 w-full max-w-[440px] sm:max-w-lg mx-auto px-4 py-6 sm:py-8 transition-all pb-24">
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-3 px-1 text-xs text-[#8c7467] font-cairo gap-2">
          <button
            onClick={() => setHasOpenedEnvelope(false)}
            id="btn-reopen-envelope"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#e5d8cc] hover:bg-white text-[#7d5f3d] transition cursor-pointer shadow-2xs"
            title="إعادة فتح الغلاف"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>عرض الغلاف</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              id="btn-share-invite"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#e5d8cc] hover:bg-white text-[#7d5f3d] transition cursor-pointer shadow-2xs"
              title="مشاركة رابط الدعوة"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>نسخ الرابط</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppShare}
              id="btn-top-share-whatsapp"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/35 hover:bg-[#25D366]/25 text-[#128C7E] font-bold transition cursor-pointer shadow-2xs"
              title="مشاركة الدعوة عبر واتساب"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>واتساب</span>
            </button>
          </div>
        </div>

        {/* 1. SAVE THE DATE Hero */}
        <SaveTheDateHero />

        {/* 2. Card: معلومات الحفل */}
        <PartyInfoCard />

        {/* 3. Section: معرض الصور */}
        <div id="gallery-section">
          <PhotoCarousel photos={GALLERY_PHOTOS} />
        </div>

        {/* 4. Card: معلومات حفل الزفاف & التقويم */}
        <div id="events-section">
          <ReceptionCard targetDate="2026-09-26T19:00:00" />
        </div>

        {/* 5. Section: مكان حفل الزفاف & خريطة جوجل */}
        <div id="map-section">
          <VenueMapCard
            venueName="مكان حفل الزفاف"
            subVenue="مسجد المشير طنطاوي قاعة الساحة"
            lat={30.017118}
            lng={31.382790}
          />
        </div>

        {/* 6. Dedicated Section: مشاركة الدعوة عبر واتساب */}
        <WhatsAppShareCard
          groomName="أحمد محى الدين"
          brideName="هند أيمن"
          weddingDate="السبت 26 سبتمبر 2026 - الساعة 7:00 مساءً"
          venueName="مسجد المشير طنطاوي، قاعة الساحة، القاهرة"
        />

        {/* Footer */}
        <footer className="mt-8 pb-12 text-center font-cairo text-xs text-[#a38c7f] space-y-1.5 border-t border-[#e8dfd5] pt-6">
          <p className="font-bold text-[#520b1b] text-sm">
            احمد محى الدين & هند أيمن
          </p>
          <p className="text-[11px] text-[#8c7467]">
            26 سبتمبر 2026 • مسجد المشير طنطاوي - قاعة الساحة، القاهرة
          </p>
          <p className="text-[10px] text-[#b3a195] pt-1">
            دامت دياركم عامرة بالأفراح والمسرات 🤍
          </p>
        </footer>

        {/* Quick Navigation Dock at bottom */}
        <NavigationDock />
      </main>
    </div>
  );
}
