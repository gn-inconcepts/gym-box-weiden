import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pageContent',
    title: 'Page Content',
    type: 'document',
    fields: [
        defineField({
            name: 'pageId',
            title: 'Page ID',
            type: 'string',
            description: 'Unique identifier for the page (e.g., "home", "gym", "box", "team")',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
        }),
        defineField({
            name: 'heroVideo',
            title: 'Hero Video',
            type: 'file',
            options: {
                accept: 'video/*',
            },
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image (fallback if no video)',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'heroCTA',
            title: 'Hero Call-to-Action',
            type: 'object',
            fields: [
                { name: 'text', type: 'string', title: 'Button Text' },
                { name: 'link', type: 'string', title: 'Button Link' },
            ],
        }),
        defineField({
            name: 'sections',
            title: 'Page Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Section Title' },
                        { name: 'subtitle', type: 'string', title: 'Section Subtitle' },
                        {
                            name: 'content',
                            type: 'array',
                            title: 'Content',
                            of: [{ type: 'block' }],
                        },
                        {
                            name: 'image',
                            type: 'image',
                            title: 'Section Image',
                            options: { hotspot: true },
                        },
                    ],
                },
            ],
        }),
    ],
})
