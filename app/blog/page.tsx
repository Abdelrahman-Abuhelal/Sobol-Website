import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">المدونة</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        مقالات ونصائح إدارية لمساعدتك في رحلة النجاح.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-md mx-auto bg-gray-50 p-12 rounded-2xl border">
                        <h3 className="text-xl font-bold text-secondary mb-4">قريباً...</h3>
                        <p className="text-muted-foreground mb-6">نعمل حالياً على إعداد محتوى قيم ومفيد لكم.</p>
                        <Button variant="outline" disabled>
                            انتظرونا
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
