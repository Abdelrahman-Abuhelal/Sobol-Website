import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import { ConsultationCTA } from "@/components/layout/ConsultationCTA";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { getGlobalContent, getSiteSettingsForMetadata, getSolutionPageBySlug, getSolutionPageSlugs } from "@/sanity/lib/data";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getSolutionPageSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [page, settings] = await Promise.all([getSolutionPageBySlug(slug), getSiteSettingsForMetadata()]);
  if (!page) return {};
  const base = new URL(settings.publicSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  const canonical = new URL(`/services/${page.slug}`, base).toString();
  return {
    metadataBase: base,
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: "ar_PS", siteName: settings.organizationName, url: canonical, title: page.metaTitle, description: page.metaDescription },
    twitter: { card: "summary", title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function SolutionPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = await getSolutionPageBySlug(slug);
  if (!page) notFound();
  const { navigation, siteSettings } = await getGlobalContent();
  const relatedPages = (await Promise.all(page.related.map(getSolutionPageBySlug))).filter((item) => item !== null);
  const base = siteSettings.publicSiteUrl.replace(/\/$/, "");
  const url = `${base}/services/${page.slug}`;
  const serviceSchema = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.shortTitle,
    description: page.metaDescription,
    provider: { "@id": `${base}/#organization` },
    areaServed: { "@type": "Country", name: "فلسطين" },
    serviceType: page.eyebrow,
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar navigation={navigation} />
      <article>
        <header className="relative isolate overflow-hidden bg-[oklch(0.982_0.008_178)] py-14 sm:py-18 lg:py-22">
          <div className="absolute -right-48 -top-56 -z-10 size-[34rem] rounded-full bg-[oklch(0.93_0.04_174/0.6)] blur-3xl" aria-hidden="true" />
          <div className="container-custom">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3"><ArrowRight className="size-4" aria-hidden="true" />جميع الخدمات</Link>
            <div className="mt-8 max-w-4xl">
              <p className="text-sm font-bold text-primary sm:text-base">{page.eyebrow}</p>
              <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.1] tracking-[-0.035em] text-secondary">{page.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-secondary/70 sm:text-xl">{page.lead}</p>
            </div>
          </div>
        </header>

        <section className="py-14 sm:py-18" aria-labelledby="direct-answer-heading">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div><p className="flex items-center gap-2 text-sm font-bold text-primary"><Search className="size-4" aria-hidden="true" />الإجابة المختصرة</p><h2 id="direct-answer-heading" className="mt-3 text-3xl font-black leading-tight text-secondary">من أين تبدأ؟</h2></div>
            <p id="direct-answer" className="text-lg leading-9 text-[oklch(0.34_0.035_220)]">{page.directAnswer}</p>
          </div>
        </section>

        <section className="bg-[oklch(0.975_0.01_180)] py-14 sm:py-18" aria-labelledby="symptoms-heading">
          <div className="container-custom"><h2 id="symptoms-heading" className="text-3xl font-black text-secondary">{page.symptomsHeading}</h2><ul className="mt-8 grid gap-x-10 md:grid-cols-2">{page.symptoms.map((item) => <li key={item} className="flex items-start gap-3 border-b border-[oklch(0.86_0.022_190)] py-4 text-base font-bold leading-7 text-secondary/78"><Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul></div>
        </section>

        <section className="py-16 sm:py-20" aria-labelledby="outcomes-heading">
          <div className="container-custom"><div className="max-w-3xl"><h2 id="outcomes-heading" className="text-3xl font-black text-secondary sm:text-4xl">{page.outcomesHeading}</h2><p className="mt-4 text-lg leading-8 text-secondary/65">{page.outcomesIntro}</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{page.outcomes.map((item, index) => <article key={item.title} className="rounded-2xl border border-[oklch(0.86_0.022_190)] p-6"><span className="text-sm font-black text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-7 text-xl font-black text-secondary">{item.title}</h3><p className="mt-3 leading-7 text-secondary/65">{item.description}</p></article>)}</div></div>
        </section>

        <section className="bg-secondary py-16 text-secondary-foreground sm:py-20" aria-labelledby="process-heading">
          <div className="container-custom"><p className="text-sm font-bold text-primary">طريقة العمل</p><h2 id="process-heading" className="mt-3 text-3xl font-black sm:text-4xl">كيف ننتقل من المشكلة إلى خطوة عملية؟</h2><ol className="mt-10 grid gap-8 md:grid-cols-3">{page.process.map((step, index) => <li key={step.title}><span className="text-sm font-black text-primary">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-4 text-xl font-black">{step.title}</h3><p className="mt-3 leading-7 text-secondary-foreground/68">{step.description}</p></li>)}</ol></div>
        </section>

        <section className="py-16 sm:py-20" aria-labelledby="questions-heading">
          <div className="container-custom grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16"><div><p className="text-sm font-bold text-primary">أسئلة يبحث عنها أصحاب المشاريع</p><h2 id="questions-heading" className="mt-3 text-3xl font-black text-secondary">إجابات واضحة</h2></div><div className="divide-y divide-[oklch(0.86_0.022_190)] border-y border-[oklch(0.86_0.022_190)]">{page.questions.map((item) => <section key={item.question} className="py-6"><h3 className="text-xl font-black leading-8 text-secondary">{item.question}</h3><p className="mt-3 leading-8 text-secondary/70">{item.answer}</p></section>)}</div></div>
        </section>

        <section className="border-t border-[oklch(0.86_0.022_190)] py-14" aria-labelledby="related-heading"><div className="container-custom"><h2 id="related-heading" className="text-2xl font-black text-secondary">مواضيع مرتبطة</h2><div className="mt-6 grid gap-3 md:grid-cols-3">{relatedPages.map((item) => <Link key={item.slug} href={`/services/${item.slug}`} className="group flex items-center justify-between gap-4 rounded-xl border border-[oklch(0.86_0.022_190)] p-5 font-black text-secondary hover:border-primary/45"><span>{item.shortTitle}</span><ArrowLeft className="size-4 text-primary transition-transform group-hover:-translate-x-1" aria-hidden="true" /></Link>)}</div></div></section>
        <ConsultationCTA content={siteSettings.consultationCta} />
      </article>
      <Footer navigation={navigation} siteSettings={siteSettings} />
      <PageStructuredData settings={siteSettings} path={`/services/${page.slug}`} name={page.metaTitle} description={page.metaDescription} mainEntity={serviceSchema} breadcrumbs={[{ name: "الرئيسية", path: "/" }, { name: "الخدمات", path: "/services" }, { name: page.shortTitle, path: `/services/${page.slug}` }]} />
    </main>
  );
}
