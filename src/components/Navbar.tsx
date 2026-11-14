import { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  plasticSavedTotal: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCart: () => void;
}

export function Navbar({
  cartCount,
  plasticSavedTotal,
  searchQuery,
  onSearchChange,
  onOpenCart,
}: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop All', href: '#shop' },
    { label: 'Refill Station', href: '#refill-station' },
    { label: 'Custom Engraving', href: '#custom-engraving' },
    { label: 'Circular Loop', href: '#circular-loop' },
    { label: 'Visit Us', href: '#visit-us' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F4EB]/88 backdrop-blur-md border-b border-[#1E2420]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Custom Leaf/Circle Emblem + Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-[#1E2420] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] rounded-md py-1"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-[#2D4A3E]"
          >
            <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10.5 21.5C10.5 14.5 15.5 10 22 9.5C21.5 16 17 21.5 10.5 21.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 21.5L17.5 14.5"
              stroke="#B87D4B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-display text-base sm:text-lg font-semibold tracking-tight">
            ECO SATHI NEPAL
          </span>
        </a>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5A635D]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#2D4A3E] transition-colors duration-200 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#2D4A3E] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Search, Live Plastic Saved Counter & Cart Drawer Trigger */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#2D4A3E] whitespace-nowrap shrink-0 tabular-nums border-r border-[#1E2420]/15 pr-3.5"
            title="Cumulative plastic bottles prevented by the Eco Sathi community and your bag"
          >
            <span>Plastic Saved:</span>
            <span className="font-semibold text-[#1E2420]">
              {plasticSavedTotal.toLocaleString()} bottles
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label={searchOpen ? 'Close product search' : 'Open product search'}
            aria-expanded={searchOpen}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#1E2420] hover:bg-[#EFECE2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E]"
          >
            {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag with ${cartCount} items`}
            className="btn-liquid-primary px-3.5 sm:px-4 h-10 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F4EB]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Bag</span>
            <span className="tabular-nums font-semibold bg-[#F7F4EB]/18 px-1.5 py-0.5 rounded text-xs">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#1E2420] hover:bg-[#EFECE2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#1E2420]/10 bg-[#EFECE2]/90 px-4 sm:px-6 lg:px-8 py-3">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto flex items-center gap-3"
          >
            <Search className="w-4 h-4 text-[#5A635D] shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search bamboo flask, sisnu soap, deodorant tin, gift box..."
              autoFocus
              className="w-full bg-transparent text-sm text-[#1E2420] placeholder:text-[#5A635D] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="text-xs font-medium text-[#5A635D] hover:text-[#1E2420] whitespace-nowrap"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-[#2D4A3E] text-[#F7F4EB] text-xs font-medium whitespace-nowrap shrink-0 hover:bg-[#1E352B] transition-colors"
            >
              Find Items
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[#1E2420]/10 bg-[#F7F4EB] px-4 py-4 space-y-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm font-medium text-[#1E2420] hover:bg-[#EFECE2] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 mt-2 border-t border-[#1E2420]/10 px-3 text-xs text-[#5A635D] tabular-nums">
            Community Plastic Saved: <strong className="text-[#2D4A3E]">{plasticSavedTotal.toLocaleString()} bottles</strong>
          </div>
        </nav>
      )}
    </header>
  );
}
