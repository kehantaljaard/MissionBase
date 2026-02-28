'use client';

import { useRef, useState, useEffect } from 'react';
import { HeroContent } from '@/lib/types';

interface Props {
  content: HeroContent;
}

export default function HeroSection({ content }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);

  const gallery = content.galleryImages?.filter(Boolean) || [];

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center pt-16"
        style={
          content.backgroundImage
            ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,${showText ? 0.55 : 0.2}), rgba(0,0,0,${showText ? 0.55 : 0.2})), url(${content.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease',
              }
            : undefined
        }
      >
        {!content.backgroundImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-brand-light to-brand-teal/20" />
        )}

        {/* Meals served banner */}
        {(content.mealsThisWeek ?? 0) > 0 && (
          <div className="absolute bottom-4 right-4 z-20 bg-black/30 backdrop-blur-sm border-2 border-brand-mustard rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="text-lg">🍗</span>
            <div className="text-xs font-semibold text-white leading-tight">
              <span className="text-base font-bold">{content.mealsThisWeek?.toLocaleString()}</span>
              <br />
              meals this week
            </div>
          </div>
        )}

        <div
          className={`relative z-10 max-w-4xl mx-auto px-4 text-center py-8 md:py-20 transition-all duration-1000 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1
            className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 ${
              content.backgroundImage ? 'text-white drop-shadow-lg' : 'text-brand-dark'
            }`}
          >
            {content.heading}
          </h1>
          <p
            className={`text-base sm:text-xl md:text-3xl font-medium mb-4 md:mb-8 transition-all duration-1000 delay-300 ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${content.backgroundImage ? 'text-orange-200 drop-shadow-md' : 'text-brand-orange'}`}
          >
            {content.tagline}
          </p>
          <p
            className={`text-sm md:text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${content.backgroundImage ? 'text-gray-100 drop-shadow-md' : 'text-gray-600'}`}
          >
            {content.description}
          </p>

          <div
            className={`mt-5 md:mt-10 flex flex-wrap gap-3 md:gap-4 justify-center transition-all duration-1000 delay-500 ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a
              href="#donate"
              className="px-6 md:px-8 py-2.5 md:py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg text-sm md:text-base"
            >
              Support Us
            </a>
            <a
              href="#contact"
              className="px-6 md:px-8 py-2.5 md:py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-lg text-sm md:text-base"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {gallery.length > 0 && (
        <div className="bg-gray-900 py-2 md:py-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <p className="text-xs md:text-sm text-gray-400 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Swipe to see more
              </p>
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {gallery.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 snap-center w-72 sm:w-80 md:w-96 aspect-[4/3] rounded-xl overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`Gallery photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
