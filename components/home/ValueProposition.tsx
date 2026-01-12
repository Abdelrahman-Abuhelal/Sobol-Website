"use client";

import { motion } from "framer-motion";
import { TrendingUp, Layers, Award, ArrowUpRight } from "lucide-react";

const features = [
    {
        icon: TrendingUp,
        title: "نتائج ملموسة",
        description: "زيادة في المبيعات وتحسين كفاءة التشغيل بنسب قابلة للقياس",
        metric: "+40%",
        metricLabel: "نمو متوسط",
        gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
        iconGradient: "from-emerald-500 to-teal-600",
    },
    {
        icon: Layers,
        title: "استراتيجيات دقيقة",
        description: "خطط عمل مفصلة ومخصصة تناسب حجم وطبيعة عملك",
        metric: "360°",
        metricLabel: "رؤية شاملة",
        gradient: "from-primary/20 via-primary/10 to-transparent",
        iconGradient: "from-primary to-primary/80",
    },
    {
        icon: Award,
        title: "خبرة موثوقة",
        description: "فريق متخصص يرافقك في كل خطوة نحو النجاح",
        metric: "+15",
        metricLabel: "سنة خبرة",
        gradient: "from-amber-500/20 via-amber-400/10 to-transparent",
        iconGradient: "from-amber-500 to-orange-600",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 80,
            damping: 20,
        },
    },
};

export function ValueProposition() {
    return (
        <section className="relative py-28 bg-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="value-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#122E45" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#value-grid)" />
                    </svg>
                </div>
                
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/30 rounded-full blur-[120px]" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                {/* Section Header */}
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 mb-6"
                    >
                        <span className="text-sm font-semibold text-primary tracking-wide">لماذا سُبُل؟</span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary mb-6 leading-tight">
                        ما يميزنا
                        <span className="block text-primary/80 mt-2">عن غيرنا</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-secondary/60 max-w-2xl mx-auto leading-relaxed">
                        نجمع بين الخبرة العميقة والفهم المحلي لنقدم لك حلولاً تناسب واقعك
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="group relative"
                        >
                            <div className="relative h-full overflow-hidden rounded-[2rem] bg-white border border-secondary/5 p-8 lg:p-10 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_20px_60px_rgba(18,46,69,0.08)]">
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                
                                {/* Top Accent Line */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Metric Badge */}
                                    <div className="flex items-start justify-between mb-8">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-left opacity-60 group-hover:opacity-100 transition-opacity">
                                            <span className="block text-3xl font-black text-secondary">{feature.metric}</span>
                                            <span className="text-xs text-secondary/60 font-medium">{feature.metricLabel}</span>
                                        </div>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-2xl lg:text-3xl font-black text-secondary mb-4 group-hover:text-secondary/90 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-secondary/60 leading-relaxed text-lg">
                                        {feature.description}
                                    </p>

                                    {/* Arrow Link */}
                                    <div className="mt-8 pt-6 border-t border-secondary/5">
                                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                                            <span>اكتشف المزيد</span>
                                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-[-4px] group-hover:-translate-y-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Corner Element */}
                                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-20 pt-12 border-t border-secondary/5"
                >
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-secondary/60 font-medium">استشارات مجانية</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-secondary/60 font-medium">خطط مخصصة</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <span className="text-secondary/60 font-medium">متابعة مستمرة</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
