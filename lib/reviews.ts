export interface GoogleReview {
    author_name: string;
    author_url?: string;
    language?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description?: string;
    text: string;
    time: number;
}

export interface GooglePlaceDetailsResponse {
    result: {
        reviews?: GoogleReview[];
        rating?: number;
        user_ratings_total?: number;
    };
    status: string;
}

/**
 * Fetch reviews from Google Places API
 */
export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        console.warn('Google Places API key or Place ID not configured');
        return [];
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

        const response = await fetch(url, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        });

        if (!response.ok) {
            throw new Error(`Google Places API error: ${response.status}`);
        }

        const data: GooglePlaceDetailsResponse = await response.json();

        if (data.status !== 'OK') {
            throw new Error(`Google Places API status: ${data.status}`);
        }

        return data.result.reviews || [];
    } catch (error) {
        console.error('Failed to fetch Google reviews:', error);
        return [];
    }
}

/**
 * Convert Google review to Sanity document format
 */
export function googleReviewToSanity(review: GoogleReview, publishWeekOffset: number = 0) {
    const now = new Date();
    const publishDate = new Date(now.getTime() + publishWeekOffset * 7 * 24 * 60 * 60 * 1000);

    return {
        _type: 'review',
        authorName: review.author_name,
        rating: review.rating,
        text: review.text,
        date: new Date(review.time * 1000).toISOString(),
        source: 'google',
        googleReviewId: `${review.author_name}-${review.time}`,
        verified: true,
        featured: review.rating >= 4, // Feature 4-5 star reviews
        publishedAt: publishDate.toISOString(),
    };
}

/**
 * Calculate how many reviews should be visible based on weekly reveal strategy
 */
export function getVisibleReviews<T extends { publishedAt?: string }>(
    reviews: T[],
    baseDate?: Date
): T[] {
    const now = baseDate || new Date();

    return reviews.filter((review) => {
        if (!review.publishedAt) return false;
        const publishDate = new Date(review.publishedAt);
        return publishDate <= now;
    });
}

/**
 * Sort reviews by date (newest first)
 */
export function sortReviewsByDate<T extends { date?: string }>(reviews: T[]): T[] {
    return [...reviews].sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
