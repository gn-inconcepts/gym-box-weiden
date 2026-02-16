/**
 * Populate Legal Pages in Sanity CMS
 *
 * Creates Impressum and Datenschutz documents so the owner
 * can edit them directly in Sanity Studio.
 *
 * Run with: npx tsx scripts/populate-legal-pages.ts
 */

import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { randomUUID } from 'crypto';

config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

function block(text: string, style: string = 'normal') {
    return {
        _type: 'block',
        _key: randomUUID(),
        style,
        children: [{ _type: 'span', _key: randomUUID(), text }],
    };
}

function blockWithMarks(parts: { text: string; bold?: boolean }[], style: string = 'normal') {
    return {
        _type: 'block',
        _key: randomUUID(),
        style,
        markDefs: [],
        children: parts.map(p => ({
            _type: 'span',
            _key: randomUUID(),
            text: p.text,
            marks: p.bold ? ['strong'] : [],
        })),
    };
}

function blockWithLink(textBefore: string, linkText: string, url: string, textAfter: string = '') {
    const markKey = randomUUID();
    return {
        _type: 'block',
        _key: randomUUID(),
        style: 'normal',
        markDefs: [{ _type: 'link', _key: markKey, href: url }],
        children: [
            { _type: 'span', _key: randomUUID(), text: textBefore, marks: [] },
            { _type: 'span', _key: randomUUID(), text: linkText, marks: [markKey] },
            { _type: 'span', _key: randomUUID(), text: textAfter, marks: [] },
        ],
    };
}

const impressumContent = [
    block('Angaben gemäß § 5 ECG', 'h2'),
    blockWithMarks([
        { text: 'Bernhard Beidl', bold: true },
        { text: '\nEinzelunternehmen' },
    ]),
    blockWithMarks([
        { text: 'BERNHARD TRAINIERT', bold: true },
        { text: '\n(auch unter "Athlet des Lebens" / "GYM & BOX")' },
    ]),
    blockWithMarks([
        { text: 'Adresse:', bold: true },
        { text: '\nFriedhofgasse 45\n7121 Weiden am See\nÖsterreich' },
    ]),

    block('Kontakt', 'h2'),
    blockWithMarks([
        { text: 'Mobil: +43 699 110 95 336\nE-Mail: bernhard@personal-fitnesstrainer.at' },
    ]),
    blockWithLink('Website: ', 'https://gymandbox.at', 'https://gymandbox.at'),

    block('Haftungsausschluss', 'h2'),

    block('Haftung für Inhalte', 'h3'),
    block('Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Gemäß §§ 8 bis 10 ECG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.'),

    block('Haftung für Links', 'h3'),
    block('Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'),

    block('Urheberrecht', 'h3'),
    block('Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'),

    block('Online-Streitbeilegung', 'h2'),
    blockWithLink('Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ', 'https://ec.europa.eu/consumers/odr/', 'https://ec.europa.eu/consumers/odr/'),
    block('Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'),
];

