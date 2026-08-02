import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ConsultationCTA } from "@/components/layout/ConsultationCTA";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getArticleBySlug, getArticleSlugs, getGlobalContent, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { editorialImageUrl } from "@/sanity/lib/image";

type PageProps = { params: Promise<{ slug: string }> };
const dateFormatter = new Intl.DateTimeFormat("ar-PS", { year: "numeric", month: "long", day: "numeric" });

export async function generateStaticParams() {
  return (await getArticleSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [article, settings] = await Promise.all([getArticleBySlug(slug), getSiteSettingsForMetadata()]);
  if (!article) return {};
  const base = new URL(settings.publicSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  const canonical = new URL(`/blog/${article.slug}`, base).toString();
  const title = article.seo?.metaTitle || article.title;
  const description = article.seo?.metaDescription || article.excerpt;
  const shareImage = article.seo?.openGraphImage || article.featuredImage;
  const imageUrl = editorialImageUrl(shareImage, 1200);
  return {
    metadataBase: base,
    title,
    description,
    alternates: { canonical },
    authors: [{ name: article.author.name }],
    robots: article.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "article", locale: "ar_PS", siteName: settings.organizationName, url: canonical,
      title: article.seo?.openGraphTitle || title,
      description: article.seo?.openGraphDescription || description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article._updatedAt,
      authors: [article.author.name],
      images: imageUrl ? [{ url: imageUrl, alt: shareImage?.alt || article.title }] : undefined,
    },
    twitter: { card: imageUrl ? "summary_large_image" : "summary", title, description, images: imageUrl ? [imageUrl] : undefined },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [article, { navigation, siteSettings }] = await Promise.all([getArticleBySlug(slug), getGlobalContent()]);
  if (!article) notFound();
  const canonical = `${siteSettings.publicSiteUrl.replace(/\/$/, "")}/blog/${article.slug}`;
  const imageSrc = editorialImageUrl(article.featuredImage, 1400);
  const authorImageSrc = editorialImageUrl(article.author.image, 160);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${canonical}#article`, headline: article.title,
        description: article.excerpt, url: canonical, inLanguage: "ar",
        datePublished: article.publishedAt, dateModified: article.updatedAt || article._updatedAt || article.publishedAt,
        author: { "@type": "Person", name: article.author.name, jobTitle: article.author.role },
        reviewedBy: article.reviewer ? { "@type": "Person", name: article.reviewer.name, jobTitle: article.reviewer.role } : undefined,
        publisher: { "@type": "Organization", name: siteSettings.organizationName, url: siteSettings.publicSiteUrl },
        image: imageSrc || undefined,
        articleSection: article.categories?.map((category) => category.title),
        keywords: [...(article.categories?.map((category) => category.title) || []), ...(article.author.expertise || [])],
        about: article.categories?.map((category) => ({ "@type": "Thing", name: category.title })),
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["#article-title", "#direct-answer"] },
        isPartOf: { "@type": "Blog", name: `مدونة ${siteSettings.organizationName}`, url: `${siteSettings.publicSiteUrl.replace(/\/$/, "")}/blog` },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      },
      article.faqs?.length ? {
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      } : undefined,
    ].filter(Boolean),
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar navigation={navigation} />
      <article>
        <header className="bg-[oklch(0.982_0.008_178)] pb-14 pt-10 sm:pb-20 sm:pt-14">
          <div className="container-custom">
            <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"><ArrowRight className="size-4" aria-hidden="true" /> العودة إلى المدونة</Link>
            <div className="ml-auto max-w-[64rem] text-right">
              {article.categories?.length ? <div className="mb-5 flex flex-wrap justify-start gap-2">{article.categories.map((category) => <span key={category._id} className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">{category.title}</span>)}</div> : null}
              <h1 id="article-title" className="max-w-[58rem] text-[clamp(2.4rem,5.5vw,4.8rem)] font-black leading-[1.12] tracking-[-0.04em] text-secondary">{article.title}</h1>
              <p className="mt-6 max-w-[47rem] text-lg leading-8 text-[oklch(0.42_0.035_210)] sm:text-xl sm:leading-9">{article.excerpt}</p>
              <div className="mt-7 flex flex-wrap items-center justify-start gap-x-5 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-3 text-secondary">
                  {authorImageSrc ? <span className="relative size-10 overflow-hidden rounded-full bg-muted"><Image src={authorImageSrc} alt={`صورة ${article.author.name}`} fill sizes="40px" className="object-cover" /></span> : <span className="flex size-10 items-center justify-center rounded-full bg-[oklch(0.91_0.045_176)] font-black text-primary">{article.author.name.trim().charAt(0)}</span>}
                  <span><span className="block text-xs text-muted-foreground">بقلم</span><span className="font-extrabold">{article.author.name}</span></span>
                </span>
                <time dateTime={article.publishedAt} className="inline-flex items-center gap-2"><CalendarDays className="size-4" aria-hidden="true" />{dateFormatter.format(new Date(article.publishedAt))}</time>
                {article.updatedAt && <span>آخر مراجعة: {dateFormatter.format(new Date(article.updatedAt))}</span>}
              </div>
            </div>
          </div>
        </header>

        {imageSrc && <div className="container-custom -mt-4 sm:-mt-8"><div className="relative mx-auto aspect-[16/8] max-w-[68rem] overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_28px_75px_-45px_oklch(0.29_0.055_235/0.7)]"><Image src={imageSrc} alt={article.featuredImage?.alt || article.title} fill priority sizes="(max-width: 1200px) 100vw, 1088px" className="object-cover" /></div></div>}

        <div className="container-custom py-14 sm:py-20">
          <div className="mx-auto max-w-[72rem]">
            <div className="ml-auto max-w-[54rem]">
            <p id="direct-answer" className="mb-10 text-[1.075rem] font-medium leading-[2] text-[oklch(0.31_0.04_220)] sm:text-lg">{article.directAnswer}</p>
            <ArticleBody value={article.body} />

            {article.faqs?.length ? <section className="mt-16" aria-labelledby="faq-heading"><h2 id="faq-heading" className="text-3xl font-black tracking-[-0.025em] text-secondary">أسئلة شائعة</h2><div className="mt-7 divide-y divide-[oklch(0.87_0.018_190)] border-y border-[oklch(0.87_0.018_190)]">{article.faqs.map((faq) => <div key={faq._key} className="py-6"><h3 className="text-xl font-extrabold leading-8 text-secondary">{faq.question}</h3><p className="mt-3 text-base leading-8 text-[oklch(0.38_0.035_215)]">{faq.answer}</p></div>)}</div></section> : null}

            {article.sources?.length ? <section className="mt-16" aria-labelledby="sources-heading"><h2 id="sources-heading" className="text-2xl font-black text-secondary">المصادر</h2><ol className="mt-5 list-decimal space-y-3 pr-6 text-base leading-7">{article.sources.map((source) => <li key={source._key}><a href={source.url} target="_blank" rel="noreferrer" className="font-bold text-primary underline decoration-primary/30 underline-offset-4">{source.title}</a>{source.publisher ? `، ${source.publisher}` : ""}{source.accessedAt ? `، تم الاطلاع في ${dateFormatter.format(new Date(source.accessedAt))}` : ""}</li>)}</ol></section> : null}

            <section className="mt-16 border-t border-[oklch(0.87_0.018_190)] pt-8" aria-label="عن الكاتب">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                {authorImageSrc ? <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-muted"><Image src={authorImageSrc} alt={`صورة ${article.author.name}`} fill sizes="80px" className="object-cover" /></div> : <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[oklch(0.91_0.045_176)] text-2xl font-black text-primary">{article.author.name.trim().charAt(0)}</div>}
                <div className="min-w-0"><p className="text-sm font-bold text-primary">عن الكاتب</p><h2 className="mt-1 text-2xl font-black text-secondary">{article.author.name}</h2><p className="text-sm font-medium text-muted-foreground">{article.author.role}</p>{article.author.bio && <p className="mt-4 leading-7 text-[oklch(0.4_0.035_210)]">{article.author.bio}</p>}</div>
              </div>
            </section>
            </div>
          </div>
        </div>
        <ConsultationCTA content={siteSettings.consultationCta} />
      </article>
      <Footer navigation={navigation} siteSettings={siteSettings} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
