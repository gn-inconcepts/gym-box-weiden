import type { Metadata } from 'next';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ServiceFilter } from "@/components/services/service-filter";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import { leistungenPageQuery } from "@/sanity/lib/page-queries";
import { Service } from "@/types/sanity";
import { LeistungenPageData } from "@/types/page-content";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
    title: 'Leistungen | GYM & BOX',
    description: 'Unsere Services: Personal Training, Ernährungscoaching, Körperanalyse, Physiotherapie, Kindertraining und mehr. Über 15 spezialisierte Leistungen in Weiden am See.',
    openGraph: {
        title: 'Leistungen | GYM & BOX',
        description: 'Über 15 spezialisierte Fitness- und Gesundheitsservices in Weiden am See. Von Körperanalyse bis Firmen-Fitness.',
    },
    alternates: {
        canonical: '/leistungen',
    },
};

// Fallback data
const fallbackServices: Service[] = [
    { _id: "1", name: 'Körperanalyse', description: 'Körperzusammensetzungsanalyse mittels Abmessungen, BIA und Software. Grundlage für jede Trainingsplanung.', priceMember: '€20', priceNonMember: '€30', category: 'analyse', icon: 'activity' },
    { _id: "2", name: 'Trainingsplanung', description: '12-Wochen personalisierter Trainingsplan mit Orientierung, Ausgangscheck und Chipkarte.', priceMember: '€57', priceNonMember: '€147', category: 'training', icon: 'dumbbell' },
    { _id: "3", name: 'Herzfrequenzbestimmung', description: 'Fitness Vitaltest durch Vitalmonitor. EKG-Analyse zur Bestimmung deiner Trainingsherzfrequenz inkl. 8-Wochen Ausdauertrainingsplanung.', priceMember: '€40', priceNonMember: '€70', category: 'analyse', icon: 'heartPulse' },
    { _id: "4", name: 'Ernährungscoaching', description: 'Einstündige Beratung zu Kalorienverbrauch und Ernährungszusammensetzung. Langfristige Umstellung statt Crash-Diät.', priceMember: '€75', priceNonMember: '€149', category: 'coaching', icon: 'apple' },
    { _id: "5", name: 'KCAL-Bedarfsrechnung', description: 'Medizingeräte-Ausleihe (mind. 4 Tage tragen) zur exakten Kalorienbedarfsermittlung inkl. Software-Analyse.', priceMember: '€75', priceNonMember: '€120', category: 'analyse', icon: 'activity' },
    { _id: "6", name: 'Resilienz Coaching', description: 'Resilienz-Coaching zur Verbesserung der Widerstandsfähigkeit inkl. Hilfestellung zur Zielerreichung.', priceMember: '€75', priceNonMember: '€149', category: 'coaching', icon: 'brain' },
    { _id: "7", name: 'Physiotherapie', description: 'Empfohlen bei Schmerzen und Verletzungen. Kommunikation zwischen Physiotherapeut und sportlichem Reha-Trainer.', priceMember: '€75', priceNonMember: '€75', category: 'therapie', icon: 'user' },
    { _id: "8", name: 'Personal Training', description: 'Individuelles Coaching mit zertifizierten Trainern. Neuer Plan nach je 12 Einheiten.', priceMember: '€40 / Einheit', priceNonMember: '€90 / Einheit', category: 'training', icon: 'dumbbell' },
    { _id: "9", name: 'Kindertraining', description: 'Maßgeschneidertes, lustiges und abwechslungsreiches Programm für Kinder von 7–10 Jahren.', priceMember: '€100 / 10er Block', priceNonMember: '€100 / 10er Block', category: 'training', icon: 'users' },
    { _id: "10", name: 'Hautfaltenmessung', description: 'Körperfettanteil-Bestimmung mittels Harpenden-Caliper inkl. Lifestyle-Tipps.', priceMember: '€25', priceNonMember: '€50', category: 'analyse', icon: 'search' },
    { _id: "11", name: 'Schwangerschaftstraining', description: 'Spezialisierte Trainingsplanung während der Schwangerschaft. Trainerin mit dedizierter Ausbildung.', priceMember: '€50', priceNonMember: '€70', category: 'therapie', icon: 'user' },
    { _id: "12", name: 'Taping', description: 'Therapeutisches Taping durch ROCKDOCS-Spezialisten in Koordination mit Physiotherapeut.', priceMember: '€19,90', priceNonMember: 'nach Verbrauch', category: 'therapie', icon: 'activity' },
    { _id: "13", name: 'Firmen-Fitness', description: 'Gesunde Mitarbeiter*innen sind zufriedene und produktive Mitarbeiter*innen. Kostenloses Beratungsgespräch.', priceMember: 'Auf Anfrage', priceNonMember: 'Auf Anfrage', category: 'coaching', icon: 'users' },
];

