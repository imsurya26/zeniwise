export type UserRole = 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  linkedParentId?: string;
  linkedStudentId?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  completed: boolean;
  createdAt: string;
}

export interface PrivacySettings {
  userId: string;
  hideTransactions: boolean;
  hideGoals: boolean;
  hideBalance: boolean;
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface CurrencyContextType {
  currency: Currency;
  symbol: string;
  setCurrency: (currency: Currency) => void;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
