import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Ruler,
  PackageCheck,
  Ticket,
  Truck
} from 'lucide-react';
import { Category, Currency } from '../types';

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSizeGuideOpen,
    setIsCouponModalOpen,
    openOrderTracking,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    orders,
    scrollToProductGrid
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categoriesList: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'resin-statues', label: 'Figures & Statues' },
    { id: 'action-figures', label: 'Action Figures' },
    { id: 'streetwear', label: 'Streetwear Fits' },
    { id: 'bottoms', label: 'Denim & Pants' },
    { id: 'cosplay', label: 'Cosplay & Wigs' },
    { id: 'manga-books', label: 'Manga & Books' },
    { id: 'accessories-decor', label: 'Accessories' }
  ];

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY'];

  const handleCategorySelect = (catId: Category) => {
    setSelectedCategory(catId);
    setMobileMenuOpen(false);
    scrollToProductGrid();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0E0E10]/95 backdrop-blur-md border-b border-zinc-800 text-white">
      {/* Top Announcement Marquee Bar */}
      <div className="bg-[#CCFF00] text-black px-4 py-1.5 text-xs text-center font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 overflow-hidden shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
        <span>AUTHENTIC OFFICIAL MERCHANDISE ONLY // LIMITED DROP: CYBER-VALKYRIE 1/7 RESIN</span>
        <span className="hidden md:inline font-mono">| USE CODE <strong className="underline">DRIP10</strong> FOR 10% OFF</span>
        <Sparkles className="w-3.5 h-3.5 text-black animate-pulse hidden sm:inline" />
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedCategory('all')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#CCFF00] text-black font-black text-xl italic rounded flex items-center justify-center tracking-tighter shadow-md">
              P&amp;D
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white uppercase font-sans">
                PANEL <span className="text-[#CCFF00]">&amp;</span> DRIP
              </span>
              <span className="block text-[9px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
                Streetwear &amp; Collectibles Archive
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Archive (e.g. Resin, Denim, Figures)..."
              className="w-full bg-[#0A0A0B] border border-zinc-800 text-sm rounded-full py-2 pl-10 pr-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00] transition-all"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Buttons: Size Guide, Currency, Orders, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Coupons Button */}
            <button
              onClick={() => setIsCouponModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-800 transition-colors font-mono"
              title="Promo Coupons & Rewards"
            >
              <Ticket className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Coupons</span>
            </button>

            {/* Order Tracking Button */}
            <button
              onClick={() => openOrderTracking()}
              className="hidden md:flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-800 transition-colors font-mono"
              title="Track Any Order Status"
            >
              <Truck className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Track Order</span>
            </button>

            {/* Size Guide Button */}
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-800 transition-colors font-mono"
              title="Size & Fitting Guide"
            >
              <Ruler className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Sizing</span>
            </button>

            {/* Currency Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-xs font-mono font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 px-2.5 py-1.5 rounded-full border border-zinc-800 transition-colors">
                <span>{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>
              <div className="absolute right-0 mt-1 w-24 bg-[#0E0E10] border border-zinc-800 rounded-lg shadow-xl py-1 hidden group-hover:block z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono transition-colors ${
                      currency === curr ? 'text-[#CCFF00] font-bold bg-zinc-800' : 'text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders History Toggle */}
            {orders.length > 0 && (
              <button
                onClick={() => setShowOrderHistory(!showOrderHistory)}
                className="relative p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
                title="My Orders"
              >
                <PackageCheck className="w-5 h-5 text-[#CCFF00]" />
                <span className="absolute -top-1 -right-1 bg-[#CCFF00] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {orders.length}
                </span>
              </button>
            )}

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CCFF00] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#CCFF00] hover:bg-[#bce600] text-black px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-mono text-xs font-black">{totalCartItems}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Archive..."
              className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00]"
            />
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Categories Bar (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 py-2 overflow-x-auto border-t border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-400 scrollbar-none">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3.5 py-1.5 rounded transition-all ${
                  isActive
                    ? 'text-white border-b-2 border-[#CCFF00] pb-1'
                    : 'hover:text-white transition-colors'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0E0E10] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-4">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] px-2">
            Browse Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-left px-3 py-2 rounded text-xs font-bold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#CCFF00] text-black font-black'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                setIsSizeGuideOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900 px-3 py-2 rounded-lg"
            >
              <Ruler className="w-4 h-4 text-[#CCFF00]" />
              <span>Sizing &amp; Fitting Guide</span>
            </button>
          </div>
        </div>
      )}

      {/* Orders Modal */}
      {showOrderHistory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 text-zinc-100 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowOrderHistory(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-black font-sans uppercase tracking-wider mb-1 flex items-center gap-2">
              <PackageCheck className="w-6 h-6 text-[#CCFF00]" /> My Squad Orders ({orders.length})
            </h2>
            <p className="text-xs text-zinc-400 mb-6">Recent purchases and tracking status.</p>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.orderId} className="bg-[#0A0A0B] border border-zinc-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                    <div>
                      <span className="font-mono text-xs text-[#CCFF00] font-bold">{ord.orderId}</span>
                      <span className="block text-[11px] text-zinc-500">{ord.date}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-[#CCFF00] text-black text-[10px] font-mono font-black rounded-full">
                      Confirmed &amp; Dispatching
                    </span>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs">
                        <img
                          src={it.product.images[0]}
                          alt={it.product.title}
                          className="w-10 h-10 object-cover rounded bg-zinc-900"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-zinc-200 line-clamp-1">{it.product.title}</p>
                          <p className="text-[11px] text-zinc-400 font-mono">
                            Qty: {it.quantity} {it.selectedSize ? `| Option: ${it.selectedSize}` : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-zinc-900">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400">Total Paid:</span>
                      <span className="text-[#CCFF00] font-bold text-sm">${ord.totalUSD.toFixed(2)} USD</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowOrderHistory(false);
                        openOrderTracking(ord.orderId);
                      }}
                      className="bg-[#CCFF00] hover:bg-[#bce600] text-black px-3 py-1.5 rounded-lg text-[11px] font-black uppercase font-mono tracking-wider transition-colors flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Package</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
