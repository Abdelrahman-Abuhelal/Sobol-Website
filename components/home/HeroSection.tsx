"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, Layers, CheckCircle2, ArrowLeft } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-10 pb-20 md:pt-20 md:pb-32">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content (Right Side) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start text-right space-y-6"
                    >
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary">
                            <span className="flex h-2 w-2 rounded-full bg-primary ml-2 animate-pulse"></span>
                            شريكك الاستراتيجي للنجاح
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-secondary leading-tight">
                            حِرَفية التخطيط <br />
                            <span className="text-primary">لهندسة النمو</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                            في سُبُل، نحول التحديات إلى فرص. نقدم استشارات إدارية وتسويقية مخصصة للشركات الطموحة في السوق الفلسطيني، لنضمن لك الاستقرار والنمو المستدام.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
                            <Link href="/contact">
                                <Button size="lg" className="text-lg px-8 h-14 w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                                    احجز استشارة مجانية
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline" size="lg" className="text-lg px-8 h-14 w-full sm:w-auto">
                                    استكشف خدماتنا
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators / Mini Stats */}
                        <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground border-t border-gray-100 w-full mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span>حلول عملية وواقعية</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span>خبرة محلية عميقة</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content (Left Side - Floating Cards) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] md:h-[500px] w-full hidden lg:block"
                    >
                        {/* Abstract Shape Blob */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-[2rem] transform rotate-3 border border-gray-100/50" />

                        {/* Floating Card 1: Growth */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute top-10 right-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-64 z-20"
                        >
                            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-1">نتائج ملموسة</h3>
                            <p className="text-sm text-muted-foreground">زيادة في المبيعات وتحسين كفاءة التشغيل.</p>
                        </motion.div>

                        {/* Floating Card 2: Strategy */}
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-64 z-30"
                        >
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                <Layers size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-1">استراتيجيات دقيقة</h3>
                            <p className="text-sm text-muted-foreground">خطط عمل مفصلة تناسب حجم وطبيعة عملك.</p>
                        </motion.div>

                        {/* Floating Card 3: Success */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-10 right-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 w-56 z-10 flex items-center gap-3"
                        >
                            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-base">خبرة موثوقة</h3>
                                <p className="text-xs text-muted-foreground">فريق متخصص معك.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
