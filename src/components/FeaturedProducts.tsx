"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";

import { useState, useEffect } from "react";
import Price from "./Price";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useProductStore } from "@/store/useProductStore";

function ProductCard({ product, index, symbol, rate }: { product: any, index: number, symbol: string, rate: number }) {
  const [quantity, setQuantity] = useState<number | string>(1);

  const handleOrder = () => {
    const qty = Math.max(1, Number(quantity) || 1);
    const convertedPrice = (product.price * rate * qty).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const baseUrl = window.location.origin;
    const imageUrls = product.images.map((img: string) => img.startsWith('data:') ? '[Local Image Uploaded]' : `${baseUrl}${img}`).join('\n');
    const message = `Hello HAMMER! I want to order:\n\nProduct: ${product.name}\nPrice: ${symbol}${convertedPrice} (for ${qty} pcs)\nQuantity: ${qty}\nImages:\n${imageUrls}\n\nPlease confirm my order!`;
    window.open(`https://wa.me/919903747606?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div
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
          src={product.images[0]} 
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
        
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Price amount={product.price * (Number(quantity) || 1)} className="text-xl font-bold text-[var(--color-brand-orange)]" />
            
            {/* Quantity Selector */}
            <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, (Number(quantity) || 1) - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-400"
              >
                <Minus size={14} />
              </button>
              <input 
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onBlur={() => setQuantity(Math.max(1, Number(quantity) || 1))}
                className="w-12 bg-transparent text-center font-bold text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button 
                onClick={() => setQuantity((Number(quantity) || 0) + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleOrder}
            className="w-full bg-[#25D366] text-white flex items-center justify-center gap-2 py-3 rounded-full font-bold hover:bg-[#128C7E] transition-all shadow-lg"
          >
            Order via WhatsApp
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const { symbol, rate } = useCurrencyStore();
  const { products } = useProductStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              symbol={symbol} 
              rate={rate} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
