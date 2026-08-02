import { Check } from "lucide-react";
import type { ServicePackagesSection as ServicePackagesSectionData } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

export function ServicePackagesSection({ section }: { section: ServicePackagesSectionData }) {
  const packages = section.packages.filter((item) => !item.isHidden);
  return <section className="py-16 sm:py-20 lg:py-24"><div className="container-custom">
    <div className="mb-12 grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="text-sm font-bold text-primary">{section.eyebrow}</p><h2 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">{section.heading}</h2></div><p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">{section.description}</p></div>
    <div className="border-t border-[oklch(0.86_0.025_190)]">{packages.map((service, index) => {
      const items = service.items?.filter((item) => !item.isHidden) || [];
      return <article key={service._key} className={cn("grid gap-7 border-b border-[oklch(0.86_0.025_190)] py-10 lg:gap-10 lg:py-12", items.length ? "lg:grid-cols-[6rem_0.8fr_1.2fr]" : "lg:grid-cols-[6rem_1fr]")}><span className="text-sm font-black tracking-wider text-primary/70">{String(index + 1).padStart(2, "0")}</span><div><p className="text-sm font-bold text-primary">{service.label}</p><h3 className="mt-2 text-2xl font-black text-secondary sm:text-3xl">{service.title}</h3><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{service.description}</p></div>{items.length > 0 && <ul className="grid content-start gap-x-8 sm:grid-cols-2">{items.map((item) => <li key={item._key} className="flex items-center gap-3 border-b border-[oklch(0.91_0.015_190)] py-3 text-sm font-bold text-secondary sm:text-base"><Check className="size-4 shrink-0 text-primary" strokeWidth={2.2} aria-hidden="true" />{item.text}</li>)}</ul>}</article>;
    })}</div>
  </div></section>;
}
