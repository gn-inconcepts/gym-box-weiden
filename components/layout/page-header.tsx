"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    image: string;
    logo?: string;
}

export function PageHeader({ title, subtitle, image, logo }: PageHeaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section ref={containerRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background Image Parallax */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-black/40 z-10" />
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
                {logo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 flex justify-center"
                    >
                        <img src={logo} alt={title} className="h-16 md:h-20 w-auto drop-shadow-lg" />
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 drop-shadow-xl text-white"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
