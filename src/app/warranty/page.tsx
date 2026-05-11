"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Mail, Phone, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] pt-32 pb-24 text-[var(--color-brand-white)]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={16} /> 1-Year Brand Warranty
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            HAMMER Bags <br/> <span className="text-[var(--color-brand-orange)]">Warranty Policy</span>
          </h1>
          <p className="text-[var(--color-brand-light)] max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We stand behind the quality of our products. HAMMER bags are built to endure, and our warranty ensures you carry power with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Coverage Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[40px] border border-white/5"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="text-[var(--color-brand-orange)]" /> Warranty Coverage
              </h2>
              <p className="text-[var(--color-brand-light)] text-lg leading-relaxed mb-8">
                HAMMER offers a <span className="text-white font-bold">Carry-in Warranty</span> for all eligible products. To claim warranty service, customers must bring the product to an authorized HAMMER service center or contact customer support with proof of purchase.
              </p>

              <h3 className="text-xl font-bold mb-6 uppercase tracking-widest text-[var(--color-brand-orange)]">What the Warranty Covers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Zippers & Runners",
                  "Buckles & Clips",
                  "Stitching Issues",
                  "Handle & Strap Damage (Manufacturing defects)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Terms Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[40px] border border-white/5"
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <AlertCircle className="text-[var(--color-brand-orange)]" /> Terms & Conditions
              </h2>
              <ul className="space-y-4">
                {[
                  "Repair or replacement will be decided solely by HAMMER.",
                  "Products may be repaired instead of replaced whenever possible.",
                  "Warranty claims require a valid invoice or warranty card.",
                  "Replacement depends on stock availability.",
                  "If the same product is unavailable, customers may select another product of equal value.",
                  "If the selected replacement costs more than the original price, the customer pays the difference.",
                  "Warranty replacement products are not eligible for additional discounts or offers."
                ].map((term, i) => (
                  <li key={i} className="flex gap-4 text-[var(--color-brand-light)] text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-orange)] shrink-0 mt-2" />
                    {term}
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Sidebar / Support Area */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[var(--color-brand-orange)] to-orange-800 p-10 rounded-[40px] text-white shadow-2xl sticky top-32"
            >
              <h2 className="text-3xl font-black mb-8 leading-tight">Customer <br/> Support</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase opacity-70 mb-1">Email Us</p>
                    <a href="mailto:xlimpax@gmail.com" className="font-bold hover:underline">xlimpax@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase opacity-70 mb-1">Call Us</p>
                    <p className="font-bold">+91-9903747606</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase opacity-70 mb-1">Service Hours</p>
                    <p className="font-bold">Mon – Sat | 10 AM – 6 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/20 text-center">
                <p className="text-sm font-medium italic opacity-90">"✨ HAMMER — Built for Everyday Adventures."</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-20 text-center">
          <Link href="/" className="text-[var(--color-brand-orange)] font-bold uppercase tracking-widest text-sm hover:underline underline-offset-8">
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
