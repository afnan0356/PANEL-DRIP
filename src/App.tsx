import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
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

import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { TermsConditionsPage } from './components/TermsConditionsPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { GiftCardsPage } from './components/GiftCardsPage';
import { UserDashboard } from './components/UserDashboard';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  switch (currentView) {
    case 'about':
      return <AboutUsPage />;
    case 'contact':
      return <ContactUsPage />;
    case 'terms':
      return <TermsConditionsPage />;
    case 'privacy':
      return <PrivacyPolicyPage />;
    case 'gift-cards':
      return <GiftCardsPage />;
    case 'dashboard':
      return <UserDashboard />;
    case 'shop':
    default:
      return (
        <>
          <Hero />
          <CategoriesBanner />
          <BundleBuilder />
          <ProductGrid />
          <LookbookSection />
        </>
      );
  }
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans selection:bg-[#CCFF00] selection:text-black antialiased">
        <Header />
        <main>
          <MainContent />
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
