import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageIntro } from "@/components/layout/PageIntro";
import { BlogPageSections } from "@/components/sections/PageSections";
import { fallbackBlogPage } from "@/content/fallbacks";
import { getArticles, getBlogPage, getCachedArticleViewCounts, getGlobalContent, getSeoData, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { blogPageQuery } from "@/sanity/lib/queries";
import type { BlogPage } from "@/sanity/lib/types";
import { ArticleList } from "@/components/blog/ArticleList";
import { PageStructuredData } from "@/components/seo/PageStructuredData";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getSeoData<BlogPage>(blogPageQuery, "blogPage", fallbackBlogPage), getSiteSettingsForMetadata()]);
  return buildPageMetadata("/blog", page.seo, settings);
}

export default async function BlogPageRoute({ searchParams }: { searchParams: Promise<{ sort?: string | string[] }> }) {
  const requestedSort = (await searchParams).sort;
  const initialSort = requestedSort === "popular" || requestedSort === "featured" ? requestedSort : "latest";
  const [page, articles, viewCounts, { navigation, siteSettings }] = await Promise.all([
    getBlogPage(),
    getArticles(),
    getCachedArticleViewCounts().catch(() => ({})),
    getGlobalContent(),
  ]);
  return <main className="min-h-screen bg-background"><Navbar navigation={navigation} /><PageIntro {...page.pageIntro} />{articles.length ? <ArticleList articles={articles} viewCounts={viewCounts} initialSort={initialSort} /> : <BlogPageSections sections={page.sections} />}<Footer navigation={navigation} siteSettings={siteSettings} /><PageStructuredData settings={siteSettings} path="/blog" name={page.seo?.metaTitle || page.pageIntro.heading} description={page.seo?.metaDescription || page.pageIntro.description} type="CollectionPage" /></main>;
}
