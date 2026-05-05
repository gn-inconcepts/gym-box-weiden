import type { Metadata } from 'next';
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ParallaxStrip } from "@/components/ui/parallax-strip";
import { TrainerSpotlight } from "@/components/home/trainer-spotlight";
import { Activity, Apple, Brain, Check, Clock, Dumbbell, HeartPulse, Moon } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { gymPageQuery } from "@/sanity/lib/page-queries";
import { GymPageData } from "@/types/page-content";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Das Gym | GYM & BOX',
    description: 'Professionelles Fitnessstudio in Weiden am See. Modernste Geräte von Eleiko, Gym80 und Hammer Strength, persönliches Training und eine motivierende Atmosphäre auf über 500 m².',
    openGraph: {
        title: 'Das Gym | GYM & BOX',
        description: 'Professionelles Fitnessstudio in Weiden am See. Modernste Geräte, persönliches Training und ganzheitliches Gesundheitskonzept.',
    },
    alternates: {
        canonical: '/gym',
    },
};

// Default Trainer Data
const defaultGymTrainer = {
    name: "Bernhard",
    role: "Gründer & Owner",
    image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=2573&auto=format&fit=crop",
    bio: "Nach 14 Jahren Polizeidienst mit weltweiten Aufgaben und als Mitglied einer österreichischen Einsatzeinheit verließ Bernhard Beidl den Staatsdienst, um als Trainer, Coach und Dozent zu arbeiten.",
    specialties: ["Ernährungscoaching", "Personal Training", "Studioleitung"]
};

const defaultFeatures = [
    { title: "Premium Equipment", text: "Hochwertige Geräte von Firmen wie Eleiko, Gym80, Hammer Strength, Cross Axes Tech, Precor unv. auf über 500 m² Fläche bieten für jeden das Passende. Unser Equipmentpark wird laufend erneuert und erweitert um Abwechslung zu schaffen.", icon: Dumbbell },
    { title: "Familiäre Atmosphäre", text: "Wir sind ein Familienunternehmen. Bei uns kennt man sich. Von 1 bis aktuell 92, vom Anfänger bis zum Leistungssportler — alle trainieren gemeinsam.", icon: UsersIcon },
    { title: "Ernährungstraining", text: "Langfristige Umstellung statt kurzfristiger Diäten. Kein Verzicht, dafür das nötige Hintergrundwissen zu vermitteln ist unser Anspruch. Langfristige Ernährungsumstellung statt kurzfristiger Diäten — begleitet von professioneller Begleitung.", icon: Apple },
    { title: "Personal Training", text: "Unsere zertifizierte Trainer und Coaches mit individueller Expertise erleichtern auf Wunsch mittels neuen Trainingsplänen, Rechecks und Personaltrainings das Dranbleiben.", icon: HeartPulse },
    { title: "Täglich Geöffnet", text: "Wir haben täglich von 06:30 bis 22:00 Uhr — flexible Trainingszeiten für jeden Lebensstil.", icon: Clock },
    { title: "Ganzheitlicher Ansatz", text: "Training, Ernährung, Regeneration und Reflexion — die 4 Säulen für nachhaltigen Erfolg. Jede einzelne Einheit wird je nach Schwerpunkt von einem ausgebildeten Personaltrainer geleitet.", icon: Activity },
];

const defaultPillars = [
    { icon: Dumbbell, text: "Training" },
    { icon: Apple, text: "Ernährung" },
    { icon: Moon, text: "Regeneration" },
    { icon: Brain, text: "Reflexion" },
];

