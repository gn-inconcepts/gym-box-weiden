import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { client } from "@/sanity/lib/client";
import { legalPageQuery } from "@/sanity/lib/legal-queries";
import { PortableText } from "next-sanity";

export const metadata: Metadata = {
    title: 'Impressum | GYM & BOX',
    description: 'Impressum der GYM & BOX Weiden am See. Angaben gemäß § 5 ECG, Kontaktdaten und Haftungsausschluss.',
    openGraph: {
        title: 'Impressum | GYM & BOX',
        description: 'Impressum der GYM & BOX Weiden am See.',
    },
    alternates: {
        canonical: '/impressum',
    },
    robots: { index: true, follow: true },
};

export const revalidate = 3600;

async function getLegalPage() {
    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            const page = await client.fetch(legalPageQuery, { slug: 'impressum' });
            return page;
        }
    } catch (error) {
        console.error("Failed to fetch Impressum page from Sanity:", error);
    }
    return null;
}

export default async function ImpressumPage() {
    const page = await getLegalPage();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-grow">
                <div className="pt-32 pb-12 md:pt-40 md:pb-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="font-display text-4xl md:text-6xl mb-4">
                            IMPR<span className="text-brand-green">ESSUM</span>
                        </h1>
                        {page?.lastUpdated && (
                            <p className="text-brand-gray text-sm mb-12">
                                Zuletzt aktualisiert: {new Date(page.lastUpdated).toLocaleDateString('de-AT')}
                            </p>
                        )}

                        {page?.content ? (
                            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-brand-gray-light prose-a:text-brand-green prose-strong:text-white">
                                <PortableText value={page.content} />
                            </div>
                        ) : (
                            <ImpressumFallback />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function ImpressumFallback() {
    return (
        <div className="space-y-12 text-brand-gray-light leading-relaxed">
            {/* Angaben gemaess § 5 ECG */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Angaben gemäß § 5 ECG</h2>
                <p>
                    <strong className="text-white">Bernhard Beidl</strong><br />
                    Einzelunternehmen
                </p>
                <p className="mt-2">
                    <strong className="text-white">BERNHARD TRAINIERT</strong><br />
                    (auch unter &quot;Athlet des Lebens&quot; / &quot;GYM &amp; BOX&quot;)
                </p>
                <p className="mt-4">
                    <strong className="text-white">Adresse:</strong><br />
                    Friedhofgasse 45<br />
                    7121 Weiden am See<br />
                    Österreich
                </p>
            </section>

            {/* Kontakt */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Kontakt</h2>
                <p>
                    Mobil: <a href="tel:+4369911095336" className="text-brand-green hover:underline">+43 699 110 95 336</a><br />
                    E-Mail: <a href="mailto:bernhard@personal-fitnesstrainer.at" className="text-brand-green hover:underline">bernhard@personal-fitnesstrainer.at</a><br />
                    Website: <a href="https://gymandbox.at" className="text-brand-green underline hover:no-underline">https://gymandbox.at</a>
                </p>
            </section>

            {/* Haftungsausschluss */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Haftungsausschluss</h2>

                <h3 className="font-display text-xl text-white mt-6 mb-3">Haftung für Inhalte</h3>
                <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten
                    nach den allgemeinen Gesetzen verantwortlich. Gemäß §§ 8 bis 10 ECG sind wir als
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                    Informationen zu überwachen.
                </p>

                <h3 className="font-display text-xl text-white mt-6 mb-3">Haftung für Links</h3>
                <p>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                    keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                    Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                    Anbieter oder Betreiber der Seiten verantwortlich.
                </p>

                <h3 className="font-display text-xl text-white mt-6 mb-3">Urheberrecht</h3>
                <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                    unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
            </section>

            {/* Streitschlichtung */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Online-Streitbeilegung</h2>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-green underline hover:no-underline">
                        https://ec.europa.eu/consumers/odr/
                    </a>
                </p>
                <p className="mt-4">
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </section>

            <p className="text-brand-gray text-sm">
                Stand: Februar 2026
            </p>
        </div>
    );
}
