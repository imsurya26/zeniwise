"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import StatCard from "@/components/StatCard";
import TransactionCard from "@/components/TransactionCard";
import { ExpensePieChart } from "@/components/Charts";
import { motion } from "framer-motion";
import { getTransactions, calculateBalance, calculateTotalIncome, calculateTotalExpenses, getExpensesByCategory } from "@/lib/utils";
import { getAITip } from "@/lib/aiTips";
import { Transaction } from "@/types";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [aiTip, setAiTip] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/");
      return;
    }
    if (user.role !== "student") {
      router.push("/parent");
      return;
    }

    const userTransactions = getTransactions(user.id);
    setTransactions(userTransactions);
    setAiTip(getAITip());
  }, [isAuthenticated, user, router]);

  if (!user) return null;

  const balance = calculateBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const expensesByCategory = getExpensesByCategory(transactions);
  const recentTransactions = transactions.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
          <p className="text-gray-600 mt-1">Here's your financial overview</p>
        </motion.div>

        {/* AI Tip Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl p-6 mb-8 shadow-lg"
        >
          <div className="flex items-center space-x-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-semibold text-lg">AI Finance Tip</h3>
              <p className="text-sm opacity-90">{aiTip}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Current Balance"
            amount={balance}
            icon="💰"
            color="border-primary"
          />
          <StatCard
            title="Total Income"
            amount={totalIncome}
            icon="📈"
            color="border-secondary"
          />
          <StatCard
            title="Total Expenses"
            amount={totalExpenses}
            icon="📉"
            color="border-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expense Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Expense Breakdown</h2>
            {Object.keys(expensesByCategory).length > 0 ? (
              <ExpensePieChart data={expensesByCategory} />
            ) : (
              <div className="text-center text-gray-500 py-12">
                No expenses yet. Start tracking your spending!
              </div>
            )}
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
              <button
                onClick={() => router.push("/transactions")}
                className="text-sm text-primary hover:text-blue-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))
              ) : (
                <div className="text-center text-gray-500 py-12">
                  No transactions yet. Add your first transaction!
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => router.push("/transactions")}
              className="p-4 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              <div className="text-3xl mb-2">💳</div>
              <div className="text-sm font-medium">Add Transaction</div>
            </button>
            <button
              onClick={() => router.push("/goals")}
              className="p-4 bg-secondary text-white rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm font-medium">Set Goal</div>
            </button>
            <button
              onClick={() => router.push("/privacy")}
              className="p-4 bg-accent text-white rounded-lg hover:bg-yellow-600 transition-colors text-center"
            >
              <div className="text-3xl mb-2">🔒</div>
              <div className="text-sm font-medium">Privacy</div>
            </button>
            <button
              onClick={() => setAiTip(getAITip())}
              className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-center"
            >
              <div className="text-3xl mb-2">💡</div>
              <div className="text-sm font-medium">New Tip</div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
