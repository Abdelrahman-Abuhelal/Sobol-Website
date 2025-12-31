"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, BarChart3 } from "lucide-react";

export function HeroSection() {
    return (
        <section
            className="relative w-full overflow-hidden bg-secondary pt-20 pb-20 md:pt-32 md:pb-32"
            aria-label="القسم الرئيسي"
        >
            {/* Background Elements - Abstract shapes for originality */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />

            <div className="container relative z-10 px-4 md:px-8 lg:px-12 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start text-right space-y-8"
                    >
                        {/* Badge/Tag */}
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-accent backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-accent ms-2 animate-pulse" aria-hidden="true"></span>
                            شريكك الاستراتيجي للنجاح
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                                سُبُل <br />
                                <span className="text-primary-foreground/90">لتطوير الأعمال</span>
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-medium text-accent">
                                شركاء نحو التميز الإداري
                            </h2>
                        </div>

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                            نقدم استشارات إدارية وتسويقية مخصصة للشركات الطموحة في السوق الفلسطيني، لنضمن لك الاستقرار والنمو المستدام.
                        </p>

                        {/* Stats Counter */}
                        <div className="flex items-center gap-8 pt-4">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">+20</span>
                                <span className="text-sm text-gray-400">مشروع ناجح</span>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">+15</span>
                                <span className="text-sm text-gray-400">سنوات خبرة</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content - Animated Chart Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full flex flex-col items-center justify-center lg:items-end lg:justify-center space-y-8"
                        aria-hidden="true"
                    >
                        {/* Illustration Container */}
                        <div className="relative w-full max-w-[500px] aspect-square max-h-[400px]">
                            {/* White Line Chart Path - Abstract representation */}
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-2xl overflow-visible">
                                <motion.path
                                    d="M10,80 C30,70 40,50 50,60 S70,30 90,10"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                                {/* Glow effect under the line */}
                                <motion.path
                                    d="M10,80 C30,70 40,50 50,60 S70,30 90,10 L90,100 L10,100 Z"
                                    fill="url(#gradient)"
                                    opacity="0.2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2 }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Bar Charts - Simulated with divs */}
                            <div className="absolute inset-0 flex items-end justify-center gap-6 pb-12 px-12 opacity-90">
                                {[35, 55, 45, 75, 60, 90].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 1, delay: i * 0.15 + 0.5 }}
                                        className="w-6 md:w-8 bg-gradient-to-t from-white/5 to-white/20 rounded-t-lg backdrop-blur-sm border-t border-x border-white/10 relative group hover:bg-white/30 transition-colors"
                                    >
                                        {/* Tooltip-like dot on hover */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Floating Elements for Originality */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="absolute top-[15%] right-[5%] p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
                            >
                                <TrendingUp className="text-accent w-8 h-8" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-[25%] left-[0%] p-4 bg-secondary/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
                            >
                                <BarChart3 className="text-primary w-8 h-8" />
                            </motion.div>
                        </div>

                        {/* Buttons moved here */}
                        <div className="flex flex-wrap gap-4 w-full sm:w-auto justify-center lg:justify-end">
                            <Link href="/contact" aria-label="اطلب استشارة مجانية">
                                <Button
                                    size="lg"
                                    className="text-lg px-8 h-14 bg-white text-secondary hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300 font-bold"
                                >
                                    اطلب استشارة مجانية
                                    <ArrowLeft className="me-2 h-5 w-5" aria-hidden="true" />
                                </Button>
                            </Link>
                            <Link href="/services" aria-label="استكشف خدماتنا">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 h-14 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                                >
                                    استكشف خدماتنا
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
