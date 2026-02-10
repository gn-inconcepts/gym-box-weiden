/**
 * Sanity Content Population Script
 *
 * This script populates your Sanity CMS with initial content:
 * - Site Settings
 * - Services (with correct pricing from Word doc)
 * - Membership Pricing
 * - Trainers (Bernhard with full bio)
 * - Testimonials
 *
 * Run with: npx tsx scripts/populate-sanity.ts
 */

import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { randomUUID } from 'crypto';

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

// Helper function to create block content with _key
function createBlock(text: string) {
    return {
        _type: 'block',
        _key: randomUUID(),
        children: [
            {
                _type: 'span',
                _key: randomUUID(),
                text,
            },
        ],
    };
}

async function populateSanity() {
    console.log('🚀 Starting Sanity content population...\n');

    try {
        // 1. Site Settings
        console.log('📝 Creating Site Settings...');
        await client.create({
            _type: 'siteSettings',
            siteName: 'GYM & BOX',
            tagline: 'Die Gesundheit ist unser wertvollstes Gut — ohne Gesundheit ist alles nichts.',
            spaceSize: '500 m²',
            registrationFee: 57,
            contact: {
                email: 'bernhard@personal-fitnesstrainer.at',
                phone: '+43 699 1109 5336',
                address: 'Friedhofgasse 45, 7121 Weiden am See',
            },
            social: {
                instagram: 'https://www.instagram.com/bernhardtrainiert/',
                facebook: 'https://www.facebook.com/Bernhardtrainiert/',
            },
            openingHours: [
                { days: 'Montag - Sonntag', hours: '06:30 - 22:00 Uhr' },
            ],
            equipmentBrands: [
                'Eleiko',
                'Gym80',
                'Hammer Strength',
                'Cross Axes Tech',
                'Precor',
            ],
        });
        console.log('✅ Site Settings created\n');

        // 2. Services (with CORRECT pricing from Word document)
        console.log('📝 Creating Services...');
        const services = [
            {
                _type: 'service',
                name: 'Körperanalyse',
                description: 'Körperzusammensetzungsanalyse mittels Abmessungen, Hautfalte, BIA und Software. Die Grundlage für jede Trainingsplanung.',
                priceMember: '€20',
                priceNonMember: '€30',
                category: 'analyse',
                icon: 'activity',
                order: 1,
            },
            {
                _type: 'service',
                name: 'Trainingsplanung',
                description: '8-Wochen personalisierter Trainingsplan mit Orientierung und Eingangscheck.',
                priceMember: '€57',
                priceNonMember: '€147',
                category: 'training',
                icon: 'dumbbell',
                order: 2,
            },
            {
                _type: 'service',
                name: 'Herzfrequenzbestimmung',
                description: 'Bestimmung deiner Trainingsherzfrequenz inkl. 8-Wochen Ausdauertrainingsplanung.',
                priceMember: '€47',
                priceNonMember: '€97',
                category: 'analyse',
                icon: 'heartPulse',
                order: 3,
            },
            {
                _type: 'service',
                name: 'Ernährungstraining',
                description: 'Einstündige Beratung zu Kalorienverbrauch und Ernährungszusammensetzung je nach Zielsetzung. Langfristige Umstellung zum Zielergebnis.',
                priceMember: '€97',
                priceNonMember: '€147',
                category: 'coaching',
                icon: 'apple',
                order: 4,
            },
            {
                _type: 'service',
                name: 'Resilienz Coaching',
                description: 'Resilienz-Coaching zur Verbesserung der Widerstandsfähigkeit inkl. Hilfestellung zur Zielerreichung.',
                priceMember: '€97',
                priceNonMember: '€147',
                category: 'coaching',
                icon: 'brain',
                order: 5,
            },
            {
                _type: 'service',
                name: 'Physiotherapie',
                description: 'Empfohlen bei Schmerzen und Verletzungen. Kommunikation zwischen Physiotherapeut und unseren Sportrehabilitationstrainern.',
                priceMember: 'Auf Anfrage',
                priceNonMember: 'Auf Anfrage',
                category: 'therapie',
                icon: 'user',
                order: 6,
            },
            {
                _type: 'service',
                name: 'Personal Training',
                description: 'Individuelles Coaching mit zertifizierten Trainern um für Einsteiger mehr Sicherheit bei den Übungen zu gewährleisten oder noch mehr aus dem Training rauszuholen.',
                priceMember: '€40 / Einheit',
                priceNonMember: '€90 / Einheit',
                category: 'training',
                icon: 'dumbbell',
                order: 7,
            },
            {
                _type: 'service',
                name: 'Kindertraining',
                description: 'Maßgeschneidertes, lustiges und abwechslungsreiches Programm für Kinder von 7–10 Jahren.',
                priceMember: '€100 / 10er Block',
                priceNonMember: '€100 / 10er Block',
                category: 'training',
                icon: 'users',
                order: 8,
            },
            {
                _type: 'service',
                name: 'Hautfaltenmessung',
                description: 'Körperfettanteil-Bestimmung mittels Harpenden-Caliper inkl. Lifestyle-Tipps.',
                priceMember: '€25',
                priceNonMember: '€50',
                category: 'analyse',
                icon: 'search',
                order: 9,
            },
            {
                _type: 'service',
                name: 'Schwangerschaftstraining',
                description: 'Spezialisierte Trainingsplanung während der Schwangerschaft. Trainerin mit dedizierter Ausbildung.',
                priceMember: '€50',
                priceNonMember: '€70',
                category: 'therapie',
                icon: 'user',
                order: 10,
            },
            {
                _type: 'service',
                name: 'Taping',
                description: 'Therapeutisches Taping durch ROCKDOCS-Spezialisten in Koordination mit Physiotherapeut.',
                priceMember: '€19,90',
                priceNonMember: 'nach Verbrauch',
                category: 'therapie',
                icon: 'activity',
                order: 11,
            },
            {
                _type: 'service',
                name: 'Firmen-Fitness',
                description: 'Gesunde Mitarbeiter*innen sind zufriedene und produktive Mitarbeiter*innen. Kostenloses Beratungsgespräch.',
                priceMember: 'Auf Anfrage',
                priceNonMember: 'Auf Anfrage',
                category: 'coaching',
                icon: 'users',
                order: 12,
            },
        ];

        for (const service of services) {
            await client.create(service);
            console.log(`  ✅ Created: ${service.name}`);
        }
        console.log('✅ All services created\n');

        // 3. Membership Pricing (CORRECTED from Word document)
        console.log('📝 Creating Membership Pricing...');
        const pricingPlans = [
            {
                _type: 'pricing',
                title: 'Starter Gym',
                price: 49,
                interval: '/ Monat',
                description: 'Perfekt für Einsteiger, die das Gym kennenlernen möchten.',
                access: 'Zugang zu allen Gym-Bereichen während der Öffnungszeiten',
                features: [
                    'Freie Nutzung aller Geräte',
                    'Zugang zu Freihantelbereich',
                    'Umkleiden & Duschen',
                    '10% Rabatt auf Personal Training',
                ],
                highlightFeature: 'Keine Mindestlaufzeit',
                recommended: false,
                category: 'gym',
            },
            {
                _type: 'pricing',
                title: 'Premium Gym',
                price: 69,
                interval: '/ Monat',
                description: 'Für ambitionierte Athleten mit maximaler Flexibilität.',
                access: 'Unbegrenzter Zugang 06:30 - 22:00 Uhr',
                features: [
                    'Alle Starter-Leistungen',
                    'Monatliche Körperanalyse',
                    'Trainingsplan-Updates',
                    'Zugang zu Online-Kursen',
                    '15% Rabatt auf alle Services',
                ],
                highlightFeature: 'Inkl. Ernährungsberatung',
                recommended: true,
                category: 'gym',
            },
            {
                _type: 'pricing',
                title: 'Early Bird',
                price: 59,
                interval: '/ Monat',
                description: 'Perfekt für Frühaufsteher und Flexible.',
                access: 'Täglich · 06:30–12:30 Uhr',
                features: [
                    'Morgenkurse bis 12:30',
                    'Alle Kurse im Zeitfenster',
                    'Freie Nutzung aller Geräte',
                    'Umkleiden & Duschen',
                ],
                highlightFeature: 'Bester Preis für Morgensport',
                recommended: false,
                category: 'box',
            },
            {
                _type: 'pricing',
                title: 'Box Full',
                price: 79,
                interval: '/ Monat',
                description: 'Unbegrenzte Teilnahme an allen CrossFit Classes.',
                access: 'Täglich · 06:30–22:00 Uhr',
                features: [
                    'Uneingeschränkter Zugang',
                    'Alle Kurse & Sessions',
                    'Open Gym Zugang',
                    'Wettkampfvorbereitung',
                    'Community Events',
                ],
                highlightFeature: 'Beste Community',
                recommended: true,
                category: 'box',
            },
            {
                _type: 'pricing',
                title: '10er Karte Box',
                price: 150,
                interval: 'einmalig',
                description: 'Flexible 10er-Karte für CrossFit Classes.',
                access: '10 Kursbesuche, flexibel einsetzbar',
                features: [
                    '10 Kursbesuche',
                    'Flexibel einsetzbar',
                    '6 Monate gültig',
                    'Übertragbar',
                ],
                highlightFeature: 'Gym-Mitglieder: €100',
                recommended: false,
                category: 'box',
            },
        ];

        for (const plan of pricingPlans) {
            await client.create(plan);
            console.log(`  ✅ Created: ${plan.title}`);
        }
        console.log('✅ All pricing plans created\n');

        // 4. Trainer - Bernhard (with FULL bio from Word document)
        console.log('📝 Creating Trainer: Bernhard...');
        await client.create({
            _type: 'trainer',
            name: 'Bernhard',
            role: 'Gründer & Owner',
            specs: 'Studioleitung · Ernährung · Personal Training · Trainingsplanerstellung',
            bio: [
                createBlock('Bernhard arbeitet nicht nur an seinen Unternehmen sondern natürlich auch in den Unternehmen. Freiberuflich unterrichtet er auch als Dozent an der Deutschen Hochschule für Prävention und Gesundheitsmanagement sowie der BSA Akademie.'),
                createBlock('Seine Leidenschaft hat ihn dazu gebracht, ein Konzept zu entwickeln, das weit über klassisches Training hinausgeht. Seine Vision: Mehr ganzheitliches Wohlbefinden in die Welt zu bringen…'),
            ],
            longBio: [
                createBlock('Nach 14 Jahren Polizeidienst mit weltweiten Aufgaben und als Mitglied einer österreichischen Einsatzeinheit, in der er Polizisten in Einsatztaktik, -technik, sowie in Sonder- und Amoklagen schulte, verließ Bernhard Beidl den Staatsdienst, um als Trainer, Coach und Dozent zu arbeiten.'),
                createBlock('Zu seinen Klienten zählen Gesundheitstrainierende, Nationalteamspielerinnen, Jiu-Jitsu-Weltmeisterinnen und Kraftdreikämpfer. 2014 baute er sein Trainingscenter „Bernhardtrainiert" auf und zwei Jahre später eröffnete die „Cross-it® Lakefront Box".'),
                createBlock('Auf dem „GYM&BOX Areal" direkt, sowie mittels Onlinecoaching fördert sein Team das Wohlbefinden aller Alters- und Leistungsgruppen.'),
            ],
            credentials: [
                'Staatlich geprüfter Fitnesstrainer',
                'Ernährungsberater (Diplom)',
                'CrossFit Level 2 Trainer',
                'Functional Training Specialist',
                'Sports Nutrition Coach',
                'Dozent an der Deutschen Hochschule für Prävention und Gesundheitsmanagement',
                'Dozent an der BSA Akademie',
            ],
            highlightQuote: 'Gesundheit ist unser wertvollstes Gut — investiere heute, nicht morgen.',
            tags: ['Krafttraining', 'Ernährung', 'CrossFit', 'Coaching'],
            category: 'all',
        });
        console.log('✅ Trainer created\n');

        // 5. Sample Testimonials
        console.log('📝 Creating Testimonials...');
        const testimonials = [
            {
                _type: 'testimonial',
                name: 'Maria S.',
                role: 'Mitglied seit 2 Jahren',
                text: 'Absolut empfehlenswert! Die Trainer sind super kompetent und die Atmosphäre ist familiär. Ich fühle mich hier sehr wohl und habe bereits tolle Fortschritte gemacht.',
                rating: 5,
            },
            {
                _type: 'testimonial',
                name: 'Thomas K.',
                role: 'CrossFit Athlet',
                text: 'Top Gym mit exzellentem Equipment und professioneller Betreuung. Das Ernährungscoaching hat mir wirklich geholfen, meine Ziele zu erreichen.',
                rating: 5,
            },
            {
                _type: 'testimonial',
                name: 'Lisa M.',
                role: 'Box Mitglied',
                text: 'Die Box ist einfach großartig! Tolle Community, anspruchsvolle Workouts und Trainer, die wirklich auf jeden einzelnen eingehen.',
                rating: 5,
            },
        ];

        for (const testimonial of testimonials) {
            await client.create(testimonial);
            console.log(`  ✅ Created testimonial: ${testimonial.name}`);
        }
        console.log('✅ All testimonials created\n');

        console.log('🎉 SUCCESS! All content has been created in Sanity!\n');
        console.log('Next steps:');
        console.log('1. Visit https://dev.gymandbox.at/studio to see your content');
        console.log('2. Edit and customize the content as needed');
        console.log('3. Upload photos for trainers and media assets');
        console.log('4. Check your website to see the content live!\n');

    } catch (error) {
        console.error('❌ Error populating Sanity:', error);
        throw error;
    }
}

// Run the script
populateSanity()
    .then(() => {
        console.log('✅ Script completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Script failed:', error);
        process.exit(1);
    });
