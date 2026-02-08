import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ParallaxStrip } from "@/components/ui/parallax-strip";
import { TrainerSpotlight } from "@/components/home/trainer-spotlight";
import { Activity, Apple, Brain, Check, Dumbbell, HeartPulse, Moon } from "lucide-react";

// Mock Trainer Data (matches original somewhat, but using placeholders where specific image/bio missing for random selection)
// In a real app this would come from a CMS or database. Using Bernhard for "Gym" spotlight.
const gymTrainer = {
    name: "Bernhard",
    role: "Gründer & Owner",
    image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=2573&auto=format&fit=crop",
    bio: "Gründer und Herzstück von GYM & BOX. Bernhard ist nicht nur zertifizierter Ernährungscoach und Personal Trainer, sondern unterrichtet auch als Dozent an einer deutschen Hochschule.",
    specialties: ["Ernährungscoaching", "Personal Training", "Studioleitung"]
};

export default function GymPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title="DAS GYM"
                    subtitle="Die Gesundheit ist unser wertvollstes Gut."
                    image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop"
                    logo="/images/Bernhard_2022_SW_300ppi.png"
                />

                <ParallaxStrip text="KRAFT · AUSDAUER · GESUNDHEIT · PERFORMANCE · " />

                {/* PHILOSOPHY INTRO */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-1 bg-brand-green"></span>
                                <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Unsere Überzeugung</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                                In Gesundheit investieren,<br />
                                <span className="text-brand-green">nicht in Krankheit</span>
                            </h2>
                            <p className="text-brand-gray-light text-lg leading-relaxed mb-6">
                                Der Spruch ist sicher einigen bekannt. Jetzt in die Gesundheit anstatt später in die Krankheit zu investieren ist der richtige Weg. Dies funktioniert nur ganzheitlich — und um das richtig umzusetzen, sind wir Trainer und Coaches da.
                            </p>

                            <ul className="space-y-4 mt-8">
                                {[
                                    { icon: Dumbbell, text: "Training" },
                                    { icon: Apple, text: "Ernährung" },
                                    { icon: Moon, text: "Regeneration" },
                                    { icon: Brain, text: "Reflexion" },
                                ].map((item) => (
                                    <li key={item.text} className="flex items-center gap-4 p-4 rounded-xl bg-brand-dark border border-white/5">
                                        <item.icon className="w-6 h-6 text-brand-green" />
                                        <span className="font-display text-xl tracking-wide">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-brand-dark">
                            <img
                                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop"
                                alt="Gym Philosophy"
                                className="w-full h-full object-cover opacity-60"
                            />
                        </div>
                    </div>
                </section>

                {/* WAS ERWARTET DICH */}
                <section className="py-12 md:py-24 bg-brand-dark">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5">
                                <img
                                    src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop"
                                    alt="Coaches"
                                    className="w-full h-full object-cover opacity-60"
                                />
                            </div>

                            <div className="order-1 lg:order-2">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="w-12 h-1 bg-brand-green"></span>
                                    <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Was erwartet dich</span>
                                </div>
                                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                                    Mehr als nur ein <span className="text-brand-green">Fitnessstudio</span>
                                </h2>
                                <p className="text-brand-gray-light text-lg leading-relaxed mb-6">
                                    Das Herzstück sind unsere Coaches, Trainer und Therapeuten. Ausgebildet an mehr als 7 verschiedenen Instituten sind wir alle gemeinsam nie am Ruhen, was Aus- und Fortbildungen betrifft.
                                </p>
                                <p className="text-brand-gray-light text-lg leading-relaxed mb-6">
                                    Bei uns findest du von Personaltrainern über Sportphysiotherapeuten, Ernährungs- und Mentalcoach bis hin zu zertifizierten Blackroll- und Rocktapetrainern alles — unter einem Dach.
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {["Personal Trainer", "Sportphysiotherapie", "Ernährungscoaching", "Mentalcoaching", "Blackroll & Rocktape", "EMS Training"].map(tag => (
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
                        <h2 className="font-display text-4xl md:text-5xl">Alles unter <span className="text-brand-green">einem Dach</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Premium Equipment", text: "Hochwertige Geräte, Free Weights und Maschinen auf über 1.000m² Indoor- und Outdoorfläche.", icon: Dumbbell },
                            { title: "Familiäre Atmosphäre", text: "Bei uns kennt man sich. Von 9 bis 99, vom Anfänger bis zum Leistungssportler.", icon: Users },
                            { title: "FMS Testing", text: "Functional Movement Screen und physiotherapeutische Beratung für optimale Übungsausführung.", icon: Activity },
                            { title: "Ernährungscoaching", text: "Ernährung ist unser erster Grundpfeiler. Langfristige Umstellung statt kurzfristiger Diäten.", icon: Apple },
                            { title: "Personal Training", text: "Zertifizierte Trainer mit individueller Expertise. Neuer Plan nach je 12 Einheiten.", icon: HeartPulse },
                            { title: "Täglich Geöffnet", text: "Von 06:30 bis 22:00 Uhr — flexible Trainingszeiten für jeden Lebensstil.", icon: Moon }, // Using Moon as generic 'time' icon fallback
                        ].map((feature) => (
                            <div key={feature.title} className="p-8 rounded-2xl bg-brand-dark border border-white/5 hover:border-brand-green/30 transition-colors group">
                                <feature.icon className="w-10 h-10 text-brand-green mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="font-display text-2xl mb-4">{feature.title}</h3>
                                <p className="text-brand-gray-light">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ALL IN ONE */}
                <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="font-display text-4xl md:text-6xl mb-8">GYM oder BOX? <br /><span className="text-brand-green">Beides.</span></h2>
                            <p className="text-xl text-brand-gray-light mb-12 leading-relaxed">
                                Unser Anspruch war es, das Beste aus beiden Möglichkeiten zu schaffen — dies legte den Grundstein für das „All in One" Konzept und deshalb entstand zum GYM unsere „THE BOX".
                            </p>

                            <div className="inline-block p-1 rounded-full bg-brand-black border border-white/10">
                                <a href="/box" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-green text-brand-black font-bold hover:bg-white transition-colors">
                                    The Box entdecken <Check className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <TrainerSpotlight trainer={gymTrainer} />
            </main>
            <Footer />
        </div>
    );
}

// Helper icons
function Users({ className }: { className?: string }) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
}
