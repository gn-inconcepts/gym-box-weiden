import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'legalPage',
    title: 'Rechtliche Seiten',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Titel',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Inhalt',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Zuletzt aktualisiert',
            type: 'date',
        }),
    ],
})
