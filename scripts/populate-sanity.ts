/**
 * Sanity Content Population Script
 *
 * This script populates your Sanity CMS with initial content:
 * - Site Settings
 * - Services (13 services with correct pricing)
 * - Membership Pricing (8 plans: 5 gym + 3 box)
 * - Trainers (4 trainers)
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
        // ──────────────────────────────────────────────────
        // 1. Site Settings
        // ──────────────────────────────────────────────────
        const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]._id`);
        if (existingSettings) {
            console.log('⏭️  Site Settings already exist — skipping.\n');
        } else {
            console.log('📝 Creating Site Settings...');
            await client.create({
                _type: 'siteSettings',
                siteName: 'GYM & BOX',
                tagline: 'Die Gesundheit ist unser wertvollstes Gut — ohne Gesundheit ist alles nichts.',
                spaceSize: '500 m²',
                registrationFee: 57,
                contact: {
                    email: 'bernhard@personal-fitnesstrainer.at',
                    phone: '+43 699 110 95 336',
                    address: 'Friedhofgasse 45, 7121 Weiden am See',
                },
                social: {
                    instagram: 'https://www.instagram.com/bernhardtrainiert/',
                    facebook: 'https://www.facebook.com/Bernhardtrainiert/',
                },
                openingHours: [
                    { _key: randomUUID(), days: 'Montag - Sonntag', hours: '06:30 - 22:00 Uhr' },
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
        }

        // ──────────────────────────────────────────────────
        // 2. Services (13 services with correct pricing)
        // ──────────────────────────────────────────────────
        const existingServices = await client.fetch(`count(*[_type == "service"])`);
        if (existingServices > 0) {
            console.log(`⏭️  ${existingServices} services already exist — skipping.\n`);
        } else {
            console.log('📝 Creating Services...');
            const services = [
                {
                    _type: 'service',
                    name: 'Körperanalyse',
                    description: 'Körperzusammensetzungsanalyse mittels Abmessungen, BIA und Software. Grundlage für jede Trainingsplanung.',
                    priceMember: '€20',
                    priceNonMember: '€30',
                    category: 'analyse',
                    icon: 'activity',
                    order: 1,
                },
                {
                    _type: 'service',
                    name: 'Trainingsplanung',
                    description: '12-Wochen personalisierter Trainingsplan mit Orientierung, Ausgangscheck und Chipkarte.',
                    priceMember: '€57',
                    priceNonMember: '€147',
                    category: 'training',
                    icon: 'dumbbell',
                    order: 2,
                },
                {
                    _type: 'service',
                    name: 'Herzfrequenzbestimmung',
                    description: 'Fitness Vitaltest durch Vitalmonitor. EKG-Analyse zur Bestimmung deiner Trainingsherzfrequenz inkl. 8-Wochen Ausdauertrainingsplanung.',
                    priceMember: '€40',
                    priceNonMember: '€70',
                    category: 'analyse',
                    icon: 'heartPulse',
                    order: 3,
                },
                {
                    _type: 'service',
                    name: 'Ernährungscoaching',
                    description: 'Einstündige Beratung zu Kalorienverbrauch und Ernährungszusammensetzung. Langfristige Umstellung statt Crash-Diät.',
                    priceMember: '€75',
                    priceNonMember: '€149',
                    category: 'coaching',
                    icon: 'apple',
                    order: 4,
                },
                {
                    _type: 'service',
                    name: 'KCAL-Bedarfsrechnung',
                    description: 'Medizingeräte-Ausleihe (mind. 4 Tage tragen) zur exakten Kalorienbedarfsermittlung inkl. Software-Analyse.',
                    priceMember: '€75',
                    priceNonMember: '€120',
                    category: 'analyse',
                    icon: 'activity',
                    order: 5,
                },
                {
                    _type: 'service',
                    name: 'Resilienz Coaching',
                    description: 'Resilienz-Coaching zur Verbesserung der Widerstandsfähigkeit inkl. Hilfestellung zur Zielerreichung.',
                    priceMember: '€75',
                    priceNonMember: '€149',
                    category: 'coaching',
                    icon: 'brain',
                    order: 6,
                },
                {
                    _type: 'service',
                    name: 'Physiotherapie',
                    description: 'Empfohlen bei Schmerzen und Verletzungen. Kommunikation zwischen Physiotherapeut und sportlichem Reha-Trainer.',
                    priceMember: '€75',
                    priceNonMember: '€75',
                    category: 'therapie',
                    icon: 'user',
                    order: 7,
                },
                {
                    _type: 'service',
                    name: 'Personal Training',
                    description: 'Individuelles Coaching mit zertifizierten Trainern. Neuer Plan nach je 12 Einheiten.',
                    priceMember: '€40 / Einheit',
                    priceNonMember: '€90 / Einheit',
                    category: 'training',
                    icon: 'dumbbell',
                    order: 8,
                },
                {
                    _type: 'service',
                    name: 'Kindertraining',
                    description: 'Maßgeschneidertes, lustiges und abwechslungsreiches Programm für Kinder von 7–10 Jahren.',
                    priceMember: '€100 / 10er Block',
                    priceNonMember: '€100 / 10er Block',
                    category: 'training',
                    icon: 'users',
                    order: 9,
                },
                {
                    _type: 'service',
                    name: 'Hautfaltenmessung',
                    description: 'Körperfettanteil-Bestimmung mittels Harpenden-Caliper inkl. Lifestyle-Tipps.',
                    priceMember: '€25',
                    priceNonMember: '€50',
                    category: 'analyse',
                    icon: 'search',
                    order: 10,
                },
                {
                    _type: 'service',
                    name: 'Schwangerschaftstraining',
                    description: 'Spezialisierte Trainingsplanung während der Schwangerschaft. Trainerin mit dedizierter Ausbildung.',
                    priceMember: '€50',
                    priceNonMember: '€70',
                    category: 'therapie',
                    icon: 'user',
                    order: 11,
                },
                {
                    _type: 'service',
                    name: 'Taping',
                    description: 'Therapeutisches Taping durch ROCKDOCS-Spezialisten in Koordination mit Physiotherapeut.',
                    priceMember: '€19,90',
                    priceNonMember: 'nach Verbrauch',
                    category: 'therapie',
                    icon: 'activity',
                    order: 12,
                },
                {
                    _type: 'service',
                    name: 'Firmen-Fitness',
                    description: 'Gesunde Mitarbeiter*innen sind zufriedene und produktive Mitarbeiter*innen. Kostenloses Beratungsgespräch.',
                    priceMember: 'Auf Anfrage',
                    priceNonMember: 'Auf Anfrage',
                    category: 'coaching',
                    icon: 'users',
                    order: 13,
                },
            ];

            for (const service of services) {
                await client.create(service);
                console.log(`  ✅ Created: ${service.name}`);
            }
            console.log('✅ All services created\n');
        }

        // ──────────────────────────────────────────────────
        // 3. Membership Pricing (5 gym + 3 box)
        // ──────────────────────────────────────────────────
        const existingPricing = await client.fetch(`count(*[_type == "pricing"])`);
        if (existingPricing > 0) {
            console.log(`⏭️  ${existingPricing} pricing plans already exist — skipping.\n`);
        } else {
            console.log('📝 Creating Membership Pricing...');
            const pricingPlans = [
                // GYM plans
                {
                    _type: 'pricing',
                    title: 'Weekend',
                    price: 35,
                    interval: '/ Monat',
                    features: [
                        'Wochenend-Zugang',
                        'Alle Geräte & Free Weights',
                        'Umkleiden & Duschen',
                    ],
                    recommended: false,
                    category: 'gym',
                },
                {
                    _type: 'pricing',
                    title: 'Abend',
                    price: 45,
                    interval: '/ Monat',
                    features: [
                        'Abend-Zugang täglich',
                        'Alle Geräte & Free Weights',
                        'Umkleiden & Duschen',
                    ],
                    recommended: false,
                    category: 'gym',
                },
                {
                    _type: 'pricing',
                    title: 'Business',
                    price: 55,
                    interval: '/ Monat',
                    features: [
                        'Abends ab 19:00',
                        'Wochenende ganztags',
                        'Ideal für Berufstätige',
                    ],
                    recommended: false,
                    category: 'gym',
                },
                {
                    _type: 'pricing',
                    title: 'Early Bird',
                    price: 64,
                    interval: '/ Monat',
                    features: [
                        'Ganztags bis 16:30',
                        'Alle Geräte & Free Weights',
                        'Inkl. Körperanalyse',
                    ],
                    recommended: false,
                    category: 'gym',
                },
                {
                    _type: 'pricing',
                    title: 'Vollmitgliedschaft',
                    price: 79,
                    interval: '/ Monat',
                    features: [
                        'Uneingeschränkter Zugang täglich 06:30–22:00',
                        'Inkl. Körperanalyse',
                        'Trainingsplan-Erstellung',
                        '1x Personal Training Session',
                    ],
                    recommended: true,
                    category: 'gym',
                },
                // BOX plans
                {
                    _type: 'pricing',
                    title: '10er Karte',
                    price: 150,
                    interval: 'einmalig',
                    features: [
                        '10 Kursbesuche',
                        'Flexibel einsetzbar',
                        'Gym-Mitglieder: €100',
                    ],
                    recommended: false,
                    category: 'box',
                },
                {
                    _type: 'pricing',
                    title: 'Early Bird',
                    price: 59,
                    interval: '/ Monat',
                    features: [
                        'Morgenkurse bis 12:30',
                        'Alle Kurse im Zeitfenster',
                        'Inkl. Körperanalyse',
                    ],
                    recommended: false,
                    category: 'box',
                },
                {
                    _type: 'pricing',
                    title: 'Box Full',
                    price: 79,
                    interval: '/ Monat',
                    features: [
                        'Uneingeschränkter Zugang',
                        'Alle Kurse & Sessions',
                        'Inkl. Körperanalyse',
                    ],
                    recommended: true,
                    category: 'box',
                },
            ];

            for (const plan of pricingPlans) {
                await client.create(plan);
                console.log(`  ✅ Created: ${plan.title} (${plan.category})`);
            }
            console.log('✅ All pricing plans created\n');
        }

        // ──────────────────────────────────────────────────
        // 4. Trainers (4 trainers)
        // ──────────────────────────────────────────────────
        const existingTrainers = await client.fetch(`count(*[_type == "trainer"])`);
        if (existingTrainers > 0) {
            console.log(`⏭️  ${existingTrainers} trainers already exist — skipping.\n`);
        } else {
            console.log('📝 Creating Trainers...');

            await client.create({
                _type: 'trainer',
                name: 'Bernhard',
                role: 'Gründer & Owner',
                specs: 'Ernährungscoaching · Personal Training · Studioleitung',
                bio: [
                    createBlock('Gründer und Herzstück von GYM & BOX. Bernhard ist nicht nur zertifizierter Ernährungscoach und Personal Trainer, sondern unterrichtet auch als Dozent an einer deutschen Hochschule.'),
                    createBlock('Seine Leidenschaft für ganzheitliche Fitness hat ihn dazu gebracht, ein Konzept zu entwickeln, das weit über klassisches Training hinausgeht. Seine Vision: In Gesundheit investieren statt Krankheit behandeln.'),
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
                tags: ['Ernährungscoach', 'Personal Trainer', 'Hochschul-Dozent', 'Blackroll Trainer'],
                category: 'all',
            });
            console.log('  ✅ Created: Bernhard');

            await client.create({
                _type: 'trainer',
                name: 'Melanie',
                role: 'Health Coach',
                specs: 'Gesundheitstraining · Kinder · Pre/Postnatal',
                bio: [
                    createBlock('Spezialistin für gesundheitsorientiertes Training, Kindertraining und Schwangerschafts- sowie Rückbildungsfitness. Ihr Ansatz verbindet Fürsorge mit Leistung.'),
                    createBlock('Als ausgebildete Pädagogin entwickelt sie maßgeschneiderte, lustige und abwechslungsreiche Programme für Kinder von 7–10 Jahren.'),
                ],
                tags: ['Gesundheitstraining', 'Kindertraining', 'Schwangerschaftsfitness', 'Pädagogin'],
                category: 'gym',
            });
            console.log('  ✅ Created: Melanie');

            await client.create({
                _type: 'trainer',
                name: 'Daniel',
                role: 'Athletic Trainer',
                specs: 'Athletiktraining · Performance · CrossFit Coaching',
                bio: [
                    createBlock('Ehemaliger Profifußballer und zertifizierter Athletiktrainer. Daniel bringt jahrelange Erfahrung aus dem Leistungssport in jede Trainingseinheit ein.'),
                    createBlock('Spezialisiert auf funktionelles Krafttraining und athletische Performance — Daniel weiß, was es braucht um Spitzenleistung zu erzielen.'),
                ],
                tags: ['Ex-Profifußballer', 'Athletiktrainer', 'CrossFit Coach'],
                category: 'box',
            });
            console.log('  ✅ Created: Daniel');

            await client.create({
                _type: 'trainer',
                name: 'Mario',
                role: 'Strength Coach',
                specs: 'Krafttraining · Intelligent Strength',
                bio: [
                    createBlock('Mario hat 2018 seine Intelligent Strength Zertifizierung abgeschlossen und fokussiert sich auf fundiertes Krafttraining.'),
                    createBlock('Sein systematischer Ansatz hilft Mitgliedern, Kraft gezielt und sicher aufzubauen. Kraftaufbau ist eine Wissenschaft für sich.'),
                ],
                tags: ['Intelligent Strength', 'Krafttraining'],
                category: 'gym',
            });
            console.log('  ✅ Created: Mario');

            console.log('✅ All trainers created\n');
        }

        console.log('🎉 SUCCESS! All content has been created in Sanity!\n');
        console.log('Next steps:');
        console.log('1. Visit your Sanity Studio to see your content');
        console.log('2. Upload photos for trainers and page content');
        console.log('3. Edit and customize the content as needed\n');

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
