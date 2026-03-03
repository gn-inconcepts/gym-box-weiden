import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'ctaButton',
    title: 'CTA Button',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Button Text',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'href',
            title: 'Link',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'variant',
            title: 'Variant',
            type: 'string',
            options: {
                list: [
                    { title: 'Primary (Green)', value: 'primary' },
                    { title: 'Secondary (White)', value: 'secondary' },
                    { title: 'Outline', value: 'outline' },
                ],
            },
            initialValue: 'primary',
        }),
    ],
    preview: {
        select: { title: 'text', subtitle: 'href' },
    },
})
