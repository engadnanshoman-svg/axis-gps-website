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
  description: "شركة اكسيس للحلول الهندسية المتقدمة - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و DJI في فلسطين. أحدث أجهزة GPS و RTK والمسح الضوئي وأنظمة مراقبة التحرك و VRS",
  keywords: ["اكسيس", "أجهزة المساحة", "GPS", "RTK", "GIS", "جيوماتكس", "Trimble", "NavVis", "Spectra", "Applanix", "VRS", "توتل ستيشن", "مسح ضوئي", "ليزر", "Machine Control"],
  authors: [{ name: "اكسيس للحلول الهندسية المتقدمة" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "اكسيس | لأجهزة المساحة والجيوماتكس",
    description: "الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و DJI في فلسطين - أحدث أجهزة GPS و RTK والمسح الضوئي و VRS",
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
