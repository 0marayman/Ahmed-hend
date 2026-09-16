import React, { useState } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { SaveTheDateHero } from './components/SaveTheDateHero';
import { PartyInfoCard } from './components/PartyInfoCard';
import { PhotoCarousel } from './components/PhotoCarousel';
import { ReceptionCard } from './components/ReceptionCard';
import { VenueMapCard } from './components/VenueMapCard';
import { AudioPlayer } from './components/AudioPlayer';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { AudioChangerModal } from './components/AudioChangerModal';
import { WhatsAppShareCard } from './components/WhatsAppShareCard';
import { GALLERY_PHOTOS } from './data/weddingData';
import { Heart, Share2, Check, RotateCcw, Image as ImageIcon, Volume2, MessageCircle } from 'lucide-react';

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState<boolean>(false);

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
      {/* 1. Envelope Intro Cover Gate (exactly like 00:00 - 00:01 in video) */}
      {!hasOpenedEnvelope && (
        <EnvelopeIntro onOpen={() => setHasOpenedEnvelope(true)} />
      )}

      {/* Floating Audio Player for background wedding melody */}
      <AudioPlayer />

      {/* Subtle floating heart particles in background */}
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
            <Heart className="w-4 h-4 fill-current" style={{ color: heart.color }} />
          </div>
        ))}
      </div>

      {/* Main Container - Mobile Centered View matching the video aspect ratio */}
      <main className="relative z-10 w-full max-w-[420px] sm:max-w-md mx-auto px-4 py-6 sm:py-8 transition-all">
        {/* Top Controls Bar (Share, Custom Photos, & Re-open Envelope) */}
        <div className="flex items-center justify-between pb-3 px-1 text-xs text-[#8c7467] font-cairo gap-2">
          <button
            onClick={() => setHasOpenedEnvelope(false)}
            id="btn-reopen-envelope"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#e5d8cc] hover:bg-white text-[#7d5f3d] transition cursor-pointer shadow-2xs"
            title="إعادة فتح الظرف"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>عرض الغلاف</span>
          </button>

          <button
            onClick={() => setIsPhotoManagerOpen(true)}
            id="btn-open-photo-manager"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#520b1b]/10 border border-[#520b1b]/25 hover:bg-[#520b1b]/20 text-[#520b1b] font-medium transition cursor-pointer shadow-2xs"
            title="تحديد الصور الأصلية بالدعوة"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>الصور الأصلية</span>
          </button>

          <button
            onClick={() => setIsAudioModalOpen(true)}
            id="btn-top-open-audio-changer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#520b1b]/10 border border-[#520b1b]/25 hover:bg-[#520b1b]/20 text-[#520b1b] font-medium transition cursor-pointer shadow-2xs"
            title="تغيير صوت الزفة"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>الزفة / الصوت</span>
          </button>

          <button
            onClick={handleShare}
            id="btn-share-invite"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#e5d8cc] hover:bg-white text-[#7d5f3d] transition cursor-pointer shadow-2xs"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/35 hover:bg-[#25D366]/25 text-[#128C7E] font-medium transition cursor-pointer shadow-2xs"
            title="مشاركة الدعوة عبر واتساب"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>واتساب</span>
          </button>
        </div>

        {/* 1. SAVE THE DATE Hero with Opened Envelope & Childhood Photo (00:03 - 00:04) */}
        <SaveTheDateHero />

        {/* 2. Card: معلومات الحفل (00:04 - 00:07) */}
        <PartyInfoCard />

        {/* 3. Section: معرض الصور (00:08 - 00:10) */}
        <PhotoCarousel photos={GALLERY_PHOTOS} />

        {/* 4. Card: معلومات حفل الزفاف & التقويم (00:11 - 00:15) */}
        <ReceptionCard targetDate="2026-09-26T19:00:00" />

        {/* 5. Section: مكان حفل الزفاف & خريطة جوجل (00:16 - 00:18) */}
        <VenueMapCard
          venueName="مكان حفل الزفاف"
          subVenue="مسجد المشير طنطاوي قاعة الساحة"
          lat={30.017118}
          lng={31.382790}
        />

        {/* 6. Dedicated Section: مشاركة الدعوة عبر واتساب */}
        <WhatsAppShareCard
          groomName="أحمد محى الدين"
          brideName="هند أيمن"
          weddingDate="السبت 26 سبتمبر 2026 - الساعة 7:00 مساءً"
          venueName="مسجد المشير طنطاوي، قاعة الساحة، القاهرة"
        />

        {/* Footer */}
        <footer className="mt-8 pb-12 text-center font-cairo text-xs text-[#a38c7f] space-y-2 border-t border-[#e8dfd5] pt-6">
          <p className="font-semibold text-[#520b1b]">
            احمد محى الدين & هند أيمن
          </p>
          <p className="text-[11px] text-[#8c7467]">
            26 سبتمبر 2026 • مسجد المشير طنطاوي، القاهرة
          </p>
        </footer>
        {/* Photo Manager Modal for exact original images */}
        <PhotoManagerModal
          isOpen={isPhotoManagerOpen}
          onClose={() => setIsPhotoManagerOpen(false)}
        />
        {/* Audio Changer Modal */}
        <AudioChangerModal
          isOpen={isAudioModalOpen}
          onClose={() => setIsAudioModalOpen(false)}
        />
      </main>
    </div>
  );
}
