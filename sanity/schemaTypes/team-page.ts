import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'teamPage',
    title: 'Team Page',
    type: 'document',
    groups: [
        { name: 'header', title: 'Header' },
        { name: 'intro', title: 'Team Intro' },
        { name: 'warumPersonaltrainer', title: 'Warum Personaltrainer' },
        { name: 'certifications', title: 'Zertifizierungen' },
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
            name: 'introLabel',
            title: 'Section Label',
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
            name: 'introParagraph',
            title: 'Paragraph',
            type: 'text',
            group: 'intro',
        }),
        defineField({
            name: 'introImage',
            title: 'Intro Image',
            type: 'image',
            options: { hotspot: true },
            group: 'intro',
        }),

        // ── Warum Personaltrainer ──
        defineField({
            name: 'whyHeading',
            title: 'Heading',
            type: 'string',
            group: 'warumPersonaltrainer',
        }),
        defineField({
            name: 'whyHeadingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            group: 'warumPersonaltrainer',
        }),
        defineField({
            name: 'whyParagraph',
            title: 'Paragraph',
            type: 'text',
            group: 'warumPersonaltrainer',
        }),
        defineField({
            name: 'whyFeatures',
            title: 'Features',
            type: 'array',
            of: [{ type: 'featureCard' }],
            group: 'warumPersonaltrainer',
        }),

        // ── Certifications ──
        defineField({
            name: 'certImage',
            title: 'Bild über "Über 7 Institute"',
            description: 'Optionales Foto, das oberhalb der Zertifizierungs-Sektion angezeigt wird.',
            type: 'image',
            options: { hotspot: true },
            group: 'certifications',
        }),
        defineField({
            name: 'certHeading',
            title: 'Heading',
            type: 'string',
            group: 'certifications',
        }),
        defineField({
            name: 'certParagraph',
            title: 'Paragraph',
            type: 'text',
            group: 'certifications',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Team Page' }
        },
    },
})
