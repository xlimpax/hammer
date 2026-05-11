import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface MessageState {
  announcements: string[];
  trending: string[];
  heroBadge: string;
  returnsPolicy: string;
  faqs: FAQ[];
  socialLinks: SocialLinks;
  updateAnnouncements: (messages: string[]) => void;
  updateTrending: (messages: string[]) => void;
  updateHeroBadge: (message: string) => void;
  updateReturnsPolicy: (policy: string) => void;
  updateFaqs: (faqs: FAQ[]) => void;
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
      returnsPolicy: "### Returns & Exchanges\n\nAt HAMMER, we strive for perfection. If you are not satisfied with your purchase, we offer a **7-day return and exchange policy**.\n\n#### Conditions for Returns:\n* Product must be unused and in original packaging.\n* All tags and labels must be intact.\n* Proof of purchase (invoice) is mandatory.\n\n#### Non-Returnable Items:\n* Customized/Personalized bags.\n* Items purchased during clearance sales.",
      faqs: [
        { question: "How can I track my order?", answer: "Once your order is shipped, you will receive an SMS and email with a tracking link. You can also use the 'Track Order' link in our footer." },
        { question: "Do you offer international shipping?", answer: "Currently, we only ship within India. We are working on global shipping options soon!" },
        { question: "Can I customize a single bag?", answer: "Customization is generally available for bulk orders (minimum 100 units). However, for specific corporate gifts, please contact us." },
        { question: "What is the warranty period?", answer: "Most HAMMER bags come with a 1-year brand warranty covering manufacturing defects like zippers and stitching." }
      ],
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
      updateReturnsPolicy: (policy) => set({ returnsPolicy: policy }),
      updateFaqs: (faqs) => set({ faqs }),
      updateSocialLinks: (links) => set({ socialLinks: links }),
    }),
    {
      name: 'hammer-messages',
    }
  )
);
