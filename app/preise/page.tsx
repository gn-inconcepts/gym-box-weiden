import type { Metadata } from 'next';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Check, Info } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { pricingsQuery } from "@/sanity/lib/queries";
import { preisePageQuery } from "@/sanity/lib/page-queries";
import { Pricing } from "@/types/sanity";
import { PreisePageData } from "@/types/page-content";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
    title: 'Preise & Mitgliedschaften | GYM & BOX',
    description: 'Faire und transparente Preise für Gym und CrossFit Box in Weiden am See. Flexible Mitgliedschaften ab 35 Euro pro Monat. Investiere in deine Gesundheit.',
    openGraph: {
        title: 'Preise & Mitgliedschaften | GYM & BOX',
        description: 'Flexible Mitgliedschaften für Gym und CrossFit Box in Weiden am See. Faire Preise, volle Transparenz.',
    },
    alternates: {
        canonical: '/preise',
    },
};

// Fallback data
const fallbackPricings: Pricing[] = [
    { _id: "g1", title: "Weekend", price: 35, interval: "/ Monat", category: "gym", recommended: false, features: ["Wochenend-Zugang", "Alle Geräte & Free Weights", "Umkleiden & Duschen"] },
    { _id: "g2", title: "Abend", price: 45, interval: "/ Monat", category: "gym", recommended: false, features: ["Abend-Zugang täglich", "Alle Geräte & Free Weights", "Umkleiden & Duschen"] },
    { _id: "g3", title: "Business", price: 55, interval: "/ Monat", category: "gym", recommended: false, features: ["Abends ab 19:00", "Wochenende ganztags", "Ideal für Berufstätige"] },
    { _id: "g4", title: "Early Bird", price: 64, interval: "/ Monat", category: "gym", recommended: false, features: ["Ganztags bis 16:30", "Alle Geräte & Free Weights", "Inkl. Körperanalyse"] },
    { _id: "g-main", title: "Vollmitgliedschaft", price: 79, interval: "/ Monat", category: "gym", recommended: true, features: ["Uneingeschränkter Zugang täglich 06:30–22:00", "Inkl. Körperanalyse", "Trainingsplan-Erstellung", "1x Personal Training Session"] },
    { _id: "b1", title: "10er Karte", price: 150, interval: "einmalig", category: "box", recommended: false, features: ["10 Kursbesuche", "Flexibel einsetzbar", "Gym-Mitglieder: €100"] },
    { _id: "b2", title: "Early Bird", price: 59, interval: "/ Monat", category: "box", recommended: false, features: ["Morgenkurse bis 12:30", "Alle Kurse im Zeitfenster", "Inkl. Körperanalyse"] },
    { _id: "b-main", title: "Box Full", price: 79, interval: "/ Monat", category: "box", recommended: true, features: ["Uneingeschränkter Zugang", "Alle Kurse & Sessions", "Inkl. Körperanalyse"] },
];

export const revalidate = 60;

