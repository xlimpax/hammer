"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { useMessageStore } from "@/store/useMessageStore";
import { useState, useEffect } from "react";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const socialIcons: Record<string, () => React.ReactNode> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  whatsapp: WhatsappIcon,
};

const socialColors: Record<string, string> = {
  facebook: "hover:bg-[#1877F2]",
  instagram: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743]",
  twitter: "hover:bg-black",
  youtube: "hover:bg-[#FF0000]",
  whatsapp: "hover:bg-[#25D366]",
};

export default function Footer() {
  const { socialLinks } = useMessageStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer id="contact" className="bg-[#050505] pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/">
              <span className="text-3xl font-black tracking-tighter text-white">
                HAMMER<span className="text-[var(--color-brand-orange)]">.</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Carry Power. Carry HAMMER. Premium bags designed for the modern lifestyle, blending aesthetics with uncompromising durability.
            </p>
            <div className="flex items-center gap-3">
              {mounted && Object.entries(socialLinks || {}).map(([platform, url]) => {
                if (!url) return null;
                const IconComponent = socialIcons[platform];
                if (!IconComponent) return null;
                return (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 ${socialColors[platform] || "hover:bg-[var(--color-brand-orange)]"}`}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--color-brand-white)] font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {['Home', 'Shop', 'About Us', 'Contact', 'Blog'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-[var(--color-brand-light)] hover:text-[var(--color-brand-orange)] text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/careers" className="text-[var(--color-brand-light)] hover:text-[var(--color-brand-orange)] text-sm transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[var(--color-brand-white)] font-bold mb-6 text-lg">Customer Service</h4>
            <ul className="flex flex-col gap-3">
              {['FAQ', 'Shipping Policy', 'Returns & Exchanges', 'Track Order'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[var(--color-brand-light)] hover:text-[var(--color-brand-orange)] text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/warranty" className="text-[var(--color-brand-light)] hover:text-[var(--color-brand-orange)] text-sm transition-colors">
                  Warranty Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--color-brand-orange)] shrink-0 mt-0.5" />
                <a 
                  href="https://share.google/kymZSKfMG8Y5lQ6Qb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-brand-orange)] transition-colors"
                >
                  Ashutosh Colony, Vivekananda Park, Sreenagar, Habra, West Bengal 743271
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--color-brand-orange)] shrink-0" />
                <span>+91 9903747606</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--color-brand-orange)] shrink-0" />
                <span>xlimpax@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HAMMER. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/admin/login" className="hover:text-[var(--color-brand-orange)] transition-colors">Admin Login</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
