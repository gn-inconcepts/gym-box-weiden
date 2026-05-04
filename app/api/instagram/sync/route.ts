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

// Download an image and upload it to Sanity as an asset
async function cacheImageInSanity(imageUrl: string, filename: string): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } } | null> {
    try {
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });
        if (!response.ok) {
            console.error(`  Failed to download image: ${response.status}`);
            return null;
        }
        const buffer = Buffer.from(await response.arrayBuffer());
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';

        const asset = await sanityClient.assets.upload('image', buffer, {
            filename: `${filename}.${ext}`,
            contentType,
        });

        return {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
        };
    } catch (error) {
        console.error(`  Failed to cache image in Sanity:`, error);
        return null;
    }
}

// ─── Strategy 1: Instagram Graph API (free, official) ───────────────────────

interface GraphAPIPost {
    id: string;
    media_type: string;
    media_url?: string;
    thumbnail_url?: string;
    permalink: string;
    caption?: string;
    timestamp: string;
}

async function fetchViaGraphAPI(accessToken: string): Promise<GraphAPIPost[]> {
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp';
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${accessToken}`;

    const response = await fetch(url);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Instagram Graph API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.data || [];
}

async function syncViaGraphAPI(accessToken: string, category: 'gym' | 'box'): Promise<{ synced: number; total: number; refreshed: number }> {
    console.log(`📸 [${category}] Fetching via Instagram Graph API...`);

    const posts = await fetchViaGraphAPI(accessToken);
    if (!posts.length) {
        console.log(`⚠️ [${category}] No posts returned from Graph API`);
        return { synced: 0, total: 0, refreshed: 0 };
    }

    console.log(`📸 [${category}] Found ${posts.length} posts via Graph API`);

    // Get existing posts from Sanity
    const existingPosts: Array<{ _id: string; postId: string; hasCachedImage: boolean }> = await sanityClient.fetch(
        `*[_type == "instagramPost" && category == $category]{_id, postId, "hasCachedImage": defined(cachedImage.asset)}`,
        { category }
    );
    const existingPostMap = new Map(existingPosts.map((p) => [p.postId, p]));

    let syncedCount = 0;
    let refreshedCount = 0;

    for (const post of posts.slice(0, 12)) {
        const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
        const existing = existingPostMap.get(post.id);

        if (!existing) {
            try {
                const cachedImage = imageUrl ? await cacheImageInSanity(imageUrl, `ig-${category}-${post.id}`) : null;
                await sanityClient.create({
                    _type: 'instagramPost',
                    postId: post.id,
                    imageUrl: imageUrl || '',
                    ...(cachedImage && { cachedImage }),
                    caption: post.caption || '',
                    permalink: post.permalink,
                    timestamp: post.timestamp,
                    mediaType: post.media_type,
                    syncedAt: new Date().toISOString(),
                    category,
                });
                syncedCount++;
                console.log(`  ✅ Synced: ${post.id} [${category}]${cachedImage ? ' (cached)' : ''}`);
            } catch (error) {
                console.error(`  ❌ Failed to sync ${post.id}:`, error);
            }
        } else if (!existing.hasCachedImage && imageUrl) {
            try {
                const cachedImage = await cacheImageInSanity(imageUrl, `ig-${category}-${post.id}`);
                if (cachedImage) {
                    await sanityClient.patch(existing._id).set({
                        cachedImage,
                        imageUrl,
                        syncedAt: new Date().toISOString(),
                    }).commit();
                    refreshedCount++;
                    console.log(`  🔄 Cached image for: ${post.id}`);
                }
            } catch (error) {
                console.error(`  ❌ Failed to cache ${post.id}:`, error);
            }
        } else {
            console.log(`  ⏭️ ${post.id} already cached, skipping`);
        }
    }

    return { synced: syncedCount, total: posts.length, refreshed: refreshedCount };
}

// ─── Strategy 2: Apify fallback (if configured) ────────────────────────────

async function syncViaApify(username: string, category: 'gym' | 'box'): Promise<{ synced: number; total: number; refreshed: number }> {
    const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
    if (!APIFY_API_TOKEN) {
        throw new Error('Apify API token not configured');
    }

    console.log(`📸 [${category}] Fetching via Apify for @${username}...`);

    // Pin Apify to a US residential proxy so Instagram returns global CDN URLs
    // (scontent-*.cdninstagram.com) instead of regional *.fna.fbcdn.net cache nodes
    // which time out from outside their geographic region.
    const response = await fetch(`https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${APIFY_API_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usernames: [username],
            resultsLimit: 12,
            proxy: {
                useApifyProxy: true,
                apifyProxyGroups: ['RESIDENTIAL'],
                apifyProxyCountry: 'US',
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`Apify API error: ${response.status} ${response.statusText}`);
    }

    const results = await response.json();
    const profile = results?.[0];
    const posts = profile?.latestPosts || [];

    if (!posts.length) {
        console.log(`⚠️ [${category}] No posts from Apify for @${username}`);
        return { synced: 0, total: 0, refreshed: 0 };
    }

    console.log(`📸 [${category}] Found ${posts.length} posts via Apify`);

    const existingPosts: Array<{ _id: string; postId: string; hasCachedImage: boolean }> = await sanityClient.fetch(
        `*[_type == "instagramPost" && category == $category]{_id, postId, "hasCachedImage": defined(cachedImage.asset)}`,
        { category }
    );
    const existingPostMap = new Map(existingPosts.map((p) => [p.postId, p]));

    let syncedCount = 0;
    let refreshedCount = 0;

    for (const post of posts.slice(0, 12)) {
        const cdnUrl = post.displayUrl || post.thumbnailSrc;
        const existing = existingPostMap.get(post.id);

        if (!existing) {
            try {
                const cachedImage = cdnUrl ? await cacheImageInSanity(cdnUrl, `ig-${category}-${post.id}`) : null;
                await sanityClient.create({
                    _type: 'instagramPost',
                    postId: post.id,
                    imageUrl: cdnUrl,
                    ...(cachedImage && { cachedImage }),
                    caption: post.caption || '',
                    permalink: post.url || `https://www.instagram.com/p/${post.shortCode}/`,
                    timestamp: post.timestamp ? new Date(post.timestamp).toISOString() : new Date().toISOString(),
                    mediaType: post.type || 'image',
                    syncedAt: new Date().toISOString(),
                    category,
                });
                syncedCount++;
                console.log(`  ✅ Synced: ${post.id} [${category}]${cachedImage ? ' (cached)' : ''}`);
            } catch (error) {
                console.error(`  ❌ Failed to sync ${post.id}:`, error);
            }
        } else if (!existing.hasCachedImage && cdnUrl) {
            try {
                const cachedImage = await cacheImageInSanity(cdnUrl, `ig-${category}-${post.id}`);
                if (cachedImage) {
                    await sanityClient.patch(existing._id).set({
                        cachedImage,
                        imageUrl: cdnUrl,
                        syncedAt: new Date().toISOString(),
                    }).commit();
                    refreshedCount++;
                }
            } catch (error) {
                console.error(`  ❌ Failed to cache ${post.id}:`, error);
            }
        }
    }

    return { synced: syncedCount, total: posts.length, refreshed: refreshedCount };
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

        console.log('🚀 Starting Instagram sync...');

        const gymToken = process.env.INSTAGRAM_ACCESS_TOKEN;
        const boxToken = process.env.INSTAGRAM_ACCESS_TOKEN_BOX;
        const apifyToken = process.env.APIFY_API_TOKEN;
        const gymUsername = process.env.INSTAGRAM_USERNAME || 'bernhardtrainiert';
        const boxUsername = process.env.INSTAGRAM_USERNAME_BOX || 'crossfit_lakefront';

        const results: Record<string, { synced: number; total: number; refreshed: number; strategy: string }> = {};

        // Sync gym account
        if (gymToken) {
            try {
                const r = await syncViaGraphAPI(gymToken, 'gym');
                results.gym = { ...r, strategy: 'graph-api' };
            } catch (error) {
                console.error('Graph API failed for gym, trying Apify...', error);
                if (apifyToken) {
                    const r = await syncViaApify(gymUsername, 'gym');
                    results.gym = { ...r, strategy: 'apify-fallback' };
                }
            }
        } else if (apifyToken) {
            const r = await syncViaApify(gymUsername, 'gym');
            results.gym = { ...r, strategy: 'apify' };
        } else {
            console.log('⚠️ No Instagram credentials for gym account');
        }

        // Sync box account
        if (boxToken) {
            try {
                const r = await syncViaGraphAPI(boxToken, 'box');
                results.box = { ...r, strategy: 'graph-api' };
            } catch (error) {
                console.error('Graph API failed for box, trying Apify...', error);
                if (apifyToken) {
                    const r = await syncViaApify(boxUsername, 'box');
                    results.box = { ...r, strategy: 'apify-fallback' };
                }
            }
        } else if (apifyToken) {
            const r = await syncViaApify(boxUsername, 'box');
            results.box = { ...r, strategy: 'apify' };
        } else {
            console.log('⚠️ No Instagram credentials for box account');
        }

        if (Object.keys(results).length === 0) {
            return NextResponse.json(
                { error: 'No Instagram credentials configured. Set INSTAGRAM_ACCESS_TOKEN (Graph API) or APIFY_API_TOKEN.' },
                { status: 500 }
            );
        }

        console.log('🎉 Instagram sync complete!', JSON.stringify(results));

        return NextResponse.json({
            message: 'Instagram sync successful',
            results,
        }, { status: 200 });

    } catch (error) {
        console.error('❌ Instagram sync error:', error);
        return NextResponse.json(
            { error: 'Instagram sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
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
