"use client";

import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

interface InstagramPost {
    _id: string;
    postId: string;
    imageUrl: string;
    caption?: string;
    permalink: string;
    timestamp: string;
    category: 'gym' | 'box';
}

interface InstagramFeedProps {
    category?: 'gym' | 'box';
    username?: string;
    instagramUrl?: string;
}

export function InstagramFeed({
    category = 'gym',
    username = 'bernhardtrainiert',
    instagramUrl = 'https://www.instagram.com/bernhardtrainiert/'
}: InstagramFeedProps) {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            try {
                // Fetch from Sanity CMS (cached posts filtered by category)
                const response = await fetch(`/api/instagram?category=${category}`);
                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();
                setPosts(data.posts?.slice(0, 12) || []); // Show 12 posts (2 rows x 6 cols)
            } catch (err) {
                console.error('Failed to load Instagram posts:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [category]);

    // Fallback posts if API fails or no Instagram configured
    const fallbackPosts = [
        { url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop", caption: "Training Session" },
        { url: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=600&auto=format&fit=crop", caption: category === 'box' ? 'CrossFit Workout' : 'Gym Workout' },
        { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop", caption: category === 'box' ? 'Box Training' : 'Strength Training' },
        { url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop", caption: "Group Training" },
        { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop", caption: "Fitness Training" },
        { url: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=600&auto=format&fit=crop", caption: "Community" }
    ];

    const displayPosts = posts.length > 0 ? posts : (error || !loading ? fallbackPosts.map((p, i) => ({
        _id: `fallback-${i}`,
        postId: `fallback-${i}`,
        imageUrl: p.url,
        caption: p.caption,
        permalink: instagramUrl,
        timestamp: new Date().toISOString(),
        category: category
    })) : []);

    return (
        <section className="py-12 md:py-24 bg-brand-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green rounded-full mb-4">
                        <Instagram className="w-4 h-4" />
                        <span className="text-sm font-bold">@{username}</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl mb-4">
                        Folge uns auf <span className="text-brand-green">Instagram</span>
                    </h2>
                    <p className="text-brand-gray-light max-w-2xl mx-auto">
                        Bleib auf dem Laufenden mit Trainingstipps, Erfolgsgeschichten und unserer Community.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="aspect-square bg-brand-dark animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <AnimateOnScroll animation="stagger-children-scale" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {displayPosts.map((post) => (
                            <a
                                key={post._id}
                                href={post.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="stagger-child group relative aspect-square overflow-hidden rounded-lg bg-brand-dark"
                            >
                                <img
                                    src={post.imageUrl}
                                    alt={post.caption || 'Instagram post'}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/0 to-brand-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-sm text-white line-clamp-2">
                                        {post.caption || 'View on Instagram'}
                                    </p>
                                </div>
                                <div className="absolute top-3 right-3 bg-brand-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Instagram className="w-4 h-4 text-white" />
                                </div>
                            </a>
                        ))}
                    </AnimateOnScroll>
                )}

                <div className="text-center mt-12">
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 border border-brand-white/20 rounded-full text-brand-white hover:bg-brand-green hover:text-brand-black hover:border-brand-green transition-all duration-300"
                    >
                        <Instagram className="w-5 h-5" />
                        Folge uns auf Instagram
                    </a>
                </div>
            </div>
        </section>
    );
}
