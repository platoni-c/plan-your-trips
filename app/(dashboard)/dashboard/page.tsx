"use client"

import React, {useEffect, useState} from 'react'
import { Plus } from 'lucide-react'
import {supabase} from "@/utils/supabase/client";
import Link from "next/link";

interface Trip {
    id: string
    name: string,
    date: string,
    budget: string,
    status: string,
}


const Page = () => {
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)
    const [displayName, setDisplayName] = useState("")

    useEffect(() => {
        const fetchTrips = async () => {
            const { data, error } = await supabase
                .from('trips')
                .select('id,name,date,budget,status')

            if (data) setTrips(data)
            if (error) console.log(error)

            setLoading(false)
        }
        const fetchUser = async () => {
            const { data: { user }, error} = await supabase.auth.getUser()
            if(!user) console.error("User not found", error)

            setDisplayName(user?.user_metadata.full_name)
            setLoading(false)
        }
        fetchTrips()
        fetchUser()
    }, []);

    const [visibleCount, setVisibleCount] = useState(4)
    const arrayOfFour = trips.slice(0, visibleCount)

    return (
        <div className="p-8 mx-auto max-w-5xl">
            {/* Header */}
                <h2 className="text-left text-4xl font-medium text-(--text-primary) tracking-light mb-4"> Welcome, <span className="capitalize">{displayName}</span></h2>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-2xl font-medium text-(--text-primary) tracking-tight">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-(--text-secondary) max-w-md leading-relaxed">
                        Overview of your current travel plans, budgets, and upcoming adventures.
                    </p>
                </div>
                <Link href="/trips/new" className="flex items-center justify-center gap-2 bg-(--bg-dark) hover:bg-(--bg-dark-subtle) text-white py-2.5 px-5 transition-all shadow-sm font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    <span>New Trip</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-(--surface) p-6 rounded-md border border-(--border-subtle)">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider mb-4">
                            Total Trips
                        </label>
                        <div className="mt-auto">
                            <span className="text-3xl font-light text-(--text-primary)">{trips.length.toString().padStart(2, "0")}</span>
                            <span className="text-xs text-(--text-secondary) ml-2">Lifetime</span>
                        </div>
                    </div>
                </div>

                <div className="bg-(--surface) p-6 rounded-md border border-(--border-subtle)">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider mb-4">
                            Next Adventure
                        </label>
                        <div className="mt-auto">
                            <span className="text-xl font-medium text-(--text-primary) block truncate">Maasai Mara, Kenya</span>
                            <span className="text-xs text-(--text-secondary)">In 12 days</span>
                        </div>
                    </div>
                </div>

                <div className="bg-(--surface) p-6 rounded-md border border-(--border-subtle)">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider mb-4">
                            Active Budget
                        </label>
                        <div className="mt-auto">
                            <span className="text-3xl font-light text-(--text-primary)">245,000</span>
                            <span className="text-xs text-(--text-secondary) ml-2">Ksh</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity List */}
            <div>
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-(--border-subtle)">
                    <h2 className="text-sm font-medium text-(--text-primary) uppercase tracking-wider">
                        Recent Trips
                    </h2>
                    <button
                        className="text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                        onClick={() => setVisibleCount(prev => prev + 4)}
                    >
                        {visibleCount >= trips.length ? "" : "View More"}
                    </button>
                </div>

                <div className="space-y-1">
                    {loading && (
                        <div className="text-center py-12 text-sm text-zinc-400 font-light">
                            Loading trips...
                        </div>
                    )}
                    {!loading && trips.length === 0 && (
                        <div className="text-center py-12 text-sm text-zinc-400 font-light">
                            No trips found. Start by creating a new one.
                        </div>
                    )}
                    {arrayOfFour.map((trip, index) => (
                        <div
                            key={index}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-transparent text-(--text-primary) hover:bg-(--bg-dark) transition-colors border-b border-(--border-super-subtle) cursor-pointer mb-0"
                        >
                            <div className="mb-2 sm:mb-0">
                                <h3 className="text-sm font-medium text-(--text-primary) group-hover:text-white">{trip.name}</h3>
                                <p className="text-xs text-(--text-secondary) group-hover:text-neutral-300 mt-0.5">{trip.date}</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <span className="block text-xs font-medium text-(--text-primary) group-hover:text-white">{trip.budget}</span>
                                    <span className="block text-[10px] text-(--text-muted) group-hover:text-neutral-300 uppercase tracking-wide">{trip.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page
