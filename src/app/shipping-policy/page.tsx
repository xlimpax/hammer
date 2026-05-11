"use client";

import { motion } from "framer-motion";
import { Truck, Package, Clock, ShieldCheck, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ShippingPolicyPage() {
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
            <Truck size={16} /> Fast & Secure Delivery
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            Shipping <span className="text-[var(--color-brand-orange)]">Policy</span>
          </h1>
          <p className="text-[var(--color-brand-light)] max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Everything you need to know about how we deliver HAMMER power to your doorstep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Retail Shipping Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Package className="text-[var(--color-brand-orange)]" /> Retailer Shipping
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center shrink-0">
                    <Clock className="text-[var(--color-brand-orange)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Processing Time</h3>
                    <p className="text-[var(--color-brand-light)] leading-relaxed">
                      Orders are processed within <span className="text-white font-bold">24-48 hours</span>. You will receive a tracking number as soon as your order is dispatched.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-[var(--color-brand-orange)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Delivery Timelines</h3>
                    <ul className="space-y-2 text-[var(--color-brand-light)]">
                      <li>• <span className="text-white font-bold">West Bengal:</span> 2-4 business days</li>
                      <li>• <span className="text-white font-bold">Metro Cities:</span> 3-5 business days</li>
                      <li>• <span className="text-white font-bold">Rest of India:</span> 5-8 business days</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center shrink-0">
                    <AlertCircle className="text-[var(--color-brand-orange)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Shipping Charges</h3>
                    <p className="text-[var(--color-brand-light)] leading-relaxed">
                      A flat shipping fee (configurable via admin) applies to single-unit retail orders. <span className="text-[var(--color-brand-orange)] font-bold">Free Shipping</span> is applicable on promotional orders above specific values.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Wholesale/Bulk Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[40px] border border-white/5"
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Truck className="text-[var(--color-brand-orange)]" /> Wholesale & Bulk Orders
              </h2>
              <p className="text-[var(--color-brand-light)] mb-8 leading-relaxed">
                For our wholesale partners and bulk buyers, we offer specialized logistics solutions to ensure safe and cost-effective delivery of large inventory.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <h4 className="font-bold mb-2 text-white">Free Transport</h4>
                  <p className="text-sm text-[var(--color-brand-light)]">Free transport delivery for bulk orders exceeding minimum quantity thresholds.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                  <h4 className="font-bold mb-2 text-white">Priority Handling</h4>
                  <p className="text-sm text-[var(--color-brand-light)]">Bulk orders are packed in reinforced master cartons for maximum protection.</p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 p-10 rounded-[40px] border border-white/10 sticky top-32"
            >
              <h3 className="text-2xl font-bold mb-6">Tracking Your Order</h3>
              <p className="text-[var(--color-brand-light)] text-sm leading-relaxed mb-8">
                Once shipped, you will receive an SMS and Email with your tracking link. You can also track your order directly on our website using your Order ID.
              </p>
              
              <Link 
                href="/#shop" 
                className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[var(--color-brand-orange)] hover:text-white transition-all uppercase tracking-widest text-xs"
              >
                Continue Shopping
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[40px] border border-white/5"
            >
              <ShieldCheck className="text-green-500 mb-4" size={32} />
              <h4 className="font-bold mb-2">Safe Delivery Guarantee</h4>
              <p className="text-xs text-[var(--color-brand-light)] leading-relaxed">
                Every HAMMER bag is inspected twice before shipping to ensure zero defects. If your package arrives damaged, please contact us immediately.
              </p>
            </motion.div>
          </div>

        </div>

        {/* Back link */}
        <div className="mt-20 text-center">
          <Link href="/" className="text-[var(--color-brand-orange)] font-bold uppercase tracking-widest text-sm hover:underline underline-offset-8">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
