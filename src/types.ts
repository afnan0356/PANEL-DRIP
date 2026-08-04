export type Category =
  | 'all'
  | 'resin-statues'
  | 'action-figures'
  | 'streetwear'
  | 'bottoms'
  | 'cosplay'
  | 'katanas'
  | 'shoes'
  | 'glasses'
  | 'gift-cards'
  | 'mystery-box'
  | 'manga-books'
  | 'accessories-decor';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

export type MembershipTier = 'Free' | 'Silver' | 'Gold' | 'Platinum';

export interface ProductReview {
  id: string;
  userName: string;
  avatar?: string;
  userBadge: string; // e.g. "Verified Collector", "Streetwear Enthusiast"
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
  unhelpfulCount?: number;
  images?: string[];
  isVerifiedPurchase?: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export type AppView = 'shop' | 'about' | 'contact' | 'terms' | 'privacy' | 'gift-cards' | 'dashboard' | 'mystery-box';

export interface MysteryDropContent {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  valueUSD: number;
  image: string;
  chancePercent: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string; // Franchise or sub-brand
  category: Category;
  subcategory: string;
  franchise: string;
  priceUSD: number;
  originalPriceUSD?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  specs: ProductSpec[];
  sizes?: string[];
  isPreOrder?: boolean;
  preOrderDate?: string;
  isLimitedResin?: boolean;
  isDigital?: boolean;
  isMysteryBox?: boolean;
  guaranteedMinValueUSD?: number;
  possibleDrops?: MysteryDropContent[];
  stockCount: number;
  editionLimit?: number;
  tags: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedSize?: string;
  quantity: number;
  isFreeGift?: boolean;
}

export interface SavedAddress {
  id: string;
  label: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface WishlistCollection {
  id: string;
  name: string;
  description?: string;
  productIds: string[];
}

export interface UserAccount {
  id: string;
  name: string;
  username?: string;
  email: string;
  avatar: string;
  role?: string;
  loyaltyPoints: number;
  membershipTier: MembershipTier;
  totalSpentUSD: number;
  referralCode: string;
  referralCount: number;
  referralEarningsPoints: number;
  dailyStreak: number;
  lastCheckInDate: string | null; // ISO format 'YYYY-MM-DD'
  spinWheelLastUsed: string | null;
  createdAt?: string;
  lastLoginAt?: string;
  emailVerified?: boolean;
  savedAddresses: SavedAddress[];
  giftRewardsHistory: {
    id: string;
    title: string;
    date: string;
    pointsSpent: number;
    code?: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'deal' | 'points' | 'wishlist' | 'system';
  linkView?: AppView;
}

export interface FreeGiftItem {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  minSpendUSD: number;
  image: string;
  originalValueUSD: number;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  subtotalUSD: number;
  discountUSD: number;
  shippingFeeUSD: number;
  taxUSD: number;
  totalUSD: number;
  estimatedDelivery: string;
  status: 'Order Placed' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered';
  trackingNumber: string;
  carrier: string;
}

