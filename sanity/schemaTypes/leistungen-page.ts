import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'leistungenPage',
    title: 'Leistungen Page',
    type: 'document',
    groups: [
        { name: 'header', title: 'Header' },
        { name: 'intro', title: 'Intro' },
        { name: 'featuredCategories', title: 'Featured Categories' },
        { name: 'memberBenefits', title: 'Mitglieder-Vorteil' },
    ],
    fields: [
        // ── Header ──
        defineField({
            name: 'headerTitle',
            title: 'Page Title',
            type: 'string',
            group: 'header',
        }),
        defineField({
            name: 'headerSubtitle',
            title: 'Page Subtitle',
            type: 'text',
            group: 'header',
        }),
        defineField({
            name: 'headerImage',
            title: 'Header Image',
            type: 'image',
            options: { hotspot: true },
            group: 'header',
        }),

        // ── Intro ──
        defineField({
            name: 'introBadge',
            title: 'Badge Text',
            type: 'string',
            group: 'intro',
        }),
        defineField({
            name: 'introHeading',
            title: 'Heading',
            type: 'string',
            group: 'intro',
        }),
        defineField({
            name: 'introHeadingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            group: 'intro',
        }),
        defineField({
            name: 'introDescription',
            title: 'Description',
            type: 'text',
            group: 'intro',
        }),

        // ── Featured Categories ──
        defineField({
            name: 'featuredCategories',
            title: 'Featured Category Cards',
            type: 'array',
            of: [{ type: 'featureCard' }],
            group: 'featuredCategories',
        }),

        // ── Member Benefits ──
        defineField({
            name: 'benefitsHeading',
            title: 'Heading',
            type: 'string',
            group: 'memberBenefits',
        }),
        defineField({
            name: 'benefitsDescription',
            title: 'Description',
            type: 'text',
            group: 'memberBenefits',
        }),
        defineField({
            name: 'benefitsCta',
            title: 'CTA Button',
            type: 'ctaButton',
            group: 'memberBenefits',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Leistungen Page' }
        },
    },
})
