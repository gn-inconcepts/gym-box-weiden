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
        const category = request.nextUrl.searchParams.get('category') || 'gym';

        // Validate category
        if (category !== 'gym' && category !== 'box') {
            return NextResponse.json(
                { error: 'Invalid category. Must be "gym" or "box"' },
                { status: 400 }
            );
        }

        // Fetch Instagram posts from Sanity filtered by category with image URLs
        const posts = await sanityClient.fetch(
            `*[_type == "instagramPost" && category == $category] | order(timestamp desc)[0...12] {
                ...,
                "cachedImageUrl": cachedImage.asset->url
            }`,
            { category }
        );

        return NextResponse.json(
            { posts, category },
            { status: 200 }
        );

    } catch (error) {
        console.error('Failed to fetch Instagram posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Instagram posts', posts: [] },
            { status: 500 }
        );
    }
}
