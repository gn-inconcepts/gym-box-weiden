import type { Metadata } from 'next';
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ParallaxStrip } from "@/components/ui/parallax-strip";
import { TrainerSpotlight } from "@/components/home/trainer-spotlight";
import { ClassAccordion } from "@/components/box/class-accordion";
import { DisciplinesLevels } from "@/components/box/disciplines-levels";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { Dumbbell, Users, Activity, Layers } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { boxPageQuery } from "@/sanity/lib/page-queries";
import { BoxPageData } from "@/types/page-content";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'The Box — CrossFit Lakefront | GYM & BOX',
    description: 'CrossFit Lakefront in Weiden am See. Funktionelles Kleingruppentraining mit max. 10 Teilnehmern, professionelles Coaching und starke Community. Weak Ends Here.',
    openGraph: {
        title: 'The Box — CrossFit Lakefront | GYM & BOX',
        description: 'CrossFit Lakefront in Weiden am See. Funktionelles Kleingruppentraining, professionelles Coaching und starke Community.',
    },
    alternates: {
        canonical: '/box',
    },
};

// Default Trainer Data for Daniel
const defaultBoxTrainer = {
    name: "Daniel",
    role: "Athletic Trainer",
    image: "https://images.unsplash.com/photo-1568218152033-b248bd8b1220?q=80&w=2522&auto=format&fit=crop",
    bio: "Ehemaliger Profifußballer und zertifizierter Athletiktrainer. Daniel bringt jahrelange Erfahrung aus dem Leistungssport in jede Trainingseinheit ein. Sein Übergang vom aktiven Spieler zum Coach hat ihm eine einzigartige Perspektive gegeben.",
    specialties: ["Athletiktraining", "Performance", "CrossFit Coaching"]
};

const defaultValues = [
    { title: "Community", text: "Kleingruppen zwischen 2 und 10 Athleten. Qualität durch Coaching, Motivation durch Gruppendynamik.", icon: Users },
    { title: "Abwechslung", text: "Keine Trainingseinheit gleicht der anderen. Warm-up, Skill/Kraft, WOD.", icon: Activity },
    { title: "Skalierbarkeit", text: "Jeder kann mitmachen! Bewegungsabläufe, Gewichte und Wiederholungen werden individuell angepasst.", icon: Layers },
    { title: "Zusatzangebot", text: "Zusätzlich Personaltraining oder individuelle Trainingspläne möglich.", icon: Dumbbell },
];

