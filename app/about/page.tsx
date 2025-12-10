import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Target, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">من نحن</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        تعرف على شركة سُبُل، قصتنا، رؤيتنا، وفريقنا الذي يعمل بشغف لنجاحك.
                    </p>
                </div>
            </section>

            {/* Story & Info */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto space-y-12">

                        {/* Who is Sobol */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-secondary">من هي شركة سُبُل؟</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                سُبُل هي شركة استشارات إدارية ناشئة في فلسطين، متخصصة في دعم المشاريع الصغيرة والمتوسطة،
                                وخاصة الشركات العائلية. نقدّم حلولاً عملية ترفع الكفاءة، تقلل التكاليف، وتحقق نتائج واضحة
                                تستند إلى واقع العملاء وبيئتهم المحلية.
                            </p>
                        </div>

                        {/* Mission & Vision Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 bg-primary/5 rounded-2xl border border-primary/10">
                                <Target className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3 text-secondary">رسالتنا</h3>
                                <p className="text-muted-foreground">
                                    تمكين المشاريع من تحقيق استقرار إداري ومالي وتشغيلي، وبناء منظومات عمل مؤسسية
                                    تسهم في تطوير الأعمال وتعزيز فرص النمو.
                                </p>
                            </div>
                            <div className="p-8 bg-secondary/5 rounded-2xl border border-secondary/10">
                                <Heart className="w-10 h-10 text-secondary mb-4" />
                                <h3 className="text-2xl font-bold mb-3 text-secondary">رؤيتنا</h3>
                                <p className="text-muted-foreground">
                                    أن نكون الشريك الأول في فلسطين لتطوير المشاريع الصغيرة والمتوسطة، عبر حلول واقعية
                                    تُثري بيئة الأعمال وتمنح أصحاب المشاريع القدرة على اتخاذ قرارات مدروسة.
                                </p>
                            </div>
                        </div>

                        {/* Why Choose Sobol */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-secondary">لماذا تختار سُبُل؟</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "حلول عملية قابلة للتطبيق",
                                    "فريق متخصص بخبرة في التطوير الإداري",
                                    "فهم عميق للسياق الفلسطيني",
                                    "نتائج ملموسة بعيداً عن التنظير",
                                    "مرافقة حقيقية من التشخيص حتى الإنجاز",
                                    "تركيز على الشركات العائلية"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                                        <span className="text-secondary font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">فريق سُبُل</h2>
                        <p className="text-muted-foreground mt-4">نخبة من الخبراء بقيادة مؤسسية قوية</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { name: "م. إسلام وراد", role: "مؤسس الشركة" },
                            { name: "م. بشار أبو هلال", role: "مؤسس الشركة" },
                            { name: "أ. علاء بكر", role: "مدير التسويق الإلكتروني" },
                        ].map((member, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border text-center group hover:-translate-y-1 transition-transform">
                                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-gray-400">
                                    {/* Avatar Placeholder */}
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                                <p className="text-primary font-medium mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
