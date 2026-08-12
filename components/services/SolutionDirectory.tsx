import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { getSolutionPages } from "@/sanity/lib/data";

export async function SolutionDirectory({ compact = false }: { compact?: boolean }) {
  const solutionPages = await getSolutionPages();
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
            <Link key={page.slug} href={`/services/${page.slug}`} className={`group flex min-h-28 items-center justify-between gap-5 rounded-2xl border border-[oklch(0.86_0.022_190)] bg-background px-5 py-5 transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/45 hover:bg-accent/55 hover:shadow-[0_16px_35px_oklch(0.29_0.055_235/0.07)] focus-visible:border-primary/55 focus-visible:bg-accent/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-3 focus-visible:ring-offset-background ${!compact && index === 0 ? "md:col-span-2" : ""}`}>
              <div><p className="text-xs font-black tracking-[0.1em] text-primary">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-2 text-lg font-black leading-7 text-secondary">{page.title}</h3></div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary transition-[background-color,color,transform] duration-200 ease-out group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:-translate-x-1 group-focus-visible:bg-primary group-focus-visible:text-primary-foreground">
                <ArrowLeft className="size-4.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
