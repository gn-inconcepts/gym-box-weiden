/**
 * Sanity Content Population Script
 *
 * This script populates your Sanity CMS with initial content:
 * - Site Settings (with navigation, footer, stats)
 * - Services (13 services with correct pricing)
 * - Membership Pricing (8 plans: 5 gym + 3 box)
 * - Trainers (4 trainers)
 * - Page Content (hero images)
 * - Page Singletons: homePage, gymPage, boxPage, teamPage, kontaktPage, leistungenPage, preisePage
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

        // ── PAGE CONTENT (hero images) ──────────────────────────────────────
        const pageContentCount = await client.fetch(`count(*[_type == "pageContent"])`);
        if (pageContentCount > 0) {
            console.log(`⏭️  Skipping page content — ${pageContentCount} entries already exist\n`);
        } else {
            console.log('📄 Creating page content entries...');

            const pageContentEntries = [
                { pageKey: 'team-header', altText: 'Team Header — Unser Trainerteam', url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2670&auto=format&fit=crop' },
                { pageKey: 'gym-hero', altText: 'Gym Hero — Trainingsbereich', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop' },
                { pageKey: 'box-hero', altText: 'Box Hero — CrossFit Lakefront', url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop' },
                { pageKey: 'contact-hero', altText: 'Kontakt Hero — Training', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop' },
                { pageKey: 'services-hero', altText: 'Leistungen Hero — Fitness', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop' },
                { pageKey: 'pricing-hero', altText: 'Preise Hero — Mitgliedschaft', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2670&auto=format&fit=crop' },
            ];

            for (const entry of pageContentEntries) {
                // Upload the image to Sanity from URL
                const imageResponse = await fetch(entry.url);
                const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
                const imageAsset = await client.assets.upload('image', imageBuffer, {
                    filename: `${entry.pageKey}.jpg`,
                });

                await client.create({
                    _type: 'pageContent',
                    pageKey: entry.pageKey,
                    image: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: imageAsset._id,
                        },
                    },
                    altText: entry.altText,
                });
                console.log(`  ✅ Created: ${entry.pageKey}`);
            }

            console.log('✅ All page content created\n');
        }

        // ──────────────────────────────────────────────────
        // 5a. Expanded Site Settings (patch existing)
        // ──────────────────────────────────────────────────
        const settingsId = await client.fetch(`*[_type == "siteSettings"][0]._id`);
        if (settingsId) {
            const hasNav = await client.fetch(`*[_type == "siteSettings"][0].navigation`);
            if (hasNav && hasNav.length > 0) {
                console.log('⏭️  Site Settings already has navigation — skipping patch.\n');
            } else {
                console.log('📝 Patching Site Settings with navigation, footer & stats...');
                await client.patch(settingsId).set({
                    navigation: [
                        { _type: 'navLink', _key: randomUUID(), label: 'Home', href: '/' },
                        { _type: 'navLink', _key: randomUUID(), label: 'Das Gym', href: '/gym' },
                        { _type: 'navLink', _key: randomUUID(), label: 'The Box', href: '/box' },
                        { _type: 'navLink', _key: randomUUID(), label: 'Team', href: '/team' },
                        { _type: 'navLink', _key: randomUUID(), label: 'Leistungen', href: '/leistungen' },
                        { _type: 'navLink', _key: randomUUID(), label: 'Preise', href: '/preise' },
                        { _type: 'navLink', _key: randomUUID(), label: 'Kontakt', href: '/kontakt' },
                    ],
                    footerTagline: 'GESUNDHEIT IST ALLES',
                    footerDescription: 'Über 500 m² für Kraft, Ausdauer und Gemeinschaft — Gym & CrossFit Box unter einem Dach in Weiden am See.',
                    stats: [
                        { _type: 'statItem', _key: randomUUID(), value: '500', unit: 'm²', label: 'Trainingsfläche' },
                        { _type: 'statItem', _key: randomUUID(), value: '2016', unit: '', label: 'Gegründet' },
                        { _type: 'statItem', _key: randomUUID(), value: '14', unit: '+', label: 'Leistungen' },
                        { _type: 'statItem', _key: randomUUID(), value: '7', unit: '+', label: 'Zertifizierungen' },
                        { _type: 'statItem', _key: randomUUID(), value: '10', unit: '+', label: 'Kursangebote' },
                    ],
                }).commit();
                console.log('✅ Site Settings patched\n');
            }
        }

        // ──────────────────────────────────────────────────
        // 6. Home Page (singleton)
        // ──────────────────────────────────────────────────
        const existingHome = await client.fetch(`*[_type == "homePage"][0]._id`);
        if (existingHome) {
            console.log('⏭️  Home Page already exists — skipping.\n');
        } else {
            console.log('📝 Creating Home Page...');
            await client.createOrReplace({
                _id: 'homePage',
                _type: 'homePage',
                // Hero
                heroBadge: 'EST. 2014 — WEIDEN AM SEE',
                heroHeadingLine1: 'DEINE GESUNDHEIT.',
                heroHeadingLine2: 'DEIN LEBEN.',
                heroDescription: 'Über 500 m² für die Themen Bewegung, Ernährung, Regeneration und Reflexion und Gemeinschaft — Gym & CrossFit Box unter einem Dach.',
                heroVideoUrl: 'https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4',
                heroCta: [
                    { _type: 'ctaButton', _key: randomUUID(), text: 'Jetzt Probetraining vereinbaren', href: '/kontakt', variant: 'primary' },
                    { _type: 'ctaButton', _key: randomUUID(), text: 'Mehr erfahren', href: '#services', variant: 'outline' },
                ],
                // Brand Cards
                gymCardTitle: 'Das Gym',
                gymCardDescription: 'Krafttraining, Ausdauer und individuelle Betreuung auf höchstem Niveau. Dein Körper ist dein Kapital.',
                boxCardTitle: 'The Box',
                boxCardDescription: 'Community, funktionelles Training und constantly varied high intensity movement. Weak ends here.',
                // Philosophy
                philosophyLabel: 'Unsere Philosophie',
                philosophyHeading: 'Vier Säulen.',
                philosophyHeadingHighlight: 'Ein Ziel.',
                philosophyDescription: 'Wir glauben, dass Fitness mehr ist als nur Training. Unser ganzheitlicher Ansatz vereint vier Säulen zu einem nachhaltigen Lebensstil.',
                philosophyPillars: [
                    { _type: 'featureCard', _key: randomUUID(), title: 'Training', description: 'Individuell angepasstes Training mit zertifizierten Personal Trainern — von Kraft, Ausdauer über Mobilität, jeder Mensch hat andere Voraussetzungen, deshalb erstellen wir individuelle Pläne.', icon: 'dumbbell', number: '01' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Ernährung', description: 'Langfristige Ernährungsumstellung statt kurzfristiger Diäten — begleitet von professioneller Begleitung. Wir setzen auf nachhaltige Veränderung deiner Essgewohnheiten.', icon: 'apple', number: '02' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Regeneration', description: 'Dein Körper wächst in der Ruhephase — wir optimieren sie denn auch diese Phase trägt maßgeblich zum Erfolg bei. Genau deshalb ist auch die Regeneration ein wichtiger Baustein den wir behandeln.', icon: 'moon', number: '03' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Reflexion', description: 'Mentaltraining und Selbstreflexion für nachhaltigen Erfolg — im Training und im Leben. Resilienz und mentale Stärke sind der Schlüssel zu dauerhaftem Erfolg.', icon: 'brain', number: '04' },
                ],
                // Philosophy Detail
                philosophyDetailLabel: 'Unser Ansatz',
                philosophyDetailHeading: 'Unsere Philosophie,',
                philosophyDetailHeadingHighlight: 'Dein Mehrwert',
                philosophyDetailParagraphs: [
                    'Jede einzelne Einheit wird je nach Schwerpunkt von einem ausgebildeten Personaltrainer, unserer Sportphysiotherapeutin oder — was das Kindertraining angeht — von einer Kinderpädagogin geleitet.',
                    'Dieses Konzept gibt uns die Möglichkeit, mehr Menschen deutlich besser zu betreuen und ihren Zielen näher zu bringen.',
                ],
                philosophyDetailItems: [
                    { _type: 'featureCard', _key: randomUUID(), icon: 'clipboardCheck', title: 'Trainingspläne & Einweisung', description: 'Ausgangs- und Re-Checks als bewährte Tools für messbaren Erfolg. Wir überlassen nichts dem Zufall.' },
                    { _type: 'featureCard', _key: randomUUID(), icon: 'activity', title: 'Ganzheitlicher Fokus', description: 'Kraft, Stabilität, Flexibilität und Ausdauer — ergänzt durch Ernährung, Regeneration und Reflexion.' },
                    { _type: 'featureCard', _key: randomUUID(), icon: 'graduationCap', title: 'Vorträge & Weiterbildung', description: 'Regelmäßige Vorträge unserer Coaches und geladener Gäste runden das Angebot ab.' },
                ],
                // Services Showcase
                servicesHeading: 'Wir unterstützen dich mit unserem Wissen bei deinen Zielen',
                servicesItems: [
                    { _type: 'featureCard', _key: randomUUID(), icon: 'salad', title: 'Ernährungs Coaching', description: 'Ernährung ist unser erster Grundpfeiler in der Philosophie. Es gibt wenig mit dem man gerade am Anfang so viel erreichen kann wie mit einer langfristigen Ernährungsumstellung.', number: 'COACHING' },
                    { _type: 'featureCard', _key: randomUUID(), icon: 'trophy', title: 'Personal Training', description: 'Alle unsere Trainer sind zertifizierte und ausgebildete Trainer. Jeder von uns hat seine Spezialisierung und seine persönlichen Stärken. Wir unterstützen dich bei deinem Erfolg.', number: 'TRAINING' },
                    { _type: 'featureCard', _key: randomUUID(), icon: 'users', title: 'Ganzheitlicher Ansatz', description: 'Training, Ernährung, Regeneration und Reflexion — die 4 Säulen für nachhaltigen Erfolg und langfristige Gesundheit.', number: 'PHILOSOPHIE' },
                ],
                // CTA
                ctaHeading: 'BEREIT FÜR DEINEN',
                ctaHeadingHighlight: 'ERFOLG?',
                ctaDescription: 'Starte jetzt deine Reise zum Athleten des Lebens. Vereinbare ein kostenloses Erstgespräch.',
                ctaButton: { _type: 'ctaButton', text: 'KOSTENLOSE ERSTBERATUNG', href: '/kontakt', variant: 'primary' },
            });
            console.log('✅ Home Page created\n');
        }

        // ──────────────────────────────────────────────────
        // 7. Gym Page (singleton)
        // ──────────────────────────────────────────────────
        const existingGym = await client.fetch(`*[_type == "gymPage"][0]._id`);
        if (existingGym) {
            console.log('⏭️  Gym Page already exists — skipping.\n');
        } else {
            console.log('📝 Creating Gym Page...');
            await client.createOrReplace({
                _id: 'gymPage',
                _type: 'gymPage',
                // Header
                headerTitle: 'DAS GYM',
                headerSubtitle: 'Die Gesundheit ist unser wertvollstes Gut — ohne Gesundheit ist alles nichts.',
                // Philosophy
                philosophyLabel: 'Unsere Überzeugung',
                philosophyHeading: 'Für ein ganzheitlich',
                philosophyHeadingHighlight: 'tolles Leben',
                philosophyParagraphs: [
                    'Investiere jetzt in die Gesundheit anstatt später viel Geld zur Krankheitsbekämpfung auszugeben. Dies funktioniert nur ganzheitlich — und um das richtig umzusetzen, sind wir Trainer und Coaches mit individuellen Lösungen für Dich da.',
                    'Die vier wichtige Punkte sind dafür essentiell: Training – Ernährung – Regeneration – Reflexion. All das beinhaltet unser „Athlet des Lebens" Konzept. Nähere Infos über dein persönliches Paket, um dein Leben bestmöglich zu gestalten, bekommst du von unserem Team im Studio.',
                ],
                philosophyPillars: [
                    { _type: 'featureCard', _key: randomUUID(), title: 'Training', icon: 'dumbbell' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Ernährung', icon: 'apple' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Regeneration', icon: 'moon' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Reflexion', icon: 'brain' },
                ],
                // Was erwartet dich
                expectLabel: 'Was erwartet dich',
                expectHeading: 'Mehr als nur ein',
                expectHeadingHighlight: 'Fitnessstudio',
                expectParagraphs: [
                    'Das Herzstück sind unsere Coaches, Trainer und Therapeuten. Ausgebildet an mehr als 7 verschiedenen Instituten sowie an der Deutschen Hochschule für Prävention und Gesundheitsmanagement sind wir alle gemeinsam nie am Ruhen, was Aus- und Fortbildungen betrifft.',
                    'Bei uns findest du von Personaltrainern über Sportphysiotherapeuten, Ernährungs- und Mentaltrainer sowie Masseure alles, was das Gesundheits- und Leistungssportlerherz begehrt — unter einem Dach.',
                    'Die Zusammenarbeit mit Ärzten ist uns ebenfalls ein großes Anliegen. So können wir als Zielgruppe das Thema „Mensch" bedienen — ob Kinder, Spitzensportler, Rehapatienten oder Gesundheitssportler.',
                ],
                expectTags: ['Personal Trainer', 'Sportphysiotherapie', 'Ernährungscoaching', 'Mentaltraining', 'Masseure', 'Reha-Training'],
                // Features Grid
                featuresHeading: 'Alles unter',
                featuresHeadingHighlight: 'einem Dach',
                featuresItems: [
                    { _type: 'featureCard', _key: randomUUID(), title: 'Premium Equipment', description: 'Hochwertige Geräte von Firmen wie Eleiko, Gym80, Hammer Strength, Cross Axes Tech, Precor unv. auf über 500 m² Fläche bieten für jeden das Passende. Unser Equipmentpark wird laufend erneuert und erweitert um Abwechslung zu schaffen.', icon: 'dumbbell' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Familiäre Atmosphäre', description: 'Wir sind ein Familienunternehmen. Bei uns kennt man sich. Von 1 bis aktuell 92, vom Anfänger bis zum Leistungssportler — alle trainieren gemeinsam.', icon: 'users' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Ernährungstraining', description: 'Langfristige Umstellung statt kurzfristiger Diäten. Kein Verzicht, dafür das nötige Hintergrundwissen zu vermitteln ist unser Anspruch. Langfristige Ernährungsumstellung statt kurzfristiger Diäten — begleitet von professioneller Begleitung.', icon: 'apple' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Personal Training', description: 'Unsere zertifizierte Trainer und Coaches mit individueller Expertise erleichtern auf Wunsch mittels neuen Trainingsplänen, Rechecks und Personaltrainings das Dranbleiben.', icon: 'heartPulse' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Täglich Geöffnet', description: 'Wir haben täglich von 06:30 bis 22:00 Uhr — flexible Trainingszeiten für jeden Lebensstil.', icon: 'clock' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Ganzheitlicher Ansatz', description: 'Training, Ernährung, Regeneration und Reflexion — die 4 Säulen für nachhaltigen Erfolg. Jede einzelne Einheit wird je nach Schwerpunkt von einem ausgebildeten Personaltrainer geleitet.', icon: 'activity' },
                ],
                // All in One
                allInOneLabel: 'All in One',
                allInOneHeading: 'GYM oder BOX?',
                allInOneHeadingHighlight: 'Beides.',
                allInOneParagraphs: [
                    'Nachdem wir 2016 zusätzlich zu unserem GYM die „CrossFit Lakefront Box" aus dem Boden gestampft haben, können wir auch die Menschen die gerne in der Gruppe trainieren bestmöglich bedienen. Mehr Erfolge zu erzielen und nicht bloß eine „Gruppenbespaßung" anzubieten ist unser Standard.',
                    'Das Training in der Gruppe ist für viele Menschen eine große Hilfe, um motiviert am Ball zu bleiben. Vor allem im Zeitalter der Digitalisierung ist die persönliche Bindung zwischen den Mitgliedern und den Trainern ein enorm wichtiger Faktor.',
                    'Unser Anspruch war es, das Beste aus beiden Möglichkeiten zu schaffen — dies legte den Grundstein für das „All in One" Konzept und deshalb entstand zum GYM unsere „CrossFit Lakefront Box".',
                ],
                allInOneCta: { _type: 'ctaButton', text: 'The Box entdecken', href: '/box', variant: 'primary' },
                // Trainer Spotlight
                trainerSpotlight: {
                    _type: 'trainerSpotlight',
                    name: 'Bernhard',
                    role: 'Gründer & Owner',
                    bio: 'Nach 14 Jahren Polizeidienst mit weltweiten Aufgaben und als Mitglied einer österreichischen Einsatzeinheit verließ Bernhard Beidl den Staatsdienst, um als Trainer, Coach und Dozent zu arbeiten.',
                    specialties: ['Ernährungscoaching', 'Personal Training', 'Studioleitung'],
                },
            });
            console.log('✅ Gym Page created\n');
        }

        // ──────────────────────────────────────────────────
        // 8. Box Page (singleton)
        // ──────────────────────────────────────────────────
        const existingBox = await client.fetch(`*[_type == "boxPage"][0]._id`);
        if (existingBox) {
            console.log('⏭️  Box Page already exists — skipping.\n');
        } else {
            console.log('📝 Creating Box Page...');
            await client.createOrReplace({
                _id: 'boxPage',
                _type: 'boxPage',
                // Header
                headerTitle: 'THE BOX',
                headerSubtitle: 'CrossFit Lakefront — Weak Ends Here.',
                // Origin Story
                originLabel: 'CrossFit Lakefront',
                originHeading: 'Das',
                originHeadingHighlight: 'Herzensprojekt',
                originParagraphs: [
                    'CrossFit Lakefront öffnete 2016 das erste Mal seine Tore. Um unseren Members einen noch größeren Mehrwert zu bieten, wurden die Tore 2019 nochmals für ein Jahr geschlossen und die neue Location direkt neben dem Fitnessstudio geschaffen.',
                    'CrossFit Lakefront bietet geführtes Kleingruppentraining mit maximal 10 Teilnehmern. Dieses Konzept gibt uns die Möglichkeit, unsere Athleten besser zu betreuen und auf ihre individuellen Bedürfnisse einzugehen.',
                ],
                // Was ist CrossFit
                crossfitLabel: 'Was ist CrossFit?',
                crossfitHeading: 'Konstant variierend,',
                crossfitHeadingHighlight: 'funktionell & intensiv',
                crossfitParagraphs: [
                    'CrossFit ist eine konstant variierende Trainingsmethode, die auf hoher Intensität und funktionellen Bewegungen basiert. Es kombiniert Elemente aus Gewichtheben, Ausdauertraining und gymnastischen Übungen.',
                    'Das Besondere: CrossFit unterstützt dich in all deinen körperlichen Fähigkeiten. Egal ob du Gewicht verlieren, Ausdauer aufbauen, stärker oder beweglicher werden möchtest.',
                ],
                crossfitHighlightText: 'Was CrossFit jedoch so einzigartig macht, ist die Community.',
                // Core Values
                valuesHeading: 'CrossFit Lakefront',
                valuesHeadingHighlight: 'Erlebnis',
                valuesItems: [
                    { _type: 'featureCard', _key: randomUUID(), title: 'Community', description: 'Kleingruppen zwischen 2 und 10 Athleten. Qualität durch Coaching, Motivation durch Gruppendynamik.', icon: 'users' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Abwechslung', description: 'Keine Trainingseinheit gleicht der anderen. Warm-up, Skill/Kraft, WOD.', icon: 'activity' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Skalierbarkeit', description: 'Jeder kann mitmachen! Bewegungsabläufe, Gewichte und Wiederholungen werden individuell angepasst.', icon: 'layers' },
                    { _type: 'featureCard', _key: randomUUID(), title: 'Zusatzangebot', description: 'Zusätzlich Personaltraining oder individuelle Trainingspläne möglich.', icon: 'dumbbell' },
                ],
                // Class Structure
                classLabel: 'Training',
                classHeading: 'So funktioniert eine',
                classHeadingHighlight: 'Session',
                classPhases: [
                    { _type: 'classPhase', _key: randomUUID(), number: '01', title: 'Warm-Up', icon: 'flame', description: 'Gezielte Aufwärmphase mit Fokus auf generelle Erwärmung sowie Beweglichkeit — um den Körper auf das bevorstehende Training vorzubereiten und Verletzungen vorzubeugen.', duration: '10–15 Min.', focus: 'Mobilisation, Herzfrequenz, Aktivierung' },
                    { _type: 'classPhase', _key: randomUUID(), number: '02', title: 'Skill / Kraft', icon: 'dumbbell', description: 'Gezielter Kraft- und Muskelaufbau oder das Erlernen neuer Bewegungsabläufe. Hier arbeiten wir an spezifischen Bewegungsmustern und bauen systematisch Stärke auf.', duration: '15–20 Min.', focus: 'Gewichtheben, Technik, Progressive Overload' },
                    { _type: 'classPhase', _key: randomUUID(), number: '03', title: 'WOD', icon: 'activity', description: 'Workout of the Day — das Herzstück jeder Session. Intensiv, abwechslungsreich und auf alle Level skalierbar.', duration: '15–25 Min.', focus: 'AMRAP, EMOM, For Time — ständig wechselnd' },
                ],
                // GYM+BOX Story
                storyHeading: 'Von der Box zum',
                storyHeadingHighlight: 'All in One.',
                storyParagraph: 'Unser Anspruch war es, das Beste aus beiden Möglichkeiten zu schaffen — dies legte den Grundstein für den Bau von „THE BOX", welche mit unserem Studio verschmolzen ist.',
                storyBoxTitle: 'Erfolgsgeschichten bis hin zu Weltmeistern',
                storyBoxText: 'Die Kombination aus individuellem Training und Gruppendynamik hat bei uns nicht nur Gesundheitserfolge geschaffen, sondern auch Athleten auf Weltklasse-Niveau gebracht.',
                // Trainer Spotlight
                trainerSpotlight: {
                    _type: 'trainerSpotlight',
                    name: 'Daniel',
                    role: 'Athletic Trainer',
                    bio: 'Ehemaliger Profifußballer und zertifizierter Athletiktrainer. Daniel bringt jahrelange Erfahrung aus dem Leistungssport in jede Trainingseinheit ein. Sein Übergang vom aktiven Spieler zum Coach hat ihm eine einzigartige Perspektive gegeben.',
                    specialties: ['Athletiktraining', 'Performance', 'CrossFit Coaching'],
                },
            });
            console.log('✅ Box Page created\n');
        }

        // ──────────────────────────────────────────────────
        // 9. Team Page (singleton)
        // ──────────────────────────────────────────────────
        const existingTeam = await client.fetch(`*[_type == "teamPage"][0]._id`);
        if (existingTeam) {
            console.log('⏭️  Team Page already exists — skipping.\n');
        } else {
            console.log('📝 Creating Team Page...');
            await client.createOrReplace({
                _id: 'teamPage',
                _type: 'teamPage',
                // Header
                headerTitle: 'DAS TEAM',
                headerSubtitle: 'Expertise, Leidenschaft und ein gemeinsames Ziel.',
                // Intro
                introLabel: 'Dein Team',
                introHeading: 'Bestens',
                introHeadingHighlight: 'ausgebildet',
                introParagraph: 'Unser Team besteht aus bestens ausgebildeten Trainer/innen, welche verschiedenste Teilbereiche in Fitness und Ernährung abdecken. Ständiges Weiterbilden in den besten Ausbildungsinstituten Europas ist unser Maßstab.',
                // Warum Personaltrainer
                whyHeading: 'Warum ein',
                whyHeadingHighlight: 'Personaltrainer?',
                whyParagraph: 'Wer kennt es nicht — ist die erste Motivation dahin und die erwünschten Ergebnisse nicht sofort groß, holt einen rasch der Alltag wieder ein. Wir akzeptieren deine Ausreden nicht.',
                whyFeatures: [
                    { _type: 'featureCard', _key: randomUUID(), icon: 'eye', title: '4 Säulen', description: 'Bewegung, Ernährung, Regeneration und Reflexion — physisch und psychisch stärker.' },
                    { _type: 'featureCard', _key: randomUUID(), icon: 'shield', title: 'Selbstständigkeit', description: 'Unser Ziel: Du entwickelst ein Gesundheitsbewusstsein und kommst rasch ohne viel Hilfe aus.' },
                    { _type: 'featureCard', _key: randomUUID(), icon: 'users', title: 'Professionelle Begleitung', description: 'Dafür stehen wir mit unserem Namen. Dein Erfolg ist auch unser Erfolg.' },
                ],
                // Certifications
                certHeading: 'Über 7 Institute. Laufende Weiterbildung.',
                certParagraph: 'Unsere Trainer halten Zertifizierungen von über 7 verschiedenen Instituten und bilden sich laufend weiter. In Zusammenarbeit mit Ärzten bieten wir einen ganzheitlichen Ansatz, der weit über klassisches Fitnesstraining hinausgeht.',
            });
            console.log('✅ Team Page created\n');
        }

        // ──────────────────────────────────────────────────
        // 10. Kontakt Page (singleton)
        // ──────────────────────────────────────────────────
        const existingKontakt = await client.fetch(`*[_type == "kontaktPage"][0]._id`);
        if (existingKontakt) {
            console.log('⏭️  Kontakt Page already exists — skipping.\n');
        } else {
            console.log('📝 Creating Kontakt Page...');
            await client.createOrReplace({
                _id: 'kontaktPage',
                _type: 'kontaktPage',
                // Header
                headerTitle: 'KONTAKT',
                headerSubtitle: 'Ob Erstberatung oder Probetraining — wir sind für dich da.',
                // Contact Options
                contactOptions: [
                    { _key: randomUUID(), title: 'Erstberatung', text: 'Kostenlos und unverbindlich unser Gym und die Box kennenlernen.' },
                    { _key: randomUUID(), title: 'Gesundheitscheck', text: 'Körperanalyse und Herzfrequenzbestimmung für optimale Trainingsplanung.' },
                    { _key: randomUUID(), title: 'Personal Training', text: 'Individuelles Coaching mit einem unserer zertifizierten Trainer.' },
                    { _key: randomUUID(), title: 'Ernährungsberatung', text: 'Langfristige Ernährungsumstellung mit professionellem Coaching.' },
                ],
                // Form Section
                formLabel: 'Schreib uns',
                formHeading: 'Deine',
                formHeadingHighlight: 'Anfrage',
            });
            console.log('✅ Kontakt Page created\n');
        }

        // ──────────────────────────────────────────────────
        // 11. Leistungen Page (singleton)
        // ──────────────────────────────────────────────────
        const existingLeistungen = await client.fetch(`*[_type == "leistungenPage"][0]._id`);
        if (existingLeistungen) {
            console.log('⏭️  Leistungen Page already exists — skipping.\n');
        } else {
            console.log('📝 Creating Leistungen Page...');
            await client.createOrReplace({
                _id: 'leistungenPage',
                _type: 'leistungenPage',
                // Header
                headerTitle: 'LEISTUNGEN',
                headerSubtitle: 'Von Körperanalyse bis Firmen-Fitness — 15+ spezialisierte Services.',
                // Intro
                introBadge: 'Alles was du brauchst',
                introHeading: 'Für deine',
                introHeadingHighlight: 'Gesundheit',
                introDescription: 'Wir bieten dir nicht nur einen Ort zum Trainieren, sondern ein umfassendes Konzept für deinen Körper. Von der ersten Analyse bis zur langfristigen Betreuung.',
                // Featured Categories
                featuredCategories: [
                    { _type: 'featureCard', _key: randomUUID(), number: '01', title: 'Analyse & Diagnostik', description: 'Körperanalyse, Herzfrequenzbestimmung und Hautfaltenmessung — datenbasierte Grundlage für deinen Trainingsplan.' },
                    { _type: 'featureCard', _key: randomUUID(), number: '02', title: 'Coaching & Beratung', description: 'Ernährungs-, Resilienz- und Firmen-Fitness-Coaching. Ganzheitliche Betreuung für nachhaltigen Erfolg.' },
                    { _type: 'featureCard', _key: randomUUID(), number: '03', title: 'Training & Therapie', description: 'Personal Training, Kindertraining, Schwangerschaftsfitness und Physiotherapie — für jede Lebensphase.' },
                ],
                // Member Benefits
                benefitsHeading: 'Mitglieder-Vorteil',
                benefitsDescription: 'Als Mitglied profitierst du von stark reduzierten Preisen bei allen Services. Viele Leistungen sind bis zu 50% günstiger — ein weiterer Grund, Teil unserer Community zu werden.',
                benefitsCta: { _type: 'ctaButton', text: 'Mitgliedschaften ansehen', href: '/preise', variant: 'primary' },
            });
            console.log('✅ Leistungen Page created\n');
        }

        // ──────────────────────────────────────────────────
        // 12. Preise Page (singleton)
        // ──────────────────────────────────────────────────
        const existingPreise = await client.fetch(`*[_type == "preisePage"][0]._id`);
        if (existingPreise) {
            console.log('⏭️  Preise Page already exists — skipping.\n');
        } else {
            console.log('📝 Creating Preise Page...');
            await client.createOrReplace({
                _id: 'preisePage',
                _type: 'preisePage',
                // Header
                headerTitle: 'PREISE',
                headerSubtitle: 'Investiere in dich selbst. Faire Preise, volle Transparenz.',
                // Gym Section
                gymHeading: 'Das',
                gymHeadingHighlight: 'Gym',
                gymDescription: 'Krafttraining, Ausdauer und individuelle Betreuung',
                gymHighlightLabel: 'Beliebteste Wahl',
                // Box Section
                boxHeading: 'The',
                boxHeadingHighlight: 'Box',
                boxDescription: 'CrossFit Lakefront — Gruppentraining & Community',
                boxHighlightLabel: 'Best Value',
                // Info Section
                infoHeading: 'Startpaket Small & Inklusivleistungen',
                infoDescription: 'Startpaket Small einmalig €57. \nInkludiert sind: Körperzusammensetzungsanalyse mit Software-Auswertung, persönliche Zugangskarte und eine Personal Training Session mit Trainingsplanung und Orientierung.',
                infoHighlight: 'Bei 12-Monats-Vorauszahlung entfällt das Startpaket Small komplett.',
            });
            console.log('✅ Preise Page created\n');
        }

        console.log('🎉 SUCCESS! All content has been created in Sanity!\n');
        console.log('Next steps:');
        console.log('1. Visit your Sanity Studio to see your content');
        console.log('2. Replace placeholder images with your own photos');
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
