"use client"

import React, { useState } from 'react'
import { Plus, Calendar, MapPin, MoreHorizontal, LayoutGrid, List, Clock, Wallet } from 'lucide-react'
import Link from "next/link";
import {useTrips} from "@/app/context/TripContext";

const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "—"

    const diffTime = endDate.getTime() - startDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`
}

const Page = () => {

    const  { trips } = useTrips()

    const [view, setView] = useState<"grid" | "list">("grid")

    return (
        <div className="p-8 mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-medium text-(--text-primary) tracking-tight">
                        All Trips
                    </h1>
                    <p className="mt-2 text-(--text-secondary) max-w-lg leading-relaxed">
                        Manage your travel itineraries and keep track of your past and upcoming journeys.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-(--bg-subtle) p-1 rounded-lg border border-(--border-subtle)"><button
                        className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-(--surface-elevated) shadow-sm text-(--text-primary)' : 'text-(--text-secondary) hover:text-(--text-primary)'}`}
                        onClick={() => setView('grid')}
                        title="Grid View"
                    >
                        <LayoutGrid size={18} />
                    </button>
                        <button
                            className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-(--surface-elevated) shadow-sm text-(--text-primary)' : 'text-(--text-secondary) hover:text-(--text-primary)'}`}
                            onClick={() => setView('list')}
                            title="List View"
                        >
                            <List size={18} />
                        </button>
                    </div>
                    <Link href="/trips/new" className="flex items-center justify-center gap-2 bg-(--bg-dark) hover:bg-(--bg-dark-subtle) text-(--text-on-dark) py-2.5 px-5 transition-all font-medium text-sm cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <span>New Trip</span>
                    </Link>
                </div>
            </div>

            {/* Trips List */}
            <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                {trips.map((trip) => (
                    <div key={trip.name} className="group">
                        <Link href={`/trips/${trip.id}`}>
                            <div className={`
                                bg-(--surface-elevated) border border-(--border-subtle) 
                                hover:border-(--border-strong) transition-all duration-200 cursor-pointer
                                rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01]
                                ${view === 'grid' ? 'h-full flex flex-col' : 'p-5 flex flex-col sm:flex-row gap-6 items-start sm:items-center'}
                            `}>
                                {/* Grid Image Placeholder / Top Section */}
                                {view === 'grid' && (
                                    <div className="h-48 w-full bg-(--bg-subtle) relative flex items-center justify-center border-b border-(--border-subtle)">
                                        {/* Simple pattern/placeholder since we don't have real images yet */}
                                        <div className="text-(--text-muted) flex flex-col items-center gap-2">
                                            <MapPin className="w-8 h-8 opacity-20" />
                                            <span className="text-sm font-medium opacity-40 uppercase tracking-widest">{trip.destination.split(',')[0]}</span>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide border shadow-sm
                                                ${trip.status === 'Planning' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    trip.status === 'Upcoming' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                        'bg-(--bg-subtle) text-(--text-secondary) border-(--border-subtle)'
                                                }`}
                                            >
                                                {trip.status}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className={`flex-1 ${view === 'grid' ? 'p-6 flex flex-col' : 'w-full'}`}>

                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-medium text-(--text-primary) transition-colors">
                                                {trip.name}
                                            </h3>
                                            {view === 'list' && (
                                                <div className="flex items-center gap-2 mt-1 text-sm text-(--text-secondary)">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span>{trip.destination}</span>
                                                </div>
                                            )}
                                        </div>

                                        {view === 'list' && (
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide border
                                                ${trip.status === 'Planning' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    trip.status === 'Upcoming' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                        'bg-(--bg-subtle) text-(--text-secondary) border-(--border-subtle)'
                                                }`}
                                            >
                                                {trip.status}
                                            </span>
                                        )}
                                    </div>

                                    {view === 'grid' && (
                                        <p className="text-sm text-(--text-secondary) line-clamp-2 mb-6 h-10">
                                            {trip.description}
                                        </p>
                                    )}

                                    <div className={`flex flex-wrap text-sm text-(--text-secondary) ${view === 'grid' ? 'flex-col gap-3 mt-auto' : 'flex-row gap-6 mt-2'}`}>

                                        {view === 'grid' && (
                                            <div className="flex items-center gap-2.5 pt-4 border-t border-(--border-super-subtle)">
                                                <MapPin className="w-4 h-4 text-(--text-muted)" />
                                                <span>{String(trip.destination).toUpperCase()}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2.5">
                                            <Calendar className="w-4 h-4 text-(--text-muted)" />
                                            <span>{trip.start_date}</span>
                                        </div>

                                        <div className="flex items-center gap-2.5">
                                            <Clock className="w-4 h-4 text-(--text-muted)" />
                                            <span>
                                                {calculateDuration(trip.start_date, trip.end_date)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2.5">
                                            <Wallet className="w-4 h-4 text-(--text-muted)" />
                                            <span>{"Ksh " + Number(trip.budget).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {view === 'list' && (
                                    <div className="flex items-center self-center pl-4 border-l border-(--border-subtle) md:block">
                                        <button className="p-2 text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-subtle) rounded-md transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
