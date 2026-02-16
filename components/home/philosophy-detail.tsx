import { ClipboardCheck, Activity, GraduationCap } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const details = [
    {
        icon: ClipboardCheck,
        title: "Trainingspläne & Einweisung",
        text: "Ausgangs- und Re-Checks als bewährte Tools für messbaren Erfolg. Wir überlassen nichts dem Zufall.",
    },
    {
        icon: Activity,
        title: "Ganzheitlicher Fokus",
        text: "Kraft, Stabilität, Flexibilität und Ausdauer — ergänzt durch Ernährung, Regeneration und Reflexion.",
    },
    {
        icon: GraduationCap,
        title: "Vorträge & Weiterbildung",
        text: "Regelmäßige Vorträge unserer Coaches und geladener Gäste runden das Angebot ab.",
    }
];

export function PhilosophyDetail() {
    return (
        <section className="py-12 md:py-24 bg-brand-black relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-12 h-1 bg-brand-green"></span>
                            <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Unser Ansatz</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                            Unsere Philosophie,<br />
                            <span className="text-brand-green">Dein Mehrwert</span>
                        </h2>
                        <p className="text-brand-gray-light text-lg leading-relaxed mb-6">
                            Jede einzelne Einheit wird je nach Schwerpunkt von einem ausgebildeten Personaltrainer, unserer Sportphysiotherapeutin oder — was das Kindertraining angeht — von einer Kinderpädagogin geleitet.
                        </p>
                        <p className="text-brand-gray-light text-lg leading-relaxed">
                            Dieses Konzept gibt uns die Möglichkeit, mehr Menschen deutlich besser zu betreuen und ihren Zielen näher zu bringen.
                        </p>
                    </div>

                    <AnimateOnScroll animation="stagger-children" className="space-y-8">
                        {details.map((item) => (
                            <div
                                key={item.title}
                                className="stagger-child flex gap-6 group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-brand-dark border border-white/5 flex items-center justify-center text-brand-green shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl mb-2 group-hover:text-brand-green transition-colors">{item.title}</h3>
                                    <p className="text-brand-gray-light leading-relaxed">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}
