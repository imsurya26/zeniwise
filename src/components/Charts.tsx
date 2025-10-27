"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useCurrency } from "@/context/CurrencyContext";

interface ExpenseChartProps {
  data: Record<string, number>;
}

export function ExpensePieChart({ data }: ExpenseChartProps) {
  const { symbol } = useCurrency();
  
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${symbol}${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface SpendingTrendProps {
  data: Array<{ date: string; amount: number }>;
}

export function SpendingTrendChart({ data }: SpendingTrendProps) {
  const { symbol } = useCurrency();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value: number) => `${symbol}${value.toFixed(2)}`} />
        <Bar dataKey="amount" fill="#6366F1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
