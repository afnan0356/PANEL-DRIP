import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, doublePrecision, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  avatar: text('avatar'),
  loyaltyPoints: integer('loyalty_points').default(100),
  membershipTier: text('membership_tier').default('Free'),
  totalSpentUSD: doublePrecision('total_spent_usd').default(0),
  referralCode: text('referral_code'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  productId: text('product_id').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  category: text('category').notNull(),
  subcategory: text('subcategory'),
  franchise: text('franchise'),
  priceUSD: doublePrecision('price_usd').notNull(),
  originalPriceUSD: doublePrecision('original_price_usd'),
  stockCount: integer('stock_count').default(10),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderId: text('order_id').notNull().unique(),
  userId: text('user_id').references(() => users.uid).notNull(),
  totalUSD: doublePrecision('total_usd').notNull(),
  status: text('status').default('Confirmed'),
  items: jsonb('items'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  reviewId: text('review_id').notNull().unique(),
  productId: text('product_id').notNull(),
  userId: text('user_id').references(() => users.uid).notNull(),
  userName: text('user_name').notNull(),
  rating: integer('rating').notNull(),
  title: text('title'),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  reviews: many(reviews),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.uid],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.uid],
  }),
}));
