import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, Sparkles, Tag, ArrowRight, BookOpen, Shirt, Sword, Gift, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SmartSearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { products, setSearchQuery, setSelectedCategory, setSelectedFranchise, setSelectedProduct, formatPrice } = useShop();

  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const TRENDING_TAGS = [
    { label: 'Gojo Glasses', category: 'glasses', franchise: 'Jujutsu High' },
    { label: 'Demon Katana', category: 'katanas', franchise: 'Demon Blade' },
    { label: 'Resin Statue', category: 'resin-statues', franchise: 'Cyberpunk Neo-Tokyo' },
    { label: 'Mystery Box', category: 'mystery-box', franchise: 'Mystery Box' },
    { label: 'Amazon Gift Card', category: 'gift-cards', franchise: 'Amazon' },
    { label: 'Oversized Hoodie', category: 'streetwear', franchise: 'Chainsaw Devil' }
  ];

  const matchedProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.franchise.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectTag = (tag: typeof TRENDING_TAGS[0]) => {
    setSelectedCategory(tag.category as any);
    setSelectedFranchise(tag.franchise);
    onClose();
  };

  const handleSelectProduct = (p: typeof products[0]) => {
    setSelectedProduct(p);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-white"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-amber-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by anime series, Katana, Resin statue, Manga, Hoodie, or Gift cards..."
              className="w-full bg-transparent text-sm sm:text-base font-medium focus:outline-none text-white placeholder-neutral-500"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold rounded-xl text-neutral-300">
              ESC
            </button>
          </div>

          {/* Body Suggestions */}
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {!query && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" /> Trending Searches
                </div>

                <div className="flex flex-wrap gap-2">
                  {TRENDING_TAGS.map((tag) => (
                    <button
                      key={tag.label}
                      onClick={() => handleSelectTag(tag)}
                      className="px-3.5 py-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-400/50 rounded-xl text-xs font-bold text-neutral-200 transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Matched Products ({matchedProducts.length})</span>
                  {matchedProducts.length > 0 && <span className="text-[11px] text-amber-400">Click item to view details</span>}
                </div>

                {matchedProducts.length === 0 ? (
                  <div className="py-8 text-center text-neutral-500 text-xs font-medium">
                    No items found matching "{query}". Try searching "Katana", "Resin", or "Gift Card".
                  </div>
                ) : (
                  <div className="space-y-2">
                    {matchedProducts.slice(0, 6).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className="p-3 bg-neutral-950 border border-neutral-800/80 hover:border-amber-400/80 rounded-2xl flex items-center gap-4 cursor-pointer transition-all group"
                      >
                        <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded-xl object-cover border border-neutral-800" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                            {p.title}
                          </div>
                          <div className="text-[11px] text-neutral-400 truncate">{p.subtitle} • {p.franchise}</div>
                        </div>
                        <div className="text-xs font-mono font-bold text-amber-400">{formatPrice(p.priceUSD)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
