"use client";

import { motion } from "framer-motion";

export function DisciplinesLevels() {
    return (
        <section className="py-12 md:py-24 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Left: Disciplines */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-1 bg-brand-green"></span>
                        <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Disziplinen</span>
                    </div>
                    <h2 className="font-display text-4xl mb-8">Vielfalt im <span className="text-brand-green">Training</span></h2>

                    <div className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
                        {["Cross Athletics", "Calisthenics", "Mobility", "Yoga", "Kindertraining", "Seniorentraining", "Workshops", "Personal Training"].map((tag) => (
                            <span key={tag} className="px-5 py-3 rounded-lg bg-brand-dark border border-brand-white/5 text-lg hover:border-brand-green/30 transition-colors cursor-default text-brand-gray-light">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="bg-brand-dark border border-brand-white/5 p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="font-display text-9xl font-bold">4-10</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-4 relative z-10">
                            <span className="text-5xl font-bold text-brand-green">4–10</span>
                            <span className="text-brand-gray font-medium">Teilnehmer max.</span>
                        </div>
                        <p className="text-brand-gray-light leading-relaxed relative z-10">
                            Small Group Personaltraining — qualifizierte Trainer passen jede Übung individuell an. Anfänger trainieren neben Fortgeschrittenen, Coaches modifizieren Bewegungen, Gewichte und Wiederholungen.
                        </p>
                    </div>
                </div>

                {/* Right: Levels */}
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-1 bg-brand-green"></span>
                        <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Trainingslevel</span>
                    </div>
                    <h2 className="font-display text-4xl mb-8">Für <span className="text-brand-green">jedes</span> Niveau</h2>
                    <p className="text-brand-gray-light mb-10 leading-relaxed">
                        Wir trennen bewusst verschiedene Leistungsniveaus. Qualität leidet unter ständigem Wettkampf — individuelle Ziele variieren. Aufklärung ist wichtig, Pauschalaussagen sind fehl am Platz.
                    </p>

                    <div className="space-y-6">
                        {[
                            { name: "Gesundheit", desc: "Einsteiger & Gesundheitsbewusste", width: "33%" },
                            { name: "Ambitioniert", desc: "Engagierte Hobbysportler", width: "66%" },
                            { name: "Leistung", desc: "Wettkampf & Performance", width: "100%" },
                        ].map((level) => (
                            <div key={level.name}>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-bold text-lg">{level.name}</span>
                                    <span className="text-sm text-brand-gray">{level.desc}</span>
                                </div>
                                <div className="h-2 bg-brand-dark rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: level.width }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="h-full bg-brand-green"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-12 text-center text-sm font-medium text-brand-gray-light">
                        <div><span className="block text-2xl mb-1">💪</span>Kraft</div>
                        <div><span className="block text-2xl mb-1">🧘</span>Stabilität</div>
                        <div><span className="block text-2xl mb-1">🤸</span>Flexibilität</div>
                        <div><span className="block text-2xl mb-1">🏃</span>Ausdauer</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
