import { ArrowUpLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/layout/PageIntro";
import { ConsultationCTA } from "@/components/layout/ConsultationCTA";

const projects = [
    { name: "الصوباني هوم بلس", category: "استشارات إدارية", result: "إعادة هيكلة مالية" },
    { name: "ميرفيلا للتطريز", category: "تسويق رقمي", result: "تطوير المبيعات عبر الإنترنت" },
    { name: "عيادات ألماس", category: "إدارة وتشغيل", result: "تنظيم الحجوزات والعمليات" },
    { name: "عيادات بريميوم", category: "تسويق", result: "بناء هوية بصرية متكاملة" },
    { name: "لمار كيك آند سويت", category: "استشارات مالية", result: "ضبط التكاليف والتدفق النقدي" },
    { name: "مكتب د. سناء طوطح", category: "تطوير أعمال", result: "تحسين بيئة العمل" },
    { name: "شركة أحبار الغريب", category: "استشارات", result: "بناء خطة نمو استراتيجية" },
];

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <PageIntro
                eyebrow="أعمالنا"
                title="العمل الجيد يظهر في النتيجة."
                description="نماذج من تحديات عملنا عليها مع مشاريع فلسطينية في الإدارة والتشغيل والمال والتسويق."
                image={{
                    src: "/images/page-intros/portfolio.webp",
                    alt: "مشروعات مكتملة مرتبة على درجات النجاح",
                }}
            />

            <section className="py-16 sm:py-20 lg:py-24">
                <div className="container-custom">
                    <div className="mb-12 grid gap-5 lg:grid-cols-2 lg:items-end">
                        <div>
                            <p className="text-sm font-bold text-primary">شركاء النجاح</p>
                            <h2 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">أثر عملي، في قطاعات مختلفة.</h2>
                        </div>
                        <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
                            تختلف نقطة البداية من مشروع لآخر، لكن الهدف واحد: وضوح أكبر وقدرة أفضل على العمل والنمو.
                        </p>
                    </div>

                    <div className="border-t border-[oklch(0.86_0.025_190)]">
                        {projects.map((project, index) => (
                            <article
                                key={project.name}
                                className="group grid gap-4 border-b border-[oklch(0.86_0.025_190)] py-6 transition-colors hover:bg-[oklch(0.975_0.012_178)] sm:grid-cols-[4rem_1fr_0.8fr_auto] sm:items-center sm:px-4"
                            >
                                <span className="text-xs font-black tracking-wider text-primary/65">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <p className="text-xs font-bold text-primary">{project.category}</p>
                                    <h3 className="mt-1 text-xl font-black text-secondary sm:text-2xl">{project.name}</h3>
                                </div>
                                <p className="text-sm font-bold text-[oklch(0.42_0.035_210)] sm:text-base">{project.result}</p>
                                <span className="hidden size-10 items-center justify-center rounded-full border border-[oklch(0.84_0.03_185)] text-primary transition-[background-color,color,transform] duration-300 group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground sm:flex">
                                    <ArrowUpLeft className="size-4" aria-hidden="true" />
                                </span>
                            </article>
                        ))}
                    </div>

                    <p className="mt-6 text-sm leading-6 text-muted-foreground">
                        تعرض النتائج بصياغة مختصرة احترامًا لخصوصية شركائنا ونطاق كل مشروع.
                    </p>
                </div>
            </section>

            <ConsultationCTA />
            <Footer />
        </main>
    );
}
