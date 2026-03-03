import type { Metadata } from 'next';
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Eye, Shield, Users } from "lucide-react";
import { TeamGrid } from "@/components/team/team-grid";
import { client } from "@/sanity/lib/client";
import { trainersQuery } from "@/sanity/lib/queries";
import { Trainer } from "@/types/sanity";
import { getPageImage } from "@/lib/page-images";

export const metadata: Metadata = {
    title: 'Unser Team | GYM & BOX',
    description: 'Lerne unser Team aus zertifizierten Trainern, Coaches und Therapeuten kennen. Ausgebildet an über 7 Instituten, mit Expertise in Personal Training, Ernährung, Physiotherapie und CrossFit.',
    openGraph: {
        title: 'Unser Team | GYM & BOX',
        description: 'Zertifizierte Trainer, Coaches und Therapeuten in Weiden am See. Expertise in Personal Training, Ernährung und CrossFit.',
    },
    alternates: {
        canonical: '/team',
    },
};

// Fallback data if CMS is empty or not configured
const fallbackTrainers: Trainer[] = [
    {
        _id: "1",
        name: "Bernhard",
        role: "Gründer & Owner",
        image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=2573&auto=format&fit=crop",
        specs: "Ernährungscoaching · Personal Training · Studioleitung",
        bio: [
            "Gründer und Herzstück von GYM & BOX. Bernhard ist nicht nur zertifizierter Ernährungscoach und Personal Trainer, sondern unterrichtet auch als Dozent an einer deutschen Hochschule.",
            "Seine Leidenschaft für ganzheitliche Fitness hat ihn dazu gebracht, ein Konzept zu entwickeln, das weit über klassisches Training hinausgeht. Seine Vision: In Gesundheit investieren statt Krankheit behandeln."
        ],
        tags: ["Ernährungscoach", "Personal Trainer", "Hochschul-Dozent", "Blackroll Trainer"],
        category: "gym"
    },
    {
        _id: "2",
        name: "Melanie",
        role: "Health Coach",
        image: "https://images.unsplash.com/photo-1610419993591-140b9914434d?q=80&w=2670&auto=format&fit=crop",
        specs: "Gesundheitstraining · Kinder · Pre/Postnatal",
        bio: [
            "Spezialistin für gesundheitsorientiertes Training, Kindertraining und Schwangerschafts- sowie Rückbildungsfitness. Ihr Ansatz verbindet Fürsorge mit Leistung.",
            "Als ausgebildete Pädagogin entwickelt sie maßgeschneiderte, lustige und abwechslungsreiche Programme für Kinder von 7–10 Jahren."
        ],
        tags: ["Gesundheitstraining", "Kindertraining", "Schwangerschaftsfitness", "Pädagogin"],
        category: "gym"
    },
    {
        _id: "3",
        name: "Daniel",
        role: "Athletic Trainer",
        image: "https://images.unsplash.com/photo-1568218152033-b248bd8b1220?q=80&w=2522&auto=format&fit=crop",
        specs: "Athletiktraining · Performance · CrossFit Coaching",
        bio: [
            "Ehemaliger Profifußballer und zertifizierter Athletiktrainer. Daniel bringt jahrelange Erfahrung aus dem Leistungssport in jede Trainingseinheit ein.",
            "Spezialisiert auf funktionelles Krafttraining und athletische Performance — Daniel weiß, was es braucht um Spitzenleistung zu erzielen."
        ],
        tags: ["Ex-Profifußballer", "Athletiktrainer", "CrossFit Coach"],
        category: "box"
    },
    {
        _id: "4",
        name: "Mario",
        role: "Strength Coach",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2670&auto=format&fit=crop",
        specs: "Krafttraining · Intelligent Strength",
        bio: [
            "Mario hat 2018 seine Intelligent Strength Zertifizierung abgeschlossen und fokussiert sich auf fundiertes Krafttraining.",
            "Sein systematischer Ansatz hilft Mitgliedern, Kraft gezielt und sicher aufzubauen. Kraftaufbau ist eine Wissenschaft für sich."
        ],
        tags: ["Intelligent Strength", "Krafttraining"],
        category: "gym"
    },
];

export const revalidate = 60; // Revalidate every 60 seconds

export default async function TeamPage() {
    let trainers: Trainer[] = [];
    let headerImage = await getPageImage('team-header');

    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            trainers = await client.fetch(trainersQuery);
        }
    } catch (error) {
        console.error("Failed to fetch trainers from Sanity:", error);
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title="DAS TEAM"
                    subtitle="Expertise, Leidenschaft und ein gemeinsames Ziel."
                    image="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2670&auto=format&fit=crop"
                />

                {/* TEAM INTRO */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    {/* ... existing intro ... */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-1 bg-brand-green"></span>
                                <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Dein Team</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl mb-6">Bestens <span className="text-brand-green">ausgebildet</span></h2>
                            <p className="text-brand-gray-light text-lg leading-relaxed mb-6">
                                Unser Team besteht aus bestens ausgebildeten Trainer/innen, welche verschiedenste Teilbereiche in Fitness und Ernährung abdecken. Ständiges Weiterbilden in den besten Ausbildungsinstituten Europas ist unser Maßstab.
                            </p>
                        </div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-brand-dark">
                            <Image
                                src={headerImage.url}
                                alt={headerImage.altText || "Team"}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover opacity-60"
                            />
                        </div>
                    </div>
                </section>

                {/* TRAINERS GRID */}
                <TeamGrid trainers={trainers} fallbackTrainers={fallbackTrainers} />

                {/* WHY PERSONAL TRAINER */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display text-4xl md:text-5xl mb-6">Warum ein <span className="text-brand-green">Personaltrainer?</span></h2>
                        <p className="text-lg text-brand-gray-light leading-relaxed">
                            Wer kennt es nicht — ist die erste Motivation dahin und die erwünschten Ergebnisse nicht sofort groß, holt einen rasch der Alltag wieder ein. Wir akzeptieren deine Ausreden nicht.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Eye, title: "4 Säulen", text: "Bewegung, Ernährung, Regeneration und Reflexion — physisch und psychisch stärker." },
                            { icon: Shield, title: "Selbstständigkeit", text: "Unser Ziel: Du entwickelst ein Gesundheitsbewusstsein und kommst rasch ohne viel Hilfe aus." },
                            { icon: Users, title: "Professionelle Begleitung", text: "Dafür stehen wir mit unserem Namen. Dein Erfolg ist auch unser Erfolg." },
                        ].map(item => (
                            <div key={item.title} className="p-8 bg-brand-dark border border-white/5 rounded-2xl text-center hover:border-brand-green/30 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-brand-black flex items-center justify-center text-brand-green mx-auto mb-6">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                                <p className="text-brand-gray-light leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CERTIFICATIONS */}
                <section className="py-12 md:py-24 bg-brand-black">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto border border-white/10 p-12 rounded-3xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-brand-green/5 z-0"></div>
                            <div className="relative z-10">
                                <h3 className="font-display text-3xl mb-4">Über 7 Institute. Laufende Weiterbildung.</h3>
                                <p className="text-brand-gray-light text-lg">
                                    Unsere Trainer halten Zertifizierungen von über 7 verschiedenen Instituten und bilden sich laufend weiter. In Zusammenarbeit mit Ärzten bieten wir einen ganzheitlichen Ansatz, der weit über klassisches Fitnesstraining hinausgeht.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
