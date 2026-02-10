"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getVisibleReviews, sortReviewsByDate } from "@/lib/reviews";

interface Review {
    _id: string;
    authorName: string;
    rating: number;
    text: string;
    date: string;
    source: string;
    publishedAt?: string;
}

export function GoogleReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const query = `*[_type == "review" && featured == true] | order(date desc) {
                    _id,
                    authorName,
                    rating,
                    text,
                    date,
                    source,
                    publishedAt
                }`;

                const allReviews = await client.fetch<Review[]>(query);

                // Filter to only show published reviews (weekly reveal strategy)
                const visibleReviews = getVisibleReviews(allReviews);
                const sortedReviews = sortReviewsByDate(visibleReviews);

                setReviews(sortedReviews.slice(0, 3)); // Show top 3 reviews
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
                // Use fallback reviews
                setReviews(fallbackReviews);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, []);

    // Fallback reviews if no reviews in CMS
    const fallbackReviews: Review[] = [
        {
            _id: '1',
            authorName: 'Maria S.',
            rating: 5,
            text: 'Absolut empfehlenswert! Die Trainer sind super kompetent und die Atmosphäre ist familiär. Ich fühle mich hier sehr wohl und habe bereits tolle Fortschritte gemacht.',
            date: new Date().toISOString(),
            source: 'manual',
        },
        {
            _id: '2',
            authorName: 'Thomas K.',
            rating: 5,
            text: 'Top Gym mit exzellentem Equipment und professioneller Betreuung. Das Ernährungscoaching hat mir wirklich geholfen, meine Ziele zu erreichen.',
            date: new Date().toISOString(),
            source: 'manual',
        },
        {
            _id: '3',
            authorName: 'Lisa M.',
            rating: 5,
            text: 'Die Box ist einfach großartig! Tolle Community, anspruchsvolle Workouts und Trainer, die wirklich auf jeden einzelnen eingehen.',
            date: new Date().toISOString(),
            source: 'manual',
        },
    ];

    const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;

    return (
        <section className="py-12 md:py-24 bg-brand-dark">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-1 px-4 py-2 bg-brand-green/10 text-brand-green rounded-full mb-4">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl mb-4">
                        Was unsere <span className="text-brand-green">Mitglieder</span> sagen
                    </h2>
                    <p className="text-brand-gray-light max-w-2xl mx-auto">
                        Echte Bewertungen von echten Menschen, die ihre Ziele mit uns erreichen.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-64 bg-brand-black animate-pulse rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayReviews.map((review, i) => (
                            <motion.div
                                key={review._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-brand-black p-8 rounded-2xl border border-brand-white/5 relative group hover:border-brand-green/30 transition-colors"
                            >
                                <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-green/10 group-hover:text-brand-green/20 transition-colors" />

                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            className={`w-5 h-5 ${
                                                starIndex < review.rating
                                                    ? 'text-brand-green fill-current'
                                                    : 'text-brand-gray'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-brand-gray-light leading-relaxed mb-6 relative z-10">
                                    "{review.text}"
                                </p>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-bold">
                                        {review.authorName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-brand-white">{review.authorName}</p>
                                        <p className="text-xs text-brand-gray">
                                            {review.source === 'google' ? 'Google Bewertung' : 'Mitglied'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <a
                        href="https://www.google.com/maps/place/GYM+%26+BOX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 border border-brand-white/20 rounded-full text-brand-white hover:bg-brand-green hover:text-brand-black hover:border-brand-green transition-all duration-300"
                    >
                        <Star className="w-5 h-5" />
                        Alle Bewertungen ansehen
                    </a>
                </div>
            </div>
        </section>
    );
}
