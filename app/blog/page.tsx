import { ArrowLeft, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/layout/PageIntro";

const topics = [
    "تنظيم العمل داخل الشركات العائلية",
    "قراءة التدفق النقدي واتخاذ القرار",
    "الانتقال من الإدارة اليومية إلى النمو",
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <PageIntro
                eyebrow="المدونة"
                title="معرفة عملية لأصحاب المشاريع."
                description="محتوى إداري ومالي وتسويقي يساعدك على فهم التحديات واتخاذ قرارات أفضل داخل مشروعك."
                image={{
                    src: "/images/page-intros/blog.webp",
                    alt: "كتاب مفتوح تخرج منه أفكار عملية ومنظمة",
                }}
            />

            <section className="py-16 sm:py-20 lg:py-24">
                <div className="container-custom">
                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
                        <div>
                            <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                                <BookOpen className="size-5" strokeWidth={1.8} aria-hidden="true" />
                            </span>
                            <p className="mt-6 text-sm font-bold text-primary">قيد الإعداد</p>
                            <h2 className="mt-3 text-3xl font-black leading-tight text-secondary sm:text-4xl">
                                نكتب ما يمكن استخدامه، لا ما يملأ الصفحة.
                            </h2>
                            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                                نعمل على أول مجموعة من المقالات. حتى ذلك الوقت، يمكنك مراسلتنا بسؤالك وسنساعدك على تحديد نقطة البداية.
                            </p>
                            <a
                                href="mailto:info@sobol.ps?subject=%D8%B3%D8%A4%D8%A7%D9%84%20%D9%84%D9%81%D8%B1%D9%8A%D9%82%20%D8%B3%D9%8F%D8%A8%D9%8F%D9%84"
                                className="mt-7 inline-flex min-h-12 items-center font-bold text-secondary underline decoration-[oklch(0.72_0.06_183)] decoration-2 underline-offset-8 transition-colors hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                            >
                                أرسل سؤالك للفريق
                                <ArrowLeft className="me-3 size-4" aria-hidden="true" />
                            </a>
                        </div>

                        <div className="border-t border-[oklch(0.86_0.025_190)]">
                            <p className="py-4 text-xs font-black tracking-wider text-primary/70">موضوعات نعمل عليها</p>
                            {topics.map((topic, index) => (
                                <div key={topic} className="grid grid-cols-[3rem_1fr] items-center border-t border-[oklch(0.9_0.018_190)] py-6">
                                    <span className="text-xs font-black text-primary/60">{String(index + 1).padStart(2, "0")}</span>
                                    <h3 className="text-lg font-black text-secondary sm:text-xl">{topic}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