const defaultFeaturedCategories = [
    { num: "01", title: "Analyse & Diagnostik", text: "Körperanalyse, Herzfrequenzbestimmung und Hautfaltenmessung — datenbasierte Grundlage für deinen Trainingsplan." },
    { num: "02", title: "Coaching & Beratung", text: "Ernährungs-, Resilienz- und Firmen-Fitness-Coaching. Ganzheitliche Betreuung für nachhaltigen Erfolg." },
    { num: "03", title: "Training & Therapie", text: "Personal Training, Kindertraining, Schwangerschaftsfitness und Physiotherapie — für jede Lebensphase." },
];

export const revalidate = 60;

export default async function ServicesPage() {
    let services: Service[] = [];
    let cms: LeistungenPageData | null = null;

    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            [services, cms] = await Promise.all([
                client.fetch(servicesQuery),
                client.fetch<LeistungenPageData>(leistungenPageQuery),
            ]);
        }
    } catch (error) {
        console.error("Failed to fetch services:", error);
    }

    const displayedServices = services.length > 0 ? services : fallbackServices;

    const headerImageUrl = cms?.headerImage
        ? urlFor(cms.headerImage)?.width(2670).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop";

    const benefitsImageUrl = cms?.benefitsImage
        ? urlFor(cms.benefitsImage)?.width(1600).quality(80).format('webp').url() ?? null
        : null;

    const featuredCategories = cms?.featuredCategories?.length
        ? cms.featuredCategories.map((item, i) => ({
            num: item.number ?? defaultFeaturedCategories[i]?.num ?? String(i + 1).padStart(2, '0'),
            title: item.title ?? defaultFeaturedCategories[i]?.title ?? "",
            text: item.description ?? defaultFeaturedCategories[i]?.text ?? "",
        }))
        : defaultFeaturedCategories;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title={cms?.headerTitle ?? "LEISTUNGEN"}
                    subtitle={cms?.headerSubtitle ?? "Von Körperanalyse bis Firmen-Fitness — 15+ spezialisierte Services."}
                    image={headerImageUrl}
                />

                {/* INTRO */}
                <section className="py-12 md:py-24 container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-bold rounded-full mb-6">
                            {cms?.introBadge ?? "Alles was du brauchst"}
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl mb-6 text-brand-white">{cms?.introHeading ?? "Für deine"} <span className="text-brand-green">{cms?.introHeadingHighlight ?? "Gesundheit"}</span></h2>
                        <p className="text-xl text-brand-gray-light leading-relaxed">
                            {cms?.introDescription ?? "Wir bieten dir nicht nur einen Ort zum Trainieren, sondern ein umfassendes Konzept für deinen Körper. Von der ersten Analyse bis zur langfristigen Betreuung."}
                        </p>
                    </div>
                </section>

                {/* FEATURED SERVICES */}
                <section className="pb-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredCategories.map((item) => (
                            <div key={item.num} className="p-8 bg-brand-dark rounded-2xl border border-white/5 relative group hover:bg-brand-green transition-colors duration-500">
                                <span className="font-display text-6xl text-brand-black/20 absolute top-4 right-6 group-hover:text-brand-black/10 transition-colors">{item.num}</span>
                                <h3 className="font-display text-2xl mb-4 relative z-10 group-hover:text-brand-black transition-colors">{item.title}</h3>
                                <p className="text-brand-gray-light relative z-10 group-hover:text-brand-black/80 transition-colors">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FULL LIST */}
                <section className="py-12 md:py-24 bg-brand-black relative">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl md:text-4xl">Alle Services im <span className="text-brand-green">Detail</span></h2>
                        </div>
                        <ServiceFilter services={displayedServices} />
                    </div>
                </section>

                {/* MEMBER BENEFITS */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    {benefitsImageUrl && (
                        <div className="relative aspect-[16/7] max-w-5xl mx-auto rounded-2xl overflow-hidden mb-12 border border-white/5">
                            <Image src={benefitsImageUrl} alt="Mitglieder-Vorteil" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
                        </div>
                    )}
                    <div className="bg-brand-dark border border-white/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="font-display text-4xl md:text-5xl mb-6">{cms?.benefitsHeading ?? "Mitglieder-Vorteil"}</h2>
                            <p className="text-base md:text-xl text-brand-gray-light mb-10 leading-snug md:leading-relaxed">
                                {cms?.benefitsDescription ?? "Als Mitglied profitierst du von stark reduzierten Preisen bei allen Services. Viele Leistungen sind bis zu 50% günstiger — ein weiterer Grund, Teil unserer Community zu werden."}
                            </p>
                            <Link href={cms?.benefitsCta?.href ?? "/preise"} className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green text-brand-black font-bold rounded-full hover:bg-white transition-colors">
                                {cms?.benefitsCta?.text ?? "Mitgliedschaften ansehen"} <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
