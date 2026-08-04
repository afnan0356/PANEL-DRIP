import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Trophy, Gift, RotateCw, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SpinWheelModal: React.FC = () => {
  const { isSpinWheelOpen, setIsSpinWheelOpen, spinWheel, user } = useShop();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [spunResult, setSpunResult] = useState<{ rewardTitle: string; code?: string; points?: number } | null>(null);

  if (!isSpinWheelOpen) return null;

  const WHEEL_SECTORS = [
    { title: '5% OFF COUPON', color: 'bg-purple-600', text: 'text-purple-200' },
    { title: '100 POINTS', color: 'bg-amber-500', text: 'text-amber-950' },
    { title: 'FREE SHIPPING', color: 'bg-emerald-600', text: 'text-emerald-100' },
    { title: '300 POINTS', color: 'bg-blue-600', text: 'text-blue-100' },
    { title: '15% MYSTERY BOX', color: 'bg-pink-600', text: 'text-pink-100' },
    { title: '500 PTS JACKPOT', color: 'bg-orange-500', text: 'text-orange-950' }
  ];

  const handleSpinClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpunResult(null);

    // Calculate random degrees (minimum 5 full spins = 1800 deg + offset)
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotationDegrees + 1800 + extraDegrees;
    setRotationDegrees(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const res = spinWheel();
      setSpunResult(res);
    }, 3500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md overflow-hidden bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl text-white text-center"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-br from-purple-900/40 via-neutral-900 to-amber-900/30 border-b border-neutral-800 relative">
            <button
              onClick={() => setIsSpinWheelOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold uppercase text-amber-400 mb-2">
              <Sparkles className="w-4 h-4" /> Daily Luck Wheel
            </div>

            <h2 className="text-2xl font-black font-mono uppercase tracking-tight">Spin & Win Rewards</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Spin once daily for guaranteed coupons, loyalty points, or free gift vouchers!
            </p>
          </div>

          {/* Wheel Graphic Container */}
          <div className="p-6 flex flex-col items-center justify-center relative">
            {/* Pointer Pin */}
            <div className="absolute top-4 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

            {/* Wheel */}
            <div className="relative w-64 h-64 my-4">
              <div
                style={{
                  transform: `rotate(${rotationDegrees}deg)`,
                  transition: isSpinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
                }}
                className="w-full h-full rounded-full border-4 border-amber-400/80 shadow-2xl overflow-hidden relative bg-neutral-950"
              >
                {/* Sector Segments Visual */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 opacity-90">
                  <div className="bg-purple-600 border border-black/20 flex items-center justify-center p-2 text-[10px] font-black uppercase text-purple-100">
                    5% OFF
                  </div>
                  <div className="bg-amber-500 border border-black/20 flex items-center justify-center p-2 text-[10px] font-black uppercase text-neutral-950">
                    100 PTS
                  </div>
                  <div className="bg-emerald-600 border border-black/20 flex items-center justify-center p-2 text-[10px] font-black uppercase text-emerald-100">
                    FREE SHIP
                  </div>
                  <div className="bg-blue-600 border border-black/20 flex items-center justify-center p-2 text-[10px] font-black uppercase text-blue-100">
                    300 PTS
                  </div>
                  <div className="bg-pink-600 border border-black/20 flex items-center justify-center p-2 text-[10px] font-black uppercase text-pink-100">
                    15% BOX
                  </div>
                  <div className="bg-orange-500 border border-black/20 flex items-center justify-center p-2 text-[10px] font-black uppercase text-neutral-950">
                    500 JACKPOT
                  </div>
                </div>

                {/* Center Hub */}
                <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-neutral-900 border-2 border-amber-400 flex items-center justify-center shadow-inner z-10">
                  <Trophy className="w-7 h-7 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Spun Result Box */}
            {spunResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full p-4 bg-amber-500/20 border border-amber-500/40 rounded-2xl mb-4 text-center space-y-1"
              >
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Reward Unlocked!
                </div>
                <div className="text-xl font-black font-mono text-white">{spunResult.rewardTitle}</div>
                {spunResult.code && (
                  <p className="text-xs text-neutral-300">
                    Coupon Code: <span className="font-mono font-bold text-amber-300">{spunResult.code}</span> (Auto-applied to context)
                  </p>
                )}
              </motion.div>
            )}

            {/* Spin Button */}
            <button
              onClick={handleSpinClick}
              disabled={isSpinning}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black tracking-wider uppercase font-mono rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              {isSpinning ? 'Spinning Wheel...' : 'Spin Daily Wheel Now'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
