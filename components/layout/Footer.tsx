import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const footerLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about" },
    { label: "خدماتنا", href: "/services" },
    { label: "أعمالنا", href: "/portfolio" },
    { label: "المدونة", href: "/blog" },
];

export function Footer() {
    return (
        <footer className="border-t border-[oklch(0.86_0.025_190)] bg-[oklch(0.965_0.018_178)] text-secondary">
            <div className="container-custom py-12 sm:py-14">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.65fr_1fr] lg:gap-16">
                    <div className="max-w-md">
                        <Link href="/" className="inline-flex focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                            <Image
                                src="/logo_tr.png"
                                alt="سُبُل لتطوير الأعمال"
                                width={120}
                                height={60}
                                className="h-14 w-auto"
                            />
                        </Link>
                        <p className="mt-5 text-sm leading-7 text-[oklch(0.43_0.035_210)] sm:text-base">
                            شريك فلسطيني لتطوير الأعمال، يساعد المشاريع على التنظيم والاستقرار والنمو بخطوات عملية.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-black text-primary">روابط الموقع</h2>
                        <nav className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1" aria-label="روابط التذييل">
                            {footerLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="w-fit text-sm font-bold text-secondary/75 transition-colors hover:text-primary">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h2 className="text-sm font-black text-primary">تواصل معنا</h2>
                        <ul className="mt-4 space-y-3 text-sm font-bold text-secondary/75">
                            <li className="flex items-center gap-3">
                                <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                فلسطين، رام الله
                            </li>
                            <li>
                                <a href="mailto:info@sobol.ps" className="flex w-fit items-center gap-3 transition-colors hover:text-primary" dir="ltr">
                                    <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                    info@sobol.ps
                                </a>
                            </li>
                            <li>
                                <a href="tel:+970568060330" className="flex w-fit items-center gap-3 transition-colors hover:text-primary" dir="ltr">
                                    <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                    +970 56 806 0330
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/970568060330"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-fit items-center gap-3 transition-colors hover:text-primary"
                                >
                                    <MessageCircle className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                    واتساب
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-2 border-t border-[oklch(0.86_0.025_190)] pt-6 text-xs text-secondary/55 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} شركة سُبُل للاستشارات. جميع الحقوق محفوظة.</p>
                    <p>وضوح في القرار، ثبات في النمو.</p>
                </div>
            </div>
        </footer>
    );
}
