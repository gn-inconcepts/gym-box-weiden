"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getIcon } from "@/lib/icons";
import { Service } from "@/types/sanity";

interface ServiceFilterProps {
    services: Service[];
}

const categories = [
    { id: 'all', label: 'Alle' },
    { id: 'analyse', label: 'Analyse & Diagnostik' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'training', label: 'Training' },
    { id: 'therapie', label: 'Therapie & Spezial' },
];

export function ServiceFilter({ services }: ServiceFilterProps) {
    const [filter, setFilter] = useState('all');

    const filteredServices = filter === 'all'
        ? services
        : services.filter(s => s.category === filter);

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
                    {filteredServices.map((service, i) => {
                        const Icon = getIcon(service.icon);
                        return (
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
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl mb-2 group-hover:text-brand-green transition-colors">{service.name}</h3>
                                            <p className="text-brand-gray-light text-sm leading-relaxed max-w-xl">{service.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex w-full md:w-auto gap-4 md:gap-8 mt-4 md:mt-0 bg-brand-black/30 p-4 rounded-xl">
                                        <div>
                                            <span className="block text-xs uppercase text-brand-gray font-bold mb-1">Mitglied</span>
                                            <span className="block text-brand-green font-bold">{service.priceMember}</span>
                                        </div>
                                        <div className="w-px bg-white/10"></div>
                                        <div>
                                            <span className="block text-xs uppercase text-brand-gray font-bold mb-1">Nicht-Mitgl.</span>
                                            <span className="block text-brand-white font-bold">{service.priceNonMember}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
