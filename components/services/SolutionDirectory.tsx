import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { getSolutionPages } from "@/sanity/lib/data";

export async function SolutionDirectory({ compact = false }: { compact?: boolean }) {
  const solutionPages = await getSolutionPages();
  if (solutionPages.length === 0) return null;

  return (
    <section className={`relative isolate overflow-hidden border-y border-border/70 ${compact ? "bg-surface-warm py-16 sm:py-20" : "bg-surface-muted py-16 sm:py-20 lg:py-24"}`} aria-labelledby="solution-directory-title">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,oklch(0.91_0.055_176/0.55),transparent_24rem)]" aria-hidden="true" />
      <div className="container-custom">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-bold text-primary"><Search className="size-4" aria-hidden="true" />ابدأ من المشكلة التي تواجهك</p>
          <h2 id="solution-directory-title" className="mt-3 text-3xl font-extrabold leading-[1.3] tracking-[-0.025em] text-secondary sm:text-4xl">لا تعرف أين الخلل في مشروعك؟ ابدأ من هنا.</h2>
          <p className="mt-4 max-w-[46rem] text-lg leading-9 text-muted-foreground">اختر السؤال الأقرب إلى واقع مشروعك. إذا كانت المشكلات متداخلة، فابدأ بتشخيص المشروع قبل اختيار خدمة منفصلة.</p>
        </div>
        <div className={`mt-9 grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {solutionPages.map((page, index) => (
            <Link key={page.slug} href={`/services/${page.slug}`} className={`group flex min-h-32 items-center justify-between gap-6 rounded-[1.25rem] border border-border/90 bg-surface/88 px-6 py-6 shadow-[0_12px_32px_oklch(0.255_0.055_232/0.035)] transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface hover:shadow-[0_18px_40px_oklch(0.255_0.055_232/0.08)] focus-visible:border-primary/55 focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-3 focus-visible:ring-offset-surface-muted ${!compact && index === 0 ? "md:col-span-2" : ""}`}>
              <div><p className="text-xs font-black tracking-[0.1em] text-primary">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 max-w-[34rem] text-lg font-extrabold leading-8 text-secondary">{page.title}</h3></div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-[background-color,color,transform] duration-200 ease-out group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:-translate-x-1 group-focus-visible:bg-primary group-focus-visible:text-primary-foreground">
                <ArrowLeft className="size-4.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
