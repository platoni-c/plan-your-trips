"use client"

import { Map } from 'lucide-react'

const MobileHeader = () => {
    return (
        <div className="md:hidden sticky top-0 z-40 bg-(--bg-page)/80 backdrop-blur-md border-b border-(--border-subtle) px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-(--bg-dark) rounded-md flex items-center justify-center">
                    <Map className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold uppercase tracking-wider text-(--text-primary)">Samuel&#39;s</span>
            </div>
        </div>
    )
}

export default MobileHeader
