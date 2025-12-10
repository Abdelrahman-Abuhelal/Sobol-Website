import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-secondary text-secondary-foreground py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">سُبُل</h3>
                        <p className="text-sm text-gray-300">
                            شركاؤك في تطوير الأعمال وصناعة النجاح. نقدّم حلولاً عملية للمشاريع الصغيرة والمتوسطة.
                        </p>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <Link href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">روابط سريعة</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/" className="hover:text-white">الرئيسية</Link></li>
                            <li><Link href="/about" className="hover:text-white">من نحن</Link></li>
                            <li><Link href="/services" className="hover:text-white">خدماتنا</Link></li>
                            <li><Link href="/portfolio" className="hover:text-white">أعمالنا</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">خدماتنا</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/services" className="hover:text-white">إطفاء الحرائق</Link></li>
                            <li><Link href="/services" className="hover:text-white">ترتيب البيت الداخلي</Link></li>
                            <li><Link href="/services" className="hover:text-white">النمو والتوسع</Link></li>
                            <li><Link href="/services" className="hover:text-white">الخدمات التسويقية</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4 text-white">تواصل معنا</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>فلسطين، رام الله</li>
                            <li>info@sobol.ps</li>
                            <li>+970 59 000 0000</li>
                        </ul>
                    </div>

                </div>
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} شركة سُبُل للاستشارات. جميع الحقوق محفوظة.
                </div>
            </div>
        </footer>
    );
}
