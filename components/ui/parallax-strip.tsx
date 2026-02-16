"use client";

import { useRef, useEffect } from "react";

interface ParallaxStripProps {
    text: string;
}

export function ParallaxStrip({ text }: ParallaxStripProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        function handleScroll() {
            if (!container || !inner) return;
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            // Progress from 0 (element entering bottom) to 1 (element exiting top)
            const progress = 1 - (rect.bottom / (viewportHeight + rect.height));
            const clampedProgress = Math.max(0, Math.min(1, progress));
            const x = clampedProgress * -100;
            inner.style.transform = `translateX(${x}px)`;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="py-8 bg-brand-green overflow-hidden relative border-y border-brand-black">
            <div
                ref={innerRef}
                className="whitespace-nowrap flex gap-8 items-center"
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="font-display text-4xl text-brand-black tracking-wider font-bold">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}
