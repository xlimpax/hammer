import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Titan Travel Duffel", price: 10999, category: "Travel Bags", rating: 4.8, images: ["/images/travel.png"] },
  { id: 2, name: "Aero Laptop Backpack", price: 7499, category: "Laptop Bags", rating: 4.9, images: ["/images/laptop.png"] },
  { id: 3, name: "Urban Gym Bag", price: 6299, category: "Gym Bags", rating: 4.7, images: ["/images/gym.png"] },
  { id: 4, name: "Nomad Everyday Pack", price: 8999, category: "Office Bags", rating: 4.6, images: ["/images/hero.png"] },
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
