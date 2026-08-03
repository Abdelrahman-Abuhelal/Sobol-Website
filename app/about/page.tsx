import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { AboutPageSections } from "@/components/sections/PageSections";
import { fallbackAboutPage } from "@/content/fallbacks";
import { getAboutPage, getGlobalContent, getSeoData, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { aboutPageQuery } from "@/sanity/lib/queries";
import type { AboutPage } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getSeoData<AboutPage>(aboutPageQuery, "aboutPage", fallbackAboutPage), getSiteSettingsForMetadata()]);
  return buildPageMetadata("/about", page.seo, settings);
}

export default async function AboutPageRoute() {
  const [page, { navigation, siteSettings }] = await Promise.all([getAboutPage(), getGlobalContent()]);
  return <main className="min-h-screen bg-background"><Navbar navigation={navigation} /><PageIntro {...page.pageIntro} /><AboutPageSections sections={page.sections} globalCta={siteSettings.consultationCta} /><Footer navigation={navigation} siteSettings={siteSettings} /><PageStructuredData settings={siteSettings} path="/about" name={page.seo?.metaTitle || page.pageIntro.heading} description={page.seo?.metaDescription || page.pageIntro.description} type="AboutPage" /></main>;
}
