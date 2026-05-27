import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Databuddy } from "@databuddy/sdk/react";
import { buildMetadata, organizationJsonLd } from "@/lib/metadata";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Analytics />
        <Databuddy
          clientId="4511d702-22d2-44c9-aac8-5fe949d3222a"
          trackAttributes={true}
          trackOutgoingLinks={true}
          trackInteractions={true}
          trackWebVitals={true}
          trackErrors={true}
        />
        <Script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-site-id={process.env.NEXT_PUBLIC_DATABUDDY_SITE_ID}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
