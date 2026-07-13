import Link from "next/link";
import { ArrowLeft, ArrowUpLeft } from "lucide-react";

const journey = [
    {
        step: "01",
        title: "تشخيص واضح",
        description: "نفهم الواقع والتحديات",
    },
    {
        step: "02",
        title: "تنظيم عملي",
        description: "نحوّل الأولويات إلى خطة",
    },
    {
        step: "03",
        title: "نمو مستدام",
        description: "نقيس، نطوّر، ونتقدّم",
    },
];

function GrowthJourney() {
    return (
        <figure
            className="relative w-full max-w-[35rem]"
            aria-labelledby="journey-title"
            aria-describedby="journey-description"
        >
            <div className="absolute -inset-8 -z-10 rounded-[3.5rem] bg-[oklch(0.94_0.035_174/0.55)] blur-3xl" />

            <div className="overflow-hidden rounded-[2rem] border border-[oklch(0.86_0.025_190)] bg-[oklch(0.995_0.004_175)] shadow-[0_24px_70px_oklch(0.36_0.055_210/0.10)]">
                <div className="flex items-start justify-between gap-6 px-6 pb-3 pt-6 sm:px-8 sm:pt-7">
                    <div>
                        <p className="mb-1 text-sm font-medium text-primary">من الفكرة إلى الأثر</p>
                        <figcaption id="journey-title" className="text-xl font-bold text-secondary sm:text-2xl">
                            مسار العمل مع سُبُل
                        </figcaption>
                        <p id="journey-description" className="sr-only">
                            ثلاث مراحل تبدأ بالتشخيص، ثم التنظيم، وتنتهي بالنمو المستدام.
                        </p>
                    </div>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[oklch(0.93_0.045_175)] text-primary">
                        <ArrowUpLeft className="size-5" aria-hidden="true" />
                    </span>
                </div>

                <div className="px-5 pb-6 pt-3 sm:px-7 sm:pb-7">
                    <ol className="relative grid gap-3 sm:grid-cols-3 sm:items-center sm:gap-3 sm:py-10">
                        <span
                            className="absolute inset-x-14 top-1/2 hidden border-t border-dashed border-[oklch(0.66_0.055_185/0.55)] sm:block"
                            aria-hidden="true"
                        />
                        {journey.map((item) => (
                            <li
                                key={item.step}
                                className={`relative flex min-h-24 items-center gap-4 p-5 sm:aspect-square sm:min-h-0 sm:w-full sm:p-5 ${
                                    item.step === "01"
                                        ? "z-30 rounded-[1.4rem_3rem_3rem_3rem] border border-[oklch(0.78_0.035_190)] bg-[oklch(0.995_0.004_175)] text-secondary shadow-[0_12px_30px_oklch(0.36_0.055_210/0.07)] sm:translate-y-6"
                                        : item.step === "02"
                                          ? "z-20 rounded-[2.5rem_1.5rem_2.5rem_2.5rem] bg-accent text-secondary sm:translate-y-0"
                                          : "z-10 rounded-[3rem_3rem_3rem_1.3rem] bg-primary text-primary-foreground sm:-translate-y-6 sm:rounded-full"
                                }`}
                            >
                                <div>
                                    <span className={`block text-sm font-black tracking-wider ${item.step === "03" ? "text-primary-foreground/65" : "text-primary/70"}`}>
                                        {item.step}
                                    </span>
                                    <p className="mt-2 text-lg font-black leading-7">{item.title}</p>
                                    <p className={`mt-1 text-sm leading-5 ${item.step === "03" ? "text-primary-foreground/80" : "text-secondary/65"}`}>
                                        {item.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </figure>
    );
}

export function HeroSection() {
    return (
        <section
            className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[oklch(0.982_0.008_178)] py-14 sm:py-18 lg:py-20"
            aria-labelledby="hero-title"
        >
            <div
                className="absolute -right-40 top-10 -z-10 size-[32rem] rounded-full bg-[oklch(0.93_0.04_174/0.6)] blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-64 -left-40 -z-10 size-[38rem] rounded-full bg-[oklch(0.93_0.025_225/0.5)] blur-3xl"
                aria-hidden="true"
            />

            <div className="container-custom w-full">
                <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(29rem,0.9fr)] lg:gap-16 xl:gap-24">
                    <div className="max-w-[42rem]">
                        <p className="mb-8 flex items-center gap-3 text-sm font-bold text-primary sm:mb-10 sm:text-base">
                            <span className="h-px w-9 bg-primary" aria-hidden="true" />
                            استشارات إدارية وتسويقية للشركات الطموحة
                        </p>

                        <h1
                            id="hero-title"
                            className="text-[clamp(2.65rem,6vw,5.35rem)] font-black leading-[1.08] tracking-[-0.035em] text-secondary"
                        >
                            نرتّب أعمالك اليوم،
                            <span className="mt-2 block text-primary">لتنمو بثقة غدًا.</span>
                        </h1>

                        <p className="mt-7 max-w-[39rem] text-lg leading-8 text-[oklch(0.42_0.035_210)] sm:text-xl sm:leading-9">
                            تساعدك سُبُل على تنظيم العمليات، معالجة التحديات، وبناء نمو مستدام يناسب واقع السوق الفلسطيني.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                            <Link
                                href="/contact"
                                className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-[oklch(0.985_0.006_175)] shadow-[0_12px_30px_oklch(0.49_0.085_187/0.2)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.43_0.08_187)] hover:shadow-[0_16px_35px_oklch(0.49_0.085_187/0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(0.982_0.008_178)]"
                            >
                                اطلب استشارة
                                <ArrowLeft className="me-3 size-5" aria-hidden="true" />
                            </Link>

                            <Link
                                href="/services"
                                className="inline-flex min-h-12 items-center font-bold text-secondary underline decoration-[oklch(0.72_0.06_183)] decoration-2 underline-offset-8 transition-colors hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                            >
                                تعرّف على خدماتنا
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <GrowthJourney />
                    </div>
                </div>
            </div>
        </section>
    );
}
