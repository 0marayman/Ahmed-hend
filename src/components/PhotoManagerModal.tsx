import React, { useState, useRef, useEffect } from 'react';
import { Camera, Check, Upload, X, Image as ImageIcon } from 'lucide-react';
import { savePhoto, getPhoto } from '../utils/photoStorage';

interface PhotoSlot {
  key: string;
  title: string;
  subtitle: string;
  fileName: string;
  defaultUrl: string;
}

const PHOTO_SLOTS: PhotoSlot[] = [
  {
    key: 'photo_childhood',
    title: 'صورة الطفولة (Save The Date)',
    subtitle: 'الصورة التي في أعلى الدعوة وفي معرض الصور',
    fileName: 'IMG-20260916-WA0002.jpg',
    defaultUrl: '/IMG-20260916-WA0002.jpg'
  },
  {
    key: 'photo_sofa',
    title: 'صورة الخطوبة على الأريكة',
    subtitle: 'صورة أحمد وهند معاً وصورة الملف الشخصي',
    fileName: 'IMG-20260916-WA0005.jpg',
    defaultUrl: '/IMG-20260916-WA0005.jpg'
  },
  {
    key: 'photo_rings',
    title: 'صورة الخواتم وباقة الورد',
    subtitle: 'الأيدي والخاتم الأسود مع باقة الورد الملونة',
    fileName: 'IMG-20260916-WA0004.jpg',
    defaultUrl: '/IMG-20260916-WA0004.jpg'
  }
];

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({ isOpen, onClose }) => {
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!isOpen) return;
    const loadAll = async () => {
      const current: Record<string, string> = {};
      for (const slot of PHOTO_SLOTS) {
        current[slot.key] = await getPhoto(slot.key, slot.defaultUrl);
      }
      setPreviews(current);
    };
    loadAll();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = async (slot: PhotoSlot, file: File) => {
    setUploadingKey(slot.key);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      if (result) {
        await savePhoto(slot.key, result, slot.fileName);
        setPreviews((prev) => ({ ...prev, [slot.key]: result }));
        setSuccessMsg(`تم تحديث ${slot.title} بنجاح!`);
        setTimeout(() => setSuccessMsg(null), 3500);
      }
      setUploadingKey(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-right"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-7 border border-[#e5ded4] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#520b1b]/10 text-[#520b1b] mx-auto flex items-center justify-center mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="font-cairo text-xl sm:text-2xl font-bold text-[#3a2720]">
            وضع صورك الأصلية بالدعوة
          </h3>
          <p className="font-cairo text-xs sm:text-sm text-stone-500 mt-1">
            اختر صور الواتساب الأصلية من جهازك ليتم عرضها بالدقة الكاملة فوراً
          </p>
        </div>

        {/* Success alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-cairo flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 3 Slots */}
        <div className="space-y-4">
          {PHOTO_SLOTS.map((slot) => {
            const currentImg = previews[slot.key] || slot.defaultUrl;
            const isUploading = uploadingKey === slot.key;

            return (
              <div
                key={slot.key}
                className="p-3.5 rounded-2xl border border-stone-200 hover:border-[#520b1b]/40 bg-stone-50/60 transition flex items-center gap-3.5"
              >
                {/* Image Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300 relative group">
                  <img
                    src={currentImg}
                    alt={slot.title}
                    className="w-full h-full object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
                      جاري الحفظ...
                    </div>
                  )}
                </div>

                {/* Info & Action */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-cairo font-bold text-sm sm:text-base text-[#3a2720] truncate">
                    {slot.title}
                  </h4>
                  <p className="font-cairo text-xs text-stone-500 line-clamp-1 mt-0.5">
                    {slot.subtitle}
                  </p>
                  <p className="font-mono text-[10px] text-stone-400 mt-0.5" dir="ltr">
                    {slot.fileName}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      onClick={() => fileInputRefs.current[slot.key]?.click()}
                      className="px-3 py-1.5 rounded-lg bg-[#520b1b] hover:bg-[#681426] text-white text-xs font-cairo font-medium flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>اختيار الصورة الأصلية</span>
                    </button>
                    <input
                      type="file"
                      ref={(el) => (fileInputRefs.current[slot.key] = el)}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(slot, file);
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-cairo text-sm font-semibold transition cursor-pointer shadow"
          >
            تم ومتابعة عرض الدعوة
          </button>
        </div>
      </div>
    </div>
  );
};
