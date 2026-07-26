import { Layout, Megaphone, Palette, PenTool, Share2, Target } from "lucide-react";
import type { MarketingServicesSection as MarketingServicesSectionData } from "@/sanity/lib/types";

const icons = { Palette, Share2, Megaphone, PenTool, Layout, Target };
export function MarketingServicesSection({ section }: { section: MarketingServicesSectionData }) {
  const services = section.services.filter((item) => !item.isHidden);
  return <section className="bg-[oklch(0.975_0.01_180)] py-16 sm:py-20 lg:py-24"><div className="container-custom"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
    <div><p className="text-sm font-bold text-primary">{section.eyebrow}</p><h2 className="mt-3 text-3xl font-black leading-tight text-secondary sm:text-4xl">{section.heading}</h2><p className="mt-5 leading-7 text-muted-foreground">{section.description}</p></div>
    <div className="grid border-t border-[oklch(0.86_0.025_190)] sm:grid-cols-2">{services.map((service, index) => { const Icon = icons[service.icon]; return <div key={service._key} className={`flex gap-4 border-b border-[oklch(0.86_0.025_190)] py-5 ${index % 2 === 1 ? "sm:border-s sm:ps-7" : "sm:pe-7"}`}><Icon className="mt-1 size-5 shrink-0 text-primary" strokeWidth={1.7} aria-hidden="true" /><div><h3 className="font-black text-secondary">{service.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{service.description}</p></div></div>; })}</div>
  </div></div></section>;
}
