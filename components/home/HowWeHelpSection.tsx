import { ChartNoAxesCombined, Search, Workflow } from "lucide-react";
import type { HomeHeroSection } from "@/sanity/lib/types";

const stepIcons = [Search, Workflow, ChartNoAxesCombined] as const;

export function HowWeHelpSection({ content }: { content: HomeHeroSection }) {
    const steps = content.journeyStages.slice(0, 3);

    return (
        <section className="bg-surface py-[clamp(4.5rem,8vw,7rem)]" aria-labelledby="how-we-help-title">
            <div className="container-custom">
                <div className="max-w-[46rem]">
                    <p className="text-sm font-bold text-primary">منهج العمل</p>
                    <h2
                        id="how-we-help-title"
                        className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.25] tracking-[-0.03em] text-secondary"
                    >
                        {content.journeyTitle}
                    </h2>
                    <p className="mt-4 max-w-[42rem] text-lg leading-9 text-muted-foreground">
                        {content.journeyDescription}
                    </p>
                </div>

                <ol className="relative mt-12 grid border-y border-border lg:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = stepIcons[index] ?? Search;
                        const number = String(index + 1).padStart(2, "0");
                        return (
                            <li
                                key={step._key}
                                className="relative px-1 py-8 sm:px-7 lg:min-h-[18rem] lg:border-s lg:border-border lg:px-8 lg:py-10 first:lg:border-s-0"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <span className="text-sm font-black tracking-[0.12em] text-primary/80">{number}</span>
                                    <Icon className="size-6 text-primary/75" strokeWidth={1.6} aria-hidden="true" />
                                </div>
                                <h3 className="mt-12 text-xl font-extrabold text-secondary sm:text-2xl">{step.title}</h3>
                                <p className="mt-3 max-w-sm text-base leading-8 text-muted-foreground">{step.description}</p>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
