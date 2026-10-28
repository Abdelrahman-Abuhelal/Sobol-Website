import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { editorialImageUrl } from "@/sanity/lib/image";
import type { EditorialImage, PageIntroData } from "@/sanity/lib/types";

type PageIntroProps = Omit<PageIntroData, "eyebrow"> & {
    eyebrow?: string;
    headingId?: string;
    actions?: ReactNode;
    visual?: ReactNode;
    fallbackImage?: EditorialImage;
};

export function PageIntro({ eyebrow, heading, description, image, headingId, actions, visual, fallbackImage }: PageIntroProps) {
    const primaryImageSrc = editorialImageUrl(image, 1600);
    const imageSrc = primaryImageSrc || editorialImageUrl(fallbackImage, 1600);
    const imageAlt = primaryImageSrc ? image?.alt : fallbackImage?.alt;
    const hasVisual = Boolean(imageSrc || visual);
    return (
        <section aria-labelledby={headingId} className="relative isolate overflow-hidden border-b border-border bg-background py-14 lg:py-20">
            <div className="container-custom">
                <div className={hasVisual ? "grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16" : ""}>
                <div className="min-w-0 max-w-[52rem]">
                    {eyebrow && <p className="mb-5 flex items-center gap-3 text-xs font-semibold text-primary">
                        <span className="h-px w-7 bg-primary" aria-hidden="true" />
                        سُبُل · {eyebrow}
                    </p>}
                    <h1 id={headingId} className={cn("font-extrabold text-secondary", hasVisual ? "text-[clamp(2.1rem,3.6vw,3.3rem)]" : "text-[clamp(2.1rem,4.5vw,3.75rem)]")}>
                        {heading}
                    </h1>
                    <p className="mt-6 max-w-[32rem] text-base font-normal leading-9 text-muted-foreground">
                        {description}
                    </p>
                    {actions && <div className="mt-8">{actions}</div>}
                </div>

                {hasVisual && (
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[32.5rem]">
                        <div className="absolute inset-0 overflow-hidden rounded-[22%_7%_22%_7%] border border-border/50 bg-primary-soft">
                            {imageSrc ? <Image
                                src={imageSrc}
                                alt={imageAlt || ""}
                                fill
                                priority
                                sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 520px, (max-width: 1279px) 44vw, 520px"
                                className="object-cover"
                            /> : visual}
                        </div>
                    </div>
                )}
                </div>
            </div>
        </section>
    );
}
