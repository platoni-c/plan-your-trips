"use client"

import Link from "next/link";
import React, { useState } from "react";
import { register, loginWithGoogle } from "@/utils/supabase/auth";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

export const dynamic = 'force-dynamic'

export default function Page() {
    const router = useRouter();
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage("")
        setLoading(true)

        const { error } = await register(email, password, fullName)

        if (error) {
            setErrorMessage(error.message)
            setLoading(false)
            // Capture registration error
            posthog.capture('user_signup_failed', {
                error_message: error.message,
            })
        } else {
            // Identify the user with their email
            posthog.identify(email, {
                email: email,
                name: fullName,
            })
            // Capture successful registration
            posthog.capture('user_signed_up', {
                signup_method: 'email',
            })

            router.push("/dashboard")
            setLoading(false)
        }
    }

    const handleGoogleLogIn = async () => {
        try {
            setGoogleLoading(true)
            setErrorMessage("")

            // Capture Google auth initiation
            posthog.capture('google_auth_initiated', {
                page: 'register',
            })

            const { data, error } = await loginWithGoogle()

            if (error) {
                setErrorMessage(error.message)
                setGoogleLoading(false)
                posthog.capture('google_auth_failed', {
                    error_message: error.message,
                    page: 'register',
                })
            } else if (data?.url) {
                // Redirect to the OAuth provider
                window.location.href = data.url
            } else {
                setErrorMessage("Failed to initiate Google sign in - no URL returned")
                setGoogleLoading(false)
            }
        } catch (err) {
            setErrorMessage("Failed to initiate Google sign in")
            setGoogleLoading(false)
            posthog.captureException(err)
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-250 grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden border border-(--border-subtle)">
                {/* Left side / brand */}
                <div className="hidden md:flex flex-col justify-between bg-black text-white p-12 lg:p-16 relative overflow-hidden">
                    <div className="z-10">
                        <p className="text-xs font-medium tracking-[0.2em] uppercase opacity-70">
                            Plan My Trip
                        </p>
                        <h1 className="mt-6 text-4xl font-light leading-tight tracking-tight">
                            Start your journey
                            <br />
                            <span className="opacity-50">with us today.</span>
                        </h1>
                    </div>

                    <div className="z-10 mt-12">
                        <p className="text-sm font-light leading-relaxed opacity-60 max-w-xs">
                            &#34;Every journey begins with a single step. Join us and discover a world of possibilities.&#34;
                        </p>
                    </div>
                </div>

                {/* Right side / form */}
                <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
                    <div className="w-full max-w-sm mx-auto">
                        <div className="mb-10">
                            <h2 className="text-2xl font-medium text-zinc-900 tracking-tight">
                                Create account
                            </h2>
                            <p className="mt-2 text-sm text-(--text-secondary)">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-black transition-all"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-medium text-(--text-primary) uppercase tracking-wider"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 bg-zinc-50 px-4 py-3.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-(--input-border) placeholder:text-(--input-placeholder) focus:bg-white focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 focus:outline-none capitalize"
                                    placeholder="Taylor Traveler"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-(--text-primary) uppercase tracking-wider"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 bg-zinc-50 px-4 py-3.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-(--input-border) placeholder:text-(--input-placeholder) focus:bg-white focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 focus:outline-none"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium text-(--text-primary) uppercase tracking-wider"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 bg-zinc-50 px-4 py-3.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-(--input-border) placeholder:text-(--input-placeholder) focus:bg-white focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 focus:outline-none"
                                    placeholder="Create a secure password"
                                />
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-sm">{errorMessage}</p>
                            )}

                            <div className="py-2">
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    By creating an account, you agree to our <a href="#" className="underline text-zinc-700 hover:text-black">Terms of Service</a> and <a href="#" className="underline text-zinc-700 hover:text-black">Privacy Policy</a>.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-md bg-black px-4 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98]"
                            >
                                {loading ? "Creating..." : "Create account"}
                            </button>
                        </form>

                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-b border-(--border-subtle)"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-zinc-400 font-normal">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleGoogleLogIn}
                                    type="button"
                                    disabled={googleLoading}
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50 transition-colors focus-visible:ring-black active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed">
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                        <path d="M12.0003 20.45C16.667 20.45 20.5836 16.5333 20.5836 11.8667H12.0003V20.45Z" fill="#E2E8F0" />
                                        <path d="M12.0003 20.4501C7.33366 20.4501 3.41699 16.5334 3.41699 11.8668C3.41699 7.20009 7.33366 3.28342 12.0003 3.28342C14.367 3.28342 16.5087 4.24175 18.067 5.79175L15.6337 8.22509C14.7003 7.29175 13.4087 6.71675 12.0003 6.71675C9.15866 6.71675 6.85033 9.02509 6.85033 11.8668C6.85033 14.7084 9.15866 17.0168 12.0003 17.0168V20.4501Z" fill="#2D3748" />
                                    </svg>
                                    <span className="text-sm font-medium">{googleLoading ? "Loading..." : "Google"}</span>
                                </button>
                                <button type="button" className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50 transition-colors focus-visible:ring-black active:scale-[0.99]">
                                    <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">GitHub</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}