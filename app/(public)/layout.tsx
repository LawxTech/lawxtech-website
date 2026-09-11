import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Databuddy } from "@databuddy/sdk/react";
import { organizationJsonLd } from "@/lib/metadata";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <div className="min-h-screen flex flex-col">
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
      </div>
    </>
  );
}
