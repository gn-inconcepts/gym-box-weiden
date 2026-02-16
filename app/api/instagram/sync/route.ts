import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME || 'bernhardtrainiert';
const INSTAGRAM_USERNAME_BOX = process.env.INSTAGRAM_USERNAME_BOX || 'crossfit_lakefront';

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

async function syncInstagramAccount(username: string, category: 'gym' | 'box') {
    console.log(`🔄 Syncing Instagram for ${category}: @${username}`);

    // Use Apify Instagram Profile Scraper
    const response = await fetch(`https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${APIFY_API_TOKEN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usernames: [username],
            resultsLimit: 12, // Get latest 12 posts
        }),
    });

    if (!response.ok) {
        throw new Error(`Apify API error for @${username}: ${response.status} ${response.statusText}`);
    }

    const results = await response.json();

    if (!results || results.length === 0) {
        console.log(`⚠️  No Instagram posts found for @${username}`);
        return { synced: 0, total: 0, refreshed: 0 };
    }

    // Get the profile data (first item contains posts)
    const profile = results[0];
    const posts = profile?.latestPosts || [];

    console.log(`📸 Found ${posts.length} posts for @${username}`);

    // Get existing posts from Sanity (include cachedImage status)
    const existingPosts: Array<{ _id: string; postId: string; hasCachedImage: boolean }> = await sanityClient.fetch(
        `*[_type == "instagramPost" && category == $category]{_id, postId, "hasCachedImage": defined(cachedImage.asset)}`,
        { category }
    );
    const existingPostMap = new Map(existingPosts.map((p) => [p.postId, p]));

    let syncedCount = 0;
    let refreshedCount = 0;

    // Sync posts to Sanity
    for (const post of posts.slice(0, 12)) {
        const cdnUrl = post.displayUrl || post.thumbnailSrc;
        const existing = existingPostMap.get(post.id);

        if (!existing) {
            // New post — create with cached image
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
                    category: category,
                });
                syncedCount++;
                console.log(`  ✅ Synced post: ${post.id} [${category}]${cachedImage ? ' (image cached)' : ''}`);
            } catch (error) {
                console.error(`  ❌ Failed to sync post ${post.id}:`, error);
            }
        } else if (!existing.hasCachedImage && cdnUrl) {
            // Existing post without cached image — download and cache it
            try {
                const cachedImage = await cacheImageInSanity(cdnUrl, `ig-${category}-${post.id}`);
                if (cachedImage) {
                    await sanityClient.patch(existing._id).set({
                        cachedImage,
                        imageUrl: cdnUrl,
                        syncedAt: new Date().toISOString(),
                    }).commit();
                    refreshedCount++;
                    console.log(`  🔄 Cached image for existing post: ${post.id}`);
                }
            } catch (error) {
                console.error(`  ❌ Failed to cache image for ${post.id}:`, error);
            }
        } else {
            console.log(`  ⏭️  Post ${post.id} already exists with cached image, skipping`);
        }
    }

    console.log(`✅ ${category} sync complete: ${syncedCount} new, ${refreshedCount} refreshed`);

    return { synced: syncedCount, total: posts.length, refreshed: refreshedCount };
}

export async function POST(request: NextRequest) {
    try {
        // Verify cron secret for security
        const CRON_SECRET = process.env.CRON_SECRET;
        if (!CRON_SECRET) {
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${CRON_SECRET}`) {
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

        console.log('🚀 Starting Instagram sync for both accounts...');

        // Sync both accounts
        const gymResults = await syncInstagramAccount(INSTAGRAM_USERNAME, 'gym');
        const boxResults = await syncInstagramAccount(INSTAGRAM_USERNAME_BOX, 'box');

        const totalSynced = gymResults.synced + boxResults.synced;
        const totalRefreshed = gymResults.refreshed + boxResults.refreshed;
        const totalPosts = gymResults.total + boxResults.total;

        console.log(`\n🎉 All Instagram syncs complete!`);
        console.log(`   Gym: ${gymResults.synced} new, ${gymResults.refreshed} refreshed / ${gymResults.total} total`);
        console.log(`   Box: ${boxResults.synced} new, ${boxResults.refreshed} refreshed / ${boxResults.total} total`);
        console.log(`   Total: ${totalSynced} new, ${totalRefreshed} refreshed / ${totalPosts} total\n`);

        return NextResponse.json(
            {
                message: 'Instagram sync successful for both accounts',
                gym: { synced: gymResults.synced, refreshed: gymResults.refreshed, total: gymResults.total },
                box: { synced: boxResults.synced, refreshed: boxResults.refreshed, total: boxResults.total },
                totalSynced,
                totalRefreshed,
                totalPosts,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('❌ Instagram sync error:', error);
        return NextResponse.json(
            { error: 'Instagram sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Use POST with proper authorization to trigger sync.'
    }, { status: 200 });
}
