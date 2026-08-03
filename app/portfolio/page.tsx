import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { PortfolioPageSections } from "@/components/sections/PageSections";
import { fallbackPortfolioPage } from "@/content/fallbacks";
import { getGlobalContent, getPortfolioPage, getSeoData, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { portfolioPageQuery } from "@/sanity/lib/queries";
import type { PortfolioPage } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getSeoData<PortfolioPage>(portfolioPageQuery, "portfolioPage", fallbackPortfolioPage), getSiteSettingsForMetadata()]);
  return buildPageMetadata("/portfolio", page.seo, settings);
}

export default async function PortfolioPageRoute() {
  const [page, { navigation, siteSettings }] = await Promise.all([getPortfolioPage(), getGlobalContent()]);
  return <main className="min-h-screen bg-background"><Navbar navigation={navigation} /><PageIntro {...page.pageIntro} /><PortfolioPageSections sections={page.sections} globalCta={siteSettings.consultationCta} /><Footer navigation={navigation} siteSettings={siteSettings} /><PageStructuredData settings={siteSettings} path="/portfolio" name={page.seo?.metaTitle || page.pageIntro.heading} description={page.seo?.metaDescription || page.pageIntro.description} type="CollectionPage" /></main>;
}
