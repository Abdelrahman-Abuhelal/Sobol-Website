import { Heart, Target } from "lucide-react";
import type { AboutMethodSection as AboutMethodSectionData } from "@/sanity/lib/types";

export function AboutMethodSection({ section }: { section: AboutMethodSectionData }) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div><p className="text-sm font-bold text-primary">{section.eyebrow}</p><h2 className="mt-3 text-3xl font-black leading-tight text-secondary sm:text-4xl">{section.heading}</h2></div>
          <div className="space-y-6 text-lg leading-8 text-[oklch(0.42_0.035_210)]">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <div className="mt-16 grid border-y border-[oklch(0.88_0.02_190)] md:grid-cols-2">
          <div className="py-8 md:pe-10"><Target className="size-7 text-primary" strokeWidth={1.7} aria-hidden="true" /><h3 className="mt-5 text-2xl font-black text-secondary">{section.missionTitle}</h3><p className="mt-3 max-w-xl leading-7 text-muted-foreground">{section.missionDescription}</p></div>
          <div className="border-t border-[oklch(0.88_0.02_190)] py-8 md:border-s md:border-t-0 md:ps-10"><Heart className="size-7 text-primary" strokeWidth={1.7} aria-hidden="true" /><h3 className="mt-5 text-2xl font-black text-secondary">{section.visionTitle}</h3><p className="mt-3 max-w-xl leading-7 text-muted-foreground">{section.visionDescription}</p></div>
        </div>
      </div>
    </section>
  );
}
