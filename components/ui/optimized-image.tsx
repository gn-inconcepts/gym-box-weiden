"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
    priority?: boolean;
    sizes?: string;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    fill = false,
    className,
    priority = false,
    sizes,
    objectFit = "cover",
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {fill ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                    className={cn(
                        "duration-700 ease-in-out",
                        isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
                        objectFit === "cover" && "object-cover",
                        objectFit === "contain" && "object-contain",
                        objectFit === "fill" && "object-fill",
                        objectFit === "none" && "object-none",
                        objectFit === "scale-down" && "object-scale-down"
                    )}
                    onLoad={() => setIsLoading(false)}
                    priority={priority}
                    loading={priority ? undefined : "lazy"}
                />
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={sizes}
                    className={cn(
                        "duration-700 ease-in-out",
                        isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
                        objectFit === "cover" && "object-cover",
                        objectFit === "contain" && "object-contain"
                    )}
                    onLoad={() => setIsLoading(false)}
                    priority={priority}
                    loading={priority ? undefined : "lazy"}
                />
            )}

            {isLoading && (
                <div className="absolute inset-0 bg-brand-dark animate-pulse" />
            )}
        </div>
    );
}
