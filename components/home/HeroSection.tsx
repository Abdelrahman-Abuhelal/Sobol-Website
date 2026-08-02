import Link from "next/link";
import {
    ArrowLeft,
    ChartNoAxesCombined,
    Check,
    ListChecks,
    Settings2,
} from "lucide-react";
import { fallbackHomePage } from "@/content/fallbacks";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { HomeHeroSection } from "@/sanity/lib/types";

const defaultTrustPoints = [
    "حلول مصممة حسب واقع مشروعك",
    "خطوات عملية قابلة للتنفيذ",
    "متابعة مبنية على مؤشرات واضحة",
] as const;

const trustIcons = [Settings2, ListChecks, ChartNoAxesCombined] as const;

function OperationalBlueprint() {
    return (
        <aside
            className="relative mx-auto w-full max-w-[25.75rem] lg:mx-0 lg:ms-auto"
            aria-label="تصور مبسط لتحويل فوضى العمل إلى نظام واضح"
        >
            <div
                className="absolute -inset-5 -z-10 rounded-[2.25rem] bg-[oklch(0.93_0.03_178/0.32)] blur-3xl"
                aria-hidden="true"
            />

            <div className="overflow-hidden rounded-[1.5rem] border border-[oklch(0.88_0.018_190)] bg-[oklch(0.992_0.006_175)] shadow-[0_22px_60px_oklch(0.29_0.055_235/0.075)]">
                <div className="flex items-center gap-2.5 px-5 pt-5">
                    <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-sm font-bold text-secondary">منظومة العمل</span>
                </div>

                <div className="p-5 pt-4">
                    <div aria-label="حالة تنظيم العمليات">
                        <div className="flex items-center justify-between gap-3 text-xs font-bold text-secondary/58">
                            <span>عمل مشتت</span>
                            <span className="text-primary">نظام قابل للمتابعة</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[oklch(0.91_0.022_190)]">
                            <span className="block h-full w-[82%] rounded-full bg-primary/62" />
                        </div>
                        <div className="mt-3 flex justify-between gap-3 text-xs font-medium text-secondary/66">
                            <span>العمليات</span>
                            <span>المالية</span>
                            <span>المتابعة</span>
                        </div>
                    </div>

                    <div className="mt-5 rounded-[1.1rem] bg-secondary p-4.5 text-secondary-foreground sm:p-5">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-lg font-black">نظام واضح</span>
                            <span className="text-xs font-bold text-secondary-foreground/58">الخطوة التالية محددة</span>
                        </div>
                        <ul className="mt-3 grid gap-2 text-sm font-medium text-secondary-foreground/82 sm:grid-cols-2 sm:gap-x-4">
                            {["مسؤوليات واضحة", "مؤشرات قابلة للقياس"].map((item) => (
                                <li key={item} className="flex items-center gap-2.5">
                                    <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export function HeroSection({ content = fallbackHomePage.hero }: { content?: HomeHeroSection }) {
    const trustPoints = content.trustPoints?.length === 3 ? content.trustPoints : defaultTrustPoints;

    return (
        <section
            className="relative isolate overflow-hidden bg-[oklch(0.982_0.008_178)] py-[clamp(3.25rem,4.5vw,4rem)]"
            aria-labelledby="hero-title"
        >
            <div
                className="absolute -right-44 -top-48 -z-10 size-[27rem] rounded-full bg-[oklch(0.94_0.03_174/0.38)] blur-3xl"
                aria-hidden="true"
            />

            <div className="container-custom max-w-[77.5rem]">
                <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(21rem,0.84fr)] lg:gap-14 xl:gap-20">
                    <div className="max-w-[42rem]">
                        <p className="flex items-center gap-3 text-sm font-bold text-primary sm:text-base">
                            <span className="h-px w-8 bg-primary" aria-hidden="true" />
                            {content.eyebrow}
                        </p>

                        <h1
                            id="hero-title"
                            className="mt-6 max-w-[40rem] text-[clamp(2.55rem,5vw,4.5rem)] font-black leading-[1.12] tracking-[-0.035em] text-secondary"
                        >
                            <span className="block">{content.titleLineOne}</span>
                            <span className="mt-1 block text-primary">{content.titleLineTwo}</span>
                        </h1>

                        <p className="mt-7 max-w-[36rem] text-[1.075rem] leading-8 text-secondary/80 sm:text-lg sm:leading-8">
                            {content.description}
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href={controlledLinkHref(content.primaryButton)}
                                className="inline-flex min-h-13 items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground shadow-[0_12px_26px_oklch(0.49_0.085_187/0.18)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.43_0.08_187)] hover:shadow-[0_16px_30px_oklch(0.49_0.085_187/0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(0.982_0.008_178)] sm:min-w-[11.5rem]"
                            >
                                {content.primaryButton.label}
                                <ArrowLeft className="me-3 size-5" aria-hidden="true" />
                            </Link>

                            <Link
                                href={controlledLinkHref(content.secondaryButton)}
                                className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[oklch(0.8_0.028_205)] bg-[oklch(0.992_0.006_175)] px-7 text-base font-bold text-secondary/88 transition-[border-color,background-color,color] duration-200 hover:border-primary hover:bg-accent/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(0.982_0.008_178)] sm:min-w-[10.5rem]"
                            >
                                {content.secondaryButton.label}
                            </Link>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-secondary/64">
                            {content.closingBadgeText}
                        </p>

                        <ul className="mt-5 grid gap-3 border-t border-[oklch(0.88_0.018_190)] pt-4 sm:grid-cols-3 sm:gap-6">
                            {trustPoints.map((point, index) => {
                                const Icon = trustIcons[index] ?? Settings2;
                                return (
                                    <li key={point} className="flex items-center gap-2 text-[0.82rem] font-bold leading-5 text-secondary/72">
                                        <Icon className="size-3.5 shrink-0 text-primary/72" strokeWidth={1.7} aria-hidden="true" />
                                        {point}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <OperationalBlueprint />
                </div>
            </div>
        </section>
    );
}
