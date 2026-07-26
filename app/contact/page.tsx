import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageIntro } from "@/components/layout/PageIntro";
import { fallbackContactPage } from "@/content/fallbacks";
import { getContactPage, getGlobalContent, getSeoData, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { contactPageQuery } from "@/sanity/lib/queries";
import type { ContactPage } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getSeoData<ContactPage>(contactPageQuery, "contactPage", fallbackContactPage), getSiteSettingsForMetadata()]);
  return buildPageMetadata("/contact", page.seo, settings);
}

export default async function ContactPageRoute() {
  const [page, { navigation, siteSettings }] = await Promise.all([getContactPage(), getGlobalContent()]);
  const content = page.contactSection;
  const whatsappHref = `https://wa.me/${siteSettings.whatsappNumber.replace(/\D/g, "")}`;
  return <main className="min-h-screen bg-background">
    <Navbar navigation={navigation} /><PageIntro {...page.pageIntro} />
    <section className="py-16 sm:py-20 lg:py-24"><div className="container-custom grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
      <aside><p className="text-sm font-bold text-primary">{content.eyebrow}</p><h2 className="mt-3 text-3xl font-black text-secondary">{content.heading}</h2><p className="mt-4 leading-7 text-muted-foreground">{content.description}</p>
        <ul className="mt-8 space-y-4 border-y border-[oklch(0.86_0.025_190)] py-5 text-sm font-bold text-secondary/75">
          <li><a href={`mailto:${siteSettings.email}`} className="flex w-fit items-center gap-3 transition-colors hover:text-primary" dir="ltr"><Mail className="size-4 text-primary" aria-hidden="true" />{siteSettings.email}</a></li>
          <li><a href={`tel:${siteSettings.telephone}`} className="flex w-fit items-center gap-3 transition-colors hover:text-primary" dir="ltr"><Phone className="size-4 text-primary" aria-hidden="true" />{siteSettings.telephone}</a></li>
          <li><a href={whatsappHref} target="_blank" rel="noreferrer" className="flex w-fit items-center gap-3 transition-colors hover:text-primary"><MessageCircle className="size-4 text-primary" aria-hidden="true" />واتساب</a></li>
        </ul>
      </aside>
      <div><ContactForm content={content} /></div>
    </div></section>
    <Footer navigation={navigation} siteSettings={siteSettings} />
  </main>;
}
