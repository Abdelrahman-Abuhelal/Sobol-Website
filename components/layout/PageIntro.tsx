import Image from "next/image";
import { editorialImageUrl } from "@/sanity/lib/image";
import type { PageIntroData } from "@/sanity/lib/types";

export function PageIntro({ eyebrow, heading, description, image }: PageIntroData) {
    const imageSrc = editorialImageUrl(image, 1600);
    return (
        <section className="relative isolate overflow-hidden border-b border-border/70 bg-surface-muted py-[clamp(4.5rem,8vw,7rem)]">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_15%,oklch(0.88_0.07_176/0.55),transparent_32rem),radial-gradient(circle_at_8%_90%,oklch(0.91_0.035_82/0.62),transparent_29rem)]" aria-hidden="true" />
            <div className="absolute inset-y-0 right-[7%] -z-10 w-px bg-primary/12" aria-hidden="true" />

            <div className={imageSrc ? "container-custom max-w-[93rem]" : "container-custom"}>
                <div className={imageSrc ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-16" : ""}>
                <div className="min-w-0 max-w-[52rem]">
                    <p className="mb-5 flex items-center gap-3 text-sm font-bold text-primary sm:text-[0.95rem]">
                        <span className="h-px w-9 bg-primary" aria-hidden="true" />
                        {eyebrow}
                    </p>
                    <h1 className={`${imageSrc ? "text-[clamp(2.15rem,3.5vw,3.5rem)]" : "text-[clamp(2.35rem,5vw,4.5rem)]"} font-extrabold text-secondary`}>
                        {heading}
                    </h1>
                    <p className="mt-7 max-w-[43rem] text-lg font-normal leading-9 text-muted-foreground sm:text-xl sm:leading-10">
                        {description}
                    </p>
                </div>

                {imageSrc && (
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[34rem] lg:max-w-[48rem]">
                        <div className="absolute -inset-4 -z-10 rounded-[38%_62%_54%_46%/46%_42%_58%_54%] bg-primary-soft/60 blur-2xl" aria-hidden="true" />
                        <div className="absolute -bottom-4 -start-4 -z-10 size-28 rounded-full bg-surface-warm/85" aria-hidden="true" />
                        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-surface/90 bg-surface shadow-[0_28px_70px_oklch(0.255_0.055_232/0.12)]">
                            <Image
                                src={imageSrc}
                                alt={image?.alt || ""}
                                fill
                                priority
                                sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 544px, (max-width: 1279px) calc((100vw - 120px) / 2), (max-width: 1487px) calc((100vw - 144px) / 2), 672px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}
                </div>
            </div>
        </section>
    );
}
