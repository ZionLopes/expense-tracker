import React, { useState, useMemo } from 'react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { FilterBar } from './components/FilterBar';
import { Wallet, TrendingUp } from 'lucide-react';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: number;
}

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Other'
];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [expenses, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">ExpenseTracker</h1>
              <p className="text-slate-600">Manage your expenses with ease</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form and Summary */}
          <div className="lg:col-span-1 space-y-6">
            <ExpenseForm onAddExpense={addExpense} categories={CATEGORIES} />
            <ExpenseSummary expenses={expenses} />
          </div>

          {/* Right Column - Expenses List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-6 w-6 text-slate-600" />
                <h2 className="text-xl font-semibold text-slate-900">Recent Expenses</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {expenses.length}
                </span>
              </div>

              <FilterBar
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              <ExpenseList 
                expenses={filteredExpenses} 
                onDeleteExpense={deleteExpense}
                emptyStateMessage={
                  expenses.length === 0 
                    ? "No expenses yet. Add your first expense to get started!"
                    : "No expenses match your current filters."
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;