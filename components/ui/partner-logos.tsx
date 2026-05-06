import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Partner } from "@/types/sanity";

const defaultPartners: Partner[] = [
    { name: "Eleiko", fallbackSrc: "/images/partners/eleiko.svg" },
    { name: "Precor", fallbackSrc: "/images/partners/precor.svg" },
];

interface PartnerLogosProps {
    partners?: Partner[];
    heading?: string;
    subheading?: string;
}

export function PartnerLogos({ partners, heading, subheading }: PartnerLogosProps) {
    const list = partners && partners.length > 0 ? partners : defaultPartners;
    if (list.length === 0) return null;

    return (
        <section className="py-12 md:py-20 bg-brand-dark/30 border-y border-white/5">
            <div className="container mx-auto px-4">
                {(heading || subheading) && (
                    <div className="text-center mb-10 max-w-2xl mx-auto">
                        {subheading && (
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-green mb-3">
                                {subheading}
                            </p>
                        )}
                        {heading && (
                            <h2 className="font-display text-2xl md:text-3xl text-brand-white">
                                {heading}
                            </h2>
                        )}
                    </div>
                )}

                <ul className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-14 gap-y-8">
                    {list.map((p, i) => {
                        const sanitySrc = p.logo
                            ? urlFor(p.logo)?.width(400).quality(90).url() ?? null
                            : null;
                        const src = sanitySrc ?? p.fallbackSrc;
                        if (!src) return null;

                        const img = (
                            <Image
                                src={src}
                                alt={p.name}
                                width={160}
                                height={50}
                                className="h-10 md:h-12 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                            />
                        );

                        return (
                            <li key={p._key ?? `${p.name}-${i}`} className="shrink-0">
                                {p.url ? (
                                    <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={p.name}
                                        title={p.name}
                                    >
                                        {img}
                                    </a>
                                ) : (
                                    <span aria-label={p.name} title={p.name}>
                                        {img}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
