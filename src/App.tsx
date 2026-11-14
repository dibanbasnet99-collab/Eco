import { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { BambooCustomizer } from './components/BambooCustomizer';
import { CartDrawer } from './components/CartDrawer';
import { CircularImpactSection } from './components/CircularImpactSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { RefillStationSection } from './components/RefillStationSection';
import { SocialProofSection } from './components/SocialProofSection';
import { StoreFooter } from './components/StoreFooter';
import { Product } from './data/storeData';
import { CartItem } from './types/cart';

const COMMUNITY_BASE_PLASTIC_SAVED = 28400;

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartKey: 'sisnu-shea-soap',
      productId: 'sisnu-shea-soap',
      name: 'Sisnu (Nettle) & Shea Herbal Soap Bar',
      nepaliName: 'सिस्नु र शिया हर्बल साबुन',
      price: 320,
      quantity: 1,
      image: '/src/assets/images/prod_sisnu_soap_deo_1794670232148.jpg',
      bottlesSaved: 3,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const upsertCartItem = (incoming: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartKey === incoming.cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === incoming.cartKey
            ? { ...item, quantity: item.quantity + incoming.quantity }
            : item
        );
      }
      return [...prev, incoming];
    });
    showToast(`Added ${incoming.name} to your bag`);
  };

  const handleAddProduct = (product: Product, customNote?: string) => {
    const noteSuffix = customNote ? `-${customNote}` : '';
    upsertCartItem({
      cartKey: `${product.id}${noteSuffix}`,
      productId: product.id,
      name: product.name,
      nepaliName: product.nepaliName,
      price: product.price,
      quantity: 1,
      image: product.image,
      bottlesSaved: product.bottlesSaved,
      engravingNote: customNote,
    });
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleUpdateNote = (cartKey: string, note: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, engravingNote: note } : item))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
    setGiftWrap(false);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const bagBottlesSaved = cartItems.reduce(
    (sum, item) => sum + item.bottlesSaved * item.quantity,
    0
  );
  const plasticSavedTotal = COMMUNITY_BASE_PLASTIC_SAVED + bagBottlesSaved;

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-[#1E2420] flex flex-col">
      <Navbar
        cartCount={totalCartCount}
        plasticSavedTotal={plasticSavedTotal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <HeroSection />
        <RefillStationSection onAddRefillToCart={upsertCartItem} />
        <ProductCatalog
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToCart={handleAddProduct}
        />
        <BambooCustomizer onAddCustomFlask={upsertCartItem} />
        <CircularImpactSection bagBottlesSaved={bagBottlesSaved} />
        <SocialProofSection />
      </main>

      <StoreFooter />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        giftWrap={giftWrap}
        onToggleGiftWrap={() => setGiftWrap((prev) => !prev)}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateNote={handleUpdateNote}
        onClearCart={handleClearCart}
      />

      {/* Non-intrusive Add-to-Bag Feedback Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 max-w-sm bg-[#1E2420] text-[#F7F4EB] px-4 py-3 rounded-xl shadow-xl border border-[#F7F4EB]/15 flex items-center gap-3 text-xs sm:text-sm"
        >
          <span className="w-6 h-6 rounded-full bg-[#2D4A3E] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-[#F7F4EB]" />
          </span>
          <span className="line-clamp-1">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-semibold text-[#B87D4B] hover:text-[#F7F4EB] whitespace-nowrap inline-flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Bag</span>
          </button>
        </div>
      )}
    </div>
  );
}
