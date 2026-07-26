import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { fallbackNavigation, fallbackSiteSettings } from "@/content/fallbacks";
import { controlledLinkHref, isExternalLink } from "@/sanity/lib/links";
import type { Navigation, SiteSettings } from "@/sanity/lib/types";

export function Footer({ navigation = fallbackNavigation, siteSettings = fallbackSiteSettings }: { navigation?: Navigation; siteSettings?: SiteSettings }) {
    const footerLinks = navigation.footerLinks.filter((link) => !link.isHidden);
    const phoneHref = `tel:${siteSettings.telephone}`;
    const whatsappHref = `https://wa.me/${siteSettings.whatsappNumber.replace(/\D/g, "")}`;
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
                            {navigation.footerDescription}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-black text-primary">{navigation.footerLinksHeading}</h2>
                        <nav className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1" aria-label="روابط التذييل">
                            {footerLinks.map((link) => (
                                <Link key={link._key} href={controlledLinkHref(link.destination)} target={isExternalLink(link.destination) ? "_blank" : undefined} rel={isExternalLink(link.destination) ? "noreferrer" : undefined} className="w-fit text-sm font-bold text-secondary/75 transition-colors hover:text-primary">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h2 className="text-sm font-black text-primary">{navigation.footerContactHeading}</h2>
                        <ul className="mt-4 space-y-3 text-sm font-bold text-secondary/75">
                            <li className="flex items-center gap-3">
                                <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                {siteSettings.address}
                            </li>
                            <li>
                                <a href={`mailto:${siteSettings.email}`} className="flex w-fit items-center gap-3 transition-colors hover:text-primary" dir="ltr">
                                    <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                    {siteSettings.email}
                                </a>
                            </li>
                            <li>
                                <a href={phoneHref} className="flex w-fit items-center gap-3 transition-colors hover:text-primary" dir="ltr">
                                    <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                    {siteSettings.telephone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={whatsappHref}
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
                    <p>© {new Date().getFullYear()} {navigation.copyrightWording}</p>
                    <p>{navigation.footerTagline}</p>
                </div>
            </div>
        </footer>
    );
}
