"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, Users, HelpCircle, ArrowDown, Sparkles, CheckCircle2 } from "lucide-react";

const painPoints = [
    {
        icon: AlertCircle,
        question: "كم مرة شعرت أن مشروعك يتعبك أكثر مما يفيدك؟",
        solution: "نساعدك على بناء نظام يعمل لصالحك",
    },
    {
        icon: TrendingDown,
        question: "حسابات المشروع المالية غير منضبطة؟ نظامك المحاسبي مش واضح؟",
        solution: "ننظم حساباتك ونوضح صورتك المالية",
    },
    {
        icon: Users,
        question: "الفريق مش منسجم أو ما بطوّر من حاله؟",
        solution: "نبني فريقاً متماسكاً ومتطوراً",
    },
    {
        icon: HelpCircle,
        question: "هل هناك مشاكل وتحديات تواجه المشروع ولا تعرف من أين تبدأ؟",
        solution: "نرسم لك خارطة طريق واضحة",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

export function PainPoints() {
    return (
        <section className="relative py-28 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-accent/30 to-accent/50" />
            
            {/* Geometric Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="diagonal-lines" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                            <line x1="0" y1="0" x2="0" y2="10" stroke="#122E45" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
                </svg>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute top-20 left-[10%] w-24 h-24 rounded-full bg-primary/5 blur-2xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-32 right-[15%] w-32 h-32 rounded-full bg-secondary/5 blur-3xl"
            />

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                {/* Section Header with Strong Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/5 border border-secondary/10 mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm font-semibold text-secondary tracking-wide">نفهم تحدياتك</span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary mb-6 leading-tight">
                        هل تواجه هذه
                        <span className="block text-primary mt-2">التحديات؟</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-secondary/60 max-w-2xl mx-auto leading-relaxed">
                        إذا كانت إجابتك <span className="font-bold text-primary">"نعم"</span> على أي من هذه الأسئلة، فأنت في المكان الصحيح
                    </p>
                </motion.div>

                {/* Pain Points Grid - Modern Card Design */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16"
                >
                    {painPoints.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative"
                        >
                            <div className="relative h-full p-8 rounded-3xl bg-white border border-secondary/5 shadow-[0_4px_40px_rgba(18,46,69,0.06)] hover:shadow-[0_8px_50px_rgba(56,116,120,0.12)] transition-all duration-500 overflow-hidden">
                                {/* Card Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/50 to-transparent rounded-bl-[100px] opacity-60" />
                                
                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="flex items-start gap-5 mb-5">
                                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300">
                                            <item.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-lg md:text-xl font-bold text-secondary leading-relaxed group-hover:text-secondary/90 transition-colors">
                                                {item.question}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Solution Preview */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-secondary/5">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-sm font-medium text-primary/80">{item.solution}</span>
                                    </div>
                                </div>

                                {/* Number Badge */}
                                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center">
                                    <span className="text-xs font-bold text-secondary/30">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Transition Arrow */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center mb-12"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-secondary/5"
                    >
                        <ArrowDown className="w-5 h-5 text-primary" />
                    </motion.div>
                </motion.div>

                {/* Solution Statement - Premium Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="relative max-w-4xl mx-auto"
                >
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-secondary via-secondary to-secondary/95 p-10 md:p-14">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="dots-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="1" fill="white" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#dots-pattern)" />
                            </svg>
                        </div>
                        
                        {/* Glow Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[80px]" />
                        
                        {/* Content */}
                        <div className="relative z-10 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", delay: 0.5 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                            >
                                <Sparkles className="w-8 h-8 text-accent" />
                            </motion.div>
                            
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                                في سُبُل، نقدّم لك حلولاً عملية
                            </h3>
                            <p className="text-lg md:text-xl text-white/70 font-medium">
                                من واقعك وبيئتك، مصممة خصيصاً لاحتياجاتك
                            </p>
                            
                            {/* Stats Row */}
                            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-10 pt-8 border-t border-white/10">
                                <div className="text-center">
                                    <span className="block text-3xl md:text-4xl font-black text-accent">+20</span>
                                    <span className="text-sm text-white/50 font-medium">مشروع ناجح</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-3xl md:text-4xl font-black text-accent">+15</span>
                                    <span className="text-sm text-white/50 font-medium">سنة خبرة</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-3xl md:text-4xl font-black text-accent">100%</span>
                                    <span className="text-sm text-white/50 font-medium">رضا العملاء</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
