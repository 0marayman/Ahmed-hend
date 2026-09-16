import React, { useState } from 'react';
import { GuestWish } from '../types';
import { Heart, MessageSquareHeart, Send, Sparkles, User, Filter } from 'lucide-react';

interface WishesWallProps {
  wishes: GuestWish[];
  onAddWish: (wish: GuestWish) => void;
}

export const WishesWall: React.FC<WishesWallProps> = ({ wishes, onAddWish }) => {
  const [authorName, setAuthorName] = useState('');
  const [guestSide, setGuestSide] = useState<'groom' | 'bride' | 'mutual'>('mutual');
  const [message, setMessage] = useState('');
  const [likedWishIds, setLikedWishIds] = useState<Set<string>>(new Set());
  const [filterSide, setFilterSide] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = (id: string) => {
    setLikedWishIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: GuestWish = {
      id: 'wish-' + Date.now(),
      author: authorName.trim(),
      guestSide,
      message: message.trim(),
      likes: 1,
      createdAt: 'Just now'
    };

    setTimeout(() => {
      onAddWish(newWish);
      setAuthorName('');
      setMessage('');
      setIsSubmitting(false);
    }, 200);
  };

  const filteredWishes = filterSide === 'all'
    ? wishes
    : wishes.filter((w) => w.guestSide === filterSide);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <p className="font-script text-2xl sm:text-3xl text-[#b88e4f]">
          Blessings & Love
        </p>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#2c241e] tracking-tight">
          Guestbook & Wishes Wall
        </h3>
        <p className="text-xs sm:text-sm text-[#786a5e] mt-2">
          Read warm words from beloved family & friends, or leave your own blessing for Mohyeldin & Hend.
        </p>
      </div>

      {/* Leave a Wish Quick Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ded3] shadow-xs mb-10">
        <div className="flex items-center gap-2 mb-4 text-[#93714b]">
          <MessageSquareHeart className="w-5 h-5" />
          <h4 className="font-display text-lg font-bold text-[#2c241e]">Leave a Blessing</h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wish-author" className="block text-xs font-semibold text-[#524438] mb-1.5">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a39485]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="wish-author"
                  type="text"
                  required
                  placeholder="e.g. Layla & Tarek"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fdfaf6] border border-[#e4d8cb] focus:border-[#93714b] rounded-xl text-xs sm:text-sm text-[#2c241e] outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="wish-side" className="block text-xs font-semibold text-[#524438] mb-1.5">
                Your Connection
              </label>
              <select
                id="wish-side"
                value={guestSide}
                onChange={(e) => setGuestSide(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-[#fdfaf6] border border-[#e4d8cb] focus:border-[#93714b] rounded-xl text-xs sm:text-sm text-[#2c241e] outline-none"
              >
                <option value="mutual">Mutual Friend / Relative</option>
                <option value="groom">Guest of Mohyeldin</option>
                <option value="bride">Guest of Hend</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="wish-message" className="block text-xs font-semibold text-[#524438] mb-1.5">
              Your Message
            </label>
            <textarea
              id="wish-message"
              required
              rows={3}
              placeholder="May your days together be filled with sunshine, laughter, and endless blessing..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#fdfaf6] border border-[#e4d8cb] focus:border-[#93714b] rounded-xl text-xs sm:text-sm text-[#2c241e] outline-none resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 bg-[#93714b] hover:bg-[#7d5f3d] text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Blessing</span>
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8a7b6d]">
          {wishes.length} Heartfelt Messages
        </span>

        <div className="flex items-center gap-1.5 bg-[#f4ece3] p-1 rounded-xl">
          {[
            { id: 'all', label: 'All' },
            { id: 'groom', label: "Mohyeldin's Side" },
            { id: 'bride', label: "Hend's Side" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterSide(tab.id)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                filterSide === tab.id
                  ? 'bg-white text-[#2c241e] shadow-xs'
                  : 'text-[#7d6f63] hover:text-[#2c241e]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wishes Stream */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredWishes.map((wish) => {
          const isLiked = likedWishIds.has(wish.id);
          const currentLikes = wish.likes + (isLiked ? 1 : 0);

          return (
            <div
              key={wish.id}
              className="bg-white rounded-2xl p-5 border border-[#e8ded3] shadow-xs hover:border-[#b88e4f]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#f4eee6] text-[#93714b] flex items-center justify-center font-bold text-xs">
                      {wish.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="font-semibold text-xs sm:text-sm text-[#2c241e]">
                        {wish.author}
                      </h5>
                      <span className="text-[10px] text-[#9c8b7d] uppercase tracking-wider">
                        {wish.guestSide === 'groom'
                          ? "Groom's Friend"
                          : wish.guestSide === 'bride'
                          ? "Bride's Friend"
                          : 'Cherished Guest'}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#9c8b7d]">{wish.createdAt}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#59493c] leading-relaxed italic font-serif-wedding mt-3">
                  "{wish.message}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f2eae1] flex items-center justify-end">
                <button
                  onClick={() => handleLike(wish.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    isLiked
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-[#87786b] hover:bg-[#faf5ee] hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                  <span>{currentLikes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
