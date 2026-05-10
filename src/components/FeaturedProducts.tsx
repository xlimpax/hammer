"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";

const products = [
  { id: 1, name: "Titan Travel Duffel", price: "129", rating: 4.8, image: "/images/travel.png" },
  { id: 2, name: "Aero Laptop Backpack", price: "89", rating: 4.9, image: "/images/laptop.png" },
  { id: 3, name: "Urban Gym Bag", price: "75", rating: 4.7, image: "/images/gym.png" },
  { id: 4, name: "Nomad Everyday Pack", price: "110", rating: 4.6, image: "/images/hero.png" },
];

export default function FeaturedProducts() {
  return (
    <section id="shop" className="py-24 bg-[var(--color-brand-gray)] border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Featured Products</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Our most popular and highly rated bags. Designed for performance, crafted for style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[var(--color-brand-dark)] rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full bg-[#111] p-6 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                />
                
                {/* Add to Cart Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                  <button className="bg-[var(--color-brand-orange)] text-white flex items-center gap-2 px-6 py-3 rounded-full font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-orange-600 shadow-lg">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(product.rating) ? "fill-[var(--color-brand-orange)] text-[var(--color-brand-orange)]" : "text-gray-600"} 
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                </div>
                <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xl font-bold text-[var(--color-brand-orange)]">${product.price}</span>
                  <button className="text-gray-400 hover:text-white transition-colors lg:hidden">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
