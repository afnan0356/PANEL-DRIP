import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Clock, Flame, Tag, ShoppingBag, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FlashDealBar: React.FC = () => {
  const { navigateToView, setSelectedCategory, formatPrice } = useShop();

  const [timeLeft, setTimeLeft] = useState(14 * 60 + 32); // 14 mins 32 secs
  const [remainingSlots, setRemainingSlots] = useState(38);
  const [liveBuyerNotification, setLiveBuyerNotification] = useState<{ name: string; city: string; item: string } | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 15 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulated live buyers popup
  useEffect(() => {
    const buyers = [
      { name: 'Alex M.', city: 'Tokyo', item: 'Demon Blade Sun-Breathing Katana' },
      { name: 'Kenji S.', city: 'Los Angeles', item: 'Otaku Legend Mystery Chest' },
      { name: 'Chloe T.', city: 'London', item: 'Cyber-Valkyrie Resin Statue' },
      { name: 'Yuki K.', city: 'Osaka', item: 'Heavyweight Void-Cutter Tee' }
    ];

    const interval = setInterval(() => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      setLiveBuyerNotification(randomBuyer);
      setRemainingSlots((prev) => Math.max(3, prev - 1));

      setTimeout(() => {
        setLiveBuyerNotification(null);
      }, 4000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  if (isDismissed) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleFlashDealClick = () => {
    setSelectedCategory('mystery-box');
    navigateToView('shop');
  };

  return (
    <div className="relative z-40 bg-gradient-to-r from-red-600 via-amber-600 to-orange-600 text-neutral-950 px-4 py-2 text-xs font-black uppercase font-mono shadow-md border-b border-orange-500/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2 py-0.5 bg-neutral-950 text-amber-400 rounded-lg text-[10px] font-bold animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-amber-400" /> FLASH DEAL ACTIVE
          </span>
          <span className="text-white drop-shadow truncate">
            🔥 50% OFF Mystery Boxes & Replica Katanas!
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-white">
          <div className="flex items-center gap-1 font-mono bg-neutral-950/40 px-2.5 py-1 rounded-lg border border-white/20">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>
              ENDS IN: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-amber-200">
            <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>{remainingSlots} SLOTS LEFT</span>
          </div>

          <button
            onClick={handleFlashDealClick}
            className="px-3 py-1 bg-neutral-950 text-amber-400 hover:bg-neutral-900 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 shadow"
          >
            <ShoppingBag className="w-3 h-3" /> Claim Deal Now
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Simulated Buyer Toast */}
      <AnimatePresence>
        {liveBuyerNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className="fixed bottom-4 left-4 z-50 p-3 bg-neutral-900/95 border border-amber-500/40 rounded-2xl shadow-2xl text-white text-xs flex items-center gap-3 backdrop-blur-md max-w-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-amber-300 text-[11px]">
                {liveBuyerNotification.name} ({liveBuyerNotification.city})
              </p>
              <p className="text-neutral-300 text-[10px] truncate">
                Just claimed: <span className="text-white font-semibold">{liveBuyerNotification.item}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
