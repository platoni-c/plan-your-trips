import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { trips } from '@/app/lib/data';


interface PageProps {
    params: { id: string };
}

const Page = async ({ params }: PageProps) => {
    const data = await params
    const trip = trips.find((trip) => trip.name === data.id);

    if (!trip) {
        console.log("Could not find trip with id " + data.id);
        return (
            <div className="text-center py-12 text-sm text-(--text-muted)] font-light">
                No trips found.{' '}
                <Link href="/trips" className="text(--text-primary) hover:underline">
                    Go back to Trips
                </Link>
            </div>
        );
    }
    console.log(trip);
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
                            <h1 className="text-3xl font-medium text-(--text-primary) tracking-tight">
                                {trip.name}
                            </h1>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide border
                                ${trip.status === 'Planning' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    trip.status === 'Upcoming' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                        'bg-(--bg-subtle) text-(--text-secondary) border-(--border-subtle)'
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
                <div className="bg-(--surface) border border-(--border-subtle) p-5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2 text-(--text-secondary)">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs uppercase font-medium tracking-wider">Dates</span>
                    </div>
                    <p className="font-medium text-(--text-primary)">{trip.date}</p>
                </div>

                <div className="bg-(--surface) border border-(--border-subtle) p-5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2 text-(--text-secondary)">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs uppercase font-medium tracking-wider">Budget</span>
                    </div>
                    <p className="font-medium text-(--text-primary)">{trip.budget}</p>
                </div>

                <div className="bg-(--surface) border border-(--border-subtle) p-5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2 text-(--text-secondary)">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs uppercase font-medium tracking-wider">Duration</span>
                    </div>
                    {/* Calculate duration rough approximation or just placeholder if complex math needed is overkill for now */}
                    <p className="font-medium text-(--text-primary)">{trip.duration}</p>
                </div>
            </div>

            {/* Description or Itinerary Placeholder */}
            <div className="prose prose-zinc max-w-none">
                <h3 className="text-lg font-medium text-(--text-primary) mb-4">About this Trip</h3>
                <p className="text-(--text-secondary) leading-relaxed whitespace-pre-line">
                    {trip.description}
                </p>
            </div>
        </div>
    );
};

export default Page;
