import React, { useState } from 'react';
import { Sparkles, Mail, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, FileText, Lock, Info, Ticket, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateToView, openOrderTracking, setSelectedCategory, scrollToProductGrid } = useShop();
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubmitted(true);
      setEmailInput('');
    }
  };

  const faqs = [
    {
      q: 'Are your 1/7 resin statues and S.H.Figuarts 100% official and authentic?',
      a: 'Yes, 100%. PANEL & DRIP only partners directly with officially licensed studios (Nexus Studios, Good Smile Company, Bandai Spirits, Kadokawa). Every scale statue arrives with holographic license seals and certificate of authenticity.'
    },
    {
      q: 'How heavy is your heavy-cotton streetwear apparel?',
      a: 'Our graphic tees are crafted from ultra-heavyweight 450 GSM organic combed cotton, and our hoodies are 500 GSM winter fleece. Both feature dropped shoulder cuts engineered for Gen Z streetwear silhouettes.'
    },
    {
      q: 'How are fragile resin statues packaged for shipping?',
      a: 'Resin statues are packed inside custom laser-cut dense foam cells, placed in magnetic collector boxes, and shipped inside triple-wall bubble-wrapped outer shipping cartons with fragile insurance.'
    },
    {
      q: 'Are your cosplay costume sets gender-inclusive?',
      a: 'Yes! All costume sets feature gender-neutral sizing with hidden elastic waist cinches and stretch inner linings designed to comfortably fit all subculture dressers.'
    }
  ];

  return (
    <footer className="bg-[#0A0A0B] text-zinc-400 border-t border-zinc-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Newsletter Banner */}
        <div className="bg-[#0E0E10] border border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/5 blur-3xl rounded-full pointer-events-none" />
          <div className="space-y-2 text-center md:text-left max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 text-[#CCFF00] font-mono text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              <span>JOIN THE INNER DRIP CIRCLE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black italic text-white uppercase font-sans tracking-tight">
              GET 10% OFF YOUR FIRST DROP
            </h3>
            <p className="text-xs text-zinc-300">
              Subscribe for early access allocations on 1/7 scale resin statues, limited streetwear restocks, and exclusive con discount codes.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px] relative z-10">
            {newsletterSubmitted ? (
              <div className="bg-zinc-900 border border-[#CCFF00]/50 text-[#CCFF00] p-4 rounded-2xl text-center text-xs font-mono font-bold">
                🎉 Welcome to the Drip Circle! Use code <strong className="text-white font-black underline">DRIP10</strong> at checkout for 10% OFF!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email address..."
                    className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-5 py-3 rounded-xl text-xs uppercase font-mono tracking-wider shrink-0 shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-black italic text-white uppercase font-sans tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#CCFF00]" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0E0E10] border border-zinc-800 rounded-2xl p-4 cursor-pointer transition-all hover:border-[#CCFF00]/50"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex justify-between items-center text-xs font-bold text-white font-sans">
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#CCFF00] shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
                  )}
                </div>

                {openFaq === idx && (
                  <p className="mt-3 text-xs text-zinc-300 font-sans leading-relaxed border-t border-zinc-800/80 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation Columns & Brand Bar */}
        <div className="pt-8 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-mono">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#CCFF00] text-black font-black text-sm rounded flex items-center justify-center">
                P&amp;D
              </div>
              <span className="text-white font-black italic tracking-widest uppercase">PANEL &amp; DRIP</span>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              Where anime culture meets high-end streetwear, museum-grade resin statues, replica steel katanas, and instant digital vouchers.
            </p>
            <span className="block text-zinc-600 text-[10px]">© 2026 PANEL &amp; DRIP. All Rights Reserved.</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-sans">Brand &amp; Story</h4>
            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
              <li>
                <button onClick={() => navigateToView('about')} className="hover:text-[#CCFF00] transition-colors">
                  • About Us &amp; Our Vision
                </button>
              </li>
              <li>
                <button onClick={() => navigateToView('terms')} className="hover:text-[#CCFF00] transition-colors">
                  • Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateToView('privacy')} className="hover:text-[#CCFF00] transition-colors">
                  • Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-sans">Digital &amp; Collections</h4>
            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
              <li>
                <button onClick={() => navigateToView('gift-cards')} className="hover:text-[#CCFF00] text-amber-400 font-bold transition-colors">
                  🎟️ Gift Cards &amp; Vouchers
                </button>
              </li>
              <li>
                <button onClick={() => { navigateToView('shop'); setSelectedCategory('katanas'); scrollToProductGrid(); }} className="hover:text-[#CCFF00] transition-colors">
                  ⚔️ Replica Katanas
                </button>
              </li>
              <li>
                <button onClick={() => { navigateToView('shop'); setSelectedCategory('shoes'); scrollToProductGrid(); }} className="hover:text-[#CCFF00] transition-colors">
                  👟 Streetwear Kicks
                </button>
              </li>
              <li>
                <button onClick={() => { navigateToView('shop'); setSelectedCategory('glasses'); scrollToProductGrid(); }} className="hover:text-[#CCFF00] transition-colors">
                  🕶️ Gojo Visors &amp; Glasses
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-sans">Order Help</h4>
            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
              <li>
                <button onClick={() => openOrderTracking()} className="hover:text-[#CCFF00] text-[#CCFF00] font-bold transition-colors flex items-center gap-1">
                  <Truck className="w-3 h-3" /> Track Order Status
                </button>
              </li>
              <li>
                <button onClick={() => navigateToView('terms')} className="hover:text-[#CCFF00] transition-colors">
                  • Refund &amp; Returns Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateToView('contact')} className="hover:text-[#CCFF00] transition-colors">
                  • Contact Vault Support
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};
