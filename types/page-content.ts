import { SanityImage } from './sanity'

// ── Reusable Inline Object Types ──

export interface FeatureCardData {
    _key?: string
    icon?: string
    title: string
    description?: string
    number?: string
}

export interface ContentSectionData {
    label?: string
    heading?: string
    headingHighlight?: string
    paragraphs?: string[]
    image?: SanityImage
}

export interface StatItemData {
    _key?: string
    value: string
    unit?: string
    label: string
}

export interface CtaButtonData {
    text: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
}

export interface NavLinkData {
    _key?: string
    label: string
    href: string
}

export interface ClassPhaseData {
    _key?: string
    number?: string
    title: string
    icon?: string
    description?: string
    duration?: string
    focus?: string
}

export interface TrainerSpotlightData {
    trainer?: {
        _id: string
        name: string
        role: string
        image: SanityImage | string
        specs?: string
        bio?: unknown[]
    }
    name?: string
    role?: string
    image?: SanityImage
    bio?: string
    specialties?: string[]
}

// ── Page Singleton Types ──

export interface HomePageData {
    // Hero
    heroBadge?: string
    heroHeadingLine1?: string
    heroHeadingLine2?: string
    heroDescription?: string
    heroVideoUrl?: string
    heroCta?: CtaButtonData[]
    // Brand Cards
    gymCardTitle?: string
    gymCardDescription?: string
    gymCardImage?: SanityImage
    boxCardTitle?: string
    boxCardDescription?: string
    boxCardImage?: SanityImage
    // Philosophy
    philosophyLabel?: string
    philosophyHeading?: string
    philosophyHeadingHighlight?: string
    philosophyDescription?: string
    philosophyPillars?: FeatureCardData[]
    // Philosophy Detail
    philosophyDetailLabel?: string
    philosophyDetailHeading?: string
    philosophyDetailHeadingHighlight?: string
    philosophyDetailParagraphs?: string[]
    philosophyDetailItems?: FeatureCardData[]
    // Services Showcase
    servicesHeading?: string
    servicesItems?: FeatureCardData[]
    // CTA
    ctaHeading?: string
    ctaHeadingHighlight?: string
    ctaDescription?: string
    ctaButton?: CtaButtonData
}

export interface GymPageData {
    // Header
    headerTitle?: string
    headerSubtitle?: string
    headerImage?: SanityImage
    // Philosophy
    philosophyLabel?: string
    philosophyHeading?: string
    philosophyHeadingHighlight?: string
    philosophyParagraphs?: string[]
    philosophyImage?: SanityImage
    philosophyPillars?: FeatureCardData[]
    // Was erwartet dich
    expectLabel?: string
    expectHeading?: string
    expectHeadingHighlight?: string
    expectParagraphs?: string[]
    expectImage?: SanityImage
    expectTags?: string[]
    // Features Grid
    featuresHeading?: string
    featuresHeadingHighlight?: string
    featuresItems?: FeatureCardData[]
    // All in One
    allInOneLabel?: string
    allInOneHeading?: string
    allInOneHeadingHighlight?: string
    allInOneParagraphs?: string[]
    allInOneCta?: CtaButtonData
    // Trainer Spotlight
    trainerSpotlight?: TrainerSpotlightData
}

export interface BoxPageData {
    // Header
    headerTitle?: string
    headerSubtitle?: string
    headerImage?: SanityImage
    // Origin Story
    originLabel?: string
    originHeading?: string
    originHeadingHighlight?: string
    originParagraphs?: string[]
    originImage?: SanityImage
    // Was ist CrossFit
    crossfitLabel?: string
    crossfitHeading?: string
    crossfitHeadingHighlight?: string
    crossfitParagraphs?: string[]
    crossfitHighlightText?: string
    crossfitImage?: SanityImage
    // Core Values
    valuesHeading?: string
    valuesHeadingHighlight?: string
    valuesItems?: FeatureCardData[]
    // Class Structure
    classLabel?: string
    classHeading?: string
    classHeadingHighlight?: string
    classPhases?: ClassPhaseData[]
    // GYM+BOX Story
    storyHeading?: string
    storyHeadingHighlight?: string
    storyParagraph?: string
    storyBoxTitle?: string
    storyBoxText?: string
    // Trainer Spotlight
    trainerSpotlight?: TrainerSpotlightData
}

export interface TeamPageData {
    // Header
    headerTitle?: string
    headerSubtitle?: string
    headerImage?: SanityImage
    // Intro
    introLabel?: string
    introHeading?: string
    introHeadingHighlight?: string
    introParagraph?: string
    introImage?: SanityImage
    // Warum Personaltrainer
    whyHeading?: string
    whyHeadingHighlight?: string
    whyParagraph?: string
    whyFeatures?: FeatureCardData[]
    // Certifications
    certHeading?: string
    certParagraph?: string
}

export interface KontaktPageData {
    // Header
    headerTitle?: string
    headerSubtitle?: string
    headerImage?: SanityImage
    // Contact Options
    contactOptions?: { _key?: string; title: string; text: string }[]
    // Form Section
    formLabel?: string
    formHeading?: string
    formHeadingHighlight?: string
}

export interface LeistungenPageData {
    // Header
    headerTitle?: string
    headerSubtitle?: string
    headerImage?: SanityImage
    // Intro
    introBadge?: string
    introHeading?: string
    introHeadingHighlight?: string
    introDescription?: string
    // Featured Categories
    featuredCategories?: FeatureCardData[]
    // Member Benefits
    benefitsHeading?: string
    benefitsDescription?: string
    benefitsCta?: CtaButtonData
}

export interface PreisePageData {
    // Header
    headerTitle?: string
    headerSubtitle?: string
    headerImage?: SanityImage
    // Gym Section
    gymHeading?: string
    gymHeadingHighlight?: string
    gymDescription?: string
    gymHighlightLabel?: string
    // Box Section
    boxHeading?: string
    boxHeadingHighlight?: string
    boxDescription?: string
    boxHighlightLabel?: string
    // Info Section
    infoHeading?: string
    infoDescription?: string
    infoHighlight?: string
}
