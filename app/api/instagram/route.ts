import { NextResponse } from 'next/server';
import { fetchInstagramPosts } from '@/lib/instagram';

export async function GET() {
    try {
        const posts = await fetchInstagramPosts(12);

        return NextResponse.json({
            success: true,
            posts,
            count: posts.length,
        });
    } catch (error) {
        console.error('Instagram API route error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch Instagram posts',
            },
            { status: 500 }
        );
    }
}
