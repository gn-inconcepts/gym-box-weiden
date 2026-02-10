import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'priceMember',
            title: 'Price (Member)',
            type: 'string',
            description: 'e.g. "€10" or "Auf Anfrage"',
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'priceNonMember',
            title: 'Price (Non-Member)',
            type: 'string',
            description: 'e.g. "€30" or "Auf Anfrage"',
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Analyse & Diagnostik', value: 'analyse' },
                    { title: 'Coaching', value: 'coaching' },
                    { title: 'Training', value: 'training' },
                    { title: 'Therapie & Spezial', value: 'therapie' },
                ],
            },
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'Lowercase name of the Lucide icon (e.g. "activity", "dumbbell", "apple")',
            options: {
                list: [
                    'activity', 'apple', 'brain', 'check', 'dumbbell', 'heartPulse', 'search', 'user', 'users', 'star', 'zap', 'trophy', 'timer'
                ]
            },
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this service appears (lower numbers first)',
            initialValue: 0,
        }),
    ],
})
