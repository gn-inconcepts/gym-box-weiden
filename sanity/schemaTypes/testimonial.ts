import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
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
            title: 'Role / Description',
            type: 'string',
            description: 'e.g. "CrossFit Member" or "Personal Training Client"',
        }),
        defineField({
            name: 'text',
            title: 'Quote Text',
            type: 'text',
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
            name: 'rating',
            title: 'Rating',
            type: 'number',
            initialValue: 5,
            validation: (rule) => rule.min(1).max(5),
        }),
    ],
})
