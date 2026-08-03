import { defineQuery } from "next-sanity";

const imageProjection = `{
  alt,
  fallbackSrc,
  image{crop, hotspot, asset->{_id, url}}
}`;
const linkProjection = `{label, kind, internalRoute, url, email, emailSubject, telephone, whatsapp}`;
const seoProjection = `{
  metaTitle, metaDescription, openGraphTitle, openGraphDescription, noIndex,
  openGraphImage${imageProjection}
}`;
const pageIntroProjection = `{
  eyebrow, heading, description, image${imageProjection}
}`;

export const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  _id, organizationName, defaultSeoTitle, defaultSeoDescription,
  defaultOpenGraphImage${imageProjection}, publicSiteUrl, address, email, telephone,
  whatsappNumber, whatsappMessage, whatsappLabel,
  consultationCta{eyebrow, heading, link${linkProjection}}
}`);

export const navigationQuery = defineQuery(`*[_id == "navigation"][0]{
  _id,
  headerLinks[]{_key, _type, label, isHidden, destination${linkProjection}},
  headerCta${linkProjection}, mobileHeaderCtaLabel,
  footerLinks[]{_key, _type, label, isHidden, destination${linkProjection}},
  footerDescription, footerLinksHeading, footerContactHeading, footerTagline, copyrightWording
}`);

export const homePageQuery = defineQuery(`*[_id == "homePage"][0]{
  _id, seo${seoProjection},
  hero{_type, eyebrow, titleLineOne, titleLineTwo, description,
    primaryButton${linkProjection}, secondaryButton${linkProjection}, trustPoints, journeyTitle,
    journeyDescription,
    "journeyStages": [
      journeyStageOne{ "_key": "journey-1", title, description },
      journeyStageTwo{ "_key": "journey-2", title, description },
      journeyStageThree{ "_key": "journey-3", title, description }
    ], closingBadgeText}
}`);

export const aboutPageQuery = defineQuery(`*[_id == "aboutPage"][0]{
  _id, seo${seoProjection}, pageIntro${pageIntroProjection},
  sections[]{
    _key, _type, isHidden, eyebrow, heading, paragraphs,
    missionTitle, missionDescription, visionTitle, visionDescription,
    principles[]{_key, text, isHidden}, members[]{_key, name, role, initials, isHidden, image${imageProjection}},
    useGlobalDefault, link${linkProjection}
  }
}`);

export const servicesPageQuery = defineQuery(`*[_id == "servicesPage"][0]{
  _id, seo${seoProjection}, pageIntro${pageIntroProjection},
  sections[]{
    _key, _type, isHidden, eyebrow, heading, description,
    packages[]{_key, label, title, description, isHidden, items[]{_key, text, isHidden}},
    services[]{_key, icon, title, description, isHidden},
    useGlobalDefault, link${linkProjection}
  }
}`);

export const portfolioPageQuery = defineQuery(`*[_id == "portfolioPage"][0]{
  _id, seo${seoProjection}, pageIntro${pageIntroProjection},
  sections[]{
    _key, _type, isHidden, eyebrow, heading, description, privacyNote,
    projects[]{_key, name, category, result, isHidden}, useGlobalDefault, link${linkProjection}
  }
}`);

export const blogPageQuery = defineQuery(`*[_id == "blogPage"][0]{
  _id, seo${seoProjection}, pageIntro${pageIntroProjection},
  sections[]{_key, _type, isHidden, statusLabel, heading, description,
    emailCta${linkProjection}, topicsHeading, topics[]{_key, text, isHidden}}
}`);

const articleCardProjection = `{
  _id, title, "slug": slug.current, excerpt, directAnswer, publishedAt, updatedAt, featured,
  featuredImage${imageProjection},
  author->{name, "slug": slug.current, role},
  categories[]->{_id, title, "slug": slug.current}
}`;

export const articlesQuery = defineQuery(`*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc) ${articleCardProjection}`);

export const articleSlugsQuery = defineQuery(`*[_type == "article" && defined(slug.current)].slug.current`);

export const articleSitemapQuery = defineQuery(`*[_type == "article" && defined(slug.current) && seo.noIndex != true]{"slug": slug.current, publishedAt, updatedAt}`);

export const articleBySlugQuery = defineQuery(`*[_type == "article" && slug.current == $slug][0]{
  _id, _updatedAt, title, "slug": slug.current, excerpt, directAnswer, publishedAt, updatedAt,
  featuredImage${imageProjection}, body,
  author->{name, "slug": slug.current, role, bio, expertise, image${imageProjection}},
  reviewer->{name, "slug": slug.current, role},
  categories[]->{_id, title, "slug": slug.current},
  faqs[]{_key, question, answer},
  sources[]{_key, title, publisher, url, accessedAt},
  seo${seoProjection}
}`);

export const contactPageQuery = defineQuery(`*[_id == "contactPage"][0]{
  _id, seo${seoProjection}, pageIntro${pageIntroProjection},
  contactSection{_type, eyebrow, heading, description, form, serviceLabels}
}`);

export const publicPageSitemapQuery = defineQuery(`*[
  _id in ["homePage", "aboutPage", "servicesPage", "portfolioPage", "blogPage", "contactPage"] &&
  seo.noIndex != true && !(_id in path("drafts.**"))
]{
  "route": select(
    _id == "homePage" => "/",
    _id == "aboutPage" => "/about",
    _id == "servicesPage" => "/services",
    _id == "portfolioPage" => "/portfolio",
    _id == "blogPage" => "/blog",
    _id == "contactPage" => "/contact"
  ),
  "updatedAt": _updatedAt
}`);

const solutionPageProjection = `{
  _id, _updatedAt, "slug": slug.current, order, isHidden,
  eyebrow, title, shortTitle, metaTitle, metaDescription, lead, directAnswer,
  symptomsHeading, symptoms,
  outcomesHeading, outcomesIntro, outcomes[]{title, description},
  process[]{title, description}, questions[]{question, answer},
  "related": related[]->slug.current,
  seo${seoProjection}
}`;

export const solutionPagesQuery = defineQuery(`*[
  _type == "solutionPage" && defined(slug.current) && isHidden != true &&
  !(_id in path("drafts.**"))
] | order(order asc, title asc) ${solutionPageProjection}`);

export const solutionPageBySlugQuery = defineQuery(`*[
  _type == "solutionPage" && slug.current == $slug && isHidden != true
][0] ${solutionPageProjection}`);

export const solutionPageSlugsQuery = defineQuery(`*[
  _type == "solutionPage" && defined(slug.current) && isHidden != true &&
  !(_id in path("drafts.**"))
].slug.current`);

export const solutionSitemapQuery = defineQuery(`*[
  _type == "solutionPage" && defined(slug.current) && isHidden != true &&
  seo.noIndex != true && !(_id in path("drafts.**"))
]{"slug": slug.current, "updatedAt": _updatedAt}`);
