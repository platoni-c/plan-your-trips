"use client"

import React, { useState } from 'react'
import { Plus } from 'lucide-react'

interface Trip {
    name: string,
    date: string,
    budget: string,
    status: string,
}

const trips: Trip[] = [
    { name: "Summer in Kyoto", date: "Apr 12 - Apr 20, 2026", status: "Planning", budget: "Ksh 320,000" },
    { name: "Maasai Mara Safari", date: "Mar 20 - Mar 25, 2026", status: "Upcoming", budget: "Ksh 130,000" },
    { name: "Bali Retreat", date: "Dec 10 - Dec 25, 2025", status: "Upcoming", budget: "Ksh 250,000" },
    { name: "Weekend in NYC", date: "May 05 - May 08, 2025", status: "Completed", budget: "Ksh 180,000" },
    { name: "Cape Town Escape", date: "Feb 14 - Feb 18, 2025", status: "Completed", budget: "Ksh 150,000" },
    { name: "Santorini Getaway", date: "Jun 10 - Jun 16, 2026", status: "Planning", budget: "Ksh 210,000" },
    { name: "Tokyo Food Tour", date: "Sep 01 - Sep 09, 2026", status: "Planning", budget: "Ksh 340,000" },
    { name: "Alps Ski Trip", date: "Jan 12 - Jan 20, 2026", status: "Upcoming", budget: "Ksh 380,000" },
    { name: "Desert Nights", date: "Nov 03 - Nov 09, 2025", status: "Upcoming", budget: "Ksh 260,000" },
    { name: "Wine in Tuscany", date: "Aug 18 - Aug 24, 2025", status: "Planning", budget: "Ksh 295,000" },
    { name: "Island Hopping", date: "Jul 05 - Jul 14, 2025", status: "Upcoming", budget: "Ksh 225,000" },
    { name: "Road Trip SA", date: "Oct 01 - Oct 07, 2025", status: "Planning", budget: "Ksh 140,000" },
    { name: "City Lights", date: "Mar 10 - Mar 15, 2025", status: "Completed", budget: "Ksh 310,000" },
    { name: "Historic Cairo", date: "Jan 22 - Jan 27, 2025", status: "Completed", budget: "Ksh 175,000" },
    { name: "Safari in Tanzania", date: "Jun 02 - Jun 08, 2025", status: "Upcoming", budget: "Ksh 200,000" },
    { name: "Northern Lights", date: "Feb 18 - Feb 24, 2026", status: "Planning", budget: "Ksh 360,000" },
    { name: "Lake District Retreat", date: "Apr 05 - Apr 07, 2025", status: "Completed", budget: "Ksh 90,000" },
    { name: "Cultural Morocco", date: "Sep 15 - Sep 22, 2025", status: "Upcoming", budget: "Ksh 230,000" },
    { name: "Great Barrier Reef", date: "Oct 20 - Oct 28, 2026", status: "Planning", budget: "Ksh 410,000" },
    { name: "Iceland Ring Road", date: "May 01 - May 10, 2026", status: "Planning", budget: "Ksh 390,000" },
    { name: "Patagonia Expedition", date: "Jan 15 - Jan 28, 2027", status: "Planning", budget: "Ksh 420,000" },
    { name: "Swiss Alps Hiking Week", date: "Feb 03 - Feb 10, 2027", status: "Completed", budget: "Ksh 350,000" },
    { name: "Lisbon Coastal Escape", date: "Mar 08 - Mar 14, 2027", status: "Upcoming", budget: "Ksh 210,000" },
    { name: "Canadian Rockies Road Trip", date: "Apr 01 - Apr 10, 2027", status: "Planning", budget: "Ksh 330,000" },
    { name: "New Zealand North Island Drive", date: "Apr 18 - Apr 28, 2027", status: "Completed", budget: "Ksh 400,000" },
    { name: "Vietnam Heritage Trail", date: "May 05 - May 15, 2027", status: "Upcoming", budget: "Ksh 260,000" },
    { name: "Amalfi Coast Getaway", date: "May 22 - May 29, 2027", status: "Planning", budget: "Ksh 310,000" },
    { name: "Scottish Highlands Loop", date: "Jun 03 - Jun 11, 2027", status: "Completed", budget: "Ksh 270,000" },
    { name: "Hawaiian Island Explorer", date: "Jun 18 - Jun 25, 2027", status: "Upcoming", budget: "Ksh 390,000" },
    { name: "Berlin & Prague City Hop", date: "Jul 02 - Jul 09, 2027", status: "Planning", budget: "Ksh 280,000" },
    { name: "Sahara Desert Crossing", date: "Jul 16 - Jul 24, 2027", status: "Completed", budget: "Ksh 305,000" },
    { name: "Nordic Fjords Cruise", date: "Aug 01 - Aug 09, 2027", status: "Upcoming", budget: "Ksh 365,000" },
    { name: "Tokyo & Osaka Rail Tour", date: "Aug 18 - Aug 26, 2027", status: "Planning", budget: "Ksh 345,000" },
    { name: "Buenos Aires Tango Nights", date: "Sep 02 - Sep 09, 2027", status: "Completed", budget: "Ksh 255,000" },
    { name: "Pacific Northwest Road Trip", date: "Sep 15 - Sep 23, 2027", status: "Upcoming", budget: "Ksh 295,000" },
    { name: "Greek Island Sailing Week", date: "Oct 01 - Oct 08, 2027", status: "Planning", budget: "Ksh 375,000" },
    { name: "South Korea Culture Week", date: "Oct 14 - Oct 22, 2027", status: "Completed", budget: "Ksh 325,000" },
    { name: "Yucatán Ruins Adventure", date: "Nov 03 - Nov 11, 2027", status: "Upcoming", budget: "Ksh 285,000" },
    { name: "Sri Lanka Tea Country", date: "Nov 18 - Nov 26, 2027", status: "Planning", budget: "Ksh 335,000" },
    { name: "Croatian Coastline Cruise", date: "Dec 05 - Dec 13, 2027", status: "Completed", budget: "Ksh 415,000" },
    { name: "Bhutan Monastery Trek", date: "Jan 06 - Jan 14, 2028", status: "Upcoming", budget: "Ksh 360,000" },
    { name: "Iceland Winter Escape", date: "Jan 20 - Jan 28, 2028", status: "Planning", budget: "Ksh 340,000" },
    { name: "Spain Andalusian Circuit", date: "Feb 05 - Feb 13, 2028", status: "Completed", budget: "Ksh 300,000" },
    { name: "Turkey Cappadocia Balloons", date: "Feb 20 - Feb 27, 2028", status: "Upcoming", budget: "Ksh 310,000" },
    { name: "Kenya Coast Beach Week", date: "Mar 04 - Mar 11, 2028", status: "Planning", budget: "Ksh 220,000" },
    { name: "Peru Inca Heartland", date: "Mar 18 - Mar 26, 2028", status: "Completed", budget: "Ksh 380,000" },
    { name: "Dolomites Hiking Retreat", date: "Apr 03 - Apr 11, 2028", status: "Upcoming", budget: "Ksh 355,000" },
    { name: "Jordan Petra & Wadi Rum", date: "Apr 20 - Apr 28, 2028", status: "Planning", budget: "Ksh 295,000" },
    { name: "Zanzibar Spice Escape", date: "May 04 - May 11, 2028", status: "Completed", budget: "Ksh 230,000" },
    { name: "California Coast Drive", date: "May 19 - May 27, 2028", status: "Upcoming", budget: "Ksh 310,000" },
    { name: "Baltic Capitals Cruise", date: "Jun 03 - Jun 10, 2028", status: "Planning", budget: "Ksh 365,000" },
    { name: "Malaysian Rainforest Retreat", date: "Jun 17 - Jun 24, 2028", status: "Completed", budget: "Ksh 270,000" },
    { name: "Garden Route Discovery", date: "Jul 01 - Jul 09, 2028", status: "Upcoming", budget: "Ksh 260,000" },
    { name: "Swiss Lakes & Villages", date: "Jul 15 - Jul 22, 2028", status: "Planning", budget: "Ksh 345,000" },
    { name: "Austrian Christmas Markets", date: "Aug 01 - Aug 08, 2028", status: "Completed", budget: "Ksh 235,000" },
    { name: "Rockies Ski Escape", date: "Aug 19 - Aug 26, 2028", status: "Upcoming", budget: "Ksh 390,000" },
    { name: "Madagascar Wildlife Quest", date: "Sep 02 - Sep 10, 2028", status: "Planning", budget: "Ksh 410,000" },
    { name: "Mallorca Cycling Holiday", date: "Sep 16 - Sep 23, 2028", status: "Completed", budget: "Ksh 275,000" },
    { name: "Portugal Douro Wine Trail", date: "Oct 01 - Oct 08, 2028", status: "Upcoming", budget: "Ksh 245,000" },
    { name: "Dubai Luxury Stopover", date: "Oct 15 - Oct 22, 2028", status: "Planning", budget: "Ksh 420,000" },
    { name: "Uganda Gorilla Trek", date: "Nov 02 - Nov 09, 2028", status: "Completed", budget: "Ksh 370,000" },
    { name: "Myanmar Temple Trail", date: "Nov 18 - Nov 25, 2028", status: "Upcoming", budget: "Ksh 280,000" },
    { name: "Philippines Island Hopping", date: "Dec 03 - Dec 11, 2028", status: "Planning", budget: "Ksh 300,000" },
    { name: "Tokyo Anime Pilgrimage", date: "Dec 18 - Dec 26, 2028", status: "Completed", budget: "Ksh 335,000" },
    { name: "Laos Mekong Slow Boat", date: "Jan 04 - Jan 12, 2029", status: "Upcoming", budget: "Ksh 260,000" },
    { name: "Fiji Overwater Escape", date: "Jan 20 - Jan 28, 2029", status: "Planning", budget: "Ksh 415,000" },
    { name: "Alaska Glacier Cruise", date: "Feb 03 - Feb 11, 2029", status: "Completed", budget: "Ksh 430,000" },
    { name: "Ireland Castle Circuit", date: "Feb 17 - Feb 25, 2029", status: "Upcoming", budget: "Ksh 290,000" },
    { name: "Mexican Baja Road Trip", date: "Mar 05 - Mar 13, 2029", status: "Planning", budget: "Ksh 310,000" },
    { name: "Mauritius Beach Escape", date: "Mar 19 - Mar 27, 2029", status: "Completed", budget: "Ksh 350,000" },
    { name: "Rwanda Lakes & Hills", date: "Apr 03 - Apr 11, 2029", status: "Upcoming", budget: "Ksh 255,000" },
    { name: "Oman Desert & Coast", date: "Apr 17 - Apr 25, 2029", status: "Planning", budget: "Ksh 345,000" },
    { name: "Sicily Food & History", date: "May 03 - May 11, 2029", status: "Completed", budget: "Ksh 275,000" },
    { name: "Tenerife Volcano Escape", date: "May 18 - May 26, 2029", status: "Upcoming", budget: "Ksh 285,000" },
    { name: "Great Ocean Road Drive", date: "Jun 01 - Jun 09, 2029", status: "Planning", budget: "Ksh 360,000" },
    { name: "Namibia Dunes & Desert", date: "Jun 16 - Jun 24, 2029", status: "Completed", budget: "Ksh 395,000" },
    { name: "Copenhagen City Weekend", date: "Jul 01 - Jul 06, 2029", status: "Upcoming", budget: "Ksh 240,000" },
    { name: "Chilean Lakes District", date: "Jul 20 - Jul 28, 2029", status: "Planning", budget: "Ksh 365,000" },
    { name: "Quebec Winter Carnival", date: "Aug 04 - Aug 12, 2029", status: "Completed", budget: "Ksh 320,000" },
    { name: "Helsinki & Tallinn Hop", date: "Aug 18 - Aug 26, 2029", status: "Upcoming", budget: "Ksh 380,000" },
    { name: "Cyprus Beach Retreat", date: "Sep 01 - Sep 09, 2029", status: "Planning", budget: "Ksh 250,000" },
    { name: "Patagonia Lakes & Glaciers", date: "Sep 15 - Sep 23, 2029", status: "Completed", budget: "Ksh 410,000" },
    { name: "Bali Yoga & Wellness", date: "Oct 01 - Oct 09, 2029", status: "Upcoming", budget: "Ksh 230,000" },
    { name: "Galápagos Eco Cruise", date: "Oct 20 - Oct 28, 2029", status: "Planning", budget: "Ksh 450,000" },
    { name: "Dubai & Abu Dhabi Weekender", date: "Nov 03 - Nov 10, 2029", status: "Completed", budget: "Ksh 330,000" },
    { name: "Kenya Rift Valley Escape", date: "Nov 17 - Nov 24, 2029", status: "Upcoming", budget: "Ksh 260,000" },
    { name: "French Riviera Escape", date: "Dec 01 - Dec 08, 2029", status: "Planning", budget: "Ksh 340,000" },
    { name: "Tokyo Winter Illuminations", date: "Dec 15 - Dec 22, 2029", status: "Completed", budget: "Ksh 305,000" },
    { name: "Mekong Delta Homestay", date: "Jan 05 - Jan 13, 2030", status: "Upcoming", budget: "Ksh 215,000" },
    { name: "Lofoten Islands Retreat", date: "Jan 19 - Jan 27, 2030", status: "Planning", budget: "Ksh 385,000" },
    { name: "Amalfi Coastal Hiking", date: "Feb 02 - Feb 10, 2030", status: "Completed", budget: "Ksh 275,000" },
    { name: "Swiss Glacier Express", date: "Feb 16 - Feb 24, 2030", status: "Upcoming", budget: "Ksh 365,000" },
    { name: "Tokyo Cherry Blossom Week", date: "Mar 02 - Mar 10, 2030", status: "Planning", budget: "Ksh 295,000" },
    { name: "Croatian Islands Sailing", date: "Mar 16 - Mar 24, 2030", status: "Completed", budget: "Ksh 345,000" },
    { name: "Baltic Christmas Cruise", date: "Apr 01 - Apr 08, 2030", status: "Upcoming", budget: "Ksh 255,000" },
    { name: "New England Fall Colors", date: "Apr 15 - Apr 23, 2030", status: "Planning", budget: "Ksh 305,000" },
    { name: "Santorini & Mykonos Duo", date: "May 01 - May 09, 2030", status: "Completed", budget: "Ksh 335,000" },
    { name: "Istanbul City Break", date: "May 18 - May 26, 2030", status: "Upcoming", budget: "Ksh 315,000" },
    { name: "Costa Rica Adventure Circuit", date: "Jun 01 - Jun 09, 2030", status: "Planning", budget: "Ksh 390,000" },
    { name: "Tanzania Coast Escape", date: "Jun 15 - Jun 23, 2030", status: "Completed", budget: "Ksh 360,000" },
]

