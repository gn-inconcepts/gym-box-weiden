import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'text',
            description: 'Main site tagline/philosophy',
        }),
        defineField({
            name: 'spaceSize',
            title: 'Space Size',
            type: 'string',
            description: 'e.g., "500 m²"',
        }),
        defineField({
            name: 'registrationFee',
            title: 'Registration Fee',
            type: 'number',
            description: 'Initial registration/start package fee (€)',
        }),
        defineField({
            name: 'contact',
            title: 'Contact Information',
            type: 'object',
            fields: [
                { name: 'email', type: 'string', title: 'Email' },
                { name: 'phone', type: 'string', title: 'Phone' },
                { name: 'address', type: 'text', title: 'Address' },
            ],
        }),
        defineField({
            name: 'social',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                { name: 'instagram', type: 'url', title: 'Instagram URL' },
                { name: 'facebook', type: 'url', title: 'Facebook URL' },
                { name: 'youtube', type: 'url', title: 'YouTube URL' },
            ],
        }),
        defineField({
            name: 'openingHours',
            title: 'Opening Hours',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'days', type: 'string', title: 'Days (e.g., "Mon-Fri")' },
                        { name: 'hours', type: 'string', title: 'Hours (e.g., "6:00 - 22:00")' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'equipmentBrands',
            title: 'Equipment Brands',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of equipment brands (e.g., Eleiko, Gym80)',
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image (Social Media Preview)',
            type: 'image',
            description: 'Wird als Vorschaubild beim Teilen auf Social Media verwendet. Empfohlene Größe: 1200x630px.',
            options: {
                hotspot: true,
            },
        }),

        // ── Navigation ──
        defineField({
            name: 'navigation',
            title: 'Navigation Links',
            type: 'array',
            of: [{ type: 'navLink' }],
            description: 'Main navigation links (header & footer)',
        }),

        // ── Footer ──
        defineField({
            name: 'footerTagline',
            title: 'Footer Tagline',
            type: 'string',
            description: 'Short tagline shown in footer (e.g., "GESUNDHEIT IST ALLES")',
        }),
        defineField({
            name: 'footerDescription',
            title: 'Footer Description',
            type: 'text',
            description: 'Brief description shown in footer',
        }),

        // ── Stats ──
        defineField({
            name: 'stats',
            title: 'Stats Bar Items',
            type: 'array',
            of: [{ type: 'statItem' }],
            description: 'Statistics displayed on the home page stats bar',
        }),
    ],
})
