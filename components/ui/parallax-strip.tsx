"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxStripProps {
    text: string;
}

export function ParallaxStrip({ text }: ParallaxStripProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div ref={containerRef} className="py-8 bg-brand-green overflow-hidden relative border-y border-brand-black">
            <motion.div
                style={{ x }}
                className="whitespace-nowrap flex gap-8 items-center"
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="font-display text-4xl text-brand-black tracking-wider font-bold">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
