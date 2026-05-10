"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "@/store/useCartStore";
import Price from "./Price";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckout = () => {
    const message = `Hello HAMMER! I want to order the following items:\n\n${items.map(item => `${item.name} (${item.quantity} pcs) - ₹${item.price * item.quantity}`).join("\n")}\n\nTotal: ₹${totalPrice()}\n\nPlease confirm my order!`;
    window.open(`https://wa.me/919903747606?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <header
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 transition-all duration-500 rounded-[20px] md:rounded-[32px] overflow-hidden ${
          isScrolled ? "glass shadow-2xl py-4" : "bg-black/20 backdrop-blur-md py-6 border border-white/5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="text-2xl font-black tracking-tighter text-white">
              HAMMER<span className="text-[var(--color-brand-orange)]">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors text-white">Home</Link>
            <Link href="/#shop" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors text-white">Shop</Link>
            <Link href="/#collections" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors text-white">Collections</Link>
            <Link href="/#about" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors text-white">About</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors text-[var(--color-brand-orange)]">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5 relative z-50">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-white hover:text-[var(--color-brand-orange)] transition-colors relative group"
            >
              <ShoppingCart size={20} />
              {mounted && totalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-brand-orange)] text-[10px] font-black text-white rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                  {totalItems()}
                </span>
              )}
            </button>
            <Link href="/admin" className="hidden md:block text-white hover:text-[var(--color-brand-orange)] transition-colors">
              <User size={20} />
            </Link>
            <button 
              className="md:hidden text-white hover:text-[var(--color-brand-orange)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[var(--color-brand-orange)] transition-colors">Home</Link>
                <Link href="/#shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[var(--color-brand-orange)] transition-colors">Shop</Link>
                <Link href="/#collections" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[var(--color-brand-orange)] transition-colors">Collections</Link>
                <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[var(--color-brand-orange)] transition-colors">About</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[var(--color-brand-orange)] transition-colors">Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-[var(--color-brand-dark)] shadow-2xl flex flex-col border-l border-white/10"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tighter text-white">YOUR CART</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 opacity-50">
                    <ShoppingCart size={64} className="text-gray-600" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-[var(--color-brand-orange)] font-bold uppercase tracking-widest text-xs underline underline-offset-8">Start Shopping</button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-2xl bg-black/30 border border-white/5 overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} width={80} height={80} className="object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                          <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 p-0.5">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-white"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <Price amount={item.price * item.quantity} className="text-sm font-bold text-[var(--color-brand-orange)]" />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-8 border-t border-white/10 bg-black/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-400 font-medium">Total Amount</span>
                    <Price amount={totalPrice()} className="text-2xl font-black text-white" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                    >
                      Checkout via WhatsApp
                    </button>
                    <button 
                      onClick={clearCart}
                      className="text-xs text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest font-bold text-center py-2"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