export default async function GymPage() {
    let cms: GymPageData | null = null;

    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            cms = await client.fetch<GymPageData>(gymPageQuery);
        }
    } catch (error) {
        console.error("Failed to fetch gym page data:", error);
    }

    const headerImageUrl = cms?.headerImage
        ? urlFor(cms.headerImage)?.width(2670).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop";

    const philosophyImageUrl = cms?.philosophyImage
        ? urlFor(cms.philosophyImage)?.width(1200).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop";

    const expectImageUrl = cms?.expectImage
        ? urlFor(cms.expectImage)?.width(1200).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop";

    // Build trainer data from CMS or defaults
    const trainerData = cms?.trainerSpotlight?.trainer
        ? { name: cms.trainerSpotlight.trainer.name, role: cms.trainerSpotlight.trainer.role, image: typeof cms.trainerSpotlight.trainer.image === 'string' ? cms.trainerSpotlight.trainer.image : urlFor(cms.trainerSpotlight.trainer.image)?.width(800).url() ?? defaultGymTrainer.image, bio: cms.trainerSpotlight.trainer.specs ?? defaultGymTrainer.bio, specialties: defaultGymTrainer.specialties }
        : cms?.trainerSpotlight?.name
            ? { name: cms.trainerSpotlight.name, role: cms.trainerSpotlight.role ?? defaultGymTrainer.role, image: cms.trainerSpotlight.image ? urlFor(cms.trainerSpotlight.image)?.width(800).url() ?? defaultGymTrainer.image : defaultGymTrainer.image, bio: cms.trainerSpotlight.bio ?? defaultGymTrainer.bio, specialties: cms.trainerSpotlight.specialties ?? defaultGymTrainer.specialties }
            : defaultGymTrainer;

    // Build feature items from CMS or defaults
    const features = cms?.featuresItems?.length
        ? cms.featuresItems.map((item, i) => ({
            title: item.title ?? defaultFeatures[i]?.title ?? "",
            text: item.description ?? defaultFeatures[i]?.text ?? "",
            icon: defaultFeatures[i]?.icon ?? Dumbbell,
        }))
        : defaultFeatures;

    // Build pillar items from CMS or defaults
    const pillars = cms?.philosophyPillars?.length
        ? cms.philosophyPillars.map((item, i) => ({
            icon: defaultPillars[i]?.icon ?? Dumbbell,
            text: item.title ?? defaultPillars[i]?.text ?? "",
        }))
        : defaultPillars;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title={cms?.headerTitle ?? "DAS GYM"}
                    subtitle={cms?.headerSubtitle ?? "Die Gesundheit ist unser wertvollstes Gut — ohne Gesundheit ist alles nichts."}
                    image={headerImageUrl}
                    logo="/images/Bernhard_2022_SW_300ppi.png"
                />

                <ParallaxStrip text="KRAFT · AUSDAUER · GESUNDHEIT · PERFORMANCE · " />

                {/* PHILOSOPHY INTRO - Unsere Überzeugung */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-1 bg-brand-green"></span>
                                <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">{cms?.philosophyLabel ?? "Unsere Überzeugung"}</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                                {cms?.philosophyHeading ?? "Für ein ganzheitlich"}<br />
                                <span className="text-brand-green">{cms?.philosophyHeadingHighlight ?? "tolles Leben"}</span>
                            </h2>
                            {(cms?.philosophyParagraphs ?? [
                                "Investiere jetzt in die Gesundheit anstatt später viel Geld zur Krankheitsbekämpfung auszugeben. Dies funktioniert nur ganzheitlich — und um das richtig umzusetzen, sind wir Trainer und Coaches mit individuellen Lösungen für Dich da.",
                                "Die vier wichtige Punkte sind daf\u00fcr essentiell: Training \u2013 Ern\u00e4hrung \u2013 Regeneration \u2013 Reflexion. All das beinhaltet unser \u201EAthlet des Lebens\u201C Konzept. N\u00e4here Infos \u00fcber dein pers\u00f6nliches Paket, um dein Leben bestm\u00f6glich zu gestalten, bekommst du von unserem Team im Studio.",
                            ]).map((p, i) => (
                                <p key={i} className="text-brand-gray-light text-lg leading-relaxed mb-6">{p}</p>
                            ))}

                            <ul className="space-y-4 mt-8">
                                {pillars.map((item) => (
                                    <li key={item.text} className="flex items-center gap-4 p-4 rounded-xl bg-brand-dark border border-white/5">
                                        <item.icon className="w-6 h-6 text-brand-green" />
                                        <span className="font-display text-xl tracking-wide">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-brand-dark">
                            <Image
                                src={philosophyImageUrl}
                                alt="Gym Philosophy"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* WAS ERWARTET DICH */}
                <section className="py-12 md:py-24 bg-brand-dark">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5">
                                <Image
                                    src={expectImageUrl}
                                    alt="Coaches"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="order-1 lg:order-2">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="w-12 h-1 bg-brand-green"></span>
                                    <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">{cms?.expectLabel ?? "Was erwartet dich"}</span>
                                </div>
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                                    {cms?.expectHeading ?? "Mehr als nur ein"} <span className="text-brand-green">{cms?.expectHeadingHighlight ?? "Fitnessstudio"}</span>
                                </h2>
                                {(cms?.expectParagraphs ?? [
                                    "Das Herzstück sind unsere Coaches, Trainer und Therapeuten. Ausgebildet an mehr als 7 verschiedenen Instituten sowie an der Deutschen Hochschule für Prävention und Gesundheitsmanagement sind wir alle gemeinsam nie am Ruhen, was Aus- und Fortbildungen betrifft.",
                                    "Bei uns findest du von Personaltrainern über Sportphysiotherapeuten, Ernährungs- und Mentaltrainer sowie Masseure alles, was das Gesundheits- und Leistungssportlerherz begehrt — unter einem Dach.",
                                    "Die Zusammenarbeit mit \u00c4rzten ist uns ebenfalls ein gro\u00dfes Anliegen. So k\u00f6nnen wir als Zielgruppe das Thema \u201EMensch\u201C bedienen \u2014 ob Kinder, Spitzensportler, Rehapatienten oder Gesundheitssportler.",
                                ]).map((p, i) => (
                                    <p key={i} className="text-brand-gray-light text-lg leading-relaxed mb-6">{p}</p>
                                ))}

                                <div className="flex flex-wrap gap-2">
                                    {(cms?.expectTags ?? ["Personal Trainer", "Sportphysiotherapie", "Ernährungscoaching", "Mentaltraining", "Masseure", "Reha-Training"]).map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-brand-black rounded-full border border-white/10 text-sm">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl">{cms?.featuresHeading ?? "Alles unter"} <span className="text-brand-green">{cms?.featuresHeadingHighlight ?? "einem Dach"}</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="p-8 rounded-2xl bg-brand-dark border border-white/5 hover:border-brand-green/30 transition-colors group">
                                <feature.icon className="w-10 h-10 text-brand-green mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display text-2xl mb-4">{feature.title}</h3>
                                <p className="text-brand-gray-light leading-relaxed">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ALL IN ONE - GYM oder BOX? Beides. */}
                <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <span className="w-12 h-1 bg-brand-green"></span>
                                <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">{cms?.allInOneLabel ?? "All in One"}</span>
                                <span className="w-12 h-1 bg-brand-green"></span>
                            </div>
                            <h2 className="font-display text-4xl md:text-6xl mb-8">{cms?.allInOneHeading ?? "GYM oder BOX?"} <br /><span className="text-brand-green">{cms?.allInOneHeadingHighlight ?? "Beides."}</span></h2>
                            {(cms?.allInOneParagraphs ?? [
                                "Nachdem wir 2016 zus\u00e4tzlich zu unserem GYM die \u201ECrossFit Lakefront Box\u201C aus dem Boden gestampft haben, k\u00f6nnen wir auch die Menschen die gerne in der Gruppe trainieren bestm\u00f6glich bedienen. Mehr Erfolge zu erzielen und nicht blo\u00df eine \u201EGruppenbespa\u00dfung\u201C anzubieten ist unser Standard.",
                                "Das Training in der Gruppe ist f\u00fcr viele Menschen eine gro\u00dfe Hilfe, um motiviert am Ball zu bleiben. Vor allem im Zeitalter der Digitalisierung ist die pers\u00f6nliche Bindung zwischen den Mitgliedern und den Trainern ein enorm wichtiger Faktor.",
                                "Unser Anspruch war es, das Beste aus beiden M\u00f6glichkeiten zu schaffen \u2014 dies legte den Grundstein f\u00fcr das \u201EAll in One\u201C Konzept und deshalb entstand zum GYM unsere \u201ECrossFit Lakefront Box\u201C.",
                            ]).map((p, i) => (
                                <p key={i} className="text-base md:text-xl text-brand-gray-light mb-6 leading-relaxed md:leading-relaxed">{p}</p>
                            ))}

                            <div className="inline-block p-1 rounded-full bg-brand-black border border-white/10">
                                <a href={cms?.allInOneCta?.href ?? "/box"} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-green text-brand-black font-bold hover:bg-white transition-colors">
                                    {cms?.allInOneCta?.text ?? "The Box entdecken"} <Check className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <TrainerSpotlight trainer={trainerData} />
            </main>
            <Footer />
        </div>
    );
}

// Helper icons
function UsersIcon({ className }: { className?: string }) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
}
