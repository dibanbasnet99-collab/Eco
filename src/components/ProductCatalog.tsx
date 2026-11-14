import { useState } from 'react';
import { Check, Eye, Plus, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES, PRODUCTS, Product, ProductCategory } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface ProductCatalogProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddToCart: (product: Product, customNote?: string) => void;
}

export function ProductCatalog({
  searchQuery,
  onSearchChange,
  onAddToCart,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Products');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [modalNote, setModalNote] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.nepaliName.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.tag.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (product: Product, note?: string) => {
    onAddToCart(product, note);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 1500);
  };

  return (
    <section id="shop" aria-labelledby="catalog-heading" className="py-16 lg:py-24 bg-[#EFECE2]/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B87D4B] mb-2.5">
              Curated Zero-Waste Essentials
            </p>
            <h2
              id="catalog-heading"
              className="font-display text-3xl sm:text-4xl font-medium text-[#1E2420] tracking-tight text-balance"
            >
              Thoughtful Daily Swaps
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Product categories"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] ${
                    active
                      ? 'bg-[#2D4A3E] text-[#F7F4EB]'
                      : 'bg-[#F7F4EB] text-[#5A635D] border border-[#1E2420]/10 hover:text-[#1E2420] hover:border-[#2D4A3E]/30'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Search Filter Indicator */}
        {normalizedQuery && (
          <div className="mb-8 flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-[#F7F4EB] border border-[#1E2420]/10 text-sm">
            <div className="flex items-center gap-2 text-[#1E2420]">
              <Search className="w-4 h-4 text-[#2D4A3E]" />
              <span>
                Showing results for <strong>&ldquo;{searchQuery}&rdquo;</strong> (
                <span className="tabular-nums">{filteredProducts.length}</span> found)
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-xs font-medium text-[#2D4A3E] hover:underline whitespace-nowrap"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#F7F4EB] rounded-2xl border border-[#1E2420]/10 p-12 text-center">
            <p className="font-display text-xl text-[#1E2420] mb-2">
              No eco essentials matched &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-sm text-[#5A635D] mb-6">
              Try searching for bamboo, soap, comb, toothbrush, or view all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                setSelectedCategory('All Products');
              }}
              className="btn-liquid-primary px-5 py-2.5 rounded-lg text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              const isAdded = addedProductId === product.id;
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.05, 0.25),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group tactile-card bg-[#F7F4EB] rounded-2xl border border-[#1E2420]/10 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* 4:3 Image Frame with Hover Impact Reveal */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#EFECE2]">
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                          product.imageFocusClass || ''
                        }`}
                        fallbackTitle={product.name}
                      />

                      {/* Subtle Hover Impact Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#1E2420]/85 via-[#1E2420]/55 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-medium text-[#F7F4EB] leading-snug">
                          {product.impactLabel}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModalProduct(product);
                            setModalNote('');
                          }}
                          aria-label={`Inspect details for ${product.name}`}
                          className="w-8 h-8 rounded-lg bg-[#F7F4EB]/90 text-[#1E2420] flex items-center justify-center shrink-0 hover:bg-[#F7F4EB] cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 pb-3">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-[#5A635D] mb-1.5">
                        <span className="uppercase tracking-wider">{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#B87D4B] font-semibold">{product.tag}</span>
                      </div>

                      <h3 className="font-display text-base font-semibold text-[#1E2420] leading-snug mb-1">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModalProduct(product);
                            setModalNote('');
                          }}
                          className="text-left hover:text-[#2D4A3E] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="font-devanagari text-xs text-[#5A635D]">
                        {product.nepaliName}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Aligned Price & Liquid Fill Action */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3">
                    <span className="text-[15px] font-semibold text-[#1E2420] tabular-nums">
                      NPR {product.price.toLocaleString()}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] ${
                        isAdded
                          ? 'bg-[#6E8B74] text-[#F7F4EB]'
                          : 'btn-liquid border border-[#2D4A3E]/30 text-[#2D4A3E]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Quick View Modal */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2420]/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className="bg-[#F7F4EB] rounded-2xl border border-[#1E2420]/15 max-w-2xl w-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3] md:aspect-auto bg-[#EFECE2] relative">
              <ResilientImage
                src={activeModalProduct.image}
                alt={activeModalProduct.name}
                className={`w-full h-full object-cover ${activeModalProduct.imageFocusClass || ''}`}
              />
            </div>

            <div className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="text-xs font-medium text-[#B87D4B]">
                    {activeModalProduct.category} · {activeModalProduct.tag}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModalProduct(null)}
                    aria-label="Close product preview"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5A635D] hover:bg-[#EFECE2] hover:text-[#1E2420]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  id="modal-product-title"
                  className="font-display text-2xl font-medium text-[#1E2420] mb-1"
                >
                  {activeModalProduct.name}
                </h3>
                <p className="font-devanagari text-xs text-[#5A635D] mb-4">
                  {activeModalProduct.nepaliName}
                </p>

                <p className="text-xl font-semibold text-[#2D4A3E] tabular-nums mb-4">
                  NPR {activeModalProduct.price.toLocaleString()}
                </p>

                <p className="text-sm text-[#5A635D] leading-relaxed mb-4">
                  {activeModalProduct.description}
                </p>

                <div className="text-xs text-[#5A635D] space-y-1.5 py-3 border-y border-[#1E2420]/10 mb-4">
                  <p>
                    <strong className="text-[#1E2420]">Materials:</strong>{' '}
                    {activeModalProduct.materials}
                  </p>
                  <p>
                    <strong className="text-[#1E2420]">Origin:</strong> {activeModalProduct.origin}
                  </p>
                  <p>
                    <strong className="text-[#2D4A3E]">Impact:</strong>{' '}
                    {activeModalProduct.impactLabel}
                  </p>
                </div>

                {activeModalProduct.supportsEngraving && (
                  <div className="mb-4">
                    <label
                      htmlFor="modal-engraving-note"
                      className="block text-xs font-medium text-[#1E2420] mb-1.5"
                    >
                      Optional Custom Name Engraving (Free)
                    </label>
                    <input
                      id="modal-engraving-note"
                      type="text"
                      maxLength={20}
                      value={modalNote}
                      onChange={(e) => setModalNote(e.target.value)}
                      placeholder="e.g. Kajal M."
                      className="w-full px-3 py-2 rounded-lg bg-[#EFECE2] border border-[#1E2420]/15 text-sm text-[#1E2420] focus:outline-none focus:border-[#2D4A3E]"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  handleQuickAdd(activeModalProduct, modalNote.trim() || undefined);
                  setActiveModalProduct(null);
                }}
                className="btn-liquid-primary w-full py-3 px-4 rounded-lg text-sm font-medium cursor-pointer"
              >
                Add to Zero-Waste Bag — NPR {activeModalProduct.price.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
