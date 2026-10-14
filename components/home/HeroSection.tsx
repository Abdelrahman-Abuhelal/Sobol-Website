import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageIntro } from "@/components/layout/PageIntro";
import { fallbackHomePage } from "@/content/fallbacks";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { HomeHeroSection } from "@/sanity/lib/types";

function GrowthChart() {
    return (
        <div className="h-full w-full p-6 sm:p-8">
            <svg
                viewBox="0 0 360 210"
                className="h-full w-full"
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
    );
}

export function HeroSection({ content = fallbackHomePage.hero }: { content?: HomeHeroSection }) {
    return (
        <PageIntro
            headingId="hero-title"
            heading={`${content.titleLineOne} ${content.titleLineTwo}`}
            description={content.description}
            image={content.heroVisualType === "image" ? content.heroImage : undefined}
            visual={<GrowthChart />}
            actions={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
            }
        />
    );
}
