import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import type { StatItemData } from "@/types/page-content";

const defaultStats: StatItemData[] = [
    { value: "500", unit: "m²", label: "Trainingsfläche" },
    { value: "2014", unit: "", label: "Gegründet" },
    { value: "14", unit: "+", label: "Leistungen" },
    { value: "7", unit: "+", label: "Zertifizierungen" },
    { value: "10", unit: "+", label: "Kursangebote" },
];

export function StatsBar({ stats }: { stats?: StatItemData[] }) {
    const displayStats = stats?.length ? stats : defaultStats;

    return (
        <section className="py-12 border-y border-white/5 bg-brand-black">
            <div className="container mx-auto px-4">
                <AnimateOnScroll animation="stagger-children-scale" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
                    {displayStats.map((stat, i) => (
                        <div key={stat.label} className="stagger-child text-center relative group">
                            <div>
                                <div className="font-display text-4xl md:text-5xl text-brand-white mb-2 group-hover:text-brand-green transition-colors duration-300">
                                    {stat.value}<span className="text-brand-green text-3xl align-top">{stat.unit}</span>
                                </div>
                                <div className="text-brand-gray-light text-sm uppercase tracking-widest font-medium">
                                    {stat.label}
                                </div>
                            </div>
                            {i !== displayStats.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                            )}
                        </div>
                    ))}
                </AnimateOnScroll>
            </div>
        </section>
    );
}
