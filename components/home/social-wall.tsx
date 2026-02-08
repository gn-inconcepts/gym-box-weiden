"use client";

import { Instagram } from "lucide-react";

export function SocialWall() {
    return (
        <section className="py-12 md:py-24 bg-brand-dark">
            <div className="container mx-auto px-4 text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="w-12 h-1 bg-brand-green"></span>
                    <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Folge Uns</span>
                    <span className="w-12 h-1 bg-brand-green"></span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl mb-6">UNSERE <span className="text-brand-green">COMMUNITY</span></h2>
                <p className="text-brand-gray-light max-w-2xl mx-auto mb-8">
                    Einblicke, Erfolgsgeschichten und tägliche Motivation — folge uns auf Instagram.
                </p>
                <a
                    href="https://www.instagram.com/bernhardtrainiert/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-green font-bold hover:text-brand-white transition-colors"
                >
                    <Instagram className="w-5 h-5" />
                    @bernhardtrainiert
                </a>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
                    {[
                        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1000&auto=format&fit=crop"
                    ].map((img, i) => (
                        <a
                            key={i}
                            href="https://www.instagram.com/bernhardtrainiert/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="aspect-square bg-brand-black overflow-hidden relative group"
                        >
                            <img
                                src={img}
                                alt="Instagram Post"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Instagram className="w-8 h-8 text-white" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
