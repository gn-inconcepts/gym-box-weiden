"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    image: string;
    logo?: string;
}

export function PageHeader({ title, subtitle, image, logo }: PageHeaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const handleScroll = () => {
            const y = Math.min(window.scrollY * 0.4, 200);
            setOffsetY(y);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={containerRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background Image Parallax */}
            <div
                style={{ transform: `translateY(${offsetY}px)` }}
                className="absolute inset-0 z-0 will-change-transform"
            >
                <div className="absolute inset-0 bg-black/60 z-10 light:hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-black/40 z-10 light:hidden" />
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
                {logo && (
                    <div className="mb-8 flex justify-center animate-[heroFadeUp_0.8s_ease-out_forwards]">
                        <Image
                            src={logo}
                            alt={title}
                            width={200}
                            height={80}
                            className="h-16 md:h-20 w-auto drop-shadow-lg"
                            priority
                        />
                    </div>
                )}

                <h1
                    className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 drop-shadow-xl text-white animate-[heroFadeUp_0.8s_ease-out_forwards]"
                >
                    {title}
                </h1>

                {subtitle && (
                    <p
                        className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto animate-[heroFadeUp_0.8s_0.2s_ease-out_both]"
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
