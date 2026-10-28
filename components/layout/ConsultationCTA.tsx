import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fallbackSiteSettings } from "@/content/fallbacks";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { CtaContent } from "@/sanity/lib/types";

export function ConsultationCTA({ content = fallbackSiteSettings.consultationCta }: { content?: CtaContent }) {
    return (
        <section className="relative isolate overflow-hidden border-y border-border bg-primary-soft py-16 text-secondary sm:py-20">
            <div className="container-custom">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold text-primary">{content.eyebrow}</p>
                        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-secondary sm:text-4xl">
                            {content.heading}
                        </h2>
                    </div>
                    <Link
                        href={controlledLinkHref(content.link)}
                        className="inline-flex min-h-14 w-fit items-center justify-center rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-primary-soft"
                    >
                        {content.link.label}
                        <ArrowLeft className="me-3 size-5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
