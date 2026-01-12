"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { useTrips } from '@/app/context/TripContext';
import {useParams} from "next/navigation";



const Page = () => {
    const { trips, loading } = useTrips();
    const params = useParams();
    const tripId = params.name as string;

    // Convert trip.id to string to match URL param
    const trip = trips.find(t => t.id.toString() === tripId);

    if (loading) return <p className="text-center py-12 text-sm text-(--text-muted)">Loading trip...</p>;
    if (!trip)
        return (
            <div className="text-center py-12 text-sm text-(--text-muted) font-light">
                No trips found.{' '}
                <Link href="/trips" className="text-(--text-primary) hover:underline">
                    Go back to Trips
                </Link>
            </div>
        );

    // Helper to calculate duration in days
    const calculateDuration = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return '—';
        const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    };

    return (
        <div className="p-8 mx-auto max-w-4xl">
            {/* Back Button */}
            <Link
                href="/trips"
                className="inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Trips
            </Link>

            {/* Header Section */}
            <div className="mb-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <h1 className="text-3xl font-medium text-(--text-primary) tracking-tight">{trip.name}</h1>
                            <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide border
                  ${trip.status === 'Planning'
                                    ? 'bg-blue-50 text-blue-700 border-blue-100'
                                    : trip.status === 'Upcoming'
                                        ? 'bg-amber-50 text-amber-700 border-amber-100'
                                        : 'bg-(--bg-subtle) text-(--text-secondary) border-(--border-subtle)'
                                }`}
                            >
                {trip.status}
              </span>
                        </div>
                        <div className="flex items-center gap-2 text-(--text-secondary)">
                            <MapPin className="w-4 h-4" />
                            <span>{trip.destination}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Dates */}
                <div className="bg-(--surface) border border-(--border-subtle) p-5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2 text-(--text-secondary)">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs uppercase font-medium tracking-wider">Dates</span>
                    </div>
                    <p className="font-medium text-(--text-primary)">
                        {trip.start_date} – {trip.end_date}
                    </p>
                </div>

                {/* Budget */}
                <div className="bg-(--surface) border border-(--border-subtle) p-5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2 text-(--text-secondary)">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs uppercase font-medium tracking-wider">Budget</span>
                    </div>
                    <p className="font-medium text-(--text-primary)">
                        Ksh {Number(trip.budget).toLocaleString()}
                    </p>
                </div>

                {/* Duration */}
                <div className="bg-(--surface) border border-(--border-subtle) p-5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2 text-(--text-secondary)">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs uppercase font-medium tracking-wider">Duration</span>
                    </div>
                    <p className="font-medium text-(--text-primary)">
                        {calculateDuration(trip.start_date, trip.end_date)}
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="prose prose-zinc max-w-none">
                <h3 className="text-lg font-medium text-(--text-primary) mb-4">About this Trip</h3>
                <p className="text-(--text-secondary) leading-relaxed whitespace-pre-line">{trip.description}</p>
            </div>
        </div>
    );
};

export default Page;