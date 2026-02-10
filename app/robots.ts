import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://gymandbox.at';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/studio/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
