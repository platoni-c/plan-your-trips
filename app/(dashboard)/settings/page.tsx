"use client"

import React, { useState } from 'react'
import { User, Bell, Shield, Moon, Monitor, Smartphone, ChevronRight, Check, X } from 'lucide-react'
import { useUser } from "@/app/context/UserContext"
import { createClient } from "@/utils/supabase/client"

const Page = () => {
    const { profile, loading, signOut } = useUser()
    const [isEditing, setIsEditing] = useState(false)
    const [newName, setNewName] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    // Initialize edit state with current name when entering edit mode
    const handleEditClick = () => {
        setNewName(profile?.full_name || "")
        setIsEditing(true)
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setNewName("")
    }

    const handleSaveProfile = async () => {
        if (!profile) return
        setIsSaving(true)

        const supabase = createClient()
        const { error } = await supabase
            .from('users')
            .update({ full_name: newName })
            .eq('id', profile.id)

        if (error) {
            console.error("Error updating profile:", error)
            alert("Failed to update profile")
        } else {
            window.location.reload()
        }
        setIsSaving(false)
        setIsEditing(false)
    }

    if (loading) {
        return (
            <div className="p-8 mx-auto max-w-4xl min-h-screen">
                <p className="text-sm text-zinc-500">Loading settings...</p>
            </div>
        )
    }

    const initials = profile?.full_name
        ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
        : profile?.email?.substring(0, 2).toUpperCase() || "??"

    return (
        <div className="p-8 mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-2xl font-medium text-zinc-900 tracking-tight">
                    Settings
                </h1>
                <p className="mt-2 text-sm text-zinc-500 max-w-md leading-relaxed">
                    Manage your account details, preferences, and security settings.
                </p>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white border border-zinc-200 rounded-md overflow-hidden">
                    <div className="p-6 border-b border-zinc-100">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-zinc-900" />
                            <h2 className="text-sm font-medium text-zinc-900 uppercase tracking-wider">
                                User Profile
                            </h2>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 text-xl font-medium border border-zinc-200">
                                {initials}
                            </div>
                            <div className="flex-1">
                                {isEditing ? (
                                    <div className="flex items-center gap-2 max-w-xs">
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="w-full border border-zinc-300 rounded px-2 py-1 text-base font-medium text-zinc-900 outline-none focus:border-zinc-500 transition-colors"
                                            placeholder="Full Name"
                                            autoFocus
                                        />
                                    </div>
                                ) : (
                                    <h3 className="text-base font-medium text-zinc-900">
                                        {profile?.full_name || "No Name Set"}
                                    </h3>
                                )}
                                <p className="text-sm text-zinc-500 mt-1">{profile?.email}</p>
                            </div>

                            {isEditing ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleSaveProfile}
                                        disabled={isSaving}
                                        className="text-zinc-900 hover:text-green-600 border border-zinc-200 p-2 rounded-md hover:bg-zinc-50 transition-colors"
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        disabled={isSaving}
                                        className="text-zinc-500 hover:text-red-500 border border-zinc-200 p-2 rounded-md hover:bg-zinc-50 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleEditClick}
                                    className="text-sm font-medium text-zinc-900 border border-zinc-200 px-4 py-2 rounded-md hover:bg-zinc-50 transition-colors"
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <div className="bg-white border border-zinc-200 rounded-md overflow-hidden">
                    <div className="p-6 border-b border-zinc-100">
                        <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-zinc-900" />
                            <h2 className="text-sm font-medium text-zinc-900 uppercase tracking-wider">
                                Appearance
                            </h2>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="cursor-pointer">
                                <div className="bg-zinc-100 rounded-md h-24 border-2 border-zinc-900 mb-3 flex items-center justify-center">
                                    <Monitor className="w-6 h-6 text-zinc-900" />
                                </div>
                                <span className="block text-center text-sm font-medium text-zinc-900">System</span>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-white rounded-md h-24 border border-zinc-200 mb-3 flex items-center justify-center group-hover:border-zinc-300 transition-colors">
                                    <User className="w-6 h-6 text-zinc-400" />
                                </div>
                                <span className="block text-center text-sm font-medium text-zinc-500">Light</span>
                            </div>
                            <div className="cursor-pointer group">
                                <div className="bg-zinc-900 rounded-md h-24 border border-zinc-800 mb-3 flex items-center justify-center group-hover:border-zinc-700 transition-colors">
                                    <Moon className="w-6 h-6 text-white" />
                                </div>
                                <span className="block text-center text-sm font-medium text-zinc-500">Dark</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences Lists */}
                <div className="bg-white border border-zinc-200 rounded-md overflow-hidden">
                    <div className="divide-y divide-zinc-100">
                        <div className="p-4 flex items-center justify-between hover:bg-zinc-50 cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                                <Bell className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
                                <div>
                                    <span className="block text-sm font-medium text-zinc-900">Notifications</span>
                                    <span className="block text-xs text-zinc-500">Manage how you receive alerts</span>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-400" />
                        </div>
                        <div className="p-4 flex items-center justify-between hover:bg-zinc-50 cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                                <Shield className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
                                <div>
                                    <span className="block text-sm font-medium text-zinc-900">Privacy & Security</span>
                                    <span className="block text-xs text-zinc-500">Control your data and account access</span>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-400" />
                        </div>
                        <div className="p-4 flex items-center justify-between hover:bg-zinc-50 cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
                                <div>
                                    <span className="block text-sm font-medium text-zinc-900">Connected Devices</span>
                                    <span className="block text-xs text-zinc-500">Manage devices logged into your account</span>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-400" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                    <button
                        onClick={() => signOut()}
                        className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page
