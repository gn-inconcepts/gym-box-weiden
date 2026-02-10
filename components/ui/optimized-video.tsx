"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedVideoProps {
    src: string;
    srcWebm?: string; // Optional WebM source for better Firefox support
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    controls?: boolean;
    lazy?: boolean;
}

export function OptimizedVideo({
    src,
    srcWebm,
    poster,
    className,
    autoPlay = false,
    loop = false,
    muted = true,
    playsInline = true,
    controls = false,
    lazy = true,
}: OptimizedVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(!lazy);

    useEffect(() => {
        if (!lazy) return;

        const video = videoRef.current;
        if (!video) return;

        // Use Intersection Observer for lazy loading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !shouldLoad) {
                        setShouldLoad(true);
                        observer.unobserve(video);
                    }
                });
            },
            {
                rootMargin: "200px", // Start loading 200px before video enters viewport
            }
        );

        observer.observe(video);

        return () => {
            if (video) observer.unobserve(video);
        };
    }, [lazy, shouldLoad]);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <video
                ref={videoRef}
                poster={poster}
                autoPlay={shouldLoad && autoPlay}
                loop={loop}
                muted={muted}
                playsInline={playsInline}
                controls={controls}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-700",
                    isLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoadedData={() => setIsLoaded(true)}
                preload={lazy ? "none" : "metadata"}
            >
                {shouldLoad && (
                    <>
                        {/* WebM for Firefox and Chrome (better compression) */}
                        {srcWebm && <source src={srcWebm} type="video/webm" />}
                        {/* MP4 as fallback for Safari and other browsers */}
                        <source src={src} type="video/mp4" />
                    </>
                )}
                Your browser does not support the video tag.
            </video>

            {/* Loading placeholder */}
            {!isLoaded && poster && (
                <img
                    src={poster}
                    alt="Video poster"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {!isLoaded && !poster && (
                <div className="absolute inset-0 bg-brand-dark animate-pulse" />
            )}
        </div>
    );
}
