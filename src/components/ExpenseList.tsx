import React from 'react';
import { ExpenseCard } from './ExpenseCard';
import { Receipt } from 'lucide-react';
import type { Expense } from '../App';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  emptyStateMessage: string;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  onDeleteExpense, 
  emptyStateMessage 
}) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Receipt className="h-8 w-8 text-slate-400" />
        </div>
        <p className="text-slate-500 text-lg">{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-6">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={() => onDeleteExpense(expense.id)}
        />
      ))}
    </div>
  );
};