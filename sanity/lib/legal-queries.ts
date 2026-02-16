import { groq } from "next-sanity";

export const legalPageQuery = groq`*[_type == "legalPage" && slug.current == $slug][0] {
  title,
  content,
  lastUpdated
}`;
