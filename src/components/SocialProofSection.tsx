import { useState } from 'react';
import { ExternalLink, Play, Quote, X } from 'lucide-react';
import { motion } from 'motion/react';
import { SOCIAL_REELS, SocialReel, TESTIMONIALS } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

export function SocialProofSection() {
  const [activeReel, setActiveReel] = useState<SocialReel | null>(null);

  return (
    <section aria-labelledby="community-heading" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B87D4B] mb-2.5">
              Kathmandu Valley Community
            </p>
            <h2
              id="community-heading"
              className="font-display text-3xl sm:text-4xl font-medium text-[#1E2420] tracking-tight text-balance"
            >
              Real Swaps in Nepali Homes
            </h2>
          </div>
          <p className="text-sm text-[#5A635D] max-w-md">
            Over 5,000 neighbors across Kathmandu, Lalitpur, and Pokhara have switched to daily
            refills and bamboo essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((item, idx) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#EFECE2] rounded-2xl border border-[#1E2420]/10 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-5 h-5 text-[#B87D4B] mb-4" aria-hidden="true" />
                <p className="text-sm sm:text-[15px] text-[#1E2420] leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <footer className="pt-4 border-t border-[#1E2420]/10">
                <div className="font-display text-base font-medium text-[#1E2420]">
                  {item.name}
                </div>
                <div className="text-xs text-[#5A635D] mt-0.5">
                  {item.role} · {item.neighborhood}
                </div>
                <div className="text-xs font-medium text-[#2D4A3E] mt-1">
                  {item.productBought}
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Vertical 9:16 Short-Video Showcase Strip */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
            <div>
              <h3 className="font-display text-2xl font-medium text-[#1E2420]">
                As Seen on @ecosathi_nepal
              </h3>
              <p className="text-sm text-[#5A635D]">
                Refill runs, engraving reels, and behind-the-scenes from Babar Mahal Revisited.
              </p>
            </div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#2D4A3E] hover:underline inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Follow @ecosathi_nepal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SOCIAL_REELS.map((reel) => (
              <button
                key={reel.id}
                type="button"
                onClick={() => setActiveReel(reel)}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#1E2420] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E]"
              >
                <ResilientImage
                  src={reel.image}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2420]/90 via-[#1E2420]/25 to-[#1E2420]/20" />

                {/* Play Trigger */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#F7F4EB]/90 text-[#1E2420] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>

                {/* Top Duration & Handle */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-medium text-[#F7F4EB]/90">
                  <span>{reel.handle}</span>
                  <span className="tabular-nums bg-[#1E2420]/55 px-2 py-0.5 rounded">
                    {reel.duration}
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-[#F7F4EB]">
                  <p className="font-devanagari text-[11px] text-[#EFECE2]/85 mb-1">
                    {reel.nepaliCaption}
                  </p>
                  <p className="font-display text-sm sm:text-base font-medium leading-snug mb-1">
                    {reel.title}
                  </p>
                  <p className="text-[11px] text-[#EFECE2]/75 tabular-nums">{reel.views}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reel Story Preview Modal */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2420]/75 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reel-modal-title"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="bg-[#F7F4EB] rounded-2xl overflow-hidden max-w-sm w-full border border-[#1E2420]/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[9/12] bg-[#1E2420]">
              <ResilientImage
                src={activeReel.image}
                alt={activeReel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2420]/90 via-transparent to-[#1E2420]/30" />
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                aria-label="Close reel story"
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-[#F7F4EB]/90 text-[#1E2420] flex items-center justify-center hover:bg-[#F7F4EB]"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-[#F7F4EB]">
                <p className="text-xs font-medium text-[#EFECE2]/80 mb-1">
                  {activeReel.handle} · {activeReel.views}
                </p>
                <h4 id="reel-modal-title" className="font-display text-xl font-medium">
                  {activeReel.title}
                </h4>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <p className="font-devanagari text-xs font-medium text-[#B87D4B]">
                {activeReel.nepaliCaption}
              </p>
              <p className="text-sm text-[#5A635D] leading-relaxed">{activeReel.storyHighlight}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
