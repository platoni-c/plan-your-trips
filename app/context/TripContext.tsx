"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { calculateTripStatus } from "@/utils/tripStatus"

export interface Trip {
    id: string
    name: string
    destination: string
    start_date: string
    end_date: string
    description: string
    budget: string
    status: string
}

interface TripsContextType {
    trips: Trip[]
    loading: boolean
    fetchTrips: () => Promise<void>
    setTrips: (trips: Trip[]) => void
}

const TripsContext = createContext<TripsContextType | null>(null)

export const TripsProvider = ({ children }: { children: React.ReactNode }) => {
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)

    const fetchTrips = async () => {
        setLoading(true)

        const supabase = createClient()
        const { data, error } = await supabase
            .from("trips")
            .select("id, name, destination, start_date, end_date, description, budget, status")
            .order("start_date", { ascending: true })

        if (error) {
            console.error("Failed to fetch trips", error)
        } else {
            if (data) {
                // Check and update statuses
                const updatedTrips = await Promise.all(data.map(async (trip) => {
                    const correctStatus = calculateTripStatus(trip, data);

                    if (trip.status !== correctStatus) {
                        console.log(`Updating status for trip ${trip.name} from ${trip.status} to ${correctStatus}`);
                        // Update in database
                        await supabase
                            .from('trips')
                            .update({ status: correctStatus })
                            .eq('id', trip.id);

                        return { ...trip, status: correctStatus };
                    }

                    return trip;
                }));

                setTrips(updatedTrips);
            } else {
                setTrips([]);
            }
        }

        setLoading(false)
    }

    useEffect(() => {
        (async () => {
            await fetchTrips()
        })()
    }, [])

    return (
        <TripsContext.Provider
            value={{
                trips,
                loading,
                fetchTrips,
                setTrips,
            }}
        >
            {children}
        </TripsContext.Provider>
    )
}

export const useTrips = () => {
    const context = useContext(TripsContext)
    if (!context) {
        throw new Error("useTrips must be used within TripsProvider")
    }
    return context
}