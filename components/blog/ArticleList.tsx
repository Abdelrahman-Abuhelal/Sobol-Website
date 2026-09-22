"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { trackEvent } from "@/lib/analytics";
import type { ArticleCard as ArticleCardData } from "@/sanity/lib/types";

type ArticleSort = "latest" | "popular" | "featured";

const sortOptions: Array<{ value: ArticleSort; label: string }> = [
  { value: "latest", label: "الأحدث" },
  { value: "popular", label: "الأكثر مشاهدة" },
  { value: "featured", label: "المميزة" },
];

const newestFirst = (a: ArticleCardData, b: ArticleCardData) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

export function ArticleList({ articles, viewCounts, initialSort }: { articles: ArticleCardData[]; viewCounts: Record<string, number>; initialSort: ArticleSort }) {
  const [sort, setSort] = useState<ArticleSort>(initialSort);

  const sortedArticles = useMemo(() => [...articles].sort((a, b) => {
    if (sort === "popular") return (viewCounts[b.slug] || 0) - (viewCounts[a.slug] || 0) || newestFirst(a, b);
    if (sort === "featured") return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || newestFirst(a, b);
    return newestFirst(a, b);
  }), [articles, sort, viewCounts]);

  const selectSort = (nextSort: ArticleSort) => {
    setSort(nextSort);
    const url = new URL(window.location.href);
    if (nextSort === "latest") url.searchParams.delete("sort");
    else url.searchParams.set("sort", nextSort);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    trackEvent("blog_sort_changed", { sort: nextSort });
  };

  if (!articles.length) return null;
  return (
    <section className="py-16 sm:py-20" aria-labelledby="articles-heading">
      <div className="container-custom">
        <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold text-primary">من خبرتنا العملية</p>
            <h2 id="articles-heading" className="text-3xl font-black leading-tight tracking-[-0.025em] text-secondary sm:text-4xl">المقالات</h2>
          </div>
          <div className="flex w-fit flex-wrap gap-1 rounded-2xl border border-[oklch(0.86_0.018_190)] bg-[oklch(0.985_0.006_178)] p-1.5" role="group" aria-label="ترتيب المقالات">
            {sortOptions.map((option) => <button key={option.value} type="button" onClick={() => selectSort(option.value)} aria-pressed={sort === option.value} className={`min-h-10 rounded-xl px-4 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${sort === option.value ? "bg-secondary text-white shadow-sm" : "text-secondary/70 hover:bg-white hover:text-secondary"}`}>{option.label}</button>)}
          </div>
        </div>
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {sortedArticles.map((article, index) => <ArticleCard key={article._id} article={article} priority={index < 2} viewCount={viewCounts[article.slug] || 0} showViews={sort === "popular"} />)}
        </div>
      </div>
    </section>
  );
}
