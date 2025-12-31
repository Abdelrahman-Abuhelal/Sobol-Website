"use client";

import { motion } from "framer-motion";
import { TrendingUp, Layers, Award } from "lucide-react";

const features = [
    {
        icon: TrendingUp,
        title: "نتائج ملموسة",
        description: "زيادة في المبيعات وتحسين كفاءة التشغيل",
    },
    {
        icon: Layers,
        title: "استراتيجيات دقيقة",
        description: "خطط عمل مفصلة تناسب حجم وطبيعة عملك",
    },
    {
        icon: Award,
        title: "خبرة موثوقة",
        description: "فريق متخصص معك",
    },
];

export function ValueProposition() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative overflow-hidden rounded-[2rem] bg-[#E2F1E7]/60 p-8 h-full text-center transition-all duration-300 hover:bg-[#E2F1E7] hover:shadow-lg hover:-translate-y-1">
                                
                                {/* Icon Container */}
                                <div className="mb-6 inline-flex p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold text-secondary">
                                        {feature.title}
                                    </h3>
                                    <p className="text-secondary/80 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Decorative Element */}
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
