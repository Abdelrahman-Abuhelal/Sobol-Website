import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageIntro } from "@/components/layout/PageIntro";
import { ServicesPageSections } from "@/components/sections/PageSections";
import { fallbackServicesPage } from "@/content/fallbacks";
import { getGlobalContent, getSeoData, getServicesPage, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { servicesPageQuery } from "@/sanity/lib/queries";
import type { ServicesPage } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getSeoData<ServicesPage>(servicesPageQuery, "servicesPage", fallbackServicesPage), getSiteSettingsForMetadata()]);
  return buildPageMetadata("/services", page.seo, settings);
}

export default async function ServicesPageRoute() {
  const [page, { navigation, siteSettings }] = await Promise.all([getServicesPage(), getGlobalContent()]);
  return <main className="min-h-screen bg-background"><Navbar navigation={navigation} /><PageIntro {...page.pageIntro} /><ServicesPageSections sections={page.sections} globalCta={siteSettings.consultationCta} /><Footer navigation={navigation} siteSettings={siteSettings} /></main>;
}
