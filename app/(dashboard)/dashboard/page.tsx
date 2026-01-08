import React from 'react'
import { Plus } from 'lucide-react'



const Page = () => {
    return (
        <div className="p-8 mx-auto max-w-5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500 max-w-md leading-relaxed">
                        Overview of your current travel plans, budgets, and upcoming adventures.
                    </p>
                </div>
                <button className="group flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white py-2.5 px-5 rounded-md transition-all shadow-sm font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    <span>New Trip</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-zinc-50 p-6 rounded-md border border-zinc-200">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">
                            Total Trips
                        </label>
                        <div className="mt-auto">
                            <span className="text-3xl font-light text-zinc-900">03</span>
                            <span className="text-xs text-zinc-400 ml-2">Lifetime</span>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-50 p-6 rounded-md border border-zinc-200">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">
                            Next Adventure
                        </label>
                        <div className="mt-auto">
                            <span className="text-xl font-medium text-zinc-900 block truncate">Kyoto, Japan</span>
                            <span className="text-xs text-zinc-400">In 12 days</span>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-50 p-6 rounded-md border border-zinc-200">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">
                            Active Budget
                        </label>
                        <div className="mt-auto">
                            <span className="text-3xl font-light text-zinc-900">$2,450</span>
                            <span className="text-xs text-zinc-400 ml-2">USD</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity List */}
            <div>
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100">
                    <h2 className="text-sm font-medium text-zinc-900 uppercase tracking-wider">
                        Recent Trips
                    </h2>
                    <button className="text-xs font-medium text-zinc-500 hover:text-black transition-colors">
                        View All
                    </button>
                </div>

                <div className="space-y-1">
                    {[
                        { name: "Summer in Kyoto", date: "Apr 12 - Apr 20", status: "Planning", budget: "$3,200" },
                        { name: "Weekend in NYC", date: "May 05 - May 08", status: "Completed", budget: "$1,800" },
                        { name: "Bali Retreat", date: "Dec 10 - Dec 25", status: "Upcoming", budget: "$2,500" },
                    ].map((trip, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-md hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-200 cursor-pointer"
                        >
                            <div className="mb-2 sm:mb-0">
                                <h3 className="text-sm font-medium text-zinc-900">{trip.name}</h3>
                                <p className="text-xs text-zinc-500 mt-0.5">{trip.date}</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <span className="block text-xs font-medium text-zinc-900">{trip.budget}</span>
                                    <span className="block text-[10px] text-zinc-400 uppercase tracking-wide">{trip.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty state placeholder if needed */}
                    {/* <div className="text-center py-12 text-sm text-zinc-400 font-light">
                        No trips found. Start by creating a new one.
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Page
