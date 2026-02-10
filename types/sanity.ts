export interface Trainer {
    _id: string;
    name: string;
    role: string;
    image: any;
    bio: any[];
    specs: string;
    tags: string[];
    category: "all" | "gym" | "box";
}

export interface Pricing {
    _id: string;
    title: string;
    price: number;
    interval: string;
    features: string[];
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
