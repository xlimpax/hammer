"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--color-brand-white)] mb-4">
            Contact <span className="text-[var(--color-brand-orange)]">Us</span>
          </h1>
          <p className="text-[var(--color-brand-light)] max-w-2xl mx-auto text-lg font-light">
            Have questions about our products or your order? We're here to help. Reach out to the HAMMER team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="glass p-8 rounded-3xl border border-black/5 shadow-xl">
              <h2 className="text-2xl font-bold mb-8 text-[var(--color-brand-white)]">Get In Touch</h2>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center text-[var(--color-brand-orange)] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-white)] mb-1 text-lg">Our Store</h4>
                    <a 
                      href="https://share.google/kymZSKfMG8Y5lQ6Qb" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--color-brand-light)] hover:text-[var(--color-brand-orange)] transition-colors"
                    >
                      Ashutosh Colony, Vivekananda Park, Sreenagar, Habra, West Bengal 743271
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center text-[var(--color-brand-orange)] shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-white)] mb-1 text-lg">Call/WhatsApp</h4>
                    <p className="text-[var(--color-brand-light)]">+91 9903747606</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center text-[var(--color-brand-orange)] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-white)] mb-1 text-lg">Email Us</h4>
                    <p className="text-[var(--color-brand-light)]">xlimpax@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center text-[var(--color-brand-orange)] shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-white)] mb-1 text-lg">Working Hours</h4>
                    <p className="text-[var(--color-brand-light)]">Mon - Sat: 10:00 AM - 08:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Shortcut */}
            <div className="bg-gradient-to-br from-[var(--color-brand-orange)]/5 to-transparent p-8 rounded-3xl border border-black/5">
              <h3 className="text-xl font-bold mb-2 text-[var(--color-brand-white)]">Join the Club</h3>
              <p className="text-[var(--color-brand-light)] text-sm mb-0">Subscribe to get notified about new drops and special discounts.</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-3xl border border-black/5 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-8 text-[var(--color-brand-white)]">Send Us a Message</h2>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--color-brand-light)]">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="bg-black/5 border border-black/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-[var(--color-brand-white)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--color-brand-light)]">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-black/5 border border-black/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-[var(--color-brand-white)]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-brand-light)]">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="bg-black/5 border border-black/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-[var(--color-brand-white)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-brand-light)]">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Write your message here..." 
                  className="bg-black/5 border border-black/10 rounded-3xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-[var(--color-brand-white)] resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--color-brand-orange)]/20"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
