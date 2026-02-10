import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pageContent',
    title: 'Page Content',
    type: 'document',
    fields: [
        defineField({
            name: 'pageKey',
            title: 'Page Key',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'Unique identifier for the page (e.g., "team-header", "gym-hero")',
            options: {
                list: [
                    { title: 'Team Header Image', value: 'team-header' },
                    { title: 'Gym Hero Image', value: 'gym-hero' },
                    { title: 'Box Hero Image', value: 'box-hero' },
                    { title: 'Contact Hero Image', value: 'contact-hero' },
                    { title: 'Services Hero Image', value: 'services-hero' },
                    { title: 'Pricing Hero Image', value: 'pricing-hero' },
                ],
            },
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'altText',
            title: 'Alt Text',
            type: 'string',
            description: 'Describe the image for accessibility',
        }),
    ],
    preview: {
        select: {
            title: 'pageKey',
            media: 'image',
        },
        prepare({ title, media }) {
            return {
                title: title || 'Page Content',
                media,
            }
        },
    },
})
