import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'mediaAsset',
    title: 'Media Asset',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Alt text / description for accessibility',
        }),
        defineField({
            name: 'assetType',
            title: 'Asset Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'image' },
                    { title: 'Video', value: 'video' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            hidden: ({ document }) => document?.assetType !== 'image',
        }),
        defineField({
            name: 'video',
            title: 'Video',
            type: 'file',
            options: {
                accept: 'video/*',
            },
            hidden: ({ document }) => document?.assetType !== 'video',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Hero', value: 'hero' },
                    { title: 'Gym', value: 'gym' },
                    { title: 'Box', value: 'box' },
                    { title: 'Team', value: 'team' },
                    { title: 'Testimonials', value: 'testimonials' },
                    { title: 'Facility', value: 'facility' },
                    { title: 'Equipment', value: 'equipment' },
                    { title: 'Contact', value: 'contact' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Additional tags for organization',
        }),
        defineField({
            name: 'source',
            title: 'Source',
            type: 'string',
            description: 'Where this asset came from (e.g., "Pexels", "Client Provided")',
        }),
        defineField({
            name: 'usedIn',
            title: 'Used In',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Pages where this asset is used',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            image: 'image',
            assetType: 'assetType',
        },
        prepare({ title, category, image, assetType }) {
            return {
                title,
                subtitle: `${assetType?.toUpperCase()} - ${category}`,
                media: image,
            }
        },
    },
})
