"use client";

import { motion } from "framer-motion";
import { HelpCircle, TrendingDown, Users, AlertTriangle } from "lucide-react";

const painPoints = [
    {
        icon: AlertTriangle,
        question: "كم مرة شعرت أن مشروعك يتعبك أكثر مما يفيدك؟",
    },
    {
        icon: TrendingDown,
        question: "حسابات المشروع المالية غير منضبطة؟ نظامك المحاسبي مش واضح؟",
    },
    {
        icon: Users,
        question: "الفريق مش منسجم أو لا يطوّر من حاله؟",
    },
    {
        icon: HelpCircle,
        question: "هل هناك مشاكل وتحديات تواجه المشروع ولا تعرف من أين تبدأ؟",
    },
];

export function PainPoints() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-accent/20">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                        هل تواجه هذه التحديات؟
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        إذا كانت إجابتك "نعم" على أي من هذه الأسئلة، فأنت في المكان الصحيح
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                    {painPoints.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div
                                className="p-6 rounded-2xl bg-accent/40 border border-primary/10 hover:border-primary/25 hover:bg-accent/60 transition-all duration-300 h-full"
                                style={{
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
                                }}
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className="shrink-0 w-12 h-12 rounded-xl bg-white border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors duration-300"
                                        style={{
                                            boxShadow: '0 2px 8px rgba(56, 116, 120, 0.1)'
                                        }}
                                    >
                                        <item.icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-lg font-medium text-secondary leading-relaxed">
                                        {item.question}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <div
                        className="inline-block px-8 py-4 bg-primary rounded-full"
                        style={{
                            boxShadow: '0 8px 24px rgba(56, 116, 120, 0.3)'
                        }}
                    >
                        <p className="text-white font-semibold text-lg">
                            في سُبُل، نقدّم لك حلولاً عملية من واقعك وبيئتك 💡
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
