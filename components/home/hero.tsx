"use client";

import { useEffect, useRef } from "react";
import { OptimizedVideo } from "@/components/ui/optimized-video";
import type { HomePageData } from "@/types/page-content";

export function Hero({ cms }: { cms?: HomePageData }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Parallax effect on scroll
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        function handleScroll() {
            if (!contentRef.current) return;
            const scrollY = window.scrollY;
            const y = Math.min(scrollY * 0.4, 200);
            contentRef.current.style.transform = `translateY(${y}px)`;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const ctaButtons = cms?.heroCta?.length ? cms.heroCta : [
        { text: "Jetzt Probetraining vereinbaren", href: "/kontakt", variant: "primary" as const },
        { text: "Mehr erfahren", href: "#services", variant: "secondary" as const },
    ];

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-brand-black/60 z-10" /> {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black/30 via-transparent to-brand-black z-10" />
                <OptimizedVideo
                    src={cms?.heroVideoUrl ?? "https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4"}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    playsInline={true}
                    lazy={false}
                    className="absolute inset-0"
                />
            </div>

            {/* Content */}
            <div
                ref={contentRef}
                className="relative z-20 text-center px-4 max-w-5xl mx-auto"
            >
                <div className="hero-badge flex items-center justify-center gap-2 mb-8">
                    <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium tracking-wider text-brand-gray-light">
                        {cms?.heroBadge ?? "EST. 2014 — WEIDEN AM SEE"}
                    </span>
                </div>

                <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
                    <span className="block overflow-hidden">
                        <span className="hero-line-1 block text-brand-white">
                            {cms?.heroHeadingLine1 ?? "DEINE GESUNDHEIT."}
                        </span>
                    </span>
                    <span className="block overflow-hidden text-brand-green">
                        <span className="hero-line-2 block">
                            {cms?.heroHeadingLine2 ?? "DEIN LEBEN."}
                        </span>
                    </span>
                </h1>

                <p className="hero-description text-lg md:text-xl text-brand-gray-light font-light max-w-2xl mx-auto leading-relaxed mb-10">
                    {cms?.heroDescription ?? "Über 500 m² für die Themen Bewegung, Ernährung, Regeneration und Reflexion und Gemeinschaft — Gym & CrossFit Box unter einem Dach."}
                </p>

                <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
                    {ctaButtons.map((cta, i) => (
                        <a
                            key={cta.href}
                            href={cta.href}
                            className={cta.variant === "primary" || (!cta.variant && i === 0)
                                ? "px-8 py-4 bg-brand-green text-brand-black font-bold rounded-full hover:bg-brand-white transition-colors"
                                : "px-8 py-4 border border-brand-white/20 text-brand-white font-bold rounded-full hover:bg-brand-white hover:text-brand-black transition-colors"
                            }
                        >
                            {cta.text}
                        </a>
                    ))}
                </div>
            </div>

            {/* Scroll Hint */}
            <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gray">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-brand-green to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
            </div>
        </section>
    );
}
