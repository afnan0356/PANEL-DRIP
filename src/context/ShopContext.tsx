import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Category,
  Currency,
  ProductReview,
  OrderDetails,
  AppView,
  UserAccount,
  WishlistCollection,
  NotificationItem,
  FreeGiftItem
} from '../types';
import { DEMO_PRODUCTS, PROMO_CODES, FREE_GIFTS_CATALOG } from '../data/products';
import {
  auth,
  signInWithGoogle,
  saveUserToFirestore,
  saveOrderToFirestore,
  fetchUserOrdersFromFirestore,
  saveWishlistToFirestore,
  saveReviewToFirestore,
  testConnection,
  syncUserProfile,
  sendPasswordReset,
  triggerEmailVerification,
  updateUserEmail,
  updateUserPassword,
  checkUsernameAvailable
} from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

interface ShopContextType {
  products: Product[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
  
  // App Navigation View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  navigateToView: (view: AppView) => void;
  dashboardTab: 'overview' | 'orders' | 'wishlist' | 'loyalty' | 'referrals' | 'addresses' | 'notifications' | 'settings';
  setDashboardTab: (tab: 'overview' | 'orders' | 'wishlist' | 'loyalty' | 'referrals' | 'addresses' | 'notifications' | 'settings') => void;
  
  // User Authentication & Profile
  user: UserAccount | null;
  setUser: React.Dispatch<React.SetStateAction<UserAccount | null>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register' | 'forgot';
  setAuthModalTab: (tab: 'login' | 'register' | 'forgot') => void;
  openAuthModal: (tab?: 'login' | 'register' | 'forgot') => void;
  loginUser: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  signupUser: (name: string, email: string, pass: string, username?: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<boolean>;
  logoutUser: () => Promise<void>;
  sendPasswordResetLink: (email: string) => Promise<{ success: boolean; message: string }>;
  sendEmailVerificationLink: () => Promise<{ success: boolean; message: string }>;
  updateUserProfileData: (data: Partial<UserAccount>) => Promise<boolean>;
  updateEmailAddress: (newEmail: string) => Promise<{ success: boolean; message: string }>;
  updateUserPass: (newPassword: string) => Promise<{ success: boolean; message: string }>;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
  
  // Loyalty & Rewards
  claimDailyCheckIn: () => { success: boolean; message: string; rewardPoints: number };
  spinWheel: () => { rewardTitle: string; code?: string; points?: number };
  isSpinWheelOpen: boolean;
  setIsSpinWheelOpen: (open: boolean) => void;
  isDailyCheckInOpen: boolean;
  setIsDailyCheckInOpen: (open: boolean) => void;
  redeemLoyaltyPoints: (points: number, rewardTitle: string, rewardCode?: string) => boolean;
  
  // Wishlist & Collections
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  wishlistCollections: WishlistCollection[];
  createWishlistCollection: (name: string, description?: string) => void;
  addToWishlistCollection: (collectionId: string, productId: string) => void;
  removeFromWishlistCollection: (collectionId: string, productId: string) => void;

  // Recently Viewed
  recentlyViewedIds: string[];
  addRecentlyViewed: (id: string) => void;
  
  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  
  // Free Gifts & Mystery Box
  selectedFreeGiftId: string | null;
  setSelectedFreeGiftId: (id: string | null) => void;
  unboxingProduct: Product | null;
  setUnboxingProduct: (product: Product | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number, isFreeGift?: boolean) => void;
  updateCartQuantity: (productId: string, size: string | undefined, delta: number) => void;
  removeFromCart: (productId: string, size?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotalUSD: number;
  cartDiscountUSD: number;
  cartTotalUSD: number;
  
  // Promo
  appliedPromoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  // Detail Modal & Modals
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCouponModalOpen: boolean;
  setIsCouponModalOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;
  openOrderTracking: (orderId?: string) => void;
  
  // Filters & Search
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFranchise: string;
  setSelectedFranchise: (franchise: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  availabilityFilter: string;
  setAvailabilityFilter: (filter: string) => void;
  priceRangeUSD: [number, number];
  setPriceRangeUSD: (range: [number, number]) => void;
  
  // Toast & Review
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addReviewToProduct: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
  voteReviewHelpful: (productId: string, reviewId: string, isHelpful: boolean) => void;
  
  // Order History
  orders: OrderDetails[];
  addOrder: (order: OrderDetails) => void;
  
  // Helper scroll
  scrollToProductGrid: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: boolean }> = {
  USD: { rate: 1.0, symbol: '$', prefix: true },
  EUR: { rate: 0.92, symbol: '€', prefix: true },
  GBP: { rate: 0.78, symbol: '£', prefix: true },
  JPY: { rate: 155.0, symbol: '¥', prefix: true }
};

const INITIAL_USER: UserAccount = {
  id: 'usr-101',
  name: 'Ren Amamiya',
  email: 'ren.joker@paneldrip.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  loyaltyPoints: 750,
  membershipTier: 'Gold',
  totalSpentUSD: 489.99,
  referralCode: 'OTAKU-REN99',
  referralCount: 4,
  referralEarningsPoints: 400,
  dailyStreak: 3,
  lastCheckInDate: null,
  spinWheelLastUsed: null,
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home Vault',
      fullName: 'Ren Amamiya',
      address: '742 Cyberpunk Ave, Suite 404',
      city: 'Neo Tokyo',
      postalCode: '100-0001',
      country: 'Japan',
      isDefault: true
    }
  ],
  giftRewardsHistory: [
    {
      id: 'rew-1',
      title: '$10 Store Credit Voucher',
      date: 'July 15, 2026',
      pointsSpent: 500,
      code: 'REWARD10'
    }
  ]
};

const INITIAL_WISHLIST_COLLECTIONS: WishlistCollection[] = [
  { id: 'wc-1', name: 'Grails & Statues', description: 'Museum grade polystone resin grails', productIds: ['prod-001'] },
  { id: 'wc-2', name: 'Streetwear Fits', description: 'Heavyweight oversized hoodies & tees', productIds: ['prod-002'] }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: '⚡ Flash Sale Live!',
    message: '50% off Mystery Boxes & Replica Katanas for the next 15 minutes!',
    date: '10 mins ago',
    read: false,
    type: 'deal',
    linkView: 'mystery-box'
  },
  {
    id: 'n-2',
    title: '🎁 Daily Login Bonus Ready',
    message: 'Claim your Day 4 streak bonus of 200 Loyalty Points!',
    date: '1 hour ago',
    read: false,
    type: 'points'
  },
  {
    id: 'n-3',
    title: '🏷️ Price Drop on Wishlist Item',
    message: 'Cyber-Valkyrie EX Resin Statue is currently $60 off!',
    date: 'Yesterday',
    read: true,
    type: 'wishlist'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('panel_drip_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_PRODUCTS;
      }
    }
    return DEMO_PRODUCTS;
  });

  const [currency, setCurrency] = useState<Currency>('USD');

  // Test connection & auth state listener on mount
  useEffect(() => {
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const syncedUser = await syncUserProfile(fbUser);
          setUser(syncedUser);
          
          // Fetch user's orders from Firestore
          const remoteOrders = await fetchUserOrdersFromFirestore(fbUser.uid);
          if (remoteOrders && remoteOrders.length > 0) {
            setOrders(remoteOrders);
          }
        } catch (err) {
          console.error('Error syncing user on auth change:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // User State
  const [user, setUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('panel_drip_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  // Auth & Dashboard State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [dashboardTab, setDashboardTab] = useState<
    'overview' | 'orders' | 'wishlist' | 'loyalty' | 'referrals' | 'addresses' | 'notifications' | 'settings'
  >('overview');

  const openAuthModal = (tab: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const loginUser = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const synced = await syncUserProfile(res.user);
      setUser(synced);
      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${synced.name}!`);
      return { success: true };
    } catch (err: any) {
      console.error('Firebase login error:', err);
      let message = 'Invalid email or password. Please check your credentials.';
      if (err.code === 'auth/user-not-found') {
        message = 'No account found with this email address.';
      } else if (err.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again or reset password.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Too many failed login attempts. Please try again later.';
      }

      // If demo email, support fallback demo login
      if (email === 'ren.joker@paneldrip.com') {
        const loggedUser: UserAccount = {
          ...INITIAL_USER,
          email: email,
          name: 'Ren Amamiya'
        };
        setUser(loggedUser);
        saveUserToFirestore(loggedUser).catch(console.error);
        setIsAuthModalOpen(false);
        showToast(`Welcome back, ${loggedUser.name}!`);
        return { success: true };
      }

      return { success: false, message };
    }
  };

  const signupUser = async (
    name: string,
    email: string,
    pass: string,
    username?: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      // Validate username if provided
      const finalUsername = username ? (username.startsWith('@') ? username : `@${username}`) : `@${(name || 'user').toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.floor(1000 + Math.random() * 9000)}`;
      
      const isAvailable = await checkUsernameAvailable(finalUsername);
      if (!isAvailable) {
        return { success: false, message: `Username ${finalUsername} is already taken. Please choose another.` };
      }

      const res = await createUserWithEmailAndPassword(auth, email, pass);
      
      // Send verification email
      try {
        await triggerEmailVerification();
      } catch (e) {
        console.log('Email verification send notice:', e);
      }

      const newUser: UserAccount = {
        id: res.user.uid,
        name: name || 'Otaku Fan',
        username: finalUsername,
        email: email,
        avatar: res.user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        loyaltyPoints: 100, // Welcome 100 bonus pts
        membershipTier: 'Free',
        totalSpentUSD: 0,
        referralCode: `PANEL-${(name || 'USER').slice(0, 3).toUpperCase()}${Math.floor(10 + Math.random() * 90)}`,
        referralCount: 0,
        referralEarningsPoints: 0,
        dailyStreak: 1,
        lastCheckInDate: new Date().toISOString().split('T')[0],
        spinWheelLastUsed: null,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        emailVerified: res.user.emailVerified,
        savedAddresses: [],
        giftRewardsHistory: []
      };

      await saveUserToFirestore(newUser);
      setUser(newUser);
      setIsAuthModalOpen(false);
      showToast(`Account created! You earned 100 Welcome Points 🎉 Check inbox to verify email.`);
      return { success: true };
    } catch (err: any) {
      console.error('Firebase signup error:', err);
      let message = 'Registration failed. Please check your information and try again.';
      if (err.code === 'auth/email-already-in-use') {
        message = 'An account with this email address already exists. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters long.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }
      return { success: false, message };
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const syncedUser = await signInWithGoogle();
      setUser(syncedUser);
      setIsAuthModalOpen(false);
      showToast(`Signed in as ${syncedUser.name} via Google!`);
      return true;
    } catch (err: any) {
      console.error('Google sign in error:', err);
      showToast('Google Sign In failed. Please try again.');
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Sign out error:', e);
    }
    setUser(null);
    showToast('Logged out of Panel & Drip account');
  };

  const sendPasswordResetLink = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      await sendPasswordReset(email);
      return { success: true, message: `Password reset instructions sent to ${email}. Check your inbox!` };
    } catch (err: any) {
      console.error('Password reset error:', err);
      let message = 'Failed to send reset email. Please ensure the email is registered.';
      if (err.code === 'auth/user-not-found') {
        message = 'No account found with this email address.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }
      return { success: false, message };
    }
  };

  const sendEmailVerificationLink = async (): Promise<{ success: boolean; message: string }> => {
    try {
      await triggerEmailVerification();
      return { success: true, message: 'Verification link sent to your email address!' };
    } catch (err: any) {
      console.error('Email verification error:', err);
      return { success: false, message: 'Could not send verification email. Please try again later.' };
    }
  };

  const updateUserProfileData = async (data: Partial<UserAccount>): Promise<boolean> => {
    if (!user) return false;
    const updated = { ...user, ...data };
    setUser(updated);
    await saveUserToFirestore(updated);
    showToast('Profile updated successfully!');
    return true;
  };

  const updateEmailAddress = async (newEmail: string): Promise<{ success: boolean; message: string }> => {
    if (!user) return { success: false, message: 'Not logged in' };
    try {
      await updateUserEmail(newEmail);
      const updated = { ...user, email: newEmail, emailVerified: false };
      setUser(updated);
      await saveUserToFirestore(updated);
      showToast('Email address updated successfully!');
      return { success: true, message: 'Email address updated successfully!' };
    } catch (err: any) {
      console.error('Update email error:', err);
      let message = 'Failed to update email address.';
      if (err.code === 'auth/requires-recent-login') {
        message = 'For security reasons, please log out and log back in before updating your email.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email address is already in use by another account.';
      }
      return { success: false, message };
    }
  };

  const updateUserPass = async (newPassword: string): Promise<{ success: boolean; message: string }> => {
    if (!user) return { success: false, message: 'Not logged in' };
    try {
      await updateUserPassword(newPassword);
      showToast('Password updated successfully!');
      return { success: true, message: 'Password updated successfully!' };
    } catch (err: any) {
      console.error('Update password error:', err);
      let message = 'Failed to update password.';
      if (err.code === 'auth/requires-recent-login') {
        message = 'For security reasons, please log out and log back in before changing your password.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters long.';
      }
      return { success: false, message };
    }
  };

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    return await checkUsernameAvailable(username, user?.id);
  };

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('panel_drip_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('panel_drip_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [wishlistCollections, setWishlistCollections] = useState<WishlistCollection[]>(() => {
    const saved = localStorage.getItem('panel_drip_wishlist_collections');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_WISHLIST_COLLECTIONS;
      }
    }
    return INITIAL_WISHLIST_COLLECTIONS;
  });

  const createWishlistCollection = (name: string, description?: string) => {
    const newCol: WishlistCollection = {
      id: `wc-${Date.now()}`,
      name,
      description,
      productIds: []
    };
    setWishlistCollections((prev) => [...prev, newCol]);
    showToast(`Collection "${name}" created!`);
  };

  const addToWishlistCollection = (collectionId: string, productId: string) => {
    setWishlistCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          if (!col.productIds.includes(productId)) {
            return { ...col, productIds: [...col.productIds, productId] };
          }
        }
        return col;
      })
    );
    showToast('Item added to collection!');
  };

  const removeFromWishlistCollection = (collectionId: string, productId: string) => {
    setWishlistCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          return { ...col, productIds: col.productIds.filter((id) => id !== productId) };
        }
        return col;
      })
    );
  };

  // Recently Viewed
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('panel_drip_recently_viewed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const addRecentlyViewed = (id: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((pId) => pId !== id);
      return [id, ...filtered].slice(0, 10);
    });
  };

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('panel_drip_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Rewards & Daily Check In
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isDailyCheckInOpen, setIsDailyCheckInOpen] = useState(false);

  const claimDailyCheckIn = () => {
    if (!user) {
      openAuthModal('login');
      return { success: false, message: 'Please log in to claim daily streak rewards!', rewardPoints: 0 };
    }
    const today = new Date().toISOString().split('T')[0];
    if (user.lastCheckInDate === today) {
      return { success: false, message: 'You already claimed your check-in reward today!', rewardPoints: 0 };
    }

    const nextStreak = (user.dailyStreak % 7) + 1;
    let pointsAwarded = 50;
    if (nextStreak === 2) pointsAwarded = 100;
    if (nextStreak === 3) pointsAwarded = 150;
    if (nextStreak === 4) pointsAwarded = 200;
    if (nextStreak === 5) pointsAwarded = 250;
    if (nextStreak === 6) pointsAwarded = 300;
    if (nextStreak === 7) pointsAwarded = 500; // Day 7 mystery jackpot

    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        dailyStreak: nextStreak,
        lastCheckInDate: today,
        loyaltyPoints: prev.loyaltyPoints + pointsAwarded
      };
    });

    showToast(`Claimed Day ${nextStreak} streak! +${pointsAwarded} Loyalty Points added.`);
    return { success: true, message: `Day ${nextStreak} Claimed!`, rewardPoints: pointsAwarded };
  };

  const spinWheel = () => {
    if (!user) {
      openAuthModal('login');
      return { rewardTitle: 'Please log in' };
    }

    const outcomes = [
      { rewardTitle: '5% OFF Coupon', code: 'WHEEL5' },
      { rewardTitle: '100 Loyalty Points', points: 100 },
      { rewardTitle: 'FREE Express Shipping', code: 'FREESHIP' },
      { rewardTitle: '300 Loyalty Points', points: 300 },
      { rewardTitle: '15% OFF Mystery Box', code: 'MYSTERY15' },
      { rewardTitle: '500 Loyalty Points Jackpot', points: 500 }
    ];

    const randomIndex = Math.floor(Math.random() * outcomes.length);
    const result = outcomes[randomIndex];

    if (result.points) {
      setUser((prev) => (prev ? { ...prev, loyaltyPoints: prev.loyaltyPoints + result.points! } : null));
    }

    const today = new Date().toISOString().split('T')[0];
    setUser((prev) => (prev ? { ...prev, spinWheelLastUsed: today } : null));

    return result;
  };

  const redeemLoyaltyPoints = (points: number, rewardTitle: string, rewardCode?: string) => {
    if (!user || user.loyaltyPoints < points) {
      showToast('Not enough Loyalty Points!');
      return false;
    }

    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        loyaltyPoints: prev.loyaltyPoints - points,
        giftRewardsHistory: [
          {
            id: `rew-${Date.now()}`,
            title: rewardTitle,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            pointsSpent: points,
            code: rewardCode
          },
          ...prev.giftRewardsHistory
        ]
      };
    });

    if (rewardCode) {
      applyPromoCode(rewardCode);
    }

    showToast(`Redeemed "${rewardTitle}" for ${points} Points!`);
    return true;
  };

  // Orders
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    const saved = localStorage.getItem('panel_drip_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('shop');

  const navigateToView = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);

  const setSelectedProduct = (prod: Product | null) => {
    setSelectedProductState(prod);
    if (prod) {
      addRecentlyViewed(prod.id);
    }
  };

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  // Free Gift & Unboxing Modal State
  const [selectedFreeGiftId, setSelectedFreeGiftId] = useState<string | null>(null);
  const [unboxingProduct, setUnboxingProduct] = useState<Product | null>(null);

  const openOrderTracking = (orderId?: string) => {
    if (orderId) setTrackingOrderId(orderId);
    setIsOrderTrackingOpen(true);
  };

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFranchise, setSelectedFranchise] = useState('All Franchises');
  const [sortBy, setSortBy] = useState('featured');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [priceRangeUSD, setPriceRangeUSD] = useState<[number, number]>([0, 850]);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('panel_drip_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('panel_drip_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('panel_drip_wishlist_collections', JSON.stringify(wishlistCollections));
  }, [wishlistCollections]);

  useEffect(() => {
    localStorage.setItem('panel_drip_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('panel_drip_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('panel_drip_recently_viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    localStorage.setItem('panel_drip_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('panel_drip_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('panel_drip_user');
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const formatPrice = (usdAmount: number): string => {
    const { rate, symbol, prefix } = CURRENCY_RATES[currency];
    const converted = usdAmount * rate;
    if (currency === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    const formatted = converted.toFixed(2);
    return prefix ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
  };

  const addToCart = (product: Product, size?: string, quantity: number = 1, isFreeGift: boolean = false) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : undefined);
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize && item.isFreeGift === isFreeGift
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, selectedSize: chosenSize, quantity, isFreeGift }];
    });
    showToast(isFreeGift ? `Added FREE GIFT "${product.title}" to cart!` : `Added "${product.title}" to cart!`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, size: string | undefined, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromoCode(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      if (exists) {
        showToast('Removed from wishlist');
      } else {
        const prod = products.find((p) => p.id === productId);
        showToast(`Saved "${prod?.title || 'item'}" to Wishlist!`);
      }
      if (user) {
        saveWishlistToFirestore(user.id, updated).catch(console.error);
      }
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart financial calculations
  const cartSubtotalUSD = cart.reduce((acc, item) => {
    if (item.isFreeGift) return acc;
    return acc + item.product.priceUSD * item.quantity;
  }, 0);

  let cartDiscountUSD = 0;
  if (appliedPromoCode && PROMO_CODES[appliedPromoCode]) {
    const promo = PROMO_CODES[appliedPromoCode];
    if (!promo.minSpendUSD || cartSubtotalUSD >= promo.minSpendUSD) {
      if (promo.discountPercent) {
        cartDiscountUSD = (cartSubtotalUSD * promo.discountPercent) / 100;
      } else if (promo.discountFixedUSD) {
        cartDiscountUSD = Math.min(cartSubtotalUSD, promo.discountFixedUSD);
      }
    }
  }

  // Tier discount multiplier for VIP Members
  if (user) {
    if (user.membershipTier === 'Silver') cartDiscountUSD += cartSubtotalUSD * 0.05;
    if (user.membershipTier === 'Gold') cartDiscountUSD += cartSubtotalUSD * 0.10;
    if (user.membershipTier === 'Platinum') cartDiscountUSD += cartSubtotalUSD * 0.15;
  }

  const cartTotalUSD = Math.max(0, cartSubtotalUSD - cartDiscountUSD);

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = PROMO_CODES[trimmed];
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try DRIP10, OTAKU20, or PANEL15' };
    }
    if (found.minSpendUSD && cartSubtotalUSD < found.minSpendUSD) {
      return {
        success: false,
        message: `Promo code ${trimmed} requires a minimum spend of $${found.minSpendUSD.toFixed(2)}`
      };
    }
    setAppliedPromoCode(trimmed);
    return { success: true, message: `Promo code ${trimmed} applied successfully!` };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(null);
  };

  const addReviewToProduct = (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => {
    const newRev: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isVerifiedPurchase: true
    };

    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newRev, ...p.reviews];
          const newAvgRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: parseFloat(newAvgRating.toFixed(2))
          };
        }
        return p;
      })
    );

    // Save review to Firestore
    if (user) {
      saveReviewToFirestore(newRev, productId, user.id).catch(console.error);
    }

    // Award user 50 Loyalty points for leaving a review!
    if (user) {
      setUser((prev) => (prev ? { ...prev, loyaltyPoints: prev.loyaltyPoints + 50 } : null));
      showToast('Thank you! Your review is live (+50 Loyalty Points earned)!');
    } else {
      showToast('Thank you! Your review has been published.');
    }
  };

  const voteReviewHelpful = (productId: string, reviewId: string, isHelpful: boolean) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            reviews: p.reviews.map((r) => {
              if (r.id === reviewId) {
                if (isHelpful) {
                  return { ...r, helpfulCount: r.helpfulCount + 1 };
                } else {
                  return { ...r, unhelpfulCount: (r.unhelpfulCount || 0) + 1 };
                }
              }
              return r;
            })
          };
        }
        return p;
      })
    );
  };

  const addOrder = (order: OrderDetails) => {
    setOrders((prev) => [order, ...prev]);

    // Save order to Firestore
    saveOrderToFirestore(order).catch(console.error);

    // Award 1 loyalty point per $1 spent!
    if (user) {
      const earnedPts = Math.floor(order.totalUSD);
      const newTotalSpent = user.totalSpentUSD + order.totalUSD;
      let newTier = user.membershipTier;
      if (newTotalSpent >= 700) newTier = 'Platinum';
      else if (newTotalSpent >= 300) newTier = 'Gold';
      else if (newTotalSpent >= 100) newTier = 'Silver';

      const updatedUser = {
        ...user,
        loyaltyPoints: user.loyaltyPoints + earnedPts,
        totalSpentUSD: newTotalSpent,
        membershipTier: newTier
      };
      setUser(updatedUser);
      saveUserToFirestore(updatedUser).catch(console.error);
    }

    clearCart();
  };

  const scrollToProductGrid = () => {
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        setCurrency,
        formatPrice,
        currentView,
        setCurrentView,
        navigateToView,
        dashboardTab,
        setDashboardTab,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        loginUser,
        signupUser,
        loginWithGoogle,
        logoutUser,
        sendPasswordResetLink,
        sendEmailVerificationLink,
        updateUserProfileData,
        updateEmailAddress,
        updateUserPass,
        checkUsernameAvailability,
        claimDailyCheckIn,
        spinWheel,
        isSpinWheelOpen,
        setIsSpinWheelOpen,
        isDailyCheckInOpen,
        setIsDailyCheckInOpen,
        redeemLoyaltyPoints,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        wishlistCollections,
        createWishlistCollection,
        addToWishlistCollection,
        removeFromWishlistCollection,
        recentlyViewedIds,
        addRecentlyViewed,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isNotificationsOpen,
        setIsNotificationsOpen,
        selectedFreeGiftId,
        setSelectedFreeGiftId,
        unboxingProduct,
        setUnboxingProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotalUSD,
        cartDiscountUSD,
        cartTotalUSD,
        appliedPromoCode,
        applyPromoCode,
        removePromoCode,
        selectedProduct,
        setSelectedProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCouponModalOpen,
        setIsCouponModalOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        trackingOrderId,
        setTrackingOrderId,
        openOrderTracking,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedFranchise,
        setSelectedFranchise,
        sortBy,
        setSortBy,
        availabilityFilter,
        setAvailabilityFilter,
        priceRangeUSD,
        setPriceRangeUSD,
        toastMessage,
        showToast,
        addReviewToProduct,
        voteReviewHelpful,
        orders,
        addOrder,
        scrollToProductGrid
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
