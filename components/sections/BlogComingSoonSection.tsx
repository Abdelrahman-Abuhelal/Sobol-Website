import { ArrowLeft, BookOpen } from "lucide-react";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { BlogComingSoonSection as BlogComingSoonSectionData } from "@/sanity/lib/types";

export function BlogComingSoonSection({ section }: { section: BlogComingSoonSectionData }) {
  const topics = section.topics.filter((item) => !item.isHidden);
  return <section className="py-16 sm:py-20 lg:py-24"><div className="container-custom"><div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
    <div><span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary"><BookOpen className="size-5" strokeWidth={1.8} aria-hidden="true" /></span><p className="mt-6 text-sm font-bold text-primary">{section.statusLabel}</p><h2 className="mt-3 text-3xl font-black leading-tight text-secondary sm:text-4xl">{section.heading}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{section.description}</p><a href={controlledLinkHref(section.emailCta)} className="mt-7 inline-flex min-h-12 items-center font-bold text-secondary underline decoration-[oklch(0.72_0.06_183)] decoration-2 underline-offset-8 transition-colors hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">{section.emailCta.label}<ArrowLeft className="me-3 size-4" aria-hidden="true" /></a></div>
    <div className="border-t border-[oklch(0.86_0.025_190)]"><p className="py-4 text-xs font-black tracking-wider text-primary/70">{section.topicsHeading}</p>{topics.map((topic, index) => <div key={topic._key} className="grid grid-cols-[3rem_1fr] items-center border-t border-[oklch(0.9_0.018_190)] py-6"><span className="text-xs font-black text-primary/60">{String(index + 1).padStart(2, "0")}</span><h3 className="text-lg font-black text-secondary sm:text-xl">{topic.text}</h3></div>)}</div>
  </div></div></section>;
}
