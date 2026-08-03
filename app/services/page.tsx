import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { SolutionDirectory } from "@/components/services/SolutionDirectory";
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
  const services = page.sections.flatMap((section) => {
    if (section._type === "servicePackagesSection") {
      return section.packages.filter((item) => !item.isHidden).map((item) => ({
        "@type": "Service",
        name: item.title,
        description: item.description,
        provider: { "@id": `${siteSettings.publicSiteUrl.replace(/\/$/, "")}/#organization` },
        areaServed: { "@type": "Country", name: "فلسطين" },
      }));
    }
    if (section._type === "marketingServicesSection") {
      return section.services.filter((item) => !item.isHidden).map((item) => ({
        "@type": "Service",
        name: item.title,
        description: item.description,
        provider: { "@id": `${siteSettings.publicSiteUrl.replace(/\/$/, "")}/#organization` },
        areaServed: { "@type": "Country", name: "فلسطين" },
      }));
    }
    return [];
  });
  return <main className="min-h-screen bg-background"><Navbar navigation={navigation} /><PageIntro {...page.pageIntro} /><SolutionDirectory /><ServicesPageSections sections={page.sections} globalCta={siteSettings.consultationCta} /><Footer navigation={navigation} siteSettings={siteSettings} /><PageStructuredData settings={siteSettings} path="/services" name={page.seo?.metaTitle || page.pageIntro.heading} description={page.seo?.metaDescription || page.pageIntro.description} type="CollectionPage" mainEntity={services} /></main>;
}
