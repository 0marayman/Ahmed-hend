import React, { useState, useRef, useEffect } from 'react';
import { Music, Upload, Check, Play, Pause, Volume2, X, Sparkles } from 'lucide-react';
import { saveAudioTrack, getAudioTrack } from '../utils/audioStorage';

interface AudioChangerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AudioPreset {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  type: 'preset' | 'custom';
}

const PRESETS: AudioPreset[] = [
  {
    id: 'zaffa-egyptian',
    title: 'زفة أفراح - طلي بالأبيض والزغاريد',
    subtitle: 'اللي بنوا السما ونجومه... الصلاة والسلام عليك يا حبيب الله',
    url: '/wedding_audio.mp3',
    type: 'preset'
  },
  {
    id: 'zaffa-full',
    title: 'زفة مصرية كلاسيكية متواصلة',
    subtitle: 'موسيقى وإيقاع الزفاف المصري الأصيل',
    url: '/wedding_zaffa.mp3',
    type: 'preset'
  }
];

export const AudioChangerModal: React.FC<AudioChangerModalProps> = ({ isOpen, onClose }) => {
  const [currentTrack, setCurrentTrack] = useState<{ url: string; title: string }>({
    url: '/wedding_audio.mp3',
    title: 'زفة أفراح - طلي بالأبيض'
  });
  const [previewingUrl, setPreviewingUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
        setPreviewingUrl(null);
      }
      return;
    }
    getAudioTrack().then((track) => {
      setCurrentTrack(track);
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectPreset = async (preset: AudioPreset) => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      setPreviewingUrl(null);
    }
    await saveAudioTrack(preset.url, preset.title);
    setCurrentTrack({ url: preset.url, title: preset.title });
    setSuccessMsg(`تم تفعيل: ${preset.title}`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleTogglePreview = (url: string) => {
    if (previewingUrl === url) {
      previewAudioRef.current?.pause();
      setPreviewingUrl(null);
    } else {
      if (previewAudioRef.current) {
        previewAudioRef.current.src = url;
        previewAudioRef.current.play().then(() => {
          setPreviewingUrl(url);
        }).catch(console.warn);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileName = file.name;
    const cleanTitle = fileName.replace(/\.[^/.]+$/, '');

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        await saveAudioTrack(dataUrl, `مقطع صوتي: ${cleanTitle}`, fileName);
        setCurrentTrack({ url: dataUrl, title: `مقطع صوتي: ${cleanTitle}` });
        setIsUploading(false);
        setSuccessMsg(`تم تحميل وتفعيل "${cleanTitle}" بنجاح!`);
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-right"
      dir="rtl"
      onClick={() => {
        if (previewAudioRef.current) previewAudioRef.current.pause();
        onClose();
      }}
    >
      <audio
        ref={previewAudioRef}
        onEnded={() => setPreviewingUrl(null)}
        onError={() => setPreviewingUrl(null)}
      />

      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-5 sm:p-7 border border-[#e5ded4] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            if (previewAudioRef.current) previewAudioRef.current.pause();
            onClose();
          }}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#520b1b]/10 text-[#520b1b] mx-auto flex items-center justify-center mb-3">
            <Volume2 className="w-6 h-6" />
          </div>
          <h3 className="font-cairo text-xl sm:text-2xl font-bold text-[#3a2720]">
            تغيير الموسيقى والزفة
          </h3>
          <p className="font-cairo text-xs sm:text-sm text-stone-500 mt-1">
            اختر زفة الحفل أو ارفع ملف الصوت الخاص بك ليعمل تلقائياً
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-cairo flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Upload Custom Audio Button */}
        <div className="mb-5 p-4 rounded-2xl bg-[#520b1b]/5 border-2 border-dashed border-[#520b1b]/30 text-center">
          <Music className="w-7 h-7 text-[#520b1b] mx-auto mb-2 opacity-80" />
          <h4 className="font-cairo font-bold text-sm text-[#520b1b]">
            رفع ملف الصوت الخاص بك
          </h4>
          <p className="font-cairo text-xs text-stone-500 mt-0.5 mb-3">
            اختر ملف الزفة أو الأغنية من هاتفك أو جهازك (MP3, M4A, WAV)
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 rounded-xl bg-[#520b1b] hover:bg-[#6b0f24] text-white text-xs sm:text-sm font-cairo font-medium inline-flex items-center gap-2 transition cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'جاري التحميل...' : 'اختيار ملف الصوت من الجهاز'}</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
          />
        </div>

        {/* Available Presets */}
        <div className="space-y-3">
          <p className="font-cairo text-xs font-bold text-stone-600 px-1">
            المقاطع الجاهزة:
          </p>

          {PRESETS.map((preset) => {
            const isSelected = currentTrack.url === preset.url;
            const isPreviewing = previewingUrl === preset.url;

            return (
              <div
                key={preset.id}
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#520b1b] bg-[#520b1b]/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h5 className="font-cairo font-bold text-sm text-[#3a2720] truncate">
                      {preset.title}
                    </h5>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-[#520b1b] text-white text-[10px] font-cairo font-medium">
                        المفعّل حالياً
                      </span>
                    )}
                  </div>
                  <p className="font-cairo text-xs text-stone-500 line-clamp-1 mt-0.5">
                    {preset.subtitle}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Preview button */}
                  <button
                    onClick={() => handleTogglePreview(preset.url)}
                    title={isPreviewing ? 'إيقاف المعاينة' : 'استماع للمقطع'}
                    className="w-8 h-8 rounded-full bg-white border border-stone-200 hover:border-stone-300 text-stone-700 flex items-center justify-center transition cursor-pointer shadow-2xs"
                  >
                    {isPreviewing ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Select button */}
                  {!isSelected && (
                    <button
                      onClick={() => handleSelectPreset(preset)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#520b1b] hover:bg-[#681023] text-white text-xs font-cairo font-medium transition cursor-pointer shadow-2xs"
                    >
                      تفعيل
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Auto-play note */}
        <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-cairo flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            سيبدأ الصوت في العمل تلقائياً فور قيام الضيف بالضغط على زر «فتح الدعوة» أو لمس الشاشة.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-100">
          <button
            onClick={() => {
              if (previewAudioRef.current) previewAudioRef.current.pause();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-cairo text-sm font-semibold transition cursor-pointer shadow"
          >
            تأكيد ومتابعة
          </button>
        </div>
      </div>
    </div>
  );
};
