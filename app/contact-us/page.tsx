import { buildMetadata } from "@/lib/metadata";
import ContactForm from "@/components/contact/ContactForm";
import FaqAccordion from "@/components/contact/FaqAccordion";
import { organizationJsonLd } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the Law x Tech team. We'd love to hear from you — whether you want to join, speak, or partner with us.",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Law x Tech for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Law x Tech is for lawyers, law students, and legal professionals who want to understand technology and build careers at the intersection of law and tech.",
      },
    },
    {
      "@type": "Question",
      name: "How do I join the community?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click the 'Join Community' button on our website to fill out our registration form and receive an invitation to our Slack community.",
      },
    },
    {
      "@type": "Question",
      name: "Are the series sessions free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — all Law x Tech Series and Mini Series sessions are free for community members.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-white py-20 border-b border-border-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-teal text-sm font-semibold uppercase tracking-widest">
            Reach Out
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-navy tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-5 text-muted-brand text-base leading-relaxed">
            Have a question, partnership idea, or just want to say hello? We
            read every message and get back to all inquiries within 48 hours.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 bg-teal rounded-full" />
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-navy mb-8">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-2">
              <div className="bg-navy rounded-2xl p-8 text-white h-fit sticky top-24">
                <h3 className="text-lg font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@lawxtech.org"
                      className="text-white hover:text-teal transition-colors text-sm"
                    >
                      info@lawxtech.org
                    </a>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+2349099030433"
                      className="text-white hover:text-teal transition-colors text-sm"
                    >
                      +234 909 903 0433
                    </a>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
                      Location
                    </p>
                    <p className="text-white text-sm">Lagos, Nigeria</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
                      Follow Us
                    </p>
                    <div className="flex gap-3">
                      {[
                        { label: "Twitter", href: "https://twitter.com/lawxtech" },
                        { label: "LinkedIn", href: "https://www.linkedin.com/company/lawxtech" },
                        { label: "Instagram", href: "https://www.instagram.com/lawxtech" },
                      ].map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-teal text-white text-xs font-medium transition-colors"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion />
    </>
  );
}
