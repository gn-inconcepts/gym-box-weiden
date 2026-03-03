import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'trainerSpotlight',
    title: 'Trainer Spotlight',
    type: 'object',
    description: 'Reference a trainer from the CMS or enter details manually',
    fields: [
        defineField({
            name: 'trainer',
            title: 'Trainer Reference',
            type: 'reference',
            to: [{ type: 'trainer' }],
            description: 'Select a trainer from the CMS (overrides manual fields)',
        }),
        defineField({
            name: 'name',
            title: 'Name (manual)',
            type: 'string',
            description: 'Used if no trainer reference is set',
        }),
        defineField({
            name: 'role',
            title: 'Role (manual)',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image (manual)',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'bio',
            title: 'Bio (manual)',
            type: 'text',
        }),
        defineField({
            name: 'specialties',
            title: 'Specialties (manual)',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            trainerName: 'trainer.name',
            manualName: 'name',
        },
        prepare({ trainerName, manualName }) {
            return { title: trainerName || manualName || 'Trainer Spotlight' }
        },
    },
})
