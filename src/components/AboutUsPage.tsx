import React from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  ShieldCheck,
  Compass,
  Rocket,
  Award,
  ArrowRight,
  Heart,
  Package,
  Layers,
  Zap,
  Globe,
  CheckCircle2,
  Sword,
  Shirt,
  Ticket
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { navigateToView, setSelectedCategory } = useShop();

  const handleShopClick = (cat?: any) => {
    if (cat) setSelectedCategory(cat);
    navigateToView('shop');
  };

  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen pb-20 font-sans">
      {/* Hero Banner */}
      <div className="relative border-b border-zinc-800 bg-[#0A0A0B] overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#CCFF00]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#0E0E10] border border-zinc-800 text-[#CCFF00] px-4 py-1.5 rounded-full text-xs font-mono font-black tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>THE PANEL & DRIP STORY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-mono leading-none">
            WHERE ANIME CULTURE MEETS <br />
            <span className="text-[#CCFF00]">HIGH-END STREETWEAR & COLLECTIBLES</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Founded by collectors, designers, and otaku purists, Panel & Drip was born out of a desire for authentic, museum-grade anime merchandise, handcrafted replica katanas, heavyweight fashion streetwear, and instant digital gaming vouchers.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleShopClick()}
              className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-8 py-3.5 rounded-xl text-xs uppercase font-mono tracking-widest shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span>EXPLORE THE VAULT</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* Brand Story & Genesis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-[#CCFF00] font-mono text-xs font-bold uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>OUR ORIGIN</span>
            </div>
            <h2 className="text-3xl font-black text-white font-mono uppercase tracking-tight">
              Why We Created <span className="text-[#CCFF00]">Panel & Drip</span>
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              For years, the anime community was forced to choose between cheap, mass-produced merchandise with flimsy prints or navigating clunky import proxy services to get authentic Japanese figures and high-carbon steel katanas.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We asked a simple question: <strong className="text-white">Why can’t anime fashion feel like high-end streetwear, and why can’t statue collecting feel like an elevated gallery experience?</strong> Panel & Drip was built to bridge that gap — combining 450 GSM organic heavy cotton apparel, museum-grade 1/7 scale resin statues, full-tang steel katanas, custom eyewear, and instant digital vouchers all under one roof.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#0A0A0B] border border-zinc-800 p-4 rounded-xl">
                <span className="block text-2xl font-black text-[#CCFF00] font-mono">100%</span>
                <span className="text-xs text-zinc-400 font-mono">Authentic Licensed & Custom Art</span>
              </div>
              <div className="bg-[#0A0A0B] border border-zinc-800 p-4 rounded-xl">
                <span className="block text-2xl font-black text-[#CCFF00] font-mono">0%</span>
                <span className="text-xs text-zinc-400 font-mono">Counterfeit or Low-Grade Materials</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#CCFF00]/10 rounded-full blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
                alt="Panel and Drip Studio Crafting"
                className="w-full h-64 object-cover rounded-xl border border-zinc-800"
              />
              <div className="space-y-2">
                <h3 className="text-white font-mono font-bold text-sm uppercase flex items-center justify-between">
                  <span>UNIFIED CULTURE ECOSYSTEM</span>
                  <Award className="w-4 h-4 text-[#CCFF00]" />
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Every product in our vault is subjected to rigorous quality control — from paint gradation on resin figures to the stitch density of oversized drop-shoulder tees.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission Statement & Core Pillars */}
        <div className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>CORE COMMITMENTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
              The Panel & Drip Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold font-mono text-base uppercase">1. Uncompromising Quality</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We refuse to cut corners. Our streetwear utilizes 450 GSM organic cotton, our katanas use 1045 high carbon and Damascus steel, and our statues feature crystal-clear resin and custom LED bases.
              </p>
            </div>

            <div className="bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold font-mono text-base uppercase">2. Collector-Safe Packaging</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We understand the heartbreak of damaged box corners. All statues, figures, and replica swords are shipped with multi-layered high-density laser foam and heavy-duty outer shipping boxes.
              </p>
            </div>

            <div className="bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl space-y-3 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold font-mono text-base uppercase">3. Instant Digital & Web3</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Buy digital gift cards for Steam, Google Play, Apple, PlayStation, Xbox, and Amazon with instant code delivery or pay seamlessly via Web3 crypto (USDT, SOL, BTC, ETH).
              </p>
            </div>
          </div>
        </div>

        {/* Future Roadmap Section */}
        <div className="bg-[#0E0E10] border border-zinc-800 rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
            <div className="space-y-2">
              <span className="text-[#CCFF00] font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Rocket className="w-4 h-4" /> FUTURE VISION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
                The 2026-2027 Expansion Roadmap
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full self-start md:self-auto">
              Phase 3 Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-2 border-l-2 border-[#CCFF00] pl-4">
              <span className="text-[#CCFF00] font-black uppercase">Q3 2026 — Category Expansion</span>
              <p className="text-zinc-300 font-bold">Katanas, Shoes & Digital Vouchers</p>
              <p className="text-zinc-400">Successfully launched full-tang carbon steel swords, streetwear sneakers, Gojo-style eyewear, and instant digital gaming codes.</p>
            </div>

            <div className="space-y-2 border-l-2 border-zinc-700 pl-4">
              <span className="text-zinc-400 font-black uppercase">Q4 2026 — Global Pop-up Vaults</span>
              <p className="text-zinc-300 font-bold">Tokyo, Los Angeles & London Drops</p>
              <p className="text-zinc-400">Physical pop-up exhibits featuring limited 1/1 resin prototypes, exclusive streetwear drops, and live katana forging showcases.</p>
            </div>

            <div className="space-y-2 border-l-2 border-zinc-700 pl-4">
              <span className="text-zinc-400 font-black uppercase">Q1 2027 — Custom Apparel Lab</span>
              <p className="text-zinc-300 font-bold">Personalized Patch & Embroidery Engine</p>
              <p className="text-zinc-400">Introducing interactive online customizer for bespoke jacket patches, Japanese calligraphic embroidery, and custom blade scabbards.</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-r from-[#0E0E10] via-[#141418] to-[#0E0E10] border border-zinc-800 rounded-3xl p-10 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white font-mono uppercase">
            READY TO UPGRADE YOUR COLLECTION & DRIP?
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
            Browse our latest drops across Resin Statues, Katanas, Streetwear, Shoes, Glasses, and Digital Gift Cards.
          </p>
          <button
            onClick={() => handleShopClick()}
            className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-10 py-4 rounded-xl text-xs uppercase font-mono tracking-widest shadow-2xl inline-flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span>BACK TO THE SHOP</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>
    </div>
  );
};
