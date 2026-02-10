import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

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
                            { title: "Gesundheitscheck", text: "Körperanalyse und Herzfrequenzbestimmung für optimale Trainingsplanung." },
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

                            <ContactForm />
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
