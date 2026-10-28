import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { fallbackHomePage } from "@/content/fallbacks";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { HomeHeroSection } from "@/sanity/lib/types";

const journeyPositions = [
    "right-[8%] top-[77%]",
    "right-[38%] top-[66%]",
    "left-[11%] top-[59%]",
];

export function HeroSection({ content = fallbackHomePage.hero }: { content?: HomeHeroSection }) {
    return (
        <section aria-labelledby="hero-title" className="overflow-hidden border-b border-border bg-background">
            <div className="container-custom grid items-center gap-10 py-14 lg:min-h-[620px] lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:py-20">
                <div className="min-w-0">
                    <p className="mb-5 flex items-center gap-3 text-xs font-semibold text-primary">
                        <span className="h-px w-7 bg-primary" aria-hidden="true" />
                        سُبُل لتطوير الأعمال · فلسطين
                    </p>
                    <h1 id="hero-title" className="text-[clamp(2.1rem,3.6vw,3.3rem)] font-extrabold text-secondary">
                        {content.titleLineOne}<br />
                        <span className="text-primary">{content.titleLineTwo}</span>
                    </h1>
                    <p className="mt-6 max-w-[32rem] text-[0.95rem] leading-8 text-muted-foreground sm:text-base sm:leading-9">
                        {content.description}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href={controlledLinkHref(content.primaryButton)} className="inline-flex min-h-14 items-center justify-center gap-5 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                            {content.primaryButton.label}
                            <ArrowLeft className="size-5" aria-hidden="true" />
                        </Link>
                        <Link href={controlledLinkHref(content.secondaryButton)} className="inline-flex min-h-14 items-center justify-center rounded-xl border border-border bg-surface/60 px-6 text-sm font-semibold text-secondary transition-colors hover:border-primary/60 hover:bg-primary-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                            {content.secondaryButton.label}
                        </Link>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
                        <span>استشارات إدارية ومالية</span>
                        <span className="h-3 w-px bg-border" aria-hidden="true" />
                        <span>تطوير العمليات والتسويق</span>
                    </div>
                </div>
                <div className="relative mx-auto aspect-[1.18] w-full max-w-[32.5rem]" role="img" aria-label="سُبُل لتطوير الأعمال، مسار واضح من فهم الواقع إلى تصميم الحل ثم التنفيذ والمتابعة">
                    <div className="absolute inset-x-5 inset-y-3 rounded-[28%_7%_28%_7%] bg-primary-soft" aria-hidden="true" />
                    <div className="absolute inset-x-[9%] top-[7%] flex items-center justify-center gap-1" aria-hidden="true">
                        <Image src="/logo_tr.png" alt="" width={192} height={192} priority sizes="(max-width: 639px) 34vw, 192px" className="h-auto w-[45%] max-w-48 object-contain" />
                        <div className="border-s border-primary/35 ps-4 sm:ps-5">
                            <p className="text-base font-bold text-secondary sm:text-lg">سُبُل</p>
                            <p className="mt-2 whitespace-nowrap text-[0.65rem] text-primary sm:text-xs">لتطوير الأعمال</p>
                        </div>
                    </div>
                    <svg viewBox="0 0 520 440" className="absolute inset-0 h-full w-full" aria-hidden="true">
                        <path d="M455 320C390 320 385 270 300 270S190 236 85 236" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" className="text-primary-light" />
                        <path d="M455 320C390 320 385 270 300 270S190 236 85 236" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" />
                        <path d="M96 227L84 236L96 245" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                        {[[437, 317], [285, 269], [120, 238]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="7" strokeWidth="4" className="fill-secondary stroke-primary-soft" />)}
                    </svg>
                    <div aria-hidden="true">
                        {content.journeyStages.slice(0, 3).map((stage, index) => (
                            <div key={stage._key} className={cn("absolute text-center", journeyPositions[index])}>
                                <p className="text-[0.6rem] text-primary">{String(index + 1).padStart(2, "0")}</p>
                                <p className="mt-1 text-[0.65rem] font-semibold text-secondary sm:text-xs">{stage.title}</p>
                            </div>
                        ))}
                    </div>
                    <p className="absolute inset-x-0 bottom-[7%] text-center text-[0.6rem] text-muted-foreground sm:text-[0.65rem]" aria-hidden="true">وضوح في القرار، ثبات في النمو.</p>
                </div>
            </div>
        </section>
    );
}
