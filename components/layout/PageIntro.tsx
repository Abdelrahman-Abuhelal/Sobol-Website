import Image from "next/image";
import { editorialImageUrl } from "@/sanity/lib/image";
import type { PageIntroData } from "@/sanity/lib/types";

export function PageIntro({ eyebrow, heading, description, image }: PageIntroData) {
    const imageSrc = editorialImageUrl(image, 1280);
    return (
        <section className="relative isolate overflow-hidden border-b border-border/70 bg-surface-muted py-[clamp(4.5rem,8vw,7rem)]">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_15%,oklch(0.88_0.07_176/0.55),transparent_32rem),radial-gradient(circle_at_8%_90%,oklch(0.91_0.035_82/0.62),transparent_29rem)]" aria-hidden="true" />
            <div className="absolute inset-y-0 right-[7%] -z-10 w-px bg-primary/12" aria-hidden="true" />

            <div className="container-custom">
                <div className={imageSrc ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-20" : ""}>
                <div className="max-w-[52rem]">
                    <p className="mb-5 flex items-center gap-3 text-sm font-bold text-primary sm:text-[0.95rem]">
                        <span className="h-px w-9 bg-primary" aria-hidden="true" />
                        {eyebrow}
                    </p>
                    <h1 className="text-[clamp(2.65rem,6vw,5.35rem)] font-extrabold leading-[1.13] tracking-[-0.04em] text-secondary">
                        {heading}
                    </h1>
                    <p className="mt-7 max-w-[43rem] text-lg font-normal leading-9 text-muted-foreground sm:text-xl sm:leading-10">
                        {description}
                    </p>
                </div>

                {imageSrc && (
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[27rem] lg:max-w-[31rem]">
                        <div className="absolute -inset-4 -z-10 rounded-[38%_62%_54%_46%/46%_42%_58%_54%] bg-primary-soft/60 blur-2xl" aria-hidden="true" />
                        <div className="absolute -bottom-4 -start-4 -z-10 size-28 rounded-full bg-surface-warm/85" aria-hidden="true" />
                        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-surface/90 bg-surface shadow-[0_28px_70px_oklch(0.255_0.055_232/0.12)]">
                            <Image
                                src={imageSrc}
                                alt={image?.alt || ""}
                                fill
                                priority
                                sizes="(max-width: 1024px) 400px, 448px"
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}
                </div>
            </div>
        </section>
    );
}
