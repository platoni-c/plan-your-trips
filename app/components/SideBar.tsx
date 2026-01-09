"use client"

import Link from 'next/link'
import { LayoutDashboard, Map, PiggyBank, Settings, Plus, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from "react";

interface SideBarLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

const SideBarLink = ({ href, icon, label }: SideBarLinkProps) => {
    const pathname = usePathname()
    const active = pathname === href
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 transition-all duration-200 text-sm font-medium ${active ? 'bg-(--bg-button) text-(--text-primary)' : 'text-(--text-primary)  hover:text-(--text-primary)'}`}
        >
            <span className={`${active ? 'text-(--text-primary)' : 'text-(--text-secondary) hover:bg-(--bg-button) hover:text-(--text-primary)'}`}>
                {icon}
            </span>
            <span>{label}</span>
        </Link>
    )
}

const SideBar = () => {
    return (
        <div className="h-screen flex flex-col bg-(--sidebar-bg) border-r border-(--border-subtle) sticky top-0 left-0">
            {/* Logo Section */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-(--bg-dark) rounded-md flex items-center justify-center">
                        <Map className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-wider text-(--text-primary)">Samuel&#39;s</span>
                </div>
            </div>

            {/* Create Trip Action */}
            <div className="px-4 mb-8">
                <button className="w-full flex items-center justify-center gap-2 bg-(--bg-dark) hover:bg-(--bg-dark-subtle) text-white py-2.5 px-4 transition-all shadow-sm font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    <span className="capitalize">Plan a new trip</span>
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-1">
                <SideBarLink
                    href="/dashboard"
                    icon={<LayoutDashboard className="w-4 h-4" />}
                    label="Dashboard"
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
            <div className="p-4 border-t border-(--border-subtle)">
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-(--bg-button) transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-full bg-(--bg-super-subtle) flex items-center justify-center text-(--text-secondary) text-xs font-medium border border-(--border-subtle)">
                        SM
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-(--text-primary) truncate">Samuel Mukabi</p>
                        <p className="text-xs text-(--text-secondary) truncate">samuel@example.com</p>
                    </div>
                    <LogOut className="w-4 h-4 text-(--text-primary) transition-colors" />
                </div>
            </div>
        </div>
    )
}

export default SideBar
