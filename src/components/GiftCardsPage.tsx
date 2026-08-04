import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import {
  Ticket,
  Zap,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  ShoppingCart,
  Sparkles,
  ArrowLeft,
  Mail,
  Gamepad2,
  Tv,
  Globe
} from 'lucide-react';

export const GiftCardsPage: React.FC = () => {
  const { products, addToCart, setSelectedProduct, navigateToView, formatPrice } = useShop();

  // Filter gift card products
  const giftCardProducts = products.filter((p) => p.category === 'gift-cards' || p.isDigital);

  const [selectedDenominations, setSelectedDenominations] = useState<Record<string, string>>({});

  const handleDenominationChange = (productId: string, size: string) => {
    setSelectedDenominations((prev) => ({
      ...prev,
      [productId]: size
    }));
  };

  const getDenominationPrice = (basePriceUSD: number, size?: string) => {
    if (!size) return basePriceUSD;
    if (size.includes('$25')) return 25;
    if (size.includes('$50')) return 50;
    if (size.includes('$100')) return 100;
    if (size.includes('$250')) return 250;
    if (size.includes('$500')) return 500;
    return basePriceUSD;
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const size = selectedDenominations[product.id] || product.sizes?.[1] || '$50 Code';
    const price = getDenominationPrice(product.priceUSD, size);
    
    // Create product variant with adjusted price for size selection
    const productWithPrice: Product = {
      ...product,
      priceUSD: price
    };

    addToCart(productWithPrice, size, 1);
  };

  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen pb-20 font-sans">
      {/* Hero Banner */}
      <div className="relative border-b border-zinc-800 bg-[#0A0A0B] overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-6 relative z-10 text-center">
          <button
            onClick={() => navigateToView('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#CCFF00] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Physical Goods
          </button>

          <div className="inline-flex items-center gap-2 bg-[#0E0E10] border border-zinc-800 text-[#CCFF00] px-4 py-1.5 rounded-full text-xs font-mono font-black tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>INSTANT E-MAIL DIGITAL DELIVERY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono uppercase tracking-tight">
            DIGITAL GIFT CARDS & <span className="text-[#CCFF00]">GAME VOUCHERS</span>
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Purchase official digital codes for Google Play, Apple, Steam Wallet, PlayStation Network, Xbox, and Amazon. All codes are verified and emailed instantly upon order completion with zero processing fees.
          </p>

          {/* Feature Badges */}
          <div className="pt-2 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-1.5 bg-[#0E0E10] border border-zinc-800 px-3 py-1.5 rounded-xl">
              <Zap className="w-4 h-4 text-[#CCFF00]" /> ⚡ 3-Second Delivery
            </span>
            <span className="flex items-center gap-1.5 bg-[#0E0E10] border border-zinc-800 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#CCFF00]" /> 100% Verified Legit
            </span>
            <span className="flex items-center gap-1.5 bg-[#0E0E10] border border-zinc-800 px-3 py-1.5 rounded-xl">
              <CreditCard className="w-4 h-4 text-[#CCFF00]" /> Pay with Cards, Apple Pay or Web3 Crypto
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Supported Brand Logos Bar */}
        <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-bold uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" /> Supported Official Gaming & App Stores:
            </span>
            <span className="text-zinc-500 hidden sm:inline">Zero Regional Lock Issues</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
            {[
              { name: 'Google Play', icon: '🤖', color: 'from-emerald-500/20 to-teal-500/10' },
              { name: 'Apple Store', icon: '🍎', color: 'from-blue-500/20 to-cyan-500/10' },
              { name: 'Steam Wallet', icon: '🎮', color: 'from-purple-500/20 to-indigo-500/10' },
              { name: 'PlayStation', icon: '🕹️', color: 'from-indigo-500/20 to-blue-500/10' },
              { name: 'Xbox Live', icon: '💚', color: 'from-green-500/20 to-emerald-500/10' },
              { name: 'Amazon eGift', icon: '📦', color: 'from-amber-500/20 to-orange-500/10' }
            ].map((brand) => (
              <div
                key={brand.name}
                className={`bg-gradient-to-br ${brand.color} border border-zinc-800 rounded-xl p-3 text-center space-y-1`}
              >
                <span className="text-xl">{brand.icon}</span>
                <span className="block text-[11px] font-mono font-bold text-white">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono uppercase flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#CCFF00]" />
              AVAILABLE DIGITAL VOUCHERS ({giftCardProducts.length})
            </h2>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              Separately Categorized Digital Products
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftCardProducts.map((product) => {
              const currentDenomination =
                selectedDenominations[product.id] || product.sizes?.[1] || '$50 Code';
              const currentPriceUSD = getDenominationPrice(product.priceUSD, currentDenomination);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#0A0A0B] border border-zinc-800 hover:border-[#CCFF00] rounded-2xl p-5 space-y-4 shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Badge & Digital Tag */}
                    <div className="flex items-center justify-between">
                      <span className="bg-[#CCFF00] text-black text-[10px] font-black uppercase font-mono px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
                        <Zap className="w-3 h-3 text-black" /> DIGITAL VOUCHER
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">Instant E-Mail Code</span>
                    </div>

                    {/* Image / Banner */}
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="relative h-40 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <div>
                          <span className="text-[#CCFF00] font-mono text-[10px] uppercase font-bold block">
                            {product.franchise}
                          </span>
                          <h3 className="text-white font-mono font-bold text-sm line-clamp-1">
                            {product.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Denomination Picker */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">
                        Select Gift Card Value:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes?.map((size) => {
                          const isSelected = currentDenomination === size;
                          return (
                            <button
                              key={size}
                              onClick={() => handleDenominationChange(product.id, size)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-colors ${
                                isSelected
                                  ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                                  : 'bg-[#0E0E10] text-zinc-300 border-zinc-800 hover:border-zinc-700'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Price & Add To Cart Button */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono block">Payable Price</span>
                      <strong className="text-white font-mono text-lg font-black text-[#CCFF00]">
                        {formatPrice(currentPriceUSD)}
                      </strong>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-3 py-2.5 rounded-xl text-xs font-mono border border-zinc-800"
                        title="View Full Details"
                      >
                        Details
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-black" />
                        <span>Add Code</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Digital Voucher Delivery Notice Box */}
        <div className="bg-[#0A0A0B] border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-4">
          <h3 className="text-white font-mono font-bold text-sm sm:text-base uppercase flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#CCFF00]" />
            HOW DIGITAL VOUCHER DELIVERY WORKS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-[#0E0E10] border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="text-[#CCFF00] font-black text-base">01. Select Value</span>
              <p className="text-zinc-300 font-bold">Choose $25 to $500</p>
              <p className="text-zinc-400">Pick your desired denomination for Google Play, Steam, Apple, PSN, Xbox, or Amazon.</p>
            </div>

            <div className="bg-[#0E0E10] border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="text-[#CCFF00] font-black text-base">02. Instant Checkout</span>
              <p className="text-zinc-300 font-bold">Pay via Card or Web3</p>
              <p className="text-zinc-400">Checkout smoothly using credit card, Apple Pay, Klarna, or instant crypto verification.</p>
            </div>

            <div className="bg-[#0E0E10] border border-zinc-800 p-4 rounded-xl space-y-2">
              <span className="text-[#CCFF00] font-black text-base">03. Redeem Code</span>
              <p className="text-zinc-300 font-bold">Instant Code Emailed</p>
              <p className="text-zinc-400">Your unique alphanumeric redemption code is generated instantly and saved in your order receipt.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
