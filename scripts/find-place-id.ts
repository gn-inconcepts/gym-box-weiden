/**
 * Helper Script to Find Google Place ID
 *
 * This uses Apify's Google Maps scraper to find the Place ID
 * for BERNHARDTRAINIERT gym.
 *
 * Run with: npx tsx scripts/find-place-id.ts
 */

import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const BUSINESS_NAME = 'BERNHARDTRAINIERT';
const ADDRESS = 'Friedhofgasse 45, 7121 Weiden am See, Austria';

async function findPlaceId() {
    console.log('🔍 Finding Google Place ID for BERNHARDTRAINIERT...\n');

    if (!APIFY_API_TOKEN) {
        console.error('❌ Error: APIFY_API_TOKEN not found in .env.local');
        console.error('Please add your Apify API token to .env.local');
        process.exit(1);
    }

    try {
        // Start Apify Google Maps Search scraper
        console.log('📍 Searching for:', BUSINESS_NAME);
        console.log('📍 Address:', ADDRESS);
        console.log('\n🔄 Starting Apify scraper...\n');

        const response = await fetch('https://api.apify.com/v2/acts/compass~google-maps-scraper/run-sync-get-dataset-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${APIFY_API_TOKEN}`
            },
            body: JSON.stringify({
                searchStringsArray: [`${BUSINESS_NAME}, ${ADDRESS}`],
                maxCrawledPlacesPerSearch: 1,
                language: 'de',
                skipClosedPlaces: false
            })
        });

        if (!response.ok) {
            throw new Error(`Apify API error: ${response.status} ${response.statusText}`);
        }

        const results = await response.json();

        if (!results || results.length === 0) {
            console.log('❌ No results found. Try these alternatives:\n');
            console.log('1. Open Google Maps: https://www.google.com/maps');
            console.log('2. Search for: BERNHARDTRAINIERT Weiden am See');
            console.log('3. Click on your business');
            console.log('4. Copy the URL from the address bar');
            console.log('5. The Place ID will be in the URL\n');
            process.exit(1);
        }

        const place = results[0];

        console.log('✅ Found your business!\n');
        console.log('📊 Business Details:');
        console.log('─────────────────────────────────────');
        console.log(`Name: ${place.title || 'N/A'}`);
        console.log(`Address: ${place.address || 'N/A'}`);
        console.log(`Rating: ${place.totalScore || 'N/A'} (${place.reviewsCount || 0} reviews)`);
        console.log(`Phone: ${place.phone || 'N/A'}`);
        console.log(`Website: ${place.website || 'N/A'}`);
        console.log('─────────────────────────────────────\n');

        if (place.placeId) {
            console.log('🎯 PLACE ID FOUND!\n');
            console.log('═══════════════════════════════════════');
            console.log(`   ${place.placeId}`);
            console.log('═══════════════════════════════════════\n');
            console.log('✅ Copy this Place ID and add it to your .env.local as:\n');
            console.log(`GOOGLE_PLACE_ID=${place.placeId}\n`);
        } else if (place.url) {
            console.log('📍 Google Maps URL:', place.url);
            console.log('\n⚠️  Place ID not directly available.');
            console.log('The Place ID might be in the URL above.');
            console.log('Look for the part after "place/" or a long number.\n');
        } else {
            console.log('⚠️  Could not extract Place ID.');
            console.log('Full result:', JSON.stringify(place, null, 2));
        }

    } catch (error) {
        console.error('❌ Error finding Place ID:', error);
        console.log('\n📝 Manual fallback:');
        console.log('1. Go to: https://www.google.com/maps');
        console.log('2. Search: BERNHARDTRAINIERT Friedhofgasse 45 Weiden am See');
        console.log('3. Click on your business');
        console.log('4. Copy the URL');
        console.log('5. Share the URL here\n');
        throw error;
    }
}

// Run the script
findPlaceId()
    .then(() => {
        console.log('✅ Script completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Script failed:', error.message);
        process.exit(1);
    });
