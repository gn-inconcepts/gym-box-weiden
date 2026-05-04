import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Create Sanity client
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

interface ReviewData {
    name: string;
    rating: number;
    text: string;
    reviewId: string;
    date: string;
}

// ─── Strategy 1: Google Places API (free tier — $200/month credit) ──────────

async function fetchViaPlacesAPI(): Promise<ReviewData[]> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        throw new Error('Google Places API key or Place ID not configured');
    }

    console.log('⭐ Fetching via Google Places API...');

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=de&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 'OK') {
        throw new Error(`Google Places API status: ${data.status}`);
    }

    const reviews = data.result?.reviews || [];
    return reviews.map((r: any) => ({
        name: r.author_name || 'Anonymous',
        rating: r.rating || 5,
        text: r.text || '',
        reviewId: `${r.author_name}-${r.time}`,
        date: r.time ? new Date(r.time * 1000).toISOString() : new Date().toISOString(),
    }));
}

// ─── Strategy 2: Apify fallback (if configured) ────────────────────────────

async function fetchViaApify(): Promise<ReviewData[]> {
    const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
    const GOOGLE_MAPS_URL = process.env.GOOGLE_MAPS_URL;

    if (!APIFY_API_TOKEN || !GOOGLE_MAPS_URL) {
        throw new Error('Apify token or Google Maps URL not configured');
    }

    console.log('⭐ Fetching via Apify Google Maps scraper...');

    const response = await fetch(`https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items?token=${APIFY_API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            startUrls: [{ url: GOOGLE_MAPS_URL }],
            maxReviews: 50,
            reviewsSort: 'newest',
            language: 'de',
        }),
    });

    if (!response.ok) {
        throw new Error(`Apify API error: ${response.status} ${response.statusText}`);
    }

    const results = await response.json();
    if (!results?.length) {
        return [];
    }

    return results.map((r: any) => ({
        name: r.name || 'Anonymous',
        rating: r.stars || 5,
        text: r.text || '',
        reviewId: r.reviewId || `${r.name}-${r.publishedAtDate}`,
        date: r.publishedAtDate ? new Date(r.publishedAtDate).toISOString() : new Date().toISOString(),
    }));
}

// ─── Sync reviews to Sanity ─────────────────────────────────────────────────

async function syncReviewsToSanity(reviews: ReviewData[]): Promise<number> {
    // Get existing reviews from Sanity to avoid duplicates
    const existingReviews = await sanityClient.fetch(
        `*[_type == "review" && source == "google"]{googleReviewId}`
    );
    const existingReviewIds = new Set(existingReviews.map((r: any) => r.googleReviewId));

    let syncedCount = 0;

    for (const review of reviews) {
        // Skip reviews without text or with low ratings
        if (!review.text || review.text.trim().length < 10 || review.rating < 4) {
            console.log(`  ⏭️ Skipping review from ${review.name} (no text or rating < 4)`);
            continue;
        }

        if (!existingReviewIds.has(review.reviewId)) {
            try {
                await sanityClient.create({
                    _type: 'review',
                    authorName: review.name,
                    rating: review.rating,
                    text: review.text,
                    date: review.date,
                    source: 'google',
                    googleReviewId: review.reviewId,
                    verified: true,
                    featured: review.rating >= 4,
                    publishedAt: new Date().toISOString(),
                });
                syncedCount++;
                console.log(`  ✅ Synced review from: ${review.name} (${review.rating} stars)`);
            } catch (error) {
                console.error(`  ❌ Failed to sync review ${review.reviewId}:`, error);
            }
        } else {
            console.log(`  ⏭️ Review from ${review.name} already exists, skipping`);
        }
    }

    return syncedCount;
}

// ─── Sync handler (shared by GET and POST) ──────────────────────────────────

async function handleSync(request: NextRequest) {
    try {
        // Verify cron secret for security
        const CRON_SECRET = process.env.CRON_SECRET;
        if (!CRON_SECRET) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('🔄 Starting Google Reviews sync...');

        let reviews: ReviewData[] = [];
        let strategy = 'none';

        // Strategy 1: Google Places API (free tier)
        const hasPlacesAPI = process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID;
        if (hasPlacesAPI) {
            try {
                reviews = await fetchViaPlacesAPI();
                strategy = 'places-api';
                console.log(`⭐ Got ${reviews.length} reviews via Google Places API`);
            } catch (error) {
                console.error('Google Places API failed:', error);
            }
        }

        // Strategy 2: Apify fallback
        if (!reviews.length) {
            const hasApify = process.env.APIFY_API_TOKEN && process.env.GOOGLE_MAPS_URL;
            if (hasApify) {
                try {
                    reviews = await fetchViaApify();
                    strategy = 'apify';
                    console.log(`⭐ Got ${reviews.length} reviews via Apify`);
                } catch (error) {
                    console.error('Apify fallback also failed:', error);
                }
            }
        }

        if (!reviews.length) {
            console.log('⚠️ No reviews fetched from any source. Existing Sanity data is preserved.');
            return NextResponse.json({
                message: 'No new reviews fetched. Configure GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID, or APIFY_API_TOKEN + GOOGLE_MAPS_URL. Existing reviews in Sanity are preserved.',
                synced: 0,
                strategy: 'none',
            }, { status: 200 });
        }

        const syncedCount = await syncReviewsToSanity(reviews);

        console.log(`✅ Google Reviews sync complete: ${syncedCount} new reviews (via ${strategy})`);

        return NextResponse.json({
            message: 'Google Reviews sync successful',
            synced: syncedCount,
            total: reviews.length,
            strategy,
        }, { status: 200 });

    } catch (error) {
        console.error('❌ Google Reviews sync error:', error);
        return NextResponse.json(
            { error: 'Google Reviews sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// Vercel cron jobs send GET requests
export async function GET(request: NextRequest) {
    return handleSync(request);
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
    return handleSync(request);
}
