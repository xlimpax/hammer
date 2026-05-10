"use client";

import { useState, useEffect } from "react";
import { useCurrencyStore } from "@/store/useCurrencyStore";

export default function Price({ amount, className = "" }: { amount: number | string, className?: string }) {
  const { symbol, rate, isLoading } = useCurrencyStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted || isLoading) {
    return <span className={`${className} opacity-50`}>...</span>;
  }

  const convertedAmount = Number(amount) * rate;
  
  return (
    <span className={className}>
      {symbol}{convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
    </span>
  );
}
