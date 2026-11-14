import { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { ASSETS } from '../data/storeData';
import { CartItem } from '../types/cart';

interface BambooCustomizerProps {
  onAddCustomFlask: (item: CartItem) => void;
}

type FontStyleId = 'minimal-sans' | 'classic-serif' | 'devanagari';
type MotifId = 'none' | 'himalaya' | 'leaf';

const FONT_OPTIONS: {
  id: FontStyleId;
  label: string;
  sample: string;
  fontClass: string;
}[] = [
  {
    id: 'minimal-sans',
    label: 'Minimal Sans',
    sample: 'Kajal M.',
    fontClass: 'font-sans tracking-[0.18em] uppercase font-semibold',
  },
  {
    id: 'classic-serif',
    label: 'Classic Serif',
    sample: 'Kajal M.',
    fontClass: 'font-display tracking-[0.08em] italic font-medium',
  },
  {
    id: 'devanagari',
    label: 'Devanagari Script',
    sample: 'काजल म.',
    fontClass: 'font-devanagari tracking-[0.06em] font-semibold',
  },
];

const MOTIF_OPTIONS: { id: MotifId; label: string }[] = [
  { id: 'himalaya', label: 'Himalayan Peak' },
  { id: 'leaf', label: 'Botanical Leaf' },
  { id: 'none', label: 'Text Only' },
];

export function BambooCustomizer({ onAddCustomFlask }: BambooCustomizerProps) {
  const [engravedName, setEngravedName] = useState('Kajal M.');
  const [fontStyle, setFontStyle] = useState<FontStyleId>('minimal-sans');
  const [motif, setMotif] = useState<MotifId>('himalaya');
  const [added, setAdded] = useState(false);

  const selectedFont = FONT_OPTIONS.find((f) => f.id === fontStyle) || FONT_OPTIONS[0];
  const displayName = engravedName.trim() || 'Eco Sathi';

  const handleFontSwitch = (newFont: FontStyleId) => {
    setFontStyle(newFont);
    if (newFont === 'devanagari' && engravedName === 'Kajal M.') {
      setEngravedName('काजल म.');
    } else if (newFont !== 'devanagari' && engravedName === 'काजल म.') {
      setEngravedName('Kajal M.');
    }
  };

  const handleAddToBag = () => {
    const cleanName = engravedName.trim() || 'Eco Sathi';
    onAddCustomFlask({
      cartKey: `custom-flask-${cleanName}-${fontStyle}-${motif}`,
      productId: 'custom-engraved-bamboo-flask',
      name: 'Custom Laser-Engraved Bamboo Flask (500ml)',
      nepaliName: 'नाम खोपिएको बाँसको बोतल',
      price: 1500,
      quantity: 1,
      image: ASSETS.bambooTumbler,
      bottlesSaved: 18,
      engravingNote: cleanName,
      engravingFont: selectedFont.label,
      engravingMotif: MOTIF_OPTIONS.find((m) => m.id === motif)?.label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section
      id="custom-engraving"
      aria-labelledby="customizer-heading"
      className="py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#2D4A3E] text-[#F7F4EB] rounded-3xl overflow-hidden border border-[#1E2420]/15"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Customizer Controls */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-7">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#EFECE2]/80 mb-2.5">
                  In-House Laser Engraving Studio
                </p>
                <h2
                  id="customizer-heading"
                  className="font-display text-3xl sm:text-4xl font-medium text-[#F7F4EB] tracking-tight text-balance mb-3"
                >
                  Personalize Your Bamboo Flask
                </h2>
                <p className="text-sm sm:text-base text-[#EFECE2]/80 leading-relaxed max-w-xl">
                  Precision laser-etched onto sustainably harvested Moso bamboo—never peeling
                  stickers, never fading ink. Ready within 24 hours in Kathmandu.
                </p>
              </div>

              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="flask-name-input"
                      className="text-xs font-semibold uppercase tracking-[0.1em] text-[#EFECE2]/85"
                    >
                      1. Enter Name or Word (Max 18 chars)
                    </label>
                    <span className="text-xs text-[#EFECE2]/65 tabular-nums">
                      {engravedName.length}/18
                    </span>
                  </div>
                  <input
                    id="flask-name-input"
                    type="text"
                    maxLength={18}
                    value={engravedName}
                    onChange={(e) => setEngravedName(e.target.value)}
                    placeholder="Type a name (e.g. Kajal M.)"
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F4EB] text-[#1E2420] placeholder:text-[#5A635D] text-base font-medium border border-[#EFECE2]/30 focus:outline-none focus:ring-2 focus:ring-[#B87D4B]"
                  />
                </div>

                {/* Font Style Selector */}
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#EFECE2]/85 mb-2.5">
                    2. Choose Engraving Typography
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {FONT_OPTIONS.map((option) => {
                      const active = option.id === fontStyle;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleFontSwitch(option.id)}
                          aria-pressed={active}
                          className={`px-3.5 py-2.5 rounded-xl border text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFECE2] ${
                            active
                              ? 'bg-[#F7F4EB] text-[#1E2420] border-[#F7F4EB]'
                              : 'bg-[#1E352B]/60 text-[#EFECE2] border-[#EFECE2]/20 hover:border-[#EFECE2]/45'
                          }`}
                        >
                          <div className="text-xs font-semibold">{option.label}</div>
                          <div
                            className={`text-sm mt-0.5 truncate ${
                              option.id === 'devanagari'
                                ? 'font-devanagari'
                                : option.id === 'classic-serif'
                                  ? 'font-display italic'
                                  : 'font-sans'
                            }`}
                          >
                            {option.sample}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Crest Motif Toggle */}
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#EFECE2]/85 mb-2.5">
                    3. Optional Laser Crest
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {MOTIF_OPTIONS.map((item) => {
                      const active = item.id === motif;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setMotif(item.id)}
                          aria-pressed={active}
                          className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#B87D4B] text-[#F7F4EB] border-[#B87D4B]'
                              : 'bg-transparent text-[#EFECE2]/85 border-[#EFECE2]/25 hover:border-[#EFECE2]/60'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 1-Click Add Custom Bottle CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="px-6 py-3.5 rounded-xl bg-[#F7F4EB] text-[#1E2420] hover:bg-[#EFECE2] text-sm font-semibold inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87D4B]"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#2D4A3E]" />
                      <span>Added Custom Flask to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#2D4A3E]" />
                      <span>Add Custom Bottle to Bag — NPR 1,500</span>
                    </>
                  )}
                </button>
                <span className="text-xs text-[#EFECE2]/75">
                  500ml Double-Wall · 12h Hot / 24h Cold
                </span>
              </div>
            </div>

            {/* Right Live 3D-Styled Bamboo Flask Preview */}
            <div className="lg:col-span-5 bg-[#EFECE2] text-[#1E2420] p-8 sm:p-10 flex flex-col items-center justify-center relative">
              <div className="text-center mb-5">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5A635D]">
                  Live Laser-Engraved Preview
                </span>
              </div>

              {/* Realistic 3D-Styled Bamboo Flask Graphic */}
              <div className="relative flex flex-col items-center select-none my-2">
                {/* Soft Cast Shadow */}
                <div
                  className="absolute -bottom-4 w-32 h-5 rounded-full bg-[#1E2420]/20 blur-md"
                  aria-hidden="true"
                />

                {/* Stainless Steel Screw Cap */}
                <div className="relative w-28 h-10 rounded-t-xl border border-[#7F8480]/50 shadow-sm overflow-hidden bg-gradient-to-r from-[#A8ABA9] via-[#E8EAE8] to-[#8C908D]">
                  <div className="absolute inset-x-0 top-0 h-2 bg-white/35" />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1E2420]/20" />
                </div>

                {/* Steel Neck Collar */}
                <div className="w-[104px] h-2 bg-gradient-to-r from-[#727673] via-[#D0D4D1] to-[#686C69]" />

                {/* Main Bamboo Barrel */}
                <div
                  className="relative w-32 h-72 sm:h-80 shadow-xl flex flex-col items-center justify-center overflow-hidden border-x border-[#9B7247]/40"
                  style={{
                    background:
                      'linear-gradient(90deg, #B68856 0%, #D9B07F 24%, #E8C597 44%, #CFA16E 74%, #A97A49 100%)',
                  }}
                >
                  {/* Vertical Bamboo Fiber Grain Texture */}
                  <div
                    className="absolute inset-0 opacity-25 pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(84, 52, 22, 0.22) 3px, rgba(84, 52, 22, 0.22) 4px)',
                    }}
                  />
                  {/* Subtle Bamboo Node Ring */}
                  <div className="absolute top-16 inset-x-0 h-[1.5px] bg-[#6E4720]/20" />
                  <div className="absolute bottom-14 inset-x-0 h-[1.5px] bg-[#6E4720]/20" />

                  {/* Vertical Laser-Engraved Area */}
                  <div className="relative z-10 flex flex-col items-center justify-center gap-3 px-2 py-4">
                    {motif === 'himalaya' && (
                      <svg
                        width="28"
                        height="18"
                        viewBox="0 0 36 22"
                        fill="none"
                        className="text-[#452B14]/90 drop-shadow-[0_1px_0_rgba(255,235,205,0.45)]"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 19L11.5 5L17.5 13.5L22.5 7.5L34 19H2Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 10.5L11.5 12L14.5 10"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}

                    {motif === 'leaf' && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[#452B14]/90 drop-shadow-[0_1px_0_rgba(255,235,205,0.45)]"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 19C6 11.5 11 6 19 5C18 13 13 19 6 19Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 19L14 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}

                    {/* Vertical Engraved Name */}
                    <div
                      className="h-44 flex items-center justify-center"
                      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                      <span
                        className={`text-lg sm:text-xl text-[#422811]/90 select-none whitespace-nowrap ${selectedFont.fontClass}`}
                        style={{
                          textShadow: '0 1px 0 rgba(255, 236, 206, 0.45)',
                        }}
                      >
                        {displayName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stainless Steel Base Ring */}
                <div className="w-32 h-4 rounded-b-xl border-t border-[#7F8480]/40 bg-gradient-to-r from-[#9A9E9B] via-[#E4E7E4] to-[#7F8380] shadow-md" />
              </div>

              <p className="mt-7 text-xs text-[#5A635D] text-center max-w-xs">
                Laser burns cleanly into the outer bamboo skin for permanent, waterproof texture.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
