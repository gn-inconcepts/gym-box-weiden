import type { Metadata } from 'next';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { kontaktPageQuery, expandedSiteSettingsQuery } from "@/sanity/lib/page-queries";
import { KontaktPageData } from "@/types/page-content";
import { SiteSettings } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Kontakt | GYM & BOX',
    description: 'Kontaktiere GYM & BOX in Weiden am See. Erstberatung, Probetraining oder allgemeine Anfragen — wir sind für dich da. Telefon: +43 699 110 95 336.',
    openGraph: {
        title: 'Kontakt | GYM & BOX',
        description: 'Kontaktiere GYM & BOX in Weiden am See für Erstberatung, Probetraining oder allgemeine Anfragen.',
    },
    alternates: {
        canonical: '/kontakt',
    },
};

const defaultContactOptions = [
    { title: "Erstberatung", text: "Kostenlos und unverbindlich unser Gym und die Box kennenlernen." },
    { title: "Gesundheitscheck", text: "Körperanalyse und Herzfrequenzbestimmung für optimale Trainingsplanung." },
    { title: "Personal Training", text: "Individuelles Coaching mit einem unserer zertifizierten Trainer." },
    { title: "Ernährungsberatung", text: "Langfristige Ernährungsumstellung mit professionellem Coaching." },
];

export default async function ContactPage() {
    let cms: KontaktPageData | null = null;
    let siteSettings: SiteSettings | null = null;

    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            [cms, siteSettings] = await Promise.all([
                client.fetch<KontaktPageData>(kontaktPageQuery),
                client.fetch<SiteSettings>(expandedSiteSettingsQuery),
            ]);
        }
    } catch (error) {
        console.error("Failed to fetch kontakt page data:", error);
    }

    const headerImageUrl = cms?.headerImage
        ? urlFor(cms.headerImage)?.width(2670).quality(80).format('webp').url() ?? "https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=2671&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=2671&auto=format&fit=crop";

    const formImageUrl = cms?.formImage
        ? urlFor(cms.formImage)?.width(1600).quality(80).format('webp').url() ?? null
        : null;

    const contactOptions = cms?.contactOptions?.length ? cms.contactOptions : defaultContactOptions;
    const address = siteSettings?.contact?.address ?? "Friedhofgasse 45\n7121 Weiden am See";
    const phone = siteSettings?.contact?.phone ?? "+43 699 110 95 336";
    const email = siteSettings?.contact?.email ?? "bernhard@personal-fitnesstrainer.at";
    const instagramUrl = siteSettings?.social?.instagram ?? "https://www.instagram.com/bernhardtrainiert/";
    const facebookUrl = siteSettings?.social?.facebook ?? "https://www.facebook.com/Bernhardtrainiert/";
    const openingHoursText = siteSettings?.openingHours?.[0] ? `${siteSettings.openingHours[0].days} ${siteSettings.openingHours[0].hours}` : "Täglich 06:30 – 22:00 Uhr";

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <PageHeader
                    title={cms?.headerTitle ?? "KONTAKT"}
                    subtitle={cms?.headerSubtitle ?? "Ob Erstberatung oder Probetraining — wir sind für dich da."}
                    image={headerImageUrl}
                />

                <section className="py-12 md:py-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {contactOptions.map(opt => (
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
                                <span className="text-brand-gray uppercase tracking-widest text-sm font-bold">{cms?.formLabel ?? "Schreib uns"}</span>
                            </div>
                            <h2 className="font-display text-4xl mb-8">{cms?.formHeading ?? "Deine"} <span className="text-brand-green">{cms?.formHeadingHighlight ?? "Anfrage"}</span></h2>

                            <ContactForm />

                            {formImageUrl && (
                                <div className="relative aspect-[16/7] rounded-2xl overflow-hidden mt-12 border border-white/5">
                                    <Image src={formImageUrl} alt="Kontakt" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
                                </div>
                            )}
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
                                            <p className="text-brand-gray-light whitespace-pre-line">{address}</p>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-brand-green shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-brand-gray uppercase font-bold mb-1">Telefon</span>
                                            <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-white hover:text-brand-green transition-colors">{phone}</a>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-brand-green shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-brand-gray uppercase font-bold mb-1">E-Mail</span>
                                            <a href={`mailto:${email}`} className="text-white hover:text-brand-green transition-colors break-all">{email}</a>
                                        </div>
                                    </li>

                                    <li className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-brand-green shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-brand-gray uppercase font-bold mb-1">Öffnungszeiten</span>
                                            <p className="text-brand-gray-light">{openingHoursText}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-brand-dark p-8 rounded-2xl border border-white/5">
                                <h3 className="font-display text-2xl mb-6">Social Media</h3>
                                <div className="flex gap-4">
                                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-brand-black rounded-lg hover:bg-brand-green hover:text-black transition-colors">
                                        <Instagram className="w-5 h-5" /> Instagram
                                    </a>
                                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-brand-black rounded-lg hover:bg-brand-green hover:text-black transition-colors">
                                        <Facebook className="w-5 h-5" /> Facebook
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer siteSettings={siteSettings ?? undefined} />
        </div>
    );
}
