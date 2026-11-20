import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { SITE } from "@/data/site";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { CookieConsent } from "@/components/layout/CookieConsent";
import "./globals.css";

const cormorant = localFont({
  src: [
    {
      path: "./fonts/cormorant.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = localFont({
  src: [
    {
      path: "./fonts/jakarta.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Zaiqa-E-Mehfil | Pakistani & Afghan Restaurant in Harrow, Sudbury Hill",
    template: "%s | Zaiqa-E-Mehfil",
  },
  description:
    "Halal Pakistani, Afghan and Indo-Chinese restaurant on Greenford Road, Sudbury Hill, Harrow. Chapli kebab, Kabuli pulao, nihari, karahi and grill platters. Open daily from 11:30, weekends from 8:00.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GB",
    images: [
      {
        url: "/img/v2/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pakistani, Afghan and Indo-Chinese dishes at Zaiqa-E-Mehfil, Harrow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "geo.region": "GB-HRW",
    "geo.placename": "Harrow, Greater London",
    "geo.position": "51.5574781;-0.3354046",
    ICBM: "51.5574781, -0.3354046",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <Script id="zem-consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
try{if(localStorage.getItem('zem_consent')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`}
        </Script>
      </head>
      <body className="antialiased">
        <Script id="zem-gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${SITE.gtmId}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <a
          href="#main"
          className="fixed left-4 -top-16 focus:top-4 z-[100] bg-gold text-void px-4 py-2.5 rounded-[10px] font-bold transition-all"
        >
          Skip to content
        </a>

        <div className="grain" aria-hidden="true" />

        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileDock />
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
