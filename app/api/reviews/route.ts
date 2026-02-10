import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Create Sanity client
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08',
    useCdn: true, // Use CDN for read operations
});

export async function GET(request: NextRequest) {
    try {
        // Fetch reviews with text, 4-5 stars, and featured
        const reviews = await sanityClient.fetch(
            `*[_type == "review" && featured == true && rating >= 4 && length(text) > 10] | order(date desc)[0...20]`
        );

        return NextResponse.json(
            { reviews },
            { status: 200 }
        );

    } catch (error) {
        console.error('Failed to fetch reviews:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews', reviews: [] },
            { status: 500 }
        );
    }
}