export default async function BoxPage() {
    let cms: BoxPageData | null = null;

    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            cms = await client.fetch<BoxPageData>(boxPageQuery);
        }
    } catch (error) {
        console.error("Failed to fetch box page data:", error);
    }

    const headerImageUrl = cms?.headerImage
        ? urlFor(cms.headerImage)?.width(2670).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop";

    const originImageUrl = cms?.originImage
        ? urlFor(cms.originImage)?.width(1200).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=2670&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=2670&auto=format&fit=crop";

    const crossfitImageUrl = cms?.crossfitImage
        ? urlFor(cms.crossfitImage)?.width(1200).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2670&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2670&auto=format&fit=crop";

    // Build trainer data from CMS or defaults
    const trainerData = cms?.trainerSpotlight?.trainer
        ? { name: cms.trainerSpotlight.trainer.name, role: cms.trainerSpotlight.trainer.role, image: typeof cms.trainerSpotlight.trainer.image === 'string' ? cms.trainerSpotlight.trainer.image : urlFor(cms.trainerSpotlight.trainer.image)?.width(800).url() ?? defaultBoxTrainer.image, bio: cms.trainerSpotlight.trainer.specs ?? defaultBoxTrainer.bio, specialties: defaultBoxTrainer.specialties }
        : cms?.trainerSpotlight?.name
            ? { name: cms.trainerSpotlight.name, role: cms.trainerSpotlight.role ?? defaultBoxTrainer.role, image: cms.trainerSpotlight.image ? urlFor(cms.trainerSpotlight.image)?.width(800).url() ?? defaultBoxTrainer.image : defaultBoxTrainer.image, bio: cms.trainerSpotlight.bio ?? defaultBoxTrainer.bio, specialties: cms.trainerSpotlight.specialties ?? defaultBoxTrainer.specialties }
            : defaultBoxTrainer;

    // Build values from CMS or defaults
    const values = cms?.valuesItems?.length
        ? cms.valuesItems.map((item, i) => ({
            title: item.title ?? defaultValues[i]?.title ?? "",
            text: item.description ?? defaultValues[i]?.text ?? "",
            icon: defaultValues[i]?.icon ?? Dumbbell,
        }))
        : defaultValues;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title={cms?.headerTitle ?? "THE BOX"}
                    subtitle={cms?.headerSubtitle ?? "CrossFit Lakefront — Weak Ends Here."}
                    image={headerImageUrl}
                    logo="/images/CF-LF_2022_SW_300ppi.png"
                />

                <ParallaxStrip text="CROSSFIT · CALISTHENICS · MOBILITY · YOGA · COMMUNITY · " />

                {/* ORIGIN STORY */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-brand-dark">
                            <Image
                                src={originImageUrl}
                                alt="The Box Origin"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover opacity-60"
                            />
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-1 bg-brand-green"></span>
                                <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">{cms?.originLabel ?? "CrossFit Lakefront"}</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                                {cms?.originHeading ?? "Das"} <span className="text-brand-green">{cms?.originHeadingHighlight ?? "Herzensprojekt"}</span>
                            </h2>
                            {(cms?.originParagraphs ?? [
                                "CrossFit Lakefront öffnete 2016 das erste Mal seine Tore. Um unseren Members einen noch größeren Mehrwert zu bieten, wurden die Tore 2019 nochmals für ein Jahr geschlossen und die neue Location direkt neben dem Fitnessstudio geschaffen.",
                                "CrossFit Lakefront bietet geführtes Kleingruppentraining mit maximal 10 Teilnehmern. Dieses Konzept gibt uns die Möglichkeit, unsere Athleten besser zu betreuen und auf ihre individuellen Bedürfnisse einzugehen.",
                            ]).map((p, i) => (
                                <p key={i} className="text-brand-gray-light text-lg leading-relaxed mb-6">{p}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WAS IST CROSSFIT */}
                <section className="py-12 md:py-24 bg-brand-dark">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="w-12 h-1 bg-brand-green"></span>
                                    <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">{cms?.crossfitLabel ?? "Was ist CrossFit?"}</span>
                                </div>
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                                    {cms?.crossfitHeading ?? "Konstant variierend,"}<br />
                                    <span className="text-brand-green">{cms?.crossfitHeadingHighlight ?? "funktionell & intensiv"}</span>
                                </h2>
                                {(cms?.crossfitParagraphs ?? [
                                    "CrossFit ist eine konstant variierende Trainingsmethode, die auf hoher Intensität und funktionellen Bewegungen basiert. Es kombiniert Elemente aus Gewichtheben, Ausdauertraining und gymnastischen Übungen.",
                                    "Das Besondere: CrossFit unterstützt dich in all deinen körperlichen Fähigkeiten. Egal ob du Gewicht verlieren, Ausdauer aufbauen, stärker oder beweglicher werden möchtest.",
                                ]).map((p, i) => (
                                    <p key={i} className="text-brand-gray-light text-lg leading-relaxed mb-6">{p}</p>
                                ))}
                                <p className="text-brand-gray-light text-lg leading-relaxed font-bold text-white">
                                    {cms?.crossfitHighlightText ?? "Was CrossFit jedoch so einzigartig macht, ist die Community."}
                                </p>
                            </div>

                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
                                <Image
                                    src={crossfitImageUrl}
                                    alt="CrossFit Action"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover opacity-60"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4 CORE VALUES */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl">{cms?.valuesHeading ?? "CrossFit Lakefront"} <span className="text-brand-green">{cms?.valuesHeadingHighlight ?? "Erlebnis"}</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((feature) => (
                            <div key={feature.title} className="p-8 rounded-2xl bg-brand-dark border border-white/5 hover:border-brand-green/30 transition-colors group">
                                <feature.icon className="w-10 h-10 text-brand-green mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display text-2xl mb-4">{feature.title}</h3>
                                <p className="text-brand-gray-light">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CLASS STRUCTURE */}
                <section className="py-12 md:py-24 bg-brand-dark">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-brand-green text-sm font-bold uppercase tracking-widest">{cms?.classLabel ?? "Training"}</span>
                            <h2 className="font-display text-4xl md:text-5xl mt-2">{cms?.classHeading ?? "So funktioniert eine"} <span className="text-brand-green">{cms?.classHeadingHighlight ?? "Session"}</span></h2>
                        </div>
                        <ClassAccordion phases={cms?.classPhases} />
                    </div>
                </section>

                <DisciplinesLevels />

                {/* GYM + BOX STORY */}
                <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="font-display text-4xl md:text-6xl mb-8">{cms?.storyHeading ?? "Von der Box zum"} <span className="text-brand-green">{cms?.storyHeadingHighlight ?? "All in One."}</span></h2>
                            <p className="text-xl text-brand-gray-light mb-8 leading-relaxed">
                                {cms?.storyParagraph ?? "Unser Anspruch war es, das Beste aus beiden M\u00f6glichkeiten zu schaffen \u2014 dies legte den Grundstein f\u00fcr den Bau von \u201ETHE BOX\u201C, welche mit unserem Studio verschmolzen ist."}
                            </p>
                            <div className="p-8 bg-brand-black/50 rounded-2xl border border-white/10">
                                <h3 className="font-display text-2xl mb-2 text-brand-green">{cms?.storyBoxTitle ?? "Erfolgsgeschichten bis hin zu Weltmeistern"}</h3>
                                <p className="text-brand-gray-light">{cms?.storyBoxText ?? "Die Kombination aus individuellem Training und Gruppendynamik hat bei uns nicht nur Gesundheitserfolge geschaffen, sondern auch Athleten auf Weltklasse-Niveau gebracht."}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <TrainerSpotlight trainer={trainerData} />

                <InstagramFeed
                    category="box"
                    username="crossfit_lakefront"
                    instagramUrl="https://www.instagram.com/crossfit_lakefront/"
                />
            </main>
            <Footer />
        </div>
    );
}
