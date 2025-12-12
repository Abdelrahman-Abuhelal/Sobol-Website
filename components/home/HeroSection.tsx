"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, Layers, CheckCircle2, ArrowLeft } from "lucide-react";

export function HeroSection() {
    return (
        <section
            className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-10 pb-20 md:pt-20 md:pb-32"
            aria-label="القسم الرئيسي"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" aria-hidden="true" />

            <div className="container relative z-10 px-4 md:px-8 lg:px-12 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Text Content (Right Side) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start text-right space-y-6 pe-0 md:pe-4 lg:pe-8"
                    >
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary">
                            <span className="flex h-2 w-2 rounded-full bg-primary ms-2 animate-pulse" aria-hidden="true"></span>
                            شريكك الاستراتيجي للنجاح
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-secondary leading-tight">
                            حِرَفية التخطيط <br />
                            <span className="text-primary">لهندسة النمو</span>
                        </h1>

                        {/* Split subheadline */}
                        <div className="space-y-3 max-w-xl">
                            <p className="text-lg md:text-xl text-secondary font-medium leading-relaxed">
                                في سُبُل، نحول التحديات إلى فرص.
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                نقدم استشارات إدارية وتسويقية مخصصة للشركات الطموحة في السوق الفلسطيني، لنضمن لك الاستقرار والنمو المستدام.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
                            <Link href="/contact" aria-label="احجز استشارة مجانية">
                                <Button
                                    size="lg"
                                    className="text-lg px-8 h-14 w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
                                >
                                    احجز استشارة مجانية
                                    <ArrowLeft className="me-2 h-5 w-5" aria-hidden="true" />
                                </Button>
                            </Link>
                            <Link href="/services" aria-label="استكشف خدماتنا">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 h-14 w-full sm:w-auto hover:bg-primary/5 transition-all duration-300"
                                >
                                    استكشف خدماتنا
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="pt-8 flex flex-wrap items-center gap-4 md:gap-8 text-sm text-muted-foreground border-t border-gray-100 w-full mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" aria-hidden="true" />
                                <span>حلول عملية وواقعية</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" aria-hidden="true" />
                                <span>خبرة محلية عميقة</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content - Connected Cards Layout (Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[420px] w-full hidden lg:flex items-center justify-center"
                        aria-hidden="true"
                    >
                        {/* Connecting Background Shape - Unified backdrop */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[320px] h-[380px] bg-gradient-to-br from-accent via-accent/50 to-transparent rounded-[3rem] transform -rotate-3" />
                        </div>

                        {/* Subtle connecting line/flow element */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                            viewBox="0 0 400 420"
                            aria-hidden="true"
                        >
                            <path
                                d="M 280 80 Q 200 120 120 200 Q 80 280 180 350"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="8 8"
                                className="text-primary"
                            />
                        </svg>

                        {/* Cards in Connected Triangle/Zigzag Formation */}
                        <div className="relative w-full h-full">

                            {/* Card 1: Top Right - نتائج ملموسة */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className="absolute top-4 right-4 bg-white p-5 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100/80 w-52 z-20 cursor-default transition-all duration-300"
                            >
                                <div className="h-11 w-11 bg-gradient-to-br from-[#009688]/15 to-[#009688]/5 rounded-xl flex items-center justify-center mb-3 text-[#00796B] border border-[#009688]/15">
                                    <TrendingUp size={22} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-base mb-1.5 text-secondary">نتائج ملموسة</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">زيادة في المبيعات وتحسين كفاءة التشغيل.</p>
                            </motion.div>

                            {/* Card 2: Middle Left - استراتيجيات دقيقة */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                whileHover={{ scale: 1.03, x: -5 }}
                                className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-5 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100/80 w-52 z-30 cursor-default transition-all duration-300"
                            >
                                <div className="h-11 w-11 bg-gradient-to-br from-[#607D8B]/15 to-[#607D8B]/5 rounded-xl flex items-center justify-center mb-3 text-[#455A64] border border-[#607D8B]/15">
                                    <Layers size={22} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-base mb-1.5 text-secondary">استراتيجيات دقيقة</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">خطط عمل مفصلة تناسب حجم وطبيعة عملك.</p>
                            </motion.div>

                            {/* Card 3: Bottom Center-Right - خبرة موثوقة */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                whileHover={{ scale: 1.03, y: 5 }}
                                className="absolute bottom-6 right-16 bg-white p-4 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100/80 w-48 z-10 flex items-center gap-3 cursor-default transition-all duration-300"
                            >
                                <div className="h-11 w-11 bg-gradient-to-br from-[#FF7043]/15 to-[#FF7043]/5 rounded-full flex items-center justify-center text-[#E64A19] shrink-0 border border-[#FF7043]/15">
                                    <CheckCircle2 size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-secondary">خبرة موثوقة</h3>
                                    <p className="text-xs text-muted-foreground">فريق متخصص معك.</p>
                                </div>
                            </motion.div>

                            {/* Decorative Dots - Connection hints */}
                            <div className="absolute top-24 right-56 w-2 h-2 rounded-full bg-primary/30" />
                            <div className="absolute top-40 left-52 w-1.5 h-1.5 rounded-full bg-primary/20" />
                            <div className="absolute bottom-28 right-64 w-2 h-2 rounded-full bg-primary/25" />
                        </div>
                    </motion.div>

                    {/* Mobile Cards - Clean stacked layout */}
                    <div className="lg:hidden space-y-4 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="h-11 w-11 bg-gradient-to-br from-[#009688]/15 to-[#009688]/5 rounded-xl flex items-center justify-center mb-3 text-[#00796B] border border-[#009688]/15">
                                <TrendingUp size={22} strokeWidth={1.5} aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-base mb-1.5 text-secondary">نتائج ملموسة</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">زيادة في المبيعات وتحسين كفاءة التشغيل.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="h-11 w-11 bg-gradient-to-br from-[#607D8B]/15 to-[#607D8B]/5 rounded-xl flex items-center justify-center mb-3 text-[#455A64] border border-[#607D8B]/15">
                                <Layers size={22} strokeWidth={1.5} aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-base mb-1.5 text-secondary">استراتيجيات دقيقة</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">خطط عمل مفصلة تناسب حجم وطبيعة عملك.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3"
                        >
                            <div className="h-11 w-11 bg-gradient-to-br from-[#FF7043]/15 to-[#FF7043]/5 rounded-full flex items-center justify-center text-[#E64A19] shrink-0 border border-[#FF7043]/15">
                                <CheckCircle2 size={20} strokeWidth={1.5} aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-secondary">خبرة موثوقة</h3>
                                <p className="text-xs text-muted-foreground">فريق متخصص معك.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
