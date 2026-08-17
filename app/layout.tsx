import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Tajawal } from "next/font/google";
import Script from "next/script";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/preview/DisableDraftMode";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { WebMcpTools } from "@/components/agent/WebMcpTools";
import { getSiteSettings, getSiteSettingsForMetadata } from "@/sanity/lib/data";
import { editorialImageUrl } from "@/sanity/lib/image";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsForMetadata();
  const base = new URL(settings.publicSiteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  const imageUrl = editorialImageUrl(settings.defaultOpenGraphImage, 1200);

  return {
    metadataBase: base,
    title: settings.defaultSeoTitle,
    description: settings.defaultSeoDescription,
    applicationName: settings.organizationName,
    category: "business consulting",
    creator: settings.organizationName,
    publisher: settings.organizationName,
    referrer: "origin-when-cross-origin",
    verification: {
      google: "Zyrp7vAEDCb9aXprTcR37NdwdvyqymgW3DnCRGY5zIM",
    },
    icons: { icon: "/sobol.png", shortcut: "/sobol.png", apple: "/sobol.png" },
    openGraph: {
      type: "website",
      locale: "ar_PS",
      siteName: settings.organizationName,
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      images: imageUrl ? [{ url: imageUrl, alt: settings.organizationName }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const isDraft = (await draftMode()).isEnabled;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteSettings.publicSiteUrl.replace(/\/$/, "")}/#organization`,
        name: siteSettings.organizationName,
        url: siteSettings.publicSiteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteSettings.publicSiteUrl.replace(/\/$/, "")}/logo_tr.png`,
        },
        description: siteSettings.defaultSeoDescription,
        email: siteSettings.email,
        telephone: siteSettings.telephone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteSettings.address,
          addressCountry: "PS",
        },
        areaServed: { "@type": "Country", name: "فلسطين" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteSettings.telephone,
          email: siteSettings.email,
          contactType: "customer service",
          availableLanguage: ["ar"],
        },
        knowsAbout: [
          "الاستشارات الإدارية",
          "الاستشارات المالية",
          "تطوير العمليات",
          "نمو الأعمال",
          "التسويق",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteSettings.publicSiteUrl.replace(/\/$/, "")}/#website`,
        name: siteSettings.organizationName,
        url: siteSettings.publicSiteUrl,
        inLanguage: "ar-PS",
        publisher: { "@id": `${siteSettings.publicSiteUrl.replace(/\/$/, "")}/#organization` },
      },
    ],
  };
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-YETNBF7FRY"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YETNBF7FRY');
            `}
        </Script>
      </head>
      <body className={`${tajawal.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <WebMcpTools />
        {children}
        <WhatsAppButton siteSettings={siteSettings} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {isDraft && <><VisualEditing /><DisableDraftMode /></>}
      </body>
    </html>
  );
}
