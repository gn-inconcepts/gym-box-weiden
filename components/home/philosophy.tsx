"use client";

import { Apple, Brain, Dumbbell, Moon } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
    {
        title: "Bewegung",
        text: "Funktionelles Training, Kraftaufbau und Mobilität als Basis für einen gesunden Körper.",
        icon: Dumbbell,
        num: "01"
    },
    {
        title: "Ernährung",
        text: "Keine Diäten, sondern nachhaltige Umstellung. Treibstoff für deine Leistung.",
        icon: Apple,
        num: "02"
    },
    {
        title: "Regeneration",
        text: "Schlaf, aktive Erholung und Stressmanagement für optimale Anpassungsprozesse.",
        icon: Moon,
        num: "03"
    },
    {
        title: "Reflexion",
        text: "Mindset und mentale Stärke. Ziele definieren und Hindernisse überwinden.",
        icon: Brain,
        num: "04"
    }
];

export function Philosophy() {
    return (
        <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
            {/* Background Marquee */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none opacity-[0.02]">
                <div className="whitespace-nowrap font-display text-[15rem] leading-none animate-marquee text-white">
                    ATHLET DES LEBENS · ATHLET DES LEBENS · ATHLET DES LEBENS ·
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Header */}
                    <div className="lg:sticky lg:top-32">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-1 bg-brand-green"></span>
                            <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Unser Fundament</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mb-8">
                            Die 4 Säulen für<br /><span className="text-brand-green">deinen Erfolg</span>
                        </h2>
                        <p className="text-xl text-brand-gray-light font-light leading-relaxed max-w-md mb-12">
                            Ein ganzheitlicher Ansatz, der weit über das reine Training hinausgeht. Wir betrachten den Menschen als Einheit.
                        </p>
                        <a href="#philosophy-detail" className="hidden lg:inline-flex items-center gap-2 text-brand-white font-bold hover:text-brand-green transition-colors">
                            Mehr Details erfahren <div className="w-8 h-px bg-current"></div>
                        </a>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-brand-black border border-white/5 p-8 md:p-12 rounded-3xl hover:border-brand-green/30 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="font-display text-6xl font-bold">{pillar.num}</span>
                                </div>

                                <div className="w-16 h-16 rounded-2xl bg-brand-dark flex items-center justify-center text-brand-green mb-8 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-brand-black transition-all duration-500">
                                    <pillar.icon className="w-8 h-8" />
                                </div>

                                <h3 className="font-display text-3xl mb-4 group-hover:text-brand-green transition-colors">{pillar.title}</h3>
                                <p className="text-brand-gray-light leading-relaxed group-hover:text-brand-white transition-colors">
                                    {pillar.text}
                                </p>

                                {/* Decoration */}
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-3xl group-hover:bg-brand-green/10 transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
