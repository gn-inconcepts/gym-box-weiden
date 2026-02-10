import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// Fallback images for each page
const FALLBACK_IMAGES: Record<string, string> = {
    'team-header': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2670&auto=format&fit=crop',
    'gym-hero': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop',
    'box-hero': 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop',
    'contact-hero': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop',
    'services-hero': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop',
    'pricing-hero': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2670&auto=format&fit=crop',
};

interface PageImage {
    url: string;
    altText: string;
    isFromSanity: boolean;
}

export async function getPageImage(pageKey: string): Promise<PageImage> {
    try {
        // Fetch from Sanity
        const result = await client.fetch(
            `*[_type == "pageContent" && pageKey == $pageKey][0]{ image, altText }`,
            { pageKey }
        );

        if (result?.image) {
            const imageUrl = urlFor(result.image)
                .width(2670)
                .quality(80)
                .format('webp')
                .url();

            return {
                url: imageUrl,
                altText: result.altText || '',
                isFromSanity: true,
            };
        }
    } catch (error) {
        console.error(`Failed to fetch page image for ${pageKey}:`, error);
    }

    // Fallback to stock photo
    return {
        url: FALLBACK_IMAGES[pageKey] || FALLBACK_IMAGES['team-header'],
        altText: `${pageKey} image`,
        isFromSanity: false,
    };
}
