import { useState } from 'react';
import { Check, Clock, MapPin, Phone, Send } from 'lucide-react';
import { ASSETS } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

export function StoreFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      {/* Flagship Store Location Section */}
      <section
        id="visit-us"
        aria-labelledby="store-heading"
        className="py-16 lg:py-24 bg-[#EFECE2]/60 border-t border-[#1E2420]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7F4EB] rounded-3xl border border-[#1E2420]/12 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Store Photo */}
            <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] bg-[#EFECE2]">
              <ResilientImage
                src={ASSETS.storeCourtyard}
                alt="Eco Sathi Nepal flagship store inside Babar Mahal Revisited courtyard in Kathmandu"
                className="w-full h-full object-cover"
                fallbackTitle="Eco Sathi Nepal · Babar Mahal Revisited"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2420]/55 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Store Information Card */}
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B87D4B] mb-2.5">
                  Visit Our Flagship Store
                </p>
                <h2
                  id="store-heading"
                  className="font-display text-3xl font-medium text-[#1E2420] tracking-tight mb-3"
                >
                  Babar Mahal Revisited
                </h2>
                <p className="text-sm text-[#5A635D] leading-relaxed mb-7">
                  Step into our sunlit Newari brick courtyard to refill your kitchen &amp; bath
                  jars, browse Nepal-crafted bamboo goods, or drop off empty deodorant tins.
                </p>

                <dl className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#2D4A3E] mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-semibold text-[#1E2420]">Courtyard Address</dt>
                      <dd className="text-[#5A635D]">
                        Babar Mahal Revisited (Courtyard), Kathmandu 44600, Nepal
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#2D4A3E] mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-semibold text-[#1E2420]">Store Hours</dt>
                      <dd className="text-[#5A635D]">Sunday – Friday: 10:30 AM – 6:30 PM</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#2D4A3E] mt-0.5 shrink-0" />
                    <div>
                      <dt className="font-semibold text-[#1E2420]">Store &amp; Refill Desk</dt>
                      <dd className="text-[#5A635D] tabular-nums">+977 984-3535877</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="pt-7 mt-7 border-t border-[#1E2420]/10 flex flex-wrap gap-3">
                <a
                  href="#refill-station"
                  className="btn-liquid-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium inline-flex items-center whitespace-nowrap"
                >
                  Estimate Your Refill
                </a>
                <a
                  href="tel:+9779843535877"
                  className="btn-liquid px-5 py-2.5 rounded-lg border border-[#2D4A3E]/30 text-[#2D4A3E] text-xs sm:text-sm font-medium inline-flex items-center whitespace-nowrap"
                >
                  Call Store Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="bg-[#1E2420] text-[#EFECE2] pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EFECE2]/12">
            {/* Brand & Newsletter */}
            <div className="md:col-span-5 space-y-5">
              <div className="font-display text-xl font-semibold text-[#F7F4EB] tracking-tight">
                ECO SATHI NEPAL
              </div>
              <p className="text-sm text-[#EFECE2]/75 leading-relaxed max-w-sm">
                Nepal&apos;s 1st zero-waste store &amp; refill station—making plastic-free living
                practical, local, and joyful since 2019.
              </p>

              <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B87D4B] mb-2.5">
                  Join the Zero-Waste Movement in Nepal
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-sm text-[#EFECE2] bg-[#2D4A3E] px-4 py-3 rounded-xl border border-[#6E8B74]/40">
                    <Check className="w-4 h-4 text-[#EFECE2] shrink-0" />
                    <span>
                      Dhanyabad! You&apos;re subscribed for refill bar alerts and Kathmandu
                      workshops.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@kathmandu.np"
                      className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-[#F7F4EB]/10 border border-[#EFECE2]/20 text-sm text-[#F7F4EB] placeholder:text-[#EFECE2]/50 focus:outline-none focus:border-[#B87D4B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-lg bg-[#B87D4B] hover:bg-[#A66E3F] text-[#F7F4EB] text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                    >
                      <span>Join</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3 text-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#EFECE2]/60 mb-3">
                Explore Store
              </h3>
              <ul className="space-y-2.5 text-[#EFECE2]/85">
                <li>
                  <a href="#shop" className="hover:text-[#F7F4EB] transition-colors">
                    Shop All Essentials
                  </a>
                </li>
                <li>
                  <a href="#refill-station" className="hover:text-[#F7F4EB] transition-colors">
                    Refill Station Guide
                  </a>
                </li>
                <li>
                  <a href="#custom-engraving" className="hover:text-[#F7F4EB] transition-colors">
                    Custom Bamboo Engraving
                  </a>
                </li>
                <li>
                  <a href="#circular-loop" className="hover:text-[#F7F4EB] transition-colors">
                    Take-Back &amp; EV Delivery
                  </a>
                </li>
                <li>
                  <a href="#visit-us" className="hover:text-[#F7F4EB] transition-colors">
                    Babar Mahal Flagship
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Local Payment Methods */}
            <div className="md:col-span-4 space-y-5 text-sm">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#EFECE2]/60 mb-3">
                  Connect With Us
                </h3>
                <p className="text-[#EFECE2]/85 mb-1">TikTok &amp; Instagram: @ecosathi_nepal</p>
                <p className="text-[#EFECE2]/70 text-xs">
                  Babar Mahal Revisited · +977 984-3535877
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#EFECE2]/60 mb-2.5">
                  Accepted Local Payments
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-[#EFECE2]/90">
                  <span>eSewa</span>
                  <span aria-hidden="true" className="text-[#EFECE2]/35">
                    ·
                  </span>
                  <span>Khalti</span>
                  <span aria-hidden="true" className="text-[#EFECE2]/35">
                    ·
                  </span>
                  <span>Fonepay</span>
                  <span aria-hidden="true" className="text-[#EFECE2]/35">
                    ·
                  </span>
                  <span>Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFECE2]/60">
            <p>© {new Date().getFullYear()} Eco Sathi Nepal. Plastic-Free Since 2019.</p>
            <p className="font-devanagari">बबरमहल रिभिजिटेड, काठमाडौं · नेपाल</p>
          </div>
        </div>
      </footer>
    </>
  );
}
