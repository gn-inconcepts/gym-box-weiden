"use client";

import { ArrowRight, Salad, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    {
        icon: Salad,
        title: "Ernährungs Coaching",
        text: "Ernährung ist unser erster Grundpfeiler in der Philosophie. Es gibt wenig mit dem man gerade am Anfang so viel erreichen kann wie mit einer langfristigen Ernährungsumstellung.",
        label: "COACHING"
    },
    {
        icon: Trophy,
        title: "FMS Test",
        text: "FMS Test „Functional Movement Screen\" und physiotherapeutische Beratung unterstützen dich bei der optimalen Ausführung deiner Übungen.",
        label: "FMS TEST"
    },
    {
        icon: Users,
        title: "Personaltraining",
        text: "Alle unsere Trainer sind zertifizierte und ausgebildete Trainer. Jeder von uns hat seine Spezialisierung und seine persönlichen Stärken. Wir unterstützen dich bei deinem Erfolg.",
        label: "TRAINING"
    }
];

export function ServicesShowcase() {
    return (
        <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-4xl md:text-5xl mb-6">Wir unterstützen dich mit unserem Wissen bei deinen Zielen</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-2xl bg-brand-black border border-brand-white/5 hover:border-brand-green/30 transition-all duration-300"
                        >
                            <div className="text-xs font-bold tracking-widest text-brand-gray mb-6 uppercase flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                                {service.label}
                            </div>

                            <h3 className="font-display text-2xl mb-4 text-brand-white group-hover:text-brand-green transition-colors">{service.title}</h3>
                            <p className="text-brand-gray-light leading-relaxed mb-8">
                                {service.text}
                            </p>

                            <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-brand-black transition-all duration-300">
                                <service.icon className="w-6 h-6" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/leistungen"
                        className="inline-flex items-center gap-2 border border-brand-white/20 px-8 py-3 rounded-full text-brand-white hover:bg-brand-green hover:text-brand-black transition-all duration-300"
                    >
                        Alle Leistungen ansehen
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
