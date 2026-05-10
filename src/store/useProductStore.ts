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
  addProduct: (product: Omit<Product, 'id' | 'rating'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
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
    stockQuantity: 45
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
    stockQuantity: 12
  },
];

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      
      addProduct: (newProduct) => set((state) => ({
        products: [...state.products, { ...newProduct, id: Date.now(), rating: 5.0 }]
      })),

      updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
    }),
    {
      name: 'hammer-products', // Key for localStorage
    }
  )
);
