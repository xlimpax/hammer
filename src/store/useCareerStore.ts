import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CareerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  date: string;
}

interface CareerStore {
  applications: CareerApplication[];
  addApplication: (app: Omit<CareerApplication, 'id' | 'status' | 'date'>) => void;
  updateStatus: (id: string, status: CareerApplication['status']) => void;
  deleteApplication: (id: string) => void;
}

export const useCareerStore = create<CareerStore>()(
  persist(
    (set) => ({
      applications: [],
      addApplication: (app) => set((state) => ({
        applications: [
          {
            ...app,
            id: Math.random().toString(36).substr(2, 9),
            status: 'pending',
            date: new Date().toISOString(),
          },
          ...state.applications,
        ],
      })),
      updateStatus: (id, status) => set((state) => ({
        applications: state.applications.map((app) => 
          app.id === id ? { ...app, status } : app
        ),
      })),
      deleteApplication: (id) => set((state) => ({
        applications: state.applications.filter((app) => app.id !== id),
      })),
    }),
    {
      name: 'hammer-careers-storage',
    }
  )
);
