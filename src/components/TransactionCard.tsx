"use client";

import { motion } from "framer-motion";
import { Transaction } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { formatDate } from "@/lib/utils";

interface TransactionCardProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

export default function TransactionCard({ transaction, onEdit, onDelete }: TransactionCardProps) {
  const { symbol } = useCurrency();
  const isIncome = transaction.type === "income";

  const categoryIcons: Record<string, string> = {
    Food: "🍔",
    Transport: "🚌",
    Entertainment: "🎬",
    Shopping: "🛍️",
    Education: "📚",
    Health: "🏥",
    Bills: "📄",
    Allowance: "💰",
    "Part-time Job": "💼",
    Scholarship: "🎓",
    Gift: "🎁",
    Other: "📦",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{categoryIcons[transaction.category] || "📦"}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
            <p className="text-sm text-gray-500">{transaction.category}</p>
            <p className="text-xs text-gray-400">{formatDate(transaction.date)}</p>
          </div>
        </div>
        <div className="text-right">
          <p
            className={`text-xl font-bold ${
              isIncome ? "text-secondary" : "text-red-500"
            }`}
          >
            {isIncome ? "+" : "-"}{symbol}{transaction.amount.toFixed(2)}
          </p>
          {(onEdit || onDelete) && (
            <div className="flex space-x-2 mt-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(transaction)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
