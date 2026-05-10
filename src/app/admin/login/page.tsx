"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("admin_auth")) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === "admin" && password === "xlimpax121989") {
      localStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid ID or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-dark)] px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-orange)]/5 to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <span className="text-3xl font-black tracking-tighter text-white">
              HAMMER<span className="text-[var(--color-brand-orange)]">.</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold mt-4 text-white">Admin Portal</h2>
          <p className="text-gray-400 text-sm mt-1">Enter credentials to manage your store</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Admin ID</label>
            <input 
              type="text" 
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Enter ID" 
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password" 
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-white"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white font-bold rounded-2xl py-4 transition-all shadow-lg shadow-[var(--color-brand-orange)]/20"
          >
            Login to Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
            &larr; Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
