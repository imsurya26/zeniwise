import { Transaction, Goal, PrivacySettings } from "@/types";

export function initializeMockData() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem("transactions")) {
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        userId: "demo-student",
        type: "income",
        category: "Allowance",
        amount: 5000,
        description: "Monthly allowance",
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        userId: "demo-student",
        type: "expense",
        category: "Food",
        amount: 450,
        description: "Lunch at cafeteria",
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        userId: "demo-student",
        type: "expense",
        category: "Transport",
        amount: 200,
        description: "Bus pass",
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("transactions", JSON.stringify(mockTransactions));
  }

  if (!localStorage.getItem("goals")) {
    const mockGoals: Goal[] = [
      {
        id: "1",
        userId: "demo-student",
        title: "New Laptop",
        targetAmount: 50000,
        currentAmount: 15000,
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        userId: "demo-student",
        title: "Emergency Fund",
        targetAmount: 10000,
        currentAmount: 7500,
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("goals", JSON.stringify(mockGoals));
  }

  if (!localStorage.getItem("privacySettings")) {
    const mockPrivacy: PrivacySettings = {
      userId: "demo-student",
      hideTransactions: false,
      hideGoals: false,
      hideBalance: false,
    };
    localStorage.setItem("privacySettings", JSON.stringify(mockPrivacy));
  }
}

export const expenseCategories = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Education",
  "Health",
  "Bills",
  "Other"
];

export const incomeCategories = [
  "Allowance",
  "Part-time Job",
  "Scholarship",
  "Gift",
  "Other"
];
