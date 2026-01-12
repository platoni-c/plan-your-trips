"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

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
            setTrips(data ?? [])
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