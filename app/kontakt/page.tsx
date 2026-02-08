import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title="KONTAKT"
                    subtitle="Ob Erstberatung oder Probetraining — wir sind für dich da."
                    image="https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=2671&auto=format&fit=crop"
                />

                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {[
                            { title: "Erstberatung", text: "Kostenlos und unverbindlich unser Gym und die Box kennenlernen." },
                            { title: "Gesundheitscheck", text: "Körperanalyse, Herzfrequenzbestimmung oder FMS Test buchen." },
                            { title: "Personal Training", text: "Individuelles Coaching mit einem unserer zertifizierten Trainer." },
                            { title: "Ernährungsberatung", text: "Langfristige Ernährungsumstellung mit professionellem Coaching." }
                        ].map(opt => (
                            <div key={opt.title} className="p-6 bg-brand-dark border border-white/5 rounded-xl text-center hover:border-brand-green/30 transition-colors">
                                <h3 className="font-display text-xl mb-2 text-brand-green">{opt.title}</h3>
                                <p className="text-sm text-brand-gray-light">{opt.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-1 bg-brand-green"></span>
                                <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">Schreib uns</span>
                            </div>
                            <h2 className="font-display text-4xl mb-8">Deine <span className="text-brand-green">Anfrage</span></h2>

                            <form className="space-y-6 bg-brand-dark p-8 md:p-12 rounded-3xl border border-white/5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-brand-gray">Name *</label>
                                        <input type="text" className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors" placeholder="Dein Name" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-brand-gray">E-Mail *</label>
                                        <input type="email" className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors" placeholder="deine@email.com" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-brand-gray">Telefon</label>
                                        <input type="tel" className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors" placeholder="+43 ..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-brand-gray">Interesse an</label>
                                        <select className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors appearance-none">
                                            <option value="">Bitte wählen...</option>
                                            <option value="erstberatung">Kostenlose Erstberatung</option>
                                            <option value="gym">Das Gym — Mitgliedschaft</option>
                                            <option value="box">The Box — CrossFit</option>
                                            <option value="personal">Personal Training</option>
                                            <option value="analyse">Körperanalyse / Gesundheitscheck</option>
                                            <option value="ernaehrung">Ernährungscoaching</option>
                                            <option value="physio">Physiotherapie</option>
                                            <option value="firmen">Firmen-Fitness</option>
                                            <option value="kinder">Kindertraining</option>
                                            <option value="sonstiges">Sonstiges</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-brand-gray">Nachricht</label>
                                    <textarea rows={5} className="w-full bg-brand-black border border-white/10 rounded-lg p-4 focus:border-brand-green focus:outline-none transition-colors" placeholder="Wie können wir dir helfen?"></textarea>
                                </div>

                                <Button className="w-full md:w-auto px-12 py-6 text-lg">
                                    Absenden
                                </Button>
                            </form>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-brand-dark p-8 rounded-2xl border border-white/5">
                                <h3 className="font-display text-2xl mb-6">Kontakt & Info</h3>

                                <ul className="space-y-6">
                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-brand-green shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-brand-gray uppercase font-bold mb-1">Adresse</span>
                                            <p className="text-brand-gray-light">Friedhofgasse 45<br />7121 Weiden am See</p>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-brand-green shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-brand-gray uppercase font-bold mb-1">Telefon</span>
                                            <a href="tel:+4369911095336" className="text-white hover:text-brand-green transition-colors">+43 699 1109 5336</a>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-brand-green shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-brand-gray uppercase font-bold mb-1">E-Mail</span>
                                            <a href="mailto:bernhard@personal-fitnesstrainer.at" className="text-white hover:text-brand-green transition-colors break-all">bernhard@personal-fitnesstrainer.at</a>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-brand-green shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-brand-gray uppercase font-bold mb-1">Öffnungszeiten</span>
                                            <p className="text-brand-gray-light">Täglich 06:30 – 22:00 Uhr</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-brand-dark p-8 rounded-2xl border border-white/5">
                                <h3 className="font-display text-2xl mb-6">Social Media</h3>
                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/bernhardtrainiert/" target="_blank" className="flex items-center gap-2 px-4 py-3 bg-brand-black rounded-lg hover:bg-brand-green hover:text-black transition-colors">
                                        <Instagram className="w-5 h-5" /> Instagram
                                    </a>
                                    <a href="https://www.facebook.com/Bernhardtrainiert/" target="_blank" className="flex items-center gap-2 px-4 py-3 bg-brand-black rounded-lg hover:bg-brand-green hover:text-black transition-colors">
                                        <Facebook className="w-5 h-5" /> Facebook
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
