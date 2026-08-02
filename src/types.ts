export type Category =
  | 'all'
  | 'resin-statues'
  | 'action-figures'
  | 'streetwear'
  | 'bottoms'
  | 'cosplay'
  | 'manga-books'
  | 'accessories-decor';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

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
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string; // Franchise or sub-brand (e.g. "Cyber-Punk Neo-Tokyo", "Demon Blade")
  category: Category;
  subcategory: string; // e.g., "1/7 Scale Resin", "S.H.Figuarts", "Oversized Hoodie", "Cross-Cosplay Set"
  franchise: string; // e.g. "Neon Genesis", "Chainsaw Devil", "Jujutsu High", "Cyberpunk", "Original Studio"
  priceUSD: number;
  originalPriceUSD?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  specs: ProductSpec[];
  sizes?: string[]; // e.g. ['S', 'M', 'L', 'XL', '2XL'] for apparel, or ['Standard', 'Ex Statue Edition']
  isPreOrder?: boolean;
  preOrderDate?: string;
  isLimitedResin?: boolean;
  stockCount: number;
  editionLimit?: number;
  tags: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedSize?: string;
  quantity: number;
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
}
