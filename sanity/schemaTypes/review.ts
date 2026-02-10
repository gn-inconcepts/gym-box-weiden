import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
        defineField({
            name: 'authorName',
            title: 'Author Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'authorImage',
            title: 'Author Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (rule) => rule.required().min(1).max(5),
            description: '1-5 stars',
        }),
        defineField({
            name: 'text',
            title: 'Review Text',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Review Date',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string',
            options: {
                list: [
                    { title: 'Google', value: 'google' },
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'Manual Entry', value: 'manual' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'googleReviewId',
            title: 'Google Review ID',
            type: 'string',
            description: 'Original Google review ID (for synced reviews)',
            hidden: ({ document }) => document?.source !== 'google',
        }),
        defineField({
            name: 'verified',
            title: 'Verified',
            type: 'boolean',
            initialValue: true,
            description: 'Is this a verified review?',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
            description: 'Show this review on the homepage',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            description: 'When to start showing this review (for weekly reveal)',
        }),
    ],
    preview: {
        select: {
            title: 'authorName',
            subtitle: 'text',
            rating: 'rating',
        },
        prepare({ title, subtitle, rating }) {
            return {
                title: `${title} - ${'⭐'.repeat(rating)}`,
                subtitle: subtitle?.substring(0, 60) + '...',
            }
        },
    },
})
