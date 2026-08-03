import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { HowWeHelpSection } from "@/components/home/HowWeHelpSection";
import { Footer } from "@/components/layout/Footer";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { SolutionDirectory } from "@/components/services/SolutionDirectory";
import { fallbackHomePage } from "@/content/fallbacks";
import { getGlobalContent, getHomePage, getSeoData, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { homePageQuery } from "@/sanity/lib/queries";
import type { HomePage } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getSeoData<HomePage>(homePageQuery, "homePage", fallbackHomePage), getSiteSettingsForMetadata()]);
  return buildPageMetadata("/", page.seo, settings);
}

export default async function Home() {
  const [page, { navigation, siteSettings }] = await Promise.all([getHomePage(), getGlobalContent()]);
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar navigation={navigation} />
      <HeroSection content={page.hero} />
      <HowWeHelpSection content={page.hero} />
      <SolutionDirectory compact />
      <Footer navigation={navigation} siteSettings={siteSettings} />
      <PageStructuredData
        settings={siteSettings}
        path="/"
        name={page.seo?.metaTitle || siteSettings.defaultSeoTitle}
        description={page.seo?.metaDescription || siteSettings.defaultSeoDescription}
      />
    </main>
  );
}
