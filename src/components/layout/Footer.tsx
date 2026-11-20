"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent("zem:open-consent"));
  };

  return (
    <footer className="py-[clamp(3.5rem,7vw,5rem)] pb-10 border-t border-[rgba(240,234,222,0.06)] bg-void">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/img/v2/crest-240.webp"
              alt="Zaiqa-E-Mehfil crest"
              width={88}
              height={88}
              className="w-[88px] h-[88px] rounded-full mb-4 shadow-[0_0_0_1px_rgba(227,197,111,0.3)]"
            />
            <p className="text-[0.92rem] text-fg-soft">
              Pakistani, Afghan and Indo-Chinese food, halal, on Greenford Road in Sudbury Hill,
              Harrow.
            </p>
          </div>

          <div>
            <h2 className="text-[11px] tracking-[0.22em] uppercase text-gold-deep mb-4 font-bold font-sans">
              Visit
            </h2>
            <address className="not-italic text-[0.92rem] leading-[1.8] text-fg-soft">
              {SITE.address.street}
              <br />
              {SITE.address.locality}
              <br />
              {SITE.address.postcode}
            </address>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("directions_click", { link_location: "footer" })}
              className="block mt-2 text-[0.92rem] text-fg-soft hover:text-gold transition-colors duration-300"
            >
              Get directions &rarr;
            </a>
          </div>

          <div>
            <h2 className="text-[11px] tracking-[0.22em] uppercase text-gold-deep mb-4 font-bold font-sans">
              Call &amp; book
            </h2>
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackEvent("call_click", { link_location: "footer" })}
              className="block text-[0.92rem] text-fg-soft mb-2 hover:text-gold transition-colors duration-300"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              onClick={() => trackEvent("email_click", { link_location: "footer" })}
              className="block text-[0.92rem] text-fg-soft mb-2 hover:text-gold transition-colors duration-300"
            >
              {SITE.email}
            </a>
            <Link
              href="/contact#book"
              className="block text-[0.92rem] text-fg-soft mb-2 hover:text-gold transition-colors duration-300"
            >
              Book a table
            </Link>
            <Link
              href="/contact?type=catering#book"
              className="block text-[0.92rem] text-fg-soft mb-2 hover:text-gold transition-colors duration-300"
            >
              Catering enquiry
            </Link>
          </div>

          <div>
            <h2 className="text-[11px] tracking-[0.22em] uppercase text-gold-deep mb-4 font-bold font-sans">
              Opening hours
            </h2>
            <p className="text-[0.92rem] text-fg-soft">
              Open every day
              <br />
              Mon&ndash;Fri 11:30&ndash;23:30
              <br />
              Sat&ndash;Sun 8:00&ndash;23:30
            </p>
            <h2 className="text-[11px] tracking-[0.22em] uppercase text-gold-deep mt-6 mb-4 font-bold font-sans">
              Pages
            </h2>
            <Link
              href="/menu"
              className="block text-[0.92rem] text-fg-soft mb-2 hover:text-gold transition-colors duration-300"
            >
              Full menu
            </Link>
            <Link
              href="/about"
              className="block text-[0.92rem] text-fg-soft mb-2 hover:text-gold transition-colors duration-300"
            >
              About us
            </Link>
            <Link
              href="/privacy"
              className="block text-[0.92rem] text-fg-soft mb-2 hover:text-gold transition-colors duration-300"
            >
              Privacy &amp; cookies
            </Link>
          </div>
        </div>

        <div className="mt-11 pt-6 border-t border-[rgba(240,234,222,0.06)] text-[0.8rem] text-muted flex flex-wrap gap-y-2 gap-x-6 justify-between">
          <span>&copy; 2026 {SITE.legalName}</span>
          <span>
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy notice
            </Link>{" "}
            &middot;{" "}
            <button
              type="button"
              onClick={openCookieSettings}
              className="underline underline-offset-[3px] cursor-pointer hover:text-gold transition-colors"
            >
              Cookie settings
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
