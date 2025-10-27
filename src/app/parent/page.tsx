"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import StatCard from "@/components/StatCard";
import TransactionCard from "@/components/TransactionCard";
import GoalCard from "@/components/GoalCard";
import { motion } from "framer-motion";
import { getTransactions, getGoals, calculateBalance, calculateTotalIncome, calculateTotalExpenses, getPrivacySettings } from "@/lib/utils";
import { Transaction, Goal } from "@/types";

export default function ParentDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [linkedStudentId, setLinkedStudentId] = useState("");
  const [studentData, setStudentData] = useState<{
    transactions: Transaction[];
    goals: Goal[];
    balance: number;
    income: number;
    expenses: number;
  } | null>(null);
  const [privacySettings, setPrivacySettings] = useState({
    hideTransactions: false,
    hideGoals: false,
    hideBalance: false,
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/");
      return;
    }
    if (user.role !== "parent") {
      router.push("/dashboard");
      return;
    }

    const savedStudentId = localStorage.getItem(`parent_${user.id}_linked_student`);
    if (savedStudentId) {
      setLinkedStudentId(savedStudentId);
      loadStudentData(savedStudentId);
    }
  }, [isAuthenticated, user, router]);

  const loadStudentData = (studentId: string) => {
    const transactions = getTransactions(studentId);
    const goals = getGoals(studentId);
    const privacy = getPrivacySettings(studentId);

    setPrivacySettings(privacy);
    setStudentData({
      transactions,
      goals,
      balance: calculateBalance(transactions),
      income: calculateTotalIncome(transactions),
      expenses: calculateTotalExpenses(transactions),
    });
  };

  const handleLinkStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkedStudentId.trim()) {
      localStorage.setItem(`parent_${user?.id}_linked_student`, linkedStudentId);
      loadStudentData(linkedStudentId);
    }
  };

  if (!user) return null;

  if (!studentData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">👨‍👩‍👧</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Dashboard</h1>
              <p className="text-gray-600">Link to your child's account to view their financial data</p>
            </div>

            <form onSubmit={handleLinkStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Account Code
                </label>
                <input
                  type="text"
                  value={linkedStudentId}
                  onChange={(e) => setLinkedStudentId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter student's account code"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ask your child for their account code from Privacy Settings
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Link Account
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">🔒 Privacy Respected</h3>
              <p className="text-sm text-gray-600">
                You'll only see data that your child has chosen to share with you. 
                They can control their privacy settings at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Student Financial Overview</h1>
          <p className="text-gray-600 mt-1">Read-only view of linked student account</p>
          <button
            onClick={() => {
              localStorage.removeItem(`parent_${user.id}_linked_student`);
              setStudentData(null);
              setLinkedStudentId("");
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Unlink Account
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {privacySettings.hideBalance ? (
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400">
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-gray-600 font-medium">Balance Hidden</p>
                <p className="text-sm text-gray-500 mt-1">Student has hidden this data</p>
              </div>
            </div>
          ) : (
            <StatCard
              title="Current Balance"
              amount={studentData.balance}
              icon="💰"
              color="border-primary"
            />
          )}
          <StatCard
            title="Total Income"
            amount={studentData.income}
            icon="📈"
            color="border-secondary"
          />
          <StatCard
            title="Total Expenses"
            amount={studentData.expenses}
            icon="📉"
            color="border-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
            {privacySettings.hideTransactions ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Transactions Hidden
                </h3>
                <p className="text-gray-600">
                  Student has chosen to keep transactions private
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {studentData.transactions.slice(-5).reverse().map((transaction) => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
                {studentData.transactions.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    No transactions yet
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Savings Goals</h2>
            {privacySettings.hideGoals ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Goals Hidden
                </h3>
                <p className="text-gray-600">
                  Student has chosen to keep goals private
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {studentData.goals.slice(0, 3).map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
                {studentData.goals.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    No goals set yet
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl p-6"
        >
          <div className="flex items-center space-x-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-semibold text-lg">Parent View - Read Only</h3>
              <p className="text-sm opacity-90">
                This is a read-only view. You cannot modify your child's financial data. 
                Encourage them to develop healthy financial habits!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
