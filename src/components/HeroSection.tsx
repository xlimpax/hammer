"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMessageStore } from "@/store/useMessageStore";

export default function HeroSection() {
  const { heroBadge } = useMessageStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden bg-[var(--color-brand-dark)]">
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-dark)] via-[var(--color-brand-dark)] to-[#1a0e0a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand-orange)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-10 pt-10">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left mt-12 md:mt-0">
          {isMounted && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                backgroundColor: ["rgba(255, 87, 34, 0.1)", "rgba(255, 87, 34, 0.4)", "rgba(255, 87, 34, 0.1)"],
              }}
              transition={{ 
                duration: 2, 
                backgroundColor: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              }}
              className="inline-flex items-center gap-2 border border-[var(--color-brand-orange)]/30 text-white px-5 py-2.5 rounded-full w-fit mx-auto md:mx-0 font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,87,34,0.1)]"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-orange)] shadow-[0_0_10px_var(--color-brand-orange)] animate-ping" />
              {heroBadge}
            </motion.div>
          )}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white"
          >
            Premium Bags <br/>
            For <span className="text-[var(--color-brand-orange)]">Everyday Life</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-400 max-w-lg mx-auto md:mx-0 font-light"
          >
            Carry Power. Carry HAMMER. Discover our exclusive collection of bags crafted for durability, comfort, and unparalleled style.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mt-6"
          >
            <button 
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-[var(--color-brand-orange)] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#e64a19] transition-all shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)]"
            >
              Shop Now
            </button>
            <button 
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/5 transition-all"
            >
              Explore Bags
            </button>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative flex items-center justify-center mt-12 md:mt-0"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-lg aspect-square"
          >
            <Image 
              src="/images/hero.png" 
              alt="Premium HAMMER Bag" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
              priority
            />
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
