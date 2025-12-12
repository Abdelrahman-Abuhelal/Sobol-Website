import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Target, Heart, Sparkles, Users, Award } from "lucide-react";

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

            {/* Value Proposition - NEW */}
            <section className="py-16 bg-gradient-to-b from-primary/5 to-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6">
                            <Sparkles size={18} />
                            <span>عرض القيمة الفريدة</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 leading-relaxed">
                            حلول عملية من واقع العملاء وبيئتهم، ترافقها مرافقة صادقة لتحقيق نتائج ملموسة بعيدًا عن الطرح النظري.
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            نؤمن بأن كل مشروع له ظروفه الخاصة، ولذلك نصمم حلولنا لتناسب واقعك لا نظريات الكتب.
                        </p>
                    </div>
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
                                شركة استشارات إدارية ناشئة في فلسطين، تركز على التطوير الإداري والتشغيلي والمالي والتسويقي، من خلال حلول عملية قابلة للتطبيق.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                نخدم مشاريع القطاع الخاص الفلسطيني الصغيرة والمتوسطة، وخاصة الشركات العائلية التي تحتاج إلى شريك يفهم تحدياتها ويساعدها على النمو.
                            </p>
                        </div>

                        {/* Mission & Vision Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 bg-primary/5 rounded-2xl border border-primary/10">
                                <Target className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-3 text-secondary">رسالتنا</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    تمكين المشاريع من تحقيق استقرار إداري ومالي وتشغيلي، وبناء منظومات عمل مؤسسية
                                    تسهم في تطوير الأعمال وتعزيز فرص النمو.
                                </p>
                            </div>
                            <div className="p-8 bg-secondary/5 rounded-2xl border border-secondary/10">
                                <Heart className="w-10 h-10 text-secondary mb-4" />
                                <h3 className="text-2xl font-bold mb-3 text-secondary">رؤيتنا</h3>
                                <p className="text-muted-foreground leading-relaxed">
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
                                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors">
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-4">
                            <Users size={18} />
                            <span>فريق العمل</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">فريق سُبُل لتطوير الأعمال</h2>
                        <p className="text-muted-foreground mt-4">نخبة من الخبراء بقيادة مؤسسية قوية</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: "م. إسلام وراد",
                                role: "مؤسس الشركة",
                                color: "from-primary/20 to-primary/5"
                            },
                            {
                                name: "م. بشار أبو هلال",
                                role: "مؤسس الشركة",
                                color: "from-secondary/20 to-secondary/5"
                            },
                            {
                                name: "أ. علاء بكر",
                                role: "مدير التسويق الإلكتروني",
                                color: "from-orange-200/50 to-orange-100/30"
                            },
                        ].map((member, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border text-center group hover:-translate-y-2 transition-all duration-300 hover:shadow-lg">
                                <div className={`w-28 h-28 bg-gradient-to-br ${member.color} rounded-full mx-auto mb-6 flex items-center justify-center`}>
                                    <span className="text-4xl font-bold text-secondary/60">
                                        {member.name.split(' ')[1]?.charAt(0) || member.name.charAt(0)}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-secondary">{member.name}</h3>
                                <p className="text-primary font-medium mt-2">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Marketing Message */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <Award className="w-12 h-12 mx-auto mb-6 opacity-80" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        نحن في سُبُل شركاؤك في تطوير الأعمال وصناعة النجاح
                    </h2>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                        نقدّم حلولًا تسويقية متكاملة تجمع بين الإبداع والتخطيط، لتبني هوية قوية وتحقق تواجدًا فعّالًا في السوق بثقة واحتراف.
                    </p>
                    <p className="mt-8 text-xl font-semibold opacity-90">
                        شكرًا لاختيارك سُبُل 💚
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
