import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, Map, PiggyBank, Settings, Plus, LogOut } from 'lucide-react'

interface SideBarLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

const SideBarLink = ({ href, icon, label, active }: SideBarLinkProps) => {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 text-sm font-medium
                ${active
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }
            `}
        >
            <span className={`
                ${active ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-500'}
            `}>
                {icon}
            </span>
            <span>{label}</span>
        </Link>
    )
}

const SideBar = () => {
    return (
        <div className="h-full flex flex-col bg-white border-r border-zinc-200">
            {/* Logo Section */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center">
                        <Map className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-wider text-zinc-900">Samuel&#39;s</span>
                </div>
            </div>

            {/* Create Trip Action */}
            <div className="px-4 mb-8">
                <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 px-4 rounded-md transition-all shadow-sm font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    <span>New trip</span>
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-1">
                <SideBarLink
                    href="/dashboard"
                    icon={<LayoutDashboard className="w-4 h-4" />}
                    label="Dashboard"
                    active
                />
                <SideBarLink
                    href="/trips"
                    icon={<Map className="w-4 h-4" />}
                    label="My Trips"
                />
                <SideBarLink
                    href="/budgets"
                    icon={<PiggyBank className="w-4 h-4" />}
                    label="Budgets"
                />
                <SideBarLink
                    href="/settings"
                    icon={<Settings className="w-4 h-4" />}
                    label="Settings"
                />
            </nav>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-zinc-100">
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-50 transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 text-xs font-medium border border-zinc-200">
                        SM
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-zinc-900 truncate">Samuel Mukabi</p>
                        <p className="text-xs text-zinc-500 truncate">samuel@example.com</p>
                    </div>
                    <LogOut className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
                </div>
            </div>
        </div>
    )
}

export default SideBar
