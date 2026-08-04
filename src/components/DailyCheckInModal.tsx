import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Gift, Flame, Sparkles, CheckCircle2, Award, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const DailyCheckInModal: React.FC = () => {
  const { isDailyCheckInOpen, setIsDailyCheckInOpen, user, claimDailyCheckIn } = useShop();

  const [claimedRewardMessage, setClaimedRewardMessage] = useState<string | null>(null);

  if (!isDailyCheckInOpen) return null;

  const currentStreak = user ? user.dailyStreak : 0;
  const todayStr = new Date().toISOString().split('T')[0];
  const isAlreadyClaimedToday = user?.lastCheckInDate === todayStr;

  const STREAK_DAYS = [
    { day: 1, points: 50, reward: '50 Pts', desc: 'Starter Bonus' },
    { day: 2, points: 100, reward: '100 Pts', desc: 'Streak Booster' },
    { day: 3, points: 150, reward: '150 Pts + Sticker', desc: 'Free Pack' },
    { day: 4, points: 200, reward: '200 Pts', desc: 'Midweek Drip' },
    { day: 5, points: 250, reward: '250 Pts', desc: 'Collector Rank' },
    { day: 6, points: 300, reward: '300 Pts', desc: 'VIP Level Up' },
    { day: 7, points: 500, reward: '500 Pts JACKPOT', desc: 'Mystery Box Voucher', isJackpot: true }
  ];

  const handleClaim = () => {
    const res = claimDailyCheckIn();
    if (res.success) {
      setClaimedRewardMessage(res.message);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl overflow-hidden bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl text-white"
        >
          {/* Top Banner */}
          <div className="relative p-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 border-b border-neutral-800 text-center">
            <button
              onClick={() => setIsDailyCheckInOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/30 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2 text-amber-200 border border-amber-300/30">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-bounce" /> Daily Otaku Streak
            </div>

            <h2 className="text-3xl font-black uppercase font-mono tracking-tight text-white drop-shadow-md">
              7-Day Login Rewards
            </h2>
            <p className="text-xs text-amber-100/90 mt-1">
              Check in daily to build your streak and unlock up to <span className="font-bold underline">500 Loyalty Points</span> + Mystery Rewards!
            </p>
          </div>

          {/* Current Streak Indicator Bar */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4 bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <Flame className="w-6 h-6 fill-orange-400" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-semibold uppercase">Current Streak</div>
                  <div className="text-xl font-black text-white font-mono flex items-center gap-2">
                    {currentStreak} Days <span className="text-xs font-normal text-amber-400">({user?.loyaltyPoints || 0} Total Points)</span>
                  </div>
                </div>
              </div>

              {isAlreadyClaimedToday ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" /> Claimed Today
                </div>
              ) : (
                <button
                  onClick={handleClaim}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Claim Today's Bonus
                </button>
              )}
            </div>

            {claimedRewardMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 mb-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-300 font-bold flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-emerald-400" /> {claimedRewardMessage}
              </motion.div>
            )}

            {/* 7 Day Cards Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {STREAK_DAYS.map((s) => {
                const isPassed = s.day <= currentStreak;
                const isCurrent = s.day === (currentStreak % 7) + (isAlreadyClaimedToday ? 0 : 1);

                return (
                  <div
                    key={s.day}
                    className={`relative p-3 rounded-2xl border text-center transition-all ${
                      s.isJackpot
                        ? 'col-span-2 sm:col-span-1 bg-gradient-to-b from-amber-500/20 to-neutral-950 border-amber-500/50 shadow-lg shadow-amber-500/10'
                        : isPassed
                        ? 'bg-neutral-800/80 border-emerald-500/40 text-emerald-300'
                        : isCurrent
                        ? 'bg-amber-500/10 border-amber-400 text-amber-300 ring-2 ring-amber-400/30 animate-pulse'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-500'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1">
                      Day {s.day}
                    </div>

                    <div className="w-8 h-8 mx-auto mb-1 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-800">
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : s.isJackpot ? (
                        <Gift className="w-5 h-5 text-amber-400 animate-bounce" />
                      ) : (
                        <Award className="w-4 h-4 text-neutral-400" />
                      )}
                    </div>

                    <div className="text-xs font-black font-mono leading-tight">{s.reward}</div>
                    <div className="text-[9px] text-neutral-400 mt-0.5 truncate">{s.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-center text-xs text-neutral-400">
            Keep your streak active! Missing 2 consecutive days resets streak to Day 1.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
