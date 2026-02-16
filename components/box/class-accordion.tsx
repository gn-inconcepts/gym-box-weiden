"use client";

import { useState } from "react";
import { ChevronDown, Dumbbell, Flame, Activity } from "lucide-react";

const items = [
    {
        num: "01",
        title: "Warm-Up",
        icon: Flame,
        content: "Gezielte Aufwärmphase mit Fokus auf generelle Erwärmung sowie Beweglichkeit — um den Körper auf das bevorstehende Training vorzubereiten und Verletzungen vorzubeugen.",
        duration: "10–15 Min.",
        focus: "Mobilisation, Herzfrequenz, Aktivierung"
    },
    {
        num: "02",
        title: "Skill / Kraft",
        icon: Dumbbell,
        content: "Gezielter Kraft- und Muskelaufbau oder das Erlernen neuer Bewegungsabläufe. Hier arbeiten wir an spezifischen Bewegungsmustern und bauen systematisch Stärke auf.",
        duration: "15–20 Min.",
        focus: "Gewichtheben, Technik, Progressive Overload"
    },
    {
        num: "03",
        title: "WOD",
        icon: Activity,
        content: "Workout of the Day — das Herzstück jeder Session. Intensiv, abwechslungsreich und auf alle Level skalierbar.",
        duration: "15–25 Min.",
        focus: "AMRAP, EMOM, For Time — ständig wechselnd"
    }
];

export function ClassAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {items.map((item, i) => (
                <div
                    key={item.title}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === i ? 'bg-brand-black border-brand-green' : 'bg-brand-dark border-white/5'}`}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left"
                    >
                        <div className="flex items-center gap-6">
                            <span className={`font-display text-3xl transition-colors ${openIndex === i ? 'text-brand-green' : 'text-brand-gray'}`}>{item.num}</span>
                            <span className="font-display text-2xl">{item.title}</span>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${openIndex === i ? 'border-brand-green bg-brand-green text-brand-black rotate-180' : 'border-brand-white/10 text-brand-white'}`}>
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </button>

                    <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                        <div>
                            <div className="px-6 pb-8 pt-2">
                                <div className="p-6 rounded-xl bg-brand-dark/50 border border-brand-white/5">
                                    <p className="text-brand-gray-light leading-relaxed mb-6">{item.content}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-brand-gray text-xs uppercase tracking-wider font-bold mb-1">Dauer</span>
                                            <span className="font-medium text-brand-white">{item.duration}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-brand-gray text-xs uppercase tracking-wider font-bold mb-1">Fokus</span>
                                            <span className="font-medium text-brand-white">{item.focus}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
