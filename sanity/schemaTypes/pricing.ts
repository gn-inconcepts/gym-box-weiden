import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pricing',
    title: 'Membership Pricing',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price (€)',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'interval',
            title: 'Interval (e.g., / Monat)',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Brief description of this membership plan',
        }),
        defineField({
            name: 'access',
            title: 'Access Details',
            type: 'text',
            description: 'Details about facility access and hours',
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'highlightFeature',
            title: 'Highlight Feature',
            type: 'string',
            description: 'Main selling point or standout feature',
        }),
        defineField({
            name: 'recommended',
            title: 'Recommended?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Gym', value: 'gym' },
                    { title: 'Box', value: 'box' }
                ]
            }
        })
    ],
})
