"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight, X, CheckCircle2 } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import Price from "./Price";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";

function ProductDetailsModal({ product, onClose, symbol, rate }: { product: any, onClose: () => void, symbol: string, rate: number }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [mode, setMode] = useState<"retail" | "wholesale" | "customization">("retail");
  const [modalQty, setModalQty] = useState(1);
  const { addItem, setIsOpen } = useCartStore();
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === "wholesale") {
      setModalQty(product.minWholesaleQty || 12);
    } else if (mode === "customization") {
      setModalQty(product.minCustomizationQty || 100);
    } else {
      setModalQty(1);
    }
  }, [mode]);

  const activePrice = 
    mode === "retail" ? product.price : 
    mode === "wholesale" ? (product.wholesalePrice || product.price) :
    (product.customizationPrice || product.wholesalePrice || product.price);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${mode}`,
      name: `${product.name} (${mode.toUpperCase()})`,
      price: activePrice,
      quantity: modalQty,
      image: product.images[0]
    });
    setIsOpen(true);
    onClose();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleOrder = () => {
    const convertedPrice = (activePrice * rate * modalQty).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const baseUrl = window.location.origin;
    const imageUrls = product.images.map((img: string) => img.startsWith('data:') ? '[Local Image Uploaded]' : `${baseUrl}${img}`).join('\n');
    const message = `Hello HAMMER! I want to order:\n\nProduct: ${product.name}\nMode: ${mode.toUpperCase()}\nPrice: ${symbol}${convertedPrice} (${modalQty} units)\nImages:\n${imageUrls}\n\nPlease confirm my order!`;
    window.open(`https://wa.me/919903747606?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl glass rounded-[40px] overflow-hidden border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors">
          <X size={32} />
        </button>

        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-6 bg-black/40">
          <div 
            ref={imgRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            className="relative aspect-square rounded-3xl overflow-hidden bg-[#111] cursor-zoom-in"
          >
            <Image 
              src={product.images[selectedImage]} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-transform duration-200 ${showZoom ? 'scale-[2.5]' : 'scale-100'}`} 
              style={showZoom ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
            />
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img: string, i: number) => (
              <button 
                key={i} 
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${selectedImage === i ? "border-[var(--color-brand-orange)] scale-105" : "border-white/5 opacity-50 hover:opacity-100"}`}
              >
                <Image src={img} alt="Thumb" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.category}
            </span>
            {product.stockQuantity > 0 ? (
              <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                In Stock ({product.stockQuantity} Left)
              </span>
            ) : (
              <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Sold Out
              </span>
            )}
            {product.allowCustomization && (
              <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                Customization Available
              </span>
            )}
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
            {product.name}
          </h2>

          <div className="flex flex-col gap-2 mb-6">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Purchase Mode</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => setMode("retail")}
                className={`p-3 rounded-2xl border transition-all text-left relative overflow-hidden group ${mode === "retail" ? "border-[var(--color-brand-orange)] bg-[var(--color-brand-orange)]/10" : "border-white/5 bg-white/5 hover:border-white/10"}`}
              >
                <div className="absolute top-0 right-0 p-1.5"><span className={`text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded-full ${mode === "retail" ? "bg-[var(--color-brand-orange)] text-white" : "bg-white/10 text-gray-400"}`}>1+ Pic</span></div>
                <span className="text-gray-400 text-[10px] mb-0.5 block uppercase font-bold opacity-50">Retail</span>
                <Price amount={product.price} className={`text-base font-bold ${mode === "retail" ? "text-white" : "text-gray-400"}`} />
              </button>

              <button 
                onClick={() => setMode("wholesale")}
                className={`p-3 rounded-2xl border transition-all text-left relative overflow-hidden group ${mode === "wholesale" ? "border-green-500 bg-green-500/10" : "border-white/5 bg-white/5 hover:border-white/10"}`}
              >
                <div className="absolute top-0 right-0 p-1.5"><span className={`text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded-full ${mode === "wholesale" ? "bg-green-500 text-white" : "bg-white/10 text-gray-400"}`}>{product.minWholesaleQty || 12}+ Pics</span></div>
                <span className="text-gray-400 text-[10px] mb-0.5 block uppercase font-bold opacity-50">Wholesale</span>
                <Price amount={product.wholesalePrice || product.price} className={`text-base font-bold ${mode === "wholesale" ? "text-green-400" : "text-gray-400"}`} />
              </button>

              <button 
                onClick={() => setMode("customization")}
                className={`p-3 rounded-2xl border transition-all text-left relative overflow-hidden group ${mode === "customization" ? "border-blue-500 bg-blue-500/10" : "border-white/5 bg-white/5 hover:border-white/10"}`}
              >
                <div className="absolute top-0 right-0 p-1.5"><span className={`text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded-full ${mode === "customization" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-400"}`}>{product.minCustomizationQty || 100}+ Pics</span></div>
                <span className="text-gray-400 text-[10px] mb-0.5 block uppercase font-bold opacity-50">Custom</span>
                <Price amount={product.customizationPrice || product.wholesalePrice || product.price} className={`text-base font-bold ${mode === "customization" ? "text-blue-400" : "text-gray-400"}`} />
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between glass p-4 rounded-2xl border border-white/5">
               <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase font-bold">Total Price</span>
                  <Price amount={activePrice * modalQty} className="text-2xl font-black text-white" />
               </div>
               
               {/* Quantity Selector */}
               <div className="flex items-center bg-black/30 rounded-xl border border-white/10 p-1">
                <button 
                  onClick={() => setModalQty(prev => {
                    const min = mode === "retail" ? 1 : mode === "wholesale" ? (product.minWholesaleQty || 12) : (product.minCustomizationQty || 100);
                    return Math.max(min, prev - 1);
                  })}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-gray-400"
                >
                  <Minus size={18} />
                </button>
                <input 
                  type="number"
                  value={modalQty}
                  onChange={(e) => {
                    const min = mode === "retail" ? 1 : mode === "wholesale" ? (product.minWholesaleQty || 12) : (product.minCustomizationQty || 100);
                    setModalQty(Math.max(min, Number(e.target.value) || min));
                  }}
                  className="w-16 bg-transparent text-center font-bold text-lg focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button 
                  onClick={() => setModalQty(prev => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">Description</h4>
              <p className="text-gray-400 leading-relaxed text-lg font-light">
                {product.description || "Premium quality craftsmanship meet modern utility. This HAMMER original is built to endure your toughest journeys while keeping you stylish."}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 size={18} className="text-[var(--color-brand-orange)] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 flex flex-col gap-4">
              <button 
                onClick={() => {
                  handleAddToCart();
                  // Scroll down to the next action
                  const container = document.querySelector('.custom-scrollbar');
                  if (container) {
                    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
                  }
                }}
                disabled={product.stockQuantity === 0}
                className="w-full bg-[var(--color-brand-orange)] text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-orange-500/20 flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] active:translate-y-1 hover:shadow-orange-500/40 hover:animate-pulse group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <ShoppingCart size={24} className="group-hover:rotate-12 transition-transform" /> Add To Cart
              </button>
              <button 
                onClick={handleOrder}
                className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3"
              >
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ product, index, symbol, rate, onSelect }: { product: any, index: number, symbol: string, rate: number, onSelect: () => void }) {
  const [quantity, setQuantity] = useState<number | string>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, setIsOpen } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: `${product.id}-retail`,
      name: product.name,
      price: product.price,
      quantity: Number(quantity) || 1,
      image: product.images[0]
    });
    setIsOpen(true);
  };

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const qty = Math.max(1, Number(quantity) || 1);
    const convertedPrice = (product.price * rate * qty).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    const baseUrl = window.location.origin;
    const imageUrls = product.images.map((img: string) => img.startsWith('data:') ? '[Local Image Uploaded]' : `${baseUrl}${img}`).join('\n');
    const message = `Hello HAMMER! I want to order:\n\nProduct: ${product.name}\nPrice: ${symbol}${convertedPrice} (for ${qty} pcs)\nQuantity: ${qty}\nImages:\n${imageUrls}\n\nPlease confirm my order!`;
    window.open(`https://wa.me/919903747606?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onSelect}
      className="group bg-[var(--color-brand-dark)] rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-72 w-full bg-[#111] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0"
          >
            <Image 
              src={product.images[currentImageIndex]} 
              alt={product.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        {product.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--color-brand-orange)]">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--color-brand-orange)]">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_: any, i: number) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? "bg-[var(--color-brand-orange)] w-4" : "bg-white/20"}`} />
              ))}
            </div>
          </>
        )}
        
        {/* Stock Badge */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
          {product.stockQuantity > 0 ? (
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest ${product.stockQuantity < 10 ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
              {product.stockQuantity} Left
            </span>
          ) : (
            <span className="text-[10px] bg-red-500 text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest">
              Sold Out
            </span>
          )}
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
              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
        </div>
        <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>
        
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Price amount={product.price * (Number(quantity) || 1)} className="text-xl font-bold text-[var(--color-brand-orange)]" />
            
            {/* Quantity Selector */}
            <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1" onClick={(e) => e.stopPropagation()}>
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
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              className="w-full bg-[var(--color-brand-orange)] text-white flex items-center justify-center gap-2 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button 
              onClick={handleOrder}
              className="w-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 flex items-center justify-center gap-2 py-3 rounded-full font-bold hover:bg-[#25D366] hover:text-white transition-all"
            >
              Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const { symbol, rate } = useCurrencyStore();
  const { products } = useProductStore();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          {products.filter(p => p.inStock).map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              symbol={symbol} 
              rate={rate} 
              onSelect={() => { setSelectedProduct(product); setIsModalOpen(true); }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ProductDetailsModal 
            product={selectedProduct} 
            onClose={() => setIsModalOpen(false)} 
            symbol={symbol} 
            rate={rate} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
