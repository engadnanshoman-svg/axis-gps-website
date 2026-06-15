import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS & Surveying Instruments",
    template: "%s | اكسيس - AXIS GPS",
  },
  description: "شركة اكسيس للحلول الهندسية المتقدمة - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta. أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد وأنظمة مراقبة التحرك و VRS. 4 فروع رئيسية في كفر كنا وكفر قاسم ورام الله والخليل.",
  keywords: [
    "اكسيس", "AXIS GPS", "أجهزة المساحة", "GPS", "RTK", "GIS", "جيوماتكس",
    "Trimble", "NavVis", "Spectra", "Applanix", "Kaarta", "VRS",
    "توتل ستيشن", "مسح ضوئي", "ليزر", "Machine Control",
    "surveying instruments", "3D laser scanning", "total station",
    "surveying equipment", "GNSS receiver", "laser scanner",
    "mobile mapping", "GPS survey", "land surveying", "geomatics",
    "axis gps surveying", "axis surveying instruments",
  ],
  authors: [{ name: "اكسيس للحلول الهندسية المتقدمة", url: "https://axis-gps.com" }],
  creator: "AXIS GPS & Surveying Instruments",
  publisher: "AXIS GPS & Surveying Instruments",
  metadataBase: new URL('https://axis-gps.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ar': '/',
      'en': '/',
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32" },
      { url: "/logo.png", sizes: "192x192" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS",
    description: "الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta - أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد و VRS. 4 فروع في جميع أنحاء البلاد.",
    type: "website",
    locale: 'ar_PS',
    alternateLocale: ['en_US', 'ar_IL'],
    url: 'https://axis-gps.com',
    siteName: 'اكسيس - AXIS GPS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'اكسيس للحلول الهندسية المتقدمة - AXIS GPS & Surveying Instruments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS',
    description: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta - أحدث أجهزة GPS و RTK',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Surveying Equipment & GPS Solutions',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data: Organization (JSON-LD)
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'اكسيس للحلول الهندسية المتقدمة',
    alternateName: ['AXIS GPS & Surveying Instruments', 'Axis GPS', 'اكسيس'],
    url: 'https://axis-gps.com',
    logo: 'https://axis-gps.com/logo.png',
    description: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta - أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد و VRS',
    foundingDate: '2004',
    telephone: ['+972-4-641-9995', '+972-52-528-9999'],
    email: 'info@axis-gps.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Tziporit Industrial Zone, HaSadna St',
        addressLocality: 'Nof HaGalil',
        addressCountry: 'IL',
        name: 'الفرع الرئيسي - تسيفوريت',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'شارع علي بن أبي طالب 2',
        addressLocality: 'كفر قاسم',
        addressCountry: 'IL',
        name: 'فرع الشمال - كفر قاسم',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'شارع الإرسال قرب السفينة',
        addressLocality: 'رام الله',
        addressCountry: 'PS',
        name: 'فرع رام الله',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'شارع عين سارة مقابل ستاد الحسين',
        addressLocality: 'الخليل',
        addressCountry: 'PS',
        name: 'فرع الخليل',
      },
    ],
    sameAs: [
      'https://www.facebook.com/axisTRIMBLE',
      'https://www.instagram.com/axis.gps/',
      'https://www.youtube.com/@axisgpssurveyinginstrument8400',
    ],
    brand: [
      { '@type': 'Brand', name: 'Trimble' },
      { '@type': 'Brand', name: 'NavVis' },
      { '@type': 'Brand', name: 'Spectra Precision' },
      { '@type': 'Brand', name: 'Applanix' },
      { '@type': 'Brand', name: 'Kaarta' },
    ],
  };

  // Structured data: LocalBusiness (JSON-LD)
  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://axis-gps.com#business',
    name: 'اكسيس للحلول الهندسية المتقدمة',
    alternateName: 'AXIS GPS & Surveying Instruments',
    image: 'https://axis-gps.com/logo.png',
    url: 'https://axis-gps.com',
    telephone: '+972-4-641-9995',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tziporit Industrial Zone, HaSadna St',
      addressLocality: 'Nof HaGalil',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.7579702,
      longitude: 35.3189103,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '85',
    },
  };

  // Structured data: WebSite with search action (JSON-LD)
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'اكسيس للحلول الهندسية المتقدمة',
    alternateName: 'AXIS GPS',
    url: 'https://axis-gps.com',
    inLanguage: ['ar', 'en'],
    potentialAction: {
      '@type': 'ReadAction',
      target: 'https://axis-gps.com',
    },
  };

  // Structured data: BreadcrumbList (JSON-LD)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: 'https://axis-gps.com',
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://sfile.chatglm.cn" />

        {/* JSON-LD Structured Data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Theme init script: auto-detect based on time + system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('axis-theme-mode');
                  if (saved && saved !== 'auto') {
                    document.documentElement.setAttribute('data-theme', saved);
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark !== undefined) {
                      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                    } else {
                      var hour = new Date().getHours();
                      document.documentElement.setAttribute('data-theme', (hour >= 6 && hour < 18) ? 'light' : 'dark');
                    }
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased bg-background text-foreground"
        style={{ fontFamily: "'Cairo', 'Inter', 'Segoe UI', 'Noto Sans Arabic', Tahoma, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
