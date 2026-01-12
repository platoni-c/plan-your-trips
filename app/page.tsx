import Link from "next/link";
import { ArrowRight, Map, Wallet, Sparkles, Compass } from "lucide-react";

export default function Page() {
    return (
        <div className="min-h-screen bg-(--bg-page) text-(--text-primary) font-sans selection:bg-black selection:text-white overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-(--bg-page)/80 backdrop-blur-xl border-b border-(--border-super-subtle)">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center shadow-lg shadow-black/10">
                            <span className="text-white font-bold text-lg italic font-serif">S</span>
                        </div>
                        <span className="text-xl font-medium tracking-tight">Samuel&#39;s</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8">
                        <Link href="/login" className="text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors">
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="bg-black text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-black/5"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 sm:pt-48 sm:pb-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-linear-to-b from-zinc-100 to-transparent rounded-full blur-3xl -z-10 opacity-60" />

                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--surface-subtle) border border-(--border-subtle) text-xs font-medium text-(--text-secondary) uppercase tracking-widest mb-10 animate-fade-in-up">
                        <span>The new standard for travel planning</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tighter text-(--text-primary) mb-8 animate-fade-in-up delay-100">
                        Your Journey, <br className="hidden sm:block" />
                        <span className="font-serif italic opacity-90">Planned to Perfection.</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-(--text-secondary) max-w-2xl mx-auto mb-12 leading-relaxed font-light animate-fade-in-up delay-200">
                        Experience the ultimate companion for modern explorers. Define your budget, map your timeline and curate your adventures in one elegant interface.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-zinc-800 transition-all shadow-xl shadow-black/10 active:scale-[0.98] flex items-center justify-center gap-2 group"
                        >
                            <span>Start Planning Free</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="w-full sm:w-auto px-8 py-4 rounded-md text-lg font-medium text-(--text-primary) border border-(--border-subtle) bg-white/50 backdrop-blur-sm hover:bg-white hover:border-(--border-strong) transition-all active:scale-[0.98]"
                        >
                            Explore Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats / Proof (Optional divider) */}
            <div className="max-w-7xl mx-auto px-6 border-t border-(--border-super-subtle)" />

            {/* Features Grid */}
            <section className="py-32 px-6 bg-linear-to-b from-main to-(--bg-subtle)/30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 rounded-3xl bg-white border border-(--border-subtle) hover:border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                            <div className="w-14 h-14 bg-(--bg-subtle) rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                                <Wallet className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-medium mb-4 text-(--text-primary)">Budget Smart</h3>
                            <p className="text-(--text-secondary) leading-relaxed font-light">
                                Keep your finances in check with our intuitive budget tracker. Projected costs and actual expenses, visualized beautifully.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 rounded-3xl bg-white border border-(--border-subtle) hover:border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 delay-100">
                            <div className="w-14 h-14 bg-(--bg-subtle) rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                                <Map className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-medium mb-4 text-(--text-primary)">Visual Itineraries</h3>
                            <p className="text-(--text-secondary) leading-relaxed font-light">
                                See your trip come to life. Organize day-by-day plans without the clutter of spreadsheets or scattered notes.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 rounded-3xl bg-white border border-(--border-subtle) hover:border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 delay-200">
                            <div className="w-14 h-14 bg-(--bg-subtle) rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                                <Compass className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-medium mb-4 text-(--text-primary)">Seamless Sync</h3>
                            <p className="text-(--text-secondary) leading-relaxed font-light">
                                Access your plans from anywhere. Your journey stays synchronized across all your devices, ready when you are.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-(--border-super-subtle) bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                            <span className="text-white font-bold text-[10px] italic font-serif">S</span>
                        </div>
                        <span className="text-sm font-medium tracking-wide text-(--text-primary)">Samuel&#39;s</span>
                    </div>

                    <div className="flex items-center gap-8 text-sm text-(--text-secondary)">
                        <span className="opacity-50 cursor-not-allowed">Terms</span>
                        <span className="opacity-50 cursor-not-allowed">Privacy</span>
                        <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0&pp=ygUKcmlja3JvbGxlZA%3D%3D" target="blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">YouTube</a>
                    </div>

                    <p className="text-xs text-(--text-muted) tracking-wide">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
