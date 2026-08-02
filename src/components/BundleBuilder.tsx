import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { Sparkles, ShoppingBag, Plus, Check } from 'lucide-react';

export const BundleBuilder: React.FC = () => {
  const { products, addToCart, formatPrice, showToast } = useShop();

  const figuresList = products.filter(
    (p) => p.category === 'resin-statues' || p.category === 'action-figures'
  );
  const apparelList = products.filter(
    (p) => p.category === 'streetwear' || p.category === 'bottoms' || p.category === 'cosplay'
  );
  const accessoriesList = products.filter(
    (p) => p.category === 'accessories-decor' || p.category === 'manga-books'
  );

  const [selectedFigure, setSelectedFigure] = useState<Product | null>(figuresList[0] || null);
  const [selectedApparel, setSelectedApparel] = useState<Product | null>(apparelList[0] || null);
  const [selectedAccessory, setSelectedAccessory] = useState<Product | null>(
    accessoriesList[0] || null
  );

  const rawSubtotalUSD =
    (selectedFigure?.priceUSD || 0) +
    (selectedApparel?.priceUSD || 0) +
    (selectedAccessory?.priceUSD || 0);

  const BUNDLE_DISCOUNT_PERCENT = 15;
  const discountAmountUSD = (rawSubtotalUSD * BUNDLE_DISCOUNT_PERCENT) / 100;
  const bundleTotalUSD = rawSubtotalUSD - discountAmountUSD;

  const handleAddBundleToCart = () => {
    if (selectedFigure) addToCart(selectedFigure);
    if (selectedApparel) addToCart(selectedApparel);
    if (selectedAccessory) addToCart(selectedAccessory);
    showToast('🎉 15% Bundle Discount applied! All 3 items added to cart.');
  };

  return (
    <section className="bg-[#0A0A0B] py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-7xl mx-auto space-y-8"
      >
        
        {/* Title Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#0E0E10] border border-zinc-800 text-[#CCFF00] px-3.5 py-1 rounded-full text-xs font-mono font-black tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>INTERACTIVE BUNDLE BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black italic text-white uppercase font-sans tracking-tighter">
            CURATE YOUR <span className="text-[#CCFF00]">FIT &amp; SHELF</span> COMBO
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans">
            Combine 1 Figure + 1 Streetwear Fit + 1 Accessory to instantly unlock an automatic <strong className="text-[#CCFF00] font-mono">15% OFF BUNDLE DISCOUNT</strong>!
          </p>
        </div>

        {/* 3 Step Selectors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* STEP 1: FIGURE SELECTOR */}
          <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono font-black text-[#CCFF00] uppercase tracking-wider">
                1. Pick a Figure / Statue
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Step 1 of 3</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {figuresList.map((fig) => {
                const isSelected = selectedFigure?.id === fig.id;
                return (
                  <div
                    key={fig.id}
                    onClick={() => setSelectedFigure(fig)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-zinc-900 border-[#CCFF00] text-white'
                        : 'bg-[#0A0A0B] border-zinc-800 text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <img
                      src={fig.images[0]}
                      alt={fig.title}
                      className="w-12 h-12 object-cover rounded-lg shrink-0 bg-[#0A0A0B]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate">{fig.title}</h4>
                      <span className="text-xs font-mono font-bold text-[#CCFF00]">
                        {formatPrice(fig.priceUSD)}
                      </span>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#CCFF00] shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: APPAREL SELECTOR */}
          <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono font-black text-[#CCFF00] uppercase tracking-wider">
                2. Pick Streetwear Apparel
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Step 2 of 3</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {apparelList.map((app) => {
                const isSelected = selectedApparel?.id === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApparel(app)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-zinc-900 border-[#CCFF00] text-white'
                        : 'bg-[#0A0A0B] border-zinc-800 text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <img
                      src={app.images[0]}
                      alt={app.title}
                      className="w-12 h-12 object-cover rounded-lg shrink-0 bg-[#0A0A0B]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate">{app.title}</h4>
                      <span className="text-xs font-mono font-bold text-[#CCFF00]">
                        {formatPrice(app.priceUSD)}
                      </span>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#CCFF00] shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: ACCESSORY SELECTOR */}
          <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono font-black text-[#CCFF00] uppercase tracking-wider">
                3. Pick Accessory / Decor
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Step 3 of 3</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {accessoriesList.map((acc) => {
                const isSelected = selectedAccessory?.id === acc.id;
                return (
                  <div
                    key={acc.id}
                    onClick={() => setSelectedAccessory(acc)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-zinc-900 border-[#CCFF00] text-white'
                        : 'bg-[#0A0A0B] border-zinc-800 text-zinc-300 hover:bg-zinc-900'
                    }`}
                  >
                    <img
                      src={acc.images[0]}
                      alt={acc.title}
                      className="w-12 h-12 object-cover rounded-lg shrink-0 bg-[#0A0A0B]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate">{acc.title}</h4>
                      <span className="text-xs font-mono font-bold text-[#CCFF00]">
                        {formatPrice(acc.priceUSD)}
                      </span>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#CCFF00] shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bundle Summary Bar */}
        <div className="bg-[#0E0E10] border border-[#CCFF00]/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-widest">
                AUTOMATIC 15% BUNDLE SAVINGS
              </span>
            </div>
            <div className="flex items-baseline gap-3 justify-center md:justify-start">
              <span className="text-3xl font-black font-mono text-[#CCFF00]">
                {formatPrice(bundleTotalUSD)}
              </span>
              <span className="text-sm font-mono text-zinc-500 line-through">
                {formatPrice(rawSubtotalUSD)}
              </span>
              <span className="text-xs font-mono font-black text-black bg-[#CCFF00] px-2.5 py-0.5 rounded">
                Save {formatPrice(discountAmountUSD)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddBundleToCart}
            className="w-full md:w-auto bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5 text-black" />
            <span>Add Complete 3-Piece Drip Bundle</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
