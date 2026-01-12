"use client"

import Link from 'next/link'
import { LayoutDashboard, Map, PiggyBank, Settings, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'

const MobileNav = () => {
    const pathname = usePathname()
    const { profile } = useUser()

    const isActive = (path: string) => pathname === path

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-(--bg-page) border-t border-(--border-subtle) pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                <Link
                    href="/dashboard"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/dashboard') ? 'text-(--text-primary)' : 'text-(--text-muted) hover:text-(--text-secondary)'}`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Home</span>
                </Link>

                <Link
                    href="/trips"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/trips') ? 'text-(--text-primary)' : 'text-(--text-muted) hover:text-(--text-secondary)'}`}
                >
                    <Map className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Trips</span>
                </Link>

                <Link
                    href={profile ? "/trips/new" : "/unlock-features"}
                    className="flex flex-col items-center justify-center w-full h-full -mt-6"
                >
                    <div className="w-12 h-12 bg-(--bg-dark) rounded-full flex items-center justify-center shadow-lg shadow-black/10 active:scale-95 transition-transform">
                        <Plus className="w-6 h-6 text-white" />
                    </div>
                </Link>

                <Link
                    href="/budgets"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/budgets') ? 'text-(--text-primary)' : 'text-(--text-muted) hover:text-(--text-secondary)'}`}
                >
                    <PiggyBank className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Budgets</span>
                </Link>

                <Link
                    href="/settings"
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/settings') ? 'text-(--text-primary)' : 'text-(--text-muted) hover:text-(--text-secondary)'}`}
                >
                    <Settings className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Settings</span>
                </Link>
            </div>
        </div>
    )
}

export default MobileNav
