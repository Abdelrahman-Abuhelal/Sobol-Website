import Link from "next/link";
import { ArrowDownLeft, ArrowLeft } from "lucide-react";
import { fallbackHomePage } from "@/content/fallbacks";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { HomeHeroSection } from "@/sanity/lib/types";

function GrowthJourney({ content }: { content: HomeHeroSection }) {
    const journey = content.journeyStages.map((item, index) => ({ ...item, step: String(index + 1).padStart(2, "0") }));
    return (
        <figure
            className="relative w-full max-w-[35rem]"
            aria-labelledby="journey-title"
            aria-describedby="journey-description"
        >
            <div className="absolute -inset-8 -z-10 rounded-[3.5rem] bg-[oklch(0.94_0.035_174/0.55)] blur-3xl" />

            <div className="overflow-hidden rounded-[2rem] border border-[oklch(0.84_0.025_190)] bg-[oklch(0.992_0.006_175)] shadow-[0_24px_70px_oklch(0.36_0.055_210/0.11)]">
                <div className="px-6 pb-5 pt-7 sm:px-8 sm:pb-6 sm:pt-8">
                    <figcaption id="journey-title" className="text-2xl font-black text-secondary sm:text-[1.7rem]">
                        {content.journeyTitle}
                    </figcaption>
                    <p id="journey-description" className="mt-2 max-w-[28rem] text-sm leading-6 text-secondary/60">
                        {content.journeyDescription}
                    </p>
                </div>

                <div className="px-4 pb-2 sm:px-6">
                    <ol className="flex flex-col py-1" aria-label="مراحل مسار العمل">
                        {journey.map((item, index) => (
                            <li
                                key={item.step}
                                className={`journey-stage relative flex flex-col ${
                                    item.step === "01"
                                        ? "ml-auto w-[84%]"
                                        : item.step === "02"
                                          ? "mx-auto w-[88%]"
                                          : "mr-auto w-[92%]"
                                }`}
                            >
                                <div className="drop-shadow-[0_10px_20px_oklch(0.36_0.055_210/0.09)]">
                                    <div
                                        className={`flex min-h-[5.25rem] items-center gap-3 py-3 pl-11 pr-10 [clip-path:polygon(100%_0,14%_0,0_50%,14%_100%,100%_100%,89%_50%)] sm:min-h-[5.75rem] sm:gap-4 sm:pl-14 sm:pr-14 ${
                                            item.step === "01"
                                                ? "bg-[oklch(0.955_0.022_174)] text-secondary"
                                                : item.step === "02"
                                                  ? "bg-[oklch(0.82_0.052_176)] text-secondary"
                                                  : "bg-[oklch(0.43_0.078_187)] text-primary-foreground"
                                        }`}
                                    >
                                        <span
                                            className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-black tracking-wider sm:size-10 ${
                                                item.step === "03"
                                                    ? "bg-[oklch(0.97_0.012_175/0.15)] text-primary-foreground"
                                                    : "bg-[oklch(0.99_0.006_175/0.8)] text-primary"
                                            }`}
                                        >
                                            {item.step}
                                        </span>
                                        <span>
                                            <span className="block text-base font-black leading-6 sm:text-lg">{item.title}</span>
                                            <span className={`mt-0.5 block text-xs leading-5 sm:text-sm ${item.step === "03" ? "text-primary-foreground/72" : "text-secondary/58"}`}>
                                                {item.description}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {index < journey.length - 1 && (
                                    <ArrowDownLeft
                                        className={`my-1.5 size-6 text-primary/55 ${index === 0 ? "ml-[19%]" : "ml-[8%]"}`}
                                        strokeWidth={1.6}
                                        aria-hidden="true"
                                    />
                                )}
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="flex justify-end px-6 pb-7 pt-5 sm:px-8 sm:pb-8">
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.84_0.03_185)] bg-[oklch(0.965_0.022_174)] px-4 py-2 text-xs font-bold text-secondary/75">
                        <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                        {content.closingBadgeText}
                    </div>
                </div>
            </div>
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
