import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Gift,
  Award,
  Clock,
  Settings,
  Bell,
  Share2,
  Copy,
  CheckCircle2,
  Sparkles,
  Flame,
  Crown,
  ChevronRight,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  PackageCheck,
  Truck,
  Upload,
  Key,
  Mail,
  ShieldCheck,
  AlertCircle,
  AtSign,
  Calendar,
  Check,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SavedAddress } from '../types';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80'
];

export const UserDashboard: React.FC = () => {
  const {
    user,
    setUser,
    logoutUser,
    orders,
    openOrderTracking,
    wishlist,
    wishlistCollections,
    toggleWishlist,
    products,
    recentlyViewedIds,
    setSelectedProduct,
    addToCart,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsSpinWheelOpen,
    setIsDailyCheckInOpen,
    redeemLoyaltyPoints,
    showToast,
    formatPrice,
    navigateToView,
    dashboardTab,
    setDashboardTab,
    sendEmailVerificationLink,
    updateUserProfileData,
    updateEmailAddress,
    updateUserPass,
    checkUsernameAvailability,
    openAuthModal
  } = useShop();

  const [copiedReferral, setCopiedReferral] = useState(false);

  // Edit settings form state
  const [editName, setEditName] = useState(user?.name || '');
  const [editUsername, setEditUsername] = useState(user?.username?.replace(/^@/, '') || '');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');

  // Password Change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passMessage, setPassMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [verifMessage, setVerifMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Address form state
  const [newAddrLabel, setNewAddrLabel] = useState('');
  const [newAddrFullName, setNewAddrFullName] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrPostal, setNewAddrPostal] = useState('');
  const [isAddingAddr, setIsAddingAddr] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditUsername(user.username ? user.username.replace(/^@/, '') : '');
      setEditEmail(user.email || '');
      setEditAvatar(user.avatar || '');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-center mb-6 shadow-2xl text-amber-400">
          <User className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black uppercase font-mono tracking-tight">Collector Portal Access</h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-md leading-relaxed">
          Sign in to your account to view your profile details, order history, tracking updates, wishlist collections, and loyalty points.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => openAuthModal('login')}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black uppercase tracking-wider rounded-xl shadow-lg transition-all text-xs font-mono"
          >
            Sign In to Account
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-bold uppercase tracking-wider rounded-xl transition-all text-xs font-mono"
          >
            Create New Account
          </button>
        </div>
      </div>
    );
  }

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://paneldrip.com/join?ref=${user.referralCode}`);
    setCopiedReferral(true);
    showToast('Referral link copied to clipboard!');
    setTimeout(() => setCopiedReferral(false), 3000);
  };

  const handleUsernameChange = async (val: string) => {
    const cleaned = val.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setEditUsername(cleaned);
    if (!cleaned) {
      setUsernameStatus('idle');
      return;
    }
    if (cleaned.length < 3 || cleaned.length > 20) {
      setUsernameStatus('invalid');
      return;
    }
    setUsernameStatus('checking');
    const fullTag = `@${cleaned}`;
    const avail = await checkUsernameAvailability(fullTag);
    if (avail) {
      setUsernameStatus('available');
    } else {
      setUsernameStatus('taken');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditAvatar(reader.result);
          showToast('Image uploaded! Click "Save Profile Changes" to update.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUsername = editUsername ? `@${editUsername.replace(/^@/, '')}` : `@${editName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

    if (editUsername && (editUsername.length < 3 || editUsername.length > 20)) {
      showToast('Username must be between 3 and 20 characters.');
      return;
    }

    if (usernameStatus === 'taken') {
      showToast('Selected username is already taken by another collector.');
      return;
    }

    await updateUserProfileData({
      name: editName,
      username: formattedUsername,
      avatar: editAvatar
    });
  };

  const handleUpdateEmailForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMessage(null);
    if (editEmail === user.email) {
      setEmailMessage({ type: 'error', text: 'New email address is identical to current email.' });
      return;
    }
    const res = await updateEmailAddress(editEmail);
    if (res.success) {
      setEmailMessage({ type: 'success', text: res.message });
    } else {
      setEmailMessage({ type: 'error', text: res.message });
    }
  };

  const handleUpdatePasswordForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage(null);
    if (newPassword.length < 6) {
      setPassMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    const res = await updateUserPass(newPassword);
    if (res.success) {
      setPassMessage({ type: 'success', text: res.message });
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPassMessage({ type: 'error', text: res.message });
    }
  };

  const handleTriggerEmailVerification = async () => {
    setVerifMessage(null);
    const res = await sendEmailVerificationLink();
    if (res.success) {
      setVerifMessage({ type: 'success', text: res.message });
    } else {
      setVerifMessage({ type: 'error', text: res.message });
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel || 'Home',
      fullName: newAddrFullName || user.name,
      address: newAddrStreet,
      city: newAddrCity,
      postalCode: newAddrPostal,
      country: 'Japan',
      isDefault: user.savedAddresses.length === 0
    };
    setUser({
      ...user,
      savedAddresses: [...user.savedAddresses, newAddr]
    });
    setIsAddingAddr(false);
    showToast('Shipping address saved!');
  };

  const handleDeleteAddress = (id: string) => {
    setUser({
      ...user,
      savedAddresses: user.savedAddresses.filter((a) => a.id !== id)
    });
    showToast('Address removed');
  };

  // Tier Progress Calculation
  const nextTierRequirement =
    user.membershipTier === 'Free' ? 100 : user.membershipTier === 'Silver' ? 300 : user.membershipTier === 'Gold' ? 700 : 1000;
  const tierProgressPercent = Math.min(100, Math.round((user.totalSpentUSD / nextTierRequirement) * 100));

  const wishlistProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const recentlyViewedProducts = recentlyViewedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white">
      {/* Dashboard Top Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-neutral-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black font-mono tracking-tight text-white">{user.name}</h1>
                <span className="text-amber-400 font-mono text-xs font-semibold">{user.username || `@${user.name.toLowerCase().replace(/\s+/g, '')}`}</span>
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold uppercase font-mono flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-400" /> {user.membershipTier} Member
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
                <span>{user.email}</span>
                {user.emailVerified ? (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-bold">
                    Unverified
                  </span>
                )}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                  <Award className="w-4 h-4" /> {user.loyaltyPoints} Loyalty Points
                </span>
                <span className="flex items-center gap-1 text-orange-400 font-mono font-bold">
                  <Flame className="w-4 h-4 fill-orange-400" /> {user.dailyStreak} Day Streak
                </span>
                {user.createdAt && (
                  <span className="flex items-center gap-1 text-neutral-400 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" /> Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsDailyCheckInOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
            >
              <Flame className="w-4 h-4" /> Daily Check-In
            </button>
            <button
              onClick={() => setIsSpinWheelOpen(true)}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 border border-amber-500/30"
            >
              <Sparkles className="w-4 h-4 text-amber-400" /> Spin Wheel
            </button>
            <button
              onClick={logoutUser}
              className="px-3 py-2 bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 border border-neutral-800 rounded-xl transition-colors text-xs font-bold flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Membership Tier Progress Bar */}
        <div className="mt-6 pt-6 border-t border-neutral-800/80">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-neutral-400">
              VIP Tier Progress: <span className="text-white">${user.totalSpentUSD.toFixed(2)} spent</span>
            </span>
            <span className="text-amber-400">
              Next Tier ({user.membershipTier === 'Gold' ? 'Platinum' : 'Gold'}): ${(nextTierRequirement - user.totalSpentUSD > 0) ? (nextTierRequirement - user.totalSpentUSD).toFixed(2) : 0} away
            </span>
          </div>
          <div className="w-full bg-neutral-950 rounded-full h-2.5 overflow-hidden border border-neutral-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${tierProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation Tabs */}
        <div className="space-y-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-2 h-fit">
          <button
            onClick={() => setDashboardTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              dashboardTab === 'overview' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Overview & Profile
          </button>
          <button
            onClick={() => setDashboardTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              dashboardTab === 'orders' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4" /> Order History
            </span>
            <span className="px-2 py-0.5 bg-neutral-950/60 rounded-full text-[10px]">{orders.length}</span>
          </button>
          <button
            onClick={() => setDashboardTab('wishlist')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              dashboardTab === 'wishlist' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <Heart className="w-4 h-4" /> Wishlist Items
            </span>
            <span className="px-2 py-0.5 bg-neutral-950/60 rounded-full text-[10px]">{wishlist.length}</span>
          </button>
          <button
            onClick={() => setDashboardTab('loyalty')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              dashboardTab === 'loyalty' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <Gift className="w-4 h-4" /> Loyalty Rewards
          </button>
          <button
            onClick={() => setDashboardTab('referrals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              dashboardTab === 'referrals' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" /> Referral Program
          </button>
          <button
            onClick={() => setDashboardTab('addresses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              dashboardTab === 'addresses' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" /> Saved Addresses
          </button>
          <button
            onClick={() => setDashboardTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              dashboardTab === 'settings' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" /> Account Settings
          </button>
        </div>

        {/* Tab Main Content Display */}
        <div className="lg:col-span-3 space-y-6">
          {dashboardTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                  <div className="text-xs font-bold text-neutral-400 uppercase">Total Orders</div>
                  <div className="text-2xl font-black font-mono text-white mt-1">{orders.length} Orders</div>
                  <p className="text-[11px] text-neutral-500 mt-1">Lifetime purchases</p>
                </div>
                <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                  <div className="text-xs font-bold text-neutral-400 uppercase">Loyalty Balance</div>
                  <div className="text-2xl font-black font-mono text-amber-400 mt-1">{user.loyaltyPoints} Pts</div>
                  <p className="text-[11px] text-amber-500/80 mt-1">Redeemable for discount vouchers</p>
                </div>
                <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl">
                  <div className="text-xs font-bold text-neutral-400 uppercase">Referral Earnings</div>
                  <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
                    {user.referralEarningsPoints} Pts
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">{user.referralCount} Friends invited</p>
                </div>
              </div>

              {/* Email Verification Action Banner if unverified */}
              {!user.emailVerified && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-white">Email Address Not Verified</div>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        Verify your email address <span className="text-amber-300 font-mono">{user.email}</span> to secure your account and unlock VIP drop notifications.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleTriggerEmailVerification}
                    className="px-4 py-2 bg-amber-500 text-neutral-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-all shrink-0 uppercase font-mono"
                  >
                    Send Verification Email
                  </button>
                </div>
              )}

              {verifMessage && (
                <div className={`p-3 rounded-xl text-xs font-medium ${verifMessage.type === 'success' ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-red-950/60 border border-red-800 text-red-300'}`}>
                  {verifMessage.text}
                </div>
              )}

              {/* Account Information Card */}
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
                <h3 className="text-lg font-black uppercase font-mono text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-400" /> Account Profile Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-neutral-950 border border-neutral-800/80 rounded-xl">
                    <div className="text-neutral-500 font-bold uppercase text-[10px]">Display Name</div>
                    <div className="text-sm font-bold text-white mt-1">{user.name}</div>
                  </div>

                  <div className="p-3.5 bg-neutral-950 border border-neutral-800/80 rounded-xl">
                    <div className="text-neutral-500 font-bold uppercase text-[10px]">Unique Username</div>
                    <div className="text-sm font-bold text-amber-400 font-mono mt-1">{user.username || `@${user.name.toLowerCase().replace(/\s+/g, '')}`}</div>
                  </div>

                  <div className="p-3.5 bg-neutral-950 border border-neutral-800/80 rounded-xl">
                    <div className="text-neutral-500 font-bold uppercase text-[10px]">Email Address</div>
                    <div className="text-sm font-bold text-white mt-1 flex items-center justify-between">
                      <span className="truncate">{user.email}</span>
                      {user.emailVerified ? (
                        <span className="text-[10px] text-emerald-400 font-bold">Verified</span>
                      ) : (
                        <span className="text-[10px] text-amber-400 font-bold">Unverified</span>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-950 border border-neutral-800/80 rounded-xl">
                    <div className="text-neutral-500 font-bold uppercase text-[10px]">Collector ID</div>
                    <div className="text-sm font-bold text-neutral-300 font-mono mt-1">{user.id}</div>
                  </div>
                </div>
              </div>

              {/* Recently Viewed Products Horizontal Shelf */}
              {recentlyViewedProducts.length > 0 && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                  <h3 className="text-lg font-black uppercase font-mono mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" /> Recently Viewed Catalog
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {recentlyViewedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className="p-3 bg-neutral-950 border border-neutral-800 hover:border-amber-400 rounded-xl cursor-pointer transition-all group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-full h-28 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform"
                        />
                        <div className="text-xs font-bold text-white truncate">{p.title}</div>
                        <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                          {formatPrice(p.priceUSD)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {dashboardTab === 'orders' && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black uppercase font-mono mb-4">Order History & Live Tracking</h3>
              {orders.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto opacity-50 text-amber-400" />
                  <p className="text-sm font-semibold text-white">No orders placed yet.</p>
                  <button
                    onClick={() => navigateToView('shop')}
                    className="px-4 py-2 bg-amber-500 text-neutral-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors"
                  >
                    Explore Shop Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.orderId} className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                        <div>
                          <div className="text-sm font-black font-mono text-amber-400">Order #{o.orderId}</div>
                          <div className="text-xs text-neutral-400">{o.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-xs font-bold">
                            {o.status || 'Shipped'}
                          </span>
                          <button
                            onClick={() => openOrderTracking(o.orderId)}
                            className="px-3 py-1.5 bg-amber-500 text-neutral-950 hover:bg-amber-400 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                          >
                            <Truck className="w-3.5 h-3.5" /> Track Package
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs">
                            <img
                              src={it.product.images[0]}
                              alt={it.product.title}
                              className="w-10 h-10 object-cover rounded-lg border border-neutral-800"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-white truncate">{it.product.title}</div>
                              <div className="text-neutral-400">
                                Qty: {it.quantity} | Size: {it.selectedSize || 'Standard'}
                              </div>
                            </div>
                            <div className="font-mono font-bold text-white">{formatPrice(it.product.priceUSD * it.quantity)}</div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-neutral-800 flex justify-between text-xs font-bold text-neutral-300">
                        <span>Total Order Paid:</span>
                        <span className="font-mono text-amber-400">{formatPrice(o.totalUSD)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {dashboardTab === 'wishlist' && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black uppercase font-mono mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-400 fill-amber-400" /> Saved Wishlist Items
              </h3>

              {wishlistProducts.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 space-y-3">
                  <Heart className="w-12 h-12 mx-auto opacity-50 text-neutral-600" />
                  <p className="text-sm font-semibold text-white">Your wishlist is currently empty.</p>
                  <p className="text-xs text-neutral-400">Click the heart icon on any product to save it here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex gap-3 items-center">
                      <img src={p.images[0]} alt={p.title} className="w-16 h-16 object-cover rounded-xl border border-neutral-800 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{p.title}</div>
                        <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">{formatPrice(p.priceUSD)}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => addToCart(p)}
                            className="px-2.5 py-1 bg-amber-500 text-neutral-950 font-bold text-[11px] rounded-lg hover:bg-amber-400 transition-colors"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {dashboardTab === 'referrals' && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-black uppercase font-mono">Your Exclusive Referral Link</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Share your referral code with friends. They get <span className="text-amber-400 font-bold">$10 off</span> their first order, and you earn <span className="text-emerald-400 font-bold">200 Loyalty Points ($10 value)</span>!
                </p>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold text-neutral-500 uppercase">Your Referral Code</div>
                  <div className="text-xl font-black font-mono text-amber-400 tracking-wider">{user.referralCode}</div>
                </div>

                <button
                  onClick={handleCopyReferral}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  {copiedReferral ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedReferral ? 'Copied Link!' : 'Copy Invite Link'}
                </button>
              </div>
            </div>
          )}

          {dashboardTab === 'addresses' && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black uppercase font-mono">Saved Shipping Addresses</h3>
                <button
                  onClick={() => setIsAddingAddr(!isAddingAddr)}
                  className="px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Address
                </button>
              </div>

              {isAddingAddr && (
                <form onSubmit={handleAddAddress} className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Address Label (e.g. Home, Office)"
                    value={newAddrLabel}
                    onChange={(e) => setNewAddrLabel(e.target.value)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Full Recipient Name"
                    value={newAddrFullName}
                    onChange={(e) => setNewAddrFullName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={newAddrStreet}
                    onChange={(e) => setNewAddrStreet(e.target.value)}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Postal Code"
                      value={newAddrPostal}
                      onChange={(e) => setNewAddrPostal(e.target.value)}
                      className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <button type="submit" className="w-full py-2 bg-amber-500 text-neutral-950 font-bold rounded-xl text-xs">
                    Save Address
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.savedAddresses.map((a) => (
                  <div key={a.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase text-amber-400 font-mono">{a.label}</span>
                      <button onClick={() => handleDeleteAddress(a.id)} className="text-neutral-500 hover:text-red-400 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs font-bold text-white">{a.fullName}</div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {a.address}, {a.city}, {a.postalCode}, {a.country}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {dashboardTab === 'loyalty' && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-black uppercase font-mono">Redeem Loyalty Points</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Exchange your hard-earned points for exclusive discount coupons or free gifts!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">$10 OFF Coupon</div>
                    <div className="text-xs text-neutral-400">Cost: 500 Loyalty Points</div>
                  </div>
                  <button
                    onClick={() => redeemLoyaltyPoints(500, '$10 Store Credit Voucher', 'REWARD10')}
                    disabled={user.loyaltyPoints < 500}
                    className="px-3 py-1.5 bg-amber-500 disabled:opacity-40 text-neutral-950 font-bold text-xs rounded-xl"
                  >
                    Redeem
                  </button>
                </div>

                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">$25 OFF Coupon</div>
                    <div className="text-xs text-neutral-400">Cost: 1000 Loyalty Points</div>
                  </div>
                  <button
                    onClick={() => redeemLoyaltyPoints(1000, '$25 Collector Reward Voucher', 'REWARD25')}
                    disabled={user.loyaltyPoints < 1000}
                    className="px-3 py-1.5 bg-amber-500 disabled:opacity-40 text-neutral-950 font-bold text-xs rounded-xl"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          )}

          {dashboardTab === 'settings' && (
            <div className="space-y-6">
              {/* Profile Details Form */}
              <form onSubmit={handleSaveSettings} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
                <h3 className="text-lg font-black uppercase font-mono mb-2 text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-400" /> Edit Profile Details
                </h3>

                {/* Profile Picture Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Profile Picture / Avatar
                  </label>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <img src={editAvatar} alt="Current Avatar" className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md" />

                    <div className="flex-1 space-y-2">
                      <div className="text-xs text-neutral-400">Select preset avatar or upload custom image:</div>
                      <div className="flex flex-wrap items-center gap-2">
                        {PRESET_AVATARS.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={`Preset ${i}`}
                            onClick={() => setEditAvatar(url)}
                            className={`w-9 h-9 rounded-xl object-cover cursor-pointer border-2 transition-all ${editAvatar === url ? 'border-amber-400 scale-105' : 'border-transparent hover:border-neutral-700'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={editAvatar}
                        onChange={(e) => setEditAvatar(e.target.value)}
                        placeholder="Avatar Image URL (https://...)"
                        className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs text-neutral-300 font-semibold cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-amber-400" /> Upload Local Image File
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Full Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                        Unique Username
                      </label>
                      {usernameStatus === 'checking' && <span className="text-[10px] text-amber-400 font-mono">Checking availability...</span>}
                      {usernameStatus === 'available' && <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5"><Check className="w-3 h-3" /> Available</span>}
                      {usernameStatus === 'taken' && <span className="text-[10px] text-red-400 font-bold flex items-center gap-0.5"><X className="w-3 h-3" /> Taken</span>}
                    </div>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        placeholder="joker_ren"
                        className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-amber-400 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all font-mono">
                  Save Profile Changes
                </button>
              </form>

              {/* Email Address Update Form */}
              <form onSubmit={handleUpdateEmailForm} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-black uppercase font-mono text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-400" /> Update Email Address
                </h3>

                {emailMessage && (
                  <div className={`p-3 rounded-xl text-xs font-medium ${emailMessage.type === 'success' ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-red-950/60 border border-red-800 text-red-300'}`}>
                    {emailMessage.text}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    New Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button type="submit" className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider border border-neutral-700 rounded-xl transition-all font-mono">
                  Update Email Address
                </button>
              </form>

              {/* Password Change Form */}
              <form onSubmit={handleUpdatePasswordForm} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-black uppercase font-mono text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-400" /> Change Account Password
                </h3>

                {passMessage && (
                  <div className={`p-3 rounded-xl text-xs font-medium ${passMessage.type === 'success' ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-red-950/60 border border-red-800 text-red-300'}`}>
                    {passMessage.text}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <button type="submit" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all font-mono">
                  Change Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
