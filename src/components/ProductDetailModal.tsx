import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  Ruler,
  ThumbsUp,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    addReviewToProduct,
    setIsCheckoutOpen,
    products
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    selectedProduct.sizes ? selectedProduct.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  // Review Form state
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewBadge, setNewReviewBadge] = useState('Verified Collector');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const isSaved = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize || undefined, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize || undefined, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    addReviewToProduct(selectedProduct.id, {
      userName: newReviewName.trim(),
      userBadge: newReviewBadge,
      rating: newReviewRating,
      title: newReviewTitle.trim() || 'Awesome quality drop!',
      comment: newReviewComment.trim(),
      helpfulCount: 0
    });

    // Reset Form
    setNewReviewName('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setShowWriteReview(false);
  };

  // Related products (same category or franchise)
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== selectedProduct.id &&
        (p.category === selectedProduct.category || p.franchise === selectedProduct.franchise)
    )
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#0E0E10] border border-zinc-800 rounded-3xl max-w-5xl w-full text-zinc-100 relative my-auto shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Close Modal Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#0A0A0B]/90 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-700/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          
          {/* Main Top Grid: Gallery & Product Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              {/* Main Active Image Box */}
              <div className="relative aspect-square bg-[#0A0A0B] rounded-2xl overflow-hidden border border-zinc-800 group">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {selectedProduct.isLimitedResin && (
                  <div className="absolute top-4 left-4 bg-[#CCFF00] text-black text-xs font-mono font-black px-3 py-1 rounded uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>LIMITED {selectedProduct.editionLimit ? `${selectedProduct.editionLimit} PCS` : 'RESIN'}</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Selector Row */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                  {selectedProduct.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#0A0A0B] ${
                        activeImageIndex === idx
                          ? 'border-[#CCFF00] scale-105 shadow-md'
                          : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Franchise & Subcategory */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-widest">
                    {selectedProduct.franchise} // {selectedProduct.subcategory}
                  </span>
                  {selectedProduct.isPreOrder && (
                    <span className="text-[10px] font-mono font-bold bg-zinc-800 text-zinc-200 border border-zinc-700 px-2.5 py-0.5 rounded uppercase">
                      Est. Shipping: {selectedProduct.preOrderDate || 'Q4 2026'}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-black italic text-white font-sans uppercase leading-tight tracking-tight">
                  {selectedProduct.title}
                </h1>

                {/* Subtitle / Edition */}
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {selectedProduct.subtitle}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <div className="flex items-center text-[#CCFF00]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-bold font-mono text-white text-sm">
                      {selectedProduct.rating}
                    </span>
                  </div>
                  <span className="text-zinc-600">•</span>
                  <span className="font-mono text-zinc-400 underline cursor-pointer" onClick={() => setActiveTab('reviews')}>
                    Based on {selectedProduct.reviewCount} collector reviews
                  </span>
                </div>

                {/* Pricing Box */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-black font-mono text-white">
                    {formatPrice(selectedProduct.priceUSD)}
                  </span>
                  {selectedProduct.originalPriceUSD && (
                    <span className="text-base font-mono text-zinc-500 line-through">
                      {formatPrice(selectedProduct.originalPriceUSD)}
                    </span>
                  )}
                  {selectedProduct.originalPriceUSD && (
                    <span className="text-xs font-mono font-black text-black bg-[#CCFF00] px-2 py-0.5 rounded">
                      SAVE ${(selectedProduct.originalPriceUSD - selectedProduct.priceUSD).toFixed(2)} USD
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed font-sans pt-2">
                  {selectedProduct.description}
                </p>

                {/* Size / Variant Options */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-zinc-300 uppercase">
                        Select Option / Size:
                      </span>
                      {selectedProduct.category === 'streetwear' || selectedProduct.category === 'bottoms' || selectedProduct.category === 'cosplay' ? (
                        <button
                          onClick={() => setIsSizeGuideOpen(true)}
                          className="text-[#CCFF00] hover:underline font-mono text-[11px] flex items-center gap-1"
                        >
                          <Ruler className="w-3 h-3" /> Size Guide
                        </button>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                            selectedSize === sz
                              ? 'bg-[#CCFF00] border-[#CCFF00] text-black font-black scale-105 shadow-md'
                              : 'bg-[#0A0A0B] border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Actions Row */}
                <div className="space-y-3 pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-4">
                    {/* Quantity Control */}
                    <div className="flex items-center bg-[#0A0A0B] border border-zinc-800 rounded-xl">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2.5 text-zinc-300 hover:text-white font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="px-4 font-mono font-bold text-sm text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2.5 text-zinc-300 hover:text-white font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Primary Button */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#CCFF00] hover:bg-[#bce600] text-black font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                    >
                      <ShoppingBag className="w-4 h-4 text-black" />
                      <span>Add To Cart</span>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(selectedProduct.id)}
                      className={`p-3 rounded-xl border transition-colors ${
                        isSaved
                          ? 'bg-[#CCFF00] border-[#CCFF00] text-black'
                          : 'bg-[#0A0A0B] border-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Buy Now Direct Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-black py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg transition-all"
                  >
                    Buy Now Direct
                  </button>
                </div>

                {/* Guarantees Box */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 font-mono pt-3">
                  <div className="flex items-center gap-1.5 bg-[#0A0A0B] p-2 rounded-lg border border-zinc-800">
                    <ShieldCheck className="w-4 h-4 text-[#CCFF00] shrink-0" />
                    <span>Official Licensed Merch</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0A0A0B] p-2 rounded-lg border border-zinc-800">
                    <Truck className="w-4 h-4 text-[#CCFF00] shrink-0" />
                    <span>Collector Bubble Wrap Box</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Tabs: Authentic Specs vs Customer Reviews */}
          <div className="border-t border-zinc-800 pt-6 space-y-6">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-4 border-b border-zinc-800 pb-3 text-sm font-mono font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 transition-all border-b-2 ${
                  activeTab === 'specs'
                    ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Specifications &amp; Authenticity
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 transition-all border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Collector Reviews ({selectedProduct.reviewCount})
              </button>
            </div>

            {/* Specs Tab Content */}
            {activeTab === 'specs' && (
              <div className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-widest">
                  // AUTHENTIC PRODUCT SPECIFICATIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProduct.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0E0E10] p-3.5 rounded-xl border border-zinc-800 space-y-1"
                    >
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">
                        {spec.label}
                      </span>
                      <span className="text-xs font-bold text-zinc-200 font-sans">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab Content */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                
                {/* Write a Review Toggle Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A0A0B] border border-zinc-800 p-5 rounded-2xl">
                  <div>
                    <span className="text-2xl font-black font-mono text-[#CCFF00]">
                      {selectedProduct.rating} / 5.0
                    </span>
                    <p className="text-xs text-zinc-400 font-mono">
                      Verified Ratings from {selectedProduct.reviewCount} otaku &amp; collectors
                    </p>
                  </div>

                  <button
                    onClick={() => setShowWriteReview(!showWriteReview)}
                    className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-2 self-start sm:self-auto"
                  >
                    <MessageSquare className="w-4 h-4 text-black" />
                    <span>{showWriteReview ? 'Cancel Review' : 'Write a Review'}</span>
                  </button>
                </div>

                {/* Interactive Review Form */}
                {showWriteReview && (
                  <form
                    onSubmit={handleReviewSubmit}
                    className="bg-[#0A0A0B] border border-[#CCFF00]/40 rounded-2xl p-6 space-y-4 shadow-xl"
                  >
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white font-sans">
                      Leave a Verified Collector Review
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                          Collector / Handle Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          placeholder="e.g. Ren_Akira"
                          className="w-full bg-[#0E0E10] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                          Collector Badge
                        </label>
                        <select
                          value={newReviewBadge}
                          onChange={(e) => setNewReviewBadge(e.target.value)}
                          className="w-full bg-[#0E0E10] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                        >
                          <option value="Verified Collector">Verified Resin Collector</option>
                          <option value="Streetwear Enthusiast">Streetwear Fits Buyer</option>
                          <option value="Convention Dresser">Cosplay &amp; Wig Specialist</option>
                          <option value="Manga Reader">Physical Manga Reader</option>
                        </select>
                      </div>
                    </div>

                    {/* Star Rating Select */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                        Star Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className="p-1 text-[#CCFF00] focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= newReviewRating ? 'fill-current' : 'text-zinc-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                        Review Title
                      </label>
                      <input
                        type="text"
                        required
                        value={newReviewTitle}
                        onChange={(e) => setNewReviewTitle(e.target.value)}
                        placeholder="e.g. Unbelievable detail on the print!"
                        className="w-full bg-[#0E0E10] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                        Review Comments
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Describe fit, packaging quality, resin shading, or convention durability..."
                        className="w-full bg-[#0E0E10] border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                    >
                      Post Review
                    </button>
                  </form>
                )}

                {/* Review Cards List */}
                <div className="space-y-4">
                  {selectedProduct.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white font-sans">{rev.userName}</span>
                          <span className="bg-zinc-900 text-[#CCFF00] text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3 h-3 text-[#CCFF00]" />
                            {rev.userBadge}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[#CCFF00]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <h5 className="font-bold text-xs text-zinc-200 font-sans">{rev.title}</h5>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">{rev.comment}</p>

                      <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{rev.helpfulCount} collectors found this review helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-zinc-800 pt-8 space-y-4">
              <h3 className="text-sm font-black italic text-white uppercase font-sans tracking-wider">
                PAIR WITH THIS DRIP
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProduct(rel);
                      setActiveImageIndex(0);
                    }}
                    className="bg-[#0A0A0B] border border-zinc-800 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-[#CCFF00] transition-all"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.title}
                      className="w-16 h-16 object-cover rounded-lg bg-zinc-900"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-[#CCFF00] uppercase block truncate font-bold">
                        {rel.franchise}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">{rel.title}</h4>
                      <span className="text-xs font-mono font-bold text-zinc-300">
                        {formatPrice(rel.priceUSD)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
