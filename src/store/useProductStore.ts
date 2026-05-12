import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  price: number;
  wholesalePrice?: number;
  minWholesaleQty?: number;
  customizationPrice?: number;
  minCustomizationQty?: number;
  allowCustomization: boolean;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  inStock: boolean;
  stockQuantity: number;
}

interface ProductState {
  products: Product[];
  retailShippingCharge: number;
  upiId: string;
  whatsappNumber: string;
  activePaymentModes: {
    whatsapp: boolean;
    upi: boolean;
    cards: boolean;
  };
  addProduct: (product: Omit<Product, 'id' | 'rating'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  deductStock: (id: number, quantity: number) => void;
  updateShippingCharge: (charge: number) => void;
  updatePaymentSettings: (settings: Partial<ProductState['activePaymentModes']>, upiId?: string, whatsappNumber?: string) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Titan Travel Duffel", 
    description: "The ultimate companion for long-haul adventures.",
    features: ["Waterproof Fabric", "60L Capacity", "Shoe Compartment"],
    price: 10999, 
    originalPrice: 15999,
    category: "Travel Bags", 
    rating: 4.8, 
    images: ["/images/travel.png"],
    inStock: true,
    stockQuantity: 45,
    allowCustomization: false
  },
  { 
    id: 2, 
    name: "Aero Laptop Backpack", 
    description: "Sleek, aerodynamic, and ready for the boardroom.",
    features: ["16-inch Laptop Sleeve", "USB Charging Port", "Anti-theft Pocket"],
    price: 7499, 
    originalPrice: 9999,
    category: "Laptop Bags", 
    rating: 4.9, 
    images: ["/images/laptop.png"],
    inStock: true,
    stockQuantity: 12,
    allowCustomization: false
  },
];

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      retailShippingCharge: 49,
      upiId: "9903747606@ybl",
      whatsappNumber: "919903747606",
      activePaymentModes: {
        whatsapp: true,
        upi: true,
        cards: true,
      },
      
      addProduct: (newProduct) => set((state) => ({
        products: [...state.products, { ...newProduct, id: Date.now(), rating: 5.0 }]
      })),

      updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      
      deductStock: (id, quantity) => set((state) => ({
        products: state.products.map(p => 
          p.id === id 
            ? { ...p, stockQuantity: Math.max(0, p.stockQuantity - quantity), inStock: p.stockQuantity - quantity > 0 } 
            : p
        )
      })),

      updateShippingCharge: (charge) => set({ retailShippingCharge: charge }),

      updatePaymentSettings: (settings, upiId, whatsappNumber) => set((state) => ({
        activePaymentModes: { ...state.activePaymentModes, ...settings },
        ...(upiId ? { upiId } : {}),
        ...(whatsappNumber ? { whatsappNumber } : {})
      })),
    }),
    {
      name: 'hammer-products', // Key for localStorage
    }
  )
);
