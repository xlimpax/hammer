"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };
  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            Contact <span className="text-[var(--color-brand-orange)]">Us</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
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
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center text-[var(--color-brand-orange)] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-lg">XL IMPAX BAG MANUFACTURER</h4>
                    <p className="text-[10px] font-black text-[var(--color-brand-orange)] uppercase tracking-widest mb-1">XL BAG FACTORY</p>
                    <a 
                      href="https://share.google/kymZSKfMG8Y5lQ6Qb" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[var(--color-brand-orange)] transition-colors"
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
                    <h4 className="font-bold text-white mb-1 text-lg">Call/WhatsApp</h4>
                    <p className="text-gray-400">+91 9903747606</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center text-[var(--color-brand-orange)] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-lg">Email Us</h4>
                    <p className="text-gray-400">xlimpax@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center text-[var(--color-brand-orange)] shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-lg">Working Hours</h4>
                    <p className="text-gray-400">Mon - Sat: 10:00 AM - 08:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Shortcut */}
            <div className="bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-transparent p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold mb-2 text-white">Join the Club</h3>
              <p className="text-gray-400 text-sm mb-0">Subscribe to get notified about new drops and special discounts.</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-3xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Send Us a Message</h2>
            
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-8 text-[var(--color-brand-orange)] font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe" 
                      className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Subject</label>
                  <input 
                    required
                    type="text" 
                    placeholder="How can we help?" 
                    className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Message</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Write your message here..." 
                    className="bg-black/50 border border-white/10 rounded-3xl px-5 py-4 focus:outline-none focus:border-[var(--color-brand-orange)] transition-colors text-white resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--color-brand-orange)]/20 uppercase tracking-widest text-sm"
                >
                  Send Message <Send size={20} />
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map Location */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass p-4 rounded-[40px] border border-white/10 overflow-hidden"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123456789!2d88.666666!3d22.8464672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8bc2773410a51%3A0xe54d65012543e061!2sAshutosh%20Colony%2C%20Habra%2C%20West%20Bengal%20743271!5e0!3m2!1sen!2sin!4v1715418000000!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '32px', filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}
