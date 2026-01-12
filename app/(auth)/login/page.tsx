"use client"

import Link from "next/link";
import React, { FormEvent, useState, useEffect } from "react";
import { login } from "@/utils/supabase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export const dynamic = 'force-dynamic'

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)

    useEffect(() => {
        const error = searchParams.get('error')
        if (error === 'auth_callback_error') {
            // Use setTimeout to avoid cascading renders
            setTimeout(() => {
                setErrorMessage("Authentication failed. Please try again.")
                // Clean up the URL
                router.replace('/login')
            }, 0)
        }
    }, [searchParams, router])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage("")
        setLoading(true)
        const { error } = await login(email, password)

        if (error) {
            setErrorMessage(error.message)
            setLoading(false)
        } else {
            router.push("/dashboard")
            setLoading(false)
        }
    }

    const handleGoogleLogIn = async () => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login/page.tsx:42', message: 'Google login initiated', data: { page: 'login' }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
        // #endregion
        try {
            setGoogleLoading(true)
            setErrorMessage("")
            // Use environment variable if available, otherwise use current origin
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
            const redirectUrl = `${baseUrl}/auth/callback?next=/dashboard`
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login/page.tsx:47', message: 'Redirect URL prepared', data: { redirectUrl }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'F' }) }).catch(() => { });
            // #endregion
            const supabase = createClient()
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: redirectUrl,
                },
            })
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login/page.tsx:56', message: 'signInWithOAuth response', data: { hasError: !!error, errorMessage: error?.message, hasUrl: !!data?.url, url: data?.url?.substring(0, 50) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
            // #endregion

            if (error) {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login/page.tsx:59', message: 'OAuth error detected', data: { errorMessage: error.message, errorName: error.name }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
                // #endregion
                setErrorMessage(error.message)
                setGoogleLoading(false)
            } else if (data?.url) {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login/page.tsx:64', message: 'Redirecting to OAuth provider', data: { url: data.url.substring(0, 100) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'C' }) }).catch(() => { });
                // #endregion
                // Redirect to the OAuth provider
                window.location.href = data.url
            } else {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login/page.tsx:68', message: 'No URL returned from OAuth', data: { hasData: !!data, hasUrl: !!data?.url }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'C' }) }).catch(() => { });
                // #endregion
                setErrorMessage("Failed to initiate Google sign in - no URL returned")
                setGoogleLoading(false)
            }
        } catch (err) {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/22c8983f-50a4-45be-b400-8115f80a8fdd', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login/page.tsx:74', message: 'Exception in Google login', data: { error: err instanceof Error ? err.message : String(err) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'D' }) }).catch(() => { });
            // #endregion
            setErrorMessage("Failed to initiate Google sign in")
            setGoogleLoading(false)
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
                            Create your account
                            <br />
                            <span className="opacity-50">and start planning.</span>
                        </h1>
                    </div>

                    <div className="z-10 mt-12">
                        <p className="text-sm font-light leading-relaxed opacity-60 max-w-xs">
                            &#34;The best way to predict the future is to create it. Start planning your next adventure today.&#34;
                        </p>
                    </div>
                </div>

                {/* Right side / form */}
                <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
                    <div className="w-full max-w-sm mx-auto">
                        <div className="mb-10">
                            <h2 className="text-2xl font-medium text-zinc-900 tracking-tight">
                                Welcome back
                            </h2>
                            <p className="mt-2 text-sm text-zinc-500">
                                Don&#39;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-black transition-all"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-(--input-placeholder) uppercase tracking-wider"
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
                                    className="block w-full rounded-md bg-(zinc-50) px-4 py-3.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-(--input-border) placeholder:text-(--input-placeholder) focus:bg-white focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 focus:outline-none"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-xs font-medium text-(--input-placeholder) uppercase tracking-wider"
                                    >
                                        Password
                                    </label>
                                    <div className="text-xs">
                                        <a href="#" className="font-medium text-zinc-500 hover:text-black transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-md bg-zinc-50 px-4 py-3.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-(--input-border) placeholder:text-(--input-placeholder) focus:bg-white focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 focus:outline-none"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-sm">{errorMessage}</p>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative flex w-full justify-center rounded-md bg-black px-4 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98]"
                                >
                                    {loading ? "Signing in..." : "Sign in"}
                                </button>
                            </div>
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