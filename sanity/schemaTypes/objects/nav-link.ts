import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'navLink',
    title: 'Navigation Link',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'href',
            title: 'Link',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: 'label', subtitle: 'href' },
    },
})
