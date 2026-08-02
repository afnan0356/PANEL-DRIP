import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, Check } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  if (!isSizeGuideOpen) return null;

  const [activeTab, setActiveTab] = useState<'apparel' | 'denim' | 'cosplay'>('apparel');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0E0E10] border border-zinc-800 rounded-3xl max-w-2xl w-full text-zinc-100 relative shadow-2xl p-6 sm:p-8 space-y-6 my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#CCFF00] font-bold uppercase tracking-widest">
            <Ruler className="w-4 h-4 text-[#CCFF00]" /> // PANEL &amp; DRIP SIZING MANUAL
          </div>
          <h2 className="text-2xl font-black italic uppercase font-sans text-white tracking-tight">
            Fit &amp; Size Measurement Guide
          </h2>
          <p className="text-xs text-zinc-400">
            All our apparel is engineered with a signature relaxed boxy drape and dropped shoulder cut.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-800 text-xs font-mono font-bold uppercase">
          <button
            onClick={() => setActiveTab('apparel')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'apparel'
                ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Oversized Tops &amp; Hoodies
          </button>
          <button
            onClick={() => setActiveTab('denim')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'denim'
                ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Wide-Leg Denim &amp; Cargo
          </button>
          <button
            onClick={() => setActiveTab('cosplay')}
            className={`pb-2 px-3 border-b-2 transition-colors ${
              activeTab === 'cosplay'
                ? 'border-[#CCFF00] text-[#CCFF00] font-bold'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Cross-Cosplay &amp; Wigs
          </button>
        </div>

        {/* Apparel Sizing Table */}
        {activeTab === 'apparel' && (
          <div className="overflow-x-auto text-xs font-mono bg-[#0A0A0B] p-3 rounded-2xl border border-zinc-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-[#CCFF00]">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Chest Width</th>
                  <th className="py-2.5 px-3">Body Length</th>
                  <th className="py-2.5 px-3">Shoulder Drop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">S (Small)</td>
                  <td className="py-2.5 px-3">56 cm / 22 in</td>
                  <td className="py-2.5 px-3">72 cm / 28.3 in</td>
                  <td className="py-2.5 px-3">54 cm / 21.2 in</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">M (Medium)</td>
                  <td className="py-2.5 px-3">60 cm / 23.6 in</td>
                  <td className="py-2.5 px-3">74 cm / 29.1 in</td>
                  <td className="py-2.5 px-3">58 cm / 22.8 in</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">L (Large)</td>
                  <td className="py-2.5 px-3">64 cm / 25.2 in</td>
                  <td className="py-2.5 px-3">76 cm / 29.9 in</td>
                  <td className="py-2.5 px-3">62 cm / 24.4 in</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">XL (X-Large)</td>
                  <td className="py-2.5 px-3">68 cm / 26.7 in</td>
                  <td className="py-2.5 px-3">78 cm / 30.7 in</td>
                  <td className="py-2.5 px-3">66 cm / 26 in</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">2XL (2X-Large)</td>
                  <td className="py-2.5 px-3">72 cm / 28.3 in</td>
                  <td className="py-2.5 px-3">80 cm / 31.5 in</td>
                  <td className="py-2.5 px-3">70 cm / 27.5 in</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Denim Sizing Table */}
        {activeTab === 'denim' && (
          <div className="overflow-x-auto text-xs font-mono bg-[#0A0A0B] p-3 rounded-2xl border border-zinc-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-[#CCFF00]">
                  <th className="py-2.5 px-3">Waist Tag</th>
                  <th className="py-2.5 px-3">Waist Circ.</th>
                  <th className="py-2.5 px-3">Outseam Length</th>
                  <th className="py-2.5 px-3">Leg Opening Flare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">28 (S)</td>
                  <td className="py-2.5 px-3">76 cm / 30 in</td>
                  <td className="py-2.5 px-3">106 cm / 41.7 in</td>
                  <td className="py-2.5 px-3">58 cm / 23 in</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">30 (M)</td>
                  <td className="py-2.5 px-3">81 cm / 32 in</td>
                  <td className="py-2.5 px-3">108 cm / 42.5 in</td>
                  <td className="py-2.5 px-3">60 cm / 23.6 in</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">32 (L)</td>
                  <td className="py-2.5 px-3">86 cm / 34 in</td>
                  <td className="py-2.5 px-3">110 cm / 43.3 in</td>
                  <td className="py-2.5 px-3">62 cm / 24.4 in</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">34 (XL)</td>
                  <td className="py-2.5 px-3">91 cm / 36 in</td>
                  <td className="py-2.5 px-3">112 cm / 44 in</td>
                  <td className="py-2.5 px-3">64 cm / 25.2 in</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Cosplay Sizing */}
        {activeTab === 'cosplay' && (
          <div className="space-y-3 text-xs font-mono text-zinc-300 bg-[#0A0A0B] p-4 rounded-2xl border border-zinc-800">
            <p className="font-black text-[#CCFF00]">
              GENDER-INCLUSIVE COSPLAY FIT INSTRUCTIONS:
            </p>
            <p className="text-zinc-400">
              Our cosplay costume sets use gender-neutral elastic waist cinches and adjustable side-lacing to comfortably fit diverse body profiles.
            </p>
            <ul className="space-y-1 text-[11px] list-disc list-inside text-zinc-300">
              <li>Wig Caps: Adjustable inner dual-hook mechanism fits 54cm - 60cm head size.</li>
              <li>Trousers: Hidden side elastic extends waist up to +4cm for con comfort.</li>
              <li>Unisex Tops: High-stretch breathable inner lining layer included.</li>
            </ul>
          </div>
        )}

        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="w-full bg-[#CCFF00] hover:bg-[#bce600] text-black font-black py-3 rounded-xl text-xs uppercase font-mono transition-colors shadow-md"
        >
          Got It, Close Guide
        </button>
      </div>
    </div>
  );
};
