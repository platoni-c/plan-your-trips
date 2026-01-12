"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import posthog from "posthog-js"

interface UserProfile {
    id: string          // primary key from users table
    auth_id: string     // foreign key linking to auth.users.id
    full_name: string
    email: string
}

interface UserContextType {
    profile: UserProfile | null
    loading: boolean
    signOut: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()
        const loadUser = async () => {
            setLoading(true)

            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setProfile(null)
                setLoading(false)
                return
            }

            const { data } = await supabase
                .from("users")
                .select("id, auth_id, full_name, email")
                .eq("auth_id", user.id)
                .single()

            setProfile(data ?? null)

            // Identify user in PostHog when profile is loaded
            if (data) {
                posthog.identify(data.email, {
                    email: data.email,
                    name: data.full_name,
                    user_id: data.id,
                })
            }

            setLoading(false)
        }

        loadUser()

        // 🔥 listen for auth changes (login / logout)
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            loadUser()
        })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    const signOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()

        // Reset PostHog identity on logout
        posthog.reset()

        setProfile(null)
        window.location.href = "/"
    }

    return (
        <UserContext.Provider value={{ profile, loading, signOut }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used inside UserProvider")
    }
    return context
}