import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Tajawal } from "next/font/google";
import Script from "next/script";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/preview/DisableDraftMode";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteSettings } from "@/sanity/lib/data";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "سُبُل | لتطوير الأعمال",
  description: "شركة استشارات إدارية ومالية وتشغيلية للشركات الصغيرة والمتوسطة.",
  icons: {
    icon: "/sobol.png",
    shortcut: "/sobol.png",
    apple: "/sobol.png",
  },
};

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
      { "@type": "Organization", name: siteSettings.organizationName, url: siteSettings.publicSiteUrl, email: siteSettings.email, telephone: siteSettings.telephone, address: { "@type": "PostalAddress", addressLocality: siteSettings.address } },
      { "@type": "WebSite", name: siteSettings.organizationName, url: siteSettings.publicSiteUrl, inLanguage: "ar" },
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
        {children}
        <WhatsAppButton siteSettings={siteSettings} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {isDraft && <><VisualEditing /><DisableDraftMode /></>}
      </body>
    </html>
  );
}
