import React from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import { RESIN_HIGHLIGHT_IMAGE } from '../data/products';
import { ArrowUpRight, Crown, Shirt, BookOpen, Scissors, Sparkles, Layers, Sword, Footprints, Glasses, Ticket } from 'lucide-react';

interface CategoryCardProps {
  id: Category;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  icon: React.ReactNode;
}

export const CategoriesBanner: React.FC = () => {
  const { setSelectedCategory, scrollToProductGrid, navigateToView } = useShop();

  const categories: CategoryCardProps[] = [
    {
      id: 'katanas',
      title: 'Steel & Foam Katanas',
      subtitle: 'Replica 1045 carbon steel & con-safe foam blades',
      badge: 'HIGH CARBON STEEL',
      image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80',
      icon: <Sword className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'shoes',
      title: 'Anime Kicks & Cyber Shoes',
      subtitle: '3M reflective sneakers & elevated platform boots',
      badge: 'STREET KICKS',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
      icon: <Footprints className="w-5 h-5 text-[#CCFF00]" />
    },
    {
      id: 'glasses',
      title: 'Gojo Glasses & Cyber Visors',
      subtitle: 'UV400 titanium shades & anti-blue light gaming frames',
      badge: 'POLARIZED SHADES',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      icon: <Glasses className="w-5 h-5 text-cyan-400" />
    },
    {
      id: 'gift-cards',
      title: 'Digital Gift Cards & Vouchers',
      subtitle: 'Google Play, Apple, Steam, PSN, Xbox, Amazon codes',
      badge: 'INSTANT E-MAIL CODE',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      icon: <Ticket className="w-5 h-5 text-amber-400" />
    },
    {
      id: 'resin-statues',
      title: '1/7 Resin Statues',
      subtitle: 'Museum grade polystone & LED bases',
      badge: 'LIMITED ALLOCATION',
      image: RESIN_HIGHLIGHT_IMAGE,
      icon: <Crown className="w-5 h-5 text-yellow-400" />
    },
    {
      id: 'streetwear',
      title: 'Oversized Streetwear',
      subtitle: '450 GSM heavy cotton tees & 500 GSM hoodies',
      badge: 'STREET FIT',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      icon: <Shirt className="w-5 h-5 text-red-400" />
    }
  ];

  const handleCardClick = (catId: Category) => {
    if (catId === 'gift-cards') {
      navigateToView('gift-cards');
      return;
    }
    navigateToView('shop');
    setSelectedCategory(catId);
    scrollToProductGrid();
  };

  return (
    <section className="bg-[#0A0A0B] py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest block font-bold">
              // CURATED SUB-CULTURE COLLECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black italic text-white uppercase font-sans tracking-tighter">
              CURATE YOUR <span className="text-[#CCFF00]">FIT &amp; SHELF</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-sans">
            From high-end 1/7 resin statues to 450 GSM oversized heavy cotton tees and pre-styled cosplay wigs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
              onClick={() => handleCardClick(cat.id)}
              className="group relative h-72 rounded-2xl overflow-hidden border border-zinc-800 bg-[#0E0E10] cursor-pointer shadow-xl transition-all duration-300 hover:border-[#CCFF00] hover:shadow-2xl"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-75 group-hover:brightness-90"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-[#0A0A0B]/90 border border-zinc-700 text-zinc-200 text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider backdrop-blur-md">
                  {cat.badge}
                </span>
              </div>

              {/* Top Right Icon Arrow */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#0A0A0B]/80 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover:bg-[#CCFF00] group-hover:text-black group-hover:border-[#CCFF00] transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Content Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-1">
                <div className="flex items-center gap-2">
                  {cat.icon}
                  <h3 className="text-lg font-black italic text-white uppercase font-sans tracking-tight">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 font-sans line-clamp-2">
                  {cat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
