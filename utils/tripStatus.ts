// Utility functions for trip status management

export interface Trip {
    id: string;
    start_date: string;
    end_date: string;
    status?: string;
    [key: string]: any;
}

export type TripStatus = 'Completed' | 'In Progress' | 'Upcoming' | 'Planning';

/**
 * Calculate the status of a trip based on its dates
 */
export function calculateTripStatus(trip: Trip, allTrips: Trip[]): TripStatus {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);

    // Completed: end date has passed
    if (end < today) return 'Completed';

    // In Progress: currently within trip dates
    if (start <= today && today <= end) return 'In Progress';

    // For future trips, find the one closest to today (Upcoming)
    const futureTrips = allTrips.filter(t => {
        const tStart = new Date(t.start_date);
        return tStart > today;
    });

    if (futureTrips.length === 0) return 'Planning';

    // Sort by start date to find the closest upcoming trip
    const sortedFuture = futureTrips.sort((a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    const upcomingTrip = sortedFuture[0];

    if (upcomingTrip.id === trip.id) return 'Upcoming';

    return 'Planning';
}

/**
 * Check if a trip can be deleted (not completed)
 */
export function canDeleteTrip(status: TripStatus): boolean {
    return status !== 'Completed';
}

/**
 * Get status badge styling
 */
export function getStatusStyles(status: TripStatus): { bg: string; text: string; border: string } {
    switch (status) {
        case 'Completed':
            return { bg: 'bg-green-50/50', text: 'text-green-600', border: 'border-green-100' };
        case 'In Progress':
            return { bg: 'bg-purple-50/50', text: 'text-purple-600', border: 'border-purple-100' };
        case 'Upcoming':
            return { bg: 'bg-amber-50/50', text: 'text-amber-600', border: 'border-amber-100' };
        case 'Planning':
            return { bg: 'bg-blue-50/50', text: 'text-blue-600', border: 'border-blue-100' };
        default:
            return { bg: 'bg-zinc-50', text: 'text-zinc-500', border: 'border-zinc-100' };
    }
}
