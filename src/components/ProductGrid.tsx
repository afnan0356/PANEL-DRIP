import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { FRANCHISES } from '../data/products';
import { Category } from '../types';
import { Filter, SlidersHorizontal, RotateCcw, SearchX } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedFranchise,
    setSelectedFranchise,
    sortBy,
    setSortBy,
    availabilityFilter,
    setAvailabilityFilter,
    priceRangeUSD,
    setPriceRangeUSD
  } = useShop();

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'katanas', label: '⚔️ Katanas' },
    { id: 'shoes', label: '👟 Shoes' },
    { id: 'glasses', label: '🕶️ Glasses & Shades' },
    { id: 'gift-cards', label: '🎟️ Digital Gift Cards' },
    { id: 'resin-statues', label: '1/7 Resin Statues' },
    { id: 'action-figures', label: 'Action Figures' },
    { id: 'streetwear', label: 'Streetwear' },
    { id: 'bottoms', label: 'Denim & Pants' },
    { id: 'cosplay', label: 'Cosplay & Wigs' },
    { id: 'manga-books', label: 'Manga & Books' },
    { id: 'accessories-decor', label: 'Accessories' }
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // Category match
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Franchise match
    if (selectedFranchise !== 'All Franchises' && product.franchise !== selectedFranchise) {
      return false;
    }

    // Availability match
    if (availabilityFilter === 'pre-order' && !product.isPreOrder) return false;
    if (availabilityFilter === 'limited' && !product.isLimitedResin) return false;
    if (availabilityFilter === 'in-stock' && product.stockCount <= 0) return false;

    // Price range
    if (product.priceUSD < priceRangeUSD[0] || product.priceUSD > priceRangeUSD[1]) {
      return false;
    }

    // Search query match (title, subtitle, franchise, tags, subcategory, description, category)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchSub = product.subtitle.toLowerCase().includes(q);
      const matchFran = product.franchise.toLowerCase().includes(q);
      const matchTags = product.tags.some((t) => t.toLowerCase().includes(q));
      const matchSubcat = product.subcategory.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);

      if (!matchTitle && !matchSub && !matchFran && !matchTags && !matchSubcat && !matchCategory && !matchDesc) {
        return false;
      }
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceUSD - b.priceUSD;
    if (sortBy === 'price-high') return b.priceUSD - a.priceUSD;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.reviewCount - a.reviewCount; // proxy for fresh activity
    return 0; // featured default
  });

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedFranchise('All Franchises');
    setSortBy('featured');
    setAvailabilityFilter('all');
    setPriceRangeUSD([0, 850]);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery !== '' ||
    selectedFranchise !== 'All Franchises' ||
    availabilityFilter !== 'all' ||
    priceRangeUSD[0] > 0 ||
    priceRangeUSD[1] < 850;

  return (
    <section id="shop-catalog" className="bg-[#0A0A0B] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title & Categories Pills */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest block font-bold">
                // CATALOG &amp; DROPS
              </span>
              <h2 className="text-3xl font-black italic text-white uppercase font-sans tracking-tighter">
                OFFICIAL <span className="text-[#CCFF00]">STOREFRONT</span>
              </h2>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              Showing <span className="text-white font-bold">{sortedProducts.length}</span> of {products.length} Items
            </div>
          </div>

          {/* Category Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#CCFF00] border-[#CCFF00] text-black font-black shadow-lg'
                      : 'bg-[#0E0E10] border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-black text-[#CCFF00] font-black' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          {/* Franchise Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
              Franchise / Universe
            </label>
            <select
              value={selectedFranchise}
              onChange={(e) => setSelectedFranchise(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 font-semibold focus:outline-none focus:border-[#CCFF00]"
            >
              {FRANCHISES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
              Availability
            </label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 font-semibold focus:outline-none focus:border-[#CCFF00]"
            >
              <option value="all">All Releases</option>
              <option value="in-stock">In Stock Now</option>
              <option value="pre-order">Pre-Order Only</option>
              <option value="limited">Limited Resin Statues</option>
            </select>
          </div>

          {/* Max Price Range Filter */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
              <span>Max Price</span>
              <span className="text-[#CCFF00] font-bold">${priceRangeUSD[1]} USD</span>
            </div>
            <input
              type="range"
              min="10"
              max="850"
              step="10"
              value={priceRangeUSD[1]}
              onChange={(e) => setPriceRangeUSD([priceRangeUSD[0], Number(e.target.value)])}
              className="w-full accent-[#CCFF00] cursor-pointer"
            />
          </div>

          {/* Sort By Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 font-semibold focus:outline-none focus:border-[#CCFF00]"
            >
              <option value="featured">Featured Drops</option>
              <option value="newest">Most Reviewed / Popular</option>
              <option value="rating">Highest Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags Reset */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between bg-[#0E0E10] border border-zinc-800 px-4 py-2.5 rounded-xl text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-zinc-400 font-mono text-[11px]">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-zinc-800 text-zinc-200 px-2.5 py-0.5 rounded-full font-mono">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedFranchise !== 'All Franchises' && (
                <span className="bg-zinc-800 text-zinc-200 px-2.5 py-0.5 rounded-full font-mono">
                  Franchise: {selectedFranchise}
                </span>
              )}
              {availabilityFilter !== 'all' && (
                <span className="bg-zinc-800 text-zinc-200 px-2.5 py-0.5 rounded-full font-mono">
                  Type: {availabilityFilter}
                </span>
              )}
              {searchQuery && (
                <span className="bg-zinc-800 text-zinc-200 px-2.5 py-0.5 rounded-full font-mono">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>

            <button
              onClick={resetAllFilters}
              className="text-[#CCFF00] hover:underline font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl py-16 px-6 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-400 border border-zinc-800">
              <SearchX className="w-8 h-8 text-[#CCFF00]" />
            </div>
            <h3 className="text-xl font-black italic text-white uppercase font-sans">
              No matching drops found
            </h3>
            <p className="text-zinc-400 text-xs">
              Try adjusting your category filters, price slider, or search query.
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset Catalog Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
