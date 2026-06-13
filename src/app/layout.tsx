import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "اكسيس | للحلول الهندسية المتقدمة",
  description: "شركة اكسيس للحلول الهندسية المتقدمة - نقدم حلولاً هندسية مبتكرة ومتطورة تلبي احتياجات المشاريع الكبرى بأعلى معايير الجودة والكفاءة",
  keywords: ["اكسيس", "حلول هندسية", "هندسة متقدمة", "استشارات هندسية", "تصميم إنشائي", "إدارة مشاريع"],
  authors: [{ name: "اكسيس للحلول الهندسية المتقدمة" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "اكسيس | للحلول الهندسية المتقدمة",
    description: "حلول هندسية مبتكرة ومتطورة تلبي احتياجات المشاريع الكبرى",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "'Geist', 'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
