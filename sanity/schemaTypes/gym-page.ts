import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'gymPage',
    title: 'Gym Page',
    type: 'document',
    groups: [
        { name: 'header', title: 'Header' },
        { name: 'philosophy', title: 'Philosophie' },
        { name: 'wasErwartetDich', title: 'Was erwartet dich' },
        { name: 'features', title: 'Features Grid' },
        { name: 'allInOne', title: 'All in One' },
        { name: 'trainerSpotlight', title: 'Trainer Spotlight' },
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

        // ── Philosophy Section ──
        defineField({
            name: 'philosophyLabel',
            title: 'Section Label',
            type: 'string',
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyHeading',
            title: 'Heading',
            type: 'string',
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyHeadingHighlight',
            title: 'Heading Highlight (green text)',
            type: 'string',
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyParagraphs',
            title: 'Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyImage',
            title: 'Section Image',
            type: 'image',
            options: { hotspot: true },
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyPillars',
            title: 'Pillars (Training, Ernährung, etc.)',
            type: 'array',
            of: [{ type: 'featureCard' }],
            group: 'philosophy',
        }),

        // ── Was erwartet dich ──
        defineField({
            name: 'expectLabel',
            title: 'Section Label',
            type: 'string',
            group: 'wasErwartetDich',
        }),
        defineField({
            name: 'expectHeading',
            title: 'Heading',
            type: 'string',
            group: 'wasErwartetDich',
        }),
        defineField({
            name: 'expectHeadingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            group: 'wasErwartetDich',
        }),
        defineField({
            name: 'expectParagraphs',
            title: 'Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'wasErwartetDich',
        }),
        defineField({
            name: 'expectImage',
            title: 'Section Image',
            type: 'image',
            options: { hotspot: true },
            group: 'wasErwartetDich',
        }),
        defineField({
            name: 'expectTags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'wasErwartetDich',
        }),

        // ── Features Grid ──
        defineField({
            name: 'featuresHeading',
            title: 'Features Heading',
            type: 'string',
            group: 'features',
        }),
        defineField({
            name: 'featuresHeadingHighlight',
            title: 'Features Heading Highlight',
            type: 'string',
            group: 'features',
        }),
        defineField({
            name: 'featuresItems',
            title: 'Feature Cards',
            type: 'array',
            of: [{ type: 'featureCard' }],
            group: 'features',
        }),

        // ── All in One ──
        defineField({
            name: 'allInOneLabel',
            title: 'Section Label',
            type: 'string',
            group: 'allInOne',
        }),
        defineField({
            name: 'allInOneHeading',
            title: 'Heading',
            type: 'string',
            group: 'allInOne',
        }),
        defineField({
            name: 'allInOneHeadingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            group: 'allInOne',
        }),
        defineField({
            name: 'allInOneParagraphs',
            title: 'Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'allInOne',
        }),
        defineField({
            name: 'allInOneCta',
            title: 'CTA Button',
            type: 'ctaButton',
            group: 'allInOne',
        }),

        // ── Trainer Spotlight ──
        defineField({
            name: 'trainerSpotlight',
            title: 'Trainer Spotlight',
            type: 'trainerSpotlight',
            group: 'trainerSpotlight',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Gym Page' }
        },
    },
})
