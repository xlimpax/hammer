"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/store/useCurrencyStore";

export default function CurrencyInitializer() {
  const { detectCurrency } = useCurrencyStore();

  useEffect(() => {
    detectCurrency();
  }, []);

  return null;
}
