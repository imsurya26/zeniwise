"use client";

import { motion } from "framer-motion";
import { Goal } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { formatDate } from "@/lib/utils";

interface GoalCardProps {
  goal: Goal;
  onAddFunds?: (goal: Goal) => void;
  onDelete?: (id: string) => void;
}

export default function GoalCard({ goal, onAddFunds, onDelete }: GoalCardProps) {
  const { symbol } = useCurrency();
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const isCompleted = goal.completed || progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md p-6 ${
        isCompleted ? "border-2 border-secondary" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
          <p className="text-sm text-gray-500">Target: {formatDate(goal.deadline)}</p>
        </div>
        {isCompleted && <span className="text-2xl">✅</span>}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full rounded-full ${
              isCompleted ? "bg-secondary" : "bg-primary"
            }`}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">Current</p>
          <p className="text-lg font-bold text-gray-900">
            {symbol}{goal.currentAmount.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Target</p>
          <p className="text-lg font-bold text-gray-900">
            {symbol}{goal.targetAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {!isCompleted && (onAddFunds || onDelete) && (
        <div className="flex space-x-2">
          {onAddFunds && (
            <button
              onClick={() => onAddFunds(goal)}
              className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add Funds
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(goal.id)}
              className="px-4 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
