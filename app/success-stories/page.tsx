import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/layout/PageIntro";
import { ConsultationCTA } from "@/components/layout/ConsultationCTA";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { fallbackSuccessStoriesPage } from "@/content/fallbacks";
import { getGlobalContent, getSeoData, getSiteSettingsForMetadata, getSuccessStories, getSuccessStoriesPage } from "@/sanity/lib/data";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { editorialImageUrl } from "@/sanity/lib/image";
import { successStoriesPageQuery } from "@/sanity/lib/queries";
import type { SuccessStoriesPage } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getSeoData<SuccessStoriesPage>(successStoriesPageQuery, "successStoriesPage", fallbackSuccessStoriesPage),
    getSiteSettingsForMetadata(),
  ]);
  const introImage = editorialImageUrl(page.pageIntro.image, 1200) ? page.pageIntro.image : fallbackSuccessStoriesPage.pageIntro.image;
  const shareImage = editorialImageUrl(page.seo?.openGraphImage, 1200) ? page.seo?.openGraphImage : introImage;
  return buildPageMetadata("/success-stories", {
    ...page.seo,
    metaTitle: page.seo?.metaTitle?.trim() || page.pageIntro.heading,
    metaDescription: page.seo?.metaDescription?.trim() || page.pageIntro.description,
    openGraphImage: shareImage,
  }, settings);
}

export default async function SuccessStoriesPageRoute() {
  const [page, stories, { navigation, siteSettings }] = await Promise.all([getSuccessStoriesPage(), getSuccessStories(), getGlobalContent()]);
  return (
    <main className="min-h-screen bg-background">
      <Navbar navigation={navigation} />
      <PageIntro {...page.pageIntro} fallbackImage={fallbackSuccessStoriesPage.pageIntro.image} />
      <section className="container-custom py-16 sm:py-24" aria-label="قصص التعاون مع عملائنا">
        {stories.length ? (
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => {
              const src = editorialImageUrl(story.featuredImage, 900);
              return (
                <article key={story._id}>
                  <Link href={`/success-stories/${story.slug}`} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                    {src && <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"><Image src={src} alt={story.featuredImage.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105" /></div>}
                    <p className="mt-5 text-sm font-bold text-primary">{[story.clientName, story.industry].filter(Boolean).join(" · ")}</p>
                    <h2 className="mt-3 text-2xl font-extrabold leading-9 text-secondary group-hover:text-primary">{story.title}</h2>
                    <p className="mt-3 leading-8 text-muted-foreground">{story.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">اقرأ القصة <ArrowLeft className="size-4" aria-hidden="true" /></span>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl border-y border-border py-14 text-center">
            <h2 className="text-2xl font-extrabold text-secondary sm:text-3xl">{page.emptyHeading}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-9 text-muted-foreground">{page.emptyDescription}</p>
          </div>
        )}
      </section>
      <ConsultationCTA content={siteSettings.consultationCta} />
      <Footer navigation={navigation} siteSettings={siteSettings} />
      <PageStructuredData settings={siteSettings} path="/success-stories" name={page.pageIntro.heading} description={page.pageIntro.description} type="CollectionPage" />
    </main>
  );
}
