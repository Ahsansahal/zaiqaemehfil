import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { RESTAURANT_JSON_LD, SITE } from "@/data/site";
import { FindUsSection } from "@/components/sections/FindUsSection";
import { BookingForm } from "@/components/sections/BookingForm";
import { Reveal } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { CalendarIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: {
    absolute: "Book a Table & Directions | Zaiqa-E-Mehfil, 156 Greenford Road, Harrow",
  },
  description:
    "Book a table or send a catering enquiry. Zaiqa-E-Mehfil, 156 Greenford Road, Sudbury Hill, Harrow HA1 3QS. Call 020 8422 6129. Open daily from 11:30, weekends from 8:00.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Book a Table & Directions | Zaiqa-E-Mehfil, 156 Greenford Road, Harrow",
    description:
      "Book a table or send a catering enquiry. Zaiqa-E-Mehfil, 156 Greenford Road, Sudbury Hill, Harrow HA1 3QS. Call 020 8422 6129. Open daily from 11:30, weekends from 8:00.",
    url: `${SITE.url}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Book & contact", item: `${SITE.url}/contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RESTAURANT_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Page hero */}
      <section className="relative overflow-hidden pt-[clamp(7rem,12vw,9rem)] pb-[clamp(2.6rem,5vw,4rem)] border-b border-[rgba(240,234,222,0.06)] before:content-[''] before:absolute before:-top-[40%] before:-right-[10%] before:w-[min(640px,80vw)] before:aspect-square before:bg-[radial-gradient(circle,rgba(227,197,111,0.09)_0%,transparent_62%)] before:pointer-events-none">
        <div className="relative max-w-[96%] mx-auto px-5 lg:px-10 min-[1000px]:grid min-[1000px]:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)] min-[1000px]:gap-16 min-[1000px]:items-center">
          <Reveal y={18}>
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)]">
              Book &amp; contact
            </span>
            <h1 className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] mt-5 text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[0.96]">
              Book a table or <em className="italic font-normal text-gold">find us</em>
            </h1>
            <p className="mt-5 max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light">
              We&rsquo;re at{" "}
              <strong className="text-fg font-medium">{SITE.address.full}</strong>, open every day (
              {SITE.hoursSummary}). Call us, get directions, or send a booking or catering request
              below.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-7">
              <CtaButton
                href={`tel:${SITE.tel}`}
                variant="gold"
                trackAs="call_click"
                where="contact_hero"
                icon={<PhoneIcon />}
              >
                Call {SITE.phone}
              </CtaButton>
              <CtaButton
                href={SITE.mapsUrl}
                external
                variant="line"
                trackAs="directions_click"
                where="contact_hero"
                icon={<PinIcon />}
              >
                Get directions
              </CtaButton>
              <CtaButton href="#book" variant="line" icon={<CalendarIcon />}>
                Request a table
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden min-[1000px]:block max-w-[400px] justify-self-end w-full bez">
            <div className="core">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src="/img/card/whole-grill-chicken.webp"
                  alt="Whole flame-grilled peri peri chicken"
                  fill
                  priority
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FindUsSection context="contact" />

      <Suspense fallback={<div className="py-24 bg-ink" />}>
        <BookingForm />
      </Suspense>
    </>
  );
}
