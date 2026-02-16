"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function BrandCards() {
    const [hovered, setHovered] = useState<"gym" | "box" | null>(null);

    return (
        <section className="py-12 md:py-24 md:py-32 bg-brand-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-6 h-[800px] lg:h-[600px]">
                    {/* Gym Card */}
                    <Link
                        href="/gym"
                        className="relative rounded-3xl overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1"
                        style={{ flex: hovered === "box" ? "0.4" : hovered === "gym" ? "1.4" : "1" }}
                        onMouseEnter={() => setHovered("gym")}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-dark/50 to-transparent z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop"
                                alt="Gym"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <div className="absolute top-8 right-8 z-20 font-display text-8xl text-brand-white/5 group-hover:text-brand-white/10 transition-colors">01</div>

                        <div className="absolute bottom-0 left-0 p-10 md:p-14 z-20 w-full">
                            <img src="/images/Bernhard_2022_SW_300ppi.png" alt="Bernhard Trainiert" className="h-10 mb-6 drop-shadow-lg" />
                            <h2 className="font-display text-5xl md:text-6xl mb-4 group-hover:text-brand-green transition-colors">Das Gym</h2>
                            <p className="text-brand-gray-light text-lg mb-8 max-w-sm leading-relaxed opacity-0 lg:opacity-100 lg:group-hover:opacity-100 lg:h-0 lg:group-hover:h-auto lg:overflow-hidden transition-all duration-500">
                                Krafttraining, Ausdauer und individuelle Betreuung auf höchstem Niveau. Dein Körper ist dein Kapital.
                            </p>

                            <div className="inline-flex items-center gap-2 text-brand-green font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                                Zum Gym <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>

                    {/* Box Card */}
                    <Link
                        href="/box"
                        className="relative rounded-3xl overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1"
                        style={{ flex: hovered === "gym" ? "0.4" : hovered === "box" ? "1.4" : "1" }}
                        onMouseEnter={() => setHovered("box")}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-dark/50 to-transparent z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop"
                                alt="Box"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <div className="absolute top-8 right-8 z-20 font-display text-8xl text-white/5 group-hover:text-white/10 transition-colors">02</div>

                        <div className="absolute bottom-0 left-0 p-10 md:p-14 z-20 w-full">
                            <img src="/images/CF-LF_2022_SW_300ppi.png" alt="CrossFit Lakefront" className="h-10 mb-6 drop-shadow-lg" />
                            <h2 className="font-display text-5xl md:text-6xl mb-4 group-hover:text-brand-green transition-colors">The Box</h2>
                            <p className="text-brand-gray-light text-lg mb-8 max-w-sm leading-relaxed opacity-0 lg:opacity-100 lg:group-hover:opacity-100 lg:h-0 lg:group-hover:h-auto lg:overflow-hidden transition-all duration-500">
                                Community, funktionelles Training und constantly varied high intensity movement. Weak ends here.
                            </p>

                            <div className="inline-flex items-center gap-2 text-brand-green font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                                Zur Box <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
