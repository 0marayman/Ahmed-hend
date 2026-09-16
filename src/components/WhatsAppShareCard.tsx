import React, { useState } from 'react';
import { MessageCircle, Check, Copy, Share2 } from 'lucide-react';

interface WhatsAppShareCardProps {
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  venueName?: string;
}

export const WhatsAppShareCard: React.FC<WhatsAppShareCardProps> = ({
  groomName = 'أحمد محى الدين',
  brideName = 'هند أيمن',
  weddingDate = 'السبت 26 سبتمبر 2026 - الساعة 7:00 مساءً',
  venueName = 'مسجد المشير طنطاوي، قاعة الساحة، القاهرة'
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const getShareUrl = () => {
    return typeof window !== 'undefined' ? window.location.href : 'https://ahmed-hend-wedding.com';
  };

  const getInvitationMessage = () => {
    const url = getShareUrl();
    return `✨ نتشرف بدعوتكم لحضور حفل زفاف ✨
🤵 ${groomName} & 👰 ${brideName}

🗓 الموعد: ${weddingDate}
📍 المكان: ${venueName}

يسعدنا ويشرفنا حضوركم ومشاركتنا أجمل لحظات العمر! 🤍
للاطلاع على بطاقة الدعوة الإلكترونية والخريطة:
${url}`;
  };

  const handleWhatsAppShare = () => {
    const message = getInvitationMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const message = getInvitationMessage();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-[28px] bg-white border border-[#e8ded3] shadow-md text-center text-[#3a2720] relative overflow-hidden" dir="rtl">
      {/* Soft background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#128C7E]">
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
        </div>
      </div>

      <h4 className="font-cairo text-lg sm:text-xl font-bold text-[#3a2720]">
        مشاركة الدعوة عبر واتساب
      </h4>
      <p className="font-cairo text-xs sm:text-sm text-[#735c52] mt-1 mb-4 max-w-xs mx-auto leading-relaxed">
        أرسل بطاقة الدعوة الإلكترونية مباشرة بلمسة واحدة لأحبائك وأصدقائك عبر تطبيق واتساب
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-sm mx-auto">
        <button
          id="btn-share-whatsapp-main"
          onClick={handleWhatsAppShare}
          className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white font-cairo font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/30 transition cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white" />
          <span>إرسال عبر واتساب</span>
        </button>

        <button
          id="btn-copy-invitation-text"
          onClick={handleCopyMessage}
          className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-cairo text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer border border-stone-200"
          title="نسخ نص الدعوة الكامل مع الرابط"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-stone-500" />
              <span>نسخ النص</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
