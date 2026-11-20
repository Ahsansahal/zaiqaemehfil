import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { Reveal } from "@/components/motion/Primitives";

export const metadata: Metadata = {
  title: "Privacy & Cookies",
  description:
    "How Zaiqa-E-Mehfil uses the details you give us when you book a table, and how we use cookies.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Privacy", item: `${SITE.url}/privacy` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden pt-[clamp(7rem,12vw,9rem)] pb-[clamp(2.6rem,5vw,4rem)] border-b border-[rgba(240,234,222,0.06)] before:content-[''] before:absolute before:-top-[40%] before:-right-[10%] before:w-[min(640px,80vw)] before:aspect-square before:bg-[radial-gradient(circle,rgba(227,197,111,0.09)_0%,transparent_62%)] before:pointer-events-none">
        <div className="relative max-w-[96%] mx-auto px-5 lg:px-10">
          <Reveal y={18}>
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)]">
              Privacy
            </span>
            <h1 className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] mt-5 text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[0.96]">
              Privacy &amp; <em className="italic font-normal text-gold">cookies</em>
            </h1>
            <p className="mt-5 max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light">
              How {SITE.legalName} uses the details you give us on this website. Last updated 2
              October 2026.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-[clamp(3.6rem,8vw,7rem)]">
        <div className="max-w-[96%] mx-auto px-5 lg:px-10">
          <div className="max-w-[68ch] space-y-4 text-base leading-[1.72] text-fg-soft">
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] text-fg font-semibold leading-[1.1] mt-0 mb-3">
              Who we are
            </h2>
            <p>
              {SITE.legalName} ({SITE.address.full}) is responsible for the personal data collected
              on this website. You can contact us at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-gold border-b border-[rgba(227,197,111,0.4)] hover:border-gold"
              >
                {SITE.email}
              </a>{" "}
              or on{" "}
              <a
                href={`tel:${SITE.tel}`}
                className="text-gold border-b border-[rgba(227,197,111,0.4)] hover:border-gold"
              >
                {SITE.phone}
              </a>
              .
            </p>

            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] text-fg font-semibold leading-[1.1] pt-6 mb-3">
              Booking and catering requests
            </h2>
            <p>
              When you send a table or catering request we receive your name, phone number, email
              address (if you give one) and the details of your booking. We use them only to reply to
              you and manage your booking. The form is delivered to our email inbox through
              FormSubmit, a form-to-email service, and stored in our email account (Google).
            </p>
            <p>
              Our lawful basis is taking steps at your request before providing a service, and our
              legitimate interest in running bookings. We keep booking emails for no longer than we
              need them &mdash; normally up to 12 months &mdash; and never sell your details or use
              them for marketing without your permission.
            </p>

            <h2
              id="cookies"
              className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] text-fg font-semibold leading-[1.1] pt-6 mb-3 scroll-mt-28"
            >
              Cookies and measurement
            </h2>
            <p>
              We remember your cookie choice in your browser so we don&rsquo;t ask again. If you
              click <b className="text-fg">Accept</b>, we also use Google Tag Manager, Google
              Analytics and Google Ads cookies to understand which adverts lead people to call us,
              get directions or book. If you click <b className="text-fg">Reject</b>, these cookies
              are not set; Google may receive limited, cookieless signals without identifiers
              (Google Consent Mode).
            </p>
            <p>
              You can change your mind at any time with the{" "}
              <b className="text-fg">Cookie settings</b> link at the bottom of every page.
            </p>

            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] text-fg font-semibold leading-[1.1] pt-6 mb-3">
              Your rights
            </h2>
            <p>
              You can ask to see, correct or delete the personal data we hold about you, or object
              to how we use it, by emailing us. If you&rsquo;re unhappy with how we handle your data
              you can complain to the Information Commissioner&rsquo;s Office at{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold border-b border-[rgba(227,197,111,0.4)] hover:border-gold"
              >
                ico.org.uk
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
