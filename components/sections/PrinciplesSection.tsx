import { Check } from "lucide-react";
import type { PrinciplesSection as PrinciplesSectionData } from "@/sanity/lib/types";

export function PrinciplesSection({ section }: { section: PrinciplesSectionData }) {
  const principles = section.principles.filter((item) => !item.isHidden);
  return <section className="bg-[oklch(0.975_0.01_180)] py-16 sm:py-20"><div className="container-custom grid gap-12 lg:grid-cols-2 lg:gap-20">
    <div><p className="text-sm font-bold text-primary">{section.eyebrow}</p><h2 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">{section.heading}</h2></div>
    <ul className="divide-y divide-[oklch(0.88_0.02_190)] border-y border-[oklch(0.88_0.02_190)]">{principles.map((principle) => <li key={principle._key} className="flex items-center gap-4 py-4 text-base font-bold text-secondary sm:text-lg"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary"><Check className="size-4" strokeWidth={2.2} aria-hidden="true" /></span>{principle.text}</li>)}</ul>
  </div></section>;
}
