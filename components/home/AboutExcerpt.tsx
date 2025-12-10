import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function AboutExcerpt() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">من نحن؟</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            سُبُل لتطوير الأعمال هي شركة استشارات فلسطينية ناشئة متخصصة في تمكين المشاريع الصغيرة والمتوسطة،
                            خصوصاً العائلية منها، من خلال حلول واقعية قابلة للتطبيق، بعيداً عن الأساليب النظرية غير العملية.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            نرافق عملاءنا خطوة بخطوة لنضمن تحقيق نتائج ملموسة في إدارة المشروع، تنظيم عملياته،
                            تعزيز كفاءته، وزيادة قدرته على النمو المستدام.
                        </p>

                        <ul className="space-y-3 pt-4">
                            {[
                                "حلول عملية قابلة للتطبيق",
                                "فهم عميق للسياق الفلسطيني",
                                "نتائج ملموسة بعيداً عن التنظير"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                                    <span className="text-secondary font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6">
                            <Link href="/about">
                                <Button variant="default">اقرأ المزيد عن سُبُل</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Image/Visual Placeholder */}
                    <div className="flex-1 w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        {/* In a real scenario, this would be an image tag */}
                        <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
                            <span className="text-muted-foreground font-medium">صورة عن الشركة / الفريق</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
