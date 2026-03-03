import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero' },
        { name: 'brandCards', title: 'Brand Cards' },
        { name: 'philosophy', title: 'Philosophie' },
        { name: 'philosophyDetail', title: 'Philosophie Detail' },
        { name: 'servicesShowcase', title: 'Services Showcase' },
        { name: 'cta', title: 'CTA Section' },
    ],
    fields: [
        // ── Hero ──
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroHeadingLine1',
            title: 'Hero Heading Line 1',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroHeadingLine2',
            title: 'Hero Heading Line 2 (highlighted)',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
            group: 'hero',
        }),
        defineField({
            name: 'heroVideoUrl',
            title: 'Hero Video URL',
            type: 'url',
            group: 'hero',
        }),
        defineField({
            name: 'heroCta',
            title: 'Hero CTA Buttons',
            type: 'array',
            of: [{ type: 'ctaButton' }],
            group: 'hero',
        }),

        // ── Brand Cards ──
        defineField({
            name: 'gymCardTitle',
            title: 'Gym Card Title',
            type: 'string',
            group: 'brandCards',
        }),
        defineField({
            name: 'gymCardDescription',
            title: 'Gym Card Description',
            type: 'text',
            group: 'brandCards',
        }),
        defineField({
            name: 'gymCardImage',
            title: 'Gym Card Image',
            type: 'image',
            options: { hotspot: true },
            group: 'brandCards',
        }),
        defineField({
            name: 'boxCardTitle',
            title: 'Box Card Title',
            type: 'string',
            group: 'brandCards',
        }),
        defineField({
            name: 'boxCardDescription',
            title: 'Box Card Description',
            type: 'text',
            group: 'brandCards',
        }),
        defineField({
            name: 'boxCardImage',
            title: 'Box Card Image',
            type: 'image',
            options: { hotspot: true },
            group: 'brandCards',
        }),

        // ── Philosophy ──
        defineField({
            name: 'philosophyLabel',
            title: 'Philosophy Section Label',
            type: 'string',
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyHeading',
            title: 'Philosophy Heading',
            type: 'string',
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyHeadingHighlight',
            title: 'Philosophy Heading Highlight',
            type: 'string',
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyDescription',
            title: 'Philosophy Description',
            type: 'text',
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyPillars',
            title: 'Philosophy Pillars',
            type: 'array',
            of: [{ type: 'featureCard' }],
            group: 'philosophy',
        }),

        // ── Philosophy Detail ──
        defineField({
            name: 'philosophyDetailLabel',
            title: 'Detail Section Label',
            type: 'string',
            group: 'philosophyDetail',
        }),
        defineField({
            name: 'philosophyDetailHeading',
            title: 'Detail Heading',
            type: 'string',
            group: 'philosophyDetail',
        }),
        defineField({
            name: 'philosophyDetailHeadingHighlight',
            title: 'Detail Heading Highlight',
            type: 'string',
            group: 'philosophyDetail',
        }),
        defineField({
            name: 'philosophyDetailParagraphs',
            title: 'Detail Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'philosophyDetail',
        }),
        defineField({
            name: 'philosophyDetailItems',
            title: 'Detail Items',
            type: 'array',
            of: [{ type: 'featureCard' }],
            group: 'philosophyDetail',
        }),

        // ── Services Showcase ──
        defineField({
            name: 'servicesHeading',
            title: 'Services Heading',
            type: 'string',
            group: 'servicesShowcase',
        }),
        defineField({
            name: 'servicesItems',
            title: 'Services Items',
            type: 'array',
            of: [{ type: 'featureCard' }],
            group: 'servicesShowcase',
        }),

        // ── CTA ──
        defineField({
            name: 'ctaHeading',
            title: 'CTA Heading',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'ctaHeadingHighlight',
            title: 'CTA Heading Highlight',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'ctaDescription',
            title: 'CTA Description',
            type: 'text',
            group: 'cta',
        }),
        defineField({
            name: 'ctaButton',
            title: 'CTA Button',
            type: 'ctaButton',
            group: 'cta',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Home Page' }
        },
    },
})
