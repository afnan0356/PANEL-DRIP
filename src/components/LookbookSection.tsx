import React from 'react';
import { Sparkles, Camera, Instagram } from 'lucide-react';
import { RESIN_HIGHLIGHT_IMAGE, HERO_IMAGE } from '../data/products';

export const LookbookSection: React.FC = () => {
  const lookbookItems = [
    {
      id: 1,
      image: HERO_IMAGE,
      tag: '#PANELNDRIP_FIT',
      title: 'Oversized 450 GSM Hoodie + Wide-Leg Stonewash Denim',
      user: '@ren_streetwear'
    },
    {
      id: 2,
      image: RESIN_HIGHLIGHT_IMAGE,
      tag: '#RESIN_STATUE_CORNER',
      title: '1/7 Scale Cyber-Valkyrie on Dual LED Acrylic Stage',
      user: '@otaku_collector_jp'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
      tag: '#TECHWEAR_NIGHT',
      title: '3M Reflective Cyber-Samurai Shell + Ita Utility Shoulder Bag',
      user: '@cyber_kaito'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      tag: '#COSPLAY_CON_FITS',
      title: 'Shadow-Exorcist Full Costume + Crimson Pre-Styled Wig',
      user: '@subculture_dresser'
    }
  ];

  return (
    <section className="bg-[#0A0A0B] py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest block font-bold flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#CCFF00]" /> // COMMUNITY LOOKBOOK &amp; SHELF SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black italic text-white uppercase font-sans tracking-tighter">
              TAG US <span className="text-[#CCFF00]">#PANELNDRIP</span>
            </h2>
          </div>
          <a
            href="#instagram"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 bg-[#0E0E10] border border-zinc-800 hover:border-[#CCFF00] hover:text-white px-4 py-2.5 rounded-xl transition-all"
          >
            <Instagram className="w-4 h-4 text-[#CCFF00]" />
            <span>Follow @panelndrip on IG</span>
          </a>
        </div>

        {/* Lookbook Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lookbookItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] bg-[#0E0E10] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-[#CCFF00] transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#0A0A0B]/90 text-[#CCFF00] border border-zinc-700 text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider backdrop-blur-md">
                  {item.tag}
                </span>
              </div>

              {/* Caption Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10 space-y-1">
                <span className="text-[10px] font-mono text-[#CCFF00] block font-bold">
                  {item.user}
                </span>
                <p className="text-xs text-white font-sans font-semibold line-clamp-2">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
