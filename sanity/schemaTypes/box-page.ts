import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'boxPage',
    title: 'Box Page',
    type: 'document',
    groups: [
        { name: 'header', title: 'Header' },
        { name: 'originStory', title: 'Origin Story' },
        { name: 'wasIstCrossfit', title: 'Was ist CrossFit' },
        { name: 'coreValues', title: 'Core Values' },
        { name: 'classStructure', title: 'Class Structure' },
        { name: 'gymBoxStory', title: 'GYM+BOX Story' },
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

        // ── Origin Story ──
        defineField({
            name: 'originLabel',
            title: 'Section Label',
            type: 'string',
            group: 'originStory',
        }),
        defineField({
            name: 'originHeading',
            title: 'Heading',
            type: 'string',
            group: 'originStory',
        }),
        defineField({
            name: 'originHeadingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            group: 'originStory',
        }),
        defineField({
            name: 'originParagraphs',
            title: 'Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'originStory',
        }),
        defineField({
            name: 'originImage',
            title: 'Section Image',
            type: 'image',
            options: { hotspot: true },
            group: 'originStory',
        }),

        // ── Was ist CrossFit ──
        defineField({
            name: 'crossfitLabel',
            title: 'Section Label',
            type: 'string',
            group: 'wasIstCrossfit',
        }),
        defineField({
            name: 'crossfitHeading',
            title: 'Heading',
            type: 'string',
            group: 'wasIstCrossfit',
        }),
        defineField({
            name: 'crossfitHeadingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            group: 'wasIstCrossfit',
        }),
        defineField({
            name: 'crossfitParagraphs',
            title: 'Paragraphs',
            type: 'array',
            of: [{ type: 'text' }],
            group: 'wasIstCrossfit',
        }),
        defineField({
            name: 'crossfitHighlightText',
            title: 'Highlight Text (bold)',
            type: 'string',
            group: 'wasIstCrossfit',
        }),
        defineField({
            name: 'crossfitImage',
            title: 'Section Image',
            type: 'image',
            options: { hotspot: true },
            group: 'wasIstCrossfit',
        }),

        // ── Core Values ──
        defineField({
            name: 'valuesHeading',
            title: 'Values Heading',
            type: 'string',
            group: 'coreValues',
        }),
        defineField({
            name: 'valuesHeadingHighlight',
            title: 'Values Heading Highlight',
            type: 'string',
            group: 'coreValues',
        }),
        defineField({
            name: 'valuesItems',
            title: 'Value Cards',
            type: 'array',
            of: [{ type: 'featureCard' }],
            group: 'coreValues',
        }),

        // ── Class Structure ──
        defineField({
            name: 'classLabel',
            title: 'Section Label',
            type: 'string',
            group: 'classStructure',
        }),
        defineField({
            name: 'classImage',
            title: 'Bild über "So funktioniert eine Session"',
            description: 'Optionales Foto, das oberhalb der Session-Sektion angezeigt wird.',
            type: 'image',
            options: { hotspot: true },
            group: 'classStructure',
        }),
        defineField({
            name: 'classHeading',
            title: 'Heading',
            type: 'string',
            group: 'classStructure',
        }),
        defineField({
            name: 'classHeadingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            group: 'classStructure',
        }),
        defineField({
            name: 'classPhases',
            title: 'Class Phases',
            type: 'array',
            of: [{ type: 'classPhase' }],
            group: 'classStructure',
        }),

        // ── GYM+BOX Story ──
        defineField({
            name: 'storyHeading',
            title: 'Heading',
            type: 'string',
            group: 'gymBoxStory',
        }),
        defineField({
            name: 'storyHeadingHighlight',
            title: 'Heading Highlight',
            type: 'string',
            group: 'gymBoxStory',
        }),
        defineField({
            name: 'storyParagraph',
            title: 'Paragraph',
            type: 'text',
            group: 'gymBoxStory',
        }),
        defineField({
            name: 'storyBoxTitle',
            title: 'Highlight Box Title',
            type: 'string',
            group: 'gymBoxStory',
        }),
        defineField({
            name: 'storyBoxText',
            title: 'Highlight Box Text',
            type: 'text',
            group: 'gymBoxStory',
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
            return { title: 'Box Page' }
        },
    },
})