const datenschutzContent = [
    block('Erklärung zur Informationspflicht', 'h2'),
    block('Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.'),

    block('Verantwortlicher', 'h2'),
    block('Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:'),
    blockWithMarks([
        { text: 'Bernhard Beidl', bold: true },
        { text: '\nFriedhofgasse 45\n7121 Weiden am See\nÖsterreich' },
    ]),
    block('Telefon: +43 699 110 95 336\nE-Mail: bernhard@personal-fitnesstrainer.at'),

    block('Verarbeitete Datenarten', 'h2'),
    block('Bestandsdaten (z.B. Namen, Adressen), Kontaktdaten (z.B. E-Mail, Telefonnummern), Inhaltsdaten (z.B. Texteingaben im Kontaktformular), Nutzungsdaten (z.B. besuchte Webseiten, Zugriffszeiten), Meta-/Kommunikationsdaten (z.B. Geräteinformationen, IP-Adressen).'),

    block('Rechtsgrundlagen', 'h2'),
    block('Die Verarbeitung personenbezogener Daten erfolgt auf Basis folgender Rechtsgrundlagen:'),
    blockWithMarks([
        { text: 'Art. 6 Abs. 1 lit. a DSGVO', bold: true },
        { text: ' — Einwilligung der betroffenen Person' },
    ]),
    blockWithMarks([
        { text: 'Art. 6 Abs. 1 lit. b DSGVO', bold: true },
        { text: ' — Vertragserfüllung und vorvertragliche Maßnahmen' },
    ]),
    blockWithMarks([
        { text: 'Art. 6 Abs. 1 lit. f DSGVO', bold: true },
        { text: ' — Berechtigte Interessen (z.B. Betrieb der Website)' },
    ]),

    block('Kontaktformular', 'h2'),
    block('Wenn Sie uns über das Kontaktformular auf unserer Website kontaktieren, werden folgende Daten erhoben: Name, E-Mail-Adresse, Telefonnummer (optional), Nachricht und Interesse (optional).'),
    block('Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Die Daten werden nach Abschluss der Bearbeitung Ihrer Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.'),

    block('E-Mail-Kommunikation (Resend)', 'h2'),
    blockWithLink('Für den Versand von E-Mails aus dem Kontaktformular nutzen wir den Dienst "Resend" (Resend, Inc.). Dabei werden Ihre im Kontaktformular eingegebenen Daten an die Server von Resend übermittelt, um die E-Mail zuzustellen. Weitere Informationen finden Sie in der Datenschutzerklärung von Resend unter ', 'https://resend.com/legal/privacy-policy', 'https://resend.com/legal/privacy-policy', '.'),

    block('Cookies', 'h2'),
    block('Diese Website verwendet ausschließlich technisch notwendige Cookies sowie einen Cookie-Consent-Eintrag im lokalen Speicher (localStorage) Ihres Browsers. Es werden keine Tracking-Cookies, Analyse-Cookies oder Cookies von Drittanbietern eingesetzt.'),
    block('Der Cookie-Consent-Eintrag speichert Ihre Entscheidung bezüglich der Cookie-Nutzung und dient dazu, Ihnen das Banner nicht erneut anzuzeigen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).'),
    block('Sie können die Speicherung von Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern. Wir weisen jedoch darauf hin, dass Sie in diesem Fall möglicherweise nicht alle Funktionen dieser Website vollumfänglich nutzen können.'),

    block('Hosting', 'h2'),
    block('Unsere Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Beim Besuch unserer Website werden automatisch Informationen in sogenannten Server-Log-Dateien gespeichert, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, IP-Adresse (anonymisiert) und Uhrzeit der Serveranfrage.'),
    blockWithLink('Vercel ist unter dem EU-U.S. Data Privacy Framework zertifiziert. Weitere Informationen finden Sie unter ', 'https://vercel.com/legal/privacy-policy', 'https://vercel.com/legal/privacy-policy', '.'),

    block('Content Management System (Sanity)', 'h2'),
    block('Wir verwenden Sanity.io als Content Management System. Beim Abruf von Inhalten werden API-Anfragen an die Server von Sanity (Sanity AS, Norwegen) gesendet. Dabei werden keine personenbezogenen Daten der Websitebesucher an Sanity übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.'),

    block('Sicherheitsmaßnahmen', 'h2'),
    block('Wir treffen nach Maßgabe des Art. 32 DSGVO unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos für die Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.'),

    block('Weitergabe an Dritte', 'h2'),
    block('Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, sofern dies zur Vertragsabwicklung erforderlich ist (z.B. Steuerberater) oder Sie ausdrücklich eingewilligt haben.'),

    block('Rechte der Betroffenen', 'h2'),
    block('Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu:'),
    blockWithMarks([{ text: 'Auskunftsrecht', bold: true }, { text: ' — Recht auf Information über verarbeitete Daten (Art. 15 DSGVO)' }]),
    blockWithMarks([{ text: 'Berichtigungsrecht', bold: true }, { text: ' — Recht auf Korrektur unrichtiger Daten (Art. 16 DSGVO)' }]),
    blockWithMarks([{ text: 'Recht auf Löschung', bold: true }, { text: ' — "Recht auf Vergessenwerden" (Art. 17 DSGVO)' }]),
    blockWithMarks([{ text: 'Einschränkung der Verarbeitung', bold: true }, { text: ' (Art. 18 DSGVO)' }]),
    blockWithMarks([{ text: 'Datenübertragbarkeit', bold: true }, { text: ' — Recht auf Erhalt und Weitergabe der Daten (Art. 20 DSGVO)' }]),
    blockWithMarks([{ text: 'Widerspruchsrecht', bold: true }, { text: ' — insbesondere gegen Direktwerbung (Art. 21 DSGVO)' }]),
    block('Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: bernhard@personal-fitnesstrainer.at'),

    block('Widerrufsrecht', 'h2'),
    block('Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.'),

    block('Beschwerderecht bei der Aufsichtsbehörde', 'h2'),
    block('Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständige Aufsichtsbehörde in Österreich ist:'),
    blockWithMarks([
        { text: 'Österreichische Datenschutzbehörde', bold: true },
        { text: '\nBarichgasse 40-42\n1030 Wien\nTelefon: +43 1 52 152-0\nE-Mail: dsb@dsb.gv.at' },
    ]),
    blockWithLink('Website: ', 'https://www.dsb.gv.at', 'https://www.dsb.gv.at'),

    block('Datenlöschung und Aufbewahrungsfristen', 'h2'),
    block('Personenbezogene Daten werden gelöscht oder in ihrer Verarbeitung eingeschränkt, sobald der Zweck der Speicherung entfällt. Darüber hinaus kann eine Speicherung erfolgen, wenn dies durch gesetzliche Vorschriften vorgesehen ist. Nach Ablauf der gesetzlichen Aufbewahrungsfristen (in Österreich: 7 Jahre für Buchhaltungsunterlagen) werden die entsprechenden Daten routinemäßig gelöscht.'),

    block('Onlinepräsenzen in sozialen Medien', 'h2'),
    block('Wir unterhalten Onlinepräsenzen auf Facebook (Facebook Ireland Ltd., Dublin) und Instagram (Meta Platforms Ireland Ltd., Dublin). Wenn Sie eine dieser Plattformen besuchen, können Ihre Daten durch den jeweiligen Plattformbetreiber verarbeitet werden.'),
    block('Auf unserer Website werden keine Social-Media-Plugins eingebunden, die beim Seitenaufruf Daten an die jeweiligen Netzwerke übertragen. Instagram-Bilder werden über unseren eigenen Server bereitgestellt, sodass kein direkter Kontakt zwischen Ihrem Browser und Instagram-Servern beim Besuch unserer Website stattfindet.'),

    block('Aktualität und Änderung dieser Datenschutzerklärung', 'h2'),
    block('Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.'),
    block('Stand: Februar 2026'),
];

