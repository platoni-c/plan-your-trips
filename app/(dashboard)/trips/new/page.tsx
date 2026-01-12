"use client"

import React, { useState } from 'react'
import { ArrowLeft, Calendar, MapPin, Wallet, Sparkles } from 'lucide-react'
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
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (!profile) {
            console.error("User not loaded")
            setIsLoading(false)
            return
        }

        if (new Date(tripEndDate) < new Date(tripStartDate)) {
            alert("End date cannot be before start date");
            setIsLoading(false);
            return;
        }

        const supabase = createClient()
        const { error } = await supabase
            .from('trips')
            .insert([
                {
                    name: tripName,
                    destination: tripDestination,
                    description: tripDescription,
                    budget: tripBudget,
                    start_date: tripStartDate,
                    end_date: tripEndDate,
                    user_id: profile.auth_id
                }
            ])
            .select()

        if (error) {
            console.error("Unable to save your info", error)
            setIsLoading(false)
            return;
        }
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-(--bg-page) font-sans pb-20">
            {/* Header / Nav */}
            <div className="sticky top-0 z-10 bg-(--bg-page)/80 backdrop-blur-md border-b border-(--border-subtle)">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/trips"
                        className="group flex items-center gap-2 text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        Back
                    </Link>
                    <div className="text-xs font-medium text-(--text-muted) uppercase tracking-wider">
                        New Journey
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-normal text-(--text-primary) tracking-tight mb-4">
                        Where to next?
                    </h1>
                    <p className="text-lg text-(--text-secondary) font-light">
                        Start planning your next adventure by filling in the details below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Primary Info */}
                    <section className="space-y-8">
                        <div className="space-y-6">
                            <div className="group">
                                <label htmlFor="tripName" className="block text-xs font-medium text-(--text-secondary) uppercase tracking-widest mb-3 group-focus-within:text-(--text-primary) transition-colors">
                                    Trip Name
                                </label>
                                <input
                                    type="text"
                                    id="tripName"
                                    placeholder="e.g. Summer in Santorini"
                                    onChange={(e) => setTripName(e.target.value)}
                                    value={tripName}
                                    required
                                    className="block w-full text-2xl md:text-3xl font-light placeholder:text-(--text-muted)/50 bg-transparent border-0 border-b border-(--border-subtle) px-0 py-2 focus:ring-0 focus:border-(--text-primary) transition-all outline-none"
                                />
                            </div>

                            <div className="group relative">
                                <label htmlFor="destination" className="block text-xs font-medium text-(--text-secondary) uppercase tracking-widest mb-3 group-focus-within:text-(--text-primary) transition-colors">
                                    Destination
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted) group-focus-within:text-(--text-primary) transition-colors" />
                                    <input
                                        type="text"
                                        id="destination"
                                        placeholder="City, Country"
                                        onChange={(e) => setTripDestination(e.target.value)}
                                        value={tripDestination}
                                        required
                                        className="block w-full pl-8 text-xl font-light placeholder:text-(--text-muted)/50 bg-transparent border-0 border-b border-(--border-subtle) pr-0 py-2 focus:ring-0 focus:border-(--text-primary) transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="description" className="block text-xs font-medium text-(--text-secondary) uppercase tracking-widest mb-3 group-focus-within:text-(--text-primary) transition-colors">
                                Description <span className="normal-case opacity-50 tracking-normal ml-1">(Optional)</span>
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                placeholder="What's this trip about?"
                                onChange={(e) => setTripDescription(e.target.value)}
                                value={tripDescription}
                                className="block w-full text-base font-light placeholder:text-(--text-muted)/50 bg-(--bg-subtle)/30 rounded-xl border-0 px-4 py-4 focus:ring-1 focus:ring-(--text-primary)/10 focus:bg-(--bg-subtle)/50 transition-all outline-none resize-none"
                            />
                        </div>
                    </section>

                    {/* Secondary Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {/* Dates */}
                        <div className="space-y-6">
                            <h3 className="flex items-center gap-2 text-sm font-medium text-(--text-primary)">
                                <Calendar className="w-4 h-4" />
                                Timeline
                            </h3>
                            <div className="space-y-5">
                                <div className="group">
                                    <label htmlFor="startDate" className="block text-xs text-(--text-secondary) mb-1.5">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        min={today}
                                        onChange={(e) => setTripStartDate(e.target.value)}
                                        value={tripStartDate}
                                        required
                                        className="block w-full bg-white border border-(--border-subtle) rounded-lg px-4 py-2.5 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="endDate" className="block text-xs text-(--text-secondary) mb-1.5">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        min={tripStartDate}
                                        onChange={(e) => setTripEndDate(e.target.value)}
                                        value={tripEndDate}
                                        required
                                        className="block w-full bg-white border border-(--border-subtle) rounded-lg px-4 py-2.5 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="space-y-6">
                            <h3 className="flex items-center gap-2 text-sm font-medium text-(--text-primary)">
                                <Wallet className="w-4 h-4" />
                                Budget
                            </h3>
                            <div className="space-y-2">
                                <label htmlFor="budget" className="block text-xs text-(--text-secondary) mb-1.5">
                                    Total Allocation
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted) font-medium text-sm">Ksh</span>
                                    <input
                                        type="text"
                                        id="budget"
                                        onChange={(e) => setTripBudget(e.target.value)}
                                        value={tripBudget}
                                        placeholder="0.00"
                                        className="block w-full bg-white border border-(--border-subtle) rounded-lg pl-12 pr-4 py-3 text-lg font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-(--text-muted)/30"
                                    />
                                </div>
                                <p className="text-[10px] text-(--text-muted) leading-relaxed">
                                    We&#39;ll help you track expenses against this. You can enable &#39;Strict Mode&#39; later in settings.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 flex items-center justify-end gap-6">
                        <Link
                            href="/trips"
                            className="text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-black/5"
                        >
                            {isLoading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                            Create Trip
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
