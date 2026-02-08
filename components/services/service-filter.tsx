"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Apple, Brain, Dumbbell, HeartPulse, Search, User, Users } from "lucide-react";

interface Service {
    name: string;
    desc: string;
    member: string;
    nonMember: string;
    cat: string;
    icon: any;
}

const services: Service[] = [
    {
        name: 'Körperanalyse',
        desc: 'Körperzusammensetzungsanalyse mittels Abmessungen, BIA und Software. Grundlage für jede Trainingsplanung.',
        member: '€10',
        nonMember: '€30',
        cat: 'analyse',
        icon: Activity
    },
    {
        name: 'Trainingsplanung',
        desc: '12-Wochen personalisierter Trainingsplan mit Orientierung, Ausgangscheck und Chipkarte.',
        member: '€30',
        nonMember: '€149',
        cat: 'training',
        icon: Dumbbell
    },
    {
        name: 'Herzfrequenzbestimmung',
        desc: 'Fitness Vitaltest durch Vitalmonitor. EKG-Analyse zur Bestimmung deiner Trainingsherzfrequenz inkl. 8-Wochen Ausdauertrainingsplanung.',
        member: '€40',
        nonMember: '€70',
        cat: 'analyse',
        icon: HeartPulse
    },
    {
        name: 'Ernährungscoaching',
        desc: 'Einstündige Beratung zu Kalorienverbrauch und Ernährungszusammensetzung. Langfristige Umstellung statt Crash-Diät.',
        member: '€75',
        nonMember: '€149',
        cat: 'coaching',
        icon: Apple
    },
    {
        name: 'FMS Test (Functional Movement Screen)',
        desc: 'Physiotherapeutische Beratung plus individuelle Übungen für optimale Bewegungsqualität.',
        member: '€75',
        nonMember: '€90',
        cat: 'analyse',
        icon: Activity
    },
    {
        name: 'KCAL-Bedarfsrechnung',
        desc: 'Medizingeräte-Ausleihe (mind. 4 Tage tragen) zur exakten Kalorienbedarfsermittlung inkl. Software-Analyse.',
        member: '€75',
        nonMember: '€120',
        cat: 'analyse',
        icon: Activity
    },
    {
        name: 'Resilienz Coaching',
        desc: 'Resilienz-Coaching zur Verbesserung der Widerstandsfähigkeit inkl. Hilfestellung zur Zielerreichung.',
        member: '€75',
        nonMember: '€149',
        cat: 'coaching',
        icon: Brain
    },
    {
        name: 'Physiotherapie',
        desc: 'Empfohlen bei Schmerzen und Verletzungen. Kommunikation zwischen Physiotherapeut und sportlichem Reha-Trainer.',
        member: '€75',
        nonMember: '€75',
        cat: 'therapie',
        icon: User
    },
    {
        name: 'Personal Training',
        desc: 'Individuelles Coaching mit zertifizierten Trainern. Neuer Plan nach je 12 Einheiten.',
        member: '€40 / Einheit',
        nonMember: '€90 / Einheit',
        cat: 'training',
        icon: Dumbbell
    },
    {
        name: 'Kindertraining',
        desc: 'Maßgeschneidertes, lustiges und abwechslungsreiches Programm für Kinder von 7–10 Jahren.',
        member: '€100 / 10er Block',
        nonMember: '€100 / 10er Block',
        cat: 'training',
        icon: Users
    },
    {
        name: 'Hautfaltenmessung',
        desc: 'Körperfettanteil-Bestimmung mittels Harpenden-Caliper inkl. Lifestyle-Tipps.',
        member: '€25',
        nonMember: '€50',
        cat: 'analyse',
        icon: Search
    },
    {
        name: 'Schwangerschaftstraining',
        desc: 'Spezialisierte Trainingsplanung während der Schwangerschaft. Trainerin mit dedizierter Ausbildung.',
        member: '€50',
        nonMember: '€70',
        cat: 'therapie',
        icon: User
    },
    {
        name: 'Taping',
        desc: 'Therapeutisches Taping durch ROCKDOCS-Spezialisten in Koordination mit Physiotherapeut.',
        member: '€19,90',
        nonMember: 'nach Verbrauch',
        cat: 'therapie',
        icon: Activity
    },
    {
        name: 'Firmen-Fitness',
        desc: 'Gesunde Mitarbeiter*innen sind zufriedene und produktive Mitarbeiter*innen. Kostenloses Beratungsgespräch.',
        member: 'Auf Anfrage',
        nonMember: 'Auf Anfrage',
        cat: 'coaching',
        icon: Users
    },
];

const categories = [
    { id: 'all', label: 'Alle' },
    { id: 'analyse', label: 'Analyse & Diagnostik' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'training', label: 'Training' },
    { id: 'therapie', label: 'Therapie & Spezial' },
];

export function ServiceFilter() {
    const [filter, setFilter] = useState('all');

    const filteredServices = filter === 'all'
        ? services
        : services.filter(s => s.cat === filter);

    return (
        <div>
            {/* Search / Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${filter === cat.id
                            ? 'bg-brand-green text-brand-black shadow-[0_0_20px_rgba(208,253,62,0.3)]'
                            : 'bg-brand-dark/50 border border-brand-white/10 text-brand-gray hover:border-brand-green/50 hover:text-brand-white'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <AnimatePresence mode='popLayout'>
                    {filteredServices.map((service, i) => (
                        <motion.div
                            layout
                            key={service.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="bg-brand-dark border border-white/5 rounded-2xl p-6 md:p-8 hover:border-brand-green/30 transition-colors group"
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-brand-black flex items-center justify-center text-brand-green shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl mb-2 group-hover:text-brand-green transition-colors">{service.name}</h3>
                                        <p className="text-brand-gray-light text-sm leading-relaxed max-w-xl">{service.desc}</p>
                                    </div>
                                </div>

                                <div className="flex w-full md:w-auto gap-4 md:gap-8 mt-4 md:mt-0 bg-brand-black/30 p-4 rounded-xl">
                                    <div>
                                        <span className="block text-xs uppercase text-brand-gray font-bold mb-1">Mitglied</span>
                                        <span className="block text-brand-green font-bold">{service.member}</span>
                                    </div>
                                    <div className="w-px bg-white/10"></div>
                                    <div>
                                        <span className="block text-xs uppercase text-brand-gray font-bold mb-1">Nicht-Mitgl.</span>
                                        <span className="block text-brand-white font-bold">{service.nonMember}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
