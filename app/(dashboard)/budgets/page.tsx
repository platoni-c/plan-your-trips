import React from 'react'
import { Plus, Wallet, TrendingDown, PieChart } from 'lucide-react'

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

const categories: BudgetCategory[] = [
    { id: '1', name: "Accommodation", allocated: 120000, spent: 45000, color: "bg-blue-500" },
    { id: '2', name: "Flights & Transport", allocated: 80000, spent: 78000, color: "bg-indigo-500" },
    { id: '3', name: "Food & Dining", allocated: 50000, spent: 12500, color: "bg-emerald-500" },
    { id: '4', name: "Activities", allocated: 40000, spent: 8000, color: "bg-amber-500" },
    { id: '5', name: "Shopping", allocated: 30000, spent: 5000, color: "bg-rose-500" },
]

const recentTransactions: Transaction[] = [
    { id: 't1', description: "Booking.com - Kyoto Hotel", date: "Jan 08, 2026", amount: 45000, category: "Accommodation", type: "expense" },
    { id: 't2', description: "Japan Airlines", date: "Jan 05, 2026", amount: 78000, category: "Flights & Transport", type: "expense" },
    { id: 't3', description: "Freelance Payment", date: "Jan 01, 2026", amount: 120000, category: "Income", type: "income" },
    { id: 't4', description: "Travel Insurance", date: "Dec 28, 2025", amount: 8000, category: "Activities", type: "expense" },
]

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount);
}

const Page = () => {
    const totalBudget = categories.reduce((acc, curr) => acc + curr.allocated, 0);
    const totalSpent = categories.reduce((acc, curr) => acc + curr.spent, 0);
    const remaining = totalBudget - totalSpent;
    const spentPercentage = Math.round((totalSpent / totalBudget) * 100);

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
                                <div className="bg-zinc-900 h-full rounded-full" style={{ width: `${spentPercentage}%` }}></div>
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
                            <span className="text-3xl font-light text-emerald-600">{formatCurrency(remaining)}</span>
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
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white border border-zinc-100 p-5 rounded-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-medium text-zinc-900">{category.name}</h3>
                                    <span className="text-xs font-medium text-zinc-500">
                                        {formatCurrency(category.spent)} / {formatCurrency(category.allocated)}
                                    </span>
                                </div>
                                <div className="w-full bg-zinc-50 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${category.color}`}
                                        style={{ width: `${Math.min((category.spent / category.allocated) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
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
                        {recentTransactions.map((transaction, idx) => (
                            <div
                                key={transaction.id}
                                className={`p-4 flex items-center justify-between ${idx !== recentTransactions.length - 1 ? 'border-b border-zinc-100' : ''}`}
                            >
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 truncate max-w-35">{transaction.description}</p>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
