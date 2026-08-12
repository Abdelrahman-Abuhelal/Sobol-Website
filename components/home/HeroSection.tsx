import Link from "next/link";
import {
    ArrowLeft,
    ChartNoAxesCombined,
    ListChecks,
    Settings2,
    TrendingUp,
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

const growthStages = [
    { label: "فهم الواقع", value: "تشخيص" },
    { label: "ترتيب الأولويات", value: "خطة واضحة" },
    { label: "متابعة التنفيذ", value: "قياس مستمر" },
] as const;

function GrowthChart() {
    return (
        <aside
            className="relative mx-auto w-full max-w-[25.75rem] lg:mx-0 lg:ms-auto"
            aria-label="مسار عمل سُبُل من فهم الواقع إلى متابعة التنفيذ"
        >
            <div
                className="absolute -inset-5 -z-10 rounded-[2.25rem] bg-[oklch(0.93_0.03_178/0.32)] blur-3xl"
                aria-hidden="true"
            />

            <div className="overflow-hidden rounded-[1.5rem] border border-[oklch(0.88_0.018_190)] bg-[oklch(0.992_0.006_175)] p-5 shadow-[0_22px_60px_oklch(0.29_0.055_235/0.075)] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold text-secondary">من الوضوح إلى التقدّم</p>
                        <p className="mt-1 text-xs leading-5 text-secondary/58">مسار عملي بخطوات قابلة للمتابعة</p>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                        <TrendingUp className="size-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                </div>

                <div className="relative mt-5 rounded-[1.15rem] bg-[oklch(0.975_0.012_178)] px-3 pb-2 pt-4 sm:px-4">
                    <svg
                        viewBox="0 0 360 210"
                        className="h-auto w-full overflow-visible"
                        role="img"
                        aria-labelledby="growth-chart-title growth-chart-description"
                    >
                        <title id="growth-chart-title">مسار العمل مع سُبُل</title>
                        <desc id="growth-chart-description">رسم بخط صاعد من فهم الواقع إلى خطة واضحة ثم متابعة التنفيذ</desc>
                        <defs>
                            <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="oklch(0.49 0.085 187)" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="oklch(0.49 0.085 187)" stopOpacity="0" />
                            </linearGradient>
                            <marker id="axisArrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
                                <path d="M1 1L6 4L1 7" fill="none" stroke="oklch(0.29 0.055 235)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </marker>
                            <marker id="trendArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
                                <path d="M1 1L7 4.5L1 8" fill="none" stroke="oklch(0.49 0.085 187)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </marker>
                        </defs>

                        {[58, 100, 142].map((y) => (
                            <line key={y} x1="38" y1={y} x2="336" y2={y} stroke="oklch(0.29 0.055 235)" strokeOpacity="0.08" strokeDasharray="4 7" />
                        ))}

                        <path d="M38 174V25" fill="none" stroke="oklch(0.29 0.055 235)" strokeOpacity="0.48" strokeWidth="1.5" markerEnd="url(#axisArrow)" />
                        <path d="M38 174H340" fill="none" stroke="oklch(0.29 0.055 235)" strokeOpacity="0.48" strokeWidth="1.5" markerEnd="url(#axisArrow)" />

                        <path d="M51 159C88 151 103 153 130 128C154 106 180 116 207 91C232 68 251 76 278 52C297 35 312 31 326 25V174H51Z" fill="url(#growthArea)" />
                        <path d="M51 159C88 151 103 153 130 128C154 106 180 116 207 91C232 68 251 76 278 52C297 35 312 31 326 25" fill="none" stroke="oklch(0.49 0.085 187)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#trendArrow)" />

                        {[
                            { cx: 130, cy: 128 },
                            { cx: 207, cy: 91 },
                            { cx: 278, cy: 52 },
                        ].map((point) => (
                            <g key={`${point.cx}-${point.cy}`}>
                                <circle cx={point.cx} cy={point.cy} r="7" fill="oklch(0.992 0.006 175)" stroke="oklch(0.49 0.085 187)" strokeWidth="3" />
                                <circle cx={point.cx} cy={point.cy} r="2.5" fill="oklch(0.49 0.085 187)" />
                            </g>
                        ))}

                        <text x="38" y="198" fill="oklch(0.29 0.055 235)" fillOpacity="0.58" fontSize="11" fontWeight="700">البداية</text>
                        <text x="300" y="198" fill="oklch(0.49 0.085 187)" fontSize="11" fontWeight="700">متابعة</text>
                    </svg>
                </div>

                <dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    {growthStages.map((stage) => (
                        <div key={stage.label} className="rounded-xl border border-[oklch(0.89_0.018_190)] bg-white/70 px-2.5 py-3 text-center sm:px-3">
                            <dt className="text-[0.68rem] font-bold leading-4 text-secondary/62 sm:text-xs">{stage.label}</dt>
                            <dd className="mt-1 text-sm font-black text-primary sm:text-base">{stage.value}</dd>
                        </div>
                    ))}
                </dl>
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

                    <GrowthChart />
                </div>
            </div>
        </section>
    );
}
