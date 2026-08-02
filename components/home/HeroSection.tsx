import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fallbackHomePage } from "@/content/fallbacks";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { HomeHeroSection } from "@/sanity/lib/types";

const journeyImages = [
    {
        src: "/images/journey/understand-reality.png",
        alt: "عدسة تكشف تفاصيل خريطة رمزية لواقع المشروع",
    },
    {
        src: "/images/journey/design-solution.png",
        alt: "مسار رمزي منظم يُبنى من الحجر والخشب لتصميم الحل",
    },
    {
        src: "/images/journey/create-impact.png",
        alt: "منظومة رمزية تحوّل المواد الخام إلى منتجات وأثر ملموس",
    },
] as const;

function GrowthJourney({ content }: { content: HomeHeroSection }) {
    const journey = content.journeyStages.slice(0, journeyImages.length).map((item, index) => ({
        ...item,
        ...journeyImages[index],
        step: String(index + 1).padStart(2, "0"),
    }));

    return (
        <figure
            className="relative w-full max-w-[38rem]"
            aria-labelledby="journey-title"
            aria-describedby="journey-description"
        >
            <div className="mb-6 max-w-[32rem] sm:mb-7">
                <figcaption id="journey-title" className="text-2xl font-black text-secondary sm:text-[1.8rem]">
                    {content.journeyTitle}
                </figcaption>
                <p id="journey-description" className="mt-2 text-sm leading-6 text-secondary/60 sm:text-base">
                    {content.journeyDescription}
                </p>
            </div>

            <ol className="flex flex-col gap-3" aria-label="مراحل مسار العمل">
                {journey.map((item, index) => (
                    <li
                        key={item.step}
                        className={`journey-stage group relative aspect-[2.35/1] overflow-hidden rounded-[1.35rem] border border-[oklch(0.99_0.006_175/0.45)] shadow-[0_18px_45px_oklch(0.29_0.055_235/0.14)] sm:aspect-[3.65/1] sm:rounded-[1.6rem] ${
                            index === 0
                                ? "ms-auto w-[92%]"
                                : index === 1
                                  ? "me-auto w-[96%]"
                                  : "ms-auto w-full"
                        }`}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(max-width: 1024px) 92vw, 608px"
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                            priority={index === 0}
                        />
                        <div
                            className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.22_0.045_230/0.86)_0%,oklch(0.22_0.045_230/0.58)_42%,transparent_78%)]"
                            aria-hidden="true"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 text-[oklch(0.985_0.006_175)] sm:gap-4 sm:p-5">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.95_0.02_175/0.16)] text-[0.7rem] font-black tracking-wider ring-1 ring-inset ring-[oklch(0.98_0.008_175/0.24)] sm:size-10">
                                {item.step}
                            </span>
                            <span className="pb-0.5 text-lg font-black leading-tight sm:text-xl">{item.title}</span>
                        </div>
                    </li>
                ))}
            </ol>
        </figure>
    );
}

export function HeroSection({ content = fallbackHomePage.hero }: { content?: HomeHeroSection }) {
    return (
        <section
            className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[oklch(0.982_0.008_178)] py-14 sm:py-18 lg:py-20"
            aria-labelledby="hero-title"
        >
            <div
                className="absolute -right-40 top-10 -z-10 size-[32rem] rounded-full bg-[oklch(0.93_0.04_174/0.6)] blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-64 -left-40 -z-10 size-[38rem] rounded-full bg-[oklch(0.93_0.025_225/0.5)] blur-3xl"
                aria-hidden="true"
            />

            <div className="container-custom w-full">
                <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(29rem,0.9fr)] lg:gap-16 xl:gap-24">
                    <div className="max-w-[42rem]">
                        <p className="mb-8 flex items-center gap-3 text-sm font-bold text-primary sm:mb-10 sm:text-base">
                            <span className="h-px w-9 bg-primary" aria-hidden="true" />
                            {content.eyebrow}
                        </p>

                        <h1
                            id="hero-title"
                            className="text-[clamp(2.65rem,6vw,5.35rem)] font-black leading-[1.08] tracking-[-0.035em] text-secondary"
                        >
                            {content.titleLineOne}
                            <span className="mt-2 block text-primary">{content.titleLineTwo}</span>
                        </h1>

                        <p className="mt-7 max-w-[39rem] text-lg leading-8 text-[oklch(0.42_0.035_210)] sm:text-xl sm:leading-9">
                            {content.description}
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                            <Link
                                href={controlledLinkHref(content.primaryButton)}
                                className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-[oklch(0.985_0.006_175)] shadow-[0_12px_30px_oklch(0.49_0.085_187/0.2)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.43_0.08_187)] hover:shadow-[0_16px_35px_oklch(0.49_0.085_187/0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(0.982_0.008_178)]"
                            >
                                {content.primaryButton.label}
                                <ArrowLeft className="me-3 size-5" aria-hidden="true" />
                            </Link>

                            <Link
                                href={controlledLinkHref(content.secondaryButton)}
                                className="inline-flex min-h-12 items-center font-bold text-secondary underline decoration-[oklch(0.72_0.06_183)] decoration-2 underline-offset-8 transition-colors hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                            >
                                {content.secondaryButton.label}
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <GrowthJourney content={content} />
                    </div>
                </div>
            </div>
        </section>
    );
}
