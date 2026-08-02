import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Category, Currency, ProductReview, OrderDetails } from '../types';
import { DEMO_PRODUCTS, PROMO_CODES } from '../data/products';

interface ShopContextType {
  products: Product[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
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
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  
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
  
  // Toast & Extras
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addReviewToProduct: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
  
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

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

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
  const [priceRangeUSD, setPriceRangeUSD] = useState<[number, number]>([0, 600]);

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
    localStorage.setItem('panel_drip_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('panel_drip_orders', JSON.stringify(orders));
  }, [orders]);

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

  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : undefined);
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, selectedSize: chosenSize, quantity }];
    });
    showToast(`Added "${product.title}" (${chosenSize || 'Standard'}) to cart!`);
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
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = products.find((p) => p.id === productId);
        showToast(`Saved "${prod?.title || 'item'}" to Wishlist!`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart financial calculations
  const cartSubtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

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
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
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

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        if (!prev) return null;
        const updatedReviews = [newRev, ...prev.reviews];
        const newAvgRating =
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: parseFloat(newAvgRating.toFixed(2))
        };
      });
    }

    showToast('Thank you! Your review has been published.');
  };

  const addOrder = (order: OrderDetails) => {
    setOrders((prev) => [order, ...prev]);
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
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
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
