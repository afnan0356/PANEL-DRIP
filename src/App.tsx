import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesBanner } from './components/CategoriesBanner';
import { BundleBuilder } from './components/BundleBuilder';
import { ProductGrid } from './components/ProductGrid';
import { LookbookSection } from './components/LookbookSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CouponModal } from './components/CouponModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans selection:bg-[#CCFF00] selection:text-black antialiased">
        <Header />
        <main>
          <Hero />
          <CategoriesBanner />
          <BundleBuilder />
          <ProductGrid />
          <LookbookSection />
        </main>
        <Footer />

        {/* Global Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <WishlistDrawer />
        <SizeGuideModal />
        <CouponModal />
        <OrderTrackingModal />
        <Toast />
      </div>
    </ShopProvider>
  );
}
