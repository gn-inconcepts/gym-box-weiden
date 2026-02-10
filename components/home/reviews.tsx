"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Review {
    _id: string;
    authorName: string;
    rating: number;
    text: string;
    date: string;
    source: string;
}

// Fallback reviews if API fails
const fallbackReviews = [
    {
        _id: "fallback-1",
        authorName: "Maria S.",
        rating: 5,
        text: "Bernhard hat mich von Anfang an super betreut und individuell auf meine Ziele eingegangen. Die Atmosphäre ist familiär und motivierend. Nach 6 Monaten habe ich schon großartige Fortschritte gemacht!",
        date: new Date().toISOString(),
        source: "manual",
    },
    {
        _id: "fallback-2",
        authorName: "Thomas K.",
        rating: 5,
        text: "Professionelles Team, top Ausstattung und ein durchdachtes Konzept. Die CrossFit Box ist einzigartig in der Region. Absolute Empfehlung!",
        date: new Date().toISOString(),
        source: "manual",
    },
    {
        _id: "fallback-3",
        authorName: "Lisa M.",
        rating: 5,
        text: "Das Ernährungscoaching hat mein Leben verändert! Keine Diät, sondern nachhaltige Umstellung. Das Team nimmt sich wirklich Zeit für jeden einzelnen.",
        date: new Date().toISOString(),
        source: "manual",
    },
    {
        _id: "fallback-4",
        authorName: "Stefan W.",
        rating: 5,
        text: "Beste Entscheidung! Die Kombination aus Gym und CrossFit Box ist perfekt. Egal ob Anfänger oder Profi - hier fühlt sich jeder willkommen.",
        date: new Date().toISOString(),
        source: "manual",
    },
    {
        _id: "fallback-5",
        authorName: "Anna B.",
        rating: 5,
        text: "Familiäre Atmosphäre, moderne Ausstattung und kompetente Betreuung. Hier trainiere ich gerne! Die Sportphysiotherapie ist ein echtes Plus.",
        date: new Date().toISOString(),
        source: "manual",
    },
];

export function Reviews() {
    const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
    const [loading, setLoading] = useState(true);
    const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch('/api/reviews');
                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();
                if (data.reviews && data.reviews.length > 0) {
                    setReviews(data.reviews);
                }
            } catch (err) {
                console.error('Failed to load reviews:', err);
                // Keep fallback reviews
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, []);

    const toggleExpanded = (reviewId: string) => {
        setExpandedReviews(prev => {
            const newSet = new Set(prev);
            if (newSet.has(reviewId)) {
                newSet.delete(reviewId);
            } else {
                newSet.add(reviewId);
            }
            return newSet;
        });
    };

    const truncateText = (text: string, maxLength: number = 200) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };
    return (
        <section className="py-32 overflow-hidden bg-brand-black">
            <div className="container mx-auto px-4 mb-12">
                <h2 className="font-display text-4xl md:text-5xl text-center">
                    WAS UNSERE <span className="text-brand-green">ATHLETEN</span> SAGEN
                </h2>
            </div>

            <div className="relative w-full">
                {/* Rolling Marquee of reviews */}
                <div className="flex gap-6 w-max animate-[marquee_80s_linear_infinite] hover:[animation-play-state:paused] pl-4">
                    {[...reviews, ...reviews, ...reviews].map((review, i) => {
                        const uniqueKey = `${review._id}-${i}`;
                        const isExpanded = expandedReviews.has(uniqueKey);
                        const shouldTruncate = review.text.length > 200;
                        const displayText = isExpanded || !shouldTruncate ? review.text : truncateText(review.text);

                        return (
                            <div
                                key={uniqueKey}
                                className="w-[350px] md:w-[450px] flex-shrink-0 p-8 rounded-2xl bg-brand-dark border border-white/5 hover:border-brand-green/30 transition-colors"
                            >
                                <div className="flex gap-1 text-brand-green mb-4">
                                    {[...Array(review.rating)].map((_, starIdx) => (
                                        <Star key={starIdx} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-brand-gray-light font-light leading-relaxed mb-4 italic">
                                    "{displayText}"
                                </p>
                                {shouldTruncate && (
                                    <button
                                        onClick={() => toggleExpanded(uniqueKey)}
                                        className="text-brand-green text-sm font-bold hover:text-brand-white transition-colors mb-4"
                                    >
                                        {isExpanded ? 'Weniger anzeigen' : 'Mehr lesen'}
                                    </button>
                                )}
                                <div className="font-bold text-sm tracking-wider uppercase text-brand-white">
                                    {review.authorName}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
