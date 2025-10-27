"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import PrivacyToggle from "@/components/PrivacyToggle";
import { motion } from "framer-motion";
import { getPrivacySettings, updatePrivacySettings } from "@/lib/utils";
import { PrivacySettings } from "@/types";

export default function Privacy() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [settings, setSettings] = useState<PrivacySettings>({
    userId: "",
    hideTransactions: false,
    hideGoals: false,
    hideBalance: false,
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

    const userSettings = getPrivacySettings(user.id);
    setSettings(userSettings);
  }, [isAuthenticated, user, router]);

  const handleToggle = (key: keyof Omit<PrivacySettings, "userId">, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updatePrivacySettings(newSettings);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Privacy Settings</h1>
          <p className="text-gray-600 mt-1">Control what parents can see</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <div className="flex items-center space-x-3 mb-6 p-4 bg-blue-50 rounded-lg">
            <span className="text-3xl">🔒</span>
            <div>
              <h3 className="font-semibold text-gray-900">Your Privacy Matters</h3>
              <p className="text-sm text-gray-600">
                Control what information is visible to linked parent accounts
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <PrivacyToggle
              label="Hide Transactions"
              description="Parents won't see your transaction history"
              enabled={settings.hideTransactions}
              onChange={(value) => handleToggle("hideTransactions", value)}
            />
            <PrivacyToggle
              label="Hide Goals"
              description="Parents won't see your savings goals"
              enabled={settings.hideGoals}
              onChange={(value) => handleToggle("hideGoals", value)}
            />
            <PrivacyToggle
              label="Hide Balance"
              description="Parents won't see your current balance"
              enabled={settings.hideBalance}
              onChange={(value) => handleToggle("hideBalance", value)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-2">💡 Privacy Tips</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>• Privacy settings only affect parent accounts linked to you</li>
            <li>• You can change these settings anytime</li>
            <li>• Hidden data is still saved and visible to you</li>
            <li>• Parents will see a message when data is hidden</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mt-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Link Parent Account</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share a unique code with your parent to link their account
          </p>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={user.id}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(user.id);
                alert("Code copied to clipboard!");
              }}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Copy Code
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
