import React from 'react'
import { User, Bell, Shield, Moon, Monitor, Smartphone, ChevronRight } from 'lucide-react'

const Page = () => {
    return (
        <div className="p-8 mx-auto max-w-4xl">
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
                                SM
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-medium text-zinc-900">Samuel Mukabi</h3>
                                <p className="text-sm text-zinc-500">samuel@example.com</p>
                            </div>
                            <button className="text-sm font-medium text-zinc-900 border border-zinc-200 px-4 py-2 rounded-md hover:bg-zinc-50 transition-colors">
                                Edit
                            </button>
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
                    <button className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page
