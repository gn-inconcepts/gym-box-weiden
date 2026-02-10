import { NextRequest, NextResponse } from 'next/server';
import { fetchInstagramPosts, instagramPostToSanity } from '@/lib/instagram';
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

        // Fetch latest posts from Instagram
        const posts = await fetchInstagramPosts(12);

        if (posts.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No posts to sync',
                synced: 0,
            });
        }

        // Get existing post IDs from Sanity
        const existingPosts = await client.fetch<{ postId: string }[]>(
            `*[_type == "instagramPost"]{ postId }`
        );
        const existingPostIds = new Set(existingPosts.map((p) => p.postId));

        // Filter out posts that already exist
        const newPosts = posts.filter((post) => !existingPostIds.has(post.id));

        if (newPosts.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'All posts already synced',
                synced: 0,
            });
        }

        // Create documents in Sanity
        const documents = newPosts.map(instagramPostToSanity);

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
            message: `Synced ${newPosts.length} new Instagram posts`,
            synced: newPosts.length,
            total: posts.length,
        });
    } catch (error) {
        console.error('Instagram sync error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to sync Instagram posts',
            },
            { status: 500 }
        );
    }
}
