import { Heart, Target } from "lucide-react";
import type { AboutMethodSection as AboutMethodSectionData } from "@/sanity/lib/types";

export function AboutMethodSection({ section }: { section: AboutMethodSectionData }) {
  return (
    <section className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div><p className="text-sm font-bold text-primary">{section.eyebrow}</p><h2 className="mt-3 text-3xl font-extrabold leading-[1.3] tracking-[-0.025em] text-secondary sm:text-4xl">{section.heading}</h2></div>
          <div className="max-w-[44rem] space-y-6 text-lg leading-9 text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <div className="mt-16 grid rounded-[1.5rem] border border-border bg-surface-muted/55 px-6 md:grid-cols-2 md:px-8">
          <div className="py-8 md:pe-10"><Target className="size-7 text-primary" strokeWidth={1.7} aria-hidden="true" /><h3 className="mt-5 text-2xl font-black text-secondary">{section.missionTitle}</h3><p className="mt-3 max-w-xl leading-7 text-muted-foreground">{section.missionDescription}</p></div>
          <div className="border-t border-border py-8 md:border-s md:border-t-0 md:ps-10"><Heart className="size-7 text-primary" strokeWidth={1.7} aria-hidden="true" /><h3 className="mt-5 text-2xl font-black text-secondary">{section.visionTitle}</h3><p className="mt-3 max-w-xl leading-8 text-muted-foreground">{section.visionDescription}</p></div>
        </div>
      </div>
    </section>
  );
}
