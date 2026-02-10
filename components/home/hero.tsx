"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { OptimizedVideo } from "@/components/ui/optimized-video";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section ref={containerRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-brand-black/60 z-10" /> {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/30 via-transparent to-brand-black z-10" />
                <OptimizedVideo
                    src="https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4"
                    poster="/images/hero-poster.jpg"
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    lazy={false}
                    className="absolute inset-0"
                />
            </div>

            {/* Content */}
            <motion.div
                style={{ y }}
                className="relative z-20 text-center px-4 max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center gap-2 mb-8"
                >
                    <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium tracking-wider text-brand-gray-light">
                        EST. 2014 — WEIDEN AM SEE
                    </span>
                </motion.div>

                <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
                    <span className="block overflow-hidden">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="block text-brand-white"
                        >
                            DEINE GESUNDHEIT.
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden text-brand-green">
                        <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="block"
                        >
                            DEIN LEBEN.
                        </motion.span>
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-brand-gray-light font-light max-w-2xl mx-auto leading-relaxed mb-10"
                >
                    Über 500 m² für die Themen Bewegung, Ernährung, Regeneration und Reflexion und Gemeinschaft — Gym & CrossFit Box unter einem Dach.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href="/kontakt" className="px-8 py-4 bg-brand-green text-brand-black font-bold rounded-full hover:bg-brand-white transition-colors">
                        Jetzt Probetraining vereinbaren
                    </a>
                    <a href="#services" className="px-8 py-4 border border-brand-white/20 text-brand-white font-bold rounded-full hover:bg-brand-white hover:text-brand-black transition-colors">
                        Mehr erfahren
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gray">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-brand-green to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
            </motion.div>
        </section>
    );
}
