import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function CTA() {
    return (
        <section className="py-20 bg-primary/10">
            <div className="container px-4 md:px-6 mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                    ابدأ رحلتك نحو التميز الإداري الآن
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    لا تترك التحديات تعيق نمو مشروعك. دعنا نساعدك في وضع مشروعك على المسار الصحيح.
                </p>
                <Link href="/contact">
                    <Button size="lg" className="text-lg px-8 h-14">
                        احجز استشارتك المجانية
                        <ArrowLeft className="me-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}
