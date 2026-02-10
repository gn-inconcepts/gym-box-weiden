import { NextRequest, NextResponse } from 'next/server';
import { fetchGoogleReviews, googleReviewToSanity } from '@/lib/reviews';
import { client } from '@/sanity/lib/client';

// Protect this endpoint with a secret
export async function POST(request: NextRequest) {
    try {
        // Verify cron secret
        const authHeader = request.headers.get('authorization');
        const cronSecret = process.env.CRON_SECRET;

        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch reviews from Google Places API
        const reviews = await fetchGoogleReviews();

        if (reviews.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No reviews to sync',
                synced: 0,
            });
        }

        // Get existing review IDs from Sanity
        const existingReviews = await client.fetch<{ googleReviewId: string }[]>(
            `*[_type == "review" && source == "google"]{ googleReviewId }`
        );
        const existingReviewIds = new Set(existingReviews.map((r) => r.googleReviewId));

        // Filter out reviews that already exist
        const newReviews = reviews.filter((review) => {
            const reviewId = `${review.author_name}-${review.time}`;
            return !existingReviewIds.has(reviewId);
        });

        if (newReviews.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'All reviews already synced',
                synced: 0,
            });
        }

        // Convert to Sanity format with weekly publishing strategy
        // Each new review gets published 1 week after the previous one
        const existingCount = existingReviews.length;
        const documents = newReviews.map((review, index) =>
            googleReviewToSanity(review, existingCount + index)
        );

        // Use client with token for write operations
        const writeClient = client.withConfig({
            token: process.env.SANITY_API_TOKEN,
        });

        // Batch create documents
        const transaction = writeClient.transaction();
        documents.forEach((doc) => {
            transaction.create(doc);
        });

        await transaction.commit();

        return NextResponse.json({
            success: true,
            message: `Synced ${newReviews.length} new Google reviews`,
            synced: newReviews.length,
            total: reviews.length,
            publishSchedule: documents.map((d) => ({
                author: d.authorName,
                publishAt: d.publishedAt,
            })),
        });
    } catch (error) {
        console.error('Google reviews sync error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to sync Google reviews',
            },
            { status: 500 }
        );
    }
}
