/**
 * Sanity Cleanup Script
 *
 * This script deletes ALL documents from Sanity.
 * Run before repopulating with updated content.
 *
 * Run with: npx tsx scripts/clear-sanity.ts
 */

import { config } from 'dotenv';
import { createClient } from '@sanity/client';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Create Sanity client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function clearSanity() {
    // Safety check: require --force flag to prevent accidental data loss
    if (!process.argv.includes('--force')) {
        console.log('⚠️  This will DELETE ALL documents from Sanity!\n');
        console.log('To confirm, run with --force flag:');
        console.log('  npx tsx scripts/clear-sanity.ts --force\n');
        process.exit(1);
    }

    console.log('🗑️  Starting Sanity cleanup...\n');

    try {
        // Get all document IDs
        const query = '*[]._id';
        const ids = await client.fetch(query);

        if (ids.length === 0) {
            console.log('✅ No documents found. Sanity is already empty.\n');
            return;
        }

        console.log(`Found ${ids.length} documents to delete.\n`);

        // Delete documents one by one (not bulk transaction)
        let deletedCount = 0;
        for (const id of ids) {
            try {
                await client.delete(id);
                deletedCount++;
                console.log(`  ✅ Deleted document ${deletedCount}/${ids.length}: ${id}`);
            } catch (error) {
                console.error(`  ❌ Failed to delete ${id}:`, error);
            }
        }

        console.log(`\n✅ Successfully deleted ${deletedCount} out of ${ids.length} documents!\n`);
        console.log('🎉 Sanity is now empty and ready for fresh content.\n');

    } catch (error) {
        console.error('❌ Error clearing Sanity:', error);
        throw error;
    }
}

// Run the script
clearSanity()
    .then(() => {
        console.log('✅ Cleanup completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Cleanup failed:', error);
        process.exit(1);
    });
