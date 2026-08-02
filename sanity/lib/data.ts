import { cache } from "react";
import { fallbackAboutPage, fallbackBlogPage, fallbackContactPage, fallbackHomePage, fallbackNavigation, fallbackPortfolioPage, fallbackServicesPage, fallbackSiteSettings } from "@/content/fallbacks";
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery, articleBySlugQuery, articleSitemapQuery, articleSlugsQuery, articlesQuery, blogPageQuery, contactPageQuery, homePageQuery, navigationQuery, portfolioPageQuery, servicesPageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { AboutPage, Article, ArticleCard, ArticleSitemapEntry, BlogPage, ContactPage, HomePage, Navigation, PortfolioPage, ServicesPage, SiteSettings } from "@/sanity/lib/types";

function withFallback<T>(value: T | null, fallback: T, name: string): T {
  if (!value && process.env.NODE_ENV === "development") console.warn(`[sanity] Missing ${name}; rendering temporary fallback content.`);
  return value || fallback;
}

export const getSiteSettings = cache(async () => withFallback(await sanityFetch<SiteSettings>({ query: siteSettingsQuery, tag: "siteSettings" }), fallbackSiteSettings, "siteSettings"));
export const getSiteSettingsForMetadata = cache(async () => withFallback(await sanityFetch<SiteSettings>({ query: siteSettingsQuery, tag: "siteSettings", stega: false }), fallbackSiteSettings, "siteSettings"));
export const getNavigation = cache(async () => withFallback(await sanityFetch<Navigation>({ query: navigationQuery, tag: "navigation" }), fallbackNavigation, "navigation"));
export const getHomePage = cache(async () => withFallback(await sanityFetch<HomePage>({ query: homePageQuery, tag: "homePage" }), fallbackHomePage, "homePage"));
export const getAboutPage = cache(async () => withFallback(await sanityFetch<AboutPage>({ query: aboutPageQuery, tag: "aboutPage" }), fallbackAboutPage, "aboutPage"));
export const getServicesPage = cache(async () => withFallback(await sanityFetch<ServicesPage>({ query: servicesPageQuery, tag: "servicesPage" }), fallbackServicesPage, "servicesPage"));
export const getPortfolioPage = cache(async () => withFallback(await sanityFetch<PortfolioPage>({ query: portfolioPageQuery, tag: "portfolioPage" }), fallbackPortfolioPage, "portfolioPage"));
export const getBlogPage = cache(async () => withFallback(await sanityFetch<BlogPage>({ query: blogPageQuery, tag: "blogPage" }), fallbackBlogPage, "blogPage"));
export const getContactPage = cache(async () => withFallback(await sanityFetch<ContactPage>({ query: contactPageQuery, tag: "contactPage" }), fallbackContactPage, "contactPage"));
export const getArticles = cache(async () => (await sanityFetch<ArticleCard[]>({ query: articlesQuery, tag: "article" })) || []);
export const getArticleBySlug = cache(async (slug: string) => sanityFetch<Article>({ query: articleBySlugQuery, params: { slug }, tag: "article" }));
export const getArticleSlugs = cache(async () => (await sanityFetch<string[]>({ query: articleSlugsQuery, tag: "article", stega: false, requestless: true })) || []);
export const getArticleSitemapEntries = cache(async () => (await sanityFetch<ArticleSitemapEntry[]>({ query: articleSitemapQuery, tag: "article", stega: false, requestless: true })) || []);

export async function getGlobalContent() {
  const [siteSettings, navigation] = await Promise.all([getSiteSettings(), getNavigation()]);
  return { siteSettings, navigation };
}

export async function getSeoData<T extends { seo?: unknown }>(query: string, tag: string, fallback: T) {
  return withFallback(await sanityFetch<T>({ query, tag, stega: false }), fallback, tag);
}
