import { Check } from "lucide-react";
import type { PrinciplesSection as PrinciplesSectionData } from "@/sanity/lib/types";

export function PrinciplesSection({ section }: { section: PrinciplesSectionData }) {
  const principles = section.principles.filter((item) => !item.isHidden);
  return <section className="border-y border-border/70 bg-surface-warm py-16 sm:py-20"><div className="container-custom grid gap-12 lg:grid-cols-2 lg:gap-20">
    <div><p className="text-sm font-bold text-primary">{section.eyebrow}</p><h2 className="mt-3 text-3xl font-extrabold leading-[1.3] tracking-[-0.025em] text-secondary sm:text-4xl">{section.heading}</h2></div>
    <ul className="divide-y divide-border border-y border-border">{principles.map((principle) => <li key={principle._key} className="flex items-center gap-4 py-5 text-base font-bold leading-8 text-secondary sm:text-lg"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"><Check className="size-4" strokeWidth={2.2} aria-hidden="true" /></span>{principle.text}</li>)}</ul>
  </div></section>;
}
