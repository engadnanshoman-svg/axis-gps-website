import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS & Surveying Instruments",
  description: "شركة اكسيس للحلول الهندسية المتقدمة - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta. أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد وأنظمة مراقبة التحرك و VRS. 4 فروع في جميع أنحاء البلاد.",
  keywords: ["اكسيس", "AXIS GPS", "أجهزة المساحة", "GPS", "RTK", "GIS", "جيوماتكس", "Trimble", "NavVis", "Spectra", "Applanix", "Kaarta", "VRS", "توتل ستيشن", "مسح ضوئي", "ليزر", "Machine Control", "surveying instruments", "3D laser scanning", "total station"],
  authors: [{ name: "اكسيس للحلول الهندسية المتقدمة" }],
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
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS",
    description: "الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta - أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد و VRS",
    type: "website",
    locale: 'ar_PS',
    alternateLocale: 'en_US',
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
    description: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'technology',
  classification: 'Surveying Equipment & GPS Solutions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for Google rich results (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'اكسيس للحلول الهندسية المتقدمة',
    alternateName: 'AXIS GPS & Surveying Instruments',
    url: 'https://axis-gps.com',
    logo: 'https://axis-gps.com/logo.png',
    description: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta - أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد',
    foundingDate: '2004',
    telephone: '+972-4-641-9995',
    email: 'info@axis-gps.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'הסדנא, Tziporit Industrial Zone',
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
        streetAddress: 'شارع الإرسال',
        addressLocality: 'رام الله',
        addressCountry: 'PS',
        name: 'فرع رام الله',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'شارع عين سارة',
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
      { '@type': 'Brand', name: 'Spectra' },
      { '@type': 'Brand', name: 'Applanix' },
      { '@type': 'Brand', name: 'Kaarta' },
    ],
  };

  const localBusinessJsonLd = {
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '17:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '85',
    },
  };

  return (
    <html lang="ar" dir="rtl" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* Theme init script: auto-detect based on time + system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Check if user has manually set a preference
                  var saved = localStorage.getItem('axis-theme');
                  if (saved === 'light' || saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', saved);
                    return;
                  }
                  // Auto-detect: use system preference, or time-based
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDark !== undefined) {
                    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                  } else {
                    // Fallback: time-based (6am-6pm = light, 6pm-6am = dark)
                    var hour = new Date().getHours();
                    var autoTheme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
                    document.documentElement.setAttribute('data-theme', autoTheme);
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
