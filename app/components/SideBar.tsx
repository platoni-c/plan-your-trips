"use client"

import Link from 'next/link'
import { LayoutDashboard, Map, PiggyBank, Settings, Plus, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, {useEffect, useState} from "react";
import {supabase} from "@/utils/supabase/client";

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
            className={`flex items-center gap-3 px-4 py-2.5 transition-all duration-200 text-sm font-medium ${active ? 'bg-(--bg-dark) text-white' : 'text-(--text-primary)  hover:text-(--text-primary) hover:bg-(--bg-subtle)'}`}
        >
            <span className={`${active ? 'text-white' : 'text-(--text-secondary) hover:bg-(--bg-button) hover:text-(--text-primary)'}`}>
                {icon}
            </span>
            <span>{label}</span>
        </Link>
    )
}

const SideBar = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const fetchUserInfo = async () => {
            const { data: { user }, error: authError,} = await supabase.auth.getUser()

            if (authError || !user) {
                console.error('No authenticated user found', authError)
                return
            }

            const { data, error } = await supabase
                .from('users')
                .select('full_name, email')
                .eq('auth_id', user.id)
                .single()

            if (error) {
                console.error('Failed to load user profile', error)
                return
            }

            if (data) {
                setFullName(data.full_name)
                setEmail(data.email)
            }
        }
        fetchUserInfo()
    }, []);

    const logOut = async () => {
        const { error } = await supabase.auth.signOut()

        if(error) {
            console.error("Unable to log out", error)
            return
        }
        window.location.href = "/login"
    }

    //Getting initials for the sidebar
    const getInitials = (fullName: string) => {
        return fullName
            .trim()
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(name => name[0].toUpperCase())
            .join("")
    }

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
                <Link href="/trips/new">
                    <button className="w-full flex items-center justify-center gap-2 bg-(--bg-dark) hover:bg-(--bg-dark-subtle) text-white py-2.5 px-4 transition-all shadow-sm font-medium text-sm">
                        <Plus className="w-4 h-4" />
                        <span className="capitalize">Plan a new trip</span>
                    </button>
                </Link>

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
            <div className="p-4 border-t border-(--border-subtle) hover:bg-(--bg-button)">
                <div className="flex items-center gap-3 rounded-md transition-colors group">
                    <div className="w-9 h-9 rounded-full bg-(--bg-super-subtle) flex items-center justify-center text-(--text-secondary) text-xs font-medium border border-(--border-subtle)">
                        {fullName ? getInitials(fullName) : "?"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-(--text-primary) truncate capitalize">{fullName}</p>
                        <p className="text-xs text-(--text-secondary) truncate">{email}</p>
                    </div>
                    <button className="hover:bg-(--bg-subtle) p-2 rounded-full cursor-pointer" onClick={logOut}>
                        <LogOut className="w-4 h-4 text-(--text-primary) transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
