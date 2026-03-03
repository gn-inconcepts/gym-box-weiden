"use client";

import { useState } from "react";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { Trainer } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

type FilterCategory = "all" | "gym" | "box";

interface TeamGridProps {
    trainers: Trainer[];
    fallbackTrainers: Trainer[]; // Used if CMS data is empty
}

export function TeamGrid({ trainers, fallbackTrainers }: TeamGridProps) {
    const [filter, setFilter] = useState<FilterCategory>("all");

    // Use CMS data if available, otherwise fallback
    const displayTrainers = trainers.length > 0 ? trainers : fallbackTrainers;

    const filteredTrainers = filter === "all"
        ? displayTrainers
        : displayTrainers.filter(t => t.category === filter || t.category === "all");

    // Helper to get image URL (handles both Sanity image objects and string URLs from fallback)
    const getImageUrl = (image: Trainer["image"]): string => {
        if (typeof image === 'string') return image;
        const result = image ? urlFor(image) : null;
        return result ? result.width(800).height(1067).url() : '';
    };

    return (
        <section className="py-12 md:py-24 bg-brand-dark min-h-screen">
            <div className="container mx-auto px-4">

                {/* Filter */}
                <div className="flex justify-center mb-16 gap-4">
                    {(["all", "gym", "box"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            aria-label={`Filter: ${f === "all" ? "Alle Coaches" : f === "gym" ? "Gym Team" : "Box Team"}`}
                            aria-pressed={filter === f}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${filter === f ? 'bg-brand-green text-brand-black shadow-[0_0_20px_rgba(150,193,31,0.4)]' : 'bg-brand-black border border-brand-white/10 text-brand-gray hover:text-brand-white'}`}
                        >
                            {f === "all" ? "Alle Coaches" : f === "gym" ? "Gym Team" : "Box Team"}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {filteredTrainers.map((trainer, i) => {
                        const imageUrl = getImageUrl(trainer.image);
                        return (
                            <div
                                key={trainer._id || trainer.name}
                                className={`flex flex-col lg:flex-row gap-12 items-center animate-[fadeInScale_0.4s_ease-out_forwards] ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className="w-full lg:w-1/3 aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl group border border-brand-white/5">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={trainer.name}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-brand-black flex items-center justify-center text-brand-gray">
                                            Kein Bild
                                        </div>
                                    )}
                                </div>
                                <div className="w-full lg:w-2/3">
                                    <div className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-bold rounded-full mb-4">
                                        {trainer.role}
                                    </div>
                                    <h2 className="font-display text-5xl mb-2 text-brand-white">{trainer.name}</h2>
                                    <p className="text-brand-white font-medium mb-6 opacity-80">{trainer.specs}</p>

                                    <div className="space-y-4 mb-8">
                                        {Array.isArray(trainer.bio) && trainer.bio.length > 0 ? (
                                            typeof trainer.bio[0] === 'string' ? (
                                                (trainer.bio as string[]).map((para, idx) => (
                                                    <p key={idx} className="text-brand-gray-light text-lg leading-relaxed">{para}</p>
                                                ))
                                            ) : (
                                                <div className="text-brand-gray-light text-lg leading-relaxed [&>p]:mb-4 last:[&>p]:mb-0">
                                                    <PortableText value={trainer.bio as any} />
                                                </div>
                                            )
                                        ) : null}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {trainer.tags && trainer.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-brand-black border border-white/10 rounded-lg text-sm text-brand-gray">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
