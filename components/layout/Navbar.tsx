"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CalendarCheck, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fallbackNavigation } from "@/content/fallbacks";
import { controlledLinkHref, isExternalLink } from "@/sanity/lib/links";
import type { Navigation } from "@/sanity/lib/types";

export function Navbar({ navigation = fallbackNavigation }: { navigation?: Navigation }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const navLinks = navigation.headerLinks.filter((link) => !link.isHidden).map((link) => ({ name: link.label, href: controlledLinkHref(link.destination), external: isExternalLink(link.destination) }));
    const headerCtaHref = controlledLinkHref(navigation.headerCta);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/80 bg-surface/92 shadow-[0_8px_30px_oklch(0.255_0.055_232/0.035)] backdrop-blur-xl">
            <div className="container-custom">
                <div className="flex h-[5.25rem] items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo_tr.png"
                                alt="سُبُل - لتطوير الأعمال"
                                width={64}
                                height={64}
                                className="h-14 w-14 object-contain md:h-16 md:w-16"
                                priority
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden items-center gap-8 md:flex lg:gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noreferrer" : undefined}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    className={`relative px-1 py-2 text-[0.93rem] font-semibold transition-colors after:absolute after:inset-x-1 after:-bottom-[1.25rem] after:h-0.5 after:origin-right after:bg-primary after:transition-transform ${pathname === link.href ? "text-secondary after:scale-x-100" : "text-secondary/68 after:scale-x-0 hover:text-primary"}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <Link
                                href={headerCtaHref}
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-[0_10px_24px_oklch(0.44_0.095_184/0.18)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[oklch(0.39_0.09_184)] hover:shadow-[0_14px_28px_oklch(0.44_0.095_184/0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                            >
                                <CalendarCheck className="size-4" strokeWidth={1.9} aria-hidden="true" />
                                {navigation.headerCta.label}
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
                        className="border-t border-border/75 bg-surface md:hidden"
                    >
                        <div className="flex flex-col gap-1 p-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noreferrer" : undefined}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    className={`rounded-xl px-3 py-3 text-base font-bold ${pathname === link.href ? "bg-primary-soft/70 text-primary" : "text-foreground hover:bg-surface-muted hover:text-primary"}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link href={headerCtaHref} onClick={() => setIsOpen(false)} className="mt-3">
                                <span className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground">
                                    <CalendarCheck className="size-4" strokeWidth={1.9} aria-hidden="true" />
                                    {navigation.mobileHeaderCtaLabel}
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
