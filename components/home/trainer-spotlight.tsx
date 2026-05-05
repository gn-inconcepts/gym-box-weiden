"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Trainer {
    name: string;
    role: string;
    image: string;
    bio: string;
    specialties: string[];
}

interface TrainerSpotlightProps {
    /** Single trainer to display (existing usage). */
    trainer?: Trainer;
    /** When provided, a random trainer from the array is picked on each mount. */
    trainers?: Trainer[];
}

export function TrainerSpotlight({ trainer, trainers }: TrainerSpotlightProps) {
    // If an array is provided, pick a random one client-side after mount.
    // Initial render uses the first entry to keep server/client markup in sync.
    const initial = trainer ?? trainers?.[0];
    const [active, setActive] = useState<Trainer | undefined>(initial);

    useEffect(() => {
        if (trainers && trainers.length > 0) {
            const idx = Math.floor(Math.random() * trainers.length);
            setActive(trainers[idx]);
        }
    }, [trainers]);

    if (!active) return null;
    return (
        <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-green/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                        <Image
                            src={active.image}
                            alt={active.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-1 bg-brand-green"></span>
                            <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Dein Coach</span>
                        </div>

                        <h2 className="font-display text-5xl md:text-6xl mb-2">{active.name}</h2>
                        <p className="text-brand-green text-xl font-bold mb-6">{active.role}</p>

                        <p className="text-brand-gray-light text-lg leading-relaxed mb-8">
                            {active.bio}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-10">
                            {active.specialties.map((spec) => (
                                <span key={spec} className="px-4 py-2 rounded-full border border-white/10 text-sm text-brand-gray bg-brand-black/50">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        <Link
                            href="/team"
                            className="inline-flex items-center gap-2 text-brand-white font-bold hover:text-brand-green transition-colors"
                        >
                            Das ganze Team kennenlernen
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
