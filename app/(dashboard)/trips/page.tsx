"use client"

import React, { useState } from 'react'
import { Plus, Calendar, MapPin, LayoutGrid, List, Clock, Wallet, ArrowRight, Trash2 } from 'lucide-react'
import Link from "next/link";
import { useTrips } from "@/app/context/TripContext";
import { useUser } from "@/app/context/UserContext";
import { canDeleteTrip, getStatusStyles } from "@/utils/tripStatus";
import { createClient } from "@/utils/supabase/client";

const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "—"

    const diffTime = endDate.getTime() - startDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`
}

const Page = () => {
    const { trips, setTrips } = useTrips()
    const { profile } = useUser()
    const [view, setView] = useState<"grid" | "list">("grid")

    const handleDeleteTrip = async (tripId: string, status: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!profile) {
            alert('You must be logged in to delete trips');
            return;
        }

        if (!canDeleteTrip(status as never)) {
            alert('Completed trips cannot be deleted');
            return;
        }

        if (!confirm('Are you sure you want to delete this trip?')) return;

        const supabase = createClient();
        const { error } = await supabase.from('trips').delete().eq('id', tripId);

        if (!error) {
            setTrips(trips.filter(t => t.id !== tripId));
        } else {
            alert('Failed to delete trip');
        }
    };

    return (
        <div className="p-8 mx-auto max-w-5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                    <h1 className="text-2xl font-medium text-(--text-primary) tracking-tight mb-2">
                        My Journeys
                    </h1>
                    <p className="text-sm text-(--text-secondary) leading-relaxed max-w-lg">
                        Manage your itineraries and look back on past adventures.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex bg-(--bg-subtle)/50 p-1 rounded-full border border-(--border-subtle)">
                        <button
                            className={`p-2 rounded-full transition-all ${view === 'grid' ? 'bg-white shadow-sm text-(--text-primary)' : 'text-(--text-secondary) hover:text-(--text-primary)'}`}
                            onClick={() => setView('grid')}
                            title="Grid View"
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            className={`p-2 rounded-full transition-all ${view === 'list' ? 'bg-white shadow-sm text-(--text-primary)' : 'text-(--text-secondary) hover:text-(--text-primary)'}`}
                            onClick={() => setView('list')}
                            title="List View"
                        >
                            <List size={16} />
                        </button>
                    </div>

                    <Link
                        href={profile ? "/trips/new" : "/unlock-features"}
                        className="group flex items-center gap-2 bg-black hover:bg-zinc-800 text-white pl-4 pr-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-black/5 active:scale-[0.98]"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Trip</span>
                    </Link>
                </div>
            </div>

            {/* Empty State */}
            {trips.length === 0 && (
                <div className="text-center py-20 border border-dashed border-(--border-subtle) rounded-xl bg-(--bg-subtle)/20">
                    <MapPin className="w-12 h-12 text-(--text-muted)/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-(--text-primary) mb-2">No trips yet</h3>
                    <p className="text-(--text-secondary) mb-6">Start planning your first adventure.</p>
                    <Link
                        href="/trips/new"
                        className="text-sm font-medium text-black underline underline-offset-4 hover:text-zinc-600 transition-colors"
                    >
                        Create a trip
                    </Link>
                </div>
            )}

            {/* Trips List */}
            <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                {trips.map((trip) => {
                    const status = trip.status as never; // Cast to match expected type of getStatusStyles
                    const statusStyles = getStatusStyles(status);
                    const deletable = canDeleteTrip(status);

                    return (
                        <div key={trip.id} className="group cursor-pointer">
                            <Link href={`/trips/${trip.id}`}>
                                <div className={`
                                        border border-(--border-subtle) transition-all duration-300 relative
                                        group-hover:bg-(--bg-dark) group-hover:border-(--bg-dark)
                                        ${view === 'grid'
                                        ? 'bg-(--surface) rounded-xl p-5 h-full flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10'
                                        : 'bg-(--surface) rounded-lg p-5 flex flex-col md:flex-row gap-6 items-center hover:shadow-md'
                                    }
                                    `}>

                                    {/* Content Container */}
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start mb-4">
                                            {/* Status Badge */}
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors
                                                    group-hover:bg-white/10 group-hover:text-white group-hover:border-white/10
                                                    ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
                                            >
                                                {status}
                                            </span>

                                            {deletable && (
                                                <button
                                                    onClick={(e) => handleDeleteTrip(trip.id, status, e)}
                                                    className="ml-auto p-2 rounded-lg bg-black/20 backdrop-blur-sm text-white/60 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-colors"
                                                    title="Delete trip"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-medium text-(--text-primary) mb-1 group-hover:text-white transition-colors tracking-tight">
                                            {trip.name}
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm text-(--text-secondary) mb-6 group-hover:text-white/60 transition-colors">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {trip.destination.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                        </div>

                                        {view === 'grid' && trip.description && (
                                            <p className="text-sm text-(--text-secondary)/80 line-clamp-2 mb-6 font-light leading-relaxed group-hover:text-white/70 transition-colors">
                                                {trip.description}
                                            </p>
                                        )}

                                        {/* Footer Meta */}
                                        <div className={`flex flex-wrap gap-y-2 text-xs text-(--text-muted) font-medium uppercase tracking-wide border-t border-(--border-subtle)/50 pt-4 mt-auto
                                                group-hover:border-white/10 group-hover:text-white/30 transition-colors
                                                ${view === 'grid' ? 'justify-between' : 'gap-6 md:border-0 md:pt-0'}
                                            `}>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{trip.start_date || 'TBD'}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{calculateDuration(trip.start_date, trip.end_date)}</span>
                                            </div>

                                            {view === 'grid' && (
                                                <div className="flex items-center gap-1.5">
                                                    <Wallet className="w-3.5 h-3.5" />
                                                    <span>{trip.budget ? `Ksh ${parseInt(trip.budget).toLocaleString()}` : '-'}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {view === 'grid' && (
                                        <ArrowRight
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4
                                                text-(--text-muted) opacity-0 translate-x-2
                                                group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white
                                                transition-all duration-300"
                                        />
                                    )}

                                    {/* List View Extras */}
                                    {view === 'list' && (
                                        <div className="hidden md:flex items-center gap-6 text-sm text-(--text-secondary) ml-auto pl-6 border-l border-(--border-subtle) group-hover:border-white/10 transition-colors">
                                            <div className="flex flex-col items-end group-hover:text-white/80">
                                                <span className="text-[10px] uppercase tracking-wider text-(--text-muted) font-medium group-hover:text-white/40 mb-1">Budget</span>
                                                <span className="font-medium text-lg">{trip.budget ? `Ksh ${parseInt(trip.budget).toLocaleString()}` : '—'}</span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-(--text-muted) group-hover:text-white transition-colors" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Page
