"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, LayoutDashboard, Package, LogOut, X, Image as ImageIcon, Truck, CreditCard, Share2 } from "lucide-react";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";
import { useMessageStore } from "@/store/useMessageStore";
import { MessageSquare, Briefcase, CheckCircle2, Mail, Phone } from "lucide-react";
import { useCareerStore } from "@/store/useCareerStore";

export default function AdminDashboard() {
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct, retailShippingCharge, updateShippingCharge, upiId, activePaymentModes, updatePaymentSettings } = useProductStore();
  const { announcements, trending, heroBadge, socialLinks, updateAnnouncements, updateTrending, updateHeroBadge, updateSocialLinks } = useMessageStore();
  const { applications, updateStatus, deleteApplication } = useCareerStore();
  
  const [activeTab, setActiveTab] = useState("products");
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    description: "",
    features: [] as string[],
    price: "", 
    wholesalePrice: "",
    minWholesaleQty: "12",
    customizationPrice: "",
    minCustomizationQty: "100",
    allowCustomization: false,
    originalPrice: "",
    category: "", 
    images: ["/images/hero.png"],
    inStock: true,
    stockQuantity: ""
  });
  const [newFeature, setNewFeature] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const [localAnnouncements, setLocalAnnouncements] = useState<string[]>([]);
  const [localTrending, setLocalTrending] = useState<string[]>([]);
  const [localHeroBadge, setLocalHeroBadge] = useState("");
  const [localShippingCharge, setLocalShippingCharge] = useState(0);
  const [localUpiId, setLocalUpiId] = useState("");
  const [localPaymentModes, setLocalPaymentModes] = useState({ whatsapp: true, upi: true, cards: true });
  const [localSocialLinks, setLocalSocialLinks] = useState({ facebook: "", instagram: "", twitter: "", youtube: "", whatsapp: "" });

  useEffect(() => {
    setIsMounted(true);
    const auth = localStorage.getItem("admin_auth");
    if (!auth) router.push("/admin/login");
    
    setLocalAnnouncements(announcements);
    setLocalTrending(trending);
    setLocalHeroBadge(heroBadge);
    setLocalShippingCharge(retailShippingCharge);
    setLocalUpiId(upiId);
    setLocalPaymentModes(activePaymentModes);
    if (socialLinks) setLocalSocialLinks(socialLinks);
  }, [announcements, trending, heroBadge, retailShippingCharge, upiId, activePaymentModes, socialLinks]);

  if (!isMounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  const handleSaveSettings = () => {
    updateAnnouncements(localAnnouncements);
    updateTrending(localTrending);
    updateHeroBadge(localHeroBadge);
    updateShippingCharge(localShippingCharge);
    updatePaymentSettings(localPaymentModes, localUpiId);
    updateSocialLinks(localSocialLinks);
    alert("All settings updated successfully!");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", 
      description: "", 
      features: [], 
      price: "", 
      wholesalePrice: "",
      minWholesaleQty: "12",
      customizationPrice: "",
      minCustomizationQty: "100",
      allowCustomization: false,
      originalPrice: "", 
      category: "", 
      images: ["/images/hero.png"], 
      inStock: true,
      stockQuantity: "0" 
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, images: [...(formData.images || []), base64String] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    if (urlInput) {
      if (!urlInput.startsWith("http") && !urlInput.startsWith("/")) {
        return alert("Please enter a valid URL (starting with http:// or https://) or a local path (starting with /)");
      }
      setFormData({ ...formData, images: [...(formData.images || []), urlInput] });
      setUrlInput("");
    }
  };

  const removeImage = (index: number) => {
    const newImages = (formData.images || []).filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.images || formData.images.length === 0) return alert("Please add at least one image");
    
    const productData = {
      name: formData.name,
      description: formData.description,
      features: formData.features,
      price: Number(formData.price),
      wholesalePrice: formData.wholesalePrice ? Number(formData.wholesalePrice) : undefined,
      minWholesaleQty: Number(formData.minWholesaleQty) || 12,
      customizationPrice: formData.customizationPrice ? Number(formData.customizationPrice) : undefined,
      minCustomizationQty: Number(formData.minCustomizationQty) || 100,
      allowCustomization: formData.allowCustomization,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      category: formData.category,
      images: formData.images,
      inStock: formData.inStock,
      stockQuantity: Number(formData.stockQuantity) || 0
    };

    if (editingProduct) {
      updateProduct({ ...productData, id: editingProduct.id, rating: editingProduct.rating } as any);
    } else {
      addProduct(productData as any);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({ 
      name: product.name || "", 
      description: product.description || "",
      features: product.features || [],
      price: (product.price || "").toString(), 
      wholesalePrice: (product.wholesalePrice || "").toString(),
      minWholesaleQty: (product.minWholesaleQty || "12").toString(),
      customizationPrice: (product.customizationPrice || "").toString(),
      minCustomizationQty: (product.minCustomizationQty || "100").toString(),
      allowCustomization: product.allowCustomization || false,
      originalPrice: (product.originalPrice || "").toString(),
      category: product.category || "", 
      images: product.images || [],
      inStock: product.inStock ?? true,
      stockQuantity: (product.stockQuantity ?? 0).toString()
    });
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const data = {
      products,
      announcements,
      trending,
      heroBadge,
      retailShippingCharge,
      socialLinks,
      upiId,
      activePaymentModes,
      applications
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hammer-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.products) {
            // Update stores
            data.products.forEach((p: any) => addProduct(p));
            updateAnnouncements(data.announcements || []);
            updateTrending(data.trending || []);
            updateHeroBadge(data.heroBadge || "");
            if (data.retailShippingCharge !== undefined) updateShippingCharge(data.retailShippingCharge);
            if (data.socialLinks) updateSocialLinks(data.socialLinks);
            if (data.upiId) updatePaymentSettings(data.activePaymentModes || {}, data.upiId);
            else if (data.activePaymentModes) updatePaymentSettings(data.activePaymentModes);
            if (data.applications) {
              // Note: For demo, we just overwrite. In real app, merge or append.
              localStorage.setItem('hammer-careers-storage', JSON.stringify({ state: { applications: data.applications } }));
            }
            alert("Data imported successfully!");
            window.location.reload();
          }
        } catch (err) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] flex">
      {/* ... Sidebar ... */}
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
          <button 
            onClick={() => setActiveTab("shipping")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "shipping" ? "bg-[var(--color-brand-orange)] text-white font-bold" : "text-gray-400 hover:bg-white/5"}`}
          >
            <Truck size={20} /> Shipping Charge
          </button>
          <button 
            onClick={() => setActiveTab("payment")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "payment" ? "bg-[var(--color-brand-orange)] text-white font-bold" : "text-gray-400 hover:bg-white/5"}`}
          >
            <CreditCard size={20} /> Payment Gateway
          </button>
          <button 
            onClick={() => setActiveTab("social")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "social" ? "bg-[var(--color-brand-orange)] text-white font-bold" : "text-gray-400 hover:bg-white/5"}`}
          >
            <Share2 size={20} /> Social Media
          </button>
          <button 
            onClick={() => setActiveTab("careers")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "careers" ? "bg-[var(--color-brand-orange)] text-white font-bold" : "text-gray-400 hover:bg-white/5"}`}
          >
            <Briefcase size={20} /> Careers
          </button>
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <button 
            onClick={handleExport}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-400 hover:bg-blue-400/10 transition-colors font-medium text-sm"
          >
            <ImageIcon size={18} /> Export Data JSON
          </button>
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl text-green-400 hover:bg-green-400/10 transition-colors font-medium text-sm cursor-pointer">
            <Plus size={18} /> Import Data JSON
            <input type="file" className="hidden" accept=".json" onChange={handleImport} />
          </label>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      <div className="flex-1 p-10 overflow-y-auto max-h-screen">
        {activeTab === "products" && (
          <>
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold text-white">Product Management</h1>
                <p className="text-gray-400">Add, edit, or remove products from the store.</p>
              </div>
              <button 
                onClick={() => { 
                  setEditingProduct(null); 
                  resetForm(); 
                  setIsModalOpen(true); 
                }}
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
                    <th className="px-6 py-4 font-semibold">Status</th>
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
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        {product.inStock ? (
                          <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full font-bold uppercase tracking-widest">In Stock</span>
                        ) : (
                          <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded-full font-bold uppercase tracking-widest">Out of Stock</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-[var(--color-brand-orange)]">₹{product.price}</div>
                        {product.originalPrice && <div className="text-xs text-gray-500 line-through">₹{product.originalPrice}</div>}
                      </td>
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
        )}

        {activeTab === "messages" && (
          <div className="max-w-4xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white">Flash Messages</h1>
              <p className="text-gray-400">Update the scrolling announcements and offer bars.</p>
            </div>

            <div className="flex flex-col gap-8">
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
                onClick={handleSaveSettings}
                className="bg-[var(--color-brand-orange)] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl self-end"
              >
                Save Messages
              </button>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="max-w-4xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white">Shipping Settings</h1>
              <p className="text-gray-400">Configure retail delivery charges.</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="w-2 h-8 bg-[var(--color-brand-orange)] rounded-full" />
                  Retail Shipping Charge (₹)
                </h2>
                <p className="text-gray-500 text-sm mb-4">Set the shipping fee for all retail orders (1 unit). Bulk orders remain FREE shipping.</p>
                <input 
                  type="number"
                  value={localShippingCharge}
                  onChange={(e) => setLocalShippingCharge(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] text-white font-bold text-xl"
                />
              </div>

              <button 
                onClick={handleSaveSettings}
                className="bg-[var(--color-brand-orange)] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl self-end"
              >
                Save Shipping Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="max-w-4xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white">Payment Gateway</h1>
              <p className="text-gray-400">Configure your UPI ID and active payment methods.</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="w-2 h-8 bg-[var(--color-brand-orange)] rounded-full" />
                  UPI & Payment Modes
                </h2>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Merchant UPI ID</label>
                    <input 
                      type="text"
                      value={localUpiId}
                      onChange={(e) => setLocalUpiId(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] text-white font-bold"
                      placeholder="e.g. yourname@upi"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest text-center">WhatsApp Mode</label>
                      <button 
                        onClick={() => setLocalPaymentModes({...localPaymentModes, whatsapp: !localPaymentModes.whatsapp})}
                        className={`py-4 rounded-2xl font-bold transition-all text-xs uppercase ${localPaymentModes.whatsapp ? "bg-green-500/10 text-green-500 border border-green-500/20 shadow-lg shadow-green-500/10" : "bg-white/5 text-gray-500 border border-white/10"}`}
                      >
                        {localPaymentModes.whatsapp ? "ACTIVE" : "INACTIVE"}
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest text-center">UPI QR Mode</label>
                      <button 
                        onClick={() => setLocalPaymentModes({...localPaymentModes, upi: !localPaymentModes.upi})}
                        className={`py-4 rounded-2xl font-bold transition-all text-xs uppercase ${localPaymentModes.upi ? "bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] border border-[var(--color-brand-orange)]/20 shadow-lg shadow-orange-500/10" : "bg-white/5 text-gray-500 border border-white/10"}`}
                      >
                        {localPaymentModes.upi ? "ACTIVE" : "INACTIVE"}
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest text-center">Card Mode</label>
                      <button 
                        onClick={() => setLocalPaymentModes({...localPaymentModes, cards: !localPaymentModes.cards})}
                        className={`py-4 rounded-2xl font-bold transition-all text-xs uppercase ${localPaymentModes.cards ? "bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-lg shadow-blue-500/10" : "bg-white/5 text-gray-500 border border-white/10"}`}
                      >
                        {localPaymentModes.cards ? "ACTIVE" : "INACTIVE"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSaveSettings}
                className="bg-[var(--color-brand-orange)] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl self-end"
              >
                Save Payment Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="max-w-4xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white">Social Media</h1>
              <p className="text-gray-400">Manage your social media profiles.</p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="glass p-8 rounded-3xl border border-white/10">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <span className="w-2 h-8 bg-[var(--color-brand-orange)] rounded-full" />
                  Social Profile URLs
                </h2>
                <div className="flex flex-col gap-4">
                  {[
                    { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
                    { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourprofile" },
                    { key: "twitter", label: "X (Twitter)", placeholder: "https://twitter.com/yourhandle" },
                    { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/yourchannel" },
                    { key: "whatsapp", label: "WhatsApp", placeholder: "https://wa.me/919903747606" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">{label}</label>
                      <input
                        type="text"
                        value={(localSocialLinks as any)[key] || ""}
                        onChange={(e) => setLocalSocialLinks({ ...localSocialLinks, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] text-white text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSaveSettings}
                className="bg-[var(--color-brand-orange)] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl self-end"
              >
                Save Social Links
              </button>
            </div>
          </div>
        )}

        {activeTab === "careers" && (
          <div className="w-full max-w-6xl">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white">Career Applications</h1>
              <p className="text-gray-400">View and manage job applications submitted via the website.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {applications.length === 0 ? (
                <div className="glass p-20 rounded-3xl border border-white/10 text-center">
                  <Briefcase size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-500 font-medium">No applications received yet.</p>
                </div>
              ) : (
                applications.map((app) => (
                  <motion.div 
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 rounded-3xl border border-white/10"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-xl font-bold text-white">{app.name}</h3>
                          <span className={`text-[10px] px-2 py-1 rounded-full font-black uppercase tracking-widest ${
                            app.status === 'pending' ? 'bg-orange-500/10 text-orange-500' :
                            app.status === 'reviewed' ? 'bg-blue-500/10 text-blue-500' :
                            app.status === 'accepted' ? 'bg-green-500/10 text-green-500' :
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Mail size={14} className="text-[var(--color-brand-orange)]" /> {app.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Phone size={14} className="text-[var(--color-brand-orange)]" /> {app.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Briefcase size={14} className="text-[var(--color-brand-orange)]" /> {app.role}
                          </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                          <p className="text-sm text-gray-300 leading-relaxed italic">"{app.message}"</p>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest font-bold">Applied on: {new Date(app.date).toLocaleDateString()} {new Date(app.date).toLocaleTimeString()}</p>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[150px]">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Update Status</label>
                        <select 
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value as any)}
                          className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[var(--color-brand-orange)]"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button 
                          onClick={() => { if(confirm("Delete this application?")) deleteApplication(app.id); }}
                          className="mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-full max-w-2xl glass p-10 rounded-3xl border border-white/10 relative z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Product Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" required />
                  </div>
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
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Short Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white h-24 resize-none" placeholder="e.g. The perfect bag for weekend trips..." />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">Retail Price (₹)</label>
                      <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">List Price (₹)</label>
                      <input type="number" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">Wholesale Price (₹)</label>
                      <input type="number" value={formData.wholesalePrice} onChange={(e) => setFormData({...formData, wholesalePrice: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" placeholder="Optional" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">Min Wholesale Qty</label>
                      <input type="number" value={formData.minWholesaleQty} onChange={(e) => setFormData({...formData, minWholesaleQty: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" placeholder="Min 12" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">Customization Price (₹)</label>
                      <input type="number" value={formData.customizationPrice} onChange={(e) => setFormData({...formData, customizationPrice: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" placeholder="Optional" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">Min Customization Qty</label>
                      <input type="number" value={formData.minCustomizationQty} onChange={(e) => setFormData({...formData, minCustomizationQty: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" placeholder="Min 100" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400">Stock Qty</label>
                      <input type="number" value={formData.stockQuantity} onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" required />
                    </div>
                    <div className="flex flex-col gap-2 text-center">
                      <label className="text-sm font-medium text-gray-400">Visibility</label>
                      <button 
                        type="button" 
                        onClick={() => setFormData({...formData, inStock: !formData.inStock})}
                        className={`h-[52px] rounded-2xl font-bold transition-all text-xs uppercase tracking-tighter ${formData.inStock ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}
                      >
                        {formData.inStock ? "Visible" : "Hidden"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Enable Customization Label</label>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, allowCustomization: !formData.allowCustomization})}
                    className={`h-[52px] w-full rounded-2xl font-bold transition-all text-xs uppercase tracking-widest ${formData.allowCustomization ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" : "bg-white/5 text-gray-500 border border-white/10"}`}
                  >
                    {formData.allowCustomization ? "Customization Badge: ON" : "Customization Badge: OFF"}
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Key Features</label>
                  <div className="flex gap-2">
                    <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="e.g. Waterproof" className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white" />
                    <button 
                      type="button" 
                      onClick={() => { if(newFeature) { setFormData({...formData, features: [...formData.features, newFeature]}); setNewFeature(""); } }}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-2xl transition-all"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.features.map((f, i) => (
                      <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-gray-300 flex items-center gap-2">
                        {f}
                        <button type="button" onClick={() => setFormData({...formData, features: formData.features.filter((_, idx) => idx !== i)})} className="text-red-500 hover:text-red-400"><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-sm font-medium text-gray-400">Product Images</label>
                  
                  {/* Paste URL Input */}
                  <div className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={urlInput} 
                      onChange={(e) => setUrlInput(e.target.value)} 
                      placeholder="Paste Image URL here..." 
                      className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[var(--color-brand-orange)] text-white text-sm" 
                    />
                    <button 
                      type="button" 
                      onClick={handleAddImageUrl}
                      className="bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white px-6 rounded-2xl font-bold transition-all text-xs uppercase"
                    >
                      Add URL
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {(formData.images || []).filter(img => img && (img.startsWith("http") || img.startsWith("/") || img.startsWith("data:"))).map((img, i) => (
                      <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/30">
                        <Image src={img} alt="Preview" fill className="object-contain p-1" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-red-500/60 items-center justify-center hidden group-hover:flex"><Trash2 size={16} className="text-white" /></button>
                      </div>
                    ))}
                    <label className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 text-gray-500 cursor-pointer hover:text-white hover:border-white/30 transition-all">
                      <ImageIcon size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white font-bold rounded-2xl py-4 mt-4 transition-all shadow-lg uppercase tracking-widest">
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
