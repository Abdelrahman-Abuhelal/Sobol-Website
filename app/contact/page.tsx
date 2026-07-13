"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        setStatus("sending");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "تعذر إرسال الطلب.");
            }

            setStatus("success");
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "تعذر إرسال الطلب.");
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <PageIntro
                eyebrow="تواصل معنا"
                title="ابدأ من التحدي الأهم."
                description="شاركنا احتياج مشروعك، وسيتواصل معك فريق سُبُل لفهم الحالة وتحديد الخطوة المناسبة."
                image={{
                    src: "/images/page-intros/contact.webp",
                    alt: "جلسة استشارة هادئة بين صاحب مشروع ومستشار",
                }}
            />

            <section className="py-16 sm:py-20 lg:py-24">
                <div className="container-custom grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
                    <aside>
                        <p className="text-sm font-bold text-primary">قنوات التواصل</p>
                        <h2 className="mt-3 text-3xl font-black text-secondary">نحن قريبون منك.</h2>
                        <p className="mt-4 leading-7 text-muted-foreground">
                            اختر القناة الأنسب، أو أرسل تفاصيل المشروع عبر النموذج.
                        </p>
                        <ul className="mt-8 space-y-4 border-y border-[oklch(0.86_0.025_190)] py-5 text-sm font-bold text-secondary/75">
                            <li>
                                <a href="mailto:info@sobol.ps" className="flex w-fit items-center gap-3 transition-colors hover:text-primary" dir="ltr">
                                    <Mail className="size-4 text-primary" aria-hidden="true" />
                                    info@sobol.ps
                                </a>
                            </li>
                            <li>
                                <a href="tel:+970568060330" className="flex w-fit items-center gap-3 transition-colors hover:text-primary" dir="ltr">
                                    <Phone className="size-4 text-primary" aria-hidden="true" />
                                    +970 56 806 0330
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/970568060330" target="_blank" rel="noreferrer" className="flex w-fit items-center gap-3 transition-colors hover:text-primary">
                                    <MessageCircle className="size-4 text-primary" aria-hidden="true" />
                                    واتساب
                                </a>
                            </li>
                        </ul>
                    </aside>

                    <div>
                    {status !== "success" ? (
                        <div className="rounded-[2rem] border border-[oklch(0.86_0.025_190)] bg-[oklch(0.995_0.004_175)] p-6 shadow-[0_20px_60px_oklch(0.36_0.055_210/0.08)] sm:p-9">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="pointer-events-none absolute size-px overflow-hidden opacity-0" aria-hidden="true">
                                    <label htmlFor="website">الموقع الإلكتروني</label>
                                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">الاسم الكامل</label>
                                        <input type="text" id="name" name="name" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">رقم الهاتف</label>
                                        <input type="tel" id="phone" name="phone" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-sm font-medium text-gray-700">اسم الشركة / المشروع</label>
                                    <input type="text" id="company" name="company" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="service" className="text-sm font-medium text-gray-700">نوع الخدمة المطلوبة</label>
                                    <select id="service" name="service" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white font-sans" defaultValue="">
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
                                    <textarea id="message" name="message" rows={4} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"></textarea>
                                </div>

                                <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={status === "sending"}>
                                    {status === "sending" ? "جارٍ الإرسال..." : "إرسال الطلب"}
                                </Button>

                                {status === "error" && (
                                    <p className="text-center text-sm font-medium text-red-700" role="alert">
                                        {errorMessage}
                                    </p>
                                )}
                            </form>
                        </div>
                    ) : (
                        <div className="rounded-[2rem] border border-[oklch(0.84_0.045_150)] bg-[oklch(0.96_0.035_150)] py-12 text-center">
                            <h3 className="text-2xl font-bold text-green-800 mb-2">شكراً لك!</h3>
                            <p className="text-green-700">تم إرسال طلبك إلى فريق سُبُل، وسنتواصل معك قريباً.</p>
                            <Button onClick={() => setStatus("idle")} variant="ghost" className="mt-6 text-green-700 hover:text-green-800 hover:bg-green-100">
                                إرسال طلب آخر
                            </Button>
                        </div>
                    )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
