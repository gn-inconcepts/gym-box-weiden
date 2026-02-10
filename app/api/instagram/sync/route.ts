import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME || 'bernhardtrainiert';
const INSTAGRAM_USERNAME_BOX = process.env.INSTAGRAM_USERNAME_BOX || 'crossfit_lakefront';
const CRON_SECRET = process.env.CRON_SECRET;

// Create Sanity client
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

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
        return { synced: 0, total: 0 };
    }

    // Get the profile data (first item contains posts)
    const profile = results[0];
    const posts = profile?.latestPosts || [];

    console.log(`📸 Found ${posts.length} posts for @${username}`);

    // Get existing posts from Sanity to avoid duplicates
    const existingPosts = await sanityClient.fetch(
        `*[_type == "instagramPost" && category == $category]{postId}`,
        { category }
    );
    const existingPostIds = new Set(existingPosts.map((p: any) => p.postId));

    let syncedCount = 0;

    // Sync posts to Sanity
    for (const post of posts.slice(0, 12)) {
        // Only sync if not already in Sanity
        if (!existingPostIds.has(post.id)) {
            try {
                await sanityClient.create({
                    _type: 'instagramPost',
                    postId: post.id,
                    imageUrl: post.displayUrl || post.thumbnailSrc,
                    caption: post.caption || '',
                    permalink: post.url || `https://www.instagram.com/p/${post.shortCode}/`,
                    timestamp: post.timestamp ? new Date(post.timestamp).toISOString() : new Date().toISOString(),
                    mediaType: post.type || 'image',
                    syncedAt: new Date().toISOString(),
                    category: category,
                });
                syncedCount++;
                console.log(`  ✅ Synced post: ${post.id} [${category}]`);
            } catch (error) {
                console.error(`  ❌ Failed to sync post ${post.id}:`, error);
            }
        } else {
            console.log(`  ⏭️  Post ${post.id} already exists, skipping`);
        }
    }

    console.log(`✅ ${category} sync complete: ${syncedCount} new posts`);

    return { synced: syncedCount, total: posts.length };
}

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

        console.log('🚀 Starting Instagram sync for both accounts...');

        // Sync both accounts
        const gymResults = await syncInstagramAccount(INSTAGRAM_USERNAME, 'gym');
        const boxResults = await syncInstagramAccount(INSTAGRAM_USERNAME_BOX, 'box');

        const totalSynced = gymResults.synced + boxResults.synced;
        const totalPosts = gymResults.total + boxResults.total;

        console.log(`\n🎉 All Instagram syncs complete!`);
        console.log(`   Gym: ${gymResults.synced}/${gymResults.total} synced`);
        console.log(`   Box: ${boxResults.synced}/${boxResults.total} synced`);
        console.log(`   Total: ${totalSynced}/${totalPosts} synced\n`);

        return NextResponse.json(
            {
                message: 'Instagram sync successful for both accounts',
                gym: { synced: gymResults.synced, total: gymResults.total },
                box: { synced: boxResults.synced, total: boxResults.total },
                totalSynced,
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

// Allow GET for testing
export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            message: 'Instagram sync endpoint. Use POST with Authorization header.',
            accounts: {
                gym: INSTAGRAM_USERNAME,
                box: INSTAGRAM_USERNAME_BOX,
            },
            configured: !!APIFY_API_TOKEN,
        },
        { status: 200 }
    );
}
