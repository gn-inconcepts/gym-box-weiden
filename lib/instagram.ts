export interface InstagramPost {
    id: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    permalink: string;
    caption?: string;
    timestamp: string;
}

export interface InstagramResponse {
    data: InstagramPost[];
    paging?: {
        cursors: {
            before: string;
            after: string;
        };
        next?: string;
    };
}

/**
 * Fetch recent Instagram posts from Instagram Basic Display API
 */
export async function fetchInstagramPosts(limit: number = 12): Promise<InstagramPost[]> {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
        console.warn('Instagram access token not configured');
        return [];
    }

    try {
        const fields = 'id,media_type,media_url,permalink,caption,timestamp';
        const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

        const response = await fetch(url, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Instagram API error: ${response.status}`);
        }

        const data: InstagramResponse = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Failed to fetch Instagram posts:', error);
        return [];
    }
}

/**
 * Convert Instagram post to Sanity document format
 */
export function instagramPostToSanity(post: InstagramPost) {
    return {
        _type: 'instagramPost',
        postId: post.id,
        imageUrl: post.media_url,
        caption: post.caption || '',
        permalink: post.permalink,
        timestamp: post.timestamp,
        mediaType: post.media_type,
        syncedAt: new Date().toISOString(),
    };
}
