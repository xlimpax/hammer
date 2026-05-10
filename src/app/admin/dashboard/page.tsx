"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, LayoutDashboard, Package, LogOut, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";
import { useMessageStore } from "@/store/useMessageStore";
import { MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { announcements, trending, heroBadge, updateAnnouncements, updateTrending, updateHeroBadge } = useMessageStore();
  
  const [activeTab, setActiveTab] = useState("products");
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", price: "", category: "", images: ["/images/hero.png"] });

  // Message local states
  const [localAnnouncements, setLocalAnnouncements] = useState<string[]>([]);
  const [localTrending, setLocalTrending] = useState<string[]>([]);
  const [localHeroBadge, setLocalHeroBadge] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const auth = localStorage.getItem("admin_auth");
    if (!auth) router.push("/admin/login");
    
    // Initialize local states from store
    setLocalAnnouncements(announcements);
    setLocalTrending(trending);
    setLocalHeroBadge(heroBadge);
  }, [announcements, trending, heroBadge]);

  if (!isMounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  const handleSaveMessages = () => {
    updateAnnouncements(localAnnouncements);
    updateTrending(localTrending);
    updateHeroBadge(localHeroBadge);
    alert("All messages updated successfully!");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, images: [...formData.images, base64String] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    const url = prompt("Enter Image URL:");
    if (url) {
      setFormData({ ...formData, images: [...formData.images, url] });
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) return alert("Please add at least one image");
    
    const productData = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      images: formData.images,
    };

    if (editingProduct) {
      updateProduct({ ...productData, id: editingProduct.id, rating: editingProduct.rating });
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: "", price: "", category: "", images: ["/images/hero.png"] });
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price.toString(), category: product.category, images: product.images });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] flex">
      {/* ... Sidebar remains the same ... */}
      <div className="w-64 bg-black/50 border-r border-white/10 p-6 flex flex-col gap-8">
        <div className="text-2xl font-black tracking-tighter text-white">
          HAMMER<span className="text-[var(--color-brand-orange)]">.</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "products" ? "bg-[var(--color-brand-orange)] text-white font-bold" : "text-gray-400 hover:bg-white/5"}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "messages" ? "bg-[var(--color-brand-orange)] text-white font-bold" : "text-gray-400 hover:bg-white/5"}`}
          >
            <MessageSquare size={20} /> Flash Messages
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="flex-1 p-10 overflow-y-auto max-h-screen">
        {activeTab === "products" ? (
          <>
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold text-white">Product Management</h1>
                <p className="text-gray-400">Add, edit, or remove products from the store.</p>
              </div>
              <button 
                onClick={() => { setEditingProduct(null); setFormData({ name: "", price: "", category: "", images: ["/images/hero.png"] }); setIsModalOpen(true); }}
                className="bg-[var(--color-brand-orange)] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg"
              >
                <Plus size={20} /> Add New Product
              </button>
            </div>

            <div className="glass rounded-3xl border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-gray-300 border-b border-white/10">
                    <th className="px-6 py-4 font-semibold">Image</th>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 relative rounded-lg bg-black/30 overflow-hidden">
                          <Image src={product.images[0]} alt={product.name} fill className="object-contain p-1" />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                      <td className="px-6 py-4 text-gray-400">{product.category}</td>
                      <td className="px-6 py-4 font-bold text-[var(--color-brand-orange)]">₹{product.price}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(product)}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* ... Messages Tab remains the same ... */
          <div className="max-w-4xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white">Flash Messages</h1>
              <p className="text-gray-400">Update the scrolling announcements and offer bars.</p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Top Announcement Bar */}
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="w-2 h-8 bg-[var(--color-brand-orange)] rounded-full" />
                  Top Announcement Bar (Scrolling)
                </h2>
                <div className="flex flex-col gap-4">
                  {localAnnouncements.map((msg, i) => (
                    <div key={i} className="flex gap-2">
                      <input 
                        value={msg}
                        onChange={(e) => {
                          const newArr = [...localAnnouncements];
                          newArr[i] = e.target.value;
                          setLocalAnnouncements(newArr);
                        }}
                        className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] text-white"
                      />
                      <button 
                        onClick={() => setLocalAnnouncements(localAnnouncements.filter((_, idx) => idx !== i))}
                        className="p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setLocalAnnouncements([...localAnnouncements, "New Announcement"])}
                    className="w-fit text-sm text-[var(--color-brand-orange)] font-bold hover:underline"
                  >
                    + Add New Message
                  </button>
                </div>
              </div>

              {/* Bottom Trending Bar */}
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="w-2 h-8 bg-[var(--color-brand-orange)] rounded-full" />
                  Bottom Trending Bar (Scrolling)
                </h2>
                <div className="flex flex-col gap-4">
                  {localTrending.map((msg, i) => (
                    <div key={i} className="flex gap-2">
                      <input 
                        value={msg}
                        onChange={(e) => {
                          const newArr = [...localTrending];
                          newArr[i] = e.target.value;
                          setLocalTrending(newArr);
                        }}
                        className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] text-white"
                      />
                      <button 
                        onClick={() => setLocalTrending(localTrending.filter((_, idx) => idx !== i))}
                        className="p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => setLocalTrending([...localTrending, "New Trending Update"])}
                    className="w-fit text-sm text-[var(--color-brand-orange)] font-bold hover:underline"
                  >
                    + Add New Message
                  </button>
                </div>
              </div>

              {/* Hero Section Badge */}
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="w-2 h-8 bg-[var(--color-brand-orange)] rounded-full" />
                  Hero Section Promo Badge
                </h2>
                <input 
                  value={localHeroBadge}
                  onChange={(e) => setLocalHeroBadge(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] text-white"
                />
              </div>

              <button 
                onClick={handleSaveMessages}
                className="bg-[var(--color-brand-orange)] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl self-end"
              >
                Save All Changes
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-full max-w-lg glass p-10 rounded-3xl border border-white/10 relative z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Product Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white appearance-none" required>
                      <option value="">Select Category</option>
                      <option value="Travel Bags">Travel Bags</option>
                      <option value="Laptop Bags">Laptop Bags</option>
                      <option value="Gym Bags">Gym Bags</option>
                      <option value="Office Bags">Office Bags</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Price (₹)</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" required />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-sm font-medium text-gray-400">Product Images</label>
                  <div className="grid grid-cols-4 gap-2">
                    {formData.images.map((img, i) => (
                      <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/30">
                        <Image src={img} alt="Preview" fill className="object-contain p-1" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-red-500/60 items-center justify-center hidden group-hover:flex">
                          <Trash2 size={16} className="text-white" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={handleAddImageUrl} className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-white hover:border-white/30 transition-all">
                      <Plus size={16} />
                      <span className="text-[10px] font-bold">URL</span>
                    </button>
                    <label className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 text-gray-500 cursor-pointer hover:text-white hover:border-white/30 transition-all">
                      <ImageIcon size={16} />
                      <span className="text-[10px] font-bold">DEVICE</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white font-bold rounded-2xl py-4 mt-4 transition-all shadow-lg">
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
