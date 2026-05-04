import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pricing',
    title: 'Mitgliedschaft / Preis',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titel',
            description: 'z. B. "Weekend", "Early Bird", "Vollmitgliedschaft"',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Kategorie',
            description: 'In welchem Bereich erscheint dieser Preis?',
            type: 'string',
            options: {
                list: [
                    { title: 'Gym', value: 'gym' },
                    { title: 'Box', value: 'box' }
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'pricePrefix',
            title: 'Preis-Präfix (optional)',
            description: 'Optionaler Text vor dem Preis — z. B. "Ab" für "Ab €25 / Monat". Leer lassen für einen festen Preis.',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Preis (€)',
            description: 'Nur die Zahl ohne € — z. B. 25, 48, 150',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'interval',
            title: 'Intervall',
            description: 'z. B. "/ Monat" oder "einmalig"',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Beschreibung (optional)',
            description: 'Wird beim hervorgehobenen Plan statt der Feature-Liste angezeigt. Bei normalen Plänen ungenutzt — dort die Features verwenden.',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'features',
            title: 'Features / Stichpunkte',
            description: 'Aufzählungspunkte, die im Preis-Karten-Body erscheinen.',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'recommended',
            title: 'Hervorgehoben?',
            description: 'Aktivieren, um diesen Plan als großen Highlight-Karten ("Beliebteste Wahl" / "Best Value") darzustellen. Nur EIN Plan pro Kategorie sollte aktiviert sein.',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            price: 'price',
            prefix: 'pricePrefix',
            interval: 'interval',
            recommended: 'recommended',
        },
        prepare({ title, category, price, prefix, interval, recommended }) {
            const priceText = `${prefix ? prefix + ' ' : ''}€${price}${interval ? ' ' + interval : ''}`
            const star = recommended ? ' ⭐' : ''
            return {
                title: `${title}${star}`,
                subtitle: `${category?.toUpperCase() ?? ''} — ${priceText}`,
            }
        },
    },
})
