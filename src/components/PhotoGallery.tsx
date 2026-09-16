import React, { useState, useEffect, useCallback } from 'react';
import { GalleryPhoto } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Heart, Sparkles, Filter } from 'lucide-react';

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [likedPhotoIds, setLikedPhotoIds] = useState<Set<string>>(new Set(['photo-1']));

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Memories' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'prewedding', label: 'Editorial' },
    { id: 'moments', label: 'Moments' },
    { id: 'details', label: 'Details' }
  ];

  const handleToggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPhotoIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => ((prev! + 1) % filteredPhotos.length));
  }, [activePhotoIndex, filteredPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [activePhotoIndex, filteredPhotos.length]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'Escape') setActivePhotoIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleNextPhoto, handlePrevPhoto]);

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#8a7a6c] bg-[#f7f3ed] rounded-full mr-1">
          <Filter className="w-3.5 h-3.5 text-[#b88e4f]" />
          <span>Filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`gallery-filter-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#93714b] text-white shadow-xs'
                : 'bg-white text-[#6b5d51] border border-[#e8dfd5] hover:border-[#b88e4f] hover:text-[#2c241e]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPhotos.map((photo, index) => {
          const isLiked = likedPhotoIds.has(photo.id);
          return (
            <div
              key={photo.id}
              id={`photo-card-${photo.id}`}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#f3ece3] cursor-pointer aspect-4/5 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white" />

              {/* Heart like button */}
              <button
                id={`btn-like-photo-${photo.id}`}
                onClick={(e) => handleToggleLike(e, photo.id)}
                className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-transform duration-200 active:scale-90 ${
                  isLiked
                    ? 'bg-rose-500 text-white'
                    : 'bg-black/30 text-white/90 hover:bg-black/50'
                }`}
                aria-label="Like photo"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>

              {/* View larger icon indicator */}
              <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Caption details at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-xs uppercase tracking-wider text-[#dfcebe] font-medium mb-1">
                  {photo.category}
                </p>
                <h4 className="font-display font-medium text-sm sm:text-base leading-tight">
                  {photo.title}
                </h4>
                <p className="text-xs text-white/80 mt-1 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          id="photo-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-white/70">
                {activePhotoIndex + 1} / {filteredPhotos.length}
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="hidden sm:inline text-xs uppercase tracking-widest text-[#d4af37]">
                {filteredPhotos[activePhotoIndex].category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="btn-lightbox-like"
                onClick={(e) => handleToggleLike(e, filteredPhotos[activePhotoIndex].id)}
                className={`p-2 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                  likedPhotoIds.has(filteredPhotos[activePhotoIndex].id)
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    likedPhotoIds.has(filteredPhotos[activePhotoIndex].id) ? 'fill-current' : ''
                  }`}
                />
              </button>
              <button
                id="btn-lightbox-close"
                onClick={() => setActivePhotoIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          <button
            id="btn-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
            className="absolute left-3 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Photo Container */}
          <div
            className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[activePhotoIndex].url}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            {/* Caption beneath photo */}
            <div className="mt-4 text-center text-white max-w-lg">
              <h3 className="font-display text-lg sm:text-xl font-semibold">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 mt-1">
                {filteredPhotos[activePhotoIndex].caption}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            id="btn-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
            className="absolute right-3 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
