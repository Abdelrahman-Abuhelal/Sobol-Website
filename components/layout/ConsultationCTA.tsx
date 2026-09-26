import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fallbackSiteSettings } from "@/content/fallbacks";
import { controlledLinkHref } from "@/sanity/lib/links";
import type { CtaContent } from "@/sanity/lib/types";

export function ConsultationCTA({ content = fallbackSiteSettings.consultationCta }: { content?: CtaContent }) {
    return (
        <section className="relative isolate overflow-hidden bg-secondary py-16 text-secondary-foreground sm:py-20">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_30%,oklch(0.46_0.095_184/0.55),transparent_28rem)]" aria-hidden="true" />
            <div className="container-custom">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-bold text-primary-light">{content.eyebrow}</p>
                        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-secondary-foreground sm:text-4xl">
                            {content.heading}
                        </h2>
                    </div>
                    <Link
                        href={controlledLinkHref(content.link)}
                        className="inline-flex min-h-14 w-fit items-center justify-center rounded-xl bg-primary-light px-7 text-base font-bold text-secondary shadow-[0_14px_34px_oklch(0.15_0.04_230/0.24)] transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.84_0.07_178)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-4 focus-visible:ring-offset-secondary"
                    >
                        {content.link.label}
                        <ArrowLeft className="me-3 size-5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
