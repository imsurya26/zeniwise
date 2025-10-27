"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import TransactionCard from "@/components/TransactionCard";
import { motion } from "framer-motion";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "@/lib/utils";
import { expenseCategories, incomeCategories } from "@/lib/mockData";
import { Transaction } from "@/types";

export default function Transactions() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    type: "expense" as "income" | "expense",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/");
      return;
    }
    if (user.role !== "student") {
      router.push("/parent");
      return;
    }
    loadTransactions();
  }, [isAuthenticated, user, router]);

  const loadTransactions = () => {
    if (user) {
      const userTransactions = getTransactions(user.id);
      setTransactions(userTransactions.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, {
        ...formData,
        amount: parseFloat(formData.amount),
      });
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        userId: user.id,
        type: formData.type,
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
        date: formData.date,
        createdAt: new Date().toISOString(),
      };
      addTransaction(newTransaction);
    }

    setFormData({
      type: "expense",
      category: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
    setEditingTransaction(null);
    loadTransactions();
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount.toString(),
      description: transaction.description,
      date: transaction.date,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
      loadTransactions();
    }
  };

  const categories = formData.type === "expense" ? expenseCategories : incomeCategories;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-1">Track your income and expenses</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingTransaction(null);
              setFormData({
                type: "expense",
                category: "",
                amount: "",
                description: "",
                date: new Date().toISOString().split('T')[0],
              });
            }}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            {showForm ? "Cancel" : "+ Add Transaction"}
          </button>
        </div>

        {/* Transaction Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingTransaction ? "Edit Transaction" : "New Transaction"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "expense", category: "" })}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.type === "expense"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "income", category: "" })}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.type === "income"
                        ? "bg-secondary text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Income
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="What was this for?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {editingTransaction ? "Update Transaction" : "Add Transaction"}
              </button>
            </form>
          </motion.div>
        )}

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No transactions yet
              </h3>
              <p className="text-gray-600">
                Start tracking your finances by adding your first transaction
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
