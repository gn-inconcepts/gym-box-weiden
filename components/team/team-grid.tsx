"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trainer } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

interface TeamGridProps {
    trainers: Trainer[];
    fallbackTrainers: Trainer[]; // Used if CMS data is empty
}

export function TeamGrid({ trainers, fallbackTrainers }: TeamGridProps) {
    const [filter, setFilter] = useState<"all" | "gym" | "box">("all");

    // Use CMS data if available, otherwise fallback
    const displayTrainers = trainers.length > 0 ? trainers : fallbackTrainers;

    const filteredTrainers = filter === "all"
        ? displayTrainers
        : displayTrainers.filter(t => t.category === filter || t.category === "all");

    // Helper to get image URL (handles both Sanity image objects and string URLs from fallback)
    const getImageUrl = (image: any) => {
        if (typeof image === 'string') return image;
        return image ? urlFor(image).width(800).height(1067).url() : '';
    };

    return (
        <section className="py-12 md:py-24 bg-brand-dark min-h-screen">
            <div className="container mx-auto px-4">

                {/* Filter */}
                <div className="flex justify-center mb-16 gap-4">
                    {["all", "gym", "box"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${filter === f ? 'bg-brand-green text-brand-black shadow-[0_0_20px_rgba(150,193,31,0.4)]' : 'bg-brand-black border border-brand-white/10 text-brand-gray hover:text-brand-white'}`}
                        >
                            {f === "all" ? "Alle Coaches" : f === "gym" ? "Gym Team" : "Box Team"}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredTrainers.map((trainer, i) => (
                            <motion.div
                                key={trainer._id || trainer.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className="w-full lg:w-1/3 aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl group border border-brand-white/5">
                                    <img
                                        src={getImageUrl(trainer.image)}
                                        alt={trainer.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                <div className="w-full lg:w-2/3">
                                    <div className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-bold rounded-full mb-4">
                                        {trainer.role}
                                    </div>
                                    <h2 className="font-display text-5xl mb-2 text-brand-white">{trainer.name}</h2>
                                    <p className="text-brand-white font-medium mb-6 opacity-80">{trainer.specs}</p>

                                    <div className="space-y-4 mb-8">
                                        {/* Handle flexible bio content (Sanity Block or String Array) */}
                                        {Array.isArray(trainer.bio) && typeof trainer.bio[0] === 'string' ? (
                                            (trainer.bio as string[]).map((para, idx) => (
                                                <p key={idx} className="text-brand-gray-light text-lg leading-relaxed">{para}</p>
                                            ))
                                        ) : (
                                            // Simple block text fallback if needed, or render blocks properly
                                            // For this step, assuming simplified text or fallback
                                            <p className="text-brand-gray-light text-lg leading-relaxed">
                                                {/* If it's Portable Text, we'd use <PortableText /> but for now simplified */}
                                                Expertise in Fitness and Health.
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {trainer.tags && trainer.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-brand-black border border-white/10 rounded-lg text-sm text-brand-gray">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
