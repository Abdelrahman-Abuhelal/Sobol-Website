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
            className="relative mx-auto w-full max-w-[30rem] lg:mx-0 lg:ms-auto"
            aria-label="تصور مبسط لتحويل فوضى العمل إلى نظام واضح"
        >
            <div
                className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[oklch(0.93_0.035_178/0.52)] blur-3xl"
                aria-hidden="true"
            />

            <div className="overflow-hidden rounded-[1.75rem] border border-[oklch(0.84_0.025_190)] bg-[oklch(0.992_0.006_175)] shadow-[0_24px_70px_oklch(0.29_0.055_235/0.1)]">
                <div className="flex items-center justify-between border-b border-[oklch(0.88_0.018_190)] px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-2.5">
                        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
                        <span className="text-sm font-bold text-secondary">منظومة العمل</span>
                    </div>
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">صورة أوضح</span>
                </div>

                <div className="p-5 sm:p-6">
                    <p className="text-sm font-bold text-secondary/55">من التشتت إلى قرار يمكن تنفيذه</p>

                    <div className="mt-5 space-y-3" aria-label="محاور التنظيم">
                        {[
                            { label: "العمليات", width: "w-[72%]" },
                            { label: "الإدارة والمالية", width: "w-[88%]" },
                            { label: "المتابعة والقرار", width: "w-full" },
                        ].map((item) => (
                            <div key={item.label} className="grid grid-cols-[7rem_1fr] items-center gap-3">
                                <span className="text-sm font-bold text-secondary/78">{item.label}</span>
                                <span className="h-2 rounded-full bg-[oklch(0.91_0.025_190)]">
                                    <span className={`block h-full rounded-full bg-primary/55 ${item.width}`} />
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="my-6 flex items-center gap-3" aria-hidden="true">
                        <span className="h-px flex-1 bg-[oklch(0.86_0.02_190)]" />
                        <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                            <ArrowLeft className="size-4" />
                        </span>
                        <span className="h-px flex-1 bg-[oklch(0.86_0.02_190)]" />
                    </div>

                    <div className="rounded-[1.25rem] bg-secondary p-5 text-secondary-foreground">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-lg font-black">نظام واضح</span>
                            <span className="text-xs font-bold text-secondary-foreground/62">الخطوة التالية محددة</span>
                        </div>
                        <ul className="mt-4 grid gap-2.5 text-sm font-medium text-secondary-foreground/82">
                            {[
                                "مسؤوليات واضحة",
                                "أرقام قابلة للمتابعة",
                                "قرار مبني على الواقع",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-2.5">
                                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
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
            className="relative isolate overflow-hidden bg-[oklch(0.982_0.008_178)] py-[clamp(4rem,8vw,7rem)]"
            aria-labelledby="hero-title"
        >
            <div
                className="absolute -right-48 -top-56 -z-10 size-[34rem] rounded-full bg-[oklch(0.94_0.035_174/0.65)] blur-3xl"
                aria-hidden="true"
            />

            <div className="container-custom">
                <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.16fr)_minmax(22rem,0.84fr)] lg:gap-16 xl:gap-24">
                    <div className="max-w-[46rem]">
                        <p className="flex items-center gap-3 text-sm font-bold text-primary sm:text-base">
                            <span className="h-px w-8 bg-primary" aria-hidden="true" />
                            {content.eyebrow}
                        </p>

                        <h1
                            id="hero-title"
                            className="mt-7 max-w-[43rem] text-[clamp(2.7rem,5.6vw,4.9rem)] font-black leading-[1.12] tracking-[-0.035em] text-secondary"
                        >
                            <span className="block">{content.titleLineOne}</span>
                            <span className="mt-1 block text-primary">{content.titleLineTwo}</span>
                        </h1>

                        <p className="mt-7 max-w-[43rem] text-lg leading-8 text-[oklch(0.4_0.035_220)] sm:text-xl sm:leading-9">
                            {content.description}
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href={controlledLinkHref(content.primaryButton)}
                                className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground shadow-[0_12px_28px_oklch(0.49_0.085_187/0.2)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.43_0.08_187)] hover:shadow-[0_16px_32px_oklch(0.49_0.085_187/0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(0.982_0.008_178)] sm:min-w-[11.5rem]"
                            >
                                {content.primaryButton.label}
                                <ArrowLeft className="me-3 size-5" aria-hidden="true" />
                            </Link>

                            <Link
                                href={controlledLinkHref(content.secondaryButton)}
                                className="inline-flex min-h-14 items-center justify-center rounded-xl border border-[oklch(0.76_0.035_205)] bg-[oklch(0.992_0.006_175)] px-7 text-base font-bold text-secondary transition-[border-color,background-color,color] duration-200 hover:border-primary hover:bg-accent/55 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(0.982_0.008_178)] sm:min-w-[10.5rem]"
                            >
                                {content.secondaryButton.label}
                            </Link>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-secondary/60">
                            {content.closingBadgeText}
                        </p>

                        <ul className="mt-8 grid gap-3 border-y border-[oklch(0.87_0.02_190)] py-5 sm:grid-cols-3 sm:gap-5">
                            {trustPoints.map((point, index) => {
                                const Icon = trustIcons[index] ?? Settings2;
                                return (
                                    <li key={point} className="flex items-center gap-2.5 text-sm font-bold leading-5 text-secondary/75">
                                        <Icon className="size-4 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
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
