import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  PackageCheck,
  Search,
  X,
  Truck,
  CheckCircle2,
  Clock,
  Plane,
  ShieldCheck,
  Box,
  Copy,
  Check,
  ExternalLink,
  HelpCircle,
  MapPin
} from 'lucide-react';

interface TrackingStage {
  title: string;
  subtitle: string;
  timestamp: string;
  location: string;
  completed: boolean;
  current: boolean;
}

export const OrderTrackingModal: React.FC = () => {
  const {
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,
    trackingOrderId,
    setTrackingOrderId,
    orders,
    formatPrice
  } = useShop();

  const [inputSearchId, setInputSearchId] = useState(trackingOrderId || '');
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isOrderTrackingOpen) return null;

  // Find order in local order history or generate default simulated order for demo
  const matchedOrder = orders.find(
    (o) => o.orderId.toLowerCase() === (inputSearchId || trackingOrderId || '').toLowerCase()
  );

  const activeId = matchedOrder?.orderId || inputSearchId || trackingOrderId || 'PD-2026-9901';

  const defaultMockItems = matchedOrder ? matchedOrder.items : [
    {
      product: {
        id: 'prod-001',
        title: 'Cyber-Valkyrie EX 1/7 Scale Resin Statue',
        subtitle: 'NEXUS STUDIOS x PANEL & DRIP EXCLUSIVE',
        category: 'resin-statues' as const,
        subcategory: '1/7 Scale Resin',
        franchise: 'Cyberpunk Neo-Tokyo',
        priceUSD: 489.99,
        rating: 4.95,
        reviewCount: 38,
        images: ['/src/assets/images/resin_statue_highlight_1785684292437.jpg'],
        description: 'Museum grade resin statue with LED base',
        specs: [],
        stockCount: 4,
        tags: []
      },
      selectedSize: 'Deluxe EX LED Base Edition',
      quantity: 1
    }
  ];

  const totalUSD = matchedOrder ? matchedOrder.totalUSD : 489.99;
  const shippingMethodName = matchedOrder ? matchedOrder.shippingMethod : 'Otaku Air Collector Express';

  const stages: TrackingStage[] = [
    {
      title: 'Order Confirmed & Paid',
      subtitle: 'Payment verified & allocated from Akihabara vault',
      timestamp: 'Aug 01, 2026 - 10:14 AM',
      location: 'Tokyo Akihabara Hub',
      completed: true,
      current: false
    },
    {
      title: 'Collector Packaging & Inspection',
      subtitle: 'Laser-cut foam, bubble wrap, & COA certificate sealed',
      timestamp: 'Aug 01, 2026 - 03:45 PM',
      location: 'Panel & Drip Vault 03',
      completed: true,
      current: false
    },
    {
      title: 'Customs Clearance & Air Manifest',
      subtitle: 'Cleared export customs & assigned air courier flight',
      timestamp: 'Aug 02, 2026 - 06:20 AM',
      location: 'Haneda International Airport (HND)',
      completed: true,
      current: true
    },
    {
      title: 'In Transit (International Flight)',
      subtitle: 'Otaku Air Express Cargo Flight #PD-882',
      timestamp: 'Estimated: Aug 03, 2026',
      location: 'Pacific Air Corridor',
      completed: false,
      current: false
    },
    {
      title: 'Out For Delivery & Unboxed',
      subtitle: 'Signature required upon delivery',
      timestamp: 'Estimated: Aug 04, 2026',
      location: matchedOrder ? `${matchedOrder.shippingAddress.city}, ${matchedOrder.shippingAddress.postalCode}` : 'Destination Doorstep',
      completed: false,
      current: false
    }
  ];

  const handleCopyTrackingCode = () => {
    navigator.clipboard.writeText(`TRACK-${activeId}`);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0E0E10] border border-zinc-800 rounded-3xl max-w-3xl w-full text-zinc-100 relative shadow-2xl overflow-hidden my-auto p-6 sm:p-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#CCFF00] text-black flex items-center justify-center font-black">
              <PackageCheck className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase font-sans tracking-tight text-white flex items-center gap-2">
                COLLECTOR ORDER TRACKING
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Real-time Otaku Express Air logistics &amp; resin vault progress
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar for Order ID */}
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={inputSearchId}
              onChange={(e) => setInputSearchId(e.target.value)}
              placeholder="Enter Order ID (e.g. PD-2026-9901)..."
              className="w-full bg-[#0A0A0B] border border-zinc-800 rounded-xl pl-10 pr-24 py-3 text-xs text-white font-mono uppercase focus:outline-none focus:border-[#CCFF00]"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              onClick={() => setTrackingOrderId(inputSearchId)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#CCFF00] hover:bg-[#bce600] text-black font-black text-xs px-3 py-1.5 rounded-lg uppercase"
            >
              Track
            </button>
          </div>

          {/* Quick Order Selection Chips */}
          {orders.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono pt-1">
              <span className="text-zinc-500 text-[10px] uppercase shrink-0">Your Past Orders:</span>
              {orders.map((ord) => (
                <button
                  key={ord.orderId}
                  onClick={() => {
                    setInputSearchId(ord.orderId);
                    setTrackingOrderId(ord.orderId);
                  }}
                  className={`px-2.5 py-1 rounded border shrink-0 transition-colors ${
                    activeId === ord.orderId
                      ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-black'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  {ord.orderId}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order Info Summary Card */}
        <div className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">
                Tracking Number
              </span>
              <div className="flex items-center gap-2">
                <span className="text-base font-black font-mono text-[#CCFF00]">{activeId}</span>
                <button
                  onClick={handleCopyTrackingCode}
                  className="p-1 hover:text-[#CCFF00] text-zinc-400"
                  title="Copy Tracking Number"
                >
                  {copiedTracking ? <Check className="w-4 h-4 text-[#CCFF00]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">
                Estimated Delivery
              </span>
              <span className="text-sm font-black text-white font-mono flex items-center gap-1 sm:justify-end">
                <Clock className="w-4 h-4 text-[#CCFF00]" />
                August 04, 2026 (2 Days Away)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block">Carrier</span>
              <span className="text-white font-bold flex items-center gap-1">
                <Plane className="w-3.5 h-3.5 text-[#CCFF00]" /> {shippingMethodName}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block">Collector Box</span>
              <span className="text-white font-bold flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-[#CCFF00]" /> Triple-Layer Foam
              </span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block">Insurance</span>
              <span className="text-white font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" /> 100% Value Guarantee
              </span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block">Total Value</span>
              <span className="text-[#CCFF00] font-black">{formatPrice(totalUSD)}</span>
            </div>
          </div>
        </div>

        {/* Tracking Progress Timeline */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-mono font-bold text-[#CCFF00] uppercase tracking-widest flex items-center gap-1.5">
            <Truck className="w-4 h-4" /> // LOGISTICS TIMELINE STATUS
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
            {stages.map((stage, idx) => (
              <div key={idx} className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                {/* Status Dot */}
                <div
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    stage.completed
                      ? 'bg-[#CCFF00] border-[#CCFF00] text-black'
                      : stage.current
                      ? 'bg-[#0E0E10] border-[#CCFF00] text-[#CCFF00] animate-pulse'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                  }`}
                >
                  {stage.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  )}
                </div>

                {/* Stage Info */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-xs font-bold font-sans uppercase ${
                        stage.completed || stage.current ? 'text-white' : 'text-zinc-500'
                      }`}
                    >
                      {stage.title}
                    </h4>
                    {stage.current && (
                      <span className="bg-[#CCFF00] text-black text-[9px] font-mono font-black px-2 py-0.5 rounded animate-bounce">
                        CURRENT STEP
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans">{stage.subtitle}</p>
                </div>

                {/* Timestamp & Location */}
                <div className="text-right sm:text-right text-[11px] font-mono text-zinc-400 shrink-0">
                  <div className="text-zinc-300 font-bold">{stage.timestamp}</div>
                  <div className="flex items-center gap-1 justify-end text-zinc-500">
                    <MapPin className="w-3 h-3 text-[#CCFF00]" /> {stage.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Contents Accordion */}
        <div className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block">
            Shipment Manifest Items ({defaultMockItems.length}):
          </span>
          <div className="space-y-2">
            {defaultMockItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-10 h-10 object-cover rounded-lg bg-zinc-900 border border-zinc-800"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-white truncate">{item.product.title}</h5>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Qty: {item.quantity} {item.selectedSize ? `| Option: ${item.selectedSize}` : ''}
                  </p>
                </div>
                <span className="font-mono font-bold text-white text-xs">
                  {formatPrice(item.product.priceUSD * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href="mailto:support@paneldrip.com"
            className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-[#CCFF00]" /> Need help with your resin shipment?
          </a>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="w-full sm:w-auto bg-[#CCFF00] hover:bg-[#bce600] text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase font-mono tracking-wider shadow"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
