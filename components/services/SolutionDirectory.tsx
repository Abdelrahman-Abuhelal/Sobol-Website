import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { solutionPages } from "@/content/solution-pages";

export function SolutionDirectory({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-14 sm:py-16" : "bg-[oklch(0.975_0.01_180)] py-16 sm:py-20 lg:py-24"} aria-labelledby="solution-directory-title">
      <div className="container-custom">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-bold text-primary"><Search className="size-4" aria-hidden="true" />ابدأ من المشكلة التي تواجهك</p>
          <h2 id="solution-directory-title" className="mt-3 text-3xl font-black leading-tight text-secondary sm:text-4xl">لا تعرف أين الخلل في مشروعك؟ ابدأ من هنا.</h2>
          <p className="mt-4 text-lg leading-8 text-secondary/65">اختر السؤال الأقرب إلى واقع مشروعك. إذا كانت المشكلات متداخلة، فابدأ بتشخيص المشروع قبل اختيار خدمة منفصلة.</p>
        </div>
        <div className={`mt-9 grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {solutionPages.map((page, index) => (
            <Link key={page.slug} href={`/services/${page.slug}`} className={`group flex min-h-28 items-center justify-between gap-5 rounded-2xl border border-[oklch(0.86_0.022_190)] bg-background px-5 py-5 transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_16px_35px_oklch(0.29_0.055_235/0.07)] ${!compact && index === 0 ? "md:col-span-2" : ""}`}>
              <div><p className="text-xs font-black tracking-[0.1em] text-primary">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 text-lg font-black leading-7 text-secondary">{page.title}</h3></div>
              <ArrowLeft className="size-5 shrink-0 text-primary transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
