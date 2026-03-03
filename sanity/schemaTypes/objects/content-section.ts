import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contentSection',
    title: 'Content Section',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'Small label above heading (e.g., "Unsere Überzeugung")',
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'headingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            description: 'Text highlighted in green within the heading',
        }),
        defineField({
            name: 'paragraphs',
            title: 'Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: { title: 'heading', subtitle: 'label' },
    },
})
