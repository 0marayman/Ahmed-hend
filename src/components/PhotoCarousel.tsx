import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface PhotoCarouselProps {
  photos: GalleryPhoto[];
}

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  // Auto-scroll every 4.5 seconds if not viewing lightbox
  useEffect(() => {
    if (lightboxPhoto) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [photos.length, lightboxPhoto]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
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
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className="w-full h-full shrink-0 relative cursor-pointer"
              onClick={() => setLightboxPhoto(photo)}
            >
              <img
                src={photo.url}
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
        {photos.map((_, idx) => (
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
