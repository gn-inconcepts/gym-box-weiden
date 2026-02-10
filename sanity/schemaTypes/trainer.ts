import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'trainer',
    title: 'Trainer',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'specs',
            title: 'Specs (e.g. "Personal Training · ...")',
            type: 'string',
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'longBio',
            title: 'Long Bio',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Extended biography with full background details',
        }),
        defineField({
            name: 'credentials',
            title: 'Credentials & Qualifications',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of certifications, degrees, and qualifications',
        }),
        defineField({
            name: 'highlightQuote',
            title: 'Highlight Quote',
            type: 'text',
            description: 'A standout quote or philosophy statement',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Gym', value: 'gym' },
                    { title: 'Box', value: 'box' },
                    { title: 'All', value: 'all' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
    ],
})
