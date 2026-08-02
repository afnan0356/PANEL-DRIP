import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(
    product.sizes ? product.sizes[0] : ''
  );
  const [showQuickSizeMenu, setShowQuickSizeMenu] = useState(false);

  const isSaved = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.sizes && product.sizes.length > 1 && !showQuickSizeMenu) {
      setShowQuickSizeMenu(true);
      return;
    }
    addToCart(product, selectedQuickSize || undefined, 1);
    setShowQuickSizeMenu(false);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizeMenu(false);
      }}
      className="group relative bg-[#0E0E10] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:border-[#CCFF00] hover:shadow-xl"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] bg-[#0A0A0B] overflow-hidden">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isLimitedResin && (
            <span className="bg-[#CCFF00] text-black text-[10px] font-mono font-black px-2.5 py-1 rounded uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-black" /> LIMITED RESIN
            </span>
          )}
          {product.isPreOrder && (
            <span className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-md">
              PRE-ORDER
            </span>
          )}
          {product.originalPriceUSD && (
            <span className="bg-white text-black text-[10px] font-mono font-black px-2.5 py-1 rounded uppercase tracking-wider shadow-md">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-300 ${
            isSaved
              ? 'bg-[#CCFF00] text-black shadow-lg'
              : 'bg-[#0A0A0B]/80 text-zinc-300 hover:text-white hover:bg-zinc-900 backdrop-blur-md border border-zinc-800'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 bg-[#0A0A0B]/90 hover:bg-black text-white text-xs font-bold py-2.5 rounded-xl backdrop-blur-md border border-zinc-700/80 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Subtitle / Franchise */}
          <span className="text-[10px] font-mono font-bold text-[#CCFF00] uppercase tracking-widest block">
            {product.franchise} // {product.subcategory}
          </span>

          {/* Title */}
          <h3 className="text-sm font-bold text-zinc-100 group-hover:text-[#CCFF00] transition-colors line-clamp-2 mt-1 font-sans">
            {product.title}
          </h3>
        </div>

        {/* Specs Pill tags */}
        <div className="flex flex-wrap gap-1 text-[10px] font-mono text-zinc-400">
          {product.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-zinc-900 border border-zinc-800/80 px-2 py-0.5 rounded text-zinc-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Rating Stars & Reviews */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <div className="flex items-center text-[#CCFF00]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 font-bold font-mono text-white">{product.rating}</span>
          </div>
          <span className="text-zinc-600">•</span>
          <span className="font-mono text-[11px] text-zinc-400">({product.reviewCount} reviews)</span>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          <div>
            <span className="text-base font-black text-white font-mono">
              {formatPrice(product.priceUSD)}
            </span>
            {product.originalPriceUSD && (
              <span className="block text-xs font-mono text-zinc-500 line-through">
                {formatPrice(product.originalPriceUSD)}
              </span>
            )}
          </div>

          <div className="relative">
            {/* Quick Size Selection Dropup */}
            {showQuickSizeMenu && product.sizes && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-full right-0 mb-2 w-36 bg-[#0A0A0B] border border-zinc-700 rounded-xl shadow-2xl p-2 z-30 space-y-1"
              >
                <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider px-1">
                  Select Size:
                </div>
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuickSize(sz);
                      addToCart(product, sz, 1);
                      setShowQuickSizeMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1 text-xs font-mono rounded transition-colors ${
                      selectedQuickSize === sz
                        ? 'bg-[#CCFF00] text-black font-bold'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="bg-[#CCFF00] hover:bg-[#bce600] text-black p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span className="hidden sm:inline uppercase">Add</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
