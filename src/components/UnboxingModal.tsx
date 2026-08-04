import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Box, ShieldCheck, Gift, Trophy, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MysteryDropContent } from '../types';

export const UnboxingModal: React.FC = () => {
  const { unboxingProduct, setUnboxingProduct, formatPrice, addToCart } = useShop();

  const [isUnboxing, setIsUnboxing] = useState(false);
  const [revealedDrop, setRevealedDrop] = useState<MysteryDropContent | null>(null);

  if (!unboxingProduct) return null;

  const drops = unboxingProduct.possibleDrops || [
    {
      id: 'd-def',
      name: 'Cyber Grail Figure + Oversized Tee Pack',
      rarity: 'Epic',
      valueUSD: unboxingProduct.guaranteedMinValueUSD || 150,
      image: unboxingProduct.images[0],
      chancePercent: 50
    }
  ];

  const handleStartUnbox = () => {
    setIsUnboxing(true);
    setRevealedDrop(null);

    setTimeout(() => {
      setIsUnboxing(false);
      // Select drop weighted by chance or random
      const selected = drops[Math.floor(Math.random() * drops.length)];
      setRevealedDrop(selected);
    }, 2500);
  };

  const handleClaimDropToCart = () => {
    addToCart(unboxingProduct);
    setUnboxingProduct(null);
    setRevealedDrop(null);
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-500/20';
      case 'Epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-purple-500/20';
      case 'Rare':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-blue-500/20';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl overflow-hidden bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl text-white"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-neutral-900 via-amber-950/40 to-neutral-900 border-b border-neutral-800 text-center">
            <button
              onClick={() => {
                setUnboxingProduct(null);
                setRevealedDrop(null);
              }}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold uppercase text-amber-400 mb-2">
              <Box className="w-4 h-4" /> Interactive Unboxing Simulator
            </div>

            <h2 className="text-2xl font-black font-mono uppercase tracking-tight">{unboxingProduct.title}</h2>
            <p className="text-xs text-amber-300 font-semibold mt-1">
              Guaranteed Minimum Value:{' '}
              <span className="underline">{formatPrice(unboxingProduct.guaranteedMinValueUSD || 120)}</span>
            </p>
          </div>

          {/* Unboxing Arena */}
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
            {/* Background glowing aura */}
            <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-3xl -z-10 pointer-events-none" />

            {!isUnboxing && !revealedDrop && (
              <div className="space-y-6">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-amber-500/20 to-purple-600/20 border-2 border-amber-400/60 p-4 shadow-2xl flex items-center justify-center"
                >
                  <Box className="w-16 h-16 text-amber-400" />
                </motion.div>

                <div>
                  <h3 className="text-lg font-bold">Ready to Crack Open Your Vault Crate?</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-md">
                    Simulate unboxing to preview guaranteed items & jackpot odds before adding this box to your cart!
                  </p>
                </div>

                <button
                  onClick={handleStartUnbox}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black tracking-wider uppercase font-mono rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 mx-auto"
                >
                  <Sparkles className="w-5 h-5" /> Open Vault Crate Now
                </button>
              </div>
            )}

            {isUnboxing && (
              <div className="space-y-4 py-8">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-36 h-36 mx-auto rounded-3xl bg-gradient-to-br from-amber-500/30 to-purple-600/30 border-4 border-amber-400 shadow-2xl flex items-center justify-center"
                >
                  <Box className="w-20 h-20 text-amber-300" />
                </motion.div>
                <div className="text-lg font-black font-mono text-amber-400 tracking-wider animate-pulse">
                  UNBOXING MYSTERY CHEST...
                </div>
              </div>
            )}

            {revealedDrop && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-6 bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl space-y-4 text-center"
              >
                <div className="inline-block">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-md ${getRarityBadge(
                      revealedDrop.rarity
                    )}`}
                  >
                    ✨ {revealedDrop.rarity} DROP UNLOCKED!
                  </span>
                </div>

                <img
                  src={revealedDrop.image}
                  alt={revealedDrop.name}
                  className="w-36 h-36 mx-auto object-cover rounded-2xl border border-neutral-800 shadow-xl"
                />

                <div>
                  <h4 className="text-lg font-black text-white">{revealedDrop.name}</h4>
                  <p className="text-xs text-amber-400 font-mono font-bold mt-0.5">
                    MSRP Value: {formatPrice(revealedDrop.valueUSD)}
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={handleStartUnbox}
                    className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" /> Try Again
                  </button>
                  <button
                    onClick={handleClaimDropToCart}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Add Box to Cart
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Guaranteed Items List */}
          <div className="p-4 bg-neutral-950 border-t border-neutral-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Possible Drops in this Box:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {drops.map((d) => (
                <div
                  key={d.id}
                  className="p-2 bg-neutral-900/80 border border-neutral-800 rounded-xl text-left flex items-center gap-2"
                >
                  <img src={d.image} alt={d.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-white truncate">{d.name}</div>
                    <div className="text-[9px] text-amber-400 font-mono">{formatPrice(d.valueUSD)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
