import React, { useState, useRef, useEffect } from 'react';
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
  Truck,
  Info,
  ShieldCheck,
  FileText,
  Lock,
  Sword,
  Footprints,
  Glasses,
  User,
  Bell,
  Flame,
  Gift,
  Crown,
  Box,
  LogOut,
  Settings,
  Award
} from 'lucide-react';
import { Category, Currency, AppView } from '../types';
import { SmartSearchModal } from './SmartSearchModal';

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
    scrollToProductGrid,
    currentView,
    navigateToView,
    dashboardTab,
    setDashboardTab,
    user,
    openAuthModal,
    loginWithGoogle,
    logoutUser,
    notifications,
    unreadNotificationCount,
    markAllNotificationsAsRead,
    setIsSpinWheelOpen,
    setIsDailyCheckInOpen
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSmartSearchOpen, setIsSmartSearchOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categoriesList: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'mystery-box', label: '🎁 Mystery Boxes' },
    { id: 'katanas', label: '⚔️ Katanas' },
    { id: 'shoes', label: '👟 Shoes' },
    { id: 'glasses', label: '🕶️ Glasses' },
    { id: 'gift-cards', label: '🎟️ Gift Cards' },
    { id: 'resin-statues', label: '1/7 Resin' },
    { id: 'action-figures', label: 'Figures' },
    { id: 'streetwear', label: 'Streetwear' },
    { id: 'cosplay', label: 'Cosplay' }
  ];

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY'];

  const handleCategorySelect = (catId: Category) => {
    if (catId === 'gift-cards') {
      navigateToView('gift-cards');
      setMobileMenuOpen(false);
      return;
    }
    navigateToView('shop');
    setSelectedCategory(catId);
    setMobileMenuOpen(false);
    scrollToProductGrid();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0E0E10]/95 backdrop-blur-md border-b border-zinc-800 text-white">
      {/* Top Announcement Marquee Bar */}
      <div className="bg-[#CCFF00] text-black px-4 py-1.5 text-xs text-center font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 overflow-hidden shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
        <span>AUTHENTIC OFFICIAL MERCHANDISE ONLY // MYSTERY BOXES & 1/7 RESIN DROPS LIVE</span>
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateToView('shop')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#CCFF00] to-amber-500 flex items-center justify-center text-black font-black text-xl tracking-tighter group-hover:scale-105 transition-transform shadow-lg shadow-[#CCFF00]/20">
                P&D
              </div>
              <div className="hidden sm:block">
                <span className="text-lg sm:text-xl font-black font-mono tracking-tight text-white block leading-none">
                  PANEL & DRIP
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block mt-0.5">
                  Otaku Vault & Streetwear
                </span>
              </div>
            </button>
          </div>

          {/* Search Trigger Input Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={() => setIsSmartSearchOpen(true)}
              className="w-full py-2 px-4 bg-zinc-900 border border-zinc-800 hover:border-amber-400/50 rounded-xl text-xs text-zinc-400 flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" /> Search Anime, Katana, Resin, Mystery Box...
              </span>
              <kbd className="px-2 py-0.5 bg-zinc-800 rounded text-[10px] text-zinc-400 font-mono">⌘K</kbd>
            </button>
          </div>

          {/* Right Utilities & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Rewards Buttons */}
            <button
              onClick={() => setIsDailyCheckInOpen(true)}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-bold transition-all"
            >
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" /> Daily Bonus
            </button>

            <button
              onClick={() => setIsSpinWheelOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-amber-300 text-xs font-bold transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" /> Spin Wheel
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 text-xs z-50">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800">
                    <span className="font-bold text-white uppercase font-mono">Notification Center</span>
                    <button onClick={markAllNotificationsAsRead} className="text-[10px] text-amber-400 hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border ${
                          n.read ? 'bg-neutral-950 border-neutral-800 text-neutral-400' : 'bg-neutral-800 border-amber-500/40 text-white'
                        }`}
                      >
                        <div className="font-bold">{n.title}</div>
                        <div className="text-[11px] mt-0.5 leading-snug">{n.message}</div>
                        <div className="text-[9px] text-neutral-500 mt-1">{n.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Profile Dropdown Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                  user
                    ? currentView === 'dashboard'
                      ? 'bg-amber-500 text-neutral-950 border-amber-400'
                      : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 border-amber-400 font-bold text-xs uppercase tracking-wider'
                }`}
              >
                {user ? (
                  <>
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-lg object-cover" />
                    <span className="hidden md:inline text-xs font-bold font-mono truncate max-w-[100px]">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span className="text-xs font-bold">Account</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-950" />
                  </>
                )}
              </button>

              {/* Profile Dropdown Popup */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 text-white animate-in fade-in slide-in-from-top-2 duration-150">
                  {user ? (
                    <div className="space-y-1">
                      {/* User Info Header */}
                      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 mb-1">
                        <div className="flex items-center gap-2.5">
                          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover border border-amber-500/40" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold font-mono text-white truncate">{user.name}</div>
                            <div className="text-[11px] text-amber-400 font-mono font-medium truncate">{user.username || `@${user.name.toLowerCase().replace(/\s+/g, '')}`}</div>
                          </div>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px]">
                          <span className="text-neutral-400">Loyalty Balance:</span>
                          <span className="font-bold font-mono text-amber-400 flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-400" /> {user.loyaltyPoints} Pts
                          </span>
                        </div>
                      </div>

                      {/* Dropdown Navigation Links */}
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateToView('dashboard');
                          setDashboardTab('overview');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4 text-amber-400" /> My Profile
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateToView('dashboard');
                          setDashboardTab('orders');
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <ShoppingBag className="w-4 h-4 text-amber-400" /> My Orders
                        </span>
                        <span className="px-1.5 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-[10px] font-mono">{orders.length}</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setIsWishlistOpen(true);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <Heart className="w-4 h-4 text-amber-400" /> Wishlist
                        </span>
                        <span className="px-1.5 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-[10px] font-mono">{wishlist.length}</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateToView('dashboard');
                          setDashboardTab('loyalty');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      >
                        <Award className="w-4 h-4 text-amber-400" /> Loyalty Points
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigateToView('dashboard');
                          setDashboardTab('settings');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                      >
                        <Settings className="w-4 h-4 text-amber-400" /> Account Settings
                      </button>

                      <div className="pt-1 mt-1 border-t border-neutral-800">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            logoutUser();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 mb-1">
                        <div className="text-xs font-bold text-white uppercase font-mono">Collector Portal</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">Sign in to sync orders, points & wishlist</div>
                      </div>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          openAuthModal('login');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-amber-400 hover:bg-neutral-800 rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4" /> Sign In
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          openAuthModal('register');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-white hover:bg-neutral-800 rounded-lg transition-colors"
                      >
                        <Crown className="w-4 h-4 text-amber-400" /> Create Account
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          loginWithGoogle();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        Continue with Google
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-neutral-950 rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-mono">{totalCartItems}</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 py-2 border-t border-zinc-800/80 text-xs font-bold uppercase font-mono overflow-x-auto scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id && currentView === 'shop'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Hamburger Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0B] border-b border-zinc-800 p-4 space-y-5 animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search Input */}
          <button
            onClick={() => {
              setIsSmartSearchOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 px-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-400 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" /> Search 100+ Anime Products...
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono">SEARCH</span>
          </button>

          {/* Core App Navigation Views */}
          <div className="space-y-1 font-mono text-xs font-bold uppercase">
            <div className="text-[10px] text-zinc-500 tracking-wider mb-1.5">NAVIGATION PAGES</div>
            <button
              onClick={() => {
                navigateToView('shop');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 ${
                currentView === 'shop' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" /> Home / Shop Catalog
            </button>
            <button
              onClick={() => {
                navigateToView('about');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 ${
                currentView === 'about' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <Info className="w-4 h-4 text-amber-400" /> About Us & Story
            </button>
            <button
              onClick={() => {
                navigateToView('contact');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 ${
                currentView === 'contact' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Contact Us & Support
            </button>
            <button
              onClick={() => {
                navigateToView('gift-cards');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 ${
                currentView === 'gift-cards' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <Ticket className="w-4 h-4 text-amber-400" /> Gift Cards & Digital Vouchers
            </button>
            <button
              onClick={() => {
                if (user) {
                  navigateToView('dashboard');
                } else {
                  openAuthModal('login');
                }
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 ${
                currentView === 'dashboard' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <User className="w-4 h-4 text-amber-400" /> {user ? `Account (${user.name})` : 'Sign In / Register'}
            </button>
            <button
              onClick={() => {
                openOrderTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-amber-400 hover:bg-zinc-900 rounded-xl flex items-center gap-2.5"
            >
              <Truck className="w-4 h-4" /> Track Order Status
            </button>
          </div>

          {/* Categories Grid */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase">CATEGORIES</div>
            <div className="grid grid-cols-2 gap-1.5">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3 py-2 rounded-xl text-left font-bold transition-colors text-[11px] truncate ${
                    selectedCategory === cat.id && currentView === 'shop'
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-zinc-900 text-zinc-300 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Currency Selector */}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 font-bold uppercase">Currency:</span>
            <div className="flex items-center gap-1">
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                    currency === curr ? 'bg-amber-500 text-neutral-950' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Smart Search Modal */}
      <SmartSearchModal isOpen={isSmartSearchOpen} onClose={() => setIsSmartSearchOpen(false)} />
    </header>
  );
};
