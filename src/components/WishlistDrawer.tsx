import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    products,
    addToCart,
    formatPrice
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E0E10] border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#CCFF00] fill-current" />
              <h2 className="text-lg font-black italic uppercase font-sans tracking-tight">
                SAVED WISHLIST ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {savedProducts.length > 0 ? (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-3.5 flex gap-3 items-center hover:border-zinc-700 transition-colors"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-xl bg-zinc-900 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono font-bold text-[#CCFF00] uppercase tracking-widest block truncate">
                      {product.franchise}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1 font-sans">
                      {product.title}
                    </h4>
                    <span className="text-sm font-black font-mono text-white block mt-1">
                      {formatPrice(product.priceUSD)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product.id);
                      }}
                      className="bg-[#CCFF00] hover:bg-[#bce600] text-black p-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md"
                      title="Move to Cart"
                    >
                      <ShoppingBag className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-zinc-500 hover:text-[#CCFF00] p-2 text-center"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 bg-[#0A0A0B] rounded-full flex items-center justify-center mx-auto text-zinc-500 border border-zinc-800">
                  <Heart className="w-8 h-8 text-[#CCFF00]" />
                </div>
                <h3 className="text-base font-black italic text-white uppercase font-sans">
                  No saved wishlist items
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Click the heart icon on any resin statue or streetwear piece to save it for later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
