import { Check, Heart, Target } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/layout/PageIntro";
import { ConsultationCTA } from "@/components/layout/ConsultationCTA";

const principles = [
    "حلول قابلة للتطبيق، لا توصيات نظرية",
    "فهم عميق للسوق والسياق الفلسطيني",
    "مرافقة من التشخيص حتى الإنجاز",
    "قرارات أوضح وعمليات أكثر استقرارًا",
];

const team = [
    { name: "م. إسلام وراد", role: "مؤسس الشركة", initials: "إو" },
    { name: "م. بشار أبو هلال", role: "مؤسس الشركة", initials: "به" },
    { name: "أ. علاء بكر", role: "مدير التسويق الإلكتروني", initials: "عب" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <PageIntro
                eyebrow="من نحن"
                title="شريك يفهم العمل من الداخل."
                description="سُبُل شركة استشارات فلسطينية تساعد المشاريع الصغيرة والمتوسطة على تحويل التحديات اليومية إلى عمل منظم وقرارات أوضح."
                image={{
                    src: "/images/page-intros/about.webp",
                    alt: "مستشاران يرتبان أجزاء العمل معًا",
                }}
            />

            <section className="py-16 sm:py-20 lg:py-24">
                <div className="container-custom">
                    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                        <div>
                            <p className="text-sm font-bold text-primary">طريقتنا</p>
                            <h2 className="mt-3 text-3xl font-black leading-tight text-secondary sm:text-4xl">
                                نبدأ من الواقع، ثم نبني ما يمكن تنفيذه.
                            </h2>
                        </div>
                        <div className="space-y-6 text-lg leading-8 text-[oklch(0.42_0.035_210)]">
                            <p>
                                نخدم مشاريع القطاع الخاص الفلسطيني، وبشكل خاص الشركات العائلية التي تحتاج إلى تنظيم إداري ومالي وتشغيلي وتسويقي يناسب مرحلتها.
                            </p>
                            <p>
                                لا نقدّم قالبًا جاهزًا. نفهم المشكلة، نحدد الأولويات، ثم نعمل مع الفريق على حلول عملية قابلة للقياس والاستمرار.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 grid border-y border-[oklch(0.88_0.02_190)] md:grid-cols-2">
                        <div className="py-8 md:pe-10">
                            <Target className="size-7 text-primary" strokeWidth={1.7} aria-hidden="true" />
                            <h3 className="mt-5 text-2xl font-black text-secondary">رسالتنا</h3>
                            <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                                تمكين المشاريع من بناء منظومات عمل مستقرة تعزز كفاءتها وقدرتها على النمو.
                            </p>
                        </div>
                        <div className="border-t border-[oklch(0.88_0.02_190)] py-8 md:border-s md:border-t-0 md:ps-10">
                            <Heart className="size-7 text-primary" strokeWidth={1.7} aria-hidden="true" />
                            <h3 className="mt-5 text-2xl font-black text-secondary">رؤيتنا</h3>
                            <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                                أن نكون الشريك الأول لتطوير المشاريع الصغيرة والمتوسطة في فلسطين.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[oklch(0.975_0.01_180)] py-16 sm:py-20">
                <div className="container-custom grid gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="text-sm font-bold text-primary">ما يميز سُبُل</p>
                        <h2 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">خبرة قريبة من مشروعك.</h2>
                    </div>
                    <ul className="divide-y divide-[oklch(0.88_0.02_190)] border-y border-[oklch(0.88_0.02_190)]">
                        {principles.map((principle) => (
                            <li key={principle} className="flex items-center gap-4 py-4 text-base font-bold text-secondary sm:text-lg">
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                                    <Check className="size-4" strokeWidth={2.2} aria-hidden="true" />
                                </span>
                                {principle}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-16 sm:py-20 lg:py-24">
                <div className="container-custom">
                    <div className="mb-10 max-w-2xl">
                        <p className="text-sm font-bold text-primary">فريق العمل</p>
                        <h2 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">قيادة بخبرة متكاملة.</h2>
                    </div>
                    <div className="grid border-y border-[oklch(0.88_0.02_190)] md:grid-cols-3">
                        {team.map((member, index) => (
                            <div
                                key={member.name}
                                className={`flex items-center gap-4 py-6 ${index > 0 ? "border-t border-[oklch(0.88_0.02_190)] md:border-s md:border-t-0 md:px-7" : "md:pe-7"}`}
                            >
                                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-black text-primary">
                                    {member.initials}
                                </span>
                                <div>
                                    <h3 className="text-lg font-black text-secondary">{member.name}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ConsultationCTA />
            <Footer />
        </main>
    );
}
