import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Camera } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { getPhoto, savePhoto } from '../utils/photoStorage';

interface PhotoCarouselProps {
  photos: GalleryPhoto[];
}

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({
    'photo-1': '/IMG-20260916-WA0002.jpg',
    'photo-2': '/IMG-20260916-WA0005.jpg',
    'photo-3': '/IMG-20260916-WA0004.jpg'
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load from IndexedDB
  useEffect(() => {
    const loadAll = async () => {
      const p1 = await getPhoto('photo_childhood', '/IMG-20260916-WA0002.jpg');
      const p2 = await getPhoto('photo_sofa', '/IMG-20260916-WA0005.jpg');
      const p3 = await getPhoto('photo_rings', '/IMG-20260916-WA0004.jpg');
      setCustomPhotos({
        'photo-1': p1,
        'photo-2': p2,
        'photo-3': p3
      });
    };
    loadAll();

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; dataUrl: string }>;
      if (customEvent.detail) {
        const { key, dataUrl } = customEvent.detail;
        if (key === 'photo_childhood') {
          setCustomPhotos((prev) => ({ ...prev, 'photo-1': dataUrl }));
        } else if (key === 'photo_sofa') {
          setCustomPhotos((prev) => ({ ...prev, 'photo-2': dataUrl }));
        } else if (key === 'photo_rings') {
          setCustomPhotos((prev) => ({ ...prev, 'photo-3': dataUrl }));
        }
      }
    };
    window.addEventListener('wedding_photos_updated', handleSync);
    return () => window.removeEventListener('wedding_photos_updated', handleSync);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const currentPhoto = displayPhotos[currentIndex];
    if (file && currentPhoto) {
      const slotKey = currentPhoto.id === 'photo-1' ? 'photo_childhood' : currentPhoto.id === 'photo-2' ? 'photo_sofa' : 'photo_rings';
      const defaultFileName = currentPhoto.id === 'photo-1' ? 'IMG-20260916-WA0002.jpg' : currentPhoto.id === 'photo-2' ? 'IMG-20260916-WA0005.jpg' : 'IMG-20260916-WA0004.jpg';

      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setCustomPhotos((prev) => ({ ...prev, [currentPhoto.id]: resultStr }));
          await savePhoto(slotKey, resultStr, defaultFileName);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Map photos with custom stored photos
  const displayPhotos = photos.map((p) => {
    if (customPhotos[p.id]) {
      return { ...p, url: customPhotos[p.id] };
    }
    return p;
  });

  // Auto-scroll every 5 seconds if not interacting
  useEffect(() => {
    if (lightboxPhoto) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [displayPhotos.length, lightboxPhoto]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayPhotos.length) % displayPhotos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayPhotos.length);
  };

  return (
    <div className="w-full my-6 text-center">
      {/* Title */}
      <h3 className="font-cairo text-2xl font-bold text-[#3a2720] mb-5 tracking-wide">
        معرض الصور
      </h3>

      {/* Carousel Container */}
      <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-[28px] shadow-xl bg-white aspect-square group border border-[#ece3d8]">
        {/* Photos Slides */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${currentIndex * 100}%)` }}
        >
          {displayPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="w-full h-full shrink-0 relative cursor-pointer"
              onClick={() => setLightboxPhoto(photo)}
            >
              <img
                src={photo.url}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/src/assets/images/')) {
                    target.src = `/src/assets/images${photo.url}`;
                  }
                }}
                alt={photo.title}
                className={`w-full h-full object-cover select-none ${
                  photo.id === 'photo-1' ? 'object-top' : photo.id === 'photo-2' ? 'object-top' : 'object-center'
                }`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-between text-white">
                <span className="font-cairo text-xs font-medium">{photo.caption}</span>
                <Maximize2 className="w-4 h-4 text-white/80" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick upload button if on slide 0 */}
        {currentIndex === 0 && (
          <div className="absolute top-3 left-3 z-30 opacity-70 hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title="تغيير الصورة أو رفع الأصلية"
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#520b1b] flex items-center justify-center shadow backdrop-blur-xs cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next Photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous Photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {displayPhotos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-6 h-2 bg-[#520b1b]'
                : 'w-2 h-2 bg-[#d6c4b8] hover:bg-[#a89081]'
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.title}
              className="w-full h-auto max-h-[75vh] object-contain mx-auto"
            />
            <div className="p-4 text-center text-white font-cairo">
              <p className="font-semibold text-base">{lightboxPhoto.title}</p>
              <p className="text-xs text-stone-300 mt-1">{lightboxPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
