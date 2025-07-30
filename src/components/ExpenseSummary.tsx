import React, { useMemo } from 'react';
import { TrendingUp, Calendar, PieChart } from 'lucide-react';
import type { Expense } from '../App';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const summary = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const thisMonth = new Date();
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === thisMonth.getMonth() && 
             expenseDate.getFullYear() === thisMonth.getFullYear();
    });
    const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals).reduce((top, [category, amount]) => 
      amount > top.amount ? { category, amount } : top, 
      { category: '', amount: 0 }
    );

    return {
      total,
      monthlyTotal,
      count: expenses.length,
      topCategory: topCategory.category || 'None'
    };
  }, [expenses]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <PieChart className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Summary</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Expenses</p>
              <p className="text-2xl font-bold text-blue-900">${summary.total.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">This Month</p>
              <p className="text-2xl font-bold text-green-900">${summary.monthlyTotal.toFixed(2)}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-slate-600">Total Items</p>
            <p className="text-xl font-bold text-slate-900">{summary.count}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-slate-600">Top Category</p>
            <p className="text-sm font-bold text-slate-900 truncate">{summary.topCategory}</p>
          </div>
        </div>
      </div>
    </div>
  );
};