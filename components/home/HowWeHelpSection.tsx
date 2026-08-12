import { ChartNoAxesCombined, Search, Workflow } from "lucide-react";
import type { HomeHeroSection } from "@/sanity/lib/types";

const stepIcons = [Search, Workflow, ChartNoAxesCombined] as const;

export function HowWeHelpSection({ content }: { content: HomeHeroSection }) {
    const steps = content.journeyStages.slice(0, 3);

    return (
        <section className="bg-background py-[clamp(4.5rem,8vw,7rem)]" aria-labelledby="how-we-help-title">
            <div className="container-custom">
                <div className="max-w-[46rem]">
                    <p className="text-sm font-bold text-primary">منهج العمل</p>
                    <h2
                        id="how-we-help-title"
                        className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.2] tracking-[-0.025em] text-secondary"
                    >
                        {content.journeyTitle}
                    </h2>
                    <p className="mt-4 max-w-[42rem] text-lg leading-8 text-secondary/62">
                        {content.journeyDescription}
                    </p>
                </div>

                <ol className="relative mt-10 grid gap-4 lg:grid-cols-3 lg:gap-5">
                    {steps.map((step, index) => {
                        const Icon = stepIcons[index] ?? Search;
                        const number = String(index + 1).padStart(2, "0");
                        return (
                            <li
                                key={step._key}
                                className="relative overflow-hidden rounded-[1.4rem] border border-primary bg-primary p-6 shadow-[0_14px_40px_oklch(0.29_0.055_235/0.055)] sm:p-7"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <span className="text-sm font-black tracking-[0.12em] text-primary-foreground/75">{number}</span>
                                    <Icon className="size-6 text-primary-foreground/70" strokeWidth={1.6} aria-hidden="true" />
                                </div>
                                <h3 className="mt-10 text-xl font-black text-primary-foreground sm:text-2xl">{step.title}</h3>
                                <p className="mt-3 text-base leading-7 text-primary-foreground/78">{step.description}</p>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
