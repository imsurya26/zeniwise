"use client";

import { motion } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";

interface StatCardProps {
  title: string;
  amount: number;
  icon: string;
  color: string;
  trend?: string;
}

export default function StatCard({ title, amount, icon, color, trend }: StatCardProps) {
  const { symbol } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {symbol}{amount.toFixed(2)}
          </p>
          {trend && (
            <p className="text-xs text-gray-500 mt-1">{trend}</p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </motion.div>
  );
}
