"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Currency, CurrencyContextType } from "@/types";

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("INR");
  
  const symbols: Record<Currency, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥"
  };

  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved && ["INR", "USD", "EUR", "GBP", "JPY"].includes(saved)) {
      setCurrencyState(saved as Currency);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("currency", c);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      symbol: symbols[currency], 
      setCurrency 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
};
