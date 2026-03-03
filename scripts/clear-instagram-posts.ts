import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function clearInstagramPosts() {
    // Safety check: require --force flag to prevent accidental data loss
    if (!process.argv.includes('--force')) {
        console.log('⚠️  This will DELETE ALL Instagram posts from Sanity!\n');
        console.log('To confirm, run with --force flag:');
        console.log('  npx tsx scripts/clear-instagram-posts.ts --force\n');
        process.exit(1);
    }

    try {
        console.log('🗑️  Fetching Instagram posts...');
        
        const posts = await client.fetch(`*[_type == "instagramPost"]._id`);
        
        console.log(`Found ${posts.length} Instagram posts to delete`);
        
        if (posts.length === 0) {
            console.log('No posts to delete');
            return;
        }

        for (const id of posts) {
            await client.delete(id);
            console.log(`  ✅ Deleted: ${id}`);
        }

        console.log(`\n✅ Successfully deleted ${posts.length} Instagram posts`);
    } catch (error) {
        console.error('Error clearing Instagram posts:', error);
        process.exit(1);
    }
}

clearInstagramPosts();
