"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, TrendingUp, Sparkles, Target, Settings, Code2, Lightbulb, Heart } from "lucide-react";

export function HeroSection() {
    return (
        <section
            className="relative w-full overflow-hidden bg-white pt-24 pb-28 md:pt-36 md:pb-40"
            aria-label="القسم الرئيسي"
        >
            {/* Clean Brand Background - Mint Accent Blobs */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Subtle Mint Accent Blobs - Minimal, Professional */}
                <motion.div
                    animate={{ opacity: [0.08, 0.12, 0.08] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
                    style={{ backgroundColor: 'rgba(220, 238, 231, 0.6)' }}
                    aria-hidden="true"
                />
                <motion.div
                    animate={{ opacity: [0.06, 0.1, 0.06] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-20 left-[5%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none"
                    style={{ backgroundColor: 'rgba(0, 105, 137, 0.08)' }}
                    aria-hidden="true"
                />
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

                        <div className="space-y-5">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-secondary leading-[1.1]"
                            >
                                سُبُل
                                <span className="block text-primary-foreground/80 mt-2">لتطوير الأعمال</span>
                            </motion.h1>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#FD8B51' }}
                            >
                                شركاء نحو التميز الإداري
                            </motion.h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-xl md:text-2xl text-secondary/70 leading-relaxed max-w-2xl"
                        >
                            نساعد المشاريع والشركات على فهم واقعها، تنظيم أعمالها، وتحسين أدائها من خلال حلول عملية تقود إلى نمو أكثر ثباتًا.
                        </motion.p>

                        {/* Stats Counter - Enhanced */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="flex items-center gap-10 pt-2"
                        >
                            <div className="flex flex-col items-center">
                                <Code2 className="w-8 h-8 mb-2" style={{ color: '#FD8B51' }} />
                                <span className="text-sm text-secondary/50 font-medium">تطوير متكامل</span>
                            </div>
                            <div className="w-px h-14 bg-secondary/10"></div>
                            <div className="flex flex-col items-center">
                                <Lightbulb className="w-8 h-8 mb-2" style={{ color: '#FD8B51' }} />
                                <span className="text-sm text-secondary/50 font-medium">حلول واقعية</span>
                            </div>
                            <div className="w-px h-14 bg-secondary/10 hidden sm:block"></div>
                            <div className="flex-col items-center hidden sm:flex">
                                <Heart className="w-8 h-8 mb-2" style={{ color: '#FD8B51' }} />
                                <span className="text-sm text-secondary/50 font-medium">مرافقة صادقة</span>
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
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 2.5, ease: "easeInOut" }}
                                        style={{ stroke: '#FD8B51' }}
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
                                            <stop offset="0%" stopColor="#FD8B51" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#FD8B51" stopOpacity="0" />
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
                                            className="w-5 md:w-7 rounded-t-xl backdrop-blur-sm relative group transition-colors duration-300"
                                            style={{ backgroundImage: 'linear-gradient(to top, rgba(253, 139, 81, 0.2), rgba(253, 139, 81, 0.4))', borderTop: '2px solid #FD8B51', borderLeft: '1px solid rgba(253, 139, 81, 0.3)', borderRight: '1px solid rgba(253, 139, 81, 0.3)' }}
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
                                className="absolute top-[10%] right-[0%] p-5 backdrop-blur-xl rounded-2xl border shadow-2xl"
                                style={{ backgroundColor: 'rgba(220, 238, 231, 0.7)', borderColor: 'rgba(220, 238, 231, 0.5)' }}
                            >
                                <TrendingUp className="w-9 h-9" style={{ color: '#006989' }} />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-[20%] left-[-5%] p-5 backdrop-blur-xl rounded-2xl border shadow-2xl"
                                style={{ backgroundColor: 'rgba(18, 50, 58, 0.9)', borderColor: 'rgba(18, 50, 58, 0.3)' }}
                            >
                                <BarChart3 className="w-9 h-9" style={{ color: '#006989' }} />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
                                className="absolute top-[45%] left-[5%] p-4 backdrop-blur-xl rounded-xl border shadow-2xl"
                                style={{ backgroundColor: 'rgba(220, 238, 231, 0.8)', borderColor: 'rgba(220, 238, 231, 0.6)' }}
                            >
                                <Target className="w-7 h-7" style={{ color: '#12323A' }} />
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-[35%] right-[-3%] p-4 backdrop-blur-xl rounded-xl border shadow-2xl"
                                style={{ backgroundColor: 'rgba(0, 105, 137, 0.8)', borderColor: 'rgba(0, 105, 137, 0.4)' }}
                            >
                                <Settings className="w-7 h-7" style={{ color: 'white' }} />
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
                                    className="text-lg px-10 h-16 font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                                    style={{ backgroundColor: '#FD8B51', color: 'white' }}
                                >
                                    اطلب استشارة مجانية
                                    <ArrowLeft className="me-3 h-5 w-5" aria-hidden="true" />
                                </Button>
                            </Link>
                            <Link href="/services" aria-label="استكشف خدماتنا">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-10 h-16 font-semibold rounded-2xl transition-all duration-300"
                                    style={{ borderColor: '#12323A', color: '#12323A' }}
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
