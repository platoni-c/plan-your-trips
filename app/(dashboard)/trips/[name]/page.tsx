"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Wallet, Clock, Plus, Trash2, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useTrips } from '@/app/context/TripContext';
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import posthog from "posthog-js";

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string;
}

interface ItineraryActivity {
    id: number;
    time: string;
    title: string;
    description: string;
    location: string;
}

interface ItineraryDay {
    id: number;
    day_number: number;
    date: string;
    title: string;
    notes: string;
    activities: ItineraryActivity[];
}

const Page = () => {
    const { trips, loading } = useTrips();
    const params = useParams();
    const tripId = params.name as string;

    // Expenses state
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'General' });
    const [isAddingExpense, setIsAddingExpense] = useState(false);

    // Itinerary state
    const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);
    const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
    const [newActivity, setNewActivity] = useState<{ [key: number]: { time: string; title: string; description: string; location: string } }>({});
    const [isAddingActivity, setIsAddingActivity] = useState<number | null>(null);

    const trip = trips.find(t => t.id.toString() === tripId);

    // Fetch expenses
    useEffect(() => {
        if (!tripId) return;
        const fetchExpenses = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('expenses')
                .select('*')
                .eq('trip_id', tripId)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setExpenses(data);
            }
        };
        fetchExpenses();
    }, [tripId]);

    // Fetch itinerary
    useEffect(() => {
        if (!tripId) return;
        const fetchItinerary = async () => {
            const supabase = createClient();

            // Fetch days
            const { data: daysData, error: daysError } = await supabase
                .from('itinerary_days')
                .select('*')
                .eq('trip_id', tripId)
                .order('day_number', { ascending: true });

            if (daysError || !daysData) return;

            // Fetch activities for all days
            const daysWithActivities = await Promise.all(
                daysData.map(async (day) => {
                    const { data: activitiesData } = await supabase
                        .from('itinerary_activities')
                        .select('*')
                        .eq('day_id', day.id)
                        .order('sort_order', { ascending: true });

                    return {
                        ...day,
                        activities: activitiesData || []
                    };
                })
            );

            setItineraryDays(daysWithActivities);
        };
        fetchItinerary();
    }, [tripId]);

    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAddingExpense(true);
        const supabase = createClient();

        const amount = parseFloat(newExpense.amount);
        if (isNaN(amount)) {
            setIsAddingExpense(false);
            return;
        }

        const { data, error } = await supabase
            .from('expenses')
            .insert([{
                trip_id: tripId,
                description: newExpense.description,
                amount: amount,
                category: newExpense.category
            }])
            .select()
            .single();

        if (error) {
            console.error(error);
            alert('Failed to add expense');
            posthog.capture('expense_add_failed', {
                trip_id: tripId,
                error_message: error.message,
            })
        } else if (data) {
            // Capture expense added event
            posthog.capture('expense_added', {
                trip_id: tripId,
                amount: amount,
                category: newExpense.category,
                description_length: newExpense.description.length,
            })
            setExpenses([data, ...expenses]);
            setNewExpense({ description: '', amount: '', category: 'General' });
        }
        setIsAddingExpense(false);
    };

    const handleDeleteExpense = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        const supabase = createClient();
        const { error } = await supabase.from('expenses').delete().eq('id', id);

        if (!error) {
            // Capture expense deleted event
            posthog.capture('expense_deleted', {
                trip_id: tripId,
                expense_id: id,
            })
            setExpenses(expenses.filter(e => e.id !== id));
        }
    };

    const handleAddDay = async () => {
        const supabase = createClient();
        const nextDayNumber = itineraryDays.length + 1;

        const { data, error } = await supabase
            .from('itinerary_days')
            .insert([{
                trip_id: tripId,
                day_number: nextDayNumber,
                title: `Day ${nextDayNumber}`
            }])
            .select()
            .single();

        if (!error && data) {
            // Capture itinerary day added event
            posthog.capture('itinerary_day_added', {
                trip_id: tripId,
                day_number: nextDayNumber,
            })
            setItineraryDays([...itineraryDays, { ...data, activities: [] }]);
            setExpandedDays(new Set([...expandedDays, data.id]));
        }
    };

    const handleDeleteDay = async (dayId: number) => {
        if (!confirm('Delete this day and all its activities?')) return;
        const supabase = createClient();
        const { error } = await supabase.from('itinerary_days').delete().eq('id', dayId);

        if (!error) {
            setItineraryDays(itineraryDays.filter(d => d.id !== dayId));
        }
    };

    const handleAddActivity = async (dayId: number) => {
        const activityData = newActivity[dayId];
        if (!activityData?.title) return;

        const supabase = createClient();
        const { data, error } = await supabase
            .from('itinerary_activities')
            .insert([{
                day_id: dayId,
                time: activityData.time,
                title: activityData.title,
                description: activityData.description,
                location: activityData.location,
                sort_order: itineraryDays.find(d => d.id === dayId)?.activities.length || 0
            }])
            .select()
            .single();

        if (!error && data) {
            // Capture activity added event
            posthog.capture('itinerary_activity_added', {
                trip_id: tripId,
                day_id: dayId,
                has_time: !!activityData.time,
                has_location: !!activityData.location,
            })
            setItineraryDays(itineraryDays.map(day =>
                day.id === dayId
                    ? { ...day, activities: [...day.activities, data] }
                    : day
            ));
            setNewActivity({ ...newActivity, [dayId]: { time: '', title: '', description: '', location: '' } });
            setIsAddingActivity(null);
        }
    };

    const handleDeleteActivity = async (dayId: number, activityId: number) => {
        if (!confirm('Delete this activity?')) return;
        const supabase = createClient();
        const { error } = await supabase.from('itinerary_activities').delete().eq('id', activityId);

        if (!error) {
            setItineraryDays(itineraryDays.map(day =>
                day.id === dayId
                    ? { ...day, activities: day.activities.filter(a => a.id !== activityId) }
                    : day
            ));
        }
    };

    const toggleDay = (dayId: number) => {
        const newExpanded = new Set(expandedDays);
        if (newExpanded.has(dayId)) {
            newExpanded.delete(dayId);
        } else {
            newExpanded.add(dayId);
        }
        setExpandedDays(newExpanded);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-(--bg-page)">
            <div className="text-sm text-(--text-muted) animate-pulse">Loading adventure...</div>
        </div>
    );

    if (!trip) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-(--bg-page) text-center p-6">
            <h3 className="text-lg font-medium text-(--text-primary) mb-2">Trip not found</h3>
            <Link href="/trips" className="text-sm text-(--text-secondary) hover:text-(--text-primary) underline underline-offset-4">
                Return to Trips
            </Link>
        </div>
    );

    const calculateDuration = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return '—';
        const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    };

    // Budget Calculations
    const budget = parseFloat(trip.budget || '0');
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const progress = budget > 0 ? (totalSpent / budget) * 100 : 0;

    let progressColor = 'bg-black';
    if (progress > 100) progressColor = 'bg-red-500';
    else if (progress > 85) progressColor = 'bg-amber-500';

    return (
        <div className="min-h-screen bg-(--bg-page) font-sans pb-20">
            {/* Header / Nav */}
            <div className="sticky top-0 z-10 bg-(--bg-page)/80 backdrop-blur-md border-b border-(--border-subtle)">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/trips"
                        className="group flex items-center gap-2 text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        Back to Trips
                    </Link>
                    <div className="text-xs font-medium text-(--text-muted) uppercase tracking-wider">
                        {trip.status}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Hero section */}
                <div className="mb-16">
                    <div className="flex flex-col gap-4 mb-8">
                        <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200/50">
                            <MapPin size={12} />
                            {trip.destination.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </span>
                        <h1 className="text-5xl md:text-6xl font-normal text-(--text-primary) tracking-tight">
                            {trip.name}
                        </h1>
                    </div>

                    {/* Details Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 pt-6 border-t border-(--border-subtle)">
                        <div className="flex items-center gap-3 text-(--text-secondary)">
                            <Calendar className="w-4 h-4 text-(--text-muted)" />
                            <span className="text-sm font-medium text-(--text-primary)">
                                {trip.start_date || "Not set"} <span className="text-(--text-muted) mx-1">–</span> {trip.end_date || "Not set"}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 text-(--text-secondary)">
                            <Clock className="w-4 h-4 text-(--text-muted)" />
                            <span className="text-sm font-medium text-(--text-primary)">
                                {calculateDuration(trip.start_date, trip.end_date)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 text-(--text-secondary)">
                            <Wallet className="w-4 h-4 text-(--text-muted)" />
                            <span className="text-sm font-medium text-(--text-primary)">
                                {trip.budget ? `Ksh ${parseInt(trip.budget).toLocaleString()}` : "Not set"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Itinerary */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">Day-by-Day Itinerary</h2>
                            <button
                                onClick={handleAddDay}
                                className="flex items-center gap-2 text-sm font-medium text-(--text-primary) hover:text-black transition-colors"
                            >
                                <Plus size={16} />
                                Add Day
                            </button>
                        </div>

                        {itineraryDays.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-(--border-subtle) rounded-xl bg-(--bg-subtle)/20">
                                <Calendar className="w-10 h-10 text-(--text-muted)/50 mx-auto mb-3" />
                                <p className="text-sm text-(--text-secondary) mb-4">No itinerary yet</p>
                                <button
                                    onClick={handleAddDay}
                                    className="text-sm font-medium text-black underline underline-offset-4 hover:text-zinc-600 transition-colors"
                                >
                                    Create your first day
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {itineraryDays.map((day) => (
                                    <div key={day.id} className="bg-white rounded-xl border border-(--border-subtle) overflow-hidden shadow-sm">
                                        {/* Day Header */}
                                        <div
                                            className="p-5 flex items-center justify-between cursor-pointer hover:bg-(--bg-subtle)/30 transition-colors"
                                            onClick={() => toggleDay(day.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                                                    {day.day_number}
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-medium text-(--text-primary)">{day.title}</h3>
                                                    <p className="text-xs text-(--text-secondary)">{day.activities.length} activities</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteDay(day.id);
                                                    }}
                                                    className="p-2 text-(--text-muted) hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                {expandedDays.has(day.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            </div>
                                        </div>

                                        {/* Day Content */}
                                        {expandedDays.has(day.id) && (
                                            <div className="border-t border-(--border-subtle) p-5 space-y-4">
                                                {/* Activities List */}
                                                {day.activities.map((activity) => (
                                                    <div key={activity.id} className="group flex gap-4 p-3 rounded-lg hover:bg-(--bg-subtle)/30 transition-colors">
                                                        <div className="shrink-0 w-20 text-xs font-medium text-(--text-secondary)">
                                                            {activity.time || '—'}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-sm font-medium text-(--text-primary) mb-1">{activity.title}</h4>
                                                            {activity.description && (
                                                                <p className="text-xs text-(--text-secondary) mb-1">{activity.description}</p>
                                                            )}
                                                            {activity.location && (
                                                                <p className="text-xs text-(--text-muted) flex items-center gap-1">
                                                                    <MapPin size={10} />
                                                                    {activity.location}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteActivity(day.id, activity.id)}
                                                            className="opacity-0 group-hover:opacity-100 p-2 text-(--text-muted) hover:text-red-500 transition-all"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                ))}

                                                {/* Add Activity Form */}
                                                {isAddingActivity === day.id ? (
                                                    <div className="space-y-3 pt-4 border-t border-(--border-subtle)">
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Time"
                                                                value={newActivity[day.id]?.time || ''}
                                                                onChange={(e) => setNewActivity({
                                                                    ...newActivity,
                                                                    [day.id]: { ...newActivity[day.id], time: e.target.value, title: newActivity[day.id]?.title || '', description: newActivity[day.id]?.description || '', location: newActivity[day.id]?.location || '' }
                                                                })}
                                                                className="text-xs border border-(--border-subtle) rounded-lg px-3 py-2 outline-none focus:border-black transition-colors"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Activity *"
                                                                value={newActivity[day.id]?.title || ''}
                                                                onChange={(e) => setNewActivity({
                                                                    ...newActivity,
                                                                    [day.id]: { ...newActivity[day.id], title: e.target.value, time: newActivity[day.id]?.time || '', description: newActivity[day.id]?.description || '', location: newActivity[day.id]?.location || '' }
                                                                })}
                                                                className="col-span-2 text-xs border border-(--border-subtle) rounded-lg px-3 py-2 outline-none focus:border-black transition-colors"
                                                            />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Location (optional)"
                                                            value={newActivity[day.id]?.location || ''}
                                                            onChange={(e) => setNewActivity({
                                                                ...newActivity,
                                                                [day.id]: { ...newActivity[day.id], location: e.target.value, time: newActivity[day.id]?.time || '', title: newActivity[day.id]?.title || '', description: newActivity[day.id]?.description || '' }
                                                            })}
                                                            className="w-full text-xs border border-(--border-subtle) rounded-lg px-3 py-2 outline-none focus:border-black transition-colors"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleAddActivity(day.id)}
                                                                className="flex-1 bg-black text-white rounded-lg px-4 py-2 text-xs font-medium hover:bg-zinc-800 transition-colors"
                                                            >
                                                                Add Activity
                                                            </button>
                                                            <button
                                                                onClick={() => setIsAddingActivity(null)}
                                                                className="px-4 py-2 text-xs text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setIsAddingActivity(day.id)}
                                                        className="w-full py-2 text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) border border-dashed border-(--border-subtle) rounded-lg hover:border-(--border-strong) transition-colors"
                                                    >
                                                        + Add Activity
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Budget & Expenses */}
                    <div className="space-y-8">
                        {/* Budget Tracker */}
                        <div className="bg-white rounded-2xl border border-(--border-subtle) p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">Budget Tracker</h2>
                                <TrendingUp className="w-5 h-5 text-(--text-muted)" />
                            </div>

                            {/* Budget Stats */}
                            <div className="mb-8">
                                <div className="flex items-baseline justify-between mb-4">
                                    <div>
                                        <p className="text-xs text-(--text-muted) uppercase tracking-wider mb-1">Total Spent</p>
                                        <p className="text-4xl font-medium text-(--text-primary)">Ksh {totalSpent.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-(--text-muted) uppercase tracking-wider mb-1">Budget</p>
                                        <p className="text-2xl font-medium text-(--text-secondary)">Ksh {budget.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-3">
                                    <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${progressColor} transition-all duration-500`}
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm font-semibold ${progress > 100 ? 'text-red-500' : progress > 85 ? 'text-amber-500' : 'text-black'}`}>
                                            {progress.toFixed(0)}% of budget used
                                        </span>
                                        <span className="text-sm text-(--text-secondary)">
                                            Ksh {(budget - totalSpent).toLocaleString()} remaining
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Add Expense Form */}
                            <form onSubmit={handleAddExpense} className="space-y-4 pt-6 border-t border-(--border-subtle)">
                                <p className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">Add New Expense</p>
                                <input
                                    type="text"
                                    placeholder="Description (e.g., Flight to Paris)"
                                    required
                                    value={newExpense.description}
                                    onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                                    className="w-full text-sm border border-(--border-subtle) rounded-lg px-4 py-3 bg-white outline-none focus:border-black transition-colors placeholder:text-(--text-muted)"
                                />
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <span className="absolute left-4 top-3.5 text-sm text-(--text-muted) font-medium">Ksh</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            required
                                            step="0.01"
                                            value={newExpense.amount}
                                            onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                                            className="w-full text-sm border border-(--border-subtle) rounded-lg px-4 py-3 pl-12 bg-white outline-none focus:border-black transition-colors"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isAddingExpense}
                                        className="bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Expenses List */}
                        {expenses.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary) mb-4">Recent Expenses</h3>
                                <div className="space-y-2">
                                    {expenses.map((expense) => (
                                        <div key={expense.id} className="group flex items-center justify-between p-4 rounded-xl bg-white border border-(--border-subtle) hover:border-(--border-strong) transition-all">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-(--text-primary) mb-0.5">{expense.description}</p>
                                                <p className="text-xs text-(--text-secondary)">{expense.date || 'Today'}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-base font-semibold text-(--text-primary)">Ksh {expense.amount.toLocaleString()}</span>
                                                <button
                                                    onClick={() => handleDeleteExpense(expense.id)}
                                                    className="opacity-0 group-hover:opacity-100 text-(--text-muted) hover:text-red-500 transition-all p-2 rounded-md hover:bg-red-50"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;