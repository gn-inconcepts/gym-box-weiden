import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'classPhase',
    title: 'Class Phase',
    type: 'object',
    fields: [
        defineField({
            name: 'number',
            title: 'Phase Number',
            type: 'string',
            description: 'e.g., "01", "02"',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Lucide icon name (e.g., "flame", "dumbbell", "activity")',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'duration',
            title: 'Duration',
            type: 'string',
            description: 'e.g., "10–15 Min."',
        }),
        defineField({
            name: 'focus',
            title: 'Focus',
            type: 'string',
        }),
    ],
    preview: {
        select: { title: 'title', subtitle: 'duration' },
    },
})
