export interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
        url?: string;
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface Trainer {
    _id: string;
    name: string;
    role: string;
    image: SanityImage | string;
    bio: unknown[];
    specs: string;
    tags: string[];
    category: "all" | "gym" | "box";
}

export interface Pricing {
    _id: string;
    title: string;
    pricePrefix?: string;
    price: number;
    interval: string;
    description?: string;
    features?: string[];
    recommended: boolean;
    category: "gym" | "box";
}

export interface Service {
    _id: string;
    name: string;
    description: string;
    priceMember: string;
    priceNonMember: string;
    category: string;
    icon: string;
}

export interface SiteSettings {
    siteName?: string;
    tagline?: string;
    spaceSize?: string;
    registrationFee?: number;
    contact?: {
        email?: string;
        phone?: string;
        address?: string;
    };
    social?: {
        instagram?: string;
        facebook?: string;
        youtube?: string;
    };
    openingHours?: {
        days: string;
        hours: string;
    }[];
    equipmentBrands?: string[];
    ogImage?: {
        asset: {
            url: string;
        };
    };
    navigation?: {
        _key?: string;
        label: string;
        href: string;
    }[];
    footerTagline?: string;
    footerDescription?: string;
    stats?: {
        _key?: string;
        value: string;
        unit?: string;
        label: string;
    }[];
}
