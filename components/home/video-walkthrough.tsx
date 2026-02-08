"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

export function VideoWalkthrough() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-0 relative z-30 -mt-20 px-4">
            <div className="container mx-auto">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-brand-dark group"
                >
                    {!isPlaying ? (
                        <>
                            {/* Thumbnail / Poster */}
                            <div className="absolute inset-0 bg-brand-black/40 z-10 transition-colors group-hover:bg-brand-black/20" />
                            <img
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop"
                                alt="Gym Tour"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Play Button */}
                            <button
                                onClick={() => setIsPlaying(true)}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 bg-brand-green/90 rounded-full flex items-center justify-center text-brand-black hover:scale-110 hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(150,193,31,0.4)]"
                            >
                                <Play className="w-10 h-10 ml-1 fill-current" />
                            </button>

                            <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
                                <span className="text-brand-green font-bold tracking-widest text-sm uppercase mb-2 block">Der Rundgang</span>
                                <h2 className="font-display text-4xl md:text-5xl text-brand-white">Entdecke das<br />Areal</h2>
                            </div>
                        </>
                    ) : (
                        <video
                            src="https://videos.pexels.com/video-files/5319760/5319760-hd_1920_1080_25fps.mp4"
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                        />
                    )}
                </motion.div>
            </div>
        </section>
    );
}
