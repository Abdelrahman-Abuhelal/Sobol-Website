"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, TrendingUp, Sparkles, Target, Zap } from "lucide-react";

export function HeroSection() {
    return (
        <section
            className="relative w-full overflow-hidden bg-secondary pt-24 pb-28 md:pt-36 md:pb-40"
            aria-label="القسم الرئيسي"
        >
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large Gradient Orbs */}
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/3 pointer-events-none" 
                    aria-hidden="true" 
                />
                <motion.div 
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" 
                    aria-hidden="true" 
                />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="hero-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-grid)" />
                    </svg>
                </div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5 + i,
                            delay: i * 0.7,
                            ease: "easeInOut",
                        }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${15 + (i % 4) * 20}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container relative z-10 px-4 md:px-8 lg:px-12 mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col items-start text-right space-y-10"
                    >
                        {/* Badge/Tag */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-accent backdrop-blur-md"
                        >
                            <Sparkles className="w-4 h-4 ml-2 text-accent" />
                            <span className="font-medium">شريكك الاستراتيجي للنجاح</span>
                            <span className="flex h-2 w-2 rounded-full bg-accent ms-3 animate-pulse" aria-hidden="true"></span>
                        </motion.div>

                        <div className="space-y-5">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.1]"
                            >
                                سُبُل
                                <span className="block text-primary-foreground/80 mt-2">لتطوير الأعمال</span>
                            </motion.h1>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent"
                            >
                                شركاء نحو التميز الإداري
                            </motion.h2>
                        </div>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl"
                        >
                            نقدم استشارات إدارية وتسويقية مخصصة للشركات الطموحة في السوق الفلسطيني، لنضمن لك الاستقرار والنمو المستدام.
                        </motion.p>

                        {/* Stats Counter - Enhanced */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="flex items-center gap-10 pt-2"
                        >
                            <div className="flex flex-col">
                                <span className="text-4xl md:text-5xl font-black text-white">+20</span>
                                <span className="text-sm text-white/50 font-medium mt-1">مشروع ناجح</span>
                            </div>
                            <div className="w-px h-14 bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-4xl md:text-5xl font-black text-white">+15</span>
                                <span className="text-sm text-white/50 font-medium mt-1">سنوات خبرة</span>
                            </div>
                            <div className="w-px h-14 bg-white/10 hidden sm:block"></div>
                            <div className="flex-col hidden sm:flex">
                                <span className="text-4xl md:text-5xl font-black text-accent">100%</span>
                                <span className="text-sm text-white/50 font-medium mt-1">رضا العملاء</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Visual Content - Enhanced Animated Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative w-full flex flex-col items-center justify-center lg:items-end lg:justify-center space-y-10"
                        aria-hidden="true"
                    >
                        {/* Illustration Container */}
                        <div className="relative w-full max-w-[550px] aspect-square max-h-[450px]">
                            {/* Glowing Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 rounded-[3rem] blur-xl" />
                            
                            {/* Main Container */}
                            <div className="relative w-full h-full bg-white/5 backdrop-blur-sm rounded-[3rem] border border-white/10 overflow-hidden">
                                {/* White Line Chart Path */}
                                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-2xl overflow-visible p-8">
                                    <motion.path
                                        d="M5,85 C20,75 30,55 45,60 S65,35 80,25 L95,10"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 2.5, ease: "easeInOut" }}
                                    />
                                    {/* Glow effect under the line */}
                                    <motion.path
                                        d="M5,85 C20,75 30,55 45,60 S65,35 80,25 L95,10 L95,100 L5,100 Z"
                                        fill="url(#hero-gradient)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.3 }}
                                        transition={{ duration: 2, delay: 0.8 }}
                                    />
                                    <defs>
                                        <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#387478" stopOpacity="0.6" />
                                            <stop offset="100%" stopColor="#387478" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Bar Charts */}
                                <div className="absolute inset-0 flex items-end justify-center gap-4 md:gap-6 pb-8 px-8 opacity-80">
                                    {[30, 50, 40, 70, 55, 85, 65].map((height, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ duration: 1.2, delay: i * 0.12 + 0.6, ease: "easeOut" }}
                                            className="w-5 md:w-7 bg-gradient-to-t from-white/10 to-white/30 rounded-t-xl backdrop-blur-sm border-t border-x border-white/20 relative group hover:bg-white/40 transition-colors duration-300"
                                        >
                                            <motion.div 
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: i * 0.12 + 1.5 }}
                                                className="absolute -top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_15px_rgba(226,241,231,0.8)]" 
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                className="absolute top-[10%] right-[0%] p-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
                            >
                                <TrendingUp className="text-accent w-9 h-9" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-[20%] left-[-5%] p-5 bg-secondary/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
                            >
                                <BarChart3 className="text-primary w-9 h-9" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
                                className="absolute top-[45%] left-[5%] p-4 bg-accent/90 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl"
                            >
                                <Target className="text-secondary w-7 h-7" />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-[35%] right-[-3%] p-4 bg-primary/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl"
                            >
                                <Zap className="text-white w-7 h-7" />
                            </motion.div>
                        </div>

                        {/* Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="flex flex-wrap gap-4 w-full sm:w-auto justify-center lg:justify-end"
                        >
                            <Link href="/contact" aria-label="اطلب استشارة مجانية">
                                <Button
                                    size="lg"
                                    className="text-lg px-10 h-16 bg-white text-secondary hover:bg-accent hover:text-secondary hover:scale-[1.02] transition-all duration-300 font-bold rounded-2xl shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
                                >
                                    اطلب استشارة مجانية
                                    <ArrowLeft className="me-3 h-5 w-5" aria-hidden="true" />
                                </Button>
                            </Link>
                            <Link href="/services" aria-label="استكشف خدماتنا">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-10 h-16 border-white/20 text-white hover:bg-white/10 transition-all duration-300 rounded-2xl font-semibold"
                                >
                                    استكشف خدماتنا
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
                    <path 
                        d="M0 40L60 36.7C120 33.3 240 26.7 360 28.3C480 30 600 40 720 43.3C840 46.7 960 43.3 1080 40C1200 36.7 1320 33.3 1380 31.7L1440 30V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V40Z" 
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
