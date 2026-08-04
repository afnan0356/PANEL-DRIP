import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import {
  Mail,
  MessageSquare,
  Phone,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  CheckCircle2,
  Headphones,
  FileText
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { showToast, openOrderTracking, navigateToView } = useShop();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    orderId: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      showToast('Please fill out all required fields');
      return;
    }
    setSubmitted(true);
    showToast('Support ticket submitted! Ticket #' + Math.floor(100000 + Math.random() * 900000));
  };

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      orderId: '',
      category: 'General Inquiry',
      subject: '',
      message: ''
    });
    setSubmitted(false);
  };

  const contactFaqs = [
    {
      q: 'How fast does customer support respond?',
      a: 'Our otaku support team operates 24/7 across Tokyo, Los Angeles, and Frankfurt timezones. Typical email response time is under 2 hours.'
    },
    {
      q: 'Can I modify or cancel my order after placing it?',
      a: 'Yes, orders can be modified or cancelled within 4 hours of placement before our automated warehouse dispatch system assigns shipping tracking.'
    },
    {
      q: 'Are high-carbon steel katanas legal to ship to my country?',
      a: 'We ship dull display replica katanas globally under customs tariff code 9506.99. If your local region restricts blunt display blades, our team will notify you prior to billing.'
    },
    {
      q: 'What is your refund policy for resin statues damaged in transit?',
      a: 'All resin statue shipments carry 100% transit insurance. If any piece arrives damaged, simply submit photos within 48 hours for immediate replacement or full refund.'
    }
  ];

  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen pb-20 font-sans">
      {/* Header Banner */}
      <div className="relative border-b border-zinc-800 bg-[#0A0A0B] overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#0E0E10] border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            <Headphones className="w-3.5 h-3.5 text-amber-400" />
            <span>24/7 OTARU CONCIERGE SUPPORT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono uppercase tracking-tight">
            GET IN TOUCH WITH THE <span className="text-amber-400">VAULT TEAM</span>
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Have a question about a 1/7 scale resin drop, custom katana blade specifications, tracking an order, or digital gift cards? Our dedicated support team is here to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-6 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">Email Support</h3>
            <p className="text-xs text-zinc-400">Direct assistance for order inquiries & product specs.</p>
            <a
              href="mailto:support@paneldrip.com"
              className="inline-block text-xs font-mono font-bold text-amber-400 hover:underline"
            >
              support@paneldrip.com
            </a>
          </div>

          <div className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-6 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">Live Chat & Concierge</h3>
            <p className="text-xs text-zinc-400">Instant response time via VIP Otaku Live Chat.</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Agents Online Now
            </span>
          </div>

          <div className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-6 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono">Global Fulfillment</h3>
            <p className="text-xs text-zinc-400">Tokyo / Frankfurt / Los Angeles Hubs.</p>
            <span className="text-xs font-mono font-bold text-zinc-300">
              Orders Processed Mon - Sun
            </span>
          </div>
        </div>

        {/* Main Form + FAQ split section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#0A0A0B] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div>
                <h2 className="text-xl font-black text-white font-mono uppercase">Submit Support Ticket</h2>
                <p className="text-xs text-zinc-400 mt-1">Fill out the form below and we will respond within 2 hours.</p>
              </div>
              <button
                onClick={() => openOrderTracking()}
                className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:underline bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl"
              >
                <Truck className="w-3.5 h-3.5" /> Track Order
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white font-mono uppercase">Ticket Received!</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Thank you for reaching out. A confirmation has been logged with our support system. An otaku specialist will email you shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl uppercase font-mono tracking-wider transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Kenji Sato"
                      className="w-full bg-[#121214] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="kenji@domain.com"
                      className="w-full bg-[#121214] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full bg-[#121214] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Tracking">Order Tracking & Delivery</option>
                      <option value="Resin Statue Pre-Orders">Resin Statue Pre-Orders</option>
                      <option value="Katana Shipping Regulations">Katana Shipping Regulations</option>
                      <option value="Returns & Refunds">Returns & Refunds</option>
                      <option value="Digital Gift Cards">Digital Gift Cards</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                      Order ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formState.orderId}
                      onChange={(e) => setFormState({ ...formState, orderId: e.target.value })}
                      placeholder="e.g. ORD-982341"
                      className="w-full bg-[#121214] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Brief description of your query"
                    className="w-full bg-[#121214] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Provide as much detail as possible so we can help you right away..."
                    className="w-full bg-[#121214] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black uppercase font-mono tracking-wider text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Submit Support Ticket
                </button>
              </form>
            )}
          </div>

          {/* Quick FAQ Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0A0A0B] border border-zinc-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-black text-white font-mono uppercase flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" /> Support FAQ
              </h3>

              <div className="space-y-3">
                {contactFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="bg-[#121214] border border-zinc-800/80 rounded-xl p-3.5 cursor-pointer hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
                      )}
                    </div>
                    {openFaq === idx && (
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-2">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-neutral-900 to-amber-950/30 border border-amber-500/20 rounded-3xl p-6 space-y-3">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
              <h4 className="text-sm font-bold text-white font-mono uppercase">100% Authentic Guarantee</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All scale resin statues, figures, and merchandise are 100% officially licensed. Every katana features authentic high-carbon steel construction.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => navigateToView('terms')}
                  className="text-xs font-mono text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" /> Terms & Rules
                </button>
                <button
                  onClick={() => navigateToView('privacy')}
                  className="text-xs font-mono text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
