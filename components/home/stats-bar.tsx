"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "1000", unit: "m²", label: "Trainingsfläche" },
    { value: "2016", unit: "", label: "Gegründet" },
    { value: "14", unit: "+", label: "Leistungen" },
    { value: "7", unit: "+", label: "Zertifizierungen" },
    { value: "10", unit: "+", label: "Kursangebote" },
];

export function StatsBar() {
    return (
        <section className="py-12 border-y border-white/5 bg-brand-black">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="text-center relative group">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="font-display text-4xl md:text-5xl text-brand-white mb-2 group-hover:text-brand-green transition-colors duration-300">
                                    {stat.value}<span className="text-brand-green text-3xl align-top">{stat.unit}</span>
                                </div>
                                <div className="text-brand-gray-light text-sm uppercase tracking-widest font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                            {i !== stats.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
