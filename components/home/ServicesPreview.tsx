"use client";

import { Flame, Home, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
    {
        icon: Flame,
        title: "حزمة إطفاء الحرائق",
        description: "حلول عاجلة تعيد للمشروع توازنه المالي والإداري، وتعالج مشكلات السيولة.",
        color: "bg-red-50 text-red-600",
    },
    {
        icon: Home,
        title: "حزمة ترتيب البيت الداخلي",
        description: "بناء نظام إداري ومالي واضح ومنضبط، ينقل المشروع من العمل الفردي إلى المؤسسي.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: TrendingUp,
        title: "حزمة النمو والتوسع",
        description: "تطوير منظومة التسويق والمبيعات وتحديد فرص النمو وزيادة الربحية.",
        color: "bg-green-50 text-green-600 border border-green-100",
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
                            className="group relative p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                                <service.icon size={28} />
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-secondary">{service.title}</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <Link
                                href="/services"
                                className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                تفاصيل الباقة <ArrowLeft size={16} className="mr-2" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
