export function LocalBusinessSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://gymandbox.at',
        name: 'GYM & BOX',
        image: 'https://gymandbox.at/og-image.jpg',
        description:
            'Dein Gym und CrossFit Box in Weiden am See. Über 500 m² für Training, Ernährung, Regeneration und Reflexion.',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Friedhofgasse 45',
            addressLocality: 'Weiden am See',
            postalCode: '7121',
            addressCountry: 'AT',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 47.9134,
            longitude: 16.8784,
        },
        url: 'https://gymandbox.at',
        telephone: '+4369911095336',
        email: 'bernhard@personal-fitnesstrainer.at',
        priceRange: '€€',
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '06:30',
                closes: '22:00',
            },
        ],
        sameAs: [
            'https://www.instagram.com/bernhardtrainiert/',
            'https://www.facebook.com/Bernhardtrainiert/',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'GYM & BOX',
        url: 'https://gymandbox.at',
        logo: 'https://gymandbox.at/logo.png',
        description:
            'GYM & BOX ist dein Gym und CrossFit Box in Weiden am See mit professionellem Personal Training, Ernährungscoaching und ganzheitlichem Gesundheitskonzept.',
        foundingDate: '2014',
        founders: [
            {
                '@type': 'Person',
                name: 'Bernhard',
            },
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+4369911095336',
            contactType: 'Customer Service',
            email: 'bernhard@personal-fitnesstrainer.at',
            availableLanguage: 'German',
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Friedhofgasse 45',
            addressLocality: 'Weiden am See',
            postalCode: '7121',
            addressCountry: 'AT',
        },
        sameAs: [
            'https://www.instagram.com/bernhardtrainiert/',
            'https://www.facebook.com/Bernhardtrainiert/',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function ServiceSchema({
    name,
    description,
    price,
}: {
    name: string;
    description: string;
    price?: string;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: name,
        provider: {
            '@type': 'LocalBusiness',
            name: 'GYM & BOX',
        },
        description,
        ...(price && {
            offers: {
                '@type': 'Offer',
                price,
                priceCurrency: 'EUR',
            },
        }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function GymServiceSchema({
    services,
}: {
    services: { name: string; description: string; price?: string }[];
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'HealthAndBeautyBusiness',
        name: 'GYM & BOX',
        url: 'https://gymandbox.at/leistungen',
        description:
            'Professionelle Fitness-Services in Weiden am See: Personal Training, Ernährungscoaching, Körperanalyse, Physiotherapie und mehr.',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Friedhofgasse 45',
            addressLocality: 'Weiden am See',
            postalCode: '7121',
            addressCountry: 'AT',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Fitness & Gesundheits-Services',
            itemListElement: services.map((service) => ({
                '@type': 'OfferCatalog',
                name: service.name,
                description: service.description,
                ...(service.price && {
                    itemOffered: {
                        '@type': 'Service',
                        name: service.name,
                        offers: {
                            '@type': 'Offer',
                            price: service.price,
                            priceCurrency: 'EUR',
                        },
                    },
                }),
            })),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function ReviewAggregateSchema({
    ratingValue,
    reviewCount,
    bestRating = 5,
    worstRating = 1,
}: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'GYM & BOX',
        url: 'https://gymandbox.at',
        image: 'https://gymandbox.at/og-image.jpg',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Friedhofgasse 45',
            addressLocality: 'Weiden am See',
            postalCode: '7121',
            addressCountry: 'AT',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue,
            reviewCount,
            bestRating,
            worstRating,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
