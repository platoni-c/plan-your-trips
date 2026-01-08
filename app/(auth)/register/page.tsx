import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-250 grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden border border-(--border-subtle)">
                {/* Left side / brand */}
                <div className="hidden md:flex flex-col justify-between bg-black text-white p-12 lg:p-16 relative overflow-hidden">
                    <div className="z-10">
                        <p className="text-xs font-medium tracking-[0.2em] uppercase opacity-70">
                            Plan My Trip
                        </p>
                        <h1 className="mt-6 text-4xl font-light leading-tight tracking-tight">
                            Start your journey
                            <br />
                            <span className="opacity-50">with us today.</span>
                        </h1>
                    </div>

                    <div className="z-10 mt-12">
                        <p className="text-sm font-light leading-relaxed opacity-60 max-w-xs">
                            &#34;Every journey begins with a single step. Join us and discover a world of possibilities.&#34;
                        </p>
                    </div>
                </div>

                {/* Right side / form */}
                <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
                    <div className="w-full max-w-sm mx-auto">
                        <div className="mb-10">
                            <h2 className="text-2xl font-medium text-zinc-900 tracking-tight">
                                Create account
                            </h2>
                            <p className="mt-2 text-sm text-zinc-500">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-black transition-all"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-5">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-medium text-zinc-500 uppercase tracking-wider"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 bg-zinc-50 px-4 py-3.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 focus:outline-none"
                                    placeholder="Taylor Traveler"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-zinc-500 uppercase tracking-wider"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-md border-0 bg-zinc-50 px-4 py-3.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 focus:outline-none"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium text-zinc-500 uppercase tracking-wider"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 bg-zinc-50 px-4 py-3.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 focus:outline-none"
                                    placeholder="Create a secure password"
                                />
                            </div>

                            <div className="py-2">
                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    By creating an account, you agree to our <a href="#" className="underline text-zinc-700 hover:text-black">Terms of Service</a> and <a href="#" className="underline text-zinc-700 hover:text-black">Privacy Policy</a>.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md bg-black px-4 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98]"
                            >
                                Create account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}