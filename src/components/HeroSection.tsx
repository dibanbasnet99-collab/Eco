import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ASSETS } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

const MARQUEE_ITEMS = [
  'PLASTIC-FREE PACKAGING',
  'BRING YOUR OWN CONTAINER',
  'LOCAL NEPALI ARTISANS',
  'ELECTRIC SCOOTER DELIVERY IN KATHMANDU',
  'PAY ONLY FOR WHAT YOU FILL',
];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B87D4B] mb-4">
                Nepal&apos;s 1st Zero Waste Store &amp; Refill Station
              </p>

              <h1
                id="hero-heading"
                className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-[#1E2420] leading-[1.08] tracking-tight text-balance mb-6"
              >
                Small Daily Swaps. Zero Plastic Waste.
              </h1>

              <p className="text-base sm:text-lg text-[#5A635D] leading-relaxed max-w-xl mb-8">
                From personalized bamboo essentials to Kathmandu&apos;s first pay-by-weight liquid
                refill bar at Babar Mahal Revisited. Conscious living made effortless for every
                Nepali home.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#shop"
                  className="btn-liquid-primary px-6 py-3.5 rounded-lg text-sm font-medium inline-flex items-center gap-2.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EB]"
                >
                  <span>Shop Zero-Waste Essentials</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#refill-station"
                  className="btn-liquid px-6 py-3.5 rounded-lg border border-[#2D4A3E]/35 text-[#2D4A3E] text-sm font-medium inline-flex items-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E]"
                >
                  How Refilling Works
                </a>
              </div>
            </div>

            {/* Quiet Unboxed Provenance & Trust Line */}
            <div className="pt-6 border-t border-[#1E2420]/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#5A635D]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#1E2420]">
                <Star className="w-4 h-4 fill-[#B87D4B] text-[#B87D4B]" aria-hidden="true" />
                4.9 Rated by 5,000+ Eco-Conscious Nepalis
              </span>
              <span aria-hidden="true">·</span>
              <span>Since 2019</span>
              <span aria-hidden="true">·</span>
              <span>Babar Mahal Revisited, Kathmandu</span>
            </div>
          </motion.div>

          {/* Right Split Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-[#EFECE2] border border-[#1E2420]/10">
              <ResilientImage
                src={ASSETS.heroRefill}
                alt="Amber glass apothecary refill dispensers for hand wash, dish wash, and floor cleaner beside a bamboo tumbler and wooden comb in a sunlit Kathmandu courtyard"
                className="w-full h-full object-cover"
                fallbackTitle="Eco Sathi Refill Bar · Babar Mahal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2420]/80 via-[#1E2420]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-[#F7F4EB]">
                <div>
                  <p className="font-devanagari text-xs text-[#EFECE2]/90 mb-0.5">
                    बबरमहल रिभिजिटेड · काठमाडौं
                  </p>
                  <p className="font-display text-lg sm:text-xl font-medium">
                    Apothecary Refill Bar &amp; Bamboo Craft
                  </p>
                </div>
                <span className="text-xs font-medium text-[#EFECE2] whitespace-nowrap">
                  4.9★ · 5,000+ Nepalis · Since 2019
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Smooth Horizontal Marquee Ticker */}
      <div
        className="border-y border-[#1E2420]/12 bg-[#EFECE2] py-3.5 overflow-hidden select-none"
        aria-label="Circular values ticker"
      >
        <div className="animate-marquee">
          {[0, 1].map((dupIndex) => (
            <div key={dupIndex} className="flex items-center shrink-0">
              {MARQUEE_ITEMS.map((item, idx) => (
                <span
                  key={`${dupIndex}-${idx}`}
                  className="inline-flex items-center text-xs font-semibold tracking-[0.14em] text-[#2D4A3E] whitespace-nowrap"
                >
                  <span className="px-6">{item}</span>
                  <span className="text-[#B87D4B]" aria-hidden="true">
                    •
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
