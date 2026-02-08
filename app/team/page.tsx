"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Eye, Shield, Users } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trainer {
    name: string;
    role: string;
    image: string;
    bio: string[];
    specs: string;
    tags: string[];
    category: "all" | "gym" | "box";
}

const trainers: Trainer[] = [
    {
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

export default function TeamPage() {
    const [filter, setFilter] = useState<"all" | "gym" | "box">("all");

    const filteredTrainers = filter === "all"
        ? trainers
        : trainers.filter(t => t.category === filter || t.category === "all");

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
                            <img
                                src="https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=2670&auto=format&fit=crop"
                                alt="Team"
                                className="w-full h-full object-cover opacity-60"
                            />
                        </div>
                    </div>
                </section>

                {/* TRAINERS GRID */}
                <section className="py-12 md:py-24 bg-brand-dark min-h-screen">
                    <div className="container mx-auto px-4">

                        {/* Filter */}
                        <div className="flex justify-center mb-16 gap-4">
                            {["all", "gym", "box"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${filter === f ? 'bg-brand-green text-brand-black shadow-[0_0_20px_rgba(150,193,31,0.4)]' : 'bg-brand-black border border-brand-white/10 text-brand-gray hover:text-brand-white'}`}
                                >
                                    {f === "all" ? "Alle Coaches" : f === "gym" ? "Gym Team" : "Box Team"}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            <AnimatePresence mode="popLayout">
                                {filteredTrainers.map((trainer, i) => (
                                    <motion.div
                                        key={trainer.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                        className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                                    >
                                        <div className="w-full lg:w-1/3 aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl group border border-brand-white/5">
                                            <img
                                                src={trainer.image}
                                                alt={trainer.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                        <div className="w-full lg:w-2/3">
                                            <div className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-bold rounded-full mb-4">
                                                {trainer.role}
                                            </div>
                                            <h2 className="font-display text-5xl mb-2 text-brand-white">{trainer.name}</h2>
                                            <p className="text-brand-white font-medium mb-6 opacity-80">{trainer.specs}</p>

                                            <div className="space-y-4 mb-8">
                                                {trainer.bio.map((para, idx) => (
                                                    <p key={idx} className="text-brand-gray-light text-lg leading-relaxed">{para}</p>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {trainer.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-brand-black border border-white/10 rounded-lg text-sm text-brand-gray">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* WHY PERSONAL TRAINER */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    {/* ... existing why section ... */}
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
