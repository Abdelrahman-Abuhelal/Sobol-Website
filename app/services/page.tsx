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

                    <div className="space-y-10">
                        {/* Package 1 - ترتيب البيت الداخلي */}
                        <div
                            className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl border overflow-hidden relative"
                            style={{
                                background: 'linear-gradient(135deg, rgba(96, 125, 139, 0.08) 0%, rgba(144, 164, 174, 0.05) 50%, rgba(236, 239, 241, 0.1) 100%)',
                                borderColor: 'rgba(96, 125, 139, 0.15)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
                            }}
                        >
                            {/* Background Pattern */}
                            <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="grid-page-1" width="8" height="8" patternUnits="userSpaceOnUse">
                                        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#607D8B" strokeWidth="0.3" />
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#grid-page-1)" />
                            </svg>

                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 relative z-10"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(96, 125, 139, 0.15) 0%, rgba(96, 125, 139, 0.05) 100%)',
                                    border: '1px solid rgba(96, 125, 139, 0.15)'
                                }}
                            >
                                <Home size={30} strokeWidth={1.5} className="text-[#455A64]" />
                            </div>
                            <div className="space-y-4 flex-1 relative z-10">
                                <h3 className="text-2xl font-bold text-secondary">1. حزمة ترتيب البيت الداخلي (Structuring)</h3>
                                <p className="text-muted-foreground">
                                    تساعد المشروعات على الانتقال من العمل الفردي المشتت إلى العمل المؤسسي المنظم والمستدام.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {["إعادة تنظيم الأدوار والمهام", "ضبط الإجراءات والسياسات", "بناء بيئة عمل منضبطة", "بناء نظام إداري ومالي", "أتمتة العمليات الأساسية"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-[#607D8B]" strokeWidth={1.5} />
                                            <span className="text-secondary/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Package 2 - إطفاء الحرائق */}
                        <div
                            className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl border overflow-hidden relative"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 112, 67, 0.08) 0%, rgba(255, 171, 145, 0.05) 50%, rgba(255, 224, 178, 0.1) 100%)',
                                borderColor: 'rgba(255, 112, 67, 0.15)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
                            }}
                        >
                            {/* Background Pattern */}
                            <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0 100 Q25 60 50 80 T100 50 L100 100 Z" fill="#FF7043" />
                                <path d="M0 100 Q30 70 60 85 T100 65 L100 100 Z" fill="#FFAB91" />
                            </svg>

                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 relative z-10"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 112, 67, 0.15) 0%, rgba(255, 112, 67, 0.05) 100%)',
                                    border: '1px solid rgba(255, 112, 67, 0.15)'
                                }}
                            >
                                <Flame size={30} strokeWidth={1.5} className="text-[#E64A19]" />
                            </div>
                            <div className="space-y-4 flex-1 relative z-10">
                                <h3 className="text-2xl font-bold text-secondary">2. حزمة إطفاء الحرائق (Firefighting)</h3>
                                <p className="text-muted-foreground">
                                    مخصصة للمشاريع التي تعاني من تحديات عاجلة. نركز فيها على استعادة التوازن المالي والإداري بأسرع وقت.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {["معالجة الخلل في التدفق النقدي", "إدارة الالتزامات المالية", "تنظيم العمليات اليومية", "توفير رؤية واضحة للأرقام", "إنقاذ المشروع بسرعة"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-[#FF7043]" strokeWidth={1.5} />
                                            <span className="text-secondary/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Package 3 - النمو والتوسع */}
                        <div
                            className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl border overflow-hidden relative"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0, 150, 136, 0.08) 0%, rgba(77, 182, 172, 0.05) 50%, rgba(178, 223, 219, 0.1) 100%)',
                                borderColor: 'rgba(0, 150, 136, 0.15)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
                            }}
                        >
                            {/* Background Pattern */}
                            <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0 80 L30 60 L50 70 L70 40 L100 20" fill="none" stroke="#009688" strokeWidth="1.5" />
                                <path d="M70 40 L75 45 L80 35" fill="none" stroke="#009688" strokeWidth="1" />
                            </svg>

                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 relative z-10"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 150, 136, 0.15) 0%, rgba(0, 150, 136, 0.05) 100%)',
                                    border: '1px solid rgba(0, 150, 136, 0.15)'
                                }}
                            >
                                <TrendingUp size={30} strokeWidth={1.5} className="text-[#00796B]" />
                            </div>
                            <div className="space-y-4 flex-1 relative z-10">
                                <h3 className="text-2xl font-bold text-secondary">3. حزمة النمو والتوسع (Growth)</h3>
                                <p className="text-muted-foreground">
                                    للمشاريع الجاهزة للانطلاق، حيث نركز على التسويق والمبيعات واقتناص الفرص في السوق.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {["إعادة تصميم التسويق والمبيعات", "تحديد فرص النمو", "تحسين الكفاءة التشغيلية", "بناء أدوات قياس الأداء", "تعزيز الربحية"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-[#009688]" strokeWidth={1.5} />
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
                            <div
                                key={i}
                                className="bg-white p-6 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                                style={{
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)'
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10 text-primary border border-primary/15"
                                >
                                    <s.icon size={24} strokeWidth={1.5} />
                                </div>
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
