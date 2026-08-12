import { ChartNoAxesCombined, Search, Workflow } from "lucide-react";
import type { HomeHeroSection } from "@/sanity/lib/types";

const stepIcons = [Search, Workflow, ChartNoAxesCombined] as const;

const stepStyles = [
    {
        card: "border-[oklch(0.85_0.028_185)] bg-[oklch(0.965_0.024_178)]",
        number: "text-primary",
        icon: "text-primary/65",
        title: "text-secondary",
        description: "text-secondary/65",
    },
    {
        card: "border-[oklch(0.75_0.045_185)] bg-[oklch(0.9_0.052_180)]",
        number: "text-primary",
        icon: "text-primary/75",
        title: "text-secondary",
        description: "text-secondary/70",
    },
    {
        card: "border-primary bg-primary",
        number: "text-primary-foreground/75",
        icon: "text-primary-foreground/70",
        title: "text-primary-foreground",
        description: "text-primary-foreground/78",
    },
] as const;

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
                        const style = stepStyles[index] ?? stepStyles[0];
                        const number = String(index + 1).padStart(2, "0");
                        return (
                            <li
                                key={step._key}
                                className={`relative overflow-hidden rounded-[1.4rem] border p-6 shadow-[0_14px_40px_oklch(0.29_0.055_235/0.055)] sm:p-7 ${style.card}`}
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <span className={`text-sm font-black tracking-[0.12em] ${style.number}`}>{number}</span>
                                    <Icon className={`size-6 ${style.icon}`} strokeWidth={1.6} aria-hidden="true" />
                                </div>
                                <h3 className={`mt-10 text-xl font-black sm:text-2xl ${style.title}`}>{step.title}</h3>
                                <p className={`mt-3 text-base leading-7 ${style.description}`}>{step.description}</p>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
