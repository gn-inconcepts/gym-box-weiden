/**
 * Update Membership Pricing — applies the owner's content update (May 2026)
 *
 * Matches existing pricing docs by (category, title) and patches them in place.
 * Creates any plan that doesn't yet exist. Removes legacy plans not in the new
 * list (only inside the gym/box categories — leaves other docs alone).
 *
 * Run with: npx tsx scripts/update-pricing.ts
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'

config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

type Plan = {
    title: string
    category: 'gym' | 'box'
    pricePrefix?: string
    price: number
    interval: string
    description?: string
    features?: string[]
    recommended: boolean
}

const plans: Plan[] = [
    // ── BOX ──
    {
        title: 'Early Bird',
        category: 'box',
        price: 48,
        interval: '/ Monat',
        features: [
            'Morgenkurse bis 12:30',
            'Alle Kurse und Open Gym im Zeitfenster',
        ],
        recommended: false,
    },
    {
        title: '10er Karte',
        category: 'box',
        price: 150,
        interval: 'einmalig',
        features: [
            '10 Kursbesuche',
            'Flexibel einsetzbar',
            'Gym-Mitglieder: €100',
        ],
        recommended: false,
    },
    {
        title: 'Box Full',
        category: 'box',
        pricePrefix: 'ab',
        price: 68,
        interval: '/ Monat',
        features: [
            'Uneingeschränkter Zugang',
            'Alle Kurse & Sessions inkl. Open Gym',
        ],
        recommended: true,
    },

    // ── GYM ──
    {
        title: 'Weekend',
        category: 'gym',
        pricePrefix: 'Ab',
        price: 25,
        interval: '/ Monat',
        features: [
            'Wochenend-Zugang (Freitag, Samstag, Sonntag)',
            'Nutzung aller 3 Gymbereiche',
        ],
        recommended: false,
    },
    {
        title: 'Abend',
        category: 'gym',
        pricePrefix: 'Ab',
        price: 39,
        interval: '/ Monat',
        features: [
            'Täglicher Zugang ab 19:00 Uhr',
            'Nutzung aller 3 Gymbereiche',
        ],
        recommended: false,
    },
    {
        title: 'Business',
        category: 'gym',
        pricePrefix: 'Ab',
        price: 42,
        interval: '/ Monat',
        features: [
            'Mo-Fr Zugang Abends ab 19:00',
            'Wochenende ganztags',
            'Nutzung aller 3 Gymbereiche',
        ],
        recommended: false,
    },
    {
        title: 'Early Bird',
        category: 'gym',
        pricePrefix: 'Ab',
        price: 50,
        interval: '/ Monat',
        features: [
            'Ganztags bis 16:30 Uhr',
            'Nutzung aller 3 Gymbereiche',
        ],
        recommended: false,
    },
    {
        title: 'Vollmitgliedschaft',
        category: 'gym',
        pricePrefix: 'ab',
        price: 62,
        interval: '/ Monat',
        description: 'Uneingeschränkter Zugang täglich 06:30–22:00 Uhr.',
        features: [],
        recommended: true,
    },
]

async function run() {
    console.log('🚀 Updating membership pricing...\n')

    const allDocs: Array<{ _id: string; title: string; category: string }> =
        await client.fetch(`*[_type == "pricing"]{_id, title, category}`)

    const published = allDocs.filter((d) => !d._id.startsWith('drafts.'))
    const draftIds = new Set(
        allDocs.filter((d) => d._id.startsWith('drafts.')).map((d) => d._id)
    )

    console.log(`Found ${published.length} published, ${draftIds.size} draft(s).\n`)

    const seenPublishedIds = new Set<string>()

    for (const plan of plans) {
        const match = published.find(
            (p) =>
                p.category === plan.category &&
                p.title?.toLowerCase().trim() === plan.title.toLowerCase().trim()
        )

        const payload = {
            title: plan.title,
            category: plan.category,
            pricePrefix: plan.pricePrefix ?? '',
            price: plan.price,
            interval: plan.interval,
            description: plan.description ?? '',
            features: plan.features ?? [],
            recommended: plan.recommended,
        }

        if (match) {
            await client.patch(match._id).set(payload).commit()
            seenPublishedIds.add(match._id)
            console.log(`  ✏️  Updated: ${plan.category.toUpperCase()} / ${plan.title}`)

            const draftId = `drafts.${match._id}`
            if (draftIds.has(draftId)) {
                await client.delete(draftId)
                console.log(`     🧹 Removed stale draft: ${draftId}`)
            }
        } else {
            const created = await client.create({ _type: 'pricing', ...payload })
            seenPublishedIds.add(created._id)
            console.log(`  ➕ Created: ${plan.category.toUpperCase()} / ${plan.title}`)
        }
    }

    const stale = published.filter(
        (p) =>
            !seenPublishedIds.has(p._id) &&
            (p.category === 'gym' || p.category === 'box')
    )

    if (stale.length > 0) {
        console.log(`\n🧹 Removing ${stale.length} stale published plan(s) not in new list:`)
        for (const s of stale) {
            await client.delete(s._id)
            console.log(`  ❌ Deleted: ${s.category?.toUpperCase()} / ${s.title}`)
        }
    }

    console.log('\n✅ Pricing update complete.')
}

run().catch((err) => {
    console.error('❌ Failed:', err)
    process.exit(1)
})
