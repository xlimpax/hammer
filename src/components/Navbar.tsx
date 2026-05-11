"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Search, Heart, Minus, Plus, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
import Price from "./Price";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, totalPrice, clearCart, totalItems, removeItem, updateQuantity, isOpen, setIsOpen } = useCartStore();
  const { deductStock, retailShippingCharge, upiId, activePaymentModes } = useProductStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutType, setCheckoutType] = useState<"whatsapp" | "normal">("whatsapp");
  const [paymentStep, setPaymentStep] = useState<"form" | "options">("form");
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });

  const hasRetailItems = items.some(item => item.id.includes("-retail"));
  const shippingFee = hasRetailItems ? retailShippingCharge : 0;
  const grandTotal = totalPrice() + shippingFee;

  const handleCheckout = (type: "whatsapp" | "normal") => {
    setCheckoutType(type);
    setPaymentStep("form");
    setIsOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleFinalOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Deduct Stock for each item
    items.forEach(item => {
      const productId = parseInt(item.id.split('-')[0]);
      deductStock(productId, item.quantity);
    });

    if (checkoutType === "whatsapp") {
      const cartSummary = items.map(item => `- ${item.name} (${item.quantity} units) @ ₹${item.price}`).join("\n");
      const message = `🚀 *NEW ORDER FROM HAMMER*\n\n*👤 CUSTOMER DETAILS*\n- Name: ${customerInfo.name}\n- Phone: ${customerInfo.phone}\n- Address: ${customerInfo.address}\n\n*🛒 ORDER SUMMARY*\n${cartSummary}\n\n*🚚 SHIPPING:* ₹${shippingFee}\n*💰 TOTAL AMOUNT:* ₹${grandTotal}\n\nPlease confirm my order!`;
      window.open(`https://wa.me/919903747606?text=${encodeURIComponent(message)}`, '_blank');
      clearCart();
      setIsCheckoutModalOpen(false);
    } else {
      // Normal Checkout: Move to Payment Options
      setPaymentStep("options");
    }
  };

  const handlePaymentComplete = () => {
    alert(`🎉 Payment Successful!\nOrder ID: #HAM${Math.floor(Math.random()*10000)}\n\nThank you for shopping with HAMMER, ${customerInfo.name}!`);
    clearCart();
    setIsCheckoutModalOpen(false);
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
            <Link href="/careers" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors text-white">Careers</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-[var(--color-brand-orange)] transition-colors text-[var(--color-brand-orange)]">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5 relative z-50">
            <button 
              onClick={() => setIsOpen(true)}
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
                <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white hover:text-[var(--color-brand-orange)] transition-colors">Careers</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[var(--color-brand-orange)] transition-colors">Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} 
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
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 opacity-50">
                    <ShoppingCart size={64} className="text-gray-600" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <button onClick={() => setIsOpen(false)} className="text-[var(--color-brand-orange)] font-bold uppercase tracking-widest text-xs underline underline-offset-8">Start Shopping</button>
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
                    {activePaymentModes?.upi !== false && (
                      <button 
                        onClick={() => handleCheckout("normal")}
                        className="w-full bg-[var(--color-brand-orange)] text-white py-5 rounded-2xl font-bold text-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/20 uppercase tracking-tighter"
                      >
                        Process To Pay <Plus size={20} className="rotate-45" />
                      </button>
                    )}
                    {activePaymentModes?.whatsapp !== false && (
                      <button 
                        onClick={() => handleCheckout("whatsapp")}
                        className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                      >
                        Order via WhatsApp
                      </button>
                    )}
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
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
              onClick={() => setIsCheckoutModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass rounded-[32px] p-8 border border-white/10"
            >
              <AnimatePresence mode="wait">
                {paymentStep === "form" ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h2 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Delivery Details</h2>
                    <p className="text-gray-400 text-sm mb-6">Enter your address to proceed to payment.</p>
                    
                    <form onSubmit={handleFinalOrder} className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                        <input 
                          required type="text" value={customerInfo.name} 
                          onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                        <input 
                          required type="tel" value={customerInfo.phone} 
                          onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Delivery Address</label>
                        <textarea 
                          required rows={3} value={customerInfo.address} 
                          onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white resize-none"
                        />
                      </div>

                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2 my-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total Price</span>
                          <span className="text-white font-bold">₹{totalPrice()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Shipping Charge</span>
                          <span className={shippingFee > 0 ? "text-white font-bold" : "text-green-500 font-bold"}>₹{shippingFee}</span>
                        </div>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="flex justify-between text-lg">
                          <span className="text-white font-black uppercase tracking-tighter">Grand Total</span>
                          <span className="text-[var(--color-brand-orange)] font-black">₹{grandTotal}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <button 
                          type="submit"
                          className="w-full bg-[var(--color-brand-orange)] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                          {checkoutType === "whatsapp" ? "Confirm & Open WhatsApp" : "Proceed to Payment"}
                        </button>
                        <button 
                          type="button" onClick={() => setIsCheckoutModalOpen(false)}
                          className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest py-4 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="options"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Payment Options</h2>
                    <p className="text-gray-400 text-sm mb-6">Select your preferred payment method.</p>

                    <div className="space-y-3">
                      {activePaymentModes?.upi !== false && (
                        <div className="p-6 bg-white border border-white/10 rounded-3xl flex flex-col items-center gap-4 text-center">
                          <div className="relative w-48 h-48 bg-white rounded-xl p-2 shadow-2xl">
                            <Image 
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${upiId}&pn=HAMMER&am=${grandTotal}&cu=INR`)}`}
                              alt="UPI QR Code"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <p className="text-black font-black text-sm uppercase tracking-tighter">Scan to Pay ₹{grandTotal}</p>
                            <p className="text-gray-500 text-[10px] font-bold uppercase">{upiId}</p>
                          </div>
                          <button 
                            onClick={handlePaymentComplete}
                            className="w-full bg-[var(--color-brand-orange)] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all"
                          >
                            I Have Paid
                          </button>
                        </div>
                      )}

                      {activePaymentModes?.cards !== false && (
                        <button 
                          onClick={handlePaymentComplete}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:border-[var(--color-brand-orange)] transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-brand-orange)]/20 flex items-center justify-center text-[var(--color-brand-orange)]">
                               <User size={20} />
                            </div>
                            <div className="text-left">
                              <h4 className="text-white font-bold text-sm">Credit / Debit Card</h4>
                              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Visa, Mastercard, RuPay</p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-gray-600 group-hover:text-white" />
                        </button>
                      )}
                    </div>

                    <button 
                      onClick={() => setPaymentStep("form")}
                      className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest py-4 hover:text-white transition-colors"
                    >
                      Back to Details
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
