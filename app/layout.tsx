import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "سُبُل | لتطوير الأعمال",
  description: "شركة استشارات إدارية ومالية وتشغيلية للشركات الصغيرة والمتوسطة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${tajawal.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
