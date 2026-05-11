"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus, MessageCircle, ChevronRight } from "lucide-react";
import { useMessageStore } from "@/store/useMessageStore";
import Link from "next/link";

export default function FAQPage() {
  const { faqs } = useMessageStore();
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] pt-32 pb-24 text-[var(--color-brand-white)]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle size={16} /> Support Center
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            Frequently Asked <br/> <span className="text-[var(--color-brand-orange)]">Questions</span>
          </h1>
          <p className="text-[var(--color-brand-light)] max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Have a question? We're here to help. Explore our FAQs or reach out to our team.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-[32px] border transition-all duration-500 overflow-hidden ${openIndex === i ? 'border-[var(--color-brand-orange)]/50 bg-white/[0.03]' : 'border-white/5 bg-transparent'}`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-8 flex items-center justify-between text-left group"
                >
                  <span className={`text-xl font-bold transition-colors ${openIndex === i ? 'text-[var(--color-brand-orange)]' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-[var(--color-brand-orange)] text-white rotate-180' : 'bg-white/5 text-[var(--color-brand-light)]'}`}>
                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 text-[var(--color-brand-light)] text-lg leading-relaxed border-t border-white/5 pt-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Still Need Help? */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 glass p-12 rounded-[40px] border border-white/10 text-center bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-transparent"
          >
            <div className="w-16 h-16 rounded-3xl bg-[var(--color-brand-orange)] flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-orange-900/40">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Still have questions?</h2>
            <p className="text-[var(--color-brand-light)] mb-8 max-w-md mx-auto">
              If you couldn't find what you were looking for, our support team is available 10 AM - 6 PM.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="bg-white text-black font-black px-10 py-5 rounded-2xl uppercase tracking-widest text-xs hover:bg-[var(--color-brand-orange)] hover:text-white transition-all w-full md:w-auto">
                Email Support
              </Link>
              <a href="https://wa.me/919903747606" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-black px-10 py-5 rounded-2xl uppercase tracking-widest text-xs hover:bg-[#25D366] hover:text-white transition-all w-full md:w-auto flex items-center justify-center gap-2">
                WhatsApp Us <ChevronRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Back Link */}
        <div className="mt-20 text-center">
          <Link href="/" className="text-[var(--color-brand-orange)] font-bold uppercase tracking-widest text-sm hover:underline underline-offset-8">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
