import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { client } from "@/sanity/lib/client";
import { legalPageQuery } from "@/sanity/lib/legal-queries";
import { PortableText } from "next-sanity";

export const metadata: Metadata = {
    title: 'Datenschutz | GYM & BOX',
    description: 'Datenschutzerklärung der GYM & BOX Weiden am See.',
    robots: { index: true, follow: true },
};

export const revalidate = 3600;

async function getLegalPage() {
    try {
        if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            const page = await client.fetch(legalPageQuery, { slug: 'datenschutz' });
            return page;
        }
    } catch (error) {
        console.error("Failed to fetch Datenschutz page from Sanity:", error);
    }
    return null;
}

export default async function DatenschutzPage() {
    const page = await getLegalPage();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-grow">
                <div className="pt-32 pb-12 md:pt-40 md:pb-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="font-display text-4xl md:text-6xl mb-4">
                            DATENSCHUTZ<span className="text-brand-green">ERKLÄRUNG</span>
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
                            <DatenschutzFallback />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function DatenschutzFallback() {
    return (
        <div className="space-y-12 text-brand-gray-light leading-relaxed">
            {/* 1. Verantwortlicher */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Erklärung zur Informationspflicht</h2>
                <p>
                    Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten
                    Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
                    In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der
                    Datenverarbeitung im Rahmen unserer Website.
                </p>
            </section>

            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Verantwortlicher</h2>
                <p>
                    Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                </p>
                <p className="mt-4">
                    <strong className="text-white">Bernhard Beidl</strong><br />
                    Friedhofgasse 45<br />
                    7121 Weiden am See<br />
                    Österreich
                </p>
                <p className="mt-4">
                    Telefon: <a href="tel:+4369911095336" className="text-brand-green hover:underline">+43 699 110 95 336</a><br />
                    E-Mail: <a href="mailto:bernhard@personal-fitnesstrainer.at" className="text-brand-green hover:underline">bernhard@personal-fitnesstrainer.at</a>
                </p>
            </section>

            {/* Verarbeitete Datenarten */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Verarbeitete Datenarten</h2>
                <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Bestandsdaten (z.B. Namen, Adressen)</li>
                    <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
                    <li>Inhaltsdaten (z.B. Texteingaben im Kontaktformular)</li>
                    <li>Nutzungsdaten (z.B. besuchte Webseiten, Zugriffszeiten)</li>
                    <li>Meta-/Kommunikationsdaten (z.B. Geräteinformationen, IP-Adressen)</li>
                </ul>
            </section>

            {/* Rechtsgrundlagen */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Rechtsgrundlagen</h2>
                <p>Die Verarbeitung personenbezogener Daten erfolgt auf Basis folgender Rechtsgrundlagen:</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                    <li><strong className="text-white">Art. 6 Abs. 1 lit. a DSGVO</strong> — Einwilligung der betroffenen Person</li>
                    <li><strong className="text-white">Art. 6 Abs. 1 lit. b DSGVO</strong> — Vertragserfüllung und vorvertragliche Maßnahmen</li>
                    <li><strong className="text-white">Art. 6 Abs. 1 lit. f DSGVO</strong> — Berechtigte Interessen (z.B. Betrieb der Website)</li>
                </ul>
            </section>

            {/* Kontaktformular */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Kontaktformular</h2>
                <p>
                    Wenn Sie uns über das Kontaktformular auf unserer Website kontaktieren, werden folgende Daten erhoben:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Name</li>
                    <li>E-Mail-Adresse</li>
                    <li>Telefonnummer (optional)</li>
                    <li>Nachricht</li>
                    <li>Interesse (optional)</li>
                </ul>
                <p className="mt-4">
                    Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
                    bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage).
                    Die Daten werden nach Abschluss der Bearbeitung Ihrer Anfrage gelöscht, sofern keine
                    gesetzlichen Aufbewahrungspflichten bestehen.
                </p>
            </section>

            {/* E-Mail-Versand */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">E-Mail-Kommunikation (Resend)</h2>
                <p>
                    Für den Versand von E-Mails aus dem Kontaktformular nutzen wir den Dienst
                    &quot;Resend&quot; (Resend, Inc.). Dabei werden Ihre im Kontaktformular eingegebenen Daten
                    an die Server von Resend übermittelt, um die E-Mail zuzustellen. Weitere Informationen
                    finden Sie in der Datenschutzerklärung von Resend unter{' '}
                    <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-green underline hover:no-underline">
                        https://resend.com/legal/privacy-policy
                    </a>.
                </p>
            </section>

            {/* Cookies */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Cookies</h2>
                <p>
                    Diese Website verwendet ausschließlich technisch notwendige Cookies sowie einen
                    Cookie-Consent-Eintrag im lokalen Speicher (localStorage) Ihres Browsers. Es werden
                    keine Tracking-Cookies, Analyse-Cookies oder Cookies von Drittanbietern eingesetzt.
                </p>
                <p className="mt-4">
                    Der Cookie-Consent-Eintrag speichert Ihre Entscheidung bezüglich der Cookie-Nutzung
                    und dient dazu, Ihnen das Banner nicht erneut anzuzeigen. Rechtsgrundlage ist
                    Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                </p>
                <p className="mt-4">
                    Sie können die Speicherung von Cookies durch eine entsprechende Einstellung Ihrer
                    Browser-Software verhindern. Wir weisen jedoch darauf hin, dass Sie in diesem Fall
                    möglicherweise nicht alle Funktionen dieser Website vollumfänglich nutzen können.
                </p>
            </section>

            {/* Hosting */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Hosting</h2>
                <p>
                    Unsere Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
                    gehostet. Beim Besuch unserer Website werden automatisch Informationen in sogenannten
                    Server-Log-Dateien gespeichert, die Ihr Browser automatisch übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Browsertyp und Browserversion</li>
                    <li>Verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>IP-Adresse (anonymisiert)</li>
                    <li>Uhrzeit der Serveranfrage</li>
                </ul>
                <p className="mt-4">
                    Vercel ist unter dem EU-U.S. Data Privacy Framework zertifiziert. Weitere
                    Informationen finden Sie unter{' '}
                    <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-green underline hover:no-underline">
                        https://vercel.com/legal/privacy-policy
                    </a>.
                </p>
            </section>

            {/* CMS */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Content Management System (Sanity)</h2>
                <p>
                    Wir verwenden Sanity.io als Content Management System. Beim Abruf von Inhalten
                    werden API-Anfragen an die Server von Sanity (Sanity AS, Norwegen) gesendet. Dabei
                    werden keine personenbezogenen Daten der Websitebesucher an Sanity übermittelt.
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
                </p>
            </section>

            {/* Sicherheitsmaßnahmen */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Sicherheitsmaßnahmen</h2>
                <p>
                    Wir treffen nach Maßgabe des Art. 32 DSGVO unter Berücksichtigung des Stands der Technik,
                    der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der
                    Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos
                    für die Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische
                    Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
                </p>
            </section>

            {/* Weitergabe an Dritte */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Weitergabe an Dritte</h2>
                <p>
                    Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, sofern dies zur
                    Vertragsabwicklung erforderlich ist (z.B. Steuerberater) oder Sie ausdrücklich eingewilligt haben.
                </p>
            </section>

            {/* Rechte der Betroffenen */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Rechte der Betroffenen</h2>
                <p>
                    Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung,
                    Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                    <li><strong className="text-white">Auskunftsrecht</strong> — Recht auf Information über verarbeitete Daten (Art. 15 DSGVO)</li>
                    <li><strong className="text-white">Berichtigungsrecht</strong> — Recht auf Korrektur unrichtiger Daten (Art. 16 DSGVO)</li>
                    <li><strong className="text-white">Recht auf Löschung</strong> — &quot;Recht auf Vergessenwerden&quot; (Art. 17 DSGVO)</li>
                    <li><strong className="text-white">Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                    <li><strong className="text-white">Datenübertragbarkeit</strong> — Recht auf Erhalt und Weitergabe der Daten (Art. 20 DSGVO)</li>
                    <li><strong className="text-white">Widerspruchsrecht</strong> — insbesondere gegen Direktwerbung (Art. 21 DSGVO)</li>
                </ul>
                <p className="mt-4">
                    Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
                    <a href="mailto:bernhard@personal-fitnesstrainer.at" className="text-brand-green hover:underline">bernhard@personal-fitnesstrainer.at</a>
                </p>
            </section>

            {/* Widerrufsrecht */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Widerrufsrecht</h2>
                <p>
                    Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen
                    (Art. 7 Abs. 3 DSGVO). Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung
                    bleibt davon unberührt.
                </p>
            </section>

            {/* Beschwerderecht */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Beschwerderecht bei der Aufsichtsbehörde</h2>
                <p>
                    Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die
                    DSGVO verstößt, haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
                    beschweren. Zuständige Aufsichtsbehörde in Österreich ist:
                </p>
                <p className="mt-4">
                    <strong className="text-white">Österreichische Datenschutzbehörde</strong><br />
                    Barichgasse 40-42<br />
                    1030 Wien<br />
                    Telefon: +43 1 52 152-0<br />
                    E-Mail: <a href="mailto:dsb@dsb.gv.at" className="text-brand-green hover:underline">dsb@dsb.gv.at</a><br />
                    Website:{' '}
                    <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-brand-green underline hover:no-underline">
                        https://www.dsb.gv.at
                    </a>
                </p>
            </section>

            {/* Aufbewahrungsfristen */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Datenlöschung und Aufbewahrungsfristen</h2>
                <p>
                    Personenbezogene Daten werden gelöscht oder in ihrer Verarbeitung eingeschränkt, sobald
                    der Zweck der Speicherung entfällt. Darüber hinaus kann eine Speicherung erfolgen, wenn
                    dies durch gesetzliche Vorschriften vorgesehen ist. Nach Ablauf der gesetzlichen
                    Aufbewahrungsfristen (in Österreich: 7 Jahre für Buchhaltungsunterlagen) werden die
                    entsprechenden Daten routinemäßig gelöscht.
                </p>
            </section>

            {/* Soziale Medien */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Onlinepräsenzen in sozialen Medien</h2>
                <p>
                    Wir unterhalten Onlinepräsenzen auf den folgenden sozialen Netzwerken. Wenn Sie eine
                    dieser Plattformen besuchen, können Ihre Daten durch den jeweiligen Plattformbetreiber
                    verarbeitet werden:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>
                        <strong className="text-white">Facebook</strong> — Facebook Ireland Ltd., Dublin;{' '}
                        <a href="https://www.facebook.com/about/privacy/" target="_blank" rel="noopener noreferrer" className="text-brand-green underline hover:no-underline">Datenschutz</a>
                    </li>
                    <li>
                        <strong className="text-white">Instagram</strong> — Meta Platforms Ireland Ltd., Dublin;{' '}
                        <a href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener noreferrer" className="text-brand-green underline hover:no-underline">Datenschutz</a>
                    </li>
                </ul>
                <p className="mt-4">
                    Auf unserer Website werden keine Social-Media-Plugins eingebunden, die beim Seitenaufruf
                    Daten an die jeweiligen Netzwerke übertragen. Instagram-Bilder werden über unseren eigenen
                    Server bereitgestellt, sodass kein direkter Kontakt zwischen Ihrem Browser und Instagram-Servern
                    beim Besuch unserer Website stattfindet.
                </p>
            </section>

            {/* Aktualitaet */}
            <section>
                <h2 className="font-display text-2xl md:text-3xl text-white mb-4">Aktualität und Änderung dieser Datenschutzerklärung</h2>
                <p>
                    Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer
                    Website oder aufgrund geänderter gesetzlicher Vorgaben kann es notwendig werden,
                    diese Datenschutzerklärung zu ändern.
                </p>
                <p className="mt-4 text-brand-gray text-sm">
                    Stand: Februar 2026
                </p>
            </section>
        </div>
    );
}
