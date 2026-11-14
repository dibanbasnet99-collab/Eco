import { useState } from 'react';
import { Droplets, Scale, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ASSETS, REFILL_LIQUIDS, RefillLiquid } from '../data/storeData';
import { CartItem } from '../types/cart';

interface RefillStationSectionProps {
  onAddRefillToCart: (item: CartItem) => void;
}

const REFILL_STEPS = [
  {
    step: '01',
    title: 'Weigh & Tare',
    nepali: 'भाँडो तौलनुहोस्',
    description:
      'Bring your own clean bottle from home or pick a sanitized reusable glass jar in-store. We weigh the empty container first so you never pay for packaging.',
  },
  {
    step: '02',
    title: 'Refill',
    nepali: 'सामग्री भर्नुहोस्',
    description:
      'Fill up on biodegradable Floor Cleaner, Herbal Hand Wash, or Citrus Dish Wash Liquid—dispense as little or as much as your household needs.',
  },
  {
    step: '03',
    title: 'Pay by Weight',
    nepali: 'तौल अनुसार भुक्तानी',
    description:
      'We deduct the tared container weight at checkout. You pay strictly for the pure, plant-based product inside—zero single-use plastic left behind.',
  },
];

export function RefillStationSection({ onAddRefillToCart }: RefillStationSectionProps) {
  const [selectedLiquid, setSelectedLiquid] = useState<RefillLiquid>(REFILL_LIQUIDS[0]);
  const [volumeMl, setVolumeMl] = useState<number>(500);
  const [justAdded, setJustAdded] = useState(false);

  // 100ml ~ 100g for aqueous biodegradable cleaners
  const estimatedCost = Math.round((volumeMl / 100) * selectedLiquid.ratePer100g);
  const bottlesSaved = Math.max(1, Math.round((volumeMl / selectedLiquid.bottleEquivalentMl) * 10) / 10);
  const fillPercent = Math.min(92, Math.max(12, Math.round((volumeMl / 2000) * 100)));

  const handleAddRefill = () => {
    onAddRefillToCart({
      cartKey: `refill-${selectedLiquid.id}-${volumeMl}`,
      productId: `refill-${selectedLiquid.id}`,
      name: `${selectedLiquid.name} (${volumeMl}ml Refill)`,
      nepaliName: selectedLiquid.nepaliName,
      price: estimatedCost,
      quantity: 1,
      image: ASSETS.heroRefill,
      bottlesSaved: Math.max(1, Math.ceil(volumeMl / selectedLiquid.bottleEquivalentMl)),
      isRefill: true,
      refillVolumeMl: volumeMl,
      engravingNote: `Bring-Your-Own / Returnable Glass Jar · ${volumeMl}ml`,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section id="refill-station" aria-labelledby="refill-heading" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B87D4B] mb-2.5">
            Babar Mahal Courtyard Refill Bar
          </p>
          <h2
            id="refill-heading"
            className="font-display text-3xl sm:text-4xl font-medium text-[#1E2420] tracking-tight text-balance mb-3"
          >
            How the Refill Station Works
          </h2>
          <p className="text-base text-[#5A635D] leading-relaxed">
            Inspired by traditional Nepali kirana bulk weighing, redesigned for modern biodegradable
            home and body care.
          </p>
        </motion.div>

        {/* 3-Step Bilingual Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {REFILL_STEPS.map((item, idx) => (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#EFECE2] rounded-2xl p-7 border border-[#1E2420]/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 pb-4 mb-5 border-b border-[#1E2420]/10">
                  <span className="font-display text-2xl font-medium text-[#2D4A3E] tabular-nums">
                    {item.step}.
                  </span>
                  <span className="font-devanagari text-sm font-medium text-[#B87D4B]">
                    {item.nepali}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-[#1E2420] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#5A635D] leading-relaxed">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Interactive Refill Estimator Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#EFECE2] rounded-2xl border border-[#1E2420]/12 p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Interactive Controls */}
            <div className="lg:col-span-7 space-y-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-display text-2xl font-medium text-[#1E2420]">
                    Interactive Refill Cost Estimator
                  </h3>
                  <span className="font-devanagari text-xs font-medium text-[#5A635D]">
                    अनुमानित मूल्य र बचत
                  </span>
                </div>
                <p className="text-sm text-[#5A635D]">
                  Choose a plant-based formula and slide your desired quantity to calculate exact
                  NPR pricing and plastic bottles saved.
                </p>
              </div>

              {/* Liquid Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#5A635D] mb-3">
                  1. Select Biodegradable Liquid
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {REFILL_LIQUIDS.map((liquid) => {
                    const isActive = liquid.id === selectedLiquid.id;
                    return (
                      <button
                        key={liquid.id}
                        type="button"
                        onClick={() => setSelectedLiquid(liquid)}
                        aria-pressed={isActive}
                        className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] ${
                          isActive
                            ? 'bg-[#2D4A3E] text-[#F7F4EB] border-[#2D4A3E]'
                            : 'bg-[#F7F4EB] text-[#1E2420] border-[#1E2420]/12 hover:border-[#2D4A3E]/40'
                        }`}
                      >
                        <div className="text-sm font-semibold leading-snug mb-1">{liquid.name}</div>
                        <div
                          className={`font-devanagari text-xs mb-2 ${
                            isActive ? 'text-[#EFECE2]/85' : 'text-[#5A635D]'
                          }`}
                        >
                          {liquid.nepaliName}
                        </div>
                        <div
                          className={`text-xs font-semibold tabular-nums ${
                            isActive ? 'text-[#EFECE2]' : 'text-[#B87D4B]'
                          }`}
                        >
                          NPR {liquid.ratePer100g} / 100g
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2.5 text-xs text-[#5A635D]">{selectedLiquid.notes}</p>
              </div>

              {/* Volume Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label
                    htmlFor="refill-volume-slider"
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5A635D]"
                  >
                    2. Choose Fill Quantity
                  </label>
                  <span className="font-display text-xl font-semibold text-[#1E2420] tabular-nums">
                    {volumeMl} ml
                  </span>
                </div>

                <input
                  id="refill-volume-slider"
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={volumeMl}
                  onChange={(e) => setVolumeMl(Number(e.target.value))}
                  className="eco-slider w-full"
                />

                <div className="flex justify-between text-xs text-[#5A635D] tabular-nums mt-2">
                  <span>100 ml</span>
                  <span>500 ml</span>
                  <span>1,000 ml</span>
                  <span>1,500 ml</span>
                  <span>2,000 ml</span>
                </div>
              </div>
            </div>

            {/* Right Live Jar Visualization & Output Summary */}
            <div className="lg:col-span-5 bg-[#F7F4EB] rounded-2xl border border-[#1E2420]/10 p-6 sm:p-7 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6">
              {/* Animated Apothecary Bottle Visual */}
              <div className="shrink-0 flex flex-col items-center">
                <div
                  className="relative w-28 h-44 flex flex-col items-center justify-end"
                  aria-hidden="true"
                >
                  {/* Pump Neck */}
                  <div className="w-6 h-3 bg-[#B87D4B] rounded-t-sm" />
                  <div className="w-9 h-3 bg-[#1E2420] rounded-t-md" />
                  {/* Amber Glass Body */}
                  <div className="relative w-24 h-36 rounded-b-2xl rounded-t-xl border-2 border-[#B87D4B]/70 bg-[#EFECE2]/60 overflow-hidden shadow-inner">
                    {/* Dynamic Fill Level */}
                    <div
                      className="absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out"
                      style={{
                        height: `${fillPercent}%`,
                        backgroundColor: selectedLiquid.tintColor,
                        opacity: 0.78,
                      }}
                    >
                      <div className="w-full h-1.5 bg-white/25" />
                    </div>
                    {/* Bottle Label */}
                    <div className="relative z-10 mx-2 mt-7 py-2 px-1.5 bg-[#F7F4EB]/92 border border-[#1E2420]/15 rounded text-center">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#1E2420] leading-tight">
                        Eco Sathi
                      </p>
                      <p className="text-[10px] font-medium text-[#2D4A3E] tabular-nums mt-0.5">
                        {volumeMl} ml
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculation Results & Reserve CTA */}
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-2 gap-3 pb-4 border-b border-[#1E2420]/10">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#5A635D] mb-1">
                      <Scale className="w-3.5 h-3.5 text-[#2D4A3E]" />
                      <span>Refill Cost</span>
                    </div>
                    <p className="font-display text-2xl sm:text-3xl font-semibold text-[#1E2420] tabular-nums">
                      NPR {estimatedCost.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#5A635D] mb-1">
                      <Droplets className="w-3.5 h-3.5 text-[#B87D4B]" />
                      <span>Plastic Saved</span>
                    </div>
                    <p className="font-display text-2xl sm:text-3xl font-semibold text-[#2D4A3E] tabular-nums">
                      {bottlesSaved} {bottlesSaved === 1 ? 'bottle' : 'bottles'}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#5A635D] leading-relaxed">
                  Bring your own bottle to Babar Mahal or reserve a pre-filled returnable glass jar
                  with EV delivery in Kathmandu.
                </p>

                <button
                  type="button"
                  onClick={handleAddRefill}
                  className="btn-liquid-primary w-full py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E]"
                >
                  {justAdded ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Added Refill to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add {volumeMl}ml Refill to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
