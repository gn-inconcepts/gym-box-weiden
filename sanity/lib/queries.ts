import { groq } from "next-sanity";

export const trainersQuery = groq`*[_type == "trainer"] {
  _id,
  name,
  role,
  image,
  specs,
  bio,
  tags,
  category
}`;

export const pricingsQuery = groq`*[_type == "pricing"] | order(price asc) {
  _id,
  title,
  price,
  interval,
  features,
  recommended,
  category
}`;

export const servicesQuery = groq`*[_type == "service"] {
  _id,
  name,
  description,
  priceMember,
  priceNonMember,
  category,
  icon
}`;
