"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 bg-[var(--color-brand-dark)]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[var(--color-brand-gray)] to-[#111] rounded-3xl p-8 md:p-16 border border-white/10 text-center relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-brand-orange)]/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Subscribe For Latest Offers</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join the HAMMER community. Get exclusive access to new drops, limited editions, and special discounts.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full sm:w-96 bg-black/50 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-white placeholder-gray-500"
                required
              />
              <button 
                type="submit" 
                className="bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white font-semibold rounded-full px-8 py-4 flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[var(--color-brand-orange)]/20 whitespace-nowrap"
              >
                Subscribe <Send size={18} />
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
