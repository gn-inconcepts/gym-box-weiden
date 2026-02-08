import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ServiceFilter } from "@/components/services/service-filter";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title="LEISTUNGEN"
                    subtitle="Von Körperanalyse bis Firmen-Fitness — 15+ spezialisierte Services."
                    image="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop"
                />

                {/* INTRO */}
                <section className="py-12 md:py-24 container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-bold rounded-full mb-6">
                            Alles was du brauchst
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl mb-6 text-brand-white">Für deine <span className="text-brand-green">Gesundheit</span></h2>
                        <p className="text-xl text-brand-gray-light leading-relaxed">
                            Wir bieten dir nicht nur einen Ort zum Trainieren, sondern ein umfassendes Konzept für deinen Körper. Von der ersten Analyse bis zur langfristigen Betreuung.
                        </p>
                    </div>
                </section>

                {/* FEATURED SERVICES */}
                <section className="pb-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { num: "01", title: "Analyse & Diagnostik", text: "Körperanalyse, FMS Test, Herzfrequenzbestimmung und Hautfaltenmessung — datenbasierte Grundlage für deinen Trainingsplan." },
                            { num: "02", title: "Coaching & Beratung", text: "Ernährungs-, Resilienz- und Firmen-Fitness-Coaching. Ganzheitliche Betreuung für nachhaltigen Erfolg." },
                            { num: "03", title: "Training & Therapie", text: "Personal Training, Kindertraining, Schwangerschaftsfitness und Physiotherapie — für jede Lebensphase." },
                        ].map((item, i) => (
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
                        <ServiceFilter />
                    </div>
                </section>

                {/* MEMBER BENEFITS */}
                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="bg-brand-dark border border-white/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h3 className="font-display text-4xl md:text-5xl mb-6">Mitglieder-Vorteil</h3>
                            <p className="text-xl text-brand-gray-light mb-10 leading-relaxed">
                                Als Mitglied profitierst du von stark reduzierten Preisen bei allen Services. Viele Leistungen sind bis zu 50% günstiger — ein weiterer Grund, Teil unserer Community zu werden.
                            </p>
                            <Link href="/preise" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-green text-brand-black font-bold rounded-full hover:bg-white transition-colors">
                                Mitgliedschaften ansehen <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
