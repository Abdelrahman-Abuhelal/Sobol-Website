"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    { name: "خدماتنا", href: "/services" },
    { name: "أعمالنا", href: "/portfolio" },
    { name: "المدونة", href: "/blog" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-[oklch(0.88_0.02_190)] bg-[oklch(0.995_0.004_175/0.96)] backdrop-blur-md">
            <div className="container-custom">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo_tr.png"
                                alt="سُبُل - لتطوير الأعمال"
                                width={100}
                                height={50}
                                className="h-12 w-auto"
                                priority
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    className={`relative px-1 py-2 text-base font-bold transition-colors after:absolute after:inset-x-1 after:-bottom-[1.15rem] after:h-0.5 after:bg-primary after:transition-transform ${pathname === link.href ? "text-secondary after:scale-x-100" : "text-secondary/60 after:scale-x-0 hover:text-primary"}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <Link
                                href="/contact"
                                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-[oklch(0.43_0.08_187)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                            >
                                احجز استشارة
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="border-t border-[oklch(0.9_0.018_190)] bg-background md:hidden"
                    >
                        <div className="flex flex-col space-y-4 p-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    className={`text-base font-bold ${pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/contact" onClick={() => setIsOpen(false)}>
                                <span className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground">
                                    اطلب استشارة
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
