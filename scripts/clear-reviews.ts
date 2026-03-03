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

async function clearReviews() {
    // Safety check: require --force flag to prevent accidental data loss
    if (!process.argv.includes('--force')) {
        console.log('⚠️  This will DELETE ALL reviews from Sanity!\n');
        console.log('To confirm, run with --force flag:');
        console.log('  npx tsx scripts/clear-reviews.ts --force\n');
        process.exit(1);
    }

    try {
        console.log('🗑️  Fetching reviews...');
        
        const reviews = await client.fetch(`*[_type == "review"]._id`);
        
        console.log(`Found ${reviews.length} reviews to delete`);
        
        if (reviews.length === 0) {
            console.log('No reviews to delete');
            return;
        }

        for (const id of reviews) {
            await client.delete(id);
            console.log(`  ✅ Deleted: ${id}`);
        }

        console.log(`\n✅ Successfully deleted ${reviews.length} reviews`);
    } catch (error) {
        console.error('Error clearing reviews:', error);
        process.exit(1);
    }
}

clearReviews();
