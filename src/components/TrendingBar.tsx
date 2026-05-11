"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Flame, Star } from "lucide-react";
import { useMessageStore } from "@/store/useMessageStore";

export default function TrendingBar() {
  const { trending } = useMessageStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md text-white border-t border-white/10 py-3 z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-6 overflow-hidden">
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-20 whitespace-nowrap"
        >
          {trending.map((msg, i) => (
            <div key={i} className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] text-[var(--color-brand-orange)]">
              {i % 2 === 0 ? <TrendingUp size={16} /> : <Flame size={16} className="text-orange-500" />}
              {msg}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
