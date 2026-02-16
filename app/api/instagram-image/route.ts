import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Get the Instagram image URL from query parameter
        const imageUrl = request.nextUrl.searchParams.get('url');

        if (!imageUrl) {
            return NextResponse.json(
                { error: 'Image URL parameter is required' },
                { status: 400 }
            );
        }

        // Validate it's an Instagram/Facebook CDN URL using proper URL parsing
        try {
            const url = new URL(imageUrl);
            if (!url.hostname.endsWith('.cdninstagram.com') && !url.hostname.endsWith('.fbcdn.net')) {
                return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
            }
        } catch {
            return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
        }

        // Fetch the image from Instagram CDN server-side
        const imageResponse = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });

        if (!imageResponse.ok) {
            console.error('Failed to fetch Instagram image:', imageResponse.status);
            return NextResponse.json(
                { error: 'Failed to fetch image from Instagram' },
                { status: 502 }
            );
        }

        // Get the image data
        const imageBuffer = await imageResponse.arrayBuffer();
        const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

        // Return the image with proper caching headers
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
                'Access-Control-Allow-Origin': '*',
            },
        });

    } catch (error) {
        console.error('Instagram image proxy error:', error);
        return NextResponse.json(
            { error: 'Failed to proxy image' },
            { status: 500 }
        );
    }
}
