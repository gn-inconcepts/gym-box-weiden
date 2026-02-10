import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const GOOGLE_MAPS_URL = process.env.GOOGLE_MAPS_URL;
const CRON_SECRET = process.env.CRON_SECRET;

// Create Sanity client
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

export async function POST(request: NextRequest) {
    try {
        // Verify cron secret for security
        const authHeader = request.headers.get('authorization');
        if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!APIFY_API_TOKEN) {
            return NextResponse.json(
                { error: 'Apify API token not configured' },
                { status: 500 }
            );
        }

        if (!GOOGLE_MAPS_URL) {
            return NextResponse.json(
                { error: 'Google Maps URL not configured' },
                { status: 500 }
            );
        }

        console.log('🔄 Starting Google Reviews sync...');

        // Use Apify Google Maps Reviews Scraper
        const response = await fetch(`https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items?token=${APIFY_API_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startUrls: [{ url: GOOGLE_MAPS_URL }],
                maxReviews: 50, // Get up to 50 reviews
                reviewsSort: 'newest', // Get newest reviews
                language: 'de',
            }),
        });

        if (!response.ok) {
            throw new Error(`Apify API error: ${response.status} ${response.statusText}`);
        }

        const results = await response.json();

        if (!results || results.length === 0) {
            console.log('⚠️  No Google Reviews found');
            return NextResponse.json(
                { message: 'No reviews found', synced: 0 },
                { status: 200 }
            );
        }

        console.log(`⭐ Found ${results.length} Google Reviews`);

        // Get existing reviews from Sanity to avoid duplicates
        const existingReviews = await sanityClient.fetch(
            `*[_type == "review" && source == "google"]{googleReviewId}`
        );
        const existingReviewIds = new Set(existingReviews.map((r: any) => r.googleReviewId));

        let syncedCount = 0;

        // Sync reviews to Sanity
        for (const review of results) {
            // Skip reviews without text or with low ratings
            if (!review.text || review.text.trim().length < 10 || review.stars < 4) {
                console.log(`  ⏭️  Skipping review from ${review.name} (no text or rating < 4)`);
                continue;
            }

            // Create unique ID for the review
            const reviewId = review.reviewId || `${review.name}-${review.publishedAtDate}`;

            // Only sync if not already in Sanity
            if (!existingReviewIds.has(reviewId)) {
                try {
                    await sanityClient.create({
                        _type: 'review',
                        authorName: review.name || 'Anonymous',
                        rating: review.stars || 5,
                        text: review.text || '',
                        date: review.publishedAtDate ? new Date(review.publishedAtDate).toISOString() : new Date().toISOString(),
                        source: 'google',
                        googleReviewId: reviewId,
                        verified: true,
                        featured: review.stars >= 4, // Auto-feature 4-5 star reviews
                        publishedAt: new Date().toISOString(), // Publish immediately
                    });
                    syncedCount++;
                    console.log(`  ✅ Synced review from: ${review.name} (${review.stars} stars)`);
                } catch (error) {
                    console.error(`  ❌ Failed to sync review ${reviewId}:`, error);
                }
            } else {
                console.log(`  ⏭️  Review ${reviewId} already exists, skipping`);
            }
        }

        console.log(`✅ Google Reviews sync complete: ${syncedCount} new reviews synced`);

        return NextResponse.json(
            {
                message: 'Google Reviews sync successful',
                synced: syncedCount,
                total: results.length,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('❌ Google Reviews sync error:', error);
        return NextResponse.json(
            { error: 'Google Reviews sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// Allow GET for testing
export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            message: 'Google Reviews sync endpoint. Use POST with Authorization header.',
            configured: !!(APIFY_API_TOKEN && GOOGLE_MAPS_URL),
        },
        { status: 200 }
    );
}
