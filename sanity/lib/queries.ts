import { groq } from "next-sanity";

export const trainersQuery = groq`*[_type == "trainer"] | order(orderRank asc, name asc) {
  _id,
  name,
  role,
  image,
  specs,
  bio,
  longBio,
  credentials,
  highlightQuote,
  tags,
  category
}`;

export const pricingsQuery = groq`*[_type == "pricing"] | order(price asc) {
  _id,
  title,
  pricePrefix,
  price,
  interval,
  description,
  features,
  recommended,
  category
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  name,
  description,
  priceMember,
  priceNonMember,
  category,
  icon,
  order
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  ogImage {
    asset-> {
      url
    }
  }
}`;
