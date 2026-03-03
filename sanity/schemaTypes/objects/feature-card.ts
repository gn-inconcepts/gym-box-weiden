import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'featureCard',
    title: 'Feature Card',
    type: 'object',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Lucide icon name (e.g., "dumbbell", "apple", "brain", "heartPulse")',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'number',
            title: 'Number',
            type: 'string',
            description: 'Display number (e.g., "01")',
        }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'description' },
    },
})
