import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Gift,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { CartItem } from '../types/cart';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  giftWrap: boolean;
  onToggleGiftWrap: () => void;
  onClose: () => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onUpdateNote: (cartKey: string, note: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'bag' | 'checkout' | 'confirmed';
type PaymentMethod = 'eSewa' | 'Khalti' | 'Fonepay' | 'Cash on Delivery';

const FREE_DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE = 100;
const GIFT_WRAP_FEE = 120;

export function CartDrawer({
  isOpen,
  items,
  giftWrap,
  onToggleGiftWrap,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNote,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>('bag');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('eSewa');
  const [orderNumber, setOrderNumber] = useState('');
  const [confirmedSnapshot, setConfirmedSnapshot] = useState<{
    total: number;
    bottlesSaved: number;
    payment: PaymentMethod;
    name: string;
    address: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalBottlesSaved = items.reduce((sum, item) => sum + item.bottlesSaved * item.quantity, 0);
  const qualifiesFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0;
  const deliveryCost = subtotal === 0 ? 0 : qualifiesFreeDelivery ? 0 : DELIVERY_FEE;
  const giftWrapCost = items.length > 0 && giftWrap ? GIFT_WRAP_FEE : 0;
  const grandTotal = subtotal + deliveryCost + giftWrapCost;

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountRemainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ESN-${Math.floor(1040 + Math.random() * 8900)}`;
    setOrderNumber(id);
    setConfirmedSnapshot({
      total: grandTotal,
      bottlesSaved: totalBottlesSaved,
      payment: paymentMethod,
      name: customerName.trim(),
      address: address.trim(),
    });
    setStep('confirmed');
    onClearCart();
  };

  const handleResetAndClose = () => {
    setStep('bag');
    setConfirmedSnapshot(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1E2420]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Zero-Waste Shopping Bag"
      onClick={handleResetAndClose}
    >
      <aside
        className="w-full max-w-md bg-[#F7F4EB] h-full flex flex-col shadow-2xl border-l border-[#1E2420]/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#1E2420]/10 flex items-center justify-between bg-[#EFECE2]/65">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to shopping bag"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1E2420] hover:bg-[#EFECE2]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-xl font-medium text-[#1E2420]">
              {step === 'bag'
                ? 'Your Zero-Waste Bag'
                : step === 'checkout'
                  ? 'EV Delivery Checkout'
                  : 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close shopping bag"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5A635D] hover:bg-[#EFECE2] hover:text-[#1E2420] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Bag Items */}
        {step === 'bag' && (
          <>
            {/* Free EV Delivery Progress Banner */}
            <div className="px-6 py-3.5 bg-[#EFECE2] border-b border-[#1E2420]/10">
              <div className="flex items-center justify-between text-xs font-medium text-[#1E2420] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#2D4A3E]" />
                  {qualifiesFreeDelivery && subtotal > 0 ? (
                    <span>Free Kathmandu EV Scooter Delivery unlocked!</span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="tabular-nums">
                        NPR {amountRemainingForFree.toLocaleString()}
                      </strong>{' '}
                      for free EV delivery
                    </span>
                  )}
                </span>
                <span className="tabular-nums text-[#5A635D]">{progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#DFD9C8] overflow-hidden">
                <div
                  className="h-full bg-[#2D4A3E] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#EFECE2] mx-auto flex items-center justify-center text-[#2D4A3E]">
                    <ShoppingBag className="w-6 h-6" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium text-[#1E2420]">
                      Your zero-waste bag is empty
                    </p>
                    <p className="text-sm text-[#5A635D] mt-1">
                      Explore bamboo essentials or reserve a liquid refill from Babar Mahal.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-liquid-primary px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    Browse Eco Essentials
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.cartKey}
                    className="pb-5 border-b border-[#1E2420]/10 flex gap-4 items-start"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#EFECE2] shrink-0 border border-[#1E2420]/10">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display text-sm font-semibold text-[#1E2420] leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#2D4A3E] mt-0.5 tabular-nums">
                            NPR {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartKey)}
                          aria-label={`Remove ${item.name} from bag`}
                          className="text-[#5A635D] hover:text-[#1E2420] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.engravingFont && (
                        <p className="text-[11px] text-[#5A635D] mt-1">
                          {item.engravingFont}
                          {item.engravingMotif ? ` · ${item.engravingMotif}` : ''}
                        </p>
                      )}

                      {/* Custom Engraving / Refill Note Input */}
                      <input
                        type="text"
                        value={item.engravingNote || ''}
                        onChange={(e) => onUpdateNote(item.cartKey, e.target.value)}
                        placeholder="Add engraving name or container note..."
                        aria-label={`Custom note for ${item.name}`}
                        className="mt-2 w-full px-2.5 py-1.5 rounded-md bg-[#EFECE2]/80 border border-[#1E2420]/10 text-xs text-[#1E2420] placeholder:text-[#5A635D]/70 focus:outline-none focus:border-[#2D4A3E]"
                      />

                      {/* Quantity Stepper */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-[#1E2420]/15 bg-[#EFECE2]/60">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartKey, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-8 h-8 flex items-center justify-center text-[#1E2420] hover:bg-[#EFECE2] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold tabular-nums text-[#1E2420]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartKey, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-8 h-8 flex items-center justify-center text-[#1E2420] hover:bg-[#EFECE2] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-[11px] text-[#5A635D] tabular-nums">
                          Saves {item.bottlesSaved * item.quantity} plastics
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bag Footer Totals */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#1E2420]/12 bg-[#EFECE2]/65 space-y-4">
                {/* Plastic-Free Gift Wrap Toggle */}
                <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F7F4EB] border border-[#1E2420]/10 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-4 h-4 text-[#B87D4B] shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-[#1E2420]">
                        Plastic-Free Lokta Gift Wrap
                      </div>
                      <div className="text-[11px] text-[#5A635D]">
                        Handmade Nepali lokta paper &amp; jute twine
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-medium text-[#1E2420] tabular-nums">
                      +NPR {GIFT_WRAP_FEE}
                    </span>
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={onToggleGiftWrap}
                      className="w-4 h-4 accent-[#2D4A3E] cursor-pointer"
                    />
                  </div>
                </label>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#5A635D]">
                    <span>Subtotal</span>
                    <span className="tabular-nums text-[#1E2420]">
                      NPR {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5A635D]">
                    <span>Kathmandu EV Delivery</span>
                    <span className="tabular-nums text-[#1E2420]">
                      {deliveryCost === 0 ? 'Free' : `NPR ${deliveryCost}`}
                    </span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between text-[#5A635D]">
                      <span>Lokta Gift Wrap</span>
                      <span className="tabular-nums text-[#1E2420]">NPR {giftWrapCost}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-[#1E2420]/10 font-semibold text-base text-[#1E2420]">
                    <span>Total</span>
                    <span className="tabular-nums">NPR {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="btn-liquid-primary w-full py-3.5 px-5 rounded-xl text-sm font-medium cursor-pointer"
                >
                  Proceed to Checkout · NPR {grandTotal.toLocaleString()}
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Checkout Details & Payment */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-5">
              <div>
                <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#1E2420] mb-1.5">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Kajal Maharjan"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#EFECE2] border border-[#1E2420]/15 text-sm text-[#1E2420] focus:outline-none focus:border-[#2D4A3E]"
                />
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-semibold text-[#1E2420] mb-1.5">
                  Phone Number (Nepal)
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+977 984-XXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#EFECE2] border border-[#1E2420]/15 text-sm text-[#1E2420] focus:outline-none focus:border-[#2D4A3E]"
                />
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#1E2420] mb-1.5">
                  Delivery Area &amp; Landmark (or In-Store Pickup)
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Jhamsikhel, Lalitpur (near Dhokaima Cafe)"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#EFECE2] border border-[#1E2420]/15 text-sm text-[#1E2420] focus:outline-none focus:border-[#2D4A3E]"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#1E2420] mb-2">
                  Select Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['eSewa', 'Khalti', 'Fonepay', 'Cash on Delivery'] as PaymentMethod[]).map(
                    (method) => {
                      const active = paymentMethod === method;
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          aria-pressed={active}
                          className={`px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#2D4A3E] text-[#F7F4EB] border-[#2D4A3E]'
                              : 'bg-[#EFECE2] text-[#1E2420] border-[#1E2420]/12 hover:border-[#2D4A3E]/40'
                          }`}
                        >
                          {method}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#EFECE2] border border-[#1E2420]/10 text-xs text-[#5A635D] space-y-1">
                <p className="font-semibold text-[#1E2420]">
                  Plastic-Free Guarantee
                </p>
                <p>
                  Your order prevents{' '}
                  <strong className="text-[#2D4A3E] tabular-nums">{totalBottlesSaved}</strong>{' '}
                  single-use plastic items and ships via EV scooter in reused paper cartons.
                </p>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-[#1E2420]/10 bg-[#EFECE2]/65 space-y-3">
              <div className="flex justify-between text-sm font-semibold text-[#1E2420]">
                <span>Total Payable ({paymentMethod})</span>
                <span className="tabular-nums">NPR {grandTotal.toLocaleString()}</span>
              </div>
              <button
                type="submit"
                className="btn-liquid-primary w-full py-3.5 px-5 rounded-xl text-sm font-medium cursor-pointer"
              >
                Confirm Order · NPR {grandTotal.toLocaleString()}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmed Receipt */}
        {step === 'confirmed' && confirmedSnapshot && (
          <div className="flex-1 p-7 flex flex-col justify-center items-center text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#2D4A3E] text-[#F7F4EB] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B87D4B] mb-1">
                Order #{orderNumber} Confirmed
              </p>
              <h3 className="font-display text-2xl font-medium text-[#1E2420] mb-2">
                Dhanyabad, {confirmedSnapshot.name}!
              </h3>
              <p className="text-sm text-[#5A635D] leading-relaxed">
                We&apos;re preparing your zero-waste parcel in plastic-free lokta &amp; reused
                cartons for EV scooter dispatch to{' '}
                <strong className="text-[#1E2420]">{confirmedSnapshot.address}</strong>.
              </p>
            </div>

            <div className="w-full p-4 rounded-xl bg-[#EFECE2] border border-[#1E2420]/10 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5A635D]">Payment Method</span>
                <span className="font-semibold text-[#1E2420]">{confirmedSnapshot.payment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A635D]">Total Amount</span>
                <span className="font-semibold text-[#1E2420] tabular-nums">
                  NPR {confirmedSnapshot.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A635D]">Single-Use Plastics Saved</span>
                <span className="font-semibold text-[#2D4A3E] tabular-nums">
                  {confirmedSnapshot.bottlesSaved} items
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="btn-liquid-primary w-full py-3 px-5 rounded-xl text-sm font-medium cursor-pointer"
            >
              Continue Exploring Eco Sathi
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
