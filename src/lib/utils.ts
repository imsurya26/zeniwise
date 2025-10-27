import { Transaction, Goal, PrivacySettings } from "@/types";

export function getTransactions(userId: string): Transaction[] {
  if (typeof window === 'undefined') return [];
  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  return transactions.filter((t: Transaction) => t.userId === userId);
}

export function addTransaction(transaction: Transaction): void {
  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

export function updateTransaction(id: string, updates: Partial<Transaction>): void {
  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  const index = transactions.findIndex((t: Transaction) => t.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...updates };
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
}

export function deleteTransaction(id: string): void {
  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  const filtered = transactions.filter((t: Transaction) => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(filtered));
}

export function getGoals(userId: string): Goal[] {
  if (typeof window === 'undefined') return [];
  const goals = JSON.parse(localStorage.getItem("goals") || "[]");
  return goals.filter((g: Goal) => g.userId === userId);
}

export function addGoal(goal: Goal): void {
  const goals = JSON.parse(localStorage.getItem("goals") || "[]");
  goals.push(goal);
  localStorage.setItem("goals", JSON.stringify(goals));
}

export function updateGoal(id: string, updates: Partial<Goal>): void {
  const goals = JSON.parse(localStorage.getItem("goals") || "[]");
  const index = goals.findIndex((g: Goal) => g.id === id);
  if (index !== -1) {
    goals[index] = { ...goals[index], ...updates };
    localStorage.setItem("goals", JSON.stringify(goals));
  }
}

export function deleteGoal(id: string): void {
  const goals = JSON.parse(localStorage.getItem("goals") || "[]");
  const filtered = goals.filter((g: Goal) => g.id !== id);
  localStorage.setItem("goals", JSON.stringify(filtered));
}

export function getPrivacySettings(userId: string): PrivacySettings {
  if (typeof window === 'undefined') {
    return { userId, hideTransactions: false, hideGoals: false, hideBalance: false };
  }
  const settings = localStorage.getItem("privacySettings");
  if (settings) {
    const parsed = JSON.parse(settings);
    if (parsed.userId === userId) return parsed;
  }
  return { userId, hideTransactions: false, hideGoals: false, hideBalance: false };
}

export function updatePrivacySettings(settings: PrivacySettings): void {
  localStorage.setItem("privacySettings", JSON.stringify(settings));
}

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);
}

export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
}

export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function getExpensesByCategory(transactions: Transaction[]): Record<string, number> {
  const expenses = transactions.filter(t => t.type === 'expense');
  const byCategory: Record<string, number> = {};
  
  expenses.forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });
  
  return byCategory;
}
