import { ArticleCard } from "@/components/blog/ArticleCard";
import type { ArticleCard as ArticleCardData } from "@/sanity/lib/types";

export function ArticleList({ articles }: { articles: ArticleCardData[] }) {
  if (!articles.length) return null;
  return (
    <section className="py-16 sm:py-20" aria-labelledby="articles-heading">
      <div className="container-custom">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-sm font-bold text-primary">من خبرتنا العملية</p>
          <h2 id="articles-heading" className="text-3xl font-black leading-tight tracking-[-0.025em] text-secondary sm:text-4xl">أحدث المقالات</h2>
        </div>
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => <ArticleCard key={article._id} article={article} priority={index < 2} />)}
        </div>
      </div>
    </section>
  );
}
