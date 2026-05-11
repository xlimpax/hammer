import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
}

interface MessageState {
  announcements: string[];
  trending: string[];
  heroBadge: string;
  socialLinks: SocialLinks;
  updateAnnouncements: (messages: string[]) => void;
  updateTrending: (messages: string[]) => void;
  updateHeroBadge: (message: string) => void;
  updateSocialLinks: (links: SocialLinks) => void;
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      announcements: [
        "FLASH SALE: 20% OFF ON ALL TRAVEL BAGS! USE CODE: HAMMER20",
        "FREE SHIPPING ON ALL ORDERS ABOVE ₹5000",
        "CARRY POWER. CARRY HAMMER."
      ],
      trending: [
        "Trending: Titan Travel Duffel (Sold 500+ this week)",
        "New Arrival: Aero Laptop Backpack (Limit Edition)",
        "4.9/5 Rating from 2,000+ Customers"
      ],
      heroBadge: "Limited Time Offer: Get 20% Off + Free Shipping!",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        youtube: "https://youtube.com",
        whatsapp: "https://wa.me/919903747606",
      },

      updateAnnouncements: (messages) => set({ announcements: messages }),
      updateTrending: (messages) => set({ trending: messages }),
      updateHeroBadge: (message) => set({ heroBadge: message }),
      updateSocialLinks: (links) => set({ socialLinks: links }),
    }),
    {
      name: 'hammer-messages',
    }
  )
);
