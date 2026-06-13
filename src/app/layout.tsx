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
  title: "اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS",
  description: "شركة اكسيس للحلول الهندسية المتقدمة - الوكيل الحصري لشركتي Spectra و Nikon في فلسطين. أحدث أجهزة GPS و RTK والمسح الضوئي وأنظمة مراقبة التحرك",
  keywords: ["اكسيس", "أجهزة المساحة", "GPS", "RTK", "GIS", "جيوماتكس", "Spectra", "Nikon", "توتل ستيشن", "مسح ضوئي"],
  authors: [{ name: "اكسيس للحلول الهندسية المتقدمة" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "اكسيس | لأجهزة المساحة والجيوماتكس",
    description: "الوكيل الحصري لشركتي Spectra و Nikon في فلسطين - أحدث أجهزة GPS و RTK والمسح الضوئي",
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