const Page = () => {
    const [visibleCount, setVisibleCount] = useState(4)
    const arrayOfFour = trips.slice(0, visibleCount)

    return (
        <div className="p-8 mx-auto max-w-5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-2xl font-medium text-(--text-primary) tracking-tight">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-(--text-secondary) max-w-md leading-relaxed">
                        Overview of your current travel plans, budgets, and upcoming adventures.
                    </p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-(--bg-dark) hover:bg-(--bg-dark-subtle) text-white py-2.5 px-5 transition-all shadow-sm font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    <span>New Trip</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-(--surface) p-6 rounded-md border border-(--border-subtle)">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider mb-4">
                            Total Trips
                        </label>
                        <div className="mt-auto">
                            <span className="text-3xl font-light text-(--text-primary)">{trips.length.toString().padStart(2, "0")}</span>
                            <span className="text-xs text-(--text-secondary) ml-2">Lifetime</span>
                        </div>
                    </div>
                </div>

                <div className="bg-(--surface) p-6 rounded-md border border-(--border-subtle)">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider mb-4">
                            Next Adventure
                        </label>
                        <div className="mt-auto">
                            <span className="text-xl font-medium text-(--text-primary) block truncate">Maasai Mara, Kenya</span>
                            <span className="text-xs text-(--text-secondary)">In 12 days</span>
                        </div>
                    </div>
                </div>

                <div className="bg-(--surface) p-6 rounded-md border border-(--border-subtle)">
                    <div className="flex flex-col h-full">
                        <label className="text-xs font-medium text-(--text-secondary) uppercase tracking-wider mb-4">
                            Active Budget
                        </label>
                        <div className="mt-auto">
                            <span className="text-3xl font-light text-(--text-primary)">245,000</span>
                            <span className="text-xs text-(--text-secondary) ml-2">Ksh</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity List */}
            <div>
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-(--border-subtle)">
                    <h2 className="text-sm font-medium text-(--text-primary) uppercase tracking-wider">
                        Recent Trips
                    </h2>
                    <button
                        className="text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                        onClick={() => setVisibleCount(prev => prev + 4)}
                    >
                        {visibleCount >= trips.length ? "" : "View More"}
                    </button>
                </div>

                <div className="space-y-1">
                    {arrayOfFour.map((trip, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-md hover:bg-(--surface) transition-colors border border-transparent hover:border-(--border-subtle) cursor-pointer"
                        >
                            <div className="mb-2 sm:mb-0">
                                <h3 className="text-sm font-medium text-(--text-primary)">{trip.name}</h3>
                                <p className="text-xs text-(--text-secondary) mt-0.5">{trip.date}</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <span className="block text-xs font-medium text-(--text-primary)">{trip.budget}</span>
                                    <span className="block text-[10px] text-(--text-muted) uppercase tracking-wide">{trip.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty state placeholder if needed */}
                    {/* <div className="text-center py-12 text-sm text-zinc-400 font-light">
                        No trips found. Start by creating a new one.
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Page
