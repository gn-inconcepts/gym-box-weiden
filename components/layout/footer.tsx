import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

interface FooterProps {
    siteSettings?: {
        contact?: { email?: string; phone?: string; address?: string };
        social?: { instagram?: string; facebook?: string };
        footerTagline?: string;
        footerDescription?: string;
        openingHours?: { days: string; hours: string }[];
    };
}

export function Footer({ siteSettings }: FooterProps) {
    const address = siteSettings?.contact?.address ?? "Friedhofgasse 45\n7121 Weiden am See";
    const phone = siteSettings?.contact?.phone ?? "+43 699 1109 5336";
    const email = siteSettings?.contact?.email ?? "bernhard@personal-fitnesstrainer.at";
    const facebookUrl = siteSettings?.social?.facebook ?? "https://www.facebook.com/Bernhardtrainiert/";
    const instagramUrl = siteSettings?.social?.instagram ?? "https://www.instagram.com/bernhardtrainiert/";
    const tagline = siteSettings?.footerTagline ?? "GESUNDHEIT IST ALLES";
    const description = siteSettings?.footerDescription ?? "Über 500 m² für Kraft, Ausdauer und Gemeinschaft — Gym & CrossFit Box unter einem Dach in Weiden am See.";
    const openingHours = siteSettings?.openingHours;
    const phoneDigits = phone.replace(/[^+\d]/g, "");

    return (
        <footer className="bg-brand-black border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Col */}
                    <div className="space-y-6">
                        <div className="font-display text-2xl tracking-wider">
                            GYM <span className="text-brand-green">&</span> BOX
                            <span className="block text-xs tracking-[0.2em] text-brand-green opacity-80 mt-1">
                                {tagline}
                            </span>
                        </div>
                        <p className="text-brand-gray-light text-sm leading-relaxed max-w-xs">
                            {description}
                        </p>
                        <div className="flex items-center gap-6 pt-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            <Image src="/images/Bernhard_2022_SW_300ppi.png" alt="Bernhard Trainiert" width={120} height={48} className="h-12 w-auto" />
                            <Image src="/images/CF-LF_2022_SW_300ppi.png" alt="CrossFit Lakefront" width={120} height={48} className="h-12 w-auto" />
                        </div>
                    </div>

                    {/* Nav Col */}
                    <div>
                        <h4 className="font-display text-lg mb-6 tracking-wider">Navigation</h4>
                        <div className="flex flex-col gap-3 text-sm text-brand-gray-light">
                            <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
                            <Link href="/gym" className="hover:text-brand-green transition-colors">Das Gym</Link>
                            <Link href="/box" className="hover:text-brand-green transition-colors">The Box</Link>
                            <Link href="/team" className="hover:text-brand-green transition-colors">Team</Link>
                            <Link href="/leistungen" className="hover:text-brand-green transition-colors">Leistungen</Link>
                            <Link href="/preise" className="hover:text-brand-green transition-colors">Preise</Link>
                        </div>
                    </div>

                    {/* Contact Col */}
                    <div>
                        <h4 className="font-display text-lg mb-6 tracking-wider">Kontakt</h4>
                        <div className="space-y-3 text-sm text-brand-gray-light">
                            <p dangerouslySetInnerHTML={{ __html: address.replace(/\n/g, '<br />') }} />
                            <p className="hover:text-brand-white transition-colors">
                                <a href={`tel:${phoneDigits}`}>{phone}</a>
                            </p>
                            <p className="hover:text-brand-white transition-colors">
                                <a
                                    href={`https://wa.me/${phoneDigits.replace('+', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-brand-green hover:underline"
                                >
                                    <span>Via WhatsApp kontaktieren</span>
                                </a>
                            </p>
                            <p className="hover:text-brand-white transition-colors">
                                <a href={`mailto:${email}`}>{email}</a>
                            </p>
                            {openingHours && openingHours.length > 0 ? (
                                openingHours.map((oh, i) => (
                                    <p key={i} className="text-brand-gray text-xs mt-4">{oh.days} {oh.hours}</p>
                                ))
                            ) : (
                                <p className="text-brand-gray text-xs mt-4">Täglich 06:30 – 22:00</p>
                            )}
                        </div>
                    </div>

                    {/* Social Col */}
                    <div>
                        <h4 className="font-display text-lg mb-6 tracking-wider">Folge uns</h4>
                        <div className="flex gap-4">
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-brand-dark border border-brand-white/10 flex items-center justify-center text-brand-gray-light hover:text-brand-green hover:border-brand-green/30 transition-all"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-brand-dark border border-brand-white/10 flex items-center justify-center text-brand-gray-light hover:text-brand-green hover:border-brand-green/30 transition-all"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-brand-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-gray">
                    <div className="flex gap-6">
                        <Link href="/impressum" className="hover:text-brand-white transition-colors">Impressum</Link>
                        <Link href="/datenschutz" className="hover:text-brand-white transition-colors">Datenschutz</Link>
                    </div>
                    <p>&copy; {new Date().getFullYear()} GYM & BOX. Alle Rechte vorbehalten.</p>
                </div>
            </div>
        </footer>
    );
}
