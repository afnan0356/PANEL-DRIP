import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Truck,
  Tag,
  CheckCircle,
  FileText,
  Ticket
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotalUSD,
    cartDiscountUSD,
    cartTotalUSD,
    appliedPromoCode,
    applyPromoCode,
    removePromoCode,
    formatPrice,
    setIsCheckoutOpen,
    setIsCouponModalOpen
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);
  const [orderNote, setOrderNote] = useState('');
  const [showNoteField, setShowNoteField] = useState(false);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD_USD = 120;
  const progressPercent = Math.min(100, (cartSubtotalUSD / FREE_SHIPPING_THRESHOLD_USD) * 100);
  const amountNeededForFreeShippingUSD = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - cartSubtotalUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ success: res.success, text: res.message });
    if (res.success) setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E0E10] border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#CCFF00]" />
              <h2 className="text-lg font-black italic uppercase font-sans tracking-tight">
                YOUR OTAKU DRIP CART
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#0A0A0B] border-b border-zinc-800 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-4 h-4 text-[#CCFF00]" />
                {amountNeededForFreeShippingUSD > 0
                  ? `Add ${formatPrice(amountNeededForFreeShippingUSD)} more for FREE Express Air!`
                  : '🎉 YOU UNLOCKED FREE EXPRESS AIR SHIPPING!'}
              </span>
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#CCFF00] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length > 0 ? (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || 'std'}-${idx}`}
                  className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-3.5 flex gap-3 relative group hover:border-zinc-700 transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-xl bg-zinc-900 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#CCFF00] uppercase tracking-widest block truncate">
                        {item.product.franchise}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 font-sans">
                        {item.product.title}
                      </h4>
                      {item.selectedSize && (
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded inline-block mt-1">
                          Option: {item.selectedSize}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-black font-mono text-white">
                        {formatPrice(item.product.priceUSD * item.quantity)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center bg-[#0E0E10] border border-zinc-800 rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, -1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-mono text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Item Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    className="text-zinc-500 hover:text-[#CCFF00] p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              /* Empty Cart State */
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 bg-[#0A0A0B] rounded-full flex items-center justify-center mx-auto text-zinc-500 border border-zinc-800">
                  <ShoppingBag className="w-8 h-8 text-[#CCFF00]" />
                </div>
                <h3 className="text-base font-black italic text-white uppercase font-sans">
                  Your cart is empty
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Explore resin figures, 450 GSM streetwear hoodies, and manga box sets to fill your drip setup.
                </p>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-[#0A0A0B] space-y-4">
              
              {/* Promo Code Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Have a Coupon Code?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCouponModalOpen(true);
                    }}
                    className="text-[#CCFF00] text-[10px] font-mono underline font-bold flex items-center gap-1"
                  >
                    <Ticket className="w-3 h-3 text-[#CCFF00]" />
                    <span>View All Coupons</span>
                  </button>
                </div>

                {appliedPromoCode ? (
                  <div className="bg-zinc-900 border border-[#CCFF00]/40 rounded-xl p-2.5 flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[#CCFF00] font-bold">
                      <Tag className="w-4 h-4" /> PROMO '{appliedPromoCode}' APPLIED!
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-zinc-400 hover:text-white text-[10px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (DRIP10, OTAKU20)"
                      className="flex-1 bg-[#0E0E10] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-[#CCFF00]"
                    />
                    <button
                      type="submit"
                      className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase font-mono"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <p
                    className={`text-[11px] font-mono ${
                      promoMessage.success ? 'text-[#CCFF00]' : 'text-red-400'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Order Note Field Toggle */}
              <div>
                <button
                  onClick={() => setShowNoteField(!showNoteField)}
                  className="text-[11px] font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1 underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{showNoteField ? 'Hide Order Instructions' : 'Add Order / Packing Note'}</span>
                </button>
                {showNoteField && (
                  <textarea
                    rows={2}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="e.g., Please double bubble-wrap the resin box for collector protection..."
                    className="w-full mt-2 bg-[#0E0E10] border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-zinc-800">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">{formatPrice(cartSubtotalUSD)}</span>
                </div>
                {cartDiscountUSD > 0 && (
                  <div className="flex justify-between text-[#CCFF00] font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(cartDiscountUSD)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span>
                    {amountNeededForFreeShippingUSD === 0 ? (
                      <strong className="text-[#CCFF00]">FREE</strong>
                    ) : (
                      'Calculated at checkout'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-[#CCFF00] font-mono">{formatPrice(cartTotalUSD)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#CCFF00] hover:bg-[#bce600] text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
