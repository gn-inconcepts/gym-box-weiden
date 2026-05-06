import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'preisePage',
    title: 'Preise Page',
    type: 'document',
    groups: [
        { name: 'header', title: 'Header' },
        { name: 'gymSection', title: 'Gym Section' },
        { name: 'boxSection', title: 'Box Section' },
        { name: 'infoSection', title: 'Info Section' },
    ],
    fields: [
        // ── Header ──
        defineField({
            name: 'headerTitle',
            title: 'Page Title',
            type: 'string',
            group: 'header',
        }),
        defineField({
            name: 'headerSubtitle',
            title: 'Page Subtitle',
            type: 'text',
            group: 'header',
        }),
        defineField({
            name: 'headerImage',
            title: 'Header Image',
            type: 'image',
            options: { hotspot: true },
            group: 'header',
        }),

        // ── Gym Section ──
        defineField({
            name: 'gymHeading',
            title: 'Gym Section Heading',
            type: 'string',
            group: 'gymSection',
        }),
        defineField({
            name: 'gymHeadingHighlight',
            title: 'Gym Heading Highlight',
            type: 'string',
            group: 'gymSection',
        }),
        defineField({
            name: 'gymDescription',
            title: 'Gym Section Description',
            type: 'text',
            group: 'gymSection',
        }),
        defineField({
            name: 'gymHighlightLabel',
            title: 'Gym Highlight Badge Label',
            type: 'string',
            group: 'gymSection',
            description: 'e.g., "Beliebteste Wahl"',
        }),

        // ── Box Section ──
        defineField({
            name: 'boxHeading',
            title: 'Box Section Heading',
            type: 'string',
            group: 'boxSection',
        }),
        defineField({
            name: 'boxHeadingHighlight',
            title: 'Box Heading Highlight',
            type: 'string',
            group: 'boxSection',
        }),
        defineField({
            name: 'boxDescription',
            title: 'Box Section Description',
            type: 'text',
            group: 'boxSection',
        }),
        defineField({
            name: 'boxHighlightLabel',
            title: 'Box Highlight Badge Label',
            type: 'string',
            group: 'boxSection',
            description: 'e.g., "Best Value"',
        }),

        // ── Startpakete Section ──
        defineField({
            name: 'infoHeading',
            title: 'Überschrift',
            description: 'z. B. "Wähle dein persönliches Startpaket"',
            type: 'string',
            group: 'infoSection',
        }),
        defineField({
            name: 'startPackages',
            title: 'Startpakete',
            description: 'Liste der wählbaren Startpakete (z. B. Small, Standard Premium, Premium All In). Jedes Paket wird als eigene Karte angezeigt.',
            type: 'array',
            group: 'infoSection',
            of: [
                {
                    type: 'object',
                    name: 'startPackage',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                            description: 'z. B. "SMALL", "STANDARD PREMIUM"',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'subtitle',
                            title: 'Untertitel (optional)',
                            type: 'string',
                            description: 'z. B. "2 Termine"',
                        },
                        {
                            name: 'features',
                            title: 'Inklusivleistungen',
                            type: 'array',
                            of: [{ type: 'string' }],
                        },
                        {
                            name: 'durationNote',
                            title: 'Dauer-Hinweis (optional)',
                            type: 'string',
                            description: 'z. B. "Dauer Termin 1 ca. 1 Stunde, Termin 2 ca. 1-1,5 Std"',
                        },
                        {
                            name: 'price',
                            title: 'Preis (€)',
                            type: 'number',
                            validation: (rule) => rule.required().min(0),
                        },
                        {
                            name: 'recommended',
                            title: 'Hervorgehoben?',
                            description: 'Aktivieren, um dieses Paket als Highlight darzustellen.',
                            type: 'boolean',
                            initialValue: false,
                        },
                    ],
                    preview: {
                        select: { name: 'name', subtitle: 'subtitle', price: 'price', recommended: 'recommended' },
                        prepare({ name, subtitle, price, recommended }) {
                            const star = recommended ? ' ⭐' : ''
                            const sub = subtitle ? `${subtitle} — ` : ''
                            return {
                                title: `${name}${star}`,
                                subtitle: `${sub}€${price}`,
                            }
                        },
                    },
                },
            ],
        }),
        defineField({
            name: 'infoHighlight',
            title: 'Hervorgehobener Text (unter den Paketen)',
            description: 'z. B. "Sichere dir deinen individuellen Einstieg zu mehr Wohlbefinden"',
            type: 'string',
            group: 'infoSection',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Preise Page' }
        },
    },
})
