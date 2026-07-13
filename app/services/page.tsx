import type { LucideIcon } from "lucide-react";
import { Check, Palette, Share2, Megaphone, PenTool, Layout, Target } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/layout/PageIntro";
import { ConsultationCTA } from "@/components/layout/ConsultationCTA";

const packages = [
    {
        number: "01",
        title: "ترتيب البيت الداخلي",
        label: "للمشاريع التي تحتاج إلى التنظيم",
        description: "ننقل العمل من الاجتهاد الفردي إلى منظومة إدارية ومالية واضحة يمكن للفريق الاعتماد عليها.",
        items: ["تنظيم الأدوار والمهام", "ضبط الإجراءات والسياسات", "بناء نظام إداري ومالي", "أتمتة العمليات الأساسية"],
    },
    {
        number: "02",
        title: "إطفاء الحرائق",
        label: "للتحديات العاجلة",
        description: "نستعيد التوازن المالي والتشغيلي ونبني رؤية واضحة تساعدك على اتخاذ القرار بسرعة.",
        items: ["معالجة التدفق النقدي", "إدارة الالتزامات المالية", "تنظيم العمليات اليومية", "تحديد أولويات الإنقاذ"],
    },
    {
        number: "03",
        title: "النمو والتوسع",
        label: "للمشاريع الجاهزة للمرحلة التالية",
        description: "نحوّل فرص السوق إلى خطة نمو تربط التسويق والمبيعات والكفاءة التشغيلية بأهداف قابلة للقياس.",
        items: ["تطوير التسويق والمبيعات", "تحديد فرص النمو", "تحسين الكفاءة التشغيلية", "بناء أدوات قياس الأداء"],
    },
];

const marketingServices: Array<{ icon: LucideIcon; title: string; description: string }> = [
    { icon: Palette, title: "الهوية البصرية", description: "هوية تعبّر عن شخصية مشروعك بوضوح." },
    { icon: Share2, title: "إدارة التواصل الاجتماعي", description: "حضور منظم ومحتوى متسق مع أهدافك." },
    { icon: Megaphone, title: "الحملات الممولة", description: "حملات مخططة للوصول والنتائج." },
    { icon: PenTool, title: "كتابة المحتوى", description: "محتوى يبني الثقة ويشرح القيمة." },
    { icon: Layout, title: "التصميم الجرافيكي", description: "مواد بصرية تخدم رسالتك التسويقية." },
    { icon: Target, title: "الخطط الاستراتيجية", description: "اتجاه تسويقي مبني على فهم السوق." },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <PageIntro
                eyebrow="خدماتنا"
                title="الحل المناسب لمرحلة مشروعك."
                description="نبدأ من التحدي الحقيقي، ثم نختار نطاق العمل الذي يعيد التنظيم أو يعالج الخلل أو يفتح مساحة للنمو."
                image={{
                    src: "/images/page-intros/services.webp",
                    alt: "فريق يشخّص هيكل العمل ويبني الحل المناسب",
                }}
            />

            <section className="py-16 sm:py-20 lg:py-24">
                <div className="container-custom">
                    <div className="mb-12 grid gap-5 lg:grid-cols-2 lg:items-end">
                        <div>
                            <p className="text-sm font-bold text-primary">تطوير الأعمال</p>
                            <h2 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">ثلاثة مسارات، حسب الأولوية.</h2>
                        </div>
                        <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
                            يمكن البدء بمسار واحد أو دمج أكثر من مسار بعد التشخيص الأولي.
                        </p>
                    </div>

                    <div className="border-t border-[oklch(0.86_0.025_190)]">
                        {packages.map((service) => (
                            <article
                                key={service.number}
                                className="grid gap-7 border-b border-[oklch(0.86_0.025_190)] py-10 lg:grid-cols-[6rem_0.8fr_1.2fr] lg:gap-10 lg:py-12"
                            >
                                <span className="text-sm font-black tracking-wider text-primary/70">{service.number}</span>
                                <div>
                                    <p className="text-sm font-bold text-primary">{service.label}</p>
                                    <h3 className="mt-2 text-2xl font-black text-secondary sm:text-3xl">{service.title}</h3>
                                    <p className="mt-4 max-w-lg leading-7 text-muted-foreground">{service.description}</p>
                                </div>
                                <ul className="grid content-start gap-x-8 sm:grid-cols-2">
                                    {service.items.map((item) => (
                                        <li key={item} className="flex items-center gap-3 border-b border-[oklch(0.91_0.015_190)] py-3 text-sm font-bold text-secondary sm:text-base">
                                            <Check className="size-4 shrink-0 text-primary" strokeWidth={2.2} aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[oklch(0.975_0.01_180)] py-16 sm:py-20 lg:py-24">
                <div className="container-custom">
                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
                        <div>
                            <p className="text-sm font-bold text-primary">الخدمات التسويقية</p>
                            <h2 className="mt-3 text-3xl font-black leading-tight text-secondary sm:text-4xl">
                                حضور يخدم استراتيجية العمل.
                            </h2>
                            <p className="mt-5 leading-7 text-muted-foreground">
                                نربط كل مخرج تسويقي بهدف واضح، من الهوية وحتى الحملات.
                            </p>
                        </div>
                        <div className="grid border-t border-[oklch(0.86_0.025_190)] sm:grid-cols-2">
                            {marketingServices.map((service, index) => (
                                <div
                                    key={service.title}
                                    className={`flex gap-4 border-b border-[oklch(0.86_0.025_190)] py-5 ${index % 2 === 1 ? "sm:border-s sm:ps-7" : "sm:pe-7"}`}
                                >
                                    <service.icon className="mt-1 size-5 shrink-0 text-primary" strokeWidth={1.7} aria-hidden="true" />
                                    <div>
                                        <h3 className="font-black text-secondary">{service.title}</h3>
                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ConsultationCTA />
            <Footer />
        </main>
    );
}
