import { ArrowUpLeft } from "lucide-react";
import type { PortfolioListSection as PortfolioListSectionData } from "@/sanity/lib/types";

export function PortfolioListSection({ section }: { section: PortfolioListSectionData }) {
  const projects = section.projects.filter((item) => !item.isHidden);
  return <section className="py-16 sm:py-20 lg:py-24"><div className="container-custom">
    <div className="mb-12 grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="text-sm font-bold text-primary">{section.eyebrow}</p><h2 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">{section.heading}</h2></div><p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">{section.description}</p></div>
    <div className="border-t border-[oklch(0.86_0.025_190)]">{projects.map((project, index) => <article key={project._key} className="group grid gap-4 border-b border-[oklch(0.86_0.025_190)] py-6 transition-colors hover:bg-[oklch(0.975_0.012_178)] sm:grid-cols-[4rem_1fr_0.8fr_auto] sm:items-center sm:px-4"><span className="text-xs font-black tracking-wider text-primary/65">{String(index + 1).padStart(2, "0")}</span><div><p className="text-xs font-bold text-primary">{project.category}</p><h3 className="mt-1 text-xl font-black text-secondary sm:text-2xl">{project.name}</h3></div><p className="text-sm font-bold text-[oklch(0.42_0.035_210)] sm:text-base">{project.result}</p><span className="hidden size-10 items-center justify-center rounded-full border border-[oklch(0.84_0.03_185)] text-primary transition-[background-color,color,transform] duration-300 group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground sm:flex"><ArrowUpLeft className="size-4" aria-hidden="true" /></span></article>)}</div>
    <p className="mt-6 text-sm leading-6 text-muted-foreground">{section.privacyNote}</p>
  </div></section>;
}
