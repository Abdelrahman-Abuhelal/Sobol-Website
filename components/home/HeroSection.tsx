import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

            <div className="overflow-hidden rounded-[2rem] border border-[oklch(0.84_0.025_190)] bg-[oklch(0.992_0.006_175)] shadow-[0_24px_70px_oklch(0.36_0.055_210/0.11)]">
                <div className="px-6 pb-5 pt-7 sm:px-8 sm:pb-6 sm:pt-8">
                    <figcaption id="journey-title" className="text-2xl font-black text-secondary sm:text-[1.7rem]">
                        مسار العمل مع سُبُل
                    </figcaption>
                    <p id="journey-description" className="mt-2 max-w-[28rem] text-sm leading-6 text-secondary/60">
                        منهج واضح ينقل التحديات من الفهم إلى التقدّم المنظّم.
                    </p>
                </div>

                <div className="px-4 pb-1 sm:px-6">
                    <ol className="flex flex-col gap-3 py-1" aria-label="مراحل مسار العمل">
                        {journey.map((item) => (
                            <li
                                key={item.step}
                                className={`journey-stage flex min-h-[4.5rem] items-center gap-2.5 rounded-[1.15rem] border px-4 py-3 pr-12 shadow-[0_10px_26px_oklch(0.36_0.055_210/0.06)] sm:min-h-20 sm:gap-3 sm:px-5 ${
                                    item.step === "01"
                                        ? "ml-auto w-[72%] border-[oklch(0.84_0.025_190)] bg-[linear-gradient(100deg,oklch(0.965_0.02_174),oklch(0.995_0.004_175))] text-secondary"
                                        : item.step === "02"
                                          ? "ml-auto mr-[8%] w-[80%] border-[oklch(0.8_0.035_186)] bg-[linear-gradient(100deg,oklch(0.89_0.045_176),oklch(0.955_0.026_174))] text-secondary"
                                          : "ml-auto mr-[16%] w-[84%] border-[oklch(0.43_0.07_187)] bg-[linear-gradient(100deg,oklch(0.42_0.075_187),oklch(0.5_0.085_187))] text-primary-foreground shadow-[0_14px_32px_oklch(0.42_0.075_187/0.18)]"
                                }`}
                            >
                                <span className={`hidden w-7 shrink-0 text-xs font-black tracking-wider sm:block ${item.step === "03" ? "text-primary-foreground/75" : "text-primary/75"}`}>
                                    {item.step}
                                </span>
                                <span className={`hidden h-6 w-px shrink-0 sm:block ${item.step === "03" ? "bg-primary-foreground/25" : "bg-primary/20"}`} aria-hidden="true" />
                                <p className="text-base font-black leading-6 sm:text-lg">{item.title}</p>
                                <span className="sr-only">{item.description}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="flex justify-end px-6 pb-7 pt-5 sm:px-8 sm:pb-8">
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.84_0.03_185)] bg-[oklch(0.965_0.022_174)] px-4 py-2 text-xs font-bold text-secondary/75">
                        <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                        من الفكرة إلى أثر قابل للقياس
                    </div>
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
