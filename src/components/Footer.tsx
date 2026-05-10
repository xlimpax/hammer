import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
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
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-bold text-xs hover:bg-[var(--color-brand-orange)] hover:text-white transition-all">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-bold text-xs hover:bg-[var(--color-brand-orange)] hover:text-white transition-all">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-bold text-xs hover:bg-[var(--color-brand-orange)] hover:text-white transition-all">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 font-bold text-xs hover:bg-[var(--color-brand-orange)] hover:text-white transition-all">
                YT
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {['Home', 'Shop', 'About Us', 'Contact', 'Blog'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-[var(--color-brand-orange)] text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Customer Service</h4>
            <ul className="flex flex-col gap-3">
              {['FAQ', 'Shipping Policy', 'Returns & Exchanges', 'Track Order', 'Warranty'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-[var(--color-brand-orange)] text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
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
