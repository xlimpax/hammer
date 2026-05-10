"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-10 z-50 transition-all duration-500 ${
        isScrolled ? "glass shadow-2xl py-4" : "bg-[var(--color-brand-dark)] py-6"
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
          <Link href="/" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors">Home</Link>
          <Link href="/#shop" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors">Shop</Link>
          <Link href="/#collections" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors">Collections</Link>
          <Link href="/#about" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors text-[var(--color-brand-orange)]">Contact</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 relative z-50">
          <button className="hidden md:block text-white hover:text-[var(--color-brand-orange)] transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden md:block text-white hover:text-[var(--color-brand-orange)] transition-colors">
            <Heart size={20} />
          </button>
          <button className="text-white hover:text-[var(--color-brand-orange)] transition-colors relative group">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[var(--color-brand-orange)] text-xs text-white rounded-full w-4 h-4 flex items-center justify-center group-hover:scale-110 transition-transform">0</span>
          </button>
          <Link href="#account" className="hidden md:block text-white hover:text-[var(--color-brand-orange)] transition-colors">
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
              <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                <Search size={24} className="hover:text-[var(--color-brand-orange)]" />
                <Heart size={24} className="hover:text-[var(--color-brand-orange)]" />
                <User size={24} className="hover:text-[var(--color-brand-orange)]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
