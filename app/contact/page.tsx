"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you would typically integrate with an email service or backend
    };

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">اطلب استشارة</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        هل تواجه تحديات في مشروعك؟ املأ النموذج وسنتواصل معك قريباً.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-2xl">
                    {!submitted ? (
                        <div className="bg-white p-8 rounded-3xl border shadow-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">الاسم الكامل</label>
                                        <input type="text" id="name" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">رقم الهاتف</label>
                                        <input type="tel" id="phone" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm font-medium text-gray-700">اسم الشركة / المشروع</label>
                                    <input type="text" id="company" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="service" className="text-sm font-medium text-gray-700">نوع الخدمة المطلوبة</label>
                                    <select id="service" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white font-sans" defaultValue="">
                                        <option value="" disabled>اختر الخدمة...</option>
                                        <option value="firefighting">استشارة إطفاء الحرائق</option>
                                        <option value="structuring">استشارة ترتيب البيت الداخلي</option>
                                        <option value="growth">استشارة النمو والتوسع</option>
                                        <option value="marketing">استشارة تسويق</option>
                                        <option value="other">أخرى</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700">تفاصيل إضافية</label>
                                    <textarea id="message" rows={4} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"></textarea>
                                </div>

                                <Button type="submit" size="lg" className="w-full h-12 text-lg">
                                    إرسال الطلب
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-green-50 rounded-3xl border border-green-100">
                            <h3 className="text-2xl font-bold text-green-800 mb-2">شكراً لك!</h3>
                            <p className="text-green-700">تم استلام طلبك بنجاح، وسيقوم فريقنا بالتواصل معك قريباً.</p>
                            <Button onClick={() => setSubmitted(false)} variant="ghost" className="mt-6 text-green-700 hover:text-green-800 hover:bg-green-100">
                                إرسال طلب آخر
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
