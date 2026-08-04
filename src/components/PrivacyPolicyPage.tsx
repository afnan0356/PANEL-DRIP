import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Lock, ArrowLeft, Eye, Cookie, CreditCard, Server, UserCheck, Database, Mail } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigateToView } = useShop();

  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen pb-20 font-sans">
      {/* Header Banner */}
      <div className="border-b border-zinc-800 bg-[#0A0A0B] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <button
            onClick={() => navigateToView('shop')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#CCFF00] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
                PRIVACY POLICY
              </h1>
              <p className="text-zinc-400 text-xs font-mono">
                Your Privacy & Data Rights | Updated August 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed">

        {/* Security Shield Callout */}
        <div className="bg-[#0A0A0B] border border-zinc-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#CCFF00] shrink-0" />
            <div>
              <span className="text-white font-bold block">Zero Data Selling Guarantee</span>
              <span className="text-zinc-400 text-[11px]">We never sell, rent, or trade your personal information to third-party data brokers.</span>
            </div>
          </div>
          <span className="bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/30 px-3 py-1 rounded-full font-bold text-[10px] uppercase shrink-0">
            256-Bit Encrypted
          </span>
        </div>

        {/* 1. Information Collected */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00] flex items-center gap-2">
            <Eye className="w-4 h-4" /> 1. Information We Collect
          </h2>
          <p>
            When you visit Panel & Drip, place an order, or subscribe to our drop alerts, we collect specific categories of personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
            <li><strong className="text-white">Order Information:</strong> Full name, shipping/billing address, email address, phone number, and items purchased.</li>
            <li><strong className="text-white">Digital Delivery Info:</strong> Email address for instant voucher delivery (Google Play, Apple, Steam, etc.).</li>
            <li><strong className="text-white">Device & Usage Data:</strong> IP address, browser type, device type, referrer URL, and pages viewed.</li>
          </ul>
        </section>

        {/* 2. How User Data Is Used */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00] flex items-center gap-2">
            <UserCheck className="w-4 h-4" /> 2. How We Use Your Data
          </h2>
          <p>We use your information exclusively to provide a flawless shopping and delivery experience:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="bg-[#0E0E10] border border-zinc-800 p-3 rounded-xl">
              <strong className="text-[#CCFF00] block mb-1">Fulfill Orders & Shipping</strong>
              <span className="text-zinc-400">Processing physical apparel, katanas, and resin statues for carrier dispatch.</span>
            </div>
            <div className="bg-[#0E0E10] border border-zinc-800 p-3 rounded-xl">
              <strong className="text-[#CCFF00] block mb-1">Instant Digital Code Delivery</strong>
              <span className="text-zinc-400">Delivering digital gift card codes immediately via email and order receipts.</span>
            </div>
            <div className="bg-[#0E0E10] border border-zinc-800 p-3 rounded-xl">
              <strong className="text-[#CCFF00] block mb-1">Fraud Prevention</strong>
              <span className="text-zinc-400">Protecting orders against fraudulent credit card usage and bot scalping.</span>
            </div>
            <div className="bg-[#0E0E10] border border-zinc-800 p-3 rounded-xl">
              <strong className="text-[#CCFF00] block mb-1">Customer Support</strong>
              <span className="text-zinc-400">Resolving shipping inquiries, tracking packages, and processing returns.</span>
            </div>
          </div>
        </section>

        {/* 3. Cookies and Tracking Technologies */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00] flex items-center gap-2">
            <Cookie className="w-4 h-4" /> 3. Cookies & Local Storage
          </h2>
          <p>
            We use essential local storage cookies to remember items in your shopping cart, maintain currency preferences (USD, EUR, GBP, JPY), save your wishlist items, and remember applied promo coupons across sessions. You can clear your browser storage at any time.
          </p>
        </section>

        {/* 4. Payment Security */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00] flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> 4. Payment Security & Encryption
          </h2>
          <p>
            Your payment security is paramount. All credit card, Apple Pay, Klarna, and Web3 crypto transactions are processed through tokenized, 256-bit SSL encrypted payment gateways.
          </p>
          <p className="text-zinc-400 text-xs">
            Panel & Drip never stores raw full credit card numbers or security CVV codes on our servers.
          </p>
        </section>

        {/* 5. Third-Party Services */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00] flex items-center gap-2">
            <Server className="w-4 h-4" /> 5. Third-Party Service Providers
          </h2>
          <p>
            To fulfill orders, we share necessary minimal data only with trusted partners:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-300">
            <li><strong className="text-white">Shipping Carriers:</strong> DHL Express, FedEx, UPS (address & contact details).</li>
            <li><strong className="text-white">Payment Processors:</strong> Stripe, Apple Pay, Klarna, and Web3 RPC nodes.</li>
            <li><strong className="text-white">Digital Voucher Networks:</strong> Authorized gift card issuers for instant code generation.</li>
          </ul>
        </section>

        {/* 6. User Rights */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00] flex items-center gap-2">
            <UserCheck className="w-4 h-4" /> 6. Your Data Rights
          </h2>
          <p>Depending on your jurisdiction (including GDPR & CCPA rights), you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-300">
            <li>Request a copy of the personal data we hold about you.</li>
            <li>Request the deletion or correction of your personal data.</li>
            <li>Opt out of marketing communications at any time with 1-click.</li>
          </ul>
        </section>

        {/* 7. Data Retention */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00] flex items-center gap-2">
            <Database className="w-4 h-4" /> 7. Data Retention
          </h2>
          <p>
            We retain order records for as long as necessary to comply with legal, tax, and warranty obligations. Digital gift card purchase logs are maintained for order tracking and re-sending lost redemption codes upon customer request.
          </p>
        </section>

        {/* 8. Contact Information */}
        <section className="space-y-3 bg-[#0E0E10] border border-zinc-800 p-6 rounded-2xl text-xs font-mono">
          <h2 className="text-base font-black text-white uppercase text-[#CCFF00] flex items-center gap-2">
            <Mail className="w-4 h-4" /> 8. Privacy Contact & Inquiries
          </h2>
          <p className="text-zinc-300">
            For privacy requests, data deletion requests, or questions regarding this policy, please reach out:
          </p>
          <p className="text-zinc-400">
            • Email: <span className="text-[#CCFF00]">privacy@paneldrip.com</span>
          </p>
        </section>

        {/* Back to shop */}
        <div className="pt-4 text-center">
          <button
            onClick={() => navigateToView('shop')}
            className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-8 py-3.5 rounded-xl text-xs uppercase font-mono tracking-widest shadow-xl inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-black" />
            <span>RETURN TO STORE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
