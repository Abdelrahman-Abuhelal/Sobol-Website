import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const projects = [
    { name: "الصوباني هوم بلس", category: "استشارات إدارية", result: "إعادة هيكلة مالية ناجحة" },
    { name: "ميرفيلا للتطريز", category: "تسويق رقمي", result: "زيادة المبيعات عبر الإنترنت" },
    { name: "عيادات ألماس", category: "إدارة وتشغيل", result: "تنظيم الحجوزات والعمليات" },
    { name: "عيادات بريميوم", category: "تسويق", result: "بناء هوية بصرية كاملة" },
    { name: "لمار كيك آند سويت", category: "استشارات مالية", result: "ضبط التكاليف والتدفق النقدي" },
    { name: "مكتب د. سناء طوطح", category: "تطوير أعمال", result: "تحسين بيئة العمل" },
    { name: "شركة أحبار الغريب", category: "استشارات", result: "خطة نمو استراتيجية" },
];

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">أعمالنا</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        نماذج من شركاء النجاح الذين سعدنا بالعمل معهم.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, i) => (
                            <div key={i} className="group bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                                {/* Image Placeholder */}
                                <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-400 group-hover:bg-primary/10 transition-colors">
                                    <span className="font-medium">صورة المشروع</span>
                                </div>

                                <div className="p-6">
                                    <div className="text-xs font-semibold text-primary mb-2">{project.category}</div>
                                    <h3 className="text-xl font-bold text-secondary mb-3">{project.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-secondary">النتيجة: </span>
                                        {project.result}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
