"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Price from "./Price";

export default function OfferRow() {
  return (
    <section className="py-12 bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-700 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
            <Zap size={32} className="fill-white" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic">Limited Time Deal!</h3>
            <p className="text-white/80 font-medium tracking-tight">Get the Aero Laptop Backpack for only <Price amount={5999} className="text-white font-black underline decoration-2 underline-offset-4" /> (Original Price: ₹7,499)</p>
          </div>
        </div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-white text-[var(--color-brand-orange)] px-10 py-4 rounded-full font-black text-lg uppercase shadow-2xl cursor-pointer hover:bg-black hover:text-white transition-all"
          onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Claim Offer Now
        </motion.div>
      </div>
    </section>
  );
}
