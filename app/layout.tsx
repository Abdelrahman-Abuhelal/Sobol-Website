import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YETNBF7FRY"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YETNBF7FRY');
            `,
          }}
        />
      </head>
      <body className={`${tajawal.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
