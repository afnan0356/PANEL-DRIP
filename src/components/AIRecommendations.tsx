import React from 'react';
import { Sparkles, TrendingUp, Zap, ShoppingBag, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const AIRecommendations: React.FC<{ currentProduct?: Product; title?: string }> = ({
  currentProduct,
  title = 'AI Recommended For You'
}) => {
  const { products, setSelectedProduct, formatPrice, addToCart, toggleWishlist, isInWishlist } = useShop();

  // Smart filtering logic based on current product franchise or high rating
  const recommendedList = currentProduct
    ? products.filter((p) => p.id !== currentProduct.id && (p.franchise === currentProduct.franchise || p.category === currentProduct.category))
    : products.filter((p) => p.rating >= 4.9).slice(0, 4);

  const displayList = recommendedList.length > 0 ? recommendedList.slice(0, 4) : products.slice(0, 4);

  return (
    <div className="py-8 border-t border-neutral-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase font-mono tracking-tight text-white">{title}</h3>
            <p className="text-xs text-neutral-400">Tailored by smart collector behavior & trending drops</p>
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider hidden sm:inline">
          AI Personal Match 98%
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {displayList.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProduct(p)}
            className="p-3 bg-neutral-900 border border-neutral-800 hover:border-amber-400/80 rounded-2xl cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="relative mb-2 overflow-hidden rounded-xl bg-neutral-950">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                    isInWishlist(p.id) ? 'bg-red-500 text-white' : 'bg-black/60 text-white/80 hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                {p.title}
              </div>
              <div className="text-[10px] text-neutral-400 truncate">{p.subtitle}</div>
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">{formatPrice(p.priceUSD)}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p);
                }}
                className="p-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
