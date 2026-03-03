import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'kontaktPage',
    title: 'Kontakt Page',
    type: 'document',
    groups: [
        { name: 'header', title: 'Header' },
        { name: 'contactOptions', title: 'Contact Options' },
        { name: 'formSection', title: 'Form Section' },
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

        // ── Contact Options ──
        defineField({
            name: 'contactOptions',
            title: 'Contact Option Cards',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'text', type: 'text', title: 'Description' },
                    ],
                    preview: {
                        select: { title: 'title' },
                    },
                },
            ],
            group: 'contactOptions',
        }),

        // ── Form Section ──
        defineField({
            name: 'formLabel',
            title: 'Form Section Label',
            type: 'string',
            group: 'formSection',
        }),
        defineField({
            name: 'formHeading',
            title: 'Form Heading',
            type: 'string',
            group: 'formSection',
        }),
        defineField({
            name: 'formHeadingHighlight',
            title: 'Form Heading Highlight',
            type: 'string',
            group: 'formSection',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Kontakt Page' }
        },
    },
})
