import { groq } from "next-sanity";

// ── Page Singleton Queries ──

export const homePageQuery = groq`*[_type == "homePage"][0] {
  heroBadge,
  heroHeadingLine1,
  heroHeadingLine2,
  heroDescription,
  heroVideoUrl,
  heroCta,
  gymCardTitle,
  gymCardDescription,
  gymCardImage,
  boxCardTitle,
  boxCardDescription,
  boxCardImage,
  philosophyLabel,
  philosophyHeading,
  philosophyHeadingHighlight,
  philosophyDescription,
  philosophyPillars,
  philosophyDetailLabel,
  philosophyDetailHeading,
  philosophyDetailHeadingHighlight,
  philosophyDetailParagraphs,
  philosophyDetailItems,
  servicesHeading,
  servicesItems,
  reviewsImage,
  ctaHeading,
  ctaHeadingHighlight,
  ctaDescription,
  ctaButton
}`;

export const gymPageQuery = groq`*[_type == "gymPage"][0] {
  headerTitle,
  headerSubtitle,
  headerImage,
  philosophyLabel,
  philosophyHeading,
  philosophyHeadingHighlight,
  philosophyParagraphs,
  philosophyImage,
  philosophyPillars,
  expectLabel,
  expectHeading,
  expectHeadingHighlight,
  expectParagraphs,
  expectImage,
  expectTags,
  featuresHeading,
  featuresHeadingHighlight,
  featuresItems,
  allInOneLabel,
  allInOneHeading,
  allInOneHeadingHighlight,
  allInOneParagraphs,
  allInOneCta,
  trainerSpotlight {
    trainer-> { _id, name, role, image, specs, bio },
    name,
    role,
    image,
    bio,
    specialties
  }
}`;

export const boxPageQuery = groq`*[_type == "boxPage"][0] {
  headerTitle,
  headerSubtitle,
  headerImage,
  originLabel,
  originHeading,
  originHeadingHighlight,
  originParagraphs,
  originImage,
  crossfitLabel,
  crossfitHeading,
  crossfitHeadingHighlight,
  crossfitParagraphs,
  crossfitHighlightText,
  crossfitImage,
  valuesHeading,
  valuesHeadingHighlight,
  valuesItems,
  classLabel,
  classImage,
  classHeading,
  classHeadingHighlight,
  classPhases,
  storyHeading,
  storyHeadingHighlight,
  storyParagraph,
  storyBoxTitle,
  storyBoxText,
  trainerSpotlight {
    trainer-> { _id, name, role, image, specs, bio },
    name,
    role,
    image,
    bio,
    specialties
  }
}`;

export const teamPageQuery = groq`*[_type == "teamPage"][0] {
  headerTitle,
  headerSubtitle,
  headerImage,
  introLabel,
  introHeading,
  introHeadingHighlight,
  introParagraph,
  introImage,
  whyHeading,
  whyHeadingHighlight,
  whyParagraph,
  whyFeatures,
  certImage,
  certHeading,
  certParagraph
}`;

export const kontaktPageQuery = groq`*[_type == "kontaktPage"][0] {
  headerTitle,
  headerSubtitle,
  headerImage,
  contactOptions,
  formLabel,
  formHeading,
  formHeadingHighlight,
  formImage
}`;

export const leistungenPageQuery = groq`*[_type == "leistungenPage"][0] {
  headerTitle,
  headerSubtitle,
  headerImage,
  introBadge,
  introHeading,
  introHeadingHighlight,
  introDescription,
  featuredCategories,
  benefitsImage,
  benefitsHeading,
  benefitsDescription,
  benefitsCta
}`;

export const preisePageQuery = groq`*[_type == "preisePage"][0] {
  headerTitle,
  headerSubtitle,
  headerImage,
  gymHeading,
  gymHeadingHighlight,
  gymDescription,
  gymHighlightLabel,
  boxHeading,
  boxHeadingHighlight,
  boxDescription,
  boxHighlightLabel,
  infoHeading,
  infoDescription,
  infoHighlight
}`;

// ── Expanded Site Settings Query ──

export const expandedSiteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  siteName,
  tagline,
  spaceSize,
  registrationFee,
  contact,
  social,
  openingHours,
  equipmentBrands,
  ogImage { asset-> { url } },
  navigation,
  footerTagline,
  footerDescription,
  stats
}`;
