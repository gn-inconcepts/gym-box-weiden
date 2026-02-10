import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'instagramPost',
    title: 'Instagram Post',
    type: 'document',
    fields: [
        defineField({
            name: 'postId',
            title: 'Instagram Post ID',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'Unique Instagram post ID',
        }),
        defineField({
            name: 'imageUrl',
            title: 'Image URL',
            type: 'url',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'cachedImage',
            title: 'Cached Image',
            type: 'image',
            description: 'Local cached version of the Instagram image',
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'text',
        }),
        defineField({
            name: 'permalink',
            title: 'Permalink',
            type: 'url',
            description: 'Link to the Instagram post',
        }),
        defineField({
            name: 'timestamp',
            title: 'Post Timestamp',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mediaType',
            title: 'Media Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Image', value: 'IMAGE' },
                    { title: 'Video', value: 'VIDEO' },
                    { title: 'Carousel', value: 'CAROUSEL_ALBUM' },
                ],
            },
        }),
        defineField({
            name: 'syncedAt',
            title: 'Synced At',
            type: 'datetime',
            description: 'When this post was last synced from Instagram',
        }),
    ],
    preview: {
        select: {
            caption: 'caption',
            timestamp: 'timestamp',
            image: 'cachedImage',
        },
        prepare({ caption, timestamp, image }) {
            const date = timestamp ? new Date(timestamp).toLocaleDateString() : 'No date'
            return {
                title: caption?.substring(0, 60) || 'No caption',
                subtitle: date,
                media: image,
            }
        },
    },
})
