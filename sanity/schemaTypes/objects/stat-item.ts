import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'statItem',
    title: 'Stat Item',
    type: 'object',
    fields: [
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'unit',
            title: 'Unit',
            type: 'string',
            description: 'e.g., "m²", "+", ""',
        }),
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: 'label', subtitle: 'value' },
    },
})
