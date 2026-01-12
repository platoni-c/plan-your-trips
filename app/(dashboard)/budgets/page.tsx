"use client"

import React, { useEffect, useState } from 'react'
import { Plus, Wallet, TrendingDown, PieChart } from 'lucide-react'
import { useTrips } from '@/app/context/TripContext'
import { createClient } from '@/utils/supabase/client'

interface BudgetCategory {
    id: string;
    name: string;
    allocated: number;
    spent: number;
    color: string;
}

interface Transaction {
    id: string;
    description: string;
    date: string;
    amount: number;
    category: string;
    type: 'expense' | 'income';
}

const CATEGORY_COLORS: { [key: string]: string } = {
    'Accommodation': 'bg-blue-500',
    'Flights & Transport': 'bg-indigo-500',
    'Food & Dining': 'bg-emerald-500',
    'Activities': 'bg-amber-500',
    'Shopping': 'bg-rose-500',
    'Other': 'bg-zinc-500'
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
}

const Page = () => {
    const { trips } = useTrips();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<BudgetCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();

            // Fetch all expenses across all trips
            // In a real app with RLS, this would naturally filter to user's expenses
            // For now, filtering by trips the user has access to
            const tripIds = trips.map(t => t.id);

            if (tripIds.length === 0) {
                setLoading(false);
                return;
            }

            const { data: expensesData, error } = await supabase
                .from('expenses')
                .select('*')
                .in('trip_id', tripIds)
                .order('created_at', { ascending: false });

            if (error || !expensesData) {
                console.error('Error fetching expenses:', error);
                setLoading(false);
                return;
            }

            // Map expenses to transactions
            const txs: Transaction[] = expensesData.map((e: any) => ({
                id: e.id.toString(),
                description: e.description,
                date: new Date(e.created_at || e.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                amount: e.amount,
                category: e.category || 'Other',
                type: 'expense'
            }));

            setTransactions(txs);

            // Aggregate by category
            const categoryMap = new Map<string, number>();
            expensesData.forEach((e: any) => {
                const cat = e.category || 'Other';
                const current = categoryMap.get(cat) || 0;
                categoryMap.set(cat, current + e.amount);
            });

            // Convert map to BudgetCategory array
            // Note: allocated per category isn't in DB yet, so we'll simulate it 
            // by setting allocated to spent * 1.2 (for demo visuals) or just showing spent
            const cats: BudgetCategory[] = Array.from(categoryMap.entries()).map(([name, spent], index) => ({
                id: `cat-${index}`,
                name,
                spent,
                allocated: spent, // Ideally this would come from a budget_categories table
                color: CATEGORY_COLORS[name] || 'bg-zinc-500'
            }));

            setCategories(cats);
            setLoading(false);
        };

        if (trips.length > 0) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [trips]);

    const totalBudget = trips.reduce((acc, curr) => acc + (parseFloat(curr.budget) || 0), 0);
    const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const remaining = totalBudget - totalSpent;
    const spentPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    return (
        <div className="p-8 mx-auto max-w-5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">
                        Budgets
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500 max-w-md leading-relaxed">
                        Track your travel expenses and manage your financial goals for your upcoming trips.
                    </p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-(--bg-dark) hover:bg-(--bg-dark-subtle) text-white py-2.5 px-5 transition-all shadow-sm font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    <span>Add Budget</span>
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-zinc-900 text-white p-6 rounded-md shadow-sm">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4 opacity-80">
                            <Wallet className="w-4 h-4" />
                            <label className="text-xs font-medium uppercase tracking-wider">
                                Total Budget
                            </label>
                        </div>
                        <div className="mt-auto">
                            <span className="text-3xl font-light">{formatCurrency(totalBudget)}</span>
                            <span className="text-xs text-zinc-400 ml-2 block mt-1">Allocated for all trips</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-md border border-zinc-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4 text-zinc-500">
                            <TrendingDown className="w-4 h-4" />
                            <label className="text-xs font-medium uppercase tracking-wider">
                                Total Spent
                            </label>
                        </div>
                        <div className="mt-auto">
                            <span className="text-3xl font-light text-zinc-900">{formatCurrency(totalSpent)}</span>
                            <div className="w-full bg-zinc-100 h-1.5 mt-3 rounded-full overflow-hidden">
                                <div className="bg-zinc-900 h-full rounded-full" style={{ width: `${Math.min(spentPercentage, 100)}%` }}></div>
                            </div>
                            <span className="text-xs text-zinc-400 mt-2 block">{spentPercentage}% of budget used</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-md border border-zinc-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4 text-zinc-500">
                            <PieChart className="w-4 h-4" />
                            <label className="text-xs font-medium uppercase tracking-wider">
                                Remaining
                            </label>
                        </div>
                        <div className="mt-auto">
                            <span className={`text-3xl font-light ${remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(remaining)}</span>
                            <span className="text-xs text-zinc-400 ml-2 block mt-1">Available to spend</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Categories */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-medium text-zinc-900 uppercase tracking-wider">
                            Budget Categories
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {categories.length === 0 ? (
                            <div className="text-center py-10 bg-zinc-50 rounded-md border border-dashed border-zinc-200 text-zinc-400 text-sm">
                                No expenses recorded yet.
                            </div>
                        ) : (
                            categories.map((category) => (
                                <div key={category.id} className="bg-white border border-zinc-100 p-5 rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-sm font-medium text-zinc-900">{category.name}</h3>
                                        <span className="text-xs font-medium text-zinc-500">
                                            {formatCurrency(category.spent)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-zinc-50 h-2 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${category.color}`}
                                            style={{ width: '100%' }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-medium text-zinc-900 uppercase tracking-wider">
                            Recent Transactions
                        </h2>
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-md overflow-hidden">
                        {transactions.length === 0 ? (
                            <div className="p-8 text-center text-zinc-400 text-sm">
                                No recent transactions.
                            </div>
                        ) : (
                            <>
                                {transactions.slice(0, 5).map((transaction, idx) => (
                                    <div
                                        key={transaction.id}
                                        className={`p-4 flex items-center justify-between ${idx !== Math.min(transactions.length, 5) - 1 ? 'border-b border-zinc-100' : ''}`}
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900 truncate max-w-36">{transaction.description}</p>
                                            <p className="text-xs text-zinc-500 mt-0.5">{transaction.date}</p>
                                        </div>
                                        <span className={`text-sm font-medium ${transaction.type === 'income' ? 'text-emerald-600' : 'text-zinc-900'}`}>
                                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </span>
                                    </div>
                                ))}
                                <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-center">
                                    <button className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                                        View All Transactions
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
