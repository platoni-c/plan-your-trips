"use client"

import React, { useState } from 'react'
import { ArrowLeft, Calendar, MapPin, Wallet, Info, Plane } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/app/context/UserContext";

const Page = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [tripName, setTripName] = useState("")
    const [tripDestination, setTripDestination] = useState("")
    const [tripDescription, setTripDescription] = useState("")
    const [tripBudget, setTripBudget] = useState("")
    const [tripStartDate, setTripStartDate] = useState("")
    const [tripEndDate, setTripEndDate] = useState("")

    const { profile } = useUser()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (!profile) {
            console.error("User not loaded")
            setIsLoading(false)
            return
        }
        const supabase = createClient()
        const { data, error } = await supabase
            .from('trips')
            .insert([
                {
                    name: tripName,
                    destination: tripDestination,
                    description: tripDescription,
                    budget: tripBudget,
                    start_date: tripStartDate,
                    end_date: tripEndDate,
                    user_id: profile.auth_id // use profile.id, not the whole object
                }
            ])
            .select()
        if (error) {
            console.error("Unable to save your info", error)
            setIsLoading(false)
            return;
        }
        console.log(data)
        setIsLoading(false)
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-(--bg-page) p-6 lg:p-10 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Navigation & Header */}
                <div className="mb-10">
                    <Link
                        href="/trips"
                        className="inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors mb-6 group"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Back to Trips
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-medium text-(--text-primary) tracking-tight flex items-center gap-3">
                                Plan a New Trip
                            </h1>
                            <p className="mt-2 text-(--text-secondary) leading-relaxed">
                                Fill in the details below to start organizing your next adventure.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-100">
                            <Info size={14} />
                            Step 1/3: Basic Information
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Details Section */}
                    <section className="border border-(--border-subtle) overflow-hidden shadow-sm">
                        <div className="p-1 px-6 py-4 border-b border-(--border-subtle) flex items-center gap-3">
                            <Plane className="w-5 h-5 text-(--text-secondary)" />
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">General Details</h2>
                        </div>

                        <div className="p-6 lg:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Trip Name */}
                                <div className="space-y-2">
                                    <label htmlFor="tripName" className="text-sm font-medium text-(--text-primary) block">
                                        Trip Name
                                    </label>
                                    <input
                                        type="text"
                                        id="tripName"
                                        placeholder="e.g. Summer in Santorini"
                                        onChange={(e) => setTripName(e.target.value)}
                                        value={tripName}
                                        required
                                        className="w-full border border-(--input-border) focus:border-(--input-border-focus) text-(--input-text) rounded-lg px-4 py-3 outline-none transition-all placeholder:text-(--input-placeholder) focus:ring-2 ring-blue-500/10 capitalize"
                                    />
                                </div>

                                {/* Destination */}
                                <div className="space-y-2">
                                    <label htmlFor="destination" className="text-sm font-medium text-(--text-primary) block">
                                        Destination
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) w-4 h-4" />
                                        <input
                                            type="text"
                                            id="destination"
                                            placeholder="Where are you going?"
                                            onChange={(e) => setTripDestination(e.target.value)}
                                            value={tripDestination}
                                            required
                                            className="w-full border border-(--input-border) focus:border-(--input-border-focus) text-(--input-text) rounded-lg pl-10 pr-4 py-3 outline-none transition-all placeholder:text-(--input-placeholder) focus:ring-2 ring-blue-500/10 capitalize"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Trip Description */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium text-(--text-primary) block">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    placeholder="Write a brief overview of what you're planning..."
                                    onChange={(e) => setTripDescription(e.target.value)}
                                    value={tripDescription}
                                    className="w-full border border-(--input-border) focus:border-(--input-border-focus) text-(--input-text) rounded-lg px-4 py-3 outline-none transition-all placeholder:text-(--input-placeholder) resize-none focus:ring-2 ring-blue-500/10"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Logistics Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Dates */}
                        <section className="border border-(--border-subtle) overflow-hidden shadow-sm flex flex-col">
                            <div className="px-6 py-4 border-b border-(--border-subtle) flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-(--text-secondary)" />
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">Timeline</h2>
                            </div>
                            <div className="p-6 lg:p-8 space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="startDate" className="text-sm font-medium text-(--text-primary) block">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        onChange={(e) => setTripStartDate(e.target.value)}
                                        value={tripStartDate}
                                        required
                                        className="w-full border border-(--input-border) focus:border-(--input-border-focus) text-(--input-text) rounded-lg px-4 py-3 outline-none transition-all appearance-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="endDate" className="text-sm font-medium text-(--text-primary) block">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        onChange={(e) => setTripEndDate(e.target.value)}
                                        value={tripEndDate}
                                        required
                                        className="w-full border border-(--input-border) focus:border-(--input-border-focus) text-(--input-text) rounded-lg px-4 py-3 outline-none transition-all appearance-none"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Budget */}
                        <section className="border border-(--border-subtle) overflow-hidden shadow-sm flex flex-col">
                            <div className="px-6 py-4 border-b border-(--border-subtle) flex items-center gap-3">
                                <Wallet className="w-5 h-5 text-(--text-secondary)" />
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">Estimated Budget</h2>
                            </div>
                            <div className="p-6 lg:p-8 space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="budget" className="text-sm font-medium text-(--text-primary) block">
                                        Total Budget
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted) font-medium">Ksh</span>
                                        <input
                                            type="text"
                                            id="budget"
                                            onChange={(e) => setTripBudget(e.target.value)}
                                            value={tripBudget}
                                            placeholder="0.00"
                                            className="w-full border border-(--input-border) focus:border-(--input-border-focus) text-(--input-text) rounded-lg pl-14 pr-4 py-3 outline-none transition-all placeholder:text-(--input-placeholder) focus:ring-2 ring-blue-500/10"
                                        />
                                    </div>
                                    <p className="text-[10px] text-(--text-muted) mt-2 italic">
                                        * You can adjust this later in the budget planner section.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link
                            href="/trips"
                            className="px-6 py-3 text-sm font-medium text-(--text-primary) transition-colors border border-(--border-subtle) active:scale-[0.98]"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-(--bg-dark) hover:bg-(--bg-dark-subtle) text-(--text-on-dark) px-8 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/5 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                ""
                            )}
                            <span>{isLoading ? 'Creating Trip...' : 'Create Trip'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
