import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ChartNoAxesCombined,
    ListChecks,
    Settings2,
    TrendingUp,
} from "lucide-react";
import { fallbackHomePage } from "@/content/fallbacks";
import { editorialImageUrl } from "@/sanity/lib/image";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { EditorialImage, HomeHeroSection } from "@/sanity/lib/types";

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

            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface p-5 shadow-[0_24px_65px_oklch(0.255_0.055_232/0.1)] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold text-secondary">من الوضوح إلى التقدّم</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">مسار عملي بخطوات قابلة للمتابعة</p>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <TrendingUp className="size-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                </div>

                <div className="relative mt-5 rounded-[1.15rem] bg-surface-muted/72 px-3 pb-2 pt-4 sm:px-4">
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
                        <div key={stage.label} className="rounded-xl border border-border/75 bg-surface-warm/55 px-2.5 py-3 text-center sm:px-3">
                            <dt className="text-[0.68rem] font-bold leading-4 text-secondary/62 sm:text-xs">{stage.label}</dt>
                            <dd className="mt-1 text-sm font-black text-primary sm:text-base">{stage.value}</dd>
                        </div>
                    ))}
                </dl>
                </div>
        </aside>
    );
}

function HeroImage({ image }: { image: EditorialImage }) {
    const imageSrc = editorialImageUrl(image, 1280);
    if (!imageSrc) return <GrowthChart />;

    return (
        <aside className="relative mx-auto w-full max-w-[31rem] lg:mx-0 lg:ms-auto">
            <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-primary-soft/55 blur-3xl" aria-hidden="true" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-[0_24px_65px_oklch(0.255_0.055_232/0.1)]">
                <Image
                    src={imageSrc}
                    alt={image.alt || ""}
                    fill
                    priority
                    sizes="(max-width: 1024px) 496px, 496px"
                    className="object-contain"
                />
            </div>
        </aside>
    );
}

export function HeroSection({ content = fallbackHomePage.hero }: { content?: HomeHeroSection }) {
    const trustPoints = content.trustPoints?.length === 3 ? content.trustPoints : defaultTrustPoints;
    const showHeroImage = content.heroVisualType === "image" && content.heroImage?.image;

    return (
        <section
            className="relative isolate overflow-hidden border-b border-border/70 bg-surface py-[clamp(4rem,6vw,5.75rem)]"
            aria-labelledby="hero-title"
        >
            <div
                className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_85%_12%,oklch(0.89_0.065_177/0.56),transparent_29rem),radial-gradient(circle_at_6%_82%,oklch(0.93_0.04_82/0.54),transparent_26rem)]"
                aria-hidden="true"
            />
            <div className="absolute inset-y-0 right-[7%] -z-10 w-px bg-primary/10" aria-hidden="true" />

            <div className="container-custom max-w-[77.5rem]">
                <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.16fr)_minmax(21rem,0.84fr)] lg:gap-14 xl:gap-20">
                    <div className="max-w-[42rem]">
                        <p className="flex items-center gap-3 text-sm font-bold text-primary sm:text-base">
                            <span className="h-px w-8 bg-primary" aria-hidden="true" />
                            {content.eyebrow}
                        </p>

                        <h1
                            id="hero-title"
                            className="mt-6 max-w-[40rem] text-[clamp(2.55rem,5vw,4.65rem)] font-extrabold leading-[1.14] tracking-[-0.04em] text-secondary"
                        >
                            <span className="block">{content.titleLineOne}</span>
                            <span className="mt-1 block text-primary">{content.titleLineTwo}</span>
                        </h1>

                        <p className="mt-7 max-w-[36rem] text-[1.075rem] leading-9 text-muted-foreground sm:text-lg sm:leading-9">
                            {content.description}
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href={controlledLinkHref(content.primaryButton)}
                                className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground shadow-[0_14px_28px_oklch(0.44_0.095_184/0.2)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.39_0.09_184)] hover:shadow-[0_18px_34px_oklch(0.44_0.095_184/0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-surface sm:min-w-[11.5rem]"
                            >
                                {content.primaryButton.label}
                                <ArrowLeft className="me-3 size-5" aria-hidden="true" />
                            </Link>

                            <Link
                                href={controlledLinkHref(content.secondaryButton)}
                                className="inline-flex min-h-14 items-center justify-center rounded-xl border border-border bg-surface/80 px-7 text-base font-bold text-secondary transition-[border-color,background-color,color] duration-200 hover:border-primary/60 hover:bg-primary-soft/55 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-surface sm:min-w-[10.5rem]"
                            >
                                {content.secondaryButton.label}
                            </Link>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-muted-foreground">
                            {content.closingBadgeText}
                        </p>

                        <ul className="mt-6 grid gap-3 border-t border-border/80 pt-5 sm:grid-cols-3 sm:gap-6">
                            {trustPoints.map((point, index) => {
                                const Icon = trustIcons[index] ?? Settings2;
                                return (
                                    <li key={point} className="flex items-center gap-2 text-[0.82rem] font-semibold leading-6 text-secondary/76">
                                        <Icon className="size-4 shrink-0 text-primary" strokeWidth={1.7} aria-hidden="true" />
                                        {point}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {showHeroImage ? <HeroImage image={content.heroImage!} /> : <GrowthChart />}
                </div>
            </div>
        </section>
    );
}
