"use client";

import { motion } from "framer-motion";
import { RefreshCcw, ShieldCheck, Clock, FileText, AlertTriangle, Truck } from "lucide-react";
import Link from "next/link";
import { useMessageStore } from "@/store/useMessageStore";
import { useEffect, useState } from "react";

export default function ReturnsPolicyPage() {
  const { returnsPolicy } = useMessageStore();
  const [mounted, setMounted] = useState(false);

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
            <RefreshCcw size={16} /> Hassle-Free Returns
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase text-center">
            Returns & <br/> <span className="text-[var(--color-brand-orange)]">Exchanges</span>
          </h1>
          <p className="text-[var(--color-brand-light)] max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Not the perfect fit? Don't worry. We've made our returns and exchange process as smooth as our zippers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Policy Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 glass p-10 md:p-16 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
          >
            <div className="prose prose-invert prose-orange max-w-none">
              {/* Simple split for basic markdown rendering */}
              {returnsPolicy.split('\n').map((line, i) => {
                if (line.startsWith('### ')) return <h3 key={i} className="text-3xl font-bold mb-6 mt-10 text-white">{line.replace('### ', '')}</h3>;
                if (line.startsWith('#### ')) return <h4 key={i} className="text-xl font-bold mb-4 mt-8 text-[var(--color-brand-orange)] uppercase tracking-widest">{line.replace('#### ', '')}</h4>;
                if (line.startsWith('* ')) return <li key={i} className="text-[var(--var-color-brand-light)] mb-2 flex gap-3 ml-4"><span className="text-[var(--color-brand-orange)] mt-1">•</span> {line.replace('* ', '')}</li>;
                if (line.trim() === '') return <br key={i} />;
                
                // Bold text replacement
                const parts = line.split('**');
                return (
                  <p key={i} className="text-[var(--color-brand-light)] text-lg leading-relaxed mb-4">
                    {parts.map((part, index) => index % 2 === 1 ? <strong key={index} className="text-white font-bold">{part}</strong> : part)}
                  </p>
                );
              })}
            </div>

            <div className="mt-16 pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-[var(--color-brand-orange)]">
                  <Clock size={24} />
                </div>
                <h5 className="font-bold mb-2">7 Days</h5>
                <p className="text-xs text-[var(--color-brand-light)]">Return window from delivery date.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-[var(--color-brand-orange)]">
                  <Truck size={24} />
                </div>
                <h5 className="font-bold mb-2">Easy Pickup</h5>
                <p className="text-xs text-[var(--color-brand-light)]">Reverse logistics handled by us.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-[var(--color-brand-orange)]">
                  <ShieldCheck size={24} />
                </div>
                <h5 className="font-bold mb-2">Secure Refund</h5>
                <p className="text-xs text-[var(--color-brand-light)]">Direct to your original payment source.</p>
              </div>
            </div>
          </motion.div>

          {/* Steps / Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[var(--color-brand-orange)] p-10 rounded-[40px] text-white shadow-2xl"
            >
              <h3 className="text-3xl font-black mb-8 leading-tight">How to <br/> Initiate?</h3>
              <div className="space-y-8">
                {[
                  { step: "01", text: "Email us at xlimpax@gmail.com with your Order ID and photos of the product." },
                  { step: "02", text: "Our team will approve the request within 24 hours." },
                  { step: "03", text: "Pack the product securely. Our courier partner will pick it up." },
                  { step: "04", text: "Once we receive it, we process your refund or exchange." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-2xl font-black opacity-30 tracking-tighter">{s.step}</span>
                    <p className="text-sm font-bold leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-10 rounded-[40px] border border-white/5"
            >
              <AlertTriangle className="text-[var(--color-brand-orange)] mb-4" size={32} />
              <h4 className="font-bold mb-2 text-white">Important Note</h4>
              <p className="text-sm text-[var(--color-brand-light)] leading-relaxed">
                Please record a video while unboxing your HAMMER package. This helps us resolve damage claims significantly faster.
              </p>
            </motion.div>
          </div>

        </div>

        {/* Support */}
        <div className="mt-20 text-center">
          <p className="text-[var(--color-brand-light)] mb-6 italic">Need more help?</p>
          <Link href="/contact" className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-brand-orange)] hover:border-[var(--color-brand-orange)] transition-all inline-block">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
