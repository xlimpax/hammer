"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[var(--color-brand-dark)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side - Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 relative h-[500px] rounded-3xl overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/20 z-10" />
          {/* Using hero image as brand placeholder */}
          <Image 
            src="/hammer/images/travel.png" 
            alt="Hammer Brand" 
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover scale-110"
          />
          <div className="absolute bottom-10 left-10 z-20">
            <span className="bg-[var(--color-brand-orange)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Our Story</span>
            <h3 className="text-3xl font-bold text-white">Built For Resilience</h3>
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Carry More Than Just <br/> Your Belongings.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-400 font-light leading-relaxed"
          >
            <strong className="text-white font-medium">HAMMER</strong> creates stylish, durable, and comfortable bags designed for modern lifestyles. We believe that what you carry shouldn't weigh you down, but empower you to move forward.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 font-light leading-relaxed mb-4"
          >
            Born from the necessity of reliable gear, our products blend premium materials with functional design. Whether you're commuting to the office, heading to the gym, or traveling across the globe, HAMMER ensures you carry power everywhere you go.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <h4 className="text-4xl font-bold text-white mb-2">1M+</h4>
              <p className="text-sm text-gray-400">Happy Customers</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-white mb-2">10+</h4>
              <p className="text-sm text-gray-400">Years of Quality</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-[var(--color-brand-orange)] mb-2">100%</h4>
              <p className="text-sm text-gray-400">Durability Guarantee</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
