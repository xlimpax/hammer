import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MessageState {
  announcements: string[];
  trending: string[];
  heroBadge: string;
  updateAnnouncements: (messages: string[]) => void;
  updateTrending: (messages: string[]) => void;
  updateHeroBadge: (message: string) => void;
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

      updateAnnouncements: (messages) => set({ announcements: messages }),
      updateTrending: (messages) => set({ trending: messages }),
      updateHeroBadge: (message) => set({ heroBadge: message }),
    }),
    {
      name: 'hammer-messages',
    }
  )
);
