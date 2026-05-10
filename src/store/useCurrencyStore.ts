import { create } from 'zustand';
import axios from 'axios';

interface CurrencyState {
  currency: string;
  symbol: string;
  rate: number;
  isLoading: boolean;
  detectCurrency: () => Promise<void>;
}

const SYMBOLS: Record<string, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
};

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: 'INR',
  symbol: '₹',
  rate: 1,
  isLoading: false,

  detectCurrency: async () => {
    // Disabled automatic detection as per user request for all INR
    set({ isLoading: false });
    /*
    try {
      // 1. Detect location and currency
      const geoRes = await axios.get('https://ipapi.co/json/');
      const detectedCurrency = geoRes.data.currency || 'USD';
      
      // 2. Fetch exchange rates (Base USD)
      const rateRes = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const rate = rateRes.data.rates[detectedCurrency] || 1;

      set({
        currency: detectedCurrency,
        symbol: SYMBOLS[detectedCurrency] || detectedCurrency,
        rate: rate,
        isLoading: false,
      });
    } catch (error) {
      console.error('Currency detection failed:', error);
      set({ isLoading: false });
    }
    */
  },
}));
