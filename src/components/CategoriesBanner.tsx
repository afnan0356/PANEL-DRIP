import React from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import { RESIN_HIGHLIGHT_IMAGE } from '../data/products';
import { ArrowUpRight, Crown, Shirt, BookOpen, Scissors, Sparkles, Layers } from 'lucide-react';

interface CategoryCardProps {
  id: Category;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  icon: React.ReactNode;
}

export const CategoriesBanner: React.FC = () => {
  const { setSelectedCategory, scrollToProductGrid } = useShop();

  const categories: CategoryCardProps[] = [
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
    },
    {
      id: 'bottoms',
      title: 'Wide-Leg Denim & Cargo',
      subtitle: 'Japanese vintage wash & techwear trousers',
      badge: 'BAGGY DENIM',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      icon: <Layers className="w-5 h-5 text-cyan-400" />
    },
    {
      id: 'action-figures',
      title: 'S.H.Figuarts & Nendoroids',
      subtitle: 'Articulated poseables & chibi figures',
      badge: 'OFFICIAL LICENSE',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />
    },
    {
      id: 'cosplay',
      title: 'Cross-Cosplay & Wigs',
      subtitle: 'Gender-inclusive costume sets & pre-styled wigs',
      badge: 'CONVENTION READY',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      icon: <Scissors className="w-5 h-5 text-pink-400" />
    },
    {
      id: 'manga-books',
      title: 'Manga Box Sets & Artbooks',
      subtitle: 'Complete volume chests & concept illustration books',
      badge: 'HARDCOVER',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />
    }
  ];

  const handleCardClick = (catId: Category) => {
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
