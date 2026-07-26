import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fallbackSiteSettings } from "@/content/fallbacks";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { CtaContent } from "@/sanity/lib/types";

export function ConsultationCTA({ content = fallbackSiteSettings.consultationCta }: { content?: CtaContent }) {
    return (
        <section className="bg-[oklch(0.955_0.023_178)] py-14 sm:py-16">
            <div className="container-custom">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-bold text-primary">{content.eyebrow}</p>
                        <h2 className="mt-2 text-3xl font-black leading-tight text-secondary sm:text-4xl">
                            {content.heading}
                        </h2>
                    </div>
                    <Link
                        href={controlledLinkHref(content.link)}
                        className="inline-flex min-h-14 w-fit items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground shadow-[0_12px_30px_oklch(0.49_0.085_187/0.18)] transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.43_0.08_187)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                    >
                        {content.link.label}
                        <ArrowLeft className="me-3 size-5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
