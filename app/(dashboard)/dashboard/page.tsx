"use client"

import React, { useState } from 'react'
import {ArrowRight, Plus} from 'lucide-react'
import Link from "next/link";
import {useTrips} from "@/app/context/TripContext";
import {useUser} from "@/app/context/UserContext";


const Page = () => {
    const { trips, loading } = useTrips()
    const { profile } = useUser()

    // Get upcoming trips (status not completed and start_date in the future)
    const upcomingTrips = trips
        .filter(trip => trip.status.toLowerCase() !== "completed" && new Date(trip.start_date) >= new Date())
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

    const nextTrip = upcomingTrips[0];

    const [visibleCount, setVisibleCount] = useState(4)
    const completedTrips = trips.filter(trip => trip.status && trip.status.toLowerCase() === "completed")
    const arrayOfFour = completedTrips.slice(0, visibleCount)

    const totalBudget = trips.reduce((acc, trip) => acc + Number(trip.budget), 0);

    return (
        <div className="p-8 mx-auto max-w-5xl">
            {/* Header */}
                <h2 className="text-left text-4xl font-medium text-(--text-primary) tracking-light mb-4"> Welcome<span className="capitalize">{profile?.full_name ? ", " + profile.full_name : " To Plan Your Trips"}</span></h2>
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
                            {nextTrip ? (
                                <>
                                    <span className="text-xl font-medium text-(--text-primary) block truncate">
                                        {nextTrip.name}, {nextTrip.destination}
                                    </span>
                                    <span className="text-xs text-(--text-secondary)">
                                        In {Math.ceil((new Date(nextTrip.start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                                    </span>
                                </>
                            ) : (
                                <span className="text-xs text-(--text-secondary)">No upcoming trips</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-(--surface) p-6 rounded-md border border-(--border-subtle)">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider mb-4">
                            Active Budget
                        </label>
                        <div className="mt-auto">
                            <span className="text-3xl font-light text-(--text-primary)">{totalBudget.toLocaleString()}</span>
                            <span className="text-xs text-(--text-secondary) ml-2">Ksh</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity List */}
            <div>
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-(--border-subtle)">
                    <h2 className="text-sm font-medium text-(--text-primary) uppercase tracking-wider">
                        Recently Completed Trips
                    </h2>
                    <button
                        className="text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                        onClick={() => setVisibleCount(prev => prev + 4)}
                    >
                        {visibleCount >= completedTrips.length ? "" : "View More"}
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
                    {arrayOfFour.map((trip) => (
                        <div
                            key={trip.id}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-transparent text-(--text-primary) hover:bg-(--bg-dark) transition-colors border-b border-(--border-super-subtle) cursor-pointer mb-0"
                        >
                            <div className="mb-2 sm:mb-0">
                                <h3 className="text-sm font-medium text-(--text-primary) group-hover:text-white">{trip.name}</h3>
                                <p className="text-xs text-(--text-secondary) group-hover:text-neutral-300 mt-0.5">
                                    {trip.start_date} <ArrowRight className="inline-block w-3 h-3 mx-1" /> {trip.end_date}
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <span className="block text-xs font-medium text-(--text-primary) group-hover:text-white">
                                        {"Ksh " + Number(trip.budget).toLocaleString()}
                                    </span>
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
