import React, { useState } from 'react';
import { Trash2, Calendar, Tag } from 'lucide-react';
import type { Expense } from '../App';

interface ExpenseCardProps {
  expense: Expense;
  onDelete: () => void;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Food & Dining': 'bg-orange-100 text-orange-800',
    'Transportation': 'bg-blue-100 text-blue-800',
    'Shopping': 'bg-purple-100 text-purple-800',
    'Entertainment': 'bg-pink-100 text-pink-800',
    'Bills & Utilities': 'bg-yellow-100 text-yellow-800',
    'Healthcare': 'bg-red-100 text-red-800',
    'Travel': 'bg-green-100 text-green-800',
    'Education': 'bg-indigo-100 text-indigo-800',
    'Other': 'bg-gray-100 text-gray-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors duration-200 border border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-900 truncate">
              {expense.description}
            </h3>
            <span className="text-2xl font-bold text-slate-900 ml-4">
              ${expense.amount.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4 text-slate-400" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                {expense.category}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{formatDate(expense.date)}</span>
            </div>
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          {showDeleteConfirm ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Delete expense"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};