export default async function PricingPage() {
    let pricings: Pricing[] = [];
    let cms: PreisePageData | null = null;

    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            [pricings, cms] = await Promise.all([
                client.fetch(pricingsQuery),
                client.fetch<PreisePageData>(preisePageQuery),
            ]);
        }
    } catch (error) {
        console.error("Failed to fetch pricings:", error);
    }

    const displayedPricings = pricings.length > 0 ? pricings : fallbackPricings;

    const gymPricings = displayedPricings.filter(p => p.category === "gym" && !p.recommended);
    const gymHighlight = displayedPricings.find(p => p.category === "gym" && p.recommended);

    const boxPricings = displayedPricings.filter(p => p.category === "box" && !p.recommended);
    const boxHighlight = displayedPricings.find(p => p.category === "box" && p.recommended);

    const headerImageUrl = cms?.headerImage
        ? urlFor(cms.headerImage)?.width(2670).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1554284126-aa1320d36b82?q=80&w=2670&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1554284126-aa1320d36b82?q=80&w=2670&auto=format&fit=crop";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title={cms?.headerTitle ?? "PREISE"}
                    subtitle={cms?.headerSubtitle ?? "Investiere in dich selbst. Faire Preise, volle Transparenz."}
                    image={headerImageUrl}
                />

                {/* GYM PRICING */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 bg-brand-black rounded-2xl flex items-center justify-center font-display text-3xl font-bold border border-white/10 shrink-0">
                            <span className="text-white">G</span>
                        </div>
                        <div>
                            <h2 className="font-display text-4xl">{cms?.gymHeading ?? "Das"} <span className="text-brand-green">{cms?.gymHeadingHighlight ?? "Gym"}</span></h2>
                            <p className="text-brand-gray-light">{cms?.gymDescription ?? "Krafttraining, Ausdauer und individuelle Betreuung"}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gymPricings.map(plan => (
                            <div key={plan._id} className="flex flex-col p-8 bg-brand-dark rounded-2xl border border-white/5 hover:border-brand-green/30 transition-colors">
                                <h3 className="font-display text-2xl mb-3">{plan.title}</h3>
                                <div className="mb-6">
                                    {plan.pricePrefix && (
                                        <span className="text-brand-gray text-sm mr-1">{plan.pricePrefix}</span>
                                    )}
                                    <span className="text-3xl font-bold text-white">€{plan.price}</span>
                                    <span className="text-brand-gray text-sm">{plan.interval}</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {plan.features && plan.features.map(f => (
                                        <li key={f} className="flex gap-3 text-sm text-brand-gray-light">
                                            <Check className="w-4 h-4 text-brand-green shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/kontakt" className="w-full py-3 rounded-lg border border-white/10 text-center font-bold hover:bg-white hover:text-black transition-colors">
                                    Anfragen
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Featured Gym Plan */}
                    {gymHighlight && (
                        <div className="mt-8 p-1 rounded-2xl bg-gradient-to-r from-brand-green via-white to-brand-green">
                            <div className="bg-brand-black rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <div className="inline-block px-3 py-1 bg-brand-green text-brand-black text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                                        {cms?.gymHighlightLabel ?? "Beliebteste Wahl"}
                                    </div>
                                    <h3 className="font-display text-3xl md:text-4xl mb-2">{gymHighlight.title}</h3>
                                    <p className="text-brand-gray-light mb-6 md:mb-0 max-w-xl">
                                        {gymHighlight.description
                                            ? gymHighlight.description
                                            : (gymHighlight.features && gymHighlight.features.join(". ") + ".")}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
                                    <div className="text-center md:text-right">
                                        {gymHighlight.pricePrefix && (
                                            <span className="block text-brand-gray text-sm">{gymHighlight.pricePrefix}</span>
                                        )}
                                        <span className="block text-4xl md:text-5xl font-bold text-white">€{gymHighlight.price}</span>
                                        <span className="text-brand-gray text-sm">{gymHighlight.interval}</span>
                                    </div>
                                    <Link href="/kontakt" className="px-8 py-3 bg-brand-green text-brand-black font-bold rounded-lg hover:bg-white transition-colors">
                                        Jetzt starten
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* BOX PRICING */}
                <section className="py-12 md:py-24 bg-brand-dark">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-16 h-16 bg-brand-black rounded-2xl flex items-center justify-center font-display text-3xl font-bold border border-white/10 shrink-0">
                                <span className="text-white">B</span>
                            </div>
                            <div>
                                <h2 className="font-display text-4xl">{cms?.boxHeading ?? "The"} <span className="text-brand-green">{cms?.boxHeadingHighlight ?? "Box"}</span></h2>
                                <p className="text-brand-gray-light">{cms?.boxDescription ?? "CrossFit Lakefront — Gruppentraining & Community"}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {boxPricings.map(plan => (
                                <div key={plan._id} className="p-8 bg-brand-black rounded-2xl border border-white/5 border-l-4 border-l-brand-gray-light/20">
                                    <h3 className="font-display text-2xl mb-3">{plan.title}</h3>
                                    <div className="mb-6">
                                        {plan.pricePrefix && (
                                            <span className="text-brand-gray text-sm mr-1">{plan.pricePrefix}</span>
                                        )}
                                        <span className="text-3xl font-bold text-white">€{plan.price}</span>
                                        <span className="text-brand-gray text-sm"> {plan.interval}</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features && plan.features.map(f => (
                                            <li key={f} className="flex gap-3 text-sm text-brand-gray-light"><Check className="w-4 h-4 text-brand-green" /> {f}</li>
                                        ))}
                                    </ul>
                                    <Link href="/kontakt" className="block w-full py-3 rounded-lg border border-white/10 text-center font-bold hover:bg-white hover:text-black transition-colors">
                                        Anfragen
                                    </Link>
                                </div>
                            ))}

                            {boxHighlight && (
                                <div className="p-1 rounded-2xl bg-gradient-to-br from-brand-green to-white relative">
                                    <div className="absolute top-0 right-0 p-3">
                                        <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">{cms?.boxHighlightLabel ?? "Best Value"}</span>
                                    </div>
                                    <div className="h-full p-8 bg-brand-black rounded-xl flex flex-col">
                                        <h3 className="font-display text-2xl mb-3 text-brand-green">{boxHighlight.title}</h3>
                                        <div className="mb-6">
                                            {boxHighlight.pricePrefix && (
                                                <span className="text-brand-gray text-sm mr-1">{boxHighlight.pricePrefix}</span>
                                            )}
                                            <span className="text-3xl font-bold text-white">€{boxHighlight.price}</span>
                                            <span className="text-brand-gray text-sm"> {boxHighlight.interval}</span>
                                        </div>
                                        {boxHighlight.description && (
                                            <p className="text-sm text-brand-gray-light mb-6">{boxHighlight.description}</p>
                                        )}
                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {boxHighlight.features && boxHighlight.features.map(f => (
                                                <li key={f} className="flex gap-3 text-sm text-brand-gray-light"><Check className="w-4 h-4 text-brand-green" /> {f}</li>
                                            ))}
                                        </ul>
                                        <Link href="/kontakt" className="block w-full py-3 bg-brand-green text-brand-black rounded-lg text-center font-bold hover:bg-white transition-colors">
                                            Jetzt starten
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* INFO SECTION */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="bg-brand-dark/50 border border-white/10 p-8 rounded-2xl flex items-start gap-6 max-w-4xl mx-auto">
                        <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green shrink-0">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-display text-xl mb-2">{cms?.infoHeading ?? "Startpaket Small & Inklusivleistungen"}</h2>
                            <p className="text-brand-gray-light leading-relaxed whitespace-pre-line">
                                {cms?.infoDescription ?? "Startpaket Small einmalig €57. \nInkludiert sind: Körperzusammensetzungsanalyse mit Software-Auswertung, persönliche Zugangskarte und eine Personal Training Session mit Trainingsplanung und Orientierung."}
                            </p>
                            <p className="mt-4 font-bold text-brand-green">
                                {cms?.infoHighlight ?? "Bei 12-Monats-Vorauszahlung entfällt das Startpaket Small komplett."}
                            </p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
