import React from 'react';
import { Gift, Sparkles, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FREE_GIFTS_CATALOG } from '../data/products';

export const FreeGiftSelector: React.FC = () => {
  const { cartSubtotalUSD, selectedFreeGiftId, setSelectedFreeGiftId, addToCart, formatPrice } = useShop();

  const unlockedTier1 = cartSubtotalUSD >= 50;
  const unlockedTier2 = cartSubtotalUSD >= 100;
  const unlockedTier3 = cartSubtotalUSD >= 150;

  const currentUnlockedTier = unlockedTier3 ? 3 : unlockedTier2 ? 2 : unlockedTier1 ? 1 : 0;

  const handleClaimFreeGift = (gift: typeof FREE_GIFTS_CATALOG[0]) => {
    setSelectedFreeGiftId(gift.id);
    // Convert free gift item into a zero-dollar product object to inject to cart
    const freeProduct = {
      id: `free-gift-${gift.id}`,
      title: `[FREE GIFT] ${gift.name}`,
      subtitle: 'COMPLIMENTARY TIER REWARD',
      category: 'accessories-decor' as const,
      subcategory: 'Free Gift',
      franchise: 'Exclusive Gift',
      priceUSD: 0,
      originalPriceUSD: gift.originalValueUSD,
      rating: 5.0,
      reviewCount: 1,
      images: [gift.image],
      description: 'Exclusive threshold reward unlocked for your order.',
      specs: [{ label: 'Condition', value: '100% Free Tier Gift' }],
      stockCount: 99,
      tags: ['Free Gift'],
      reviews: []
    };

    addToCart(freeProduct, 'Standard', 1, true);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-amber-500/10 via-neutral-900 to-purple-900/20 border border-amber-500/30 rounded-2xl space-y-3 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase font-mono tracking-wider text-amber-300">
              Smart Free Gift Rewards
            </h4>
            <p className="text-[10px] text-neutral-400">Unlock complimentary gifts based on your cart total</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 bg-neutral-950 text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold font-mono">
          Tier {currentUnlockedTier} Unlocked
        </span>
      </div>

      {/* Progress towards Tiers */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-neutral-400">
          <span>Cart: {formatPrice(cartSubtotalUSD)}</span>
          {currentUnlockedTier < 3 && (
            <span className="text-amber-400">
              Add {formatPrice((currentUnlockedTier === 0 ? 50 : currentUnlockedTier === 1 ? 100 : 150) - cartSubtotalUSD)} for Next Tier!
            </span>
          )}
        </div>
        <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-800 flex">
          <div
            className={`h-full transition-all duration-300 ${unlockedTier1 ? 'bg-amber-500' : 'bg-neutral-800'}`}
            style={{ width: '33.3%' }}
          />
          <div
            className={`h-full transition-all duration-300 ${unlockedTier2 ? 'bg-amber-400' : 'bg-neutral-800'}`}
            style={{ width: '33.3%' }}
          />
          <div
            className={`h-full transition-all duration-300 ${unlockedTier3 ? 'bg-amber-300' : 'bg-neutral-800'}`}
            style={{ width: '33.3%' }}
          />
        </div>
      </div>

      {/* Selectable Gift List */}
      <div className="space-y-2 pt-1">
        {FREE_GIFTS_CATALOG.map((gift) => {
          const isUnlocked = cartSubtotalUSD >= gift.minSpendUSD;
          const isSelected = selectedFreeGiftId === gift.id;

          return (
            <div
              key={gift.id}
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400'
                  : isUnlocked
                  ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500/50'
                  : 'bg-neutral-950/40 border-neutral-900 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={gift.image} alt={gift.name} className="w-10 h-10 rounded-lg object-cover border border-neutral-800 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{gift.name}</div>
                  <div className="text-[10px] text-neutral-400">
                    Tier {gift.tier} (${gift.minSpendUSD}+) • <span className="line-through">{formatPrice(gift.originalValueUSD)}</span> FREE
                  </div>
                </div>
              </div>

              {isUnlocked ? (
                <button
                  onClick={() => handleClaimFreeGift(gift)}
                  disabled={isSelected}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all shrink-0 ${
                    isSelected
                      ? 'bg-emerald-500 text-neutral-950 flex items-center gap-1'
                      : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                    </>
                  ) : (
                    'Claim Gift'
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-bold shrink-0">
                  <Lock className="w-3 h-3" /> Spend ${gift.minSpendUSD}+
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
