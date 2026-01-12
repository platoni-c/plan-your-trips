"use client"

import Link from 'next/link'
import { Sparkles, ArrowLeft, Lock } from 'lucide-react'

export default function UnlockFeaturesPage() {
    return (
        <div className="min-h-screen bg-(--bg-page) flex flex-col items-center justify-center p-6 text-center">
            {/* Icon Circle */}
            <div className="w-16 h-16 bg-(--bg-subtle)/50 rounded-full flex items-center justify-center mb-6 border border-(--border-subtle)">
                <Lock className="w-8 h-8 text-(--text-primary)" />
            </div>

            {/* Content */}
            <h1 className="text-3xl md:text-4xl font-medium text-(--text-primary) mb-4 tracking-tight">
                Unlock Full Access
            </h1>

            <p className="text-lg text-(--text-secondary) max-w-md mb-10 leading-relaxed font-light">
                To create unlimited trips, track budgets, and sync your data across devices, you need to be signed in.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                <Link
                    href="/login"
                    className="flex-1 bg-(--bg-dark) hover:bg-(--bg-dark-subtle) text-white font-medium py-3.5 transition-all shadow-lg shadow-black/5 active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                    <span>Log In</span>
                </Link>
                <Link
                    href="/register"
                    className="flex-1 bg-white border border-(--border-subtle) text-(--text-primary) font-medium py-3.5 transition-all active:scale-[0.98]"
                >
                    Create Account
                </Link>
            </div>

            {/* Back Link */}
            <Link
                href="/dashboard"
                className="mt-12 text-sm text-(--text-secondary) hover:text-(--text-primary) flex items-center gap-2 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>
        </div>
    )
}
