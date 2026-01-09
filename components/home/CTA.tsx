"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-[#0a1f33]" />
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large Gradient Orbs */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"
                />
                <motion.div
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px]"
                />
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="cta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#cta-grid)" />
                    </svg>
                </div>
                
                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4 + i,
                            delay: i * 0.5,
                            ease: "easeInOut",
                        }}
                        className="absolute w-2 h-2 rounded-full bg-accent/40"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-sm font-semibold text-white/90">ابدأ الآن مجاناً</span>
                        </motion.div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            ابدأ رحلتك نحو
                            <span className="block text-accent mt-3">التميز الإداري</span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                            لا تترك التحديات تعيق نمو مشروعك. دعنا نساعدك في وضع مشروعك على المسار الصحيح من خلال استشارة مجانية شاملة.
                        </p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                        >
                            <Link href="/contact">
                                <Button 
                                    size="lg" 
                                    className="text-lg px-10 h-16 bg-white text-secondary hover:bg-accent hover:text-secondary font-bold rounded-2xl shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
                                >
                                    <Calendar className="ml-2 h-5 w-5" />
                                    احجز استشارتك المجانية
                                    <ArrowLeft className="me-3 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="tel:+970000000000">
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="text-lg px-8 h-16 border-white/20 text-white hover:bg-white/10 font-semibold rounded-2xl transition-all duration-300"
                                >
                                    <Phone className="ml-2 h-5 w-5" />
                                    تواصل معنا مباشرة
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Trust Elements */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="pt-10 border-t border-white/10"
                        >
                            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2 space-x-reverse">
                                        {[...Array(4)].map((_, i) => (
                                            <div 
                                                key={i} 
                                                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-secondary flex items-center justify-center"
                                            >
                                                <span className="text-xs font-bold text-white">{['أ', 'م', 'س', 'ع'][i]}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-white/60 text-sm font-medium">+20 عميل سعيد</span>
                                </div>
                                
                                <div className="h-8 w-px bg-white/10 hidden md:block" />
                                
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-white/60 text-sm font-medium">تقييم 5/5</span>
                                </div>
                                
                                <div className="h-8 w-px bg-white/10 hidden md:block" />
                                
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-white/60 text-sm font-medium">متاح للاستشارات</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
                    <path 
                        d="M0 50L48 45.7C96 41.3 192 32.7 288 35.8C384 39 480 54 576 58.3C672 62.7 768 56.3 864 52.5C960 48.7 1056 47.3 1152 50C1248 52.7 1344 59.3 1392 62.7L1440 66V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
