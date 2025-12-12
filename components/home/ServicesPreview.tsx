"use client";

import { Flame, Home, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    {
        icon: Home,
        title: "حزمة ترتيب البيت الداخلي",
        description: "بناء نظام إداري ومالي واضح ومنضبط، ينقل المشروع من العمل الفردي إلى المؤسسي.",
        gradient: "from-[#607D8B]/8 via-[#90A4AE]/5 to-[#ECEFF1]/10",
        iconBg: "bg-gradient-to-br from-[#607D8B]/15 to-[#607D8B]/5",
        iconColor: "text-[#455A64]",
        accentColor: "#607D8B",
        pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <pattern id="grid1" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#607D8B]" />
                    </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid1)" />
            </svg>
        ),
    },
    {
        icon: Flame,
        title: "حزمة إطفاء الحرائق",
        description: "حلول عاجلة تعيد للمشروع توازنه المالي والإداري، وتعالج مشكلات السيولة.",
        gradient: "from-[#FF7043]/8 via-[#FFAB91]/5 to-[#FFE0B2]/10",
        iconBg: "bg-gradient-to-br from-[#FF7043]/15 to-[#FF7043]/5",
        iconColor: "text-[#E64A19]",
        accentColor: "#FF7043",
        pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 Q25 60 50 80 T100 50 L100 100 Z" fill="currentColor" className="text-[#FF7043]" />
                <path d="M0 100 Q30 70 60 85 T100 65 L100 100 Z" fill="currentColor" className="text-[#FFAB91]" />
            </svg>
        ),
    },
    {
        icon: TrendingUp,
        title: "حزمة النمو والتوسع",
        description: "تطوير منظومة التسويق والمبيعات وتحديد فرص النمو وزيادة الربحية.",
        gradient: "from-[#009688]/8 via-[#4DB6AC]/5 to-[#B2DFDB]/10",
        iconBg: "bg-gradient-to-br from-[#009688]/15 to-[#009688]/5",
        iconColor: "text-[#00796B]",
        accentColor: "#009688",
        pattern: (
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 80 L30 60 L50 70 L70 40 L100 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#009688]" />
                <path d="M70 40 L75 45 L80 35" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#009688]" />
            </svg>
        ),
    },
];

export function ServicesPreview() {
    return (
        <section className="py-20 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary">خدماتنا الرئيسية</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        نصمم حلولنا لتناسب مرحلة نمو مشروعك واحتياجاته الحالية
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-8 rounded-2xl border border-gray-100 overflow-hidden bg-gradient-to-br ${service.gradient} hover:shadow-xl transition-all duration-300`}
                            style={{
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
                            }}
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 pointer-events-none">
                                {service.pattern}
                            </div>

                            {/* Subtle glow effect on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 30% 20%, ${service.accentColor}10 0%, transparent 50%)`
                                }}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon with themed gradient background */}
                                <div
                                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.iconBg} ${service.iconColor} border border-current/10`}
                                >
                                    <service.icon size={26} strokeWidth={1.5} />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-secondary">{service.title}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <Link
                                    href="/services"
                                    className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                    تفاصيل الباقة <ArrowLeft size={16} className="me-2" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
