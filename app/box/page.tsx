import type { Metadata } from 'next';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ParallaxStrip } from "@/components/ui/parallax-strip";
import { TrainerSpotlight } from "@/components/home/trainer-spotlight";
import { ClassAccordion } from "@/components/box/class-accordion";
import { DisciplinesLevels } from "@/components/box/disciplines-levels";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { Dumbbell, Users, Activity, Layers } from "lucide-react";

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

// Mock Trainer Data for Daniel
const boxTrainer = {
    name: "Daniel",
    role: "Athletic Trainer",
    image: "https://images.unsplash.com/photo-1568218152033-b248bd8b1220?q=80&w=2522&auto=format&fit=crop",
    bio: "Ehemaliger Profifußballer und zertifizierter Athletiktrainer. Daniel bringt jahrelange Erfahrung aus dem Leistungssport in jede Trainingseinheit ein. Sein Übergang vom aktiven Spieler zum Coach hat ihm eine einzigartige Perspektive gegeben.",
    specialties: ["Athletiktraining", "Performance", "CrossFit Coaching"]
};

export default function BoxPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title="THE BOX"
                    subtitle="CrossFit Lakefront — Weak Ends Here."
                    image="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop"
                    logo="/images/CF-LF_2022_SW_300ppi.png"
                />

                <ParallaxStrip text="CROSSFIT · CALISTHENICS · MOBILITY · YOGA · COMMUNITY · " />

                {/* ORIGIN STORY */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-brand-dark">
                            <img
                                src="https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=2670&auto=format&fit=crop"
                                alt="The Box Origin"
                                className="w-full h-full object-cover opacity-60"
                            />
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-1 bg-brand-green"></span>
                                <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">CrossFit Lakefront</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                                Das <span className="text-brand-green">Herzensprojekt</span>
                            </h2>
                            <p className="text-brand-gray-light text-lg leading-relaxed mb-6">
                                CrossFit Lakefront öffnete 2016 das erste Mal seine Tore. Um unseren Members einen noch größeren Mehrwert zu bieten, wurden die Tore 2019 nochmals für ein Jahr geschlossen und die neue Location direkt neben dem Fitnessstudio geschaffen.
                            </p>
                            <p className="text-brand-gray-light text-lg leading-relaxed">
                                CrossFit Lakefront bietet geführtes Kleingruppentraining mit maximal 10 Teilnehmern. Dieses Konzept gibt uns die Möglichkeit, unsere Athleten besser zu betreuen und auf ihre individuellen Bedürfnisse einzugehen.
                            </p>
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
                                    <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Was ist CrossFit?</span>
                                </div>
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                                    Konstant variierend,<br />
                                    <span className="text-brand-green">funktionell & intensiv</span>
                                </h2>
                                <p className="text-brand-gray-light text-lg leading-relaxed mb-6">
                                    CrossFit ist eine konstant variierende Trainingsmethode, die auf hoher Intensität und funktionellen Bewegungen basiert. Es kombiniert Elemente aus Gewichtheben, Ausdauertraining und gymnastischen Übungen.
                                </p>
                                <p className="text-brand-gray-light text-lg leading-relaxed mb-6">
                                    Das Besondere: CrossFit unterstützt dich in all deinen körperlichen Fähigkeiten. Egal ob du Gewicht verlieren, Ausdauer aufbauen, stärker oder beweglicher werden möchtest.
                                </p>
                                <p className="text-brand-gray-light text-lg leading-relaxed font-bold text-white">
                                    Was CrossFit jedoch so einzigartig macht, ist die Community.
                                </p>
                            </div>

                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
                                <img
                                    src="https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2670&auto=format&fit=crop"
                                    alt="CrossFit Action"
                                    className="w-full h-full object-cover opacity-60"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4 CORE VALUES */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl">CrossFit Lakefront <span className="text-brand-green">Erlebnis</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Community", text: "Kleingruppen zwischen 2 und 10 Athleten. Qualität durch Coaching, Motivation durch Gruppendynamik.", icon: Users },
                            { title: "Abwechslung", text: "Keine Trainingseinheit gleicht der anderen. Warm-up, Skill/Kraft, WOD.", icon: Activity },
                            { title: "Skalierbarkeit", text: "Jeder kann mitmachen! Bewegungsabläufe, Gewichte und Wiederholungen werden individuell angepasst.", icon: Layers },
                            { title: "Zusatzangebot", text: "Zusätzlich Personaltraining oder individuelle Trainingspläne möglich.", icon: Dumbbell },
                        ].map((feature) => (
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
                            <span className="text-brand-green text-sm font-bold uppercase tracking-widest">Training</span>
                            <h2 className="font-display text-4xl md:text-5xl mt-2">So funktioniert eine <span className="text-brand-green">Session</span></h2>
                        </div>
                        <ClassAccordion />
                    </div>
                </section>

                <DisciplinesLevels />

                {/* GYM + BOX STORY */}
                <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="font-display text-4xl md:text-6xl mb-8">Von der Box zum <span className="text-brand-green">All in One.</span></h2>
                            <p className="text-xl text-brand-gray-light mb-8 leading-relaxed">
                                Unser Anspruch war es, das Beste aus beiden Möglichkeiten zu schaffen — dies legte den Grundstein für den Bau von „THE BOX", welche mit unserem Studio verschmolzen ist.
                            </p>
                            <div className="p-8 bg-brand-black/50 rounded-2xl border border-white/10">
                                <h3 className="font-display text-2xl mb-2 text-brand-green">Erfolgsgeschichten bis hin zu Weltmeistern</h3>
                                <p className="text-brand-gray-light">Die Kombination aus individuellem Training und Gruppendynamik hat bei uns nicht nur Gesundheitserfolge geschaffen, sondern auch Athleten auf Weltklasse-Niveau gebracht.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <TrainerSpotlight trainer={boxTrainer} />

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
