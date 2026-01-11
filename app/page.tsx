import Link from "next/link";
import Image from "next/image";

const Page = () => {
    return (
        <div className="min-h-screen bg-(--bg-page) text-(--text-primary) font-sans overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-(--surface-elevated)/80 backdrop-blur-md border-b border-(--border-super-subtle)">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-(--bg-dark) rounded-lg flex items-center justify-center">
                            <span className="text-(--text-on-dark) font-bold text-lg italic">S</span>
                        </div>
                        <span className="text-2xl font-medium text-(--text-primary) tracking-light">Samuel&#39;s</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors">
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="bg-(--bg-dark) text-(--text-on-dark) px-5 py-2 rounded-md text-sm font-medium hover:bg-(--bg-dark-subtle) transition-all active:scale-[0.98]"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-7xl font-light leading-tight tracking-tight mb-8 text-(--text-primary)">
                            Your Journey,
                            <br />
                            <span className="opacity-40 italic">Planned to Perfection.</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-(--text-secondary) max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                            The ultimate companion for explorers. Organize your trips by budget, dates, and preferences in one elegant interface.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto bg-(--bg-dark) text-(--text-on-dark) px-8 py-4 rounded-md text-lg font-medium hover:bg-(--bg-dark-subtle) transition-all shadow-lg shadow-black/5 active:scale-[0.98]"
                            >
                                Start planning today
                            </Link>
                            <Link
                                href="#features"
                                className="w-full sm:w-auto px-8 py-4 rounded-md text-lg font-medium text-(--text-primary) border border-(--border-subtle) hover:bg-(--surface-elevated) transition-all active:scale-[0.98]"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/5 border border-(--border-super-subtle)">
                            <Image
                                src="/hero.png"
                                alt="Travel Planning Illustration"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Overview */}
            <section id="features" className="py-24 px-6 bg-(--bg-super-subtle) border-t border-(--border-super-subtle)">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-medium tracking-tight mb-4 text-(--text-primary)">Effortless trip management</h2>
                        <p className="text-(--text-secondary) leading-relaxed">Everything you need to plan your next adventure without the stress of spreadsheets and scattered notes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-(--surface-elevated) p-8 rounded-2xl border border-(--border-subtle) hover:border-(--border-strong) transition-colors group">
                            <div className="w-12 h-12 bg-(--bg-subtle) rounded-xl flex items-center justify-center mb-6 group-hover:bg-(--bg-dark) group-hover:text-(--text-on-dark) transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-3 text-(--text-primary)">Smart Planning</h3>
                            <p className="text-sm text-(--text-secondary) leading-relaxed">
                                Organize your trips based on budget, dates, and personal preferences with our intuitive planning engine.
                            </p>
                        </div>

                        <div className="bg-(--surface-elevated) p-8 rounded-2xl border border-(--border-subtle) hover:border-(--border-strong) transition-colors group">
                            <div className="w-12 h-12 bg-(--bg-subtle) rounded-xl flex items-center justify-center mb-6 group-hover:bg-(--bg-dark) group-hover:text-(--text-on-dark) transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-3 text-(--text-primary)">Seamless Experience</h3>
                            <p className="text-sm text-(--text-secondary) leading-relaxed">
                                Manage all your itineraries in one elegant interface, accessible from any device wherever you are.
                            </p>
                        </div>

                        <div className="bg-(--surface-elevated) p-8 rounded-2xl border border-(--border-subtle) hover:border-(--border-strong) transition-colors group">
                            <div className="w-12 h-12 bg-(--bg-subtle) rounded-xl flex items-center justify-center mb-6 group-hover:bg-(--bg-dark) group-hover:text-(--text-on-dark) transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium mb-3 text-(--text-primary)">Personalized Trips</h3>
                            <p className="text-sm text-(--text-secondary) leading-relaxed">
                                Tailor every detail to your travel style. From flights to accommodations, keep everything in sync.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-(--border-super-subtle)">
                <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-3 items-center justify-between gap-6">
                    <div className="flex items-center justify-start gap-2">
                        <div className="w-8 h-8 bg-(--bg-dark) rounded flex items-center justify-center">
                            <span className="text-(--text-on-dark) font-bold text-xs italic">S</span>
                        </div>
                        <span className="text-lg font-medium tracking-wide text-(--text-primary)">Samuel&#39;s</span>
                    </div>
                    <div className="flex items-center justify-center gap-8 text-sm text-(--text-secondary)">
                        <a href="#" className="hover:text-(--text-primary) transition-colors">Terms</a>
                        <a href="#" className="hover:text-(--text-primary) transition-colors">Privacy</a>
                        <a href="#" className="hover:text-(--text-primary) transition-colors">Contact</a>
                    </div>
                    <p className="flex items-center text-(--text-muted) tracking-wider justify-end text-sm ">
                        © {new Date().getFullYear()}  SAMUEL&#39;S. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Page
