import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Flame, Home, TrendingUp, Check, Palette, Share2, Megaphone, PenTool, Layout, Target } from "lucide-react";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">خدماتنا</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        حلول متكاملة تغطي كافة احتياجات مشروعك من التأسيس إلى النمو.
                    </p>
                </div>
            </section>

            {/* Business Development Services */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">أولاً: خدمات تطوير الأعمال</h2>

                    <div className="space-y-16">
                        {/* Package 1 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start p-8 bg-red-50/50 rounded-3xl border border-red-100">
                            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                                <Flame size={32} />
                            </div>
                            <div className="space-y-4 flex-1">
                                <h3 className="text-2xl font-bold text-secondary">1. حزمة إطفاء الحرائق (Firefighting)</h3>
                                <p className="text-muted-foreground">
                                    مخصصة للمشاريع التي تعاني من تحديات عاجلة. نركز فيها على استعادة التوازن المالي والإداري بأسرع وقت.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {["معالجة الخلل في التدفق النقدي", "إدارة الالتزامات المالية", "تنظيم العمليات اليومية", "توفير رؤية واضحة للأرقام", "إنقاذ المشروع بسرعة"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-red-500" />
                                            <span className="text-secondary/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Package 2 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                                <Home size={32} />
                            </div>
                            <div className="space-y-4 flex-1">
                                <h3 className="text-2xl font-bold text-secondary">2. حزمة ترتيب البيت الداخلي (Structuring)</h3>
                                <p className="text-muted-foreground">
                                    تساعد المشروعات على الانتقال من العمل الفردي المشتت إلى العمل المؤسسي المنظم والمستدام.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {["إعادة تنظيم الأدوار والمهام", "ضبط الإجراءات والسياسات", "بناء بيئة عمل منضبطة", "بناء نظام إداري ومالي", "أتمتة العمليات الأساسية"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-blue-500" />
                                            <span className="text-secondary/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Package 3 */}
                        <div className="flex flex-col md:flex-row gap-8 items-start p-8 bg-green-50/50 rounded-3xl border border-green-100">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                                <TrendingUp size={32} />
                            </div>
                            <div className="space-y-4 flex-1">
                                <h3 className="text-2xl font-bold text-secondary">3. حزمة النمو والتوسع (Growth)</h3>
                                <p className="text-muted-foreground">
                                    للمشاريع الجاهزة للانطلاق، حيث نركز على التسويق والمبيعات واقتناص الفرص في السوق.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {["إعادة تصميم التسويق والمبيعات", "تحديد فرص النمو", "تحسين الكفاءة التشغيلية", "بناء أدوات قياس الأداء", "تعزيز الربحية"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-green-600" />
                                            <span className="text-secondary/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marketing Services */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-center text-secondary mb-12">ثانياً: الخدمات التسويقية</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Palette, title: "الهوية البصرية", desc: "تصميم شعار وهوية تعكس شخصية مشروعك." },
                            { icon: Share2, title: "إدارة التواصل الاجتماعي", desc: "تواجد فعال وتفاعل مستمر مع جمهورك." },
                            { icon: Megaphone, title: "الحملات الممولة", desc: "تخطيط وتنفيذ حملات لتحقيق أعلى عائد." },
                            { icon: PenTool, title: "كتابة المحتوى", desc: "محتوى احترافي يعزز ثقة الجمهور." },
                            { icon: Layout, title: "التصميم الجرافيكي", desc: "تصاميم عصرية مبتكرة تدعم علامتك." },
                            { icon: Target, title: "الخطط الاستراتيجية", desc: "استراتيجيات مبنية على تحليل السوق." },
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border hover:shadow-md transition-shadow">
                                <s.icon className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold text-secondary mb-2">{s.title}</h3>
                                <p className="text-sm text-muted-foreground">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
