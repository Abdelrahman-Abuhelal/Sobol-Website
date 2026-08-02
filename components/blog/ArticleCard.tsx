import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { editorialImageUrl } from "@/sanity/lib/image";
import type { ArticleCard as ArticleCardData } from "@/sanity/lib/types";

const dateFormatter = new Intl.DateTimeFormat("ar-PS", { year: "numeric", month: "long", day: "numeric" });

export function ArticleCard({ article, priority = false }: { article: ArticleCardData; priority?: boolean }) {
  const imageSrc = editorialImageUrl(article.featuredImage, 900);
  return (
    <article className="group grid overflow-hidden rounded-[1.75rem] border border-[oklch(0.86_0.018_190)] bg-[oklch(0.99_0.004_175)] shadow-[0_18px_55px_-42px_oklch(0.29_0.055_235/0.65)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_-38px_oklch(0.29_0.055_235/0.55)]">
      <Link href={`/blog/${article.slug}`} className="relative aspect-[16/10] overflow-hidden bg-muted" aria-label={article.title}>
        {imageSrc ? (
          <Image src={imageSrc} alt={article.featuredImage?.alt || article.title} fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
        ) : <div className="absolute inset-0 bg-[oklch(0.93_0.04_174)]" aria-hidden="true" />}
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <time dateTime={article.publishedAt}>{dateFormatter.format(new Date(article.publishedAt))}</time>
          {article.categories?.[0] && <><span aria-hidden="true">•</span><span>{article.categories[0].title}</span></>}
        </div>
        <h2 className="text-2xl font-extrabold leading-[1.35] tracking-[-0.02em] text-secondary">
          <Link href={`/blog/${article.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">{article.title}</Link>
        </h2>
        <p className="mt-4 line-clamp-3 text-base leading-7 text-[oklch(0.43_0.035_210)]">{article.excerpt}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[oklch(0.9_0.012_185)] pt-5">
          <span className="text-sm font-medium text-muted-foreground">{article.author.name}</span>
          <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
            اقرأ المقال <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
