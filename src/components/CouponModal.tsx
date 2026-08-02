import React from 'react';
import { useShop } from '../context/ShopContext';
import { PROMO_CODES } from '../data/products';
import { Ticket, Copy, Check, X, Sparkles, ShoppingBag } from 'lucide-react';

export const CouponModal: React.FC = () => {
  const {
    isCouponModalOpen,
    setIsCouponModalOpen,
    appliedPromoCode,
    applyPromoCode,
    removePromoCode,
    cartSubtotalUSD,
    formatPrice,
    setIsCartOpen,
    showToast
  } = useShop();

  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  if (!isCouponModalOpen) return null;

  const coupons = Object.values(PROMO_CODES);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Copied coupon code ${code} to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApply = (code: string) => {
    const res = applyPromoCode(code);
    if (res.success) {
      showToast(res.message);
    } else {
      showToast(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0E0E10] border border-zinc-800 rounded-3xl max-w-xl w-full text-zinc-100 relative shadow-2xl overflow-hidden my-auto p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#CCFF00] text-black flex items-center justify-center font-black">
              <Ticket className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase font-sans tracking-tight text-white flex items-center gap-2">
                OTAKU PROMO COUPONS
                <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              </h2>
              <p className="text-xs text-zinc-400">
                Current Cart Subtotal: <strong className="text-[#CCFF00] font-mono">{formatPrice(cartSubtotalUSD)}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCouponModalOpen(false)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coupons List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {coupons.map((coupon) => {
            const isApplied = appliedPromoCode === coupon.code;
            const isEligible = !coupon.minSpendUSD || cartSubtotalUSD >= coupon.minSpendUSD;

            return (
              <div
                key={coupon.code}
                className={`bg-[#0A0A0B] border rounded-2xl p-4 transition-all relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isApplied
                    ? 'border-[#CCFF00] shadow-md shadow-[#CCFF00]/10'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Left Ticket Stub Effect */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#CCFF00] text-black text-[10px] font-mono font-black px-2.5 py-0.5 rounded uppercase">
                      {coupon.badge}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                      {coupon.expires}
                    </span>
                  </div>

                  <h3 className="text-sm font-black italic text-white uppercase font-sans tracking-wide">
                    {coupon.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {coupon.description}
                  </p>

                  {coupon.minSpendUSD && (
                    <p className={`text-[11px] font-mono ${isEligible ? 'text-zinc-400' : 'text-amber-400'}`}>
                      Min Spend: ${coupon.minSpendUSD.toFixed(2)}{' '}
                      {!isEligible && `(Add $${(coupon.minSpendUSD - cartSubtotalUSD).toFixed(2)} more)`}
                    </p>
                  )}
                </div>

                {/* Right Action Column */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 border-zinc-800 pt-3 sm:pt-0 shrink-0">
                  <div className="bg-[#0E0E10] border border-zinc-700/80 px-3 py-1.5 rounded-xl font-mono text-xs font-black text-[#CCFF00] tracking-widest">
                    {coupon.code}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl border border-zinc-800 text-xs font-mono flex items-center gap-1"
                      title="Copy Code"
                    >
                      {copiedCode === coupon.code ? (
                        <Check className="w-4 h-4 text-[#CCFF00]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {isApplied ? (
                      <button
                        onClick={removePromoCode}
                        className="bg-zinc-800 hover:bg-red-950 hover:text-red-400 text-zinc-300 px-3 py-2 rounded-xl text-xs font-mono font-bold"
                      >
                        Applied (Remove)
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApply(coupon.code)}
                        className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-3 py-2 rounded-xl text-xs uppercase font-mono shadow"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer CTA */}
        <div className="pt-2 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-mono text-zinc-500">
            Coupons automatically deduct from total in cart &amp; checkout.
          </p>
          <button
            onClick={() => {
              setIsCouponModalOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#CCFF00]" />
            <span>View Cart ({formatPrice(cartSubtotalUSD)})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
