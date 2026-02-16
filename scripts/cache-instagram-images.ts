/**
 * Re-sync Instagram posts: fetch fresh data from Apify, download images,
 * and cache them permanently in Sanity so they never expire.
 *
 * Usage: npx tsx scripts/cache-instagram-images.ts
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';
config({ path: '.env.local' });

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME || 'bernhardtrainiert';
const INSTAGRAM_USERNAME_BOX = process.env.INSTAGRAM_USERNAME_BOX || 'crossfit_lakefront';

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function downloadAndUpload(imageUrl: string, filename: string) {
    const response = await fetch(imageUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
    });
    if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';

    const asset = await sanityClient.assets.upload('image', buffer, {
        filename: `${filename}.${ext}`,
        contentType,
    });

    return {
        _type: 'image' as const,
        asset: { _type: 'reference' as const, _ref: asset._id },
    };
}

async function syncAccount(username: string, category: 'gym' | 'box') {
    console.log(`\n🔄 Fetching fresh data for @${username} (${category})...`);

    const response = await fetch(
        `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${APIFY_API_TOKEN}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernames: [username], resultsLimit: 12 }),
        }
    );

    if (!response.ok) {
        throw new Error(`Apify error: ${response.status} ${response.statusText}`);
    }

    const results = await response.json();
    const profile = results[0];
    const posts = profile?.latestPosts || [];
    console.log(`📸 Got ${posts.length} posts from Apify`);

    // Get existing posts from Sanity
    const existingPosts: Array<{ _id: string; postId: string; hasCachedImage: boolean }> = await sanityClient.fetch(
        `*[_type == "instagramPost" && category == $category]{_id, postId, "hasCachedImage": defined(cachedImage.asset)}`,
        { category }
    );
    const existingMap = new Map(existingPosts.map((p) => [p.postId, p]));

    let created = 0, cached = 0, failed = 0;

    for (const post of posts.slice(0, 12)) {
        const cdnUrl = post.displayUrl || post.thumbnailSrc;
        if (!cdnUrl) { failed++; continue; }

        const existing = existingMap.get(post.id);

        try {
            // Download and upload image to Sanity while URL is fresh
            console.log(`  Downloading ${post.id}...`);
            const cachedImage = await downloadAndUpload(cdnUrl, `ig-${category}-${post.id}`);

            if (existing) {
                if (!existing.hasCachedImage) {
                    // Update existing post with cached image
                    await sanityClient.patch(existing._id).set({
                        cachedImage,
                        imageUrl: cdnUrl,
                        syncedAt: new Date().toISOString(),
                    }).commit();
                    cached++;
                    console.log(`    ✅ Cached image for existing post`);
                } else {
                    console.log(`    ⏭️  Already has cached image`);
                }
            } else {
                // Create new post with cached image
                await sanityClient.create({
                    _type: 'instagramPost',
                    postId: post.id,
                    imageUrl: cdnUrl,
                    cachedImage,
                    caption: post.caption || '',
                    permalink: post.url || `https://www.instagram.com/p/${post.shortCode}/`,
                    timestamp: post.timestamp ? new Date(post.timestamp).toISOString() : new Date().toISOString(),
                    mediaType: post.type || 'image',
                    syncedAt: new Date().toISOString(),
                    category,
                });
                created++;
                console.log(`    ✅ Created new post with cached image`);
            }
        } catch (error) {
            failed++;
            console.log(`    ❌ ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    console.log(`\n✅ ${category}: ${created} created, ${cached} cached, ${failed} failed`);
}

async function main() {
    if (!APIFY_API_TOKEN) {
        console.error('❌ APIFY_API_TOKEN not set in .env.local');
        process.exit(1);
    }

    console.log('🚀 Instagram Re-sync & Image Cache\n');
    console.log('This will fetch fresh data from Apify, download images,');
    console.log('and store them permanently in Sanity.\n');

    await syncAccount(INSTAGRAM_USERNAME, 'gym');
    await syncAccount(INSTAGRAM_USERNAME_BOX, 'box');

    console.log('\n🎉 Done! Images are now permanently stored in Sanity.');
    console.log('They will never expire, unlike Instagram CDN URLs.');
}

main().catch(console.error);
