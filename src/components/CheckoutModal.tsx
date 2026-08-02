import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  Printer,
  PackageCheck,
  ShieldCheck,
  Coins,
  QrCode,
  Copy,
  Check,
  Tag,
  Ticket
} from 'lucide-react';
import { OrderDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotalUSD,
    cartDiscountUSD,
    cartTotalUSD,
    formatPrice,
    addOrder,
    openOrderTracking,
    setIsCouponModalOpen,
    appliedPromoCode,
    applyPromoCode
  } = useShop();

  if (!isCheckoutOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [fullName, setFullName] = useState('Kenji Takahashi');
  const [email, setEmail] = useState('kenji.otaku@example.com');
  const [address, setAddress] = useState('742 Cyberpunk Blvd, Apt 4B');
  const [city, setCity] = useState('Tokyo / Los Angeles');
  const [postalCode, setPostalCode] = useState('90012');
  const [country, setCountry] = useState('United States');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('express');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'klarna' | 'crypto'>('card');
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDT' | 'SOL'>('USDT');
  const [copiedCryptoAddress, setCopiedCryptoAddress] = useState(false);
  const [txHashInput, setTxHashInput] = useState('');

  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Confirmed Order Data
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const shippingFeeUSD = cartSubtotalUSD >= 120 || shippingMethod === 'standard' ? 0.0 : 15.0;
  const taxUSD = cartTotalUSD * 0.08;
  const grandTotalUSD = cartTotalUSD + shippingFeeUSD + taxUSD;

  // Crypto conversion calculations
  const CRYPTO_ADDRESSES = {
    BTC: 'bc1q9drip2026otakuvault8492048590',
    ETH: '0x71C841f3E9528D831C01B4f9B95821034c',
    USDT: '0x71C841f3E9528D831C01B4f9B95821034c',
    SOL: '4k3Dy2zDRIP99xOtakuVaultSolana9900'
  };

  const getCryptoAmount = () => {
    switch (selectedCrypto) {
      case 'BTC':
        return `${(grandTotalUSD / 94000).toFixed(6)} BTC`;
      case 'ETH':
        return `${(grandTotalUSD / 3400).toFixed(5)} ETH`;
      case 'USDT':
        return `${grandTotalUSD.toFixed(2)} USDT`;
      case 'SOL':
        return `${(grandTotalUSD / 150).toFixed(3)} SOL`;
    }
  };

  const handleCopyCryptoAddress = () => {
    navigator.clipboard.writeText(CRYPTO_ADDRESSES[selectedCrypto]);
    setCopiedCryptoAddress(true);
    setTimeout(() => setCopiedCryptoAddress(false), 2000);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `PD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentLabel =
      paymentMethod === 'card'
        ? 'Credit Card (•••• 4242)'
        : paymentMethod === 'applepay'
        ? 'Apple Pay'
        : paymentMethod === 'klarna'
        ? 'Klarna 4 Interest-Free Payments'
        : `Crypto - ${selectedCrypto} (${getCryptoAmount()})`;

    const newOrder: OrderDetails = {
      orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      items: [...cart],
      shippingAddress: {
        fullName,
        email,
        address,
        city,
        postalCode,
        country
      },
      shippingMethod:
        shippingMethod === 'express'
          ? 'Otaku Express Air (Collector Bubble-Wrap Box)'
          : 'Standard Insured Air Mail',
      paymentMethod: paymentLabel,
      subtotalUSD: cartSubtotalUSD,
      discountUSD: cartDiscountUSD,
      shippingFeeUSD,
      taxUSD,
      totalUSD: grandTotalUSD,
      estimatedDelivery: '3 - 5 Business Days (Tracked Air)'
    };

    setCompletedOrder(newOrder);
    addOrder(newOrder);
    setStep(4);

    // Trigger Confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // fallback silent
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0E0E10] border border-zinc-800 rounded-3xl max-w-3xl w-full text-zinc-100 relative shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#CCFF00]" />
            <h2 className="text-lg font-black italic uppercase font-sans tracking-tight">
              PANEL &amp; DRIP // STREAMLINED CHECKOUT
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Stepper Indicator */}
        <div className="bg-[#0A0A0B] px-6 py-3 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
          <span className={step >= 1 ? 'text-[#CCFF00] font-bold' : 'text-zinc-500'}>
            1. Shipping
          </span>
          <span className="text-zinc-700">→</span>
          <span className={step >= 2 ? 'text-[#CCFF00] font-bold' : 'text-zinc-500'}>
            2. Method
          </span>
          <span className="text-zinc-700">→</span>
          <span className={step >= 3 ? 'text-[#CCFF00] font-bold' : 'text-zinc-500'}>
            3. Payment
          </span>
          <span className="text-zinc-700">→</span>
          <span className={step === 4 ? 'text-[#CCFF00] font-bold' : 'text-zinc-500'}>
            4. Confirmation
          </span>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-black italic uppercase tracking-wider text-white font-sans flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#CCFF00]" /> Shipping &amp; Collector Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 text-[10px] uppercase font-bold">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 text-[10px] uppercase font-bold">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-mono text-zinc-400 text-[10px] uppercase font-bold">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 text-[10px] uppercase font-bold">City / State</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-zinc-400 text-[10px] uppercase font-bold">Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#CCFF00] hover:bg-[#bce600] text-black font-black py-3 rounded-xl text-xs uppercase font-mono tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Continue to Shipping Method</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          )}

          {/* STEP 2: SHIPPING METHOD */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-black italic uppercase tracking-wider text-white font-sans flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#CCFF00]" /> Choose Shipping Option
              </h3>

              <div className="space-y-3">
                <div
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    shippingMethod === 'express'
                      ? 'bg-[#0A0A0B] border-[#CCFF00] text-white shadow-md'
                      : 'bg-[#0A0A0B] border-zinc-800 text-zinc-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm font-sans flex items-center gap-2">
                      <span>Otaku Express Air (Collector Box)</span>
                      <span className="bg-zinc-900 text-[#CCFF00] text-[9px] font-mono px-2 py-0.5 rounded border border-zinc-800 font-bold">
                        RECOMMENDED FOR RESIN
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Triple-layered bubble wrap + corner foam guard. Delivered in 3-5 business days.
                    </p>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#CCFF00]">
                    {cartSubtotalUSD >= 120 ? 'FREE' : '$15.00'}
                  </span>
                </div>

                <div
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    shippingMethod === 'standard'
                      ? 'bg-[#0A0A0B] border-[#CCFF00] text-white shadow-md'
                      : 'bg-[#0A0A0B] border-zinc-800 text-zinc-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm font-sans">Standard Insured Air Mail</div>
                    <p className="text-xs text-zinc-400">
                      Delivered in 7-10 business days with standard tracking.
                    </p>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#CCFF00]">FREE</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-3 rounded-xl text-xs uppercase font-mono"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#CCFF00] hover:bg-[#bce600] text-black font-black py-3 rounded-xl text-xs uppercase font-mono tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <form onSubmit={handleCompleteOrder} className="space-y-5">
              <h3 className="text-sm font-black italic uppercase tracking-wider text-white font-sans flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#CCFF00]" /> Payment &amp; Review
              </h3>

              {/* Payment Type Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold border transition-colors flex items-center justify-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'bg-[#CCFF00] border-[#CCFF00] text-black font-black'
                      : 'bg-[#0A0A0B] border-zinc-800 text-zinc-400'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 shrink-0" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
                    paymentMethod === 'applepay'
                      ? 'bg-[#CCFF00] border-[#CCFF00] text-black font-black'
                      : 'bg-[#0A0A0B] border-zinc-800 text-zinc-400'
                  }`}
                >
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('klarna')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
                    paymentMethod === 'klarna'
                      ? 'bg-[#CCFF00] border-[#CCFF00] text-black font-black'
                      : 'bg-[#0A0A0B] border-zinc-800 text-zinc-400'
                  }`}
                >
                  Klarna 4x
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold border transition-colors flex items-center justify-center gap-1 ${
                    paymentMethod === 'crypto'
                      ? 'bg-[#CCFF00] border-[#CCFF00] text-black font-black'
                      : 'bg-[#0A0A0B] border-zinc-800 text-zinc-400'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>Crypto Web3</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-[#0A0A0B] p-4 rounded-2xl border border-zinc-800 text-xs">
                  <div className="space-y-1">
                    <label className="font-mono text-zinc-400 text-[10px] uppercase font-bold">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#0E0E10] border border-zinc-800 rounded-xl px-3.5 py-2 text-white font-mono focus:border-[#CCFF00] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-mono text-zinc-400 text-[10px] uppercase font-bold">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#0E0E10] border border-zinc-800 rounded-xl px-3.5 py-2 text-white font-mono focus:border-[#CCFF00] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-zinc-400 text-[10px] uppercase font-bold">
                        CVC Security Code
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#0E0E10] border border-zinc-800 rounded-xl px-3.5 py-2 text-white font-mono focus:border-[#CCFF00] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Crypto Web3 Inputs & QR Code */}
              {paymentMethod === 'crypto' && (
                <div className="space-y-4 bg-[#0A0A0B] p-4 sm:p-5 rounded-2xl border border-zinc-800 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold uppercase text-xs flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-[#CCFF00]" /> Select Crypto Currency:
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">Instant Block Verification</span>
                  </div>

                  {/* Coin selector */}
                  <div className="grid grid-cols-4 gap-2">
                    {(['USDT', 'SOL', 'BTC', 'ETH'] as const).map((coin) => (
                      <button
                        key={coin}
                        type="button"
                        onClick={() => setSelectedCrypto(coin)}
                        className={`py-2 px-3 rounded-xl font-black text-xs border transition-all ${
                          selectedCrypto === coin
                            ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                            : 'bg-[#0E0E10] text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {coin}
                      </button>
                    ))}
                  </div>

                  {/* QR Code & Deposit Address Box */}
                  <div className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                    {/* Simulated SVG QR Code */}
                    <div className="w-28 h-28 bg-white p-2 rounded-xl shrink-0 flex items-center justify-center shadow-lg relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                        <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                        <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                        <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                        <rect x="40" y="10" width="10" height="20" />
                        <rect x="10" y="40" width="20" height="10" />
                        <rect x="40" y="40" width="20" height="20" />
                        <rect x="70" y="40" width="20" height="10" />
                        <rect x="40" y="70" width="10" height="20" />
                        <rect x="60" y="70" width="30" height="10" />
                        <rect x="80" y="80" width="10" height="10" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="bg-[#CCFF00] text-black text-[8px] font-black px-1 rounded shadow">
                          {selectedCrypto}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 min-w-0 w-full">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-zinc-400">Exact Payable Amount:</span>
                        <strong className="text-[#CCFF00] text-sm font-black">{getCryptoAmount()}</strong>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                          Vault Deposit Address ({selectedCrypto})
                        </span>
                        <div className="flex items-center gap-2 bg-[#0A0A0B] border border-zinc-800 rounded-xl p-2">
                          <input
                            type="text"
                            readOnly
                            value={CRYPTO_ADDRESSES[selectedCrypto]}
                            className="bg-transparent text-[11px] font-mono text-zinc-300 w-full focus:outline-none truncate"
                          />
                          <button
                            type="button"
                            onClick={handleCopyCryptoAddress}
                            className="bg-[#CCFF00] hover:bg-[#bce600] text-black p-1.5 rounded-lg shrink-0 font-bold"
                            title="Copy Deposit Address"
                          >
                            {copiedCryptoAddress ? (
                              <Check className="w-3.5 h-3.5 text-black" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-black" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <label className="text-[10px] text-zinc-500 uppercase font-bold block">
                          Transaction Hash / TXID (Optional Verification)
                        </label>
                        <input
                          type="text"
                          value={txHashInput}
                          onChange={(e) => setTxHashInput(e.target.value)}
                          placeholder="e.g. 0x8a92f002..."
                          className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl p-2 text-[11px] text-white focus:outline-none focus:border-[#CCFF00]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Promo Coupon Quick Apply Bar */}
              <div className="bg-[#0A0A0B] p-3.5 rounded-2xl border border-zinc-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <Ticket className="w-4 h-4 text-[#CCFF00]" /> Promo Coupons Available:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCouponModalOpen(true)}
                    className="text-[#CCFF00] text-[10px] underline font-bold"
                  >
                    View All Coupons
                  </button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {(['DRIP10', 'OTAKU20', 'PANEL15', 'RESIN30', 'FREESHIP'] as const).map((code) => {
                    const isSelected = appliedPromoCode === code;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => applyPromoCode(code)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                            : 'bg-[#0E0E10] text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {isSelected ? `✓ ${code}` : `+ ${code}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Totals Summary */}
              <div className="bg-[#0A0A0B] p-4 rounded-2xl border border-zinc-800 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(cartSubtotalUSD)}</span>
                </div>
                {cartDiscountUSD > 0 && (
                  <div className="flex justify-between text-[#CCFF00]">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping Fee</span>
                  <span>{shippingFeeUSD === 0 ? 'FREE' : formatPrice(shippingFeeUSD)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Tax (8%)</span>
                  <span>{formatPrice(taxUSD)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>Grand Total</span>
                  <span className="text-[#CCFF00] font-mono">{formatPrice(grandTotalUSD)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-3 rounded-xl text-xs uppercase font-mono"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#CCFF00] hover:bg-[#bce600] text-black font-black py-3.5 rounded-xl text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Lock className="w-4 h-4 text-black" />
                  <span>
                    {paymentMethod === 'crypto'
                      ? `Pay With ${selectedCrypto} (${getCryptoAmount()})`
                      : `Confirm Order (${formatPrice(grandTotalUSD)})`}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: ORDER CONFIRMATION */}
          {step === 4 && completedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-[#0A0A0B] text-[#CCFF00] rounded-full flex items-center justify-center mx-auto border border-[#CCFF00] shadow-xl">
                <CheckCircle className="w-8 h-8 text-[#CCFF00]" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest block font-bold">
                  // ORDER CONFIRMED &amp; DISPATCHED
                </span>
                <h3 className="text-2xl font-black italic text-white uppercase font-sans">
                  THANK YOU FOR YOUR ORDER!
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  Order ID: <strong className="text-[#CCFF00]">{completedOrder.orderId}</strong>
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-5 text-left text-xs font-mono space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">Delivery Address:</span>
                  <span className="text-white font-bold">{completedOrder.shippingAddress.fullName}</span>
                </div>
                <p className="text-zinc-300">
                  {completedOrder.shippingAddress.address}, {completedOrder.shippingAddress.city},{' '}
                  {completedOrder.shippingAddress.postalCode}
                </p>

                <div className="pt-2 border-t border-zinc-800 space-y-2">
                  <span className="text-zinc-400 uppercase text-[10px] block font-bold">Items Purchased:</span>
                  {completedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-zinc-300">
                      <span className="truncate max-w-[240px]">
                        {it.quantity}x {it.product.title} {it.selectedSize ? `(${it.selectedSize})` : ''}
                      </span>
                      <span className="font-bold text-white">
                        {formatPrice(it.product.priceUSD * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-800 flex justify-between items-center font-bold text-white">
                  <span>Payment Method:</span>
                  <span className="text-zinc-300 text-[11px] font-mono">{completedOrder.paymentMethod}</span>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-white">
                  <span>Total Paid:</span>
                  <span className="text-[#CCFF00] text-sm">{formatPrice(completedOrder.totalUSD)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    openOrderTracking(completedOrder.orderId);
                  }}
                  className="w-full sm:w-auto bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase font-mono tracking-wider shadow-md flex items-center justify-center gap-2"
                >
                  <PackageCheck className="w-4 h-4 text-black" />
                  <span>Track Your Order</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto bg-[#0A0A0B] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-4 py-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase font-mono tracking-wider"
                >
                  Back to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
