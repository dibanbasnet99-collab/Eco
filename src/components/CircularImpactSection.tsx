import { useEffect, useRef, useState } from 'react';
import { Bike, HandHeart, PackageCheck, RefreshCw } from 'lucide-react';
import { motion, useInView } from 'motion/react';

interface CircularImpactSectionProps {
  bagBottlesSaved: number;
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frameId: number;
    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function CircularImpactSection({ bagBottlesSaved }: CircularImpactSectionProps) {
  const pillars = [
    {
      icon: RefreshCw,
      title: 'Take-Back Rewards',
      nepali: 'खाली भाँडो फिर्ता',
      description:
        'Return empty aluminium deodorant tins or glass refill jars to our Babar Mahal counter for an instant 5% off your next refill.',
      detail: 'Closed-loop sanitization in Kathmandu',
    },
    {
      icon: Bike,
      title: 'EV Delivery Fleet',
      nepali: 'इलेक्ट्रिक स्कुटर डेलिभरी',
      description:
        'Zero-emission electric scooter deliveries across Kathmandu, Lalitpur, and Bhaktapur—packed exclusively in reused cartons.',
      detail: 'Free Valley EV delivery over NPR 2,000',
    },
    {
      icon: HandHeart,
      title: 'Local Artisan Craft',
      nepali: 'नेपाली कालिगढको सीप',
      description:
        'Sourced and crafted alongside Nepali woodcarvers, Sisnu soap makers, and Terai bamboo weavers to uplift local livelihoods.',
      detail: '14+ local maker collectives supported',
    },
  ];

  return (
    <section
      id="circular-loop"
      aria-labelledby="circular-heading"
      className="py-16 lg:py-24 bg-[#EFECE2]/55"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B87D4B] mb-2.5">
            Our Circular Loop in Nepal
          </p>
          <h2
            id="circular-heading"
            className="font-display text-3xl sm:text-4xl font-medium text-[#1E2420] tracking-tight text-balance mb-3"
          >
            Built to Eliminate Packaging, Not Just Recycle It
          </h2>
          <p className="text-base text-[#5A635D] leading-relaxed">
            Every order keeps single-use plastic out of Bagmati rivers and Kathmandu landfills
            through local reuse systems.
          </p>
        </motion.div>

        {/* 4-Column Circular Economy Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#F7F4EB] rounded-2xl border border-[#1E2420]/10 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EFECE2] border border-[#1E2420]/10 flex items-center justify-center text-[#2D4A3E] mb-5">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <p className="font-devanagari text-xs text-[#B87D4B] font-medium mb-1">
                    {pillar.nepali}
                  </p>
                  <h3 className="font-display text-xl font-medium text-[#1E2420] mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#5A635D] leading-relaxed">{pillar.description}</p>
                </div>

                <div className="pt-5 mt-6 border-t border-[#1E2420]/10 text-xs font-medium text-[#2D4A3E]">
                  {pillar.detail}
                </div>
              </motion.article>
            );
          })}

          {/* Column 4: Animated Community Impact Counter Card */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.21, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#2D4A3E] text-[#F7F4EB] rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F7F4EB]/12 flex items-center justify-center text-[#F7F4EB] mb-5">
                <PackageCheck className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#EFECE2]/75 mb-4">
                Community Impact Counter
              </p>

              <div className="space-y-4">
                <div className="pb-3.5 border-b border-[#F7F4EB]/15">
                  <div className="font-display text-3xl font-semibold text-[#F7F4EB]">
                    <AnimatedCounter target={28400 + bagBottlesSaved} suffix="+" />
                  </div>
                  <div className="text-xs text-[#EFECE2]/80 mt-0.5">
                    Plastic Bottles Prevented
                  </div>
                </div>

                <div className="pb-3.5 border-b border-[#F7F4EB]/15">
                  <div className="font-display text-3xl font-semibold text-[#F7F4EB]">
                    <AnimatedCounter target={12000} suffix="+" />
                  </div>
                  <div className="text-xs text-[#EFECE2]/80 mt-0.5">
                    Bamboo Essentials Swapped
                  </div>
                </div>

                <div>
                  <div className="font-display text-3xl font-semibold text-[#F7F4EB] tabular-nums">
                    100%
                  </div>
                  <div className="text-xs text-[#EFECE2]/80 mt-0.5">
                    Plastic-Free Lokta &amp; Kraft Shipping
                  </div>
                </div>
              </div>
            </div>

            {bagBottlesSaved > 0 && (
              <div className="pt-4 mt-5 border-t border-[#F7F4EB]/15 text-xs text-[#EFECE2]">
                Your current bag adds{' '}
                <strong className="tabular-nums">+{bagBottlesSaved}</strong> bottles saved.
              </div>
            )}
          </motion.article>
        </div>
      </div>
    </section>
  );
}
