import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#0E0E10] border border-[#CCFF00]/80 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce font-sans text-xs sm:text-sm font-bold max-w-md backdrop-blur-md">
      <div className="w-8 h-8 rounded-xl bg-[#CCFF00] flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4 text-black" />
      </div>
      <span>{toastMessage}</span>
    </div>
  );
};
