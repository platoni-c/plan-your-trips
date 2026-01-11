import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/client"

interface UserProfile {
    full_name: string
    email: string
}

export const useUserProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true)

            const { data: { user }, error: authError } =
                await supabase.auth.getUser()

            if (authError || !user) {
                setError("No authenticated user")
                setLoading(false)
                return
            }

            const { data, error: profileError } = await supabase
                .from("users")
                .select("full_name, email")
                .eq("auth_id", user.id)
                .single()

            if (profileError) {
                setError(profileError.message)
                setLoading(false)
                return
            }

            setProfile(data)
            setLoading(false)
        }

        fetchProfile()
    }, [])

    return { profile, loading, error }
}