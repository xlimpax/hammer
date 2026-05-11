"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Send, CheckCircle2, User, Mail, Phone, MessageSquare, ChevronRight } from "lucide-react";
import { useCareerStore } from "@/store/useCareerStore";
import Link from "next/link";

export default function CareersPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Sales Associate",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const addApplication = useCareerStore((state) => state.addApplication);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addApplication(formState);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormState({ name: "", email: "", phone: "", role: "Sales Associate", message: "" });
  };

  const roles = [
    { title: "Product Designer", type: "Full-time", location: "Remote / HQ" },
    { title: "Sales Associate", type: "Full-time", location: "Kolkata, WB" },
    { title: "Logistics Manager", type: "Full-time", location: "Habra, WB" },
    { title: "Marketing Lead", type: "Full-time", location: "Remote" }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] pt-32 pb-24 text-[var(--color-brand-white)]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Briefcase size={16} /> Join the Hammer Team
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            Build the Future <br/> of <span className="text-[var(--color-brand-orange)]">Carry.</span>
          </h1>
          <p className="text-[var(--color-brand-light)] max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We are looking for bold, creative, and driven individuals to help us redefine how the world carries power.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Openings */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold uppercase tracking-tighter">Current Openings</h2>
            <div className="space-y-4">
              {roles.map((role, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-3xl border border-white/5 group hover:border-[var(--color-brand-orange)] transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-[var(--color-brand-orange)] transition-colors">{role.title}</h3>
                      <div className="flex gap-4 mt-1 text-sm text-[var(--color-brand-light)] font-medium">
                        <span>{role.type}</span>
                        <span>•</span>
                        <span>{role.location}</span>
                      </div>
                    </div>
                    <ChevronRight className="text-[var(--color-brand-light)] group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-transparent p-10 rounded-[40px] border border-white/5">
              <h3 className="text-2xl font-bold mb-4">Don't see your role?</h3>
              <p className="text-[var(--color-brand-light)] leading-relaxed mb-6">
                We're always looking for exceptional talent. Fill out the form and tell us why you'd be a great fit for HAMMER.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence>
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[var(--color-brand-dark)] z-10 flex flex-col items-center justify-center text-center p-10"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Application Received!</h2>
                  <p className="text-[var(--color-brand-light)] mb-8">
                    Thanks for your interest in HAMMER. Our team will review your application and get back to you soon.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[var(--color-brand-orange)] font-bold uppercase tracking-widest text-sm hover:underline"
                  >
                    Send another application
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-[var(--color-brand-orange)]">Apply Now</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[var(--color-brand-light)] uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brand-light)]" size={18} />
                  <input 
                    required type="text" placeholder="John Doe"
                    value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[var(--color-brand-light)] uppercase tracking-widest">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brand-light)]" size={18} />
                    <input 
                      required type="email" placeholder="john@example.com"
                      value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[var(--color-brand-light)] uppercase tracking-widest">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-brand-light)]" size={18} />
                    <input 
                      required type="tel" placeholder="+91 ..."
                      value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[var(--color-brand-light)] uppercase tracking-widest">Role of Interest</label>
                <select 
                  value={formState.role} onChange={e => setFormState({...formState, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors appearance-none"
                >
                  {roles.map(r => <option key={r.title} value={r.title} className="bg-black">{r.title}</option>)}
                  <option value="Other" className="bg-black">Other / General Interest</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[var(--color-brand-light)] uppercase tracking-widest">Tell us about yourself</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-[var(--color-brand-light)]" size={18} />
                  <textarea 
                    required rows={4} placeholder="Experience, why HAMMER, links to portfolio..."
                    value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white font-bold rounded-2xl py-5 flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-900/20 uppercase tracking-widest"
              >
                Submit Application <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
