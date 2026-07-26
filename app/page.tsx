import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
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
  const [page, { navigation }] = await Promise.all([getHomePage(), getGlobalContent()]);
  return <main className="min-h-screen bg-background font-sans"><Navbar navigation={navigation} /><HeroSection content={page.hero} /></main>;
}
