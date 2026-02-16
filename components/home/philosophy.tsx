import { Apple, Brain, Dumbbell, Moon } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const pillars = [
    {
        title: "Training",
        text: "Individuell angepasstes Training mit zertifizierten Personal Trainern — von Kraft, Ausdauer über Mobilität, jeder Mensch hat andere Voraussetzungen, deshalb erstellen wir individuelle Pläne.",
        icon: Dumbbell,
        num: "01"
    },
    {
        title: "Ernährung",
        text: "Langfristige Ernährungsumstellung statt kurzfristiger Diäten — begleitet von professioneller Begleitung. Wir setzen auf nachhaltige Veränderung deiner Essgewohnheiten.",
        icon: Apple,
        num: "02"
    },
    {
        title: "Regeneration",
        text: "Dein Körper wächst in der Ruhephase — wir optimieren sie denn auch diese Phase trägt maßgeblich zum Erfolg bei. Genau deshalb ist auch die Regeneration ein wichtiger Baustein den wir behandeln.",
        icon: Moon,
        num: "03"
    },
    {
        title: "Reflexion",
        text: "Mentaltraining und Selbstreflexion für nachhaltigen Erfolg — im Training und im Leben. Resilienz und mentale Stärke sind der Schlüssel zu dauerhaftem Erfolg.",
        icon: Brain,
        num: "04"
    }
];

export function Philosophy() {
    return (
        <section className="py-12 md:py-24 bg-brand-dark relative overflow-hidden">
            {/* Background Marquee */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none opacity-[0.02]">
                <div className="whitespace-nowrap font-display text-[15rem] leading-none animate-marquee text-white">
                    ATHLET DES LEBENS · ATHLET DES LEBENS · ATHLET DES LEBENS ·
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <span className="w-12 h-1 bg-brand-green"></span>
                        <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Unsere Philosophie</span>
                        <span className="w-12 h-1 bg-brand-green"></span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-7xl mb-8">
                        Vier Säulen. <span className="text-brand-green">Ein Ziel.</span>
                    </h2>
                    <p className="text-xl text-brand-gray-light font-light leading-relaxed max-w-3xl mx-auto">
                        Wir glauben, dass Fitness mehr ist als nur Training. Unser ganzheitlicher Ansatz vereint vier Säulen zu einem nachhaltigen Lebensstil.
                    </p>
                </div>

                {/* Horizontal Cards */}
                <AnimateOnScroll animation="stagger-children" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="stagger-child group bg-brand-black border border-white/5 p-8 rounded-2xl hover:border-brand-green/50 hover:bg-brand-green/5 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Number Badge */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                <span className="font-display text-2xl font-bold text-brand-green">{pillar.num}</span>
                            </div>

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-brand-dark border border-white/5 flex items-center justify-center text-brand-green mb-6 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-brand-black group-hover:border-brand-green transition-all duration-500">
                                <pillar.icon className="w-7 h-7" />
                            </div>

                            {/* Content */}
                            <h3 className="font-display text-2xl mb-4 group-hover:text-brand-green transition-colors">
                                {pillar.title}
                            </h3>
                            <p className="text-brand-gray-light text-sm leading-relaxed group-hover:text-brand-white transition-colors">
                                {pillar.text}
                            </p>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/0 via-brand-green/0 to-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        </div>
                    ))}
                </AnimateOnScroll>
            </div>
        </section>
    );
}
