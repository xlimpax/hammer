"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: 1, name: "Travel Bags", image: "/images/travel.png", color: "from-orange-900/40" },
  { id: 2, name: "Laptop Bags", image: "/images/laptop.png", color: "from-blue-900/40" },
  { id: 3, name: "College Bags", image: "/images/backpack.png", color: "from-green-900/40" },
  { id: 4, name: "Office Bags", image: "/images/laptop.png", color: "from-gray-700/40" },
];

export default function CategoriesSection() {
  return (
    <section id="collections" className="py-24 bg-[var(--color-brand-dark)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Shop by Category</h2>
            <p className="text-gray-400 max-w-xl text-base md:text-lg">
              Explore our premium collection of bags tailored for your specific lifestyle needs.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-[var(--color-brand-orange)] font-semibold hover:text-white transition-colors">
            View All <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`relative h-[350px] w-full rounded-2xl overflow-hidden bg-gradient-to-t ${cat.color} to-[var(--color-brand-gray)] border border-white/5 hover:border-white/20 hover:shadow-2xl transition-all duration-500`}>
                <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-700">
                  <div className="relative w-full h-full">
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                  <div className="flex items-center gap-2 text-[var(--color-brand-orange)] text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-2">
                    Explore <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
