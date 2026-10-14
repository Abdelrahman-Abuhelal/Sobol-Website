import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConsultationCTA } from "@/components/layout/ConsultationCTA";
import { getGlobalContent, getSiteSettingsForMetadata, getSuccessStoryBySlug, getSuccessStorySlugs } from "@/sanity/lib/data";
import { buildPageMetadata } from "@/sanity/lib/metadata";
import { editorialImageUrl } from "@/sanity/lib/image";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getSuccessStorySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [story, settings] = await Promise.all([getSuccessStoryBySlug(slug), getSiteSettingsForMetadata()]);
  if (!story) return {};
  const metadata = buildPageMetadata(`/success-stories/${story.slug}`, {
    ...story.seo, metaTitle: story.seo?.metaTitle || story.title, metaDescription: story.seo?.metaDescription || story.excerpt, openGraphImage: story.seo?.openGraphImage || story.featuredImage,
  }, settings);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: story.publishedAt, modifiedTime: story._updatedAt } };
}

export default async function SuccessStoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [story, { navigation, siteSettings }] = await Promise.all([getSuccessStoryBySlug(slug), getGlobalContent()]);
  if (!story) notFound();
  const src = editorialImageUrl(story.featuredImage, 1400);
  const base = siteSettings.publicSiteUrl.replace(/\/$/, "");
  const canonical = `${base}/success-stories/${story.slug}`;
  const overview = [
    { heading: "التحدي", text: story.challenge },
    { heading: "كيف عملنا معهم", text: story.approach },
    { heading: "ما تحقق", text: story.results },
  ].filter((item) => item.text);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article", "@id": `${canonical}#story`, headline: story.title,
        description: story.excerpt, url: canonical, inLanguage: "ar",
        datePublished: story.publishedAt, dateModified: story._updatedAt || story.publishedAt,
        author: { "@type": "Organization", name: siteSettings.organizationName, url: base },
        publisher: { "@id": `${base}/#organization` }, image: src || undefined,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "قصص نجاح", item: `${base}/success-stories` },
          { "@type": "ListItem", position: 3, name: story.title, item: canonical },
        ],
      },
    ],
  };
  return (
    <main className="min-h-screen bg-background">
      <Navbar navigation={navigation} />
      <article>
        <header className="bg-surface-muted py-12 sm:py-16">
          <div className="container-custom">
            <div className="mx-auto max-w-[68rem]">
              <Link href="/success-stories" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"><ArrowRight className="size-4" aria-hidden="true" /> كل قصص النجاح</Link>
              <p className="mb-5 text-sm font-bold text-primary">{[story.clientName, story.industry].filter(Boolean).join(" · ")}</p>
              <h1 className="max-w-5xl text-[clamp(2.15rem,4.5vw,3.75rem)] font-black text-secondary">{story.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground sm:text-xl">{story.excerpt}</p>
            </div>
          </div>
        </header>
        {src && <div className="container-custom mt-8"><div className="relative mx-auto aspect-[16/9] max-w-[68rem] overflow-hidden rounded-3xl bg-muted"><Image src={src} alt={story.featuredImage.alt} fill priority sizes="(max-width: 1200px) 100vw, 1088px" className="object-cover" /></div></div>}
        <div className="container-custom py-12 sm:py-16">
          <div className="mx-auto max-w-[58rem]">
            {overview.length > 0 && <section aria-label="لمحة عن التعاون" className={cn("mb-12 grid gap-7 border-y border-border py-8", overview.length === 2 && "md:grid-cols-2", overview.length === 3 && "md:grid-cols-3")}>{overview.map((item) => <div key={item.heading}><h2 className="text-xl font-extrabold text-secondary">{item.heading}</h2><p className="mt-3 whitespace-pre-line leading-8 text-muted-foreground">{item.text}</p></div>)}</section>}
            <ArticleBody value={story.body} />
            <Link href="/success-stories" className="mt-12 inline-flex items-center gap-2 rounded-lg py-3 font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowRight className="size-4" aria-hidden="true" /> العودة إلى قصص النجاح</Link>
          </div>
        </div>
      </article>
      <ConsultationCTA content={siteSettings.consultationCta} />
      <Footer navigation={navigation} siteSettings={siteSettings} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
