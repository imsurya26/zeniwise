"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import GoalCard from "@/components/GoalCard";
import { motion } from "framer-motion";
import { getGoals, addGoal, updateGoal, deleteGoal } from "@/lib/utils";
import { Goal } from "@/types";

export default function Goals() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [fundAmount, setFundAmount] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
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
    loadGoals();
  }, [isAuthenticated, user, router]);

  const loadGoals = () => {
    if (user) {
      const userGoals = getGoals(user.id);
      setGoals(userGoals);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      userId: user.id,
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addGoal(newGoal);
    setFormData({ title: "", targetAmount: "", deadline: "" });
    setShowForm(false);
    loadGoals();
  };

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoal) return;

    const amount = parseFloat(fundAmount);
    const newAmount = selectedGoal.currentAmount + amount;
    const completed = newAmount >= selectedGoal.targetAmount;

    updateGoal(selectedGoal.id, {
      currentAmount: newAmount,
      completed,
    });

    setFundAmount("");
    setShowAddFunds(false);
    setSelectedGoal(null);
    loadGoals();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(id);
      loadGoals();
    }
  };

  const openAddFunds = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowAddFunds(true);
  };

  if (!user) return null;

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
            <p className="text-gray-600 mt-1">Set and track your financial goals</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            {showForm ? "Cancel" : "+ New Goal"}
          </button>
        </div>

        {/* Goal Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., New Laptop, Emergency Fund"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Goal
              </button>
            </form>
          </motion.div>
        )}

        {/* Add Funds Modal */}
        {showAddFunds && selectedGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddFunds(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Add Funds to {selectedGoal.title}
              </h2>
              <form onSubmit={handleAddFunds} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount to Add
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0.00"
                    required
                    autoFocus
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add Funds
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddFunds(false);
                      setFundAmount("");
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onAddFunds={openAddFunds}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Completed Goals 🎉</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No goals yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start saving by creating your first financial goal
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
