"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { Currency } from "@/types";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const currencies: Currency[] = ["INR", "USD", "EUR", "GBP", "JPY"];
  
  const symbols: Record<Currency, string> = {
    INR: "₹ INR",
    USD: "$ USD",
    EUR: "€ EUR",
    GBP: "£ GBP",
    JPY: "¥ JPY"
  };

  return (
    <select
      className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
    >
      {currencies.map((c) => (
        <option key={c} value={c}>
          {symbols[c]}
        </option>
      ))}
    </select>
  );
}
