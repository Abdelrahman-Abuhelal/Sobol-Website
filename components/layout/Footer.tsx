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
        <footer className="relative isolate overflow-hidden border-t border-secondary/10 bg-[oklch(0.205_0.052_232)] text-secondary-foreground">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_15%,oklch(0.42_0.09_184/0.28),transparent_30rem)]" aria-hidden="true" />
            <div className="container-custom py-14 sm:py-16 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr_0.9fr] lg:gap-20">
                    <div className="max-w-lg">
                        <Link href="/" className="group inline-flex items-center gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-4 focus-visible:ring-offset-secondary">
                            <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary-light p-2 shadow-[0_14px_30px_oklch(0.12_0.035_232/0.3)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                                <Image
                                    src="/logo_tr.png"
                                    alt=""
                                    fill
                                    sizes="64px"
                                    className="scale-[1.3] object-contain p-2"
                                />
                            </span>
                            <span>
                                <span className="block text-lg font-extrabold text-secondary-foreground">{siteSettings.organizationName}</span>
                                <span className="mt-1 block text-xs font-semibold text-primary-light">{navigation.footerTagline}</span>
                            </span>
                        </Link>
                        <p className="mt-6 max-w-[34rem] text-sm leading-8 text-secondary-foreground/72 sm:text-base">
                            {navigation.footerDescription}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-extrabold text-primary-light">{navigation.footerLinksHeading}</h2>
                        <nav className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1" aria-label="روابط التذييل">
                            {footerLinks.map((link) => (
                                <Link key={link._key} href={controlledLinkHref(link.destination)} target={isExternalLink(link.destination) ? "_blank" : undefined} rel={isExternalLink(link.destination) ? "noreferrer" : undefined} className="w-fit rounded text-sm font-semibold text-secondary-foreground/74 transition-[color,transform] duration-200 hover:-translate-x-0.5 hover:text-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h2 className="text-sm font-extrabold text-primary-light">{navigation.footerContactHeading}</h2>
                        <ul className="mt-5 space-y-4 text-sm font-semibold text-secondary-foreground/74">
                            <li className="flex items-center gap-3" dir="rtl">
                                <MapPin className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
                                <span>{siteSettings.address}</span>
                            </li>
                            <li>
                                <a href={`mailto:${siteSettings.email}`} className="flex w-fit items-center gap-3 transition-colors hover:text-primary-light" dir="rtl">
                                    <Mail className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
                                    <span dir="ltr">{siteSettings.email}</span>
                                </a>
                            </li>
                            <li>
                                <a href={phoneHref} className="flex w-fit items-center gap-3 transition-colors hover:text-primary-light" dir="rtl">
                                    <Phone className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
                                    <span dir="ltr">{siteSettings.telephone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex w-fit items-center gap-3 transition-colors hover:text-primary-light"
                                    dir="rtl"
                                >
                                    <MessageCircle className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
                                    واتساب
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-secondary-foreground/14 pt-6 text-xs leading-6 text-secondary-foreground/52 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} {navigation.copyrightWording}</p>
                    <p className="text-primary-light/72">{navigation.footerTagline}</p>
                </div>
            </div>
        </footer>
    );
}
