import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'preisePage',
    title: 'Preise Page',
    type: 'document',
    groups: [
        { name: 'header', title: 'Header' },
        { name: 'gymSection', title: 'Gym Section' },
        { name: 'boxSection', title: 'Box Section' },
        { name: 'infoSection', title: 'Info Section' },
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

        // ── Gym Section ──
        defineField({
            name: 'gymHeading',
            title: 'Gym Section Heading',
            type: 'string',
            group: 'gymSection',
        }),
        defineField({
            name: 'gymHeadingHighlight',
            title: 'Gym Heading Highlight',
            type: 'string',
            group: 'gymSection',
        }),
        defineField({
            name: 'gymDescription',
            title: 'Gym Section Description',
            type: 'text',
            group: 'gymSection',
        }),
        defineField({
            name: 'gymHighlightLabel',
            title: 'Gym Highlight Badge Label',
            type: 'string',
            group: 'gymSection',
            description: 'e.g., "Beliebteste Wahl"',
        }),

        // ── Box Section ──
        defineField({
            name: 'boxHeading',
            title: 'Box Section Heading',
            type: 'string',
            group: 'boxSection',
        }),
        defineField({
            name: 'boxHeadingHighlight',
            title: 'Box Heading Highlight',
            type: 'string',
            group: 'boxSection',
        }),
        defineField({
            name: 'boxDescription',
            title: 'Box Section Description',
            type: 'text',
            group: 'boxSection',
        }),
        defineField({
            name: 'boxHighlightLabel',
            title: 'Box Highlight Badge Label',
            type: 'string',
            group: 'boxSection',
            description: 'e.g., "Best Value"',
        }),

        // ── Info Section ──
        defineField({
            name: 'infoHeading',
            title: 'Info Heading',
            type: 'string',
            group: 'infoSection',
        }),
        defineField({
            name: 'infoDescription',
            title: 'Info Description',
            type: 'text',
            group: 'infoSection',
        }),
        defineField({
            name: 'infoHighlight',
            title: 'Info Highlight Text',
            type: 'string',
            group: 'infoSection',
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Preise Page' }
        },
    },
})
