import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc, Music, SlidersHorizontal } from 'lucide-react';
import { getAudioTrack } from '../utils/audioStorage';
import { AudioChangerModal } from './AudioChangerModal';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>('/wedding_audio.mp3');
  const [trackTitle, setTrackTitle] = useState<string>('زفة أفراح - طلي بالأبيض');
  const [isChangerOpen, setIsChangerOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Helper to start playback
  const startPlayback = () => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.warn('Autoplay restricted by browser until user interaction:', err);
    });
  };

  useEffect(() => {
    // 1. Load active audio track
    getAudioTrack().then((track) => {
      setAudioUrl(track.url);
      setTrackTitle(track.title);
    });

    // 2. Listen for track updates
    const handleAudioUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ url: string; title: string }>;
      if (customEvent.detail) {
        setAudioUrl(customEvent.detail.url);
        setTrackTitle(customEvent.detail.title);
        if (audioRef.current) {
          audioRef.current.src = customEvent.detail.url;
          audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
        }
      }
    };
    window.addEventListener('wedding_audio_updated', handleAudioUpdate);

    // 3. Listen for invitation open gesture
    const handleStartMusic = () => {
      startPlayback();
    };
    window.addEventListener('start_wedding_music', handleStartMusic);

    // 4. Ambient automatic play: attempt immediately, and attach one-time user interaction listener
    const onFirstUserGesture = () => {
      startPlayback();
      window.removeEventListener('click', onFirstUserGesture);
      window.removeEventListener('touchstart', onFirstUserGesture);
    };

    // Attempt direct autoplay
    const timer = setTimeout(() => {
      startPlayback();
    }, 500);

    // Fallback on very first touch/click
    window.addEventListener('click', onFirstUserGesture, { once: true });
    window.addEventListener('touchstart', onFirstUserGesture, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wedding_audio_updated', handleAudioUpdate);
      window.removeEventListener('start_wedding_music', handleStartMusic);
      window.removeEventListener('click', onFirstUserGesture);
      window.removeEventListener('touchstart', onFirstUserGesture);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.warn);
    }
  };

  return (
    <>
      {/* Hidden Audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Audio Dock */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5" dir="rtl">
        {/* Play/Pause Main Button */}
        <button
          id="btn-toggle-music"
          onClick={togglePlay}
          aria-label={isPlaying ? 'إيقاف صوت الزفة' : 'تشغيل صوت الزفة'}
          className={`group flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full backdrop-blur-md shadow-lg border transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-[#520b1b] text-white border-[#72152a] shadow-[#520b1b]/30'
              : 'bg-white/95 text-[#4a3931] border-[#e2d5c7] hover:border-[#520b1b]/40'
          }`}
          title={trackTitle}
        >
          <div className={`relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
            <Disc className={`w-4 h-4 sm:w-5 sm:h-5 ${isPlaying ? 'text-amber-200' : 'text-[#520b1b]'}`} />
          </div>

          <span className="text-xs font-cairo font-medium truncate max-w-[120px] sm:max-w-[160px]">
            {isPlaying ? trackTitle : 'تشغيل الصوت'}
          </span>

          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-amber-200 animate-pulse shrink-0" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          )}
        </button>

        {/* Change Sound Button */}
        <button
          id="btn-open-audio-changer"
          onClick={() => setIsChangerOpen(true)}
          className="p-2 sm:p-2.5 rounded-full bg-white/95 text-[#520b1b] hover:bg-[#520b1b]/10 border border-[#e2d5c7] shadow-lg backdrop-blur-md transition cursor-pointer"
          title="تغيير الصوت أو رفع زفة خاصة"
          aria-label="تغيير الصوت"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Audio Changer Modal */}
      <AudioChangerModal
        isOpen={isChangerOpen}
        onClose={() => setIsChangerOpen(false)}
      />
    </>
  );
};
