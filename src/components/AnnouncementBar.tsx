"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMessageStore } from "@/store/useMessageStore";

export default function AnnouncementBar() {
  const { announcements } = useMessageStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="sticky top-0 z-[70] bg-[var(--color-brand-orange)] text-white overflow-hidden py-2 shadow-md">
      <div className="container mx-auto px-6 flex items-center justify-center gap-4">
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-20 whitespace-nowrap"
        >
          {announcements.map((msg, i) => (
            <div key={i} className="flex items-center gap-2 font-bold text-xs md:text-sm uppercase tracking-widest">
              <Tag size={14} />
              {msg}
            </div>
          ))}
        </motion.div>
        

      </div>
    </div>
  );
}