async function populateLegalPages() {
    console.log('Starting legal pages population...\n');

    // Check for existing documents
    const existing = await client.fetch(
        `*[_type == "legalPage" && slug.current in ["impressum", "datenschutz"]]{ slug }`
    );
    const existingSlugs = existing.map((d: { slug: { current: string } }) => d.slug.current);

    // Impressum
    if (existingSlugs.includes('impressum')) {
        console.log('Impressum already exists in Sanity — skipping.');
    } else {
        console.log('Creating Impressum...');
        await client.create({
            _type: 'legalPage',
            title: 'Impressum',
            slug: { _type: 'slug', current: 'impressum' },
            content: impressumContent,
            lastUpdated: '2026-02-16',
        });
        console.log('Impressum created.');
    }

    // Datenschutz
    if (existingSlugs.includes('datenschutz')) {
        console.log('Datenschutz already exists in Sanity — skipping.');
    } else {
        console.log('Creating Datenschutzerklärung...');
        await client.create({
            _type: 'legalPage',
            title: 'Datenschutzerklärung',
            slug: { _type: 'slug', current: 'datenschutz' },
            content: datenschutzContent,
            lastUpdated: '2026-02-16',
        });
        console.log('Datenschutzerklärung created.');
    }

    console.log('\nDone! Legal pages are now available in Sanity Studio.');
}

populateLegalPages().catch(console.error);
