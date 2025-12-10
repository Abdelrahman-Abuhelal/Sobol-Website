import { Palette, Share2, Megaphone, PenTool, Layout, Target } from "lucide-react";

const services = [
    { icon: Palette, text: "تصميم الشعار والهوية البصرية" },
    { icon: Share2, text: "إدارة صفحات التواصل الاجتماعي" },
    { icon: Megaphone, text: "إدارة الحملات الإعلانية الممولة" },
    { icon: PenTool, text: "كتابة المحتوى والخطط الشهرية" },
    { icon: Layout, text: "التصميم الجرافيكي" },
    { icon: Target, text: "إعداد الخطط التسويقية الاستراتيجية" },
];

export function MarketingServices() {
    return (
        <section className="py-20 bg-secondary text-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">خدماتنا التسويقية</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        نقدم باقة متكاملة من الخدمات التسويقية لتعزيز وجودك الرقمي وبناء هوية تجارية قوية
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                            <s.icon className="w-8 h-8 text-primary" />
                            <span className="text-lg font-medium">{s.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
