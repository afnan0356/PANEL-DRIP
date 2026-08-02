import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE } from '../data/products';
import { Flame, Sparkles, ShieldCheck, Truck, Layers, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedCategory, scrollToProductGrid } = useShop();

  // Drop countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#0A0A0B] text-white overflow-hidden border-b border-zinc-800">
      {/* Background Image Overlay with Cyber Ambient Glow */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src={HERO_IMAGE}
          alt="Panel and Drip Lookbook"
          className="w-full h-full object-cover object-center scale-105 filter contrast-125 brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-transparent to-[#0A0A0B]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl space-y-6"
        >
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0E0E10] border border-zinc-800 text-[#CCFF00] px-3.5 py-1.5 rounded-full text-xs font-mono font-black tracking-[0.2em] uppercase shadow-lg">
            <Flame className="w-4 h-4 text-[#CCFF00] animate-bounce" />
            <span>TOKYO STREETWEAR x 1/7 SCALE RESIN STATUES</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tighter text-white leading-none uppercase font-sans">
            WEAR THE <span className="text-[#CCFF00]">MANGA.</span>
            <br />
            COLLECT THE <span className="text-white underline decoration-[#CCFF00]">LEGEND.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
            PANEL &amp; DRIP is the ultimate intersection of heavy-cotton anime streetwear, wide-leg Japanese denim, gender-inclusive cosplay gear, and high-end 1/7 scale resin statues for fashion-conscious otaku.
          </p>

          {/* Live Resin Statue Drop Countdown Box */}
          <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 max-w-xl shadow-2xl">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" /> NEXT ALLOCATION DROP:
              </span>
              <span className="text-sm font-black text-white font-sans uppercase">
                Cyber-Valkyrie EX 1/7 Resin Batch #2
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-center text-xs">
              <div className="bg-[#0A0A0B] border border-zinc-800 rounded-lg p-2 min-w-[48px]">
                <span className="text-lg font-black text-[#CCFF00] block">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[9px] text-zinc-500">DAYS</span>
              </div>
              <span className="text-zinc-600 font-bold">:</span>
              <div className="bg-[#0A0A0B] border border-zinc-800 rounded-lg p-2 min-w-[48px]">
                <span className="text-lg font-black text-white block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] text-zinc-500">HRS</span>
              </div>
              <span className="text-zinc-600 font-bold">:</span>
              <div className="bg-[#0A0A0B] border border-zinc-800 rounded-lg p-2 min-w-[48px]">
                <span className="text-lg font-black text-white block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] text-zinc-500">MIN</span>
              </div>
              <span className="text-zinc-600 font-bold">:</span>
              <div className="bg-[#0A0A0B] border border-zinc-800 rounded-lg p-2 min-w-[48px]">
                <span className="text-lg font-black text-[#CCFF00] block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] text-zinc-500">SEC</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                scrollToProductGrid();
              }}
              className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-8 py-4 rounded-xl shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2 group text-xs sm:text-sm uppercase tracking-widest"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setSelectedCategory('streetwear');
                scrollToProductGrid();
              }}
              className="bg-[#0E0E10] border border-zinc-800 hover:border-[#CCFF00] text-zinc-100 font-bold px-6 py-4 rounded-xl hover:bg-zinc-900 transition-all text-xs sm:text-sm uppercase tracking-widest"
            >
              Oversized Apparel Fit
            </button>
          </div>
        </motion.div>
      </div>

      {/* Ticker Bar Bottom */}
      <div className="border-t border-zinc-800 bg-[#0E0E10] py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-mono text-zinc-400">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
            <span>100% Licensed Official Merch</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Layers className="w-4 h-4 text-[#CCFF00]" />
            <span>450 GSM Heavyweight Cotton</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-[#CCFF00]" />
            <span>Collector Bubble-Wrap Shipping</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#CCFF00]" />
            <span>Museum 1/7 Resin Statues</span>
          </div>
        </div>
      </div>
    </section>
  );
};
