import Image from "next/image";

interface PageIntroProps {
    eyebrow: string;
    title: string;
    description: string;
    image?: {
        src: string;
        alt: string;
    };
}

export function PageIntro({ eyebrow, title, description, image }: PageIntroProps) {
    return (
        <section className="relative isolate overflow-hidden bg-[oklch(0.982_0.008_178)] py-16 sm:py-20 lg:py-24">
            <div className="absolute -right-48 -top-56 -z-10 size-[34rem] rounded-full bg-[oklch(0.93_0.04_174/0.65)] blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-72 -left-52 -z-10 size-[36rem] rounded-full bg-[oklch(0.94_0.025_225/0.5)] blur-3xl" aria-hidden="true" />

            <div className="container-custom">
                <div className={image ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-20" : ""}>
                <div className="max-w-[52rem]">
                    <p className="mb-5 flex items-center gap-3 text-sm font-bold text-primary sm:text-base">
                        <span className="h-px w-9 bg-primary" aria-hidden="true" />
                        {eyebrow}
                    </p>
                    <h1 className="text-[clamp(2.7rem,6vw,5.6rem)] font-black leading-[1.08] tracking-[-0.035em] text-secondary">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-[43rem] text-lg leading-8 text-[oklch(0.42_0.035_210)] sm:text-xl sm:leading-9">
                        {description}
                    </p>
                </div>

                {image && (
                    <div className="relative mx-auto aspect-square w-full max-w-[25rem] lg:max-w-[28rem]" aria-hidden="true">
                        <div className="absolute inset-[12%] rounded-full bg-[oklch(0.93_0.04_174/0.45)] blur-3xl" />
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            priority
                            sizes="(max-width: 1024px) 400px, 448px"
                            className="relative object-contain mix-blend-multiply"
                        />
                    </div>
                )}
                </div>
            </div>
        </section>
    );
}
