import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, FileText, ArrowLeft, ArrowRight, HelpCircle, Mail, Clock, Lock } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
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
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-mono tracking-tight">
                TERMS & CONDITIONS
              </h1>
              <p className="text-zinc-400 text-xs font-mono">
                Effective Date: August 1, 2026 | Last Updated: August 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
        
        {/* Quick Nav Notice */}
        <div className="bg-[#0A0A0B] border border-zinc-800 p-4 rounded-xl flex items-center justify-between font-mono text-xs text-zinc-400">
          <span className="flex items-center gap-2 text-white font-bold">
            <Lock className="w-4 h-4 text-[#CCFF00]" /> Legal Compliance & Vault Security
          </span>
          <span className="text-[#CCFF00]">Panel & Drip Legal Dept</span>
        </div>

        {/* 1. Introduction */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00] flex items-center gap-2">
            <span>1. Introduction</span>
          </h2>
          <p>
            Welcome to <strong className="text-white">Panel & Drip</strong> ("we," "our," or "us"). By accessing or using our e-commerce platform, purchasing products (including physical resin statues, replica katanas, streetwear, footwear, eyewear, or digital gift cards), or browsing our services, you agree to be bound by these Terms & Conditions.
          </p>
          <p className="text-zinc-400 text-xs">
            Please read these terms carefully before placing an order. If you do not agree to all terms, you must refrain from using the platform.
          </p>
        </section>

        {/* 2. User Responsibilities */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00]">
            2. User Responsibilities & Conduct
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-zinc-300">
            <li>
              <strong className="text-white">Age Requirement:</strong> You must be at least 18 years old or possess legal parental consent to purchase products on this store, particularly replica steel katanas and collectible resin figures.
            </li>
            <li>
              <strong className="text-white">Accuracy of Information:</strong> You agree to provide current, complete, and accurate billing, shipping, and email contact information for all purchases made at our store.
            </li>
            <li>
              <strong className="text-white">Lawful Usage:</strong> You are strictly prohibited from using our products for any unlawful or unauthorized purpose, including resale of replica steel swords in jurisdictions where prohibited.
            </li>
          </ul>
        </section>

        {/* 3. Purchase & Payment Terms */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00]">
            3. Purchase, Pricing & Payment Terms
          </h2>
          <p>
            We accept standard Credit/Debit Cards, Apple Pay, Klarna interest-free instalments, and Web3 Cryptocurrency payments (USDT, SOL, BTC, ETH). All prices are displayed in USD, with dynamic multi-currency display available for convenience.
          </p>
          <div className="bg-[#0E0E10] border border-zinc-800 p-4 rounded-xl text-xs font-mono space-y-2">
            <span className="text-[#CCFF00] font-bold block">Payment Processing & Authorization:</span>
            <p className="text-zinc-400">
              By submitting an order, you authorize Panel & Drip to charge your selected payment method for the full order amount, including applicable shipping fees, collector box packaging, and local taxes.
            </p>
          </div>
        </section>

        {/* 4. Refund & Cancellation Policy */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00]">
            4. Refund, Return & Cancellation Policy
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-white font-bold font-mono text-xs uppercase">Physical Merchandise (Apparel, Shoes, Eyewear, Katanas)</h3>
              <p className="text-zinc-400 text-xs">
                Physical items in original unworn condition with original tags and collector boxes can be returned within 30 days of delivery for a full refund or exchange.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold font-mono text-xs uppercase">Resin Statues & Pre-Orders</h3>
              <p className="text-zinc-400 text-xs">
                Limited edition resin statues (e.g. 1/7 Scale EX editions) involve non-refundable deposits once production begins. Cancellations prior to shipping batch confirmation are subject to a 10% restocking fee.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-amber-300 text-xs font-mono">
              ⚡ <strong>Digital Gift Cards & Vouchers Exception:</strong> Due to immediate code generation and redemption capability, all Digital Voucher and Gift Card purchases (Google Play, Apple, Steam, PlayStation, Xbox, Amazon) are FINAL and NON-REFUNDABLE once delivered to your email or order dashboard.
            </div>
          </div>
        </section>

        {/* 5. Product Availability Disclaimer */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00]">
            5. Product Availability & Replica Katana Legal Disclaimer
          </h2>
          <p>
            Certain items, including resin statues and streetwear drops, are manufactured in strictly limited quantities. We reserve the right to limit sales quantities or discontinue products at any time without notice.
          </p>
          <div className="bg-[#0E0E10] border border-zinc-800 p-4 rounded-xl text-xs space-y-2">
            <strong className="text-white font-mono uppercase block text-[#CCFF00]">
              ⚔️ Katana & Sword Safety Notice:
            </strong>
            <p className="text-zinc-400">
              All replica katanas sold on Panel & Drip are intended purely as decorative display items, collection pieces, or unsharpened cosplay props. Customers are solely responsible for ensuring compliance with local, state, and national laws regarding edge weapons and decorative swords.
            </p>
          </div>
        </section>

        {/* 6. Account Usage Rules */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00]">
            6. Account Usage & Anti-Fraud Security
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your checkout credentials, order numbers, and promo coupon redemptions. We reserve the right to refuse service, cancel orders, or terminate accounts in cases of suspected fraudulent activity, automated scalping bots, or promo code abuse.
          </p>
        </section>

        {/* 7. Limitation of Liability */}
        <section className="space-y-3 bg-[#0A0A0B] border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase text-[#CCFF00]">
            7. Limitation of Liability
          </h2>
          <p>
            In no event shall Panel & Drip, its founders, suppliers, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from the misuse of products, shipping carrier delays beyond our reasonable control, or unauthorized access to customer data.
          </p>
        </section>

        {/* 8. Contact Information */}
        <section className="space-y-4 bg-[#0E0E10] border border-zinc-800 p-6 rounded-2xl text-xs font-mono">
          <h2 className="text-base font-black text-white uppercase text-[#CCFF00] flex items-center gap-2">
            <Mail className="w-4 h-4" /> 8. Legal Contact Information
          </h2>
          <p className="text-zinc-300">
            If you have questions or legal inquiries regarding these Terms & Conditions, please contact our support team:
          </p>
          <div className="space-y-1 text-zinc-400">
            <p>• Email: <span className="text-[#CCFF00]">legal@paneldrip.com</span></p>
            <p>• Support Vault Desk: <span className="text-[#CCFF00]">support@paneldrip.com</span></p>
            <p>• Response Time: Within 24 hours (Monday – Saturday)</p>
          </div>
        </section>

        {/* Back Button */}
        <div className="pt-6 text-center">
          <button
            onClick={() => navigateToView('shop')}
            className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-8 py-3.5 rounded-xl text-xs uppercase font-mono tracking-widest shadow-xl inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-black" />
            <span>RETURN TO SHOPPING</span>
          </button>
        </div>

      </div>
    </div>
  );
};